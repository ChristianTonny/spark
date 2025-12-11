"use client";

import { useState, useEffect } from "react";
import { useQuery, useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import { useRouter, useParams } from "next/navigation";
import { ArrowLeft, Save, Send } from "lucide-react";
import { Id } from "@/convex/_generated/dataModel";
import ArticleEditor from "@/components/ArticleEditor";

const CATEGORIES = [
  "Career Advice",
  "Interview Tips",
  "Resume & CV",
  "Skill Development",
  "Industry Insights",
  "Success Stories",
  "Education & Training",
  "Networking",
  "Work-Life Balance",
  "Technology",
  "Healthcare",
  "Business",
  "Engineering",
  "Other",
];

export default function EditArticlePage() {
  const router = useRouter();
  const params = useParams();
  const articleId = params.id as Id<"articles">;
  const article = useQuery(api.articles.getArticleById, { articleId });
  const updateArticle = useMutation(api.articles.update);

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [excerpt, setExcerpt] = useState("");
  const [category, setCategory] = useState("Career Advice");
  const [tags, setTags] = useState("");
  const [coverImage, setCoverImage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  // Load article data when it arrives
  useEffect(() => {
    if (article && !isLoaded) {
      setTitle(article.title);
      setContent(article.content);
      setExcerpt(article.excerpt || "");
      setCategory(article.category);
      setTags(article.tags.join(", "));
      setCoverImage(article.coverImage || "");
      setIsLoaded(true);
    }
  }, [article, isLoaded]);

  const handleSubmit = async (status?: "draft" | "published") => {
    if (!title.trim() || !content.trim()) {
      alert("Please fill in at least the title and content");
      return;
    }

    setIsSubmitting(true);

    try {
      const tagsArray = tags
        .split(",")
        .map((t) => t.trim())
        .filter((t) => t.length > 0);

      await updateArticle({
        articleId,
        title: title.trim(),
        content: content.trim(),
        excerpt: excerpt.trim() || undefined,
        category,
        tags: tagsArray,
        coverImage: coverImage.trim() || undefined,
        status: status,
      });

      alert("Article updated successfully!");
      router.push("/dashboard/mentor/articles");
    } catch (error) {
      console.error("Failed to update article:", error);
      alert("Failed to update article. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (article === undefined) {
    return (
      <div className="min-h-screen bg-white p-8">
        <div className="max-w-4xl mx-auto">
          <div className="animate-pulse">
            <div className="h-12 bg-gray-200 rounded w-1/3 mb-8"></div>
            <div className="space-y-6">
              {[1, 2, 3, 4].map((i) => (
                <div key={i}>
                  <div className="h-6 bg-gray-200 rounded w-1/4 mb-2"></div>
                  <div className="h-12 bg-gray-200 rounded"></div>
                </div>
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
            <h2 className="text-2xl font-black uppercase mb-4">Article Not Found</h2>
            <p className="text-gray-600 mb-6">
              The article you&apos;re looking for doesn&apos;t exist or you don&apos;t have permission to edit it.
            </p>
            <button
              onClick={() => router.push("/dashboard/mentor/articles")}
              className="px-6 py-3 bg-brutal-blue text-white font-bold uppercase border-3 border-black shadow-brutal hover:shadow-brutal-lg transition-all"
            >
              Back to Articles
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white p-4 md:p-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <button
            onClick={() => router.back()}
            className="flex items-center gap-2 text-gray-600 hover:text-black mb-4 font-bold uppercase text-sm"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Articles
          </button>
          <h1 className="text-4xl md:text-5xl font-black uppercase mb-2">
            Edit Article
          </h1>
          <p className="text-gray-600">
            Update your article content and settings
          </p>
          {article.status === "draft" && (
            <div className="mt-2 inline-block px-3 py-1 bg-brutal-orange text-white text-sm font-bold uppercase border-2 border-black">
              Draft
            </div>
          )}
        </div>

        {/* Form */}
        <div className="space-y-6">
          {/* Title */}
          <div>
            <label className="block text-sm font-bold uppercase mb-2">
              Article Title *
            </label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="How to Land Your First Software Engineering Job"
              className="w-full px-4 py-3 border-3 border-black font-medium focus:outline-none focus:shadow-brutal transition-all"
              maxLength={100}
            />
            <div className="text-xs text-gray-500 mt-1">
              {title.length}/100 characters
            </div>
          </div>

          {/* Category */}
          <div>
            <label className="block text-sm font-bold uppercase mb-2">
              Category *
            </label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full px-4 py-3 border-3 border-black font-medium focus:outline-none focus:shadow-brutal transition-all bg-white"
            >
              {CATEGORIES.map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
          </div>

          {/* Cover Image URL */}
          <div>
            <label className="block text-sm font-bold uppercase mb-2">
              Cover Image URL (Optional)
            </label>
            <input
              type="url"
              value={coverImage}
              onChange={(e) => setCoverImage(e.target.value)}
              placeholder="https://images.unsplash.com/photo-..."
              className="w-full px-4 py-3 border-3 border-black font-medium focus:outline-none focus:shadow-brutal transition-all"
            />
            <div className="text-xs text-gray-500 mt-1">
              Paste a URL from Unsplash, Pexels, or upload to an image hosting service
            </div>
            {coverImage && (
              <div className="mt-3 border-2 border-black p-2">
                <img
                  src={coverImage}
                  alt="Cover preview"
                  className="w-full h-48 object-cover"
                  onError={(e) => {
                    e.currentTarget.src = "";
                    e.currentTarget.alt = "Invalid image URL";
                  }}
                />
              </div>
            )}
          </div>

          {/* Excerpt */}
          <div>
            <label className="block text-sm font-bold uppercase mb-2">
              Excerpt (Optional)
            </label>
            <textarea
              value={excerpt}
              onChange={(e) => setExcerpt(e.target.value)}
              placeholder="A brief summary of your article (will be auto-generated if left blank)"
              rows={3}
              className="w-full px-4 py-3 border-3 border-black font-medium focus:outline-none focus:shadow-brutal transition-all resize-none"
              maxLength={200}
            />
            <div className="text-xs text-gray-500 mt-1">
              {excerpt.length}/200 characters
            </div>
          </div>

          {/* Content */}
          <div>
            <label className="block text-sm font-bold uppercase mb-2">
              Article Content *
            </label>
            {isLoaded ? (
              <ArticleEditor
                key={articleId}
                content={content}
                onChange={setContent}
                placeholder="Start writing your article... Use the toolbar above or type markdown shortcuts like **bold**, *italic*, # heading, - list, > quote"
              />
            ) : (
              <div className="border-3 border-black p-12 text-center bg-gray-50">
                <div className="animate-pulse">
                  <div className="h-4 bg-gray-300 rounded w-3/4 mb-3 mx-auto"></div>
                  <div className="h-4 bg-gray-300 rounded w-1/2 mb-3 mx-auto"></div>
                  <div className="h-4 bg-gray-300 rounded w-2/3 mx-auto"></div>
                </div>
              </div>
            )}
          </div>

          {/* Tags */}
          <div>
            <label className="block text-sm font-bold uppercase mb-2">
              Tags (Optional)
            </label>
            <input
              type="text"
              value={tags}
              onChange={(e) => setTags(e.target.value)}
              placeholder="resume, interview, career-change, tech (comma-separated)"
              className="w-full px-4 py-3 border-3 border-black font-medium focus:outline-none focus:shadow-brutal transition-all"
            />
            <div className="text-xs text-gray-500 mt-1">
              Separate tags with commas (e.g., resume, interview, networking)
            </div>
          </div>

          {/* Actions */}
          <div className="flex flex-col md:flex-row gap-4 pt-6 border-t-3 border-black">
            <button
              onClick={() => handleSubmit(article.status === "published" ? undefined : "draft")}
              disabled={isSubmitting}
              className="flex-1 px-6 py-4 bg-white text-black font-bold uppercase border-3 border-black shadow-brutal hover:shadow-brutal-lg hover:translate-x-[-2px] hover:translate-y-[-2px] transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              <Save className="w-5 h-5" />
              {article.status === "published" ? "Save Changes" : "Save as Draft"}
            </button>
            {article.status === "draft" && (
              <button
                onClick={() => handleSubmit("published")}
                disabled={isSubmitting}
                className="flex-1 px-6 py-4 bg-brutal-blue text-white font-bold uppercase border-3 border-black shadow-brutal hover:shadow-brutal-lg hover:translate-x-[-2px] hover:translate-y-[-2px] transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                <Send className="w-5 h-5" />
                Publish Article
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
