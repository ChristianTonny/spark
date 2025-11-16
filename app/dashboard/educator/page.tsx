'use client';

import { useState } from 'react';
import Link from 'next/link';
import {
  Users,
  Target,
  TrendingUp,
  Bookmark,
  Search,
  Eye,
  Upload,
  BarChart3,
  Download,
  AlertTriangle,
  Activity,
  CheckCircle,
} from 'lucide-react';
import { useQuery } from "convex/react";
import { api } from "../../../convex/_generated/api";
import { useConvexAuth } from '@/lib/hooks/useConvexAuth';
import { useRoleGuard } from '@/lib/hooks/useRoleGuard';
import BulkUploadModal from '@/components/BulkUploadModal';

export default function EducatorDashboard() {
  const [searchQuery, setSearchQuery] = useState('');
  const [showBulkUpload, setShowBulkUpload] = useState(false);
  const { user, clerkUser, isLoading: authLoading } = useConvexAuth();

  // Protect this page - only educators can access
  useRoleGuard(['educator']);

  // Fetch data from Convex
  const students = useQuery(api.educators.getAllStudents, user ? {} : "skip");
  const stats = useQuery(api.educators.getEducatorStats, user ? {} : "skip");

  const isLoading = authLoading || (user && students === undefined) || (user && stats === undefined);

  // Filter students based on search
  const filteredStudents = students
    ? students.filter((student) => {
        const fullName = `${student.firstName} ${student.lastName}`.toLowerCase();
        const query = searchQuery.toLowerCase();
        return fullName.includes(query) || student.email.toLowerCase().includes(query);
      })
    : [];

  // Calculate engagement metrics
  const atRiskStudents = students
    ? students.filter(s => s.assessmentsCompleted === 0 && s.careersExplored === 0)
    : [];

  const activeStudents = students
    ? students.filter(s => s.assessmentsCompleted > 0 || s.careersExplored > 0)
    : [];

  const engagementRate = students && students.length > 0
    ? Math.round((activeStudents.length / students.length) * 100)
    : 0;

  // Helper function to get activity status
  const getActivityStatus = (student: any) => {
    if (student.assessmentsCompleted > 0 && student.careersExplored > 0) {
      return { color: 'bg-green-500', label: 'Active', textColor: 'text-green-600' };
    } else if (student.assessmentsCompleted > 0 || student.careersExplored > 0) {
      return { color: 'bg-yellow-500', label: 'Moderate', textColor: 'text-yellow-600' };
    } else {
      return { color: 'bg-red-500', label: 'At Risk', textColor: 'text-red-600' };
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-black border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-xl font-bold">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background py-8 px-4">
      <div className="container mx-auto max-w-7xl">
        {/* Header */}
        <div className="mb-6 sm:mb-8">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-black mb-2 uppercase">
            Educator Dashboard
          </h1>
          <p className="text-lg font-bold text-gray-700">
            Monitor student progress and career exploration
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-8">
          <div className="bg-brutal-blue border-3 border-black shadow-brutal p-6">
            <div className="flex items-center justify-between mb-2">
              <Users className="w-8 h-8 text-white" />
              <span className="text-4xl font-black text-white">{stats?.totalStudents || 0}</span>
            </div>
            <h3 className="text-xl font-black uppercase text-white">Total Students</h3>
            <p className="font-bold text-white/80 text-sm">Registered in platform</p>
          </div>

          <div className="bg-brutal-orange border-3 border-black shadow-brutal p-6">
            <div className="flex items-center justify-between mb-2">
              <Target className="w-8 h-8 text-white" />
              <span className="text-4xl font-black text-white">{stats?.completedAssessments || 0}</span>
            </div>
            <h3 className="text-xl font-black uppercase text-white">Assessments</h3>
            <p className="font-bold text-white/80 text-sm">Completed by students</p>
          </div>

          <div className="bg-brutal-green border-3 border-black shadow-brutal p-6">
            <div className="flex items-center justify-between mb-2">
              <TrendingUp className="w-8 h-8 text-white" />
              <span className="text-4xl font-black text-white">{stats?.completionRate || 0}%</span>
            </div>
            <h3 className="text-xl font-black uppercase text-white">Completion Rate</h3>
            <p className="font-bold text-white/80 text-sm">Students with assessments</p>
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

        {/* Engagement Health Score & At-Risk Students */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6 mb-8">
          {/* Engagement Health Score */}
          <div className={`border-3 border-black shadow-brutal-lg p-6 ${
            engagementRate >= 70 ? 'bg-brutal-green' : engagementRate >= 40 ? 'bg-brutal-yellow' : 'bg-brutal-orange'
          }`}>
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <Activity className={`w-8 h-8 ${engagementRate >= 70 ? 'text-white' : ''}`} />
                <div>
                  <h3 className={`text-2xl font-black uppercase ${engagementRate >= 70 ? 'text-white' : ''}`}>
                    Engagement Health
                  </h3>
                  <p className={`text-sm font-bold ${engagementRate >= 70 ? 'text-white/80' : 'text-gray-700'}`}>
                    Students actively using platform
                  </p>
                </div>
              </div>
              <div className={`text-5xl font-black ${engagementRate >= 70 ? 'text-white' : ''}`}>
                {engagementRate}%
              </div>
            </div>
            <div className="space-y-2">
              <div className="flex justify-between text-sm font-bold">
                <span className={engagementRate >= 70 ? 'text-white/90' : ''}>
                  {activeStudents.length} Active / {students?.length || 0} Total
                </span>
                <span className={engagementRate >= 70 ? 'text-white/90' : ''}>
                  {engagementRate >= 70 ? '✓ Healthy' : engagementRate >= 40 ? '⚠ Needs Attention' : '✗ Critical'}
                </span>
              </div>
              <div className="w-full h-3 bg-white/20 border-2 border-black">
                <div
                  className="h-full bg-white"
                  style={{ width: `${engagementRate}%` }}
                />
              </div>
            </div>
          </div>

          {/* At-Risk Students Widget */}
          <div className="bg-white border-3 border-black shadow-brutal-lg p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <AlertTriangle className="w-8 h-8 text-red-600" />
                <div>
                  <h3 className="text-2xl font-black uppercase">At-Risk Students</h3>
                  <p className="text-sm font-bold text-gray-700">
                    No assessments or saved careers
                  </p>
                </div>
              </div>
              <div className="text-5xl font-black text-red-600">
                {atRiskStudents.length}
              </div>
            </div>
            {atRiskStudents.length > 0 ? (
              <div className="space-y-2">
                <p className="text-sm font-bold text-gray-600 mb-3">
                  Recent inactive students:
                </p>
                <div className="space-y-2 max-h-32 overflow-y-auto">
                  {atRiskStudents.slice(0, 5).map((student) => (
                    <div
                      key={student._id}
                      className="flex items-center justify-between p-2 bg-gray-50 border-2 border-gray-200"
                    >
                      <div className="flex items-center gap-2">
                        <div className="w-8 h-8 border-2 border-black shadow-brutal-sm overflow-hidden">
                          {student.avatar ? (
                            <img
                              src={student.avatar}
                              alt={`${student.firstName} ${student.lastName}`}
                              className="w-full h-full object-cover"
                            />
                          ) : (
                            <div className="w-full h-full flex items-center justify-center bg-red-500 text-white font-black text-xs">
                              {student.firstName[0]}{student.lastName[0]}
                            </div>
                          )}
                        </div>
                        <span className="font-bold text-sm">
                          {student.firstName} {student.lastName}
                        </span>
                      </div>
                      <Link href={`/dashboard/educator/students/${student._id}`}>
                        <button className="px-2 py-1 bg-brutal-orange text-white border-2 border-black shadow-brutal-sm hover:shadow-brutal transition-all text-xs font-bold uppercase">
                          View
                        </button>
                      </Link>
                    </div>
                  ))}
                </div>
                {atRiskStudents.length > 5 && (
                  <p className="text-xs font-bold text-gray-500 text-center mt-2">
                    +{atRiskStudents.length - 5} more at-risk students
                  </p>
                )}
              </div>
            ) : (
              <div className="text-center py-4 bg-green-50 border-2 border-green-200">
                <CheckCircle className="w-8 h-8 text-green-600 mx-auto mb-2" />
                <p className="text-sm font-bold text-green-700">
                  All students are engaged!
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Main Content - Students Table (Full Width) */}
        <div className="bg-white border-3 border-black shadow-brutal-lg">
          <div className="p-6 border-b-3 border-black">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <div>
                <h2 className="text-2xl font-black uppercase mb-2">Students</h2>
                <p className="text-sm font-bold text-gray-600">
                  {filteredStudents.length} {filteredStudents.length === 1 ? 'student' : 'students'} found
                </p>
              </div>
              <div className="flex flex-wrap gap-2">
                <Link href="/dashboard/educator/analytics">
                  <button className="px-4 py-2 bg-brutal-blue text-white font-bold uppercase border-3 border-black shadow-brutal hover:shadow-brutal-lg transition-all text-sm flex items-center gap-2">
                    <BarChart3 className="w-4 h-4" />
                    Analytics
                  </button>
                </Link>
                <button 
                  onClick={() => setShowBulkUpload(true)}
                  className="px-4 py-2 bg-brutal-green text-white font-bold uppercase border-3 border-black shadow-brutal hover:shadow-brutal-lg transition-all text-sm flex items-center gap-2"
                >
                  <Upload className="w-4 h-4" />
                  Bulk Upload
                </button>
                <button 
                  onClick={() => {
                    const csvContent = `Name,Email,Grade,School,Assessments,Saved Careers\n${filteredStudents.map(s => 
                      `"${s.firstName} ${s.lastName}","${s.email}","${s.gradeLevel}","${s.school}",${s.assessmentsCompleted},${s.careersExplored}`
                    ).join('\n')}`;
                    const blob = new Blob([csvContent], { type: 'text/csv' });
                    const url = window.URL.createObjectURL(blob);
                    const a = document.createElement('a');
                    a.href = url;
                    a.download = `students-report-${new Date().toISOString().split('T')[0]}.csv`;
                    a.click();
                  }}
                  className="px-4 py-2 bg-white font-bold uppercase border-3 border-black shadow-brutal hover:shadow-brutal-lg transition-all text-sm flex items-center gap-2"
                >
                  <Download className="w-4 h-4" />
                  Export Report
                </button>
              </div>
            </div>

            {/* Search Bar */}
            <div className="relative mt-4">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
              <input
                type="text"
                placeholder="Search students by name or email..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-3 text-base font-bold border-3 border-black shadow-brutal focus:shadow-brutal-lg focus:outline-none transition-all"
              />
            </div>
          </div>

          {/* Students Table */}
          <div className="overflow-x-auto">
                {filteredStudents.length > 0 ? (
                  <table className="w-full">
                    <thead className="bg-gray-100 border-b-3 border-black">
                      <tr>
                        <th className="px-6 py-4 text-left text-xs font-black uppercase tracking-wider">
                          Student
                        </th>
                        <th className="px-6 py-4 text-left text-xs font-black uppercase tracking-wider hidden sm:table-cell">
                          Grade Level
                        </th>
                        <th className="px-6 py-4 text-left text-xs font-black uppercase tracking-wider hidden md:table-cell">
                          School
                        </th>
                        <th className="px-6 py-4 text-center text-xs font-black uppercase tracking-wider">
                          Assessments
                        </th>
                        <th className="px-6 py-4 text-center text-xs font-black uppercase tracking-wider hidden lg:table-cell">
                          Saved Careers
                        </th>
                        <th className="px-6 py-4 text-center text-xs font-black uppercase tracking-wider">
                          Actions
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y-2 divide-gray-200">
                      {filteredStudents.map((student) => {
                        const activityStatus = getActivityStatus(student);
                        return (
                        <tr key={student._id} className="hover:bg-gray-50">
                          <td className="px-6 py-4">
                            <div className="flex items-center gap-3">
                              <div className="relative">
                                <div className="w-10 h-10 border-2 border-black shadow-brutal-sm overflow-hidden flex-shrink-0">
                                  {student.avatar ? (
                                    <img
                                      src={student.avatar}
                                      alt={`${student.firstName} ${student.lastName}`}
                                      className="w-full h-full object-cover"
                                    />
                                  ) : (
                                    <div className={`w-full h-full flex items-center justify-center text-white font-black text-sm ${
                                      activityStatus.color === 'bg-green-500' ? 'bg-brutal-green' :
                                      activityStatus.color === 'bg-yellow-500' ? 'bg-brutal-yellow' :
                                      'bg-brutal-orange'
                                    }`}>
                                      {student.firstName[0]}{student.lastName[0]}
                                    </div>
                                  )}
                                </div>
                                {/* Activity Indicator */}
                                <div
                                  className={`absolute -top-1 -right-1 w-4 h-4 ${activityStatus.color} border-2 border-white rounded-full`}
                                  title={activityStatus.label}
                                />
                              </div>
                              <div>
                                <p className="font-black text-sm">
                                  {student.firstName} {student.lastName}
                                </p>
                                <p className="text-xs font-bold text-gray-600">{student.email}</p>
                              </div>
                            </div>
                          </td>
                          <td className="px-6 py-4 hidden sm:table-cell">
                            <span className="text-sm font-bold">{student.gradeLevel}</span>
                          </td>
                          <td className="px-6 py-4 hidden md:table-cell">
                            <span className="text-sm font-bold text-gray-700">{student.school}</span>
                          </td>
                          <td className="px-6 py-4 text-center">
                            <span className={`inline-flex items-center px-2 py-1 text-xs font-black border-2 border-black ${
                              student.assessmentsCompleted > 0
                                ? 'bg-brutal-green text-white'
                                : 'bg-gray-100'
                            }`}>
                              {student.assessmentsCompleted}
                            </span>
                          </td>
                          <td className="px-6 py-4 text-center hidden lg:table-cell">
                            <span className="inline-flex items-center px-2 py-1 text-xs font-black border-2 border-black bg-brutal-yellow">
                              {student.careersExplored}
                            </span>
                          </td>
                          <td className="px-6 py-4 text-center">
                            <Link href={`/dashboard/educator/students/${student._id}`}>
                              <button className="px-3 py-1 bg-white border-2 border-black shadow-brutal-sm hover:shadow-brutal transition-all text-xs font-bold uppercase inline-flex items-center gap-1">
                                <Eye className="w-3 h-3" />
                                View
                              </button>
                            </Link>
                          </td>
                        </tr>
                      )})}
                    </tbody>
                  </table>
                ) : (
                  <div className="text-center py-12">
                    <Users className="w-16 h-16 mx-auto mb-4 text-gray-400" />
                    <h3 className="text-xl font-black mb-2">No Students Found</h3>
                    <p className="text-gray-600 font-bold">
                      {searchQuery ? 'Try adjusting your search query' : 'No students have registered yet'}
                    </p>
                  </div>
                )}
              </div>
            </div>
      </div>

      {/* Bulk Upload Modal */}
      <BulkUploadModal isOpen={showBulkUpload} onClose={() => setShowBulkUpload(false)} />
    </div>
  );
}
