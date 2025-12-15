"use client";

import { GraduationCap, ArrowRight } from "lucide-react";
import { SchoolCard } from "./SchoolCard";
import Link from "next/link";
import type { Id } from "@/convex/_generated/dataModel";

interface School {
  _id: Id<"schools">;
  name: string;
  type: string;
  location: {
    city: string;
    district: string;
  };
  partnershipTier: "featured" | "partner" | "listed";
  programsOffered: Array<{
    name: string;
    duration: string;
    tuitionPerYear: number;
    careerIds: Id<"careers">[];
  }>;
  description: string;
  logo?: string;
  website?: string;
  accreditation?: string;
  establishedYear?: number;
  studentCount?: number;
  featured: boolean;
  clickCount: number;
}

interface SchoolRecommendationsProps {
  schools: School[];
  title?: string;
  careerId?: string;
  maxDisplay?: number;
  showViewAll?: boolean;
}

export function SchoolRecommendations({
  schools,
  title = "Recommended Schools",
  careerId,
  maxDisplay = 6,
  showViewAll = true,
}: SchoolRecommendationsProps) {
  if (!schools || schools.length === 0) {
    return null;
  }

  // Sort schools: ALU first (priority school), then featured, then partners, then listed
  const sortedSchools = [...schools].sort((a, b) => {
    // Priority 0: ALU always first
    const isALU_A = a.name.includes("African Leadership University") || a.name.includes("ALU");
    const isALU_B = b.name.includes("African Leadership University") || b.name.includes("ALU");

    if (isALU_A && !isALU_B) return -1;
    if (!isALU_A && isALU_B) return 1;

    // Priority 1: Partnership tier
    const tierOrder = { featured: 0, partner: 1, listed: 2 };
    const aTier = tierOrder[a.partnershipTier];
    const bTier = tierOrder[b.partnershipTier];

    if (aTier !== bTier) return aTier - bTier;

    // Priority 2: Featured flag
    if (a.featured !== b.featured) return b.featured ? 1 : -1;

    // Priority 3: Click count (popularity)
    return b.clickCount - a.clickCount;
  });

  const displaySchools = sortedSchools.slice(0, maxDisplay);
  const hasMore = schools.length > maxDisplay;

  // Separate featured schools for highlighting
  const featuredSchools = displaySchools.filter(s => s.partnershipTier === "featured");
  const otherSchools = displaySchools.filter(s => s.partnershipTier !== "featured");

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <GraduationCap className="w-6 h-6 text-brutal-blue" />
          <h3 className="text-2xl font-black uppercase">{title}</h3>
        </div>
        {showViewAll && hasMore && (
          <Link href="/schools" className="hidden md:block">
            <button className="px-4 py-2 bg-white border-2 border-black shadow-brutal-sm hover:shadow-brutal transition-all font-bold text-sm uppercase flex items-center gap-2">
              View All {schools.length} <ArrowRight className="w-4 h-4" />
            </button>
          </Link>
        )}
      </div>

      {/* Featured Schools Section */}
      {featuredSchools.length > 0 && (
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <div className="h-1 w-8 bg-brutal-orange"></div>
            <p className="text-sm font-black uppercase text-gray-600">Featured Partners</p>
          </div>
          <div
            className={`grid gap-6 ${featuredSchools.length === 1 ? "grid-cols-1" : "grid-cols-1 lg:grid-cols-2"
              }`}
          >
            {featuredSchools.map((school) => (
              <SchoolCard
                key={school._id}
                school={school}
                compact={false}
                showCTA={true}
              />
            ))}
          </div>
        </div>
      )}

      {/* Other Schools Section */}
      {otherSchools.length > 0 && (
        <div className="space-y-4">
          {featuredSchools.length > 0 && (
            <div className="flex items-center gap-2">
              <div className="h-1 w-8 bg-brutal-blue"></div>
              <p className="text-sm font-black uppercase text-gray-600">Additional Options</p>
            </div>
          )}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {otherSchools.map((school) => (
              <SchoolCard
                key={school._id}
                school={school}
                compact={false}
                showCTA={true}
              />
            ))}
          </div>
        </div>
      )}

      {/* View All Button (Mobile) */}
      {showViewAll && hasMore && (
        <div className="md:hidden text-center">
          <Link href="/schools">
            <button className="w-full px-6 py-3 bg-white border-2 border-black shadow-brutal hover:shadow-brutal-lg transition-all font-bold text-sm uppercase flex items-center justify-center gap-2">
              View All {schools.length} Schools <ArrowRight className="w-4 h-4" />
            </button>
          </Link>
        </div>
      )}
    </div>
  );
}

// TODO: When adding new schools, update the Convex database with:
// 1. School details (name, type, location, description)
// 2. Programs offered (name, duration, tuition, linked careerIds)
// 3. Partnership tier: "featured" | "partner" | "listed"
// 4. Website URL for CTA
// Schools are automatically sorted: ALU first, then by tier, then by click count
