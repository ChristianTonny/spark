"use client";

import { useState } from "react";
import { useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ArrowLeft, Save, Eye } from "lucide-react";
import dynamic from "next/dynamic";

// Dynamically import markdown editor (client-side only)
const MDEditor = dynamic(() => import("@uiw/react-md-editor"), {
  ssr: false,
});

export default function NewResourcePage() {
  const router = useRouter();
  const [type, setType] = useState<"article" | "video" | "opportunity" | "guide">("article");
  const [title, setTitle] = useState("");
  const [excerpt, setExcerpt] = useState("");
  const [content, setContent] = useState("");
  const [category, setCategory] = useState("Career Advice");
  const [tags, setTags] = useState<string[]>([]);
  const [tagInput, setTagInput] = useState("");
  const [coverImage, setCoverImage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const createResource = useMutation(api.mentorResources.createResource);

  const categories = [
    "Career Advice",
    "Interview Tips",
    "Skills Development",
    "Industry Insights",
    "Job Opportunities",
    "Networking",
    "Education & Training",
    "Work-Life Balance",
    "Other",
  ];

  const handleAddTag = () => {
    if (tagInput.trim() && !tags.includes(tagInput.trim())) {
      setTags([...tags, tagInput.trim()]);
      setTagInput("");
    }
  };

  const handleRemoveTag = (tagToRemove: string) => {
    setTags(tags.filter((tag) => tag !== tagToRemove));
  };

  const handleSaveDraft = async () => {
    if (!title.trim() || !content.trim() || !excerpt.trim()) {
      alert("Please fill in title, excerpt, and content before saving.");
      return;
    }

    setIsSubmitting(true);
    try {
      await createResource({
        type,
        title: title.trim(),
        content: content.trim(),
        excerpt: excerpt.trim(),
        category,
        tags,
        coverImage: coverImage.trim() || undefined,
        status: "draft",
      });
      router.push("/dashboard/mentor/resources");
    } catch (error) {
      console.error("Failed to save draft:", error);
      alert("Failed to save draft. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handlePublish = async () => {
    if (!title.trim() || !content.trim() || !excerpt.trim()) {
      alert("Please fill in title, excerpt, and content before publishing.");
      return;
    }

    if (content.trim().length < 100) {
      alert("Content should be at least 100 characters long.");
      return;
    }

    setIsSubmitting(true);
    try {
      await createResource({
        type,
        title: title.trim(),
        content: content.trim(),
        excerpt: excerpt.trim(),
        category,
        tags,
        coverImage: coverImage.trim() || undefined,
        status: "published",
      });
      router.push("/dashboard/mentor/resources");
    } catch (error) {
      console.error("Failed to publish resource:", error);
      alert("Failed to publish resource. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-8">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="flex items-center gap-4 mb-8">
          <Link href="/dashboard/mentor/resources">
            <button className="p-2 border-3 border-black bg-white hover:bg-gray-100 transition-colors">
              <ArrowLeft className="w-6 h-6" />
            </button>
          </Link>
          <div>
            <h1 className="text-4xl font-black uppercase">Create Resource</h1>
            <p className="text-gray-600 mt-1">Share your knowledge with students</p>
          </div>
        </div>

        {/* Form */}
        <div className="border-3 border-black bg-white p-8 shadow-brutal-lg">
          {/* Type Selection */}
          <div className="mb-6">
            <label className="block text-sm font-black uppercase text-gray-700 mb-3">
              Resource Type *
            </label>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {(["article", "video", "opportunity", "guide"] as const).map((t) => (
                <button
                  key={t}
                  type="button"
                  onClick={() => setType(t)}
                  className={`px-4 py-3 font-bold uppercase text-sm border-3 border-black transition-all ${
                    type === t
                      ? "bg-brutal-blue text-white shadow-brutal"
                      : "bg-white hover:bg-gray-50"
                  }`}
                >
                  {t}
                </button>
              ))}
            </div>
          </div>

          {/* Title */}
          <div className="mb-6">
            <label className="block text-sm font-black uppercase text-gray-700 mb-2">
              Title * (10-100 characters)
            </label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              maxLength={100}
              className="w-full px-4 py-3 border-3 border-black font-bold focus:outline-none focus:shadow-brutal"
              placeholder="Enter a compelling title..."
            />
            <p className="text-xs text-gray-600 mt-1">
              {title.length}/100 characters
            </p>
          </div>

          {/* Category */}
          <div className="mb-6">
            <label className="block text-sm font-black uppercase text-gray-700 mb-2">
              Category *
            </label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full px-4 py-3 border-3 border-black font-bold focus:outline-none focus:shadow-brutal"
            >
              {categories.map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
          </div>

          {/* Excerpt */}
          <div className="mb-6">
            <label className="block text-sm font-black uppercase text-gray-700 mb-2">
              Short Description * (max 200 characters)
            </label>
            <textarea
              value={excerpt}
              onChange={(e) => setExcerpt(e.target.value)}
              maxLength={200}
              rows={3}
              className="w-full px-4 py-3 border-3 border-black font-bold focus:outline-none focus:shadow-brutal resize-none"
              placeholder="Write a brief description that will appear in the preview..."
            />
            <p className="text-xs text-gray-600 mt-1">
              {excerpt.length}/200 characters
            </p>
          </div>

          {/* Cover Image */}
          <div className="mb-6">
            <label className="block text-sm font-black uppercase text-gray-700 mb-2">
              Cover Image URL (Optional)
            </label>
            <input
              type="url"
              value={coverImage}
              onChange={(e) => setCoverImage(e.target.value)}
              className="w-full px-4 py-3 border-3 border-black font-bold focus:outline-none focus:shadow-brutal"
              placeholder="https://example.com/image.jpg"
            />
            {coverImage && (
              <div className="mt-3 border-2 border-black p-2">
                <img
                  src={coverImage}
                  alt="Preview"
                  className="w-full h-48 object-cover"
                  onError={(e) => {
                    e.currentTarget.src = "";
                    e.currentTarget.style.display = "none";
                  }}
                />
              </div>
            )}
          </div>

          {/* Tags */}
          <div className="mb-6">
            <label className="block text-sm font-black uppercase text-gray-700 mb-2">
              Tags
            </label>
            <div className="flex gap-2 mb-2">
              <input
                type="text"
                value={tagInput}
                onChange={(e) => setTagInput(e.target.value)}
                onKeyPress={(e) => {
                  if (e.key === "Enter") {
                    e.preventDefault();
                    handleAddTag();
                  }
                }}
                className="flex-1 px-4 py-2 border-3 border-black font-bold focus:outline-none focus:shadow-brutal"
                placeholder="Add a tag (press Enter)"
              />
              <button
                type="button"
                onClick={handleAddTag}
                className="px-4 py-2 bg-brutal-blue text-white font-bold uppercase border-3 border-black shadow-brutal hover:shadow-brutal-lg transition-all"
              >
                Add
              </button>
            </div>
            {tags.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-3 py-1 bg-brutal-yellow border-2 border-black text-sm font-bold flex items-center gap-2"
                  >
                    {tag}
                    <button
                      onClick={() => handleRemoveTag(tag)}
                      className="text-black hover:text-red-600"
                    >
                      ×
                    </button>
                  </span>
                ))}
              </div>
            )}
          </div>

          {/* Content Editor */}
          <div className="mb-6">
            <label className="block text-sm font-black uppercase text-gray-700 mb-2">
              Content * (min 100 characters, supports Markdown)
            </label>
            <div className="border-3 border-black">
              <MDEditor
                value={content}
                onChange={(val) => setContent(val || "")}
                height={500}
                preview="live"
              />
            </div>
            <p className="text-xs text-gray-600 mt-1">
              {content.length} characters • Markdown formatting supported
            </p>
          </div>

          {/* Actions */}
          <div className="flex gap-3 pt-6 border-t-3 border-black">
            <button
              onClick={handleSaveDraft}
              disabled={isSubmitting}
              className="flex-1 px-6 py-3 bg-brutal-orange text-white font-bold uppercase border-3 border-black shadow-brutal hover:shadow-brutal-lg hover:translate-x-[-2px] hover:translate-y-[-2px] transition-all flex items-center justify-center gap-2 disabled:opacity-50"
            >
              <Save className="w-5 h-5" />
              {isSubmitting ? "Saving..." : "Save Draft"}
            </button>
            <button
              onClick={handlePublish}
              disabled={isSubmitting}
              className="flex-1 px-6 py-3 bg-brutal-green text-black font-bold uppercase border-3 border-black shadow-brutal hover:shadow-brutal-lg hover:translate-x-[-2px] hover:translate-y-[-2px] transition-all flex items-center justify-center gap-2 disabled:opacity-50"
            >
              <Eye className="w-5 h-5" />
              {isSubmitting ? "Publishing..." : "Publish Now"}
            </button>
            <Link href="/dashboard/mentor/resources">
              <button className="px-6 py-3 border-3 border-black bg-white font-bold uppercase hover:bg-gray-100 transition-colors">
                Cancel
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
