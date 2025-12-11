"use client";

import { useQuery, useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import { useEffect } from "react";
import { Clock, Eye, ArrowLeft, Calendar, Tag, Bookmark, BookmarkCheck } from "lucide-react";
import Link from "next/link";
import { useRouter, useParams } from "next/navigation";
import { useUser } from "@clerk/nextjs";

export default function ArticleDetailPage() {
  const router = useRouter();
  const params = useParams();
  const { user } = useUser();

  const article = useQuery(api.articles.getArticleBySlug, { slug: params.slug as string });
  const isBookmarked = useQuery(
    api.articles.isBookmarked,
    article ? { articleId: article._id } : "skip"
  );
  const incrementViewCount = useMutation(api.articles.incrementViewCount);
  const toggleBookmark = useMutation(api.articles.toggleBookmark);

  // Increment view count when article loads (only once)
  useEffect(() => {
    if (article) {
      incrementViewCount({ articleId: article._id });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [article?._id]);

  const handleBookmark = async () => {
    if (!user) {
      alert("Please sign in to bookmark articles");
      router.push("/sign-in");
      return;
    }
    if (article) {
      try {
        await toggleBookmark({ articleId: article._id });
      } catch (error) {
        console.error("Failed to toggle bookmark:", error);
      }
    }
  };

  const formatDate = (timestamp: number) => {
    return new Date(timestamp).toLocaleDateString("en-US", {
      month: "long",
      day: "numeric",
      year: "numeric",
    });
  };

  if (article === undefined) {
    return (
      <div className="min-h-screen bg-white p-8">
        <div className="max-w-4xl mx-auto">
          <div className="animate-pulse">
            <div className="h-8 bg-gray-200 rounded w-1/4 mb-8"></div>
            <div className="h-96 bg-gray-200 rounded mb-8"></div>
            <div className="space-y-4">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="h-4 bg-gray-200 rounded"></div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (article === null) {
    return (
      <div className="min-h-screen bg-white p-8">
        <div className="max-w-4xl mx-auto">
          <div className="border-3 border-black shadow-brutal p-12 text-center">
            <h2 className="text-3xl font-black uppercase mb-4">Article Not Found</h2>
            <p className="text-gray-600 mb-6">
              The article you&apos;re looking for doesn&apos;t exist or has been removed.
            </p>
            <Link
              href="/blog"
              className="inline-block px-6 py-3 bg-brutal-blue text-white font-bold uppercase border-3 border-black shadow-brutal hover:shadow-brutal-lg transition-all"
            >
              Browse All Articles
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Header Navigation */}
      <div className="border-b-3 border-black p-4 md:p-6 bg-white sticky top-0 z-10">
        <div className="max-w-4xl mx-auto flex items-center justify-between">
          <Link
            href="/blog"
            className="flex items-center gap-2 text-gray-600 hover:text-black font-bold uppercase text-sm transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            All Articles
          </Link>
          <button
            onClick={handleBookmark}
            className={`px-4 py-2 font-bold uppercase text-sm border-2 border-black transition-all flex items-center gap-2 ${
              isBookmarked
                ? "bg-brutal-yellow text-black"
                : "bg-white text-black hover:bg-gray-50"
            }`}
          >
            {isBookmarked ? (
              <>
                <BookmarkCheck className="w-4 h-4" />
                Saved
              </>
            ) : (
              <>
                <Bookmark className="w-4 h-4" />
                Save
              </>
            )}
          </button>
        </div>
      </div>

      <div className="max-w-4xl mx-auto p-4 md:p-8">
        {/* Article Header */}
        <article>
          {/* Category Badge */}
          <div className="mb-4">
            <span className="px-4 py-2 bg-brutal-blue text-white border-2 border-black text-sm font-bold uppercase">
              {article.category}
            </span>
          </div>

          {/* Title */}
          <h1 className="text-4xl md:text-6xl font-black uppercase mb-6 leading-tight">
            {article.title}
          </h1>

          {/* Excerpt */}
          <p className="text-xl text-gray-600 mb-8 font-medium leading-relaxed">
            {article.excerpt}
          </p>

          {/* Author Info */}
          <div className="border-y-3 border-black py-6 mb-8">
            <div className="flex items-center gap-4 mb-4">
              <div className="w-16 h-16 border-3 border-black bg-gray-200 flex items-center justify-center font-bold text-xl flex-shrink-0">
                {article.authorImage ? (
                  <img
                    src={article.authorImage}
                    alt={article.authorName}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  article.authorName.charAt(0).toUpperCase()
                )}
              </div>
              <div className="flex-1">
                <div className="font-black text-lg uppercase">{article.authorName}</div>
                {article.authorTitle && (
                  <div className="text-gray-600 text-sm">{article.authorTitle}</div>
                )}
              </div>
            </div>

            {/* Meta Info */}
            <div className="flex flex-wrap gap-4 text-sm text-gray-600">
              {article.publishedAt && (
                <div className="flex items-center gap-1">
                  <Calendar className="w-4 h-4" />
                  <span>{formatDate(article.publishedAt)}</span>
                </div>
              )}
              <div className="flex items-center gap-1">
                <Clock className="w-4 h-4" />
                <span>{article.readTime} min read</span>
              </div>
              <div className="flex items-center gap-1">
                <Eye className="w-4 h-4" />
                <span>{article.viewCount} views</span>
              </div>
            </div>
          </div>

          {/* Cover Image */}
          {article.coverImage && (
            <div className="mb-12 border-3 border-black overflow-hidden">
              <img
                src={article.coverImage}
                alt={article.title}
                className="w-full h-auto max-h-[500px] object-cover"
              />
            </div>
          )}

          {/* Article Content */}
          <div className="prose prose-lg max-w-none mb-12">
            <div
              className="text-gray-800 leading-relaxed ProseMirror"
              dangerouslySetInnerHTML={{ __html: article.content }}
            />
          </div>

          {/* Tags */}
          {article.tags && article.tags.length > 0 && (
            <div className="border-t-3 border-black pt-6 mb-8">
              <div className="flex items-center gap-3 flex-wrap">
                <Tag className="w-5 h-5 text-gray-400" />
                {article.tags.map((tag: string) => (
                  <span
                    key={tag}
                    className="px-3 py-1 bg-gray-100 border-2 border-black text-sm font-bold uppercase"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          )}
        </article>

        {/* Author CTA */}
        <div className="border-3 border-black shadow-brutal p-8 bg-brutal-yellow mt-12">
          <div className="flex flex-col md:flex-row items-center gap-6">
            <div className="w-24 h-24 border-3 border-black bg-white flex items-center justify-center font-bold text-2xl flex-shrink-0">
              {article.authorImage ? (
                <img
                  src={article.authorImage}
                  alt={article.authorName}
                  className="w-full h-full object-cover"
                />
              ) : (
                article.authorName.charAt(0).toUpperCase()
              )}
            </div>
            <div className="flex-1 text-center md:text-left">
              <h3 className="text-2xl font-black uppercase mb-2">
                Written by {article.authorName}
              </h3>
              {article.authorTitle && (
                <p className="text-gray-700 font-medium mb-4">{article.authorTitle}</p>
              )}
              <p className="text-gray-700 font-medium">
                Want personalized career guidance? Book a session with this mentor!
              </p>
            </div>
            <Link
              href="/mentors"
              className="px-6 py-3 bg-black text-white font-bold uppercase border-3 border-black shadow-brutal hover:shadow-brutal-lg hover:translate-x-[-2px] hover:translate-y-[-2px] transition-all flex-shrink-0"
            >
              Find Mentors
            </Link>
          </div>
        </div>

        {/* Back to Blog */}
        <div className="mt-12 text-center">
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 px-6 py-3 bg-white text-black font-bold uppercase border-3 border-black shadow-brutal hover:shadow-brutal-lg hover:translate-x-[-2px] hover:translate-y-[-2px] transition-all"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to All Articles
          </Link>
        </div>
      </div>
    </div>
  );
}
