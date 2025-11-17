"use client";

import { useQuery, useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import { useRouter } from "next/navigation";
import { Pencil, Trash2, Eye, Clock, FileText, Plus } from "lucide-react";
import { Id } from "@/convex/_generated/dataModel";

export default function MentorArticlesPage() {
  const router = useRouter();
  const articles = useQuery(api.articles.getMyArticles);
  const deleteArticle = useMutation(api.articles.deleteArticle);

  const handleDelete = async (articleId: Id<"articles">) => {
    if (confirm("Are you sure you want to delete this article? This action cannot be undone.")) {
      try {
        await deleteArticle({ articleId });
      } catch (error) {
        console.error("Failed to delete article:", error);
        alert("Failed to delete article. Please try again.");
      }
    }
  };

  const formatDate = (timestamp: number) => {
    return new Date(timestamp).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  if (articles === undefined) {
    return (
      <div className="min-h-screen bg-white p-8">
        <div className="max-w-6xl mx-auto">
          <div className="animate-pulse">
            <div className="h-12 bg-gray-200 rounded w-1/3 mb-8"></div>
            <div className="space-y-4">
              {[1, 2, 3].map((i) => (
                <div key={i} className="h-32 bg-gray-200 rounded"></div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  const publishedArticles = articles.filter((a) => a.status === "published");
  const draftArticles = articles.filter((a) => a.status === "draft");

  return (
    <div className="min-h-screen bg-white p-4 md:p-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <h1 className="text-4xl md:text-5xl font-black uppercase mb-2">
                My Articles
              </h1>
              <p className="text-gray-600">
                Share your knowledge and inspire students
              </p>
            </div>
            <button
              onClick={() => router.push("/dashboard/mentor/articles/new")}
              className="px-6 py-3 bg-brutal-blue text-white font-bold uppercase border-3 border-black shadow-brutal hover:shadow-brutal-lg hover:translate-x-[-2px] hover:translate-y-[-2px] transition-all flex items-center gap-2 justify-center"
            >
              <Plus className="w-5 h-5" />
              Write Article
            </button>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <div className="border-3 border-black shadow-brutal p-6 bg-brutal-yellow">
            <div className="text-3xl font-black mb-1">{articles.length}</div>
            <div className="text-sm font-bold uppercase">Total Articles</div>
          </div>
          <div className="border-3 border-black shadow-brutal p-6 bg-brutal-green">
            <div className="text-3xl font-black mb-1">{publishedArticles.length}</div>
            <div className="text-sm font-bold uppercase">Published</div>
          </div>
          <div className="border-3 border-black shadow-brutal p-6 bg-brutal-pink">
            <div className="text-3xl font-black mb-1">
              {articles.reduce((sum, a) => sum + a.viewCount, 0)}
            </div>
            <div className="text-sm font-bold uppercase">Total Views</div>
          </div>
        </div>

        {/* Articles List */}
        {articles.length === 0 ? (
          <div className="border-3 border-black shadow-brutal p-12 text-center">
            <FileText className="w-16 h-16 mx-auto mb-4 text-gray-400" />
            <h3 className="text-2xl font-black uppercase mb-2">No Articles Yet</h3>
            <p className="text-gray-600 mb-6">
              Start sharing your knowledge by writing your first article!
            </p>
            <button
              onClick={() => router.push("/dashboard/mentor/articles/new")}
              className="px-6 py-3 bg-brutal-blue text-white font-bold uppercase border-3 border-black shadow-brutal hover:shadow-brutal-lg hover:translate-x-[-2px] hover:translate-y-[-2px] transition-all inline-flex items-center gap-2"
            >
              <Plus className="w-5 h-5" />
              Write Your First Article
            </button>
          </div>
        ) : (
          <div className="space-y-6">
            {/* Published Articles */}
            {publishedArticles.length > 0 && (
              <div>
                <h2 className="text-2xl font-black uppercase mb-4">
                  Published ({publishedArticles.length})
                </h2>
                <div className="space-y-4">
                  {publishedArticles.map((article) => (
                    <ArticleCard
                      key={article._id}
                      article={article}
                      onEdit={() => router.push(`/dashboard/mentor/articles/edit/${article._id}`)}
                      onDelete={() => handleDelete(article._id)}
                      formatDate={formatDate}
                    />
                  ))}
                </div>
              </div>
            )}

            {/* Draft Articles */}
            {draftArticles.length > 0 && (
              <div>
                <h2 className="text-2xl font-black uppercase mb-4">
                  Drafts ({draftArticles.length})
                </h2>
                <div className="space-y-4">
                  {draftArticles.map((article) => (
                    <ArticleCard
                      key={article._id}
                      article={article}
                      onEdit={() => router.push(`/dashboard/mentor/articles/edit/${article._id}`)}
                      onDelete={() => handleDelete(article._id)}
                      formatDate={formatDate}
                    />
                  ))}
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

function ArticleCard({
  article,
  onEdit,
  onDelete,
  formatDate,
}: {
  article: any;
  onEdit: () => void;
  onDelete: () => void;
  formatDate: (timestamp: number) => string;
}) {
  return (
    <div className="border-3 border-black shadow-brutal p-6 bg-white hover:shadow-brutal-lg transition-all">
      <div className="flex flex-col md:flex-row gap-4">
        {/* Cover Image */}
        {article.coverImage && (
          <div className="w-full md:w-48 h-32 border-2 border-black overflow-hidden flex-shrink-0">
            <img
              src={article.coverImage}
              alt={article.title}
              className="w-full h-full object-cover"
            />
          </div>
        )}

        {/* Content */}
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-4 mb-2">
            <div className="flex-1 min-w-0">
              <h3 className="text-xl font-black uppercase mb-1 truncate">
                {article.title}
              </h3>
              <p className="text-gray-600 text-sm line-clamp-2 mb-2">
                {article.excerpt}
              </p>
            </div>
            {article.status === "draft" && (
              <span className="px-3 py-1 bg-brutal-orange text-white text-xs font-bold uppercase border-2 border-black flex-shrink-0">
                Draft
              </span>
            )}
          </div>

          {/* Meta Info */}
          <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600 mb-4">
            <div className="flex items-center gap-1">
              <Eye className="w-4 h-4" />
              <span>{article.viewCount} views</span>
            </div>
            <div className="flex items-center gap-1">
              <Clock className="w-4 h-4" />
              <span>{article.readTime} min read</span>
            </div>
            <div className="px-2 py-1 bg-gray-100 border-2 border-black text-xs font-bold uppercase">
              {article.category}
            </div>
            <div className="text-gray-500">
              {article.status === "published" && article.publishedAt
                ? `Published ${formatDate(article.publishedAt)}`
                : `Updated ${formatDate(article.updatedAt)}`}
            </div>
          </div>

          {/* Actions */}
          <div className="flex flex-wrap gap-2">
            <button
              onClick={onEdit}
              className="px-4 py-2 bg-brutal-blue text-white font-bold uppercase text-sm border-2 border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[-2px] hover:translate-y-[-2px] transition-all flex items-center gap-1"
            >
              <Pencil className="w-4 h-4" />
              Edit
            </button>
            <button
              onClick={onDelete}
              className="px-4 py-2 bg-white text-red-600 font-bold uppercase text-sm border-2 border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[-2px] hover:translate-y-[-2px] transition-all flex items-center gap-1"
            >
              <Trash2 className="w-4 h-4" />
              Delete
            </button>
            {article.status === "published" && (
              <a
                href={`/blog/${article.slug}`}
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2 bg-white text-black font-bold uppercase text-sm border-2 border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[-2px] hover:translate-y-[-2px] transition-all flex items-center gap-1"
              >
                <Eye className="w-4 h-4" />
                View
              </a>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
