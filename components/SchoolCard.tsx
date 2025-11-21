"use client";

import { MapPin, ExternalLink, GraduationCap, Award } from "lucide-react";
import { Card, CardContent } from "./ui/card";
import { Badge } from "./ui/badge";
import { useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
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
  scholarshipInfo?: string;
}

interface SchoolCardProps {
  school: School;
  program?: string;
  compact?: boolean;
  showCTA?: boolean;
}

export function SchoolCard({ school, program, compact = false, showCTA = true }: SchoolCardProps) {
  const trackClick = useMutation(api.schools.trackClick);
  const trackInquiry = useMutation(api.schools.trackInquiry);

  const formatCurrency = (amount: number) => {
    return `${(amount / 1000000).toFixed(1)}M RWF`;
  };

  const getTypeLabel = (type: string) => {
    const labels: Record<string, string> = {
      university: "University",
      technical_college: "Technical College",
      vocational_school: "Vocational School",
      high_school: "High School",
      training_center: "Training Center",
      online_platform: "Online Platform",
    };
    return labels[type] || type;
  };

  const handleWebsiteClick = async () => {
    try {
      await trackClick({ schoolId: school._id });
      if (school.website) {
        window.open(school.website, "_blank", "noopener,noreferrer");
      }
    } catch (error) {
      console.error("Failed to track click:", error);
    }
  };

  const handleInquiry = async () => {
    try {
      await trackInquiry({ schoolId: school._id });
      if (school.website) {
        window.open(school.website, "_blank", "noopener,noreferrer");
      }
    } catch (error) {
      console.error("Failed to track inquiry:", error);
    }
  };

  // Find relevant program
  const relevantProgram = program 
    ? school.programsOffered.find(p => p.name.toLowerCase().includes(program.toLowerCase()))
    : school.programsOffered[0];

  if (compact) {
    return (
      <div className="p-4 bg-white border-2 border-black hover:shadow-brutal-sm transition-all">
        <div className="flex items-start justify-between gap-3 mb-3">
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-1">
              <h4 className="font-black text-base truncate">{school.name}</h4>
              {school.partnershipTier === "featured" && (
                <Badge className="bg-brutal-orange text-white border-2 border-black text-xs px-2 py-0 flex-shrink-0">
                  Featured
                </Badge>
              )}
            </div>
            <p className="text-xs text-gray-600 font-bold flex items-center gap-1">
              <MapPin className="w-3 h-3" />
              {school.location.city}, {school.location.district}
            </p>
            <p className="text-xs text-gray-500 mt-1">{getTypeLabel(school.type)}</p>
          </div>
          {school.logo && (
            <div className="w-12 h-12 border-2 border-black bg-white flex items-center justify-center flex-shrink-0">
              <img src={school.logo} alt={school.name} className="w-10 h-10 object-contain" />
            </div>
          )}
        </div>

        {relevantProgram && (
          <div className="mb-3 p-2 bg-brutal-bg border-2 border-black">
            <p className="text-xs font-bold text-gray-700 mb-1">{relevantProgram.name}</p>
            <div className="flex items-center justify-between text-xs">
              <span className="text-gray-600">{relevantProgram.duration}</span>
              <span className="font-black text-brutal-green">
                {formatCurrency(relevantProgram.tuitionPerYear)}/year
              </span>
            </div>
          </div>
        )}

        {showCTA && school.website && (
          <button
            onClick={handleInquiry}
            className="w-full px-3 py-2 bg-brutal-blue text-white font-bold uppercase text-xs border-2 border-black shadow-brutal-sm hover:shadow-brutal transition-all flex items-center justify-center gap-2"
          >
            Learn More <ExternalLink className="w-3 h-3" />
          </button>
        )}
      </div>
    );
  }

  // Full card display
  return (
    <Card className="border-2 border-black shadow-brutal hover:shadow-brutal-lg transition-all">
      <CardContent className="p-6">
        {/* Header */}
        <div className="flex items-start gap-4 mb-4">
          {school.logo && (
            <div className="w-16 h-16 border-2 border-black bg-white flex items-center justify-center flex-shrink-0">
              <img src={school.logo} alt={school.name} className="w-14 h-14 object-contain" />
            </div>
          )}
          <div className="flex-1 min-w-0">
            <div className="flex items-start gap-2 mb-2">
              <h3 className="text-xl font-black flex-1">{school.name}</h3>
              {school.partnershipTier === "featured" && (
                <Badge className="bg-brutal-orange text-white border-2 border-black text-xs flex-shrink-0">
                  <Award className="w-3 h-3 mr-1" />
                  Featured Partner
                </Badge>
              )}
              {school.partnershipTier === "partner" && (
                <Badge className="bg-brutal-blue text-white border-2 border-black text-xs flex-shrink-0">
                  Partner
                </Badge>
              )}
            </div>
            <div className="space-y-1">
              <p className="text-sm text-gray-600 font-bold flex items-center gap-1">
                <MapPin className="w-4 h-4" />
                {school.location.city}, {school.location.district}
              </p>
              <p className="text-sm text-gray-500">{getTypeLabel(school.type)}</p>
            </div>
          </div>
        </div>

        {/* Description */}
        <p className="text-sm text-gray-700 mb-4 line-clamp-3">{school.description}</p>

        {/* Scholarship Info - Special highlight */}
        {school.scholarshipInfo && (
          <div className="mb-4 p-3 bg-brutal-green/10 border-2 border-brutal-green">
            <p className="text-xs font-black uppercase text-brutal-green mb-1 flex items-center gap-1">
              <Award className="w-4 h-4" />
              Scholarship Available
            </p>
            <p className="text-sm font-bold text-gray-800">{school.scholarshipInfo}</p>
          </div>
        )}

        {/* School Info Badges */}
        <div className="flex flex-wrap gap-2 mb-4">
          {school.accreditation && (
            <Badge variant="outline" className="border-2 border-black text-xs">
              {school.accreditation}
            </Badge>
          )}
          {school.establishedYear && (
            <Badge variant="outline" className="border-2 border-black text-xs">
              Est. {school.establishedYear}
            </Badge>
          )}
          {school.studentCount && (
            <Badge variant="outline" className="border-2 border-black text-xs">
              {school.studentCount.toLocaleString()} students
            </Badge>
          )}
        </div>

        {/* Programs */}
        {school.programsOffered.length > 0 && (
          <div className="mb-4 p-4 bg-brutal-bg border-2 border-black">
            <p className="text-xs font-black uppercase text-gray-600 mb-3 flex items-center gap-2">
              <GraduationCap className="w-4 h-4" />
              Programs Offered
            </p>
            <div className="space-y-2">
              {school.programsOffered.slice(0, 3).map((prog, index) => (
                <div key={index} className="flex items-center justify-between text-sm">
                  <div className="flex-1">
                    <p className="font-bold text-gray-800">{prog.name}</p>
                    <p className="text-xs text-gray-600">{prog.duration}</p>
                  </div>
                  <p className="font-black text-brutal-green ml-2">
                    {formatCurrency(prog.tuitionPerYear)}/yr
                  </p>
                </div>
              ))}
              {school.programsOffered.length > 3 && (
                <p className="text-xs text-gray-500 font-bold">
                  +{school.programsOffered.length - 3} more programs
                </p>
              )}
            </div>
          </div>
        )}

        {/* CTA */}
        {showCTA && (
          <div className="flex gap-3">
            {school.website && (
              <button
                onClick={handleInquiry}
                className="flex-1 px-4 py-3 bg-brutal-blue text-white font-bold uppercase text-sm border-2 border-black shadow-brutal-sm hover:shadow-brutal transition-all flex items-center justify-center gap-2"
              >
                Visit Website <ExternalLink className="w-4 h-4" />
              </button>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  );
}

