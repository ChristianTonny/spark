"use client";

import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import { useRoleGuard } from "@/lib/hooks/useRoleGuard";
import {
  DollarSign,
  TrendingUp,
  TrendingDown,
  Calendar,
  Download,
  Star,
  Clock,
} from "lucide-react";
import Link from "next/link";
import { useState } from "react";

export default function MentorEarningsPage() {
  useRoleGuard(["mentor"]);
  const [downloadingCSV, setDownloadingCSV] = useState(false);

  const summary = useQuery(api.earnings.getEarningsSummary);
  const monthlyBreakdown = useQuery(api.earnings.getMonthlyBreakdown);
  const recentSessions = useQuery(api.earnings.getRecentSessions, { limit: 10 });
  const csvData = useQuery(api.earnings.exportEarningsCSV);

  // Handle CSV download
  const handleDownloadCSV = () => {
    if (!csvData) return;

    setDownloadingCSV(true);
    
    try {
      const blob = new Blob([csvData], { type: "text/csv" });
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `earnings-${new Date().toISOString().split("T")[0]}.csv`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error("Error downloading CSV:", error);
      alert("Failed to download CSV. Please try again.");
    } finally {
      setDownloadingCSV(false);
    }
  };

  if (summary === undefined || monthlyBreakdown === undefined || recentSessions === undefined) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-black border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-xl font-bold">Loading earnings data...</p>
        </div>
      </div>
    );
  }

  const isGrowthPositive = summary.growthPercentage >= 0;

  return (
    <div className="min-h-screen bg-background py-8 px-4">
      <div className="container mx-auto max-w-7xl">
        {/* Header */}
        <div className="mb-8 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h1 className="text-4xl font-black uppercase mb-2">Earnings</h1>
            <p className="text-lg font-bold text-gray-700">
              Track your session earnings and growth
            </p>
          </div>
          <button
            onClick={handleDownloadCSV}
            disabled={downloadingCSV}
            className="px-6 py-3 bg-brutal-green text-white font-bold uppercase border-3 border-black shadow-brutal hover:shadow-brutal-lg transition-all flex items-center gap-2"
          >
            <Download className="w-5 h-5" />
            {downloadingCSV ? "Downloading..." : "Export CSV"}
          </button>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {/* Total Earnings */}
          <div className="bg-brutal-green text-white border-3 border-black shadow-brutal-lg p-6">
            <div className="flex items-center justify-between mb-2">
              <DollarSign className="w-8 h-8" />
              <span className="text-4xl font-black">
                {(summary.totalEarnings / 1000).toFixed(0)}K
              </span>
            </div>
            <p className="font-black uppercase text-sm">Total Earnings (RWF)</p>
            <p className="text-sm font-bold opacity-90 mt-1">
              {summary.totalSessions} sessions completed
            </p>
          </div>

          {/* This Month */}
          <div className="bg-brutal-blue text-white border-3 border-black shadow-brutal-lg p-6">
            <div className="flex items-center justify-between mb-2">
              <Calendar className="w-8 h-8" />
              <span className="text-4xl font-black">
                {(summary.thisMonthEarnings / 1000).toFixed(0)}K
              </span>
            </div>
            <p className="font-black uppercase text-sm">This Month</p>
            <p className="text-sm font-bold opacity-90 mt-1">
              {summary.thisMonthSessions} sessions this month
            </p>
          </div>

          {/* Growth */}
          <div className={`${isGrowthPositive ? "bg-brutal-yellow" : "bg-brutal-orange"} border-3 border-black shadow-brutal-lg p-6`}>
            <div className="flex items-center justify-between mb-2">
              {isGrowthPositive ? (
                <TrendingUp className="w-8 h-8" />
              ) : (
                <TrendingDown className="w-8 h-8" />
              )}
              <span className="text-4xl font-black">
                {isGrowthPositive ? "+" : ""}{summary.growthPercentage.toFixed(0)}%
              </span>
            </div>
            <p className="font-black uppercase text-sm">Growth Rate</p>
            <p className="text-sm font-bold opacity-90 mt-1">
              vs last month ({(summary.lastMonthEarnings / 1000).toFixed(0)}K RWF)
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Monthly Breakdown */}
          <div className="lg:col-span-2">
            <div className="bg-white border-3 border-black shadow-brutal-lg">
              <div className="p-6 border-b-3 border-black">
                <h2 className="text-2xl font-black uppercase flex items-center gap-2">
                  <Calendar className="w-6 h-6" />
                  Monthly Breakdown
                </h2>
              </div>
              <div className="p-6">
                {monthlyBreakdown.length > 0 ? (
                  <div className="space-y-4">
                    {monthlyBreakdown.map((month) => (
                      <div
                        key={month.monthKey}
                        className="border-2 border-black p-4 hover:shadow-brutal transition-all"
                      >
                        <div className="flex justify-between items-start mb-2">
                          <div>
                            <h3 className="text-xl font-black">
                              {month.month} {month.year}
                            </h3>
                            <p className="text-sm font-bold text-gray-600">
                              {month.sessions} session{month.sessions !== 1 ? "s" : ""}
                            </p>
                          </div>
                          <div className="text-right">
                            <p className="text-2xl font-black text-brutal-green">
                              {(month.earnings / 1000).toFixed(1)}K
                            </p>
                            <p className="text-xs font-bold text-gray-600">RWF</p>
                          </div>
                        </div>
                        <div className="w-full bg-gray-200 h-2 border-2 border-black">
                          <div
                            className="bg-brutal-green h-full"
                            style={{
                              width: `${Math.min((month.earnings / summary.totalEarnings) * 100, 100)}%`,
                            }}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-12">
                    <Calendar className="w-16 h-16 mx-auto mb-4 text-gray-400" />
                    <h3 className="text-xl font-black mb-2">No Earnings Yet</h3>
                    <p className="text-gray-600 font-bold mb-4">
                      Complete your first session to start tracking earnings
                    </p>
                    <Link href="/dashboard/mentor/bookings">
                      <button className="px-6 py-3 bg-primary text-white font-bold uppercase border-3 border-black shadow-brutal hover:shadow-brutal-lg transition-all">
                        View Bookings
                      </button>
                    </Link>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Recent Sessions */}
          <div className="lg:col-span-1">
            <div className="bg-white border-3 border-black shadow-brutal-lg">
              <div className="p-6 border-b-3 border-black">
                <h2 className="text-xl font-black uppercase flex items-center gap-2">
                  <Clock className="w-5 h-5" />
                  Recent Sessions
                </h2>
              </div>
              <div className="p-6">
                {recentSessions.length > 0 ? (
                  <div className="space-y-4">
                    {recentSessions.map((session) => (
                      <div
                        key={session._id}
                        className="border-2 border-black p-3"
                      >
                        <div className="flex justify-between items-start mb-2">
                          <div className="flex-1 min-w-0 pr-2">
                            <p className="font-black text-sm truncate">
                              {session.studentName}
                            </p>
                            <p className="text-xs font-bold text-gray-600 truncate">
                              {session.careerTitle}
                            </p>
                          </div>
                          <span className="font-black text-brutal-green whitespace-nowrap">
                            +{(session.earnings / 1000).toFixed(0)}K
                          </span>
                        </div>
                        <div className="flex items-center justify-between text-xs">
                          <span className="font-bold text-gray-600">
                            {session.completedAt
                              ? new Date(session.completedAt).toLocaleDateString(
                                  "en-RW",
                                  { month: "short", day: "numeric" }
                                )
                              : "N/A"}
                          </span>
                          {session.rating && (
                            <div className="flex items-center gap-1">
                              <Star className="w-3 h-3 fill-brutal-yellow text-brutal-yellow" />
                              <span className="font-bold">{session.rating}</span>
                            </div>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-8">
                    <Clock className="w-12 h-12 mx-auto mb-3 text-gray-400" />
                    <p className="text-sm font-bold text-gray-600">
                      No completed sessions yet
                    </p>
                  </div>
                )}
              </div>
            </div>

            {/* Rate Per Session Card */}
            <div className="mt-6 bg-brutal-yellow border-3 border-black shadow-brutal-lg p-6">
              <h3 className="text-lg font-black uppercase mb-2">
                Your Session Rate
              </h3>
              <p className="text-3xl font-black mb-2">
                {(summary.ratePerSession / 1000).toFixed(1)}K RWF
              </p>
              <p className="text-sm font-bold">per 15-minute session</p>
              <Link href="/dashboard/mentor/profile">
                <button className="mt-4 w-full px-4 py-2 bg-white border-2 border-black shadow-brutal-sm hover:shadow-brutal transition-all font-bold text-sm">
                  Update Rate
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

