'use client';

import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import {
  ArrowLeft,
  Target,
  Bookmark,
  Calendar,
  TrendingUp,
  Mail,
  User,
  School,
} from 'lucide-react';
import { useQuery } from "convex/react";
import { api } from "../../../../../convex/_generated/api";
import { useConvexAuth } from '@/lib/hooks/useConvexAuth';
import { useRoleGuard } from '@/lib/hooks/useRoleGuard';
import { formatAssessmentDate } from "@/lib/date-utils";

export default function StudentDetailPage() {
  // Protect this page - only educators can access
  useRoleGuard(['educator']);
  const params = useParams();
  const router = useRouter();
  const studentId = params.id as string;
  const { user, isLoading: authLoading } = useConvexAuth();

  // Fetch student details
  const studentDetail = useQuery(
    api.educators.getStudentDetail,
    user && studentId ? { studentId: studentId as any } : "skip"
  );

  const isLoading = authLoading || (user && studentDetail === undefined);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-black border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-xl font-bold">Loading student details...</p>
        </div>
      </div>
    );
  }

  if (!studentDetail) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center p-4">
        <div className="text-center">
          <h2 className="text-2xl font-black mb-4">Student Not Found</h2>
          <Link href="/dashboard/educator">
            <button className="px-6 py-3 bg-primary text-white font-bold uppercase border-3 border-black shadow-brutal hover:shadow-brutal-lg transition-all">
              Back to Dashboard
            </button>
          </Link>
        </div>
      </div>
    );
  }

  const fullName = `${studentDetail.firstName} ${studentDetail.lastName}`;
  const latestAssessment = studentDetail.assessmentResults[0];

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

        {/* Student Header */}
        <div className="bg-white border-3 border-black shadow-brutal-lg p-6 sm:p-8 mb-8">
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6">
            <div className="w-20 h-20 sm:w-24 sm:h-24 border-3 border-black shadow-brutal overflow-hidden flex-shrink-0">
              <img
                src={studentDetail.avatar || `https://api.dicebear.com/7.x/initials/svg?seed=${fullName}&backgroundColor=ffb627`}
                alt={fullName}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="flex-1">
              <h1 className="text-3xl sm:text-4xl font-black uppercase mb-2">
                {fullName}
              </h1>
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-sm sm:text-base font-bold text-gray-700">
                  <Mail className="w-4 h-4" />
                  {studentDetail.email}
                </div>
                {studentDetail.profile && (
                  <>
                    <div className="flex items-center gap-2 text-sm sm:text-base font-bold text-gray-700">
                      <User className="w-4 h-4" />
                      {studentDetail.profile.gradeLevel}
                    </div>
                    {studentDetail.profile.school && (
                      <div className="flex items-center gap-2 text-sm sm:text-base font-bold text-gray-700">
                        <School className="w-4 h-4" />
                        {studentDetail.profile.school}
                      </div>
                    )}
                  </>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6 mb-8">
          <div className="bg-brutal-orange border-3 border-black shadow-brutal p-6">
            <div className="flex items-center justify-between mb-2">
              <Target className="w-8 h-8 text-white" />
              <span className="text-4xl font-black text-white">
                {studentDetail.assessmentResults.length}
              </span>
            </div>
            <h3 className="text-xl font-black uppercase text-white">Assessments</h3>
            <p className="font-bold text-white/80 text-sm">Completed</p>
          </div>

          <div className="bg-brutal-yellow border-3 border-black shadow-brutal p-6">
            <div className="flex items-center justify-between mb-2">
              <Bookmark className="w-8 h-8" />
              <span className="text-4xl font-black">
                {studentDetail.savedCareers.length}
              </span>
            </div>
            <h3 className="text-xl font-black uppercase">Saved Careers</h3>
            <p className="font-bold text-gray-700 text-sm">Bookmarked</p>
          </div>

          <div className="bg-brutal-green border-3 border-black shadow-brutal p-6">
            <div className="flex items-center justify-between mb-2">
              <TrendingUp className="w-8 h-8 text-white" />
              <span className="text-4xl font-black text-white">
                {latestAssessment
                  ? Math.round(latestAssessment.careerMatches[0]?.matchPercentage || 0)
                  : 0}%
              </span>
            </div>
            <h3 className="text-xl font-black uppercase text-white">Top Match</h3>
            <p className="font-bold text-white/80 text-sm">Best career match</p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Assessment Results */}
            <div className="bg-white border-3 border-black shadow-brutal-lg">
              <div className="p-6 border-b-3 border-black">
                <h2 className="text-2xl font-black uppercase flex items-center gap-2">
                  <Target className="w-6 h-6" />
                  Assessment Results
                </h2>
              </div>
              <div className="p-6">
                {studentDetail.assessmentResults.length > 0 ? (
                  <div className="space-y-6">
                    {studentDetail.assessmentResults.map((result, idx) => (
                      <div key={result._id} className="border-2 border-black p-4">
                        <div className="flex items-center justify-between mb-4">
                          <div>
                            <span className="inline-block px-3 py-1 bg-brutal-blue text-white text-xs font-black uppercase border-2 border-black mb-2">
                              Assessment #{studentDetail.assessmentResults.length - idx}
                            </span>
                            <p className="text-sm font-bold text-gray-600">
                              Completed {formatAssessmentDate(result.completedAt)}
                            </p>
                          </div>
                        </div>

                        <h3 className="text-lg font-black mb-3">Top 5 Career Matches:</h3>
                        <div className="space-y-2">
                          {result.careerMatches.map((match, matchIdx) => (
                            match.career && (
                              <div
                                key={matchIdx}
                                className="flex items-center justify-between p-3 bg-gray-50 border-2 border-black"
                              >
                                <div className="flex items-center gap-3">
                                  <span className="w-8 h-8 bg-brutal-orange text-white border-2 border-black flex items-center justify-center font-black text-sm">
                                    #{matchIdx + 1}
                                  </span>
                                  <div>
                                    <p className="font-black">{match.career.title}</p>
                                    <p className="text-xs font-bold text-gray-600">
                                      {match.career.category}
                                    </p>
                                  </div>
                                </div>
                                <span className="px-3 py-1 bg-brutal-green text-white text-sm font-black border-2 border-black">
                                  {Math.round(match.matchPercentage)}%
                                </span>
                              </div>
                            )
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-12">
                    <Target className="w-16 h-16 mx-auto mb-4 text-gray-400" />
                    <h3 className="text-xl font-black mb-2">No Assessments Yet</h3>
                    <p className="text-gray-600 font-bold">
                      This student hasn&apos;t completed any career assessments.
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Saved Careers */}
            <div className="bg-white border-3 border-black shadow-brutal-lg">
              <div className="p-6 border-b-3 border-black">
                <h2 className="text-xl font-black uppercase flex items-center gap-2">
                  <Bookmark className="w-5 h-5" />
                  Saved Careers
                </h2>
              </div>
              <div className="p-6">
                {studentDetail.savedCareers.length > 0 ? (
                  <div className="space-y-3">
                    {studentDetail.savedCareers.map((career: any) => (
                      <div key={career._id} className="border-2 border-black p-3">
                        <h3 className="font-black text-sm mb-1">{career.title}</h3>
                        <p className="text-xs font-bold text-gray-600">{career.category}</p>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-8">
                    <Bookmark className="w-12 h-12 mx-auto mb-3 text-gray-400" />
                    <p className="text-sm font-bold text-gray-600">
                      No saved careers yet
                    </p>
                  </div>
                )}
              </div>
            </div>

            {/* Profile Info */}
            {studentDetail.profile && (
              <div className="bg-brutal-yellow border-3 border-black shadow-brutal-lg p-6">
                <h3 className="text-xl font-black uppercase mb-4">Profile Info</h3>
                <div className="space-y-3 text-sm">
                  <div>
                    <p className="font-black text-xs uppercase text-gray-600 mb-1">Grade Level</p>
                    <p className="font-bold">{studentDetail.profile.gradeLevel}</p>
                  </div>
                  {studentDetail.profile.school && (
                    <div>
                      <p className="font-black text-xs uppercase text-gray-600 mb-1">School</p>
                      <p className="font-bold">{studentDetail.profile.school}</p>
                    </div>
                  )}
                  {studentDetail.profile.district && (
                    <div>
                      <p className="font-black text-xs uppercase text-gray-600 mb-1">District</p>
                      <p className="font-bold">{studentDetail.profile.district}</p>
                    </div>
                  )}
                  {studentDetail.profile.interests && studentDetail.profile.interests.length > 0 && (
                    <div>
                      <p className="font-black text-xs uppercase text-gray-600 mb-2">Interests</p>
                      <div className="flex flex-wrap gap-2">
                        {studentDetail.profile.interests.map((interest: string, idx: number) => (
                          <span
                            key={idx}
                            className="px-2 py-1 bg-white text-xs font-bold uppercase border-2 border-black"
                          >
                            {interest}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
