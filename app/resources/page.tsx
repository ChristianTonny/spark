"use client";

import { useState } from "react";
import { useQuery, useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import Link from "next/link";
import {
  Heart,
  Bookmark,
  Eye,
  FileText,
  Video,
  Briefcase,
  Book,
  User,
} from "lucide-react";
import { useConvexAuth } from "@/lib/hooks/useConvexAuth";

export default function ResourcesPage() {
  const { user } = useConvexAuth();
  const [filterType, setFilterType] = useState<"all" | "article" | "video" | "opportunity" | "guide">("all");
  const [sortBy, setSortBy] = useState<"recent" | "views" | "likes">("recent");

  const resources = useQuery(api.mentorResources.getPublishedResources, {
    type: filterType,
    sortBy,
    limit: 50,
  });

  const toggleLike = useMutation(api.mentorResources.toggleLike);
  const toggleSave = useMutation(api.mentorResources.toggleSave);

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "article":
        return <FileText className="w-4 h-4" />;
      case "video":
        return <Video className="w-4 h-4" />;
      case "opportunity":
        return <Briefcase className="w-4 h-4" />;
      case "guide":
        return <Book className="w-4 h-4" />;
      default:
        return <FileText className="w-4 h-4" />;
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case "article":
        return "bg-brutal-blue text-white";
      case "video":
        return "bg-brutal-pink text-white";
      case "opportunity":
        return "bg-brutal-orange text-white";
      case "guide":
        return "bg-brutal-green text-black";
      default:
        return "bg-gray-500 text-white";
    }
  };

  const handleLike = async (resourceId: any) => {
    if (!user) {
      alert("Please sign in to like resources");
      return;
    }
    try {
      await toggleLike({ resourceId });
    } catch (error) {
      console.error("Failed to like resource:", error);
    }
  };

  const handleSave = async (resourceId: any) => {
    if (!user) {
      alert("Please sign in to save resources");
      return;
    }
    try {
      await toggleSave({ resourceId });
    } catch (error) {
      console.error("Failed to save resource:", error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-brutal-blue to-brutal-purple border-b-4 border-black p-8 md:p-12">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-5xl font-black text-white mb-4 uppercase">
            Mentor Insights
          </h1>
          <p className="text-xl text-white/90 font-bold">
            Learn from expert mentors - Articles, Videos, Opportunities & Guides
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto p-4 md:p-8">
        {/* Filters */}
        <div className="mb-8 space-y-4">
          {/* Type Filter */}
          <div>
            <label className="block text-sm font-black uppercase text-gray-700 mb-2">
              Filter by Type
            </label>
            <div className="flex flex-wrap gap-2">
              {(["all", "article", "video", "opportunity", "guide"] as const).map((type) => (
                <button
                  key={type}
                  onClick={() => setFilterType(type)}
                  className={`px-4 py-2 font-bold uppercase text-sm border-3 border-black transition-all ${
                    filterType === type
                      ? "bg-brutal-blue text-white shadow-brutal"
                      : "bg-white hover:bg-gray-50"
                  }`}
                >
                  {type}
                </button>
              ))}
            </div>
          </div>

          {/* Sort */}
          <div>
            <label className="block text-sm font-black uppercase text-gray-700 mb-2">
              Sort by
            </label>
            <div className="flex gap-2">
              {(["recent", "views", "likes"] as const).map((sort) => (
                <button
                  key={sort}
                  onClick={() => setSortBy(sort)}
                  className={`px-4 py-2 font-bold uppercase text-sm border-3 border-black transition-all ${
                    sortBy === sort
                      ? "bg-brutal-yellow text-black shadow-brutal"
                      : "bg-white hover:bg-gray-50"
                  }`}
                >
                  {sort === "recent" ? "Most Recent" : sort === "views" ? "Most Viewed" : "Most Liked"}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Resources Grid */}
        {resources === undefined ? (
          <div className="border-3 border-black p-8 bg-white text-center">
            <p className="font-bold">Loading resources...</p>
          </div>
        ) : resources.length === 0 ? (
          <div className="border-3 border-black p-12 bg-white text-center">
            <FileText className="w-16 h-16 mx-auto mb-4 text-gray-400" />
            <h3 className="font-black text-xl mb-2">No resources found</h3>
            <p className="text-gray-600">Check back soon for new content from our mentors!</p>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {resources.map((resource) => (
              <Link
                key={resource._id}
                href={`/resources/${resource.slug}`}
                className="border-3 border-black bg-white shadow-brutal hover:shadow-brutal-lg transition-all group"
              >
                {/* Cover Image */}
                {resource.coverImage && (
                  <div className="h-48 border-b-3 border-black overflow-hidden bg-gray-100">
                    <img
                      src={resource.coverImage}
                      alt={resource.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                )}

                <div className="p-5">
                  {/* Type Badge */}
                  <div className="mb-3">
                    <span
                      className={`px-3 py-1 text-xs font-black uppercase border-2 border-black flex items-center gap-1 w-fit ${getTypeColor(
                        resource.type
                      )}`}
                    >
                      {getTypeIcon(resource.type)}
                      {resource.type}
                    </span>
                  </div>

                  {/* Title and Excerpt */}
                  <h3 className="text-lg font-black uppercase mb-2 line-clamp-2 group-hover:text-brutal-blue transition-colors">
                    {resource.title}
                  </h3>
                  <p className="text-sm text-gray-700 mb-4 line-clamp-2">
                    {resource.excerpt}
                  </p>

                  {/* Author */}
                  {resource.author && (
                    <div className="flex items-center gap-2 mb-4 text-sm">
                      <div className="w-8 h-8 rounded-full border-2 border-black bg-gray-200 flex items-center justify-center overflow-hidden">
                        {resource.author.avatar ? (
                          <img
                            src={resource.author.avatar}
                            alt={resource.author.name}
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <User className="w-4 h-4" />
                        )}
                      </div>
                      <div>
                        <p className="font-bold text-xs">{resource.author.name}</p>
                        {resource.author.title && (
                          <p className="text-xs text-gray-600">{resource.author.title}</p>
                        )}
                      </div>
                    </div>
                  )}

                  {/* Stats and Actions */}
                  <div className="flex items-center justify-between pt-4 border-t-2 border-black">
                    <div className="flex gap-3 text-xs font-bold text-gray-600">
                      <div className="flex items-center gap-1">
                        <Eye className="w-4 h-4" />
                        {resource.views}
                      </div>
                      <div className="flex items-center gap-1">
                        <Heart className="w-4 h-4" />
                        {resource.likes}
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <button
                        onClick={(e) => {
                          e.preventDefault();
                          handleLike(resource._id);
                        }}
                        className={`p-2 border-2 border-black transition-colors ${
                          resource.hasLiked
                            ? "bg-brutal-pink text-white"
                            : "bg-white hover:bg-brutal-pink hover:text-white"
                        }`}
                      >
                        <Heart className="w-4 h-4" />
                      </button>
                      <button
                        onClick={(e) => {
                          e.preventDefault();
                          handleSave(resource._id);
                        }}
                        className={`p-2 border-2 border-black transition-colors ${
                          resource.hasSaved
                            ? "bg-brutal-blue text-white"
                            : "bg-white hover:bg-brutal-blue hover:text-white"
                        }`}
                      >
                        <Bookmark className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
