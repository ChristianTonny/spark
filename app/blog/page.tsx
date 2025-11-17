"use client";

import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import { useState } from "react";
import { Search, Clock, Eye, BookOpen } from "lucide-react";
import Link from "next/link";

export default function BlogPage() {
  const articles = useQuery(api.articles.getPublishedArticles, {});
  const categories = useQuery(api.articles.getCategories);

  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("All");

  const formatDate = (timestamp: number) => {
    return new Date(timestamp).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  // Filter articles
  const filteredArticles = articles
    ?.filter((article) => {
      const matchesSearch =
        searchQuery === "" ||
        article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        article.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
        article.authorName.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesCategory =
        selectedCategory === "All" || article.category === selectedCategory;

      return matchesSearch && matchesCategory;
    })
    .sort((a, b) => (b.publishedAt || 0) - (a.publishedAt || 0));

  if (articles === undefined || categories === undefined) {
    return (
      <div className="min-h-screen bg-white p-8">
        <div className="max-w-7xl mx-auto">
          <div className="animate-pulse">
            <div className="h-16 bg-gray-200 rounded w-1/2 mb-12"></div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <div key={i} className="h-96 bg-gray-200 rounded"></div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <div className="bg-brutal-blue border-b-4 border-black p-8 md:p-16">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-5xl md:text-7xl font-black uppercase text-white mb-4">
            Career Resources
          </h1>
          <p className="text-xl md:text-2xl text-white font-medium max-w-2xl">
            Expert advice, industry insights, and career guidance from experienced mentors
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto p-4 md:p-8">
        {/* Search and Filters */}
        <div className="mb-8 space-y-4">
          {/* Search Bar */}
          <div className="relative">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search articles, authors, topics..."
              className="w-full pl-12 pr-4 py-4 border-3 border-black font-medium text-lg focus:outline-none focus:shadow-brutal transition-all"
            />
          </div>

          {/* Category Filter */}
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => setSelectedCategory("All")}
              className={`px-4 py-2 font-bold uppercase text-sm border-2 border-black transition-all ${
                selectedCategory === "All"
                  ? "bg-black text-white"
                  : "bg-white text-black hover:bg-gray-100"
              }`}
            >
              All ({articles.length})
            </button>
            {categories.map((category) => {
              const count = articles.filter((a) => a.category === category).length;
              return (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-4 py-2 font-bold uppercase text-sm border-2 border-black transition-all ${
                    selectedCategory === category
                      ? "bg-black text-white"
                      : "bg-white text-black hover:bg-gray-100"
                  }`}
                >
                  {category} ({count})
                </button>
              );
            })}
          </div>
        </div>

        {/* Results Count */}
        <div className="mb-6">
          <p className="text-gray-600 font-medium">
            {filteredArticles?.length || 0} article
            {filteredArticles?.length !== 1 ? "s" : ""} found
          </p>
        </div>

        {/* Articles Grid */}
        {filteredArticles && filteredArticles.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredArticles.map((article) => (
              <ArticleCard key={article._id} article={article} formatDate={formatDate} />
            ))}
          </div>
        ) : (
          <div className="border-3 border-black shadow-brutal p-12 text-center">
            <BookOpen className="w-16 h-16 mx-auto mb-4 text-gray-400" />
            <h3 className="text-2xl font-black uppercase mb-2">No Articles Found</h3>
            <p className="text-gray-600 mb-6">
              {searchQuery || selectedCategory !== "All"
                ? "Try adjusting your search or filters"
                : "Check back soon for new content!"}
            </p>
            {(searchQuery || selectedCategory !== "All") && (
              <button
                onClick={() => {
                  setSearchQuery("");
                  setSelectedCategory("All");
                }}
                className="px-6 py-3 bg-brutal-blue text-white font-bold uppercase border-3 border-black shadow-brutal hover:shadow-brutal-lg transition-all"
              >
                Clear Filters
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

function ArticleCard({
  article,
  formatDate,
}: {
  article: any;
  formatDate: (timestamp: number) => string;
}) {
  return (
    <Link href={`/blog/${article.slug}`}>
      <div className="border-3 border-black shadow-brutal hover:shadow-brutal-lg hover:translate-x-[-2px] hover:translate-y-[-2px] transition-all bg-white h-full flex flex-col cursor-pointer">
        {/* Cover Image */}
        {article.coverImage ? (
          <div className="w-full h-48 border-b-3 border-black overflow-hidden">
            <img
              src={article.coverImage}
              alt={article.title}
              className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
            />
          </div>
        ) : (
          <div className="w-full h-48 border-b-3 border-black bg-gradient-to-br from-brutal-blue to-brutal-purple flex items-center justify-center">
            <BookOpen className="w-16 h-16 text-white" />
          </div>
        )}

        {/* Content */}
        <div className="p-6 flex-1 flex flex-col">
          {/* Category Badge */}
          <div className="mb-3">
            <span className="px-3 py-1 bg-brutal-yellow border-2 border-black text-xs font-bold uppercase">
              {article.category}
            </span>
          </div>

          {/* Title */}
          <h3 className="text-xl font-black uppercase mb-2 line-clamp-2 flex-shrink-0">
            {article.title}
          </h3>

          {/* Excerpt */}
          <p className="text-gray-600 text-sm mb-4 line-clamp-3 flex-1">
            {article.excerpt}
          </p>

          {/* Author & Meta */}
          <div className="border-t-2 border-gray-200 pt-4 mt-auto">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 border-2 border-black bg-gray-200 flex items-center justify-center font-bold text-sm">
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
              <div className="flex-1 min-w-0">
                <div className="font-bold text-sm truncate">{article.authorName}</div>
                {article.authorTitle && (
                  <div className="text-xs text-gray-600 truncate">{article.authorTitle}</div>
                )}
              </div>
            </div>

            {/* Stats */}
            <div className="flex items-center gap-4 text-xs text-gray-600">
              <div className="flex items-center gap-1">
                <Clock className="w-3 h-3" />
                <span>{article.readTime} min read</span>
              </div>
              <div className="flex items-center gap-1">
                <Eye className="w-3 h-3" />
                <span>{article.viewCount} views</span>
              </div>
              {article.publishedAt && (
                <div className="ml-auto">{formatDate(article.publishedAt)}</div>
              )}
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}
