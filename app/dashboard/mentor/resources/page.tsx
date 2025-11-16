"use client";

import { useState } from "react";
import { useQuery, useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import Link from "next/link";
import {
  Plus,
  Eye,
  Heart,
  Bookmark,
  Edit,
  Trash2,
  FileText,
  Video,
  Briefcase,
  Book,
} from "lucide-react";
import { useConvexAuth } from "@/lib/hooks/useConvexAuth";

type TabType = "all" | "published" | "draft";

export default function MentorResourcesPage() {
  const [activeTab, setActiveTab] = useState<TabType>("all");
  const { user } = useConvexAuth();

  const allResources = useQuery(
    api.mentorResources.getMentorDashboardResources,
    user ? { status: "all" } : "skip"
  );
  const publishedResources = useQuery(
    api.mentorResources.getMentorDashboardResources,
    user ? { status: "published" } : "skip"
  );
  const draftResources = useQuery(
    api.mentorResources.getMentorDashboardResources,
    user ? { status: "draft" } : "skip"
  );

  const deleteResource = useMutation(api.mentorResources.deleteResource);
  const unpublishResource = useMutation(api.mentorResources.unpublishResource);

  const currentResources =
    activeTab === "all"
      ? allResources
      : activeTab === "published"
      ? publishedResources
      : draftResources;

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

  const getStatusColor = (status: string) => {
    switch (status) {
      case "published":
        return "bg-brutal-green text-black";
      case "draft":
        return "bg-gray-400 text-white";
      case "archived":
        return "bg-gray-600 text-white";
      default:
        return "bg-gray-500 text-white";
    }
  };

  const handleDelete = async (resourceId: Id<"mentorResources">) => {
    if (
      confirm(
        "Are you sure you want to archive this resource? It will no longer be visible to students."
      )
    ) {
      try {
        await deleteResource({ resourceId });
      } catch (error) {
        console.error("Failed to delete resource:", error);
        alert("Failed to delete resource. Please try again.");
      }
    }
  };

  const handleUnpublish = async (resourceId: Id<"mentorResources">) => {
    if (
      confirm(
        "Unpublish this resource? It will move back to drafts and won't be visible to students."
      )
    ) {
      try {
        await unpublishResource({ resourceId });
      } catch (error) {
        console.error("Failed to unpublish resource:", error);
        alert("Failed to unpublish resource. Please try again.");
      }
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-4xl font-black uppercase mb-2">Mentor Insights</h1>
            <p className="text-lg text-gray-600">
              Share your knowledge and opportunities with students
            </p>
          </div>
          <Link href="/dashboard/mentor/resources/new">
            <button className="px-6 py-3 bg-brutal-blue text-white font-bold uppercase border-3 border-black shadow-brutal hover:shadow-brutal-lg hover:translate-x-[-2px] hover:translate-y-[-2px] transition-all flex items-center gap-2">
              <Plus className="w-5 h-5" />
              Create Resource
            </button>
          </Link>
        </div>

        {/* Tabs */}
        <div className="border-3 border-black bg-white mb-6">
          <div className="flex border-b-3 border-black">
            <button
              onClick={() => setActiveTab("all")}
              className={`flex-1 px-6 py-4 font-bold uppercase text-sm border-r-3 border-black transition-colors ${
                activeTab === "all"
                  ? "bg-brutal-blue text-white"
                  : "bg-white hover:bg-gray-50"
              }`}
            >
              All ({allResources?.length || 0})
            </button>
            <button
              onClick={() => setActiveTab("published")}
              className={`flex-1 px-6 py-4 font-bold uppercase text-sm border-r-3 border-black transition-colors ${
                activeTab === "published"
                  ? "bg-brutal-blue text-white"
                  : "bg-white hover:bg-gray-50"
              }`}
            >
              Published ({publishedResources?.length || 0})
            </button>
            <button
              onClick={() => setActiveTab("draft")}
              className={`flex-1 px-6 py-4 font-bold uppercase text-sm transition-colors ${
                activeTab === "draft"
                  ? "bg-brutal-blue text-white"
                  : "bg-white hover:bg-gray-50"
              }`}
            >
              Drafts ({draftResources?.length || 0})
            </button>
          </div>
        </div>

        {/* Resources Grid */}
        {currentResources === undefined ? (
          <div className="border-3 border-black p-8 bg-white text-center">
            <p className="font-bold">Loading resources...</p>
          </div>
        ) : currentResources.length === 0 ? (
          <div className="border-3 border-black p-12 bg-white text-center">
            <FileText className="w-16 h-16 mx-auto mb-4 text-gray-400" />
            <h3 className="font-black text-xl mb-2">No resources yet</h3>
            <p className="text-gray-600 mb-4">
              Share your knowledge with students by creating your first resource!
            </p>
            <Link href="/dashboard/mentor/resources/new">
              <button className="px-6 py-3 bg-brutal-blue text-white font-bold uppercase border-3 border-black shadow-brutal hover:shadow-brutal-lg transition-all">
                Create Resource
              </button>
            </Link>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 gap-6">
            {currentResources.map((resource) => (
              <div
                key={resource._id}
                className="border-3 border-black bg-white shadow-brutal hover:shadow-brutal-lg transition-all"
              >
                {/* Cover Image */}
                {resource.coverImage && (
                  <div className="h-48 border-b-3 border-black overflow-hidden bg-gray-100">
                    <img
                      src={resource.coverImage}
                      alt={resource.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                )}

                <div className="p-6">
                  {/* Type and Status Badges */}
                  <div className="flex gap-2 mb-3">
                    <span
                      className={`px-3 py-1 text-xs font-black uppercase border-2 border-black flex items-center gap-1 ${getTypeColor(
                        resource.type
                      )}`}
                    >
                      {getTypeIcon(resource.type)}
                      {resource.type}
                    </span>
                    <span
                      className={`px-3 py-1 text-xs font-black uppercase border-2 border-black ${getStatusColor(
                        resource.status
                      )}`}
                    >
                      {resource.status}
                    </span>
                  </div>

                  {/* Title and Excerpt */}
                  <h3 className="text-xl font-black uppercase mb-2 line-clamp-2">
                    {resource.title}
                  </h3>
                  <p className="text-gray-700 mb-4 line-clamp-2">
                    {resource.excerpt}
                  </p>

                  {/* Category and Tags */}
                  <div className="mb-4">
                    <span className="text-xs font-bold text-gray-600 uppercase">
                      {resource.category}
                    </span>
                    {resource.tags.length > 0 && (
                      <div className="flex flex-wrap gap-2 mt-2">
                        {resource.tags.slice(0, 3).map((tag, idx) => (
                          <span
                            key={idx}
                            className="px-2 py-1 bg-gray-100 border-2 border-black text-xs font-bold"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* Stats */}
                  <div className="flex gap-4 mb-4 text-sm font-bold text-gray-600">
                    <div className="flex items-center gap-1">
                      <Eye className="w-4 h-4" />
                      {resource.views}
                    </div>
                    <div className="flex items-center gap-1">
                      <Heart className="w-4 h-4" />
                      {resource.likes}
                    </div>
                    <div className="flex items-center gap-1">
                      <Bookmark className="w-4 h-4" />
                      {resource.saves}
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex gap-2 pt-4 border-t-2 border-black">
                    <Link
                      href={`/dashboard/mentor/resources/${resource._id}/edit`}
                      className="flex-1"
                    >
                      <button className="w-full px-4 py-2 bg-brutal-yellow text-black font-bold uppercase text-sm border-3 border-black shadow-brutal hover:shadow-brutal-lg transition-all flex items-center justify-center gap-2">
                        <Edit className="w-4 h-4" />
                        Edit
                      </button>
                    </Link>
                    {resource.status === "published" && (
                      <button
                        onClick={() => handleUnpublish(resource._id)}
                        className="px-4 py-2 bg-gray-400 text-white font-bold uppercase text-sm border-3 border-black shadow-brutal hover:shadow-brutal-lg transition-all"
                      >
                        Unpublish
                      </button>
                    )}
                    <button
                      onClick={() => handleDelete(resource._id)}
                      className="px-4 py-2 bg-red-500 text-white font-bold uppercase text-sm border-3 border-black shadow-brutal hover:shadow-brutal-lg transition-all"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Back Button */}
        <div className="mt-8">
          <Link href="/dashboard/mentor">
            <button className="px-6 py-3 border-3 border-black bg-white font-bold uppercase hover:bg-gray-100 transition-colors">
              ← Back to Dashboard
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}
