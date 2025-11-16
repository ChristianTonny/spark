"use client";

import { useQuery, useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import Link from "next/link";
import { ArrowLeft, Heart, Bookmark, Eye, Calendar, User } from "lucide-react";
import { useEffect } from "react";
import ReactMarkdown from "react-markdown";
import { useConvexAuth } from "@/lib/hooks/useConvexAuth";

export default function ResourceDetailPage({
  params,
}: {
  params: { slug: string };
}) {
  const { user } = useConvexAuth();
  const resource = useQuery(api.mentorResources.getResourceBySlug, {
    slug: params.slug,
  });
  const incrementViews = useMutation(api.mentorResources.incrementViews);
  const toggleLike = useMutation(api.mentorResources.toggleLike);
  const toggleSave = useMutation(api.mentorResources.toggleSave);

  // Increment views when resource loads
  useEffect(() => {
    if (resource) {
      incrementViews({ resourceId: resource._id });
    }
  }, [resource?._id]);

  const handleLike = async () => {
    if (!user) {
      alert("Please sign in to like resources");
      return;
    }
    if (resource) {
      try {
        await toggleLike({ resourceId: resource._id });
      } catch (error) {
        console.error("Failed to like resource:", error);
      }
    }
  };

  const handleSave = async () => {
    if (!user) {
      alert("Please sign in to save resources");
      return;
    }
    if (resource) {
      try {
        await toggleSave({ resourceId: resource._id });
      } catch (error) {
        console.error("Failed to save resource:", error);
      }
    }
  };

  if (resource === undefined) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="animate-pulse text-2xl font-black">Loading...</div>
      </div>
    );
  }

  if (resource === null) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-black mb-4">Resource Not Found</h1>
          <Link href="/resources">
            <button className="px-6 py-3 bg-primary text-white font-bold uppercase border-3 border-black shadow-brutal hover:shadow-brutal-lg transition-all">
              Browse All Resources
            </button>
          </Link>
        </div>
      </div>
    );
  }

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

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4 max-w-4xl">
        {/* Back Button */}
        <Link
          href="/resources"
          className="inline-flex items-center gap-2 text-lg font-bold text-gray-700 hover:text-black mb-6"
        >
          <ArrowLeft className="w-5 h-5" />
          Back to Resources
        </Link>

        {/* Header */}
        <div className="bg-white border-3 border-black shadow-brutal-lg mb-6">
          {/* Cover Image */}
          {resource.coverImage && (
            <div className="h-64 md:h-96 border-b-3 border-black overflow-hidden">
              <img
                src={resource.coverImage}
                alt={resource.title}
                className="w-full h-full object-cover"
              />
            </div>
          )}

          <div className="p-8">
            {/* Type Badge */}
            <div className="mb-4">
              <span
                className={`px-4 py-2 text-sm font-black uppercase border-2 border-black inline-block ${getTypeColor(
                  resource.type
                )}`}
              >
                {resource.type}
              </span>
            </div>

            {/* Title */}
            <h1 className="text-4xl md:text-5xl font-black uppercase mb-4">
              {resource.title}
            </h1>

            {/* Meta Info */}
            <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600 mb-6">
              {resource.publishedAt && (
                <div className="flex items-center gap-2 font-bold">
                  <Calendar className="w-4 h-4" />
                  {new Date(resource.publishedAt).toLocaleDateString("en-US", {
                    month: "long",
                    day: "numeric",
                    year: "numeric",
                  })}
                </div>
              )}
              <div className="flex items-center gap-2 font-bold">
                <Eye className="w-4 h-4" />
                {resource.views} views
              </div>
              <div className="flex items-center gap-2 font-bold">
                <Heart className="w-4 h-4" />
                {resource.likes} likes
              </div>
              <div className="flex items-center gap-2 font-bold">
                <Bookmark className="w-4 h-4" />
                {resource.saves} saves
              </div>
            </div>

            {/* Author Info */}
            {resource.author && (
              <div className="flex items-center justify-between p-4 bg-gray-50 border-2 border-black">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-full border-2 border-black bg-gray-200 flex items-center justify-center overflow-hidden">
                    {resource.author.avatar ? (
                      <img
                        src={resource.author.avatar}
                        alt={resource.author.name}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <User className="w-6 h-6" />
                    )}
                  </div>
                  <div>
                    <p className="font-black">{resource.author.name}</p>
                    {resource.author.title && (
                      <p className="text-sm text-gray-600">
                        {resource.author.title}
                        {resource.author.company && ` at ${resource.author.company}`}
                      </p>
                    )}
                  </div>
                </div>
                <Link href={`/mentors/${resource.author.id}`}>
                  <button className="px-4 py-2 bg-brutal-blue text-white font-bold uppercase text-sm border-3 border-black shadow-brutal hover:shadow-brutal-lg transition-all">
                    Book Session
                  </button>
                </Link>
              </div>
            )}

            {/* Action Buttons */}
            <div className="flex gap-3 mt-6">
              <button
                onClick={handleLike}
                className={`flex-1 px-6 py-3 font-bold uppercase border-3 border-black shadow-brutal hover:shadow-brutal-lg transition-all flex items-center justify-center gap-2 ${
                  resource.hasLiked
                    ? "bg-brutal-pink text-white"
                    : "bg-white text-black"
                }`}
              >
                <Heart className="w-5 h-5" />
                {resource.hasLiked ? "Liked" : "Like"}
              </button>
              <button
                onClick={handleSave}
                className={`flex-1 px-6 py-3 font-bold uppercase border-3 border-black shadow-brutal hover:shadow-brutal-lg transition-all flex items-center justify-center gap-2 ${
                  resource.hasSaved
                    ? "bg-brutal-blue text-white"
                    : "bg-white text-black"
                }`}
              >
                <Bookmark className="w-5 h-5" />
                {resource.hasSaved ? "Saved" : "Save"}
              </button>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="bg-white border-3 border-black shadow-brutal-lg p-8 mb-6">
          <div className="prose prose-lg max-w-none">
            <ReactMarkdown
              components={{
                h1: ({ children }) => (
                  <h1 className="text-3xl font-black uppercase mb-4 mt-6">
                    {children}
                  </h1>
                ),
                h2: ({ children }) => (
                  <h2 className="text-2xl font-black uppercase mb-3 mt-5">
                    {children}
                  </h2>
                ),
                h3: ({ children }) => (
                  <h3 className="text-xl font-black uppercase mb-2 mt-4">
                    {children}
                  </h3>
                ),
                p: ({ children }) => (
                  <p className="mb-4 leading-relaxed font-bold text-gray-700">
                    {children}
                  </p>
                ),
                ul: ({ children }) => (
                  <ul className="list-disc list-inside mb-4 space-y-2">
                    {children}
                  </ul>
                ),
                ol: ({ children }) => (
                  <ol className="list-decimal list-inside mb-4 space-y-2">
                    {children}
                  </ol>
                ),
                code: ({ children }) => (
                  <code className="px-2 py-1 bg-gray-100 border-2 border-black font-mono text-sm">
                    {children}
                  </code>
                ),
                pre: ({ children }) => (
                  <pre className="p-4 bg-gray-900 text-white border-3 border-black mb-4 overflow-x-auto">
                    {children}
                  </pre>
                ),
              }}
            >
              {resource.content}
            </ReactMarkdown>
          </div>

          {/* Tags */}
          {resource.tags.length > 0 && (
            <div className="mt-8 pt-6 border-t-3 border-black">
              <p className="text-sm font-black uppercase text-gray-600 mb-3">Tags</p>
              <div className="flex flex-wrap gap-2">
                {resource.tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-3 py-1 bg-brutal-yellow border-2 border-black text-sm font-bold"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* CTA */}
        {resource.author && (
          <div className="bg-gradient-to-r from-brutal-blue to-brutal-purple border-3 border-black shadow-brutal-lg p-8 text-center">
            <h3 className="text-2xl font-black text-white uppercase mb-4">
              Want Personalized Guidance?
            </h3>
            <p className="text-white font-bold mb-6">
              Book a one-on-one session with {resource.author.name} for tailored career advice
            </p>
            <Link href={`/mentors/${resource.author.id}`}>
              <button className="px-8 py-4 bg-brutal-yellow text-black font-bold uppercase text-lg border-3 border-black shadow-brutal hover:shadow-brutal-lg hover:translate-x-[-2px] hover:translate-y-[-2px] transition-all">
                Book Session with {resource.author.name.split(" ")[0]}
              </button>
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
