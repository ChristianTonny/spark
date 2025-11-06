'use client';

import { useQuery } from "convex/react";
import { api } from "../../../../convex/_generated/api";
import { useConvexAuth } from '@/lib/hooks/useConvexAuth';
import { useRoleGuard } from '@/lib/hooks/useRoleGuard';
import Link from 'next/link';
import {
  ArrowLeft,
  Users,
  Target,
  Bookmark,
  TrendingUp,
  BarChart3,
  Calendar,
} from 'lucide-react';

export default function EducatorAnalyticsPage() {
  const { user, isLoading: authLoading } = useConvexAuth();
  
  // Protect this page - only educators can access
  useRoleGuard(['educator']);

  // Fetch data from Convex
  const students = useQuery(api.educators.getAllStudents, user ? {} : "skip");
  const stats = useQuery(api.educators.getEducatorStats, user ? {} : "skip");

  const isLoading = authLoading || (user && students === undefined) || (user && stats === undefined);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-black border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-xl font-bold">Loading analytics...</p>
        </div>
      </div>
    );
  }

  // Calculate additional analytics
  const studentsWithAssessments = students?.filter(s => s.assessmentsCompleted > 0).length || 0;
  const studentsWithSavedCareers = students?.filter(s => s.careersExplored > 0).length || 0;
  const avgAssessmentsPerStudent = students && students.length > 0 
    ? (students.reduce((sum, s) => sum + s.assessmentsCompleted, 0) / students.length).toFixed(1)
    : '0';
  const avgCareersPerStudent = students && students.length > 0
    ? (students.reduce((sum, s) => sum + s.careersExplored, 0) / students.length).toFixed(1)
    : '0';

  return (
    <div className="min-h-screen bg-background py-8 px-4">
      <div className="container mx-auto max-w-7xl">
        {/* Back Button */}
        <Link href="/dashboard/educator">
          <button className="mb-6 px-4 py-2 bg-white border-2 border-black shadow-brutal hover:shadow-brutal-lg transition-all font-bold flex items-center gap-2">
            <ArrowLeft className="w-4 h-4" />
            Back to Dashboard
          </button>
        </Link>

        {/* Header */}
        <div className="mb-6 sm:mb-8">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-black mb-2 uppercase">
            Analytics & Insights
          </h1>
          <p className="text-lg font-bold text-gray-700">
            Platform usage statistics and trends
          </p>
        </div>

        {/* Overview Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-8">
          <div className="bg-brutal-blue border-3 border-black shadow-brutal p-6">
            <div className="flex items-center justify-between mb-2">
              <Users className="w-8 h-8 text-white" />
              <span className="text-4xl font-black text-white">{students?.length || 0}</span>
            </div>
            <h3 className="text-xl font-black uppercase text-white">Total Students</h3>
            <p className="font-bold text-white/80 text-sm">Active users</p>
          </div>

          <div className="bg-brutal-orange border-3 border-black shadow-brutal p-6">
            <div className="flex items-center justify-between mb-2">
              <Target className="w-8 h-8 text-white" />
              <span className="text-4xl font-black text-white">{stats?.completedAssessments || 0}</span>
            </div>
            <h3 className="text-xl font-black uppercase text-white">Total Assessments</h3>
            <p className="font-bold text-white/80 text-sm">Completed</p>
          </div>

          <div className="bg-brutal-green border-3 border-black shadow-brutal p-6">
            <div className="flex items-center justify-between mb-2">
              <TrendingUp className="w-8 h-8 text-white" />
              <span className="text-4xl font-black text-white">{avgAssessmentsPerStudent}</span>
            </div>
            <h3 className="text-xl font-black uppercase text-white">Avg per Student</h3>
            <p className="font-bold text-white/80 text-sm">Assessments</p>
          </div>

          <div className="bg-brutal-yellow border-3 border-black shadow-brutal p-6">
            <div className="flex items-center justify-between mb-2">
              <Bookmark className="w-8 h-8" />
              <span className="text-4xl font-black">{stats?.totalSavedCareers || 0}</span>
            </div>
            <h3 className="text-xl font-black uppercase">Saved Careers</h3>
            <p className="font-bold text-gray-700 text-sm">Total bookmarks</p>
          </div>
        </div>

        {/* Engagement Metrics */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          {/* Assessment Completion */}
          <div className="bg-white border-3 border-black shadow-brutal-lg">
            <div className="p-6 border-b-3 border-black">
              <h2 className="text-2xl font-black uppercase flex items-center gap-2">
                <Target className="w-6 h-6" />
                Assessment Engagement
              </h2>
            </div>
            <div className="p-6">
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between mb-2">
                    <span className="font-black text-sm">Students with Assessments</span>
                    <span className="font-black text-sm">{studentsWithAssessments} / {students?.length || 0}</span>
                  </div>
                  <div className="w-full bg-gray-200 border-2 border-black h-8">
                    <div 
                      className="bg-brutal-orange h-full flex items-center justify-center text-white font-black text-xs"
                      style={{ width: `${students && students.length > 0 ? (studentsWithAssessments / students.length) * 100 : 0}%` }}
                    >
                      {students && students.length > 0 ? Math.round((studentsWithAssessments / students.length) * 100) : 0}%
                    </div>
                  </div>
                </div>

                <div className="pt-4 border-t-2 border-gray-200">
                  <p className="text-sm font-bold text-gray-600 mb-2">Breakdown:</p>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="font-bold text-sm">Completed Assessment:</span>
                      <span className="font-black">{studentsWithAssessments}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="font-bold text-sm">Not Started:</span>
                      <span className="font-black">{(students?.length || 0) - studentsWithAssessments}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="font-bold text-sm">Avg per Student:</span>
                      <span className="font-black">{avgAssessmentsPerStudent}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Career Exploration */}
          <div className="bg-white border-3 border-black shadow-brutal-lg">
            <div className="p-6 border-b-3 border-black">
              <h2 className="text-2xl font-black uppercase flex items-center gap-2">
                <Bookmark className="w-6 h-6" />
                Career Exploration
              </h2>
            </div>
            <div className="p-6">
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between mb-2">
                    <span className="font-black text-sm">Students Exploring Careers</span>
                    <span className="font-black text-sm">{studentsWithSavedCareers} / {students?.length || 0}</span>
                  </div>
                  <div className="w-full bg-gray-200 border-2 border-black h-8">
                    <div 
                      className="bg-brutal-yellow h-full flex items-center justify-center font-black text-xs"
                      style={{ width: `${students && students.length > 0 ? (studentsWithSavedCareers / students.length) * 100 : 0}%` }}
                    >
                      {students && students.length > 0 ? Math.round((studentsWithSavedCareers / students.length) * 100) : 0}%
                    </div>
                  </div>
                </div>

                <div className="pt-4 border-t-2 border-gray-200">
                  <p className="text-sm font-bold text-gray-600 mb-2">Breakdown:</p>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="font-bold text-sm">Saved Careers:</span>
                      <span className="font-black">{studentsWithSavedCareers}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="font-bold text-sm">No Saves Yet:</span>
                      <span className="font-black">{(students?.length || 0) - studentsWithSavedCareers}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="font-bold text-sm">Avg per Student:</span>
                      <span className="font-black">{avgCareersPerStudent}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Top Career Interests */}
        <div className="bg-white border-3 border-black shadow-brutal-lg">
          <div className="p-6 border-b-3 border-black">
            <h2 className="text-2xl font-black uppercase flex items-center gap-2">
              <BarChart3 className="w-6 h-6" />
              Top Career Interests
            </h2>
            <p className="text-sm font-bold text-gray-600 mt-1">Most popular careers saved by students</p>
          </div>
          <div className="p-6">
            {stats && stats.topCareers && stats.topCareers.length > 0 ? (
              <div className="space-y-4">
                {stats.topCareers.map((career, index) => (
                  <div key={career.id} className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-brutal-orange border-3 border-black flex items-center justify-center flex-shrink-0">
                      <span className="text-xl font-black text-white">#{index + 1}</span>
                    </div>
                    <div className="flex-1">
                      <p className="font-black text-lg mb-1">{career.title}</p>
                      <div className="w-full bg-gray-200 border-2 border-black h-6">
                        <div 
                          className="bg-brutal-blue h-full flex items-center px-2 text-white font-black text-xs"
                          style={{ 
                            width: `${stats.topCareers.length > 0 ? (career.count / stats.topCareers[0].count) * 100 : 0}%`,
                            minWidth: '60px'
                          }}
                        >
                          {career.count} saves
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <BarChart3 className="w-16 h-16 mx-auto mb-4 text-gray-400" />
                <h3 className="text-xl font-black mb-2">No Career Data Yet</h3>
                <p className="text-gray-600 font-bold">
                  Career interest data will appear once students start saving careers
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
