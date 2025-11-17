"use client";

import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import {
  Users,
  TrendingUp,
  Calendar,
  DollarSign,
  Newspaper,
  Target,
  BarChart3,
} from "lucide-react";

export default function AdminAnalyticsPage() {
  const stats = useQuery(api.admin.getDashboardStats);

  if (stats === undefined) {
    return (
      <div className="p-8">
        <div className="animate-pulse space-y-6">
          <div className="h-12 bg-gray-200 rounded w-1/3"></div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div key={i} className="h-32 bg-gray-200 rounded"></div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="p-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-4xl font-black uppercase mb-2">Platform Analytics</h1>
        <p className="text-gray-600">Deep dive into platform metrics and growth</p>
      </div>

      {/* User Metrics */}
      <div className="mb-8">
        <h2 className="text-2xl font-black uppercase mb-4 flex items-center gap-2">
          <Users className="w-6 h-6" />
          User Metrics
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <MetricCard
            title="Total Users"
            value={stats.users.total}
            subtitle="All platform users"
            icon={Users}
            color="bg-brutal-blue"
          />
          <MetricCard
            title="Students"
            value={stats.users.students}
            subtitle={`${((stats.users.students / stats.users.total) * 100).toFixed(1)}% of total`}
            icon={Users}
            color="bg-brutal-green"
          />
          <MetricCard
            title="Mentors"
            value={stats.users.mentors}
            subtitle={`${stats.users.approvedMentors} approved`}
            icon={Users}
            color="bg-brutal-purple"
          />
          <MetricCard
            title="Approval Rate"
            value={`${stats.users.mentors > 0 ? ((stats.users.approvedMentors / stats.users.mentors) * 100).toFixed(0) : 0}%`}
            subtitle="Mentors approved"
            icon={Target}
            color="bg-brutal-orange"
          />
        </div>
      </div>

      {/* Engagement Metrics */}
      <div className="mb-8">
        <h2 className="text-2xl font-black uppercase mb-4 flex items-center gap-2">
          <BarChart3 className="w-6 h-6" />
          Engagement Metrics
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <MetricCard
            title="Total Bookings"
            value={stats.bookings.total}
            subtitle={`${stats.bookings.completed} completed`}
            icon={Calendar}
            color="bg-brutal-blue"
          />
          <MetricCard
            title="Pending"
            value={stats.bookings.pending}
            subtitle="Awaiting confirmation"
            icon={Calendar}
            color="bg-brutal-orange"
          />
          <MetricCard
            title="Confirmed"
            value={stats.bookings.confirmed}
            subtitle="Upcoming sessions"
            icon={Calendar}
            color="bg-brutal-green"
          />
          <MetricCard
            title="Completion Rate"
            value={`${stats.bookings.total > 0 ? ((stats.bookings.completed / stats.bookings.total) * 100).toFixed(0) : 0}%`}
            subtitle="Sessions completed"
            icon={TrendingUp}
            color="bg-brutal-purple"
          />
        </div>
      </div>

      {/* Revenue Metrics */}
      <div className="mb-8">
        <h2 className="text-2xl font-black uppercase mb-4 flex items-center gap-2">
          <DollarSign className="w-6 h-6" />
          Revenue Metrics
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <MetricCard
            title="Total Revenue"
            value={`${stats.revenue.total.toLocaleString()} RWF`}
            subtitle="All-time earnings"
            icon={DollarSign}
            color="bg-brutal-green"
          />
          <MetricCard
            title="This Month"
            value={`${stats.revenue.thisMonth.toLocaleString()} RWF`}
            subtitle="Current month earnings"
            icon={TrendingUp}
            color="bg-brutal-blue"
          />
          <MetricCard
            title="Average Per Booking"
            value={`${stats.bookings.completed > 0 ? Math.round(stats.revenue.total / stats.bookings.completed).toLocaleString() : 0} RWF`}
            subtitle="Revenue per session"
            icon={BarChart3}
            color="bg-brutal-purple"
          />
        </div>
      </div>

      {/* Content Metrics */}
      <div className="mb-8">
        <h2 className="text-2xl font-black uppercase mb-4 flex items-center gap-2">
          <Newspaper className="w-6 h-6" />
          Content Metrics
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <MetricCard
            title="Published Articles"
            value={stats.articles.published}
            subtitle={`${stats.articles.drafts} drafts`}
            icon={Newspaper}
            color="bg-brutal-blue"
          />
          <MetricCard
            title="Total Views"
            value={stats.articles.totalViews}
            subtitle="All article views"
            icon={TrendingUp}
            color="bg-brutal-green"
          />
          <MetricCard
            title="Avg Views/Article"
            value={stats.articles.published > 0 ? Math.round(stats.articles.totalViews / stats.articles.published) : 0}
            subtitle="Per published article"
            icon={BarChart3}
            color="bg-brutal-purple"
          />
          <MetricCard
            title="Publish Rate"
            value={`${(stats.articles.published + stats.articles.drafts) > 0 ? ((stats.articles.published / (stats.articles.published + stats.articles.drafts)) * 100).toFixed(0) : 0}%`}
            subtitle="Articles published"
            icon={Target}
            color="bg-brutal-orange"
          />
        </div>
      </div>

      {/* Application Metrics */}
      <div>
        <h2 className="text-2xl font-black uppercase mb-4 flex items-center gap-2">
          <Target className="w-6 h-6" />
          Application Metrics
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <MetricCard
            title="Total Applications"
            value={stats.applications.total}
            subtitle="All mentor applications"
            icon={Users}
            color="bg-brutal-blue"
          />
          <MetricCard
            title="Pending Review"
            value={stats.applications.pending}
            subtitle="Awaiting approval"
            icon={Calendar}
            color="bg-brutal-orange"
          />
          <MetricCard
            title="Approved"
            value={stats.applications.approved}
            subtitle="Accepted applications"
            icon={TrendingUp}
            color="bg-brutal-green"
          />
          <MetricCard
            title="Approval Rate"
            value={`${(stats.applications.total - stats.applications.pending) > 0 ? ((stats.applications.approved / (stats.applications.total - stats.applications.pending)) * 100).toFixed(0) : 0}%`}
            subtitle="Applications approved"
            icon={Target}
            color="bg-brutal-purple"
          />
        </div>
      </div>
    </div>
  );
}

function MetricCard({
  title,
  value,
  subtitle,
  icon: Icon,
  color,
}: {
  title: string;
  value: string | number;
  subtitle: string;
  icon: any;
  color: string;
}) {
  return (
    <div className={`${color} border-3 border-black shadow-brutal p-6 text-white`}>
      <div className="flex items-start justify-between mb-4">
        <Icon className="w-8 h-8" />
      </div>
      <div className="text-3xl font-black mb-1">{value}</div>
      <div className="text-sm font-bold uppercase mb-2">{title}</div>
      <div className="text-xs opacity-90">{subtitle}</div>
    </div>
  );
}
