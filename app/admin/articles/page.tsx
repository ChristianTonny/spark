"use client";

import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import { Newspaper, Eye, Calendar, User, FileText } from "lucide-react";
import Link from "next/link";

export default function AdminArticlesPage() {
  const allArticles = useQuery(api.articles.listAll);

  if (allArticles === undefined) {
    return (
      <div className="p-8">
        <div className="animate-pulse space-y-4">
          <div className="h-12 bg-gray-200 rounded w-1/3"></div>
          <div className="h-64 bg-gray-200 rounded"></div>
        </div>
      </div>
    );
  }

  const publishedArticles = allArticles?.filter((a) => a.status === "published") || [];
  const draftArticles = allArticles?.filter((a) => a.status === "draft") || [];
  const totalViews = allArticles?.reduce((sum, a) => sum + a.viewCount, 0) || 0;

  return (
    <div className="p-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-4xl font-black uppercase mb-2">Articles Management</h1>
        <p className="text-gray-600">Moderate and manage platform articles</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
        <StatCard
          title="Total Articles"
          value={allArticles.length}
          icon={Newspaper}
          color="bg-brutal-blue"
        />
        <StatCard
          title="Published"
          value={publishedArticles.length}
          icon={FileText}
          color="bg-brutal-green"
        />
        <StatCard
          title="Drafts"
          value={draftArticles.length}
          icon={FileText}
          color="bg-brutal-orange"
        />
        <StatCard
          title="Total Views"
          value={totalViews}
          icon={Eye}
          color="bg-brutal-purple"
        />
      </div>

      {/* Articles Table */}
      <div className="border-3 border-black shadow-brutal bg-white overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-black text-white">
              <tr>
                <th className="px-6 py-4 text-left font-black uppercase text-sm">
                  Title
                </th>
                <th className="px-6 py-4 text-left font-black uppercase text-sm">
                  Author
                </th>
                <th className="px-6 py-4 text-left font-black uppercase text-sm">
                  Category
                </th>
                <th className="px-6 py-4 text-left font-black uppercase text-sm">
                  Status
                </th>
                <th className="px-6 py-4 text-left font-black uppercase text-sm">
                  Views
                </th>
                <th className="px-6 py-4 text-left font-black uppercase text-sm">
                  Published
                </th>
                <th className="px-6 py-4 text-left font-black uppercase text-sm">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y-2 divide-black">
              {allArticles.length === 0 ? (
                <tr>
                  <td colSpan={7} className="px-6 py-12 text-center text-gray-500">
                    <Newspaper className="w-12 h-12 mx-auto mb-3 opacity-30" />
                    <p className="font-bold uppercase">No articles found</p>
                  </td>
                </tr>
              ) : (
                allArticles.map((article) => (
                  <ArticleRow key={article._id} article={article} />
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

function StatCard({
  title,
  value,
  icon: Icon,
  color,
}: {
  title: string;
  value: number;
  icon: any;
  color: string;
}) {
  return (
    <div className={`${color} border-3 border-black shadow-brutal p-6 text-white`}>
      <div className="flex items-start justify-between mb-4">
        <Icon className="w-8 h-8" />
      </div>
      <div className="text-3xl font-black mb-1">{value}</div>
      <div className="text-sm font-bold uppercase">{title}</div>
    </div>
  );
}

function ArticleRow({ article }: { article: any }) {
  const getStatusColor = (status: string) => {
    return status === "published" ? "bg-brutal-green" : "bg-brutal-orange";
  };

  const formatDate = (timestamp: number) => {
    return new Date(timestamp).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  return (
    <tr className="hover:bg-gray-50 transition-colors">
      <td className="px-6 py-4">
        <div className="font-bold max-w-xs truncate">{article.title}</div>
      </td>
      <td className="px-6 py-4">
        <div className="flex items-center gap-2">
          <User className="w-4 h-4 text-gray-400" />
          <span className="text-sm">Author ID: {article.authorId}</span>
        </div>
      </td>
      <td className="px-6 py-4">
        <span className="px-3 py-1 bg-gray-200 text-black text-xs font-bold uppercase border-2 border-black">
          {article.category}
        </span>
      </td>
      <td className="px-6 py-4">
        <span
          className={`${getStatusColor(
            article.status
          )} text-white px-3 py-1 text-xs font-bold uppercase border-2 border-black`}
        >
          {article.status}
        </span>
      </td>
      <td className="px-6 py-4">
        <div className="flex items-center gap-1">
          <Eye className="w-4 h-4 text-gray-400" />
          <span className="font-medium">{article.viewCount}</span>
        </div>
      </td>
      <td className="px-6 py-4">
        <div className="flex items-center gap-2 text-sm text-gray-600">
          <Calendar className="w-4 h-4" />
          {article.publishedAt ? formatDate(article.publishedAt) : "Not published"}
        </div>
      </td>
      <td className="px-6 py-4">
        <Link
          href={`/resources/${article.slug}`}
          className="px-4 py-2 bg-white text-black text-sm font-bold uppercase border-2 border-black hover:bg-gray-100 transition-all"
        >
          View
        </Link>
      </td>
    </tr>
  );
}
