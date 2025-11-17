"use client";

import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import Link from "next/link";
import {
  Users,
  FileText,
  Calendar,
  DollarSign,
  Newspaper,
  TrendingUp,
  AlertCircle,
  CheckCircle,
  Clock,
} from "lucide-react";

export default function AdminDashboardPage() {
  const stats = useQuery(api.admin.getDashboardStats);
  const recentActivity = useQuery(api.admin.getRecentActivity, { limit: 10 });

  if (stats === undefined || recentActivity === undefined) {
    return (
      <div className="p-8">
        <div className="animate-pulse space-y-6">
          <div className="h-12 bg-gray-200 rounded w-1/3"></div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[1, 2, 3, 4].map((i) => (
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
        <h1 className="text-4xl font-black uppercase mb-2">Admin Dashboard</h1>
        <p className="text-gray-600">Platform overview and quick actions</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {/* Total Users */}
        <StatCard
          title="Total Users"
          value={stats.users.total}
          subtitle={`${stats.users.students} students, ${stats.users.mentors} mentors`}
          icon={Users}
          color="bg-brutal-blue"
        />

        {/* Pending Applications */}
        <StatCard
          title="Pending Applications"
          value={stats.applications.pending}
          subtitle={`${stats.applications.approved} approved total`}
          icon={FileText}
          color="bg-brutal-orange"
          link="/admin/mentor-applications"
        />

        {/* Total Bookings */}
        <StatCard
          title="Total Bookings"
          value={stats.bookings.total}
          subtitle={`${stats.bookings.completed} completed`}
          icon={Calendar}
          color="bg-brutal-green"
        />

        {/* Revenue */}
        <StatCard
          title="Platform Revenue"
          value={`${stats.revenue.total.toLocaleString()} RWF`}
          subtitle={`${stats.revenue.thisMonth.toLocaleString()} RWF this month`}
          icon={DollarSign}
          color="bg-brutal-purple"
        />

        {/* Articles */}
        <StatCard
          title="Published Articles"
          value={stats.articles.published}
          subtitle={`${stats.articles.drafts} drafts`}
          icon={Newspaper}
          color="bg-brutal-yellow"
        />

        {/* Active Mentors */}
        <StatCard
          title="Approved Mentors"
          value={stats.users.approvedMentors}
          subtitle={`${stats.users.mentors} total mentors`}
          icon={CheckCircle}
          color="bg-brutal-green"
        />

        {/* Confirmed Bookings */}
        <StatCard
          title="Confirmed Bookings"
          value={stats.bookings.confirmed}
          subtitle={`${stats.bookings.pending} pending`}
          icon={Clock}
          color="bg-brutal-blue"
        />

        {/* Article Views */}
        <StatCard
          title="Article Views"
          value={stats.articles.totalViews}
          subtitle="Total platform views"
          icon={TrendingUp}
          color="bg-brutal-purple"
        />
      </div>

      {/* Quick Actions */}
      <div className="mb-8">
        <h2 className="text-2xl font-black uppercase mb-4">Quick Actions</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <QuickActionCard
            title="Review Applications"
            description={`${stats.applications.pending} pending applications`}
            href="/admin/mentor-applications"
            color="bg-brutal-orange"
          />
          <QuickActionCard
            title="Manage Users"
            description={`${stats.users.total} total users`}
            href="/admin/users"
            color="bg-brutal-blue"
          />
          <QuickActionCard
            title="View Bookings"
            description={`${stats.bookings.total} total bookings`}
            href="/admin/bookings"
            color="bg-brutal-green"
          />
        </div>
      </div>

      {/* Recent Activity */}
      <div>
        <h2 className="text-2xl font-black uppercase mb-4">Recent Activity</h2>
        <div className="border-3 border-black shadow-brutal bg-white">
          <div className="divide-y-2 divide-black">
            {recentActivity.length === 0 ? (
              <div className="p-8 text-center text-gray-500">
                No recent activity
              </div>
            ) : (
              recentActivity.map((activity, index) => (
                <ActivityItem key={index} activity={activity} />
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

function StatCard({
  title,
  value,
  subtitle,
  icon: Icon,
  color,
  link,
}: {
  title: string;
  value: string | number;
  subtitle: string;
  icon: any;
  color: string;
  link?: string;
}) {
  const content = (
    <div
      className={`${color} border-3 border-black shadow-brutal p-6 text-white ${
        link ? "cursor-pointer hover:shadow-brutal-lg transition-all" : ""
      }`}
    >
      <div className="flex items-start justify-between mb-4">
        <Icon className="w-8 h-8" />
      </div>
      <div className="text-3xl font-black mb-1">{value}</div>
      <div className="text-sm font-bold uppercase mb-2">{title}</div>
      <div className="text-xs opacity-90">{subtitle}</div>
    </div>
  );

  if (link) {
    return <Link href={link}>{content}</Link>;
  }

  return content;
}

function QuickActionCard({
  title,
  description,
  href,
  color,
}: {
  title: string;
  description: string;
  href: string;
  color: string;
}) {
  return (
    <Link
      href={href}
      className={`${color} border-3 border-black shadow-brutal p-6 text-white hover:shadow-brutal-lg hover:translate-x-[-2px] hover:translate-y-[-2px] transition-all`}
    >
      <h3 className="text-xl font-black uppercase mb-2">{title}</h3>
      <p className="text-sm opacity-90">{description}</p>
    </Link>
  );
}

function ActivityItem({ activity }: { activity: any }) {
  const getIcon = () => {
    switch (activity.type) {
      case "user_signup":
        return <Users className="w-5 h-5" />;
      case "mentor_application":
        return <FileText className="w-5 h-5" />;
      case "booking":
        return <Calendar className="w-5 h-5" />;
      default:
        return <AlertCircle className="w-5 h-5" />;
    }
  };

  const getLabel = () => {
    switch (activity.type) {
      case "user_signup":
        return "New User Signup";
      case "mentor_application":
        return "Mentor Application";
      case "booking":
        return "New Booking";
      default:
        return "Activity";
    }
  };

  const getDetails = () => {
    switch (activity.type) {
      case "user_signup":
        return `${activity.data.firstName} ${activity.data.lastName} (${activity.data.role})`;
      case "mentor_application":
        return `${activity.data.fullName} - ${activity.data.currentRole}`;
      case "booking":
        return `Session booked`;
      default:
        return "";
    }
  };

  const timeAgo = (timestamp: number) => {
    const seconds = Math.floor((Date.now() - timestamp) / 1000);
    if (seconds < 60) return "just now";
    const minutes = Math.floor(seconds / 60);
    if (minutes < 60) return `${minutes}m ago`;
    const hours = Math.floor(minutes / 60);
    if (hours < 24) return `${hours}h ago`;
    const days = Math.floor(hours / 24);
    return `${days}d ago`;
  };

  return (
    <div className="p-4 flex items-center gap-4 hover:bg-gray-50 transition-colors">
      <div className="flex-shrink-0 w-10 h-10 bg-gray-200 border-2 border-black flex items-center justify-center">
        {getIcon()}
      </div>
      <div className="flex-1 min-w-0">
        <p className="font-bold text-sm uppercase">{getLabel()}</p>
        <p className="text-sm text-gray-600 truncate">{getDetails()}</p>
      </div>
      <div className="flex-shrink-0 text-xs text-gray-500 font-medium">
        {timeAgo(activity.timestamp)}
      </div>
    </div>
  );
}
