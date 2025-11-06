"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  Sparkles,
  Bookmark,
  Target,
  TrendingUp,
  Calendar,
  ArrowRight,
  Eye,
  Trash2,
  Settings,
  User,
  BookOpen,
} from "lucide-react";
import { formatAssessmentDate } from "@/lib/assessment-storage";
import { useQuery, useMutation } from "convex/react";
import { api } from "../../../convex/_generated/api";
import { useConvexAuth } from "@/lib/hooks/useConvexAuth";

export default function StudentDashboard() {
  const router = useRouter();
  const { user, clerkUser, isLoading } = useConvexAuth();

  // Fetch data from Convex (automatically uses authenticated user)
  const savedCareers = useQuery(api.savedCareers.list, user ? {} : "skip");
  const assessmentResults = useQuery(api.assessments.getResults, user ? {} : "skip");
  const studentProfile = useQuery(api.studentProfiles.getCurrent, user ? {} : "skip");
  const deleteResult = useMutation(api.assessments.deleteResult);

  const studentData = {
    name: clerkUser ? `${clerkUser.firstName} ${clerkUser.lastName}` : "Student",
    gradeLevel: studentProfile?.gradeLevel || "Not specified",
    school: studentProfile?.school || "Not specified",
    avatar: clerkUser?.imageUrl || "https://api.dicebear.com/7.x/initials/svg?seed=JM&backgroundColor=ffb627",
  };

  // Show loading state while user is being synced
  if (isLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-black border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-xl font-bold">Loading your dashboard...</p>
        </div>
      </div>
    );
  }

  const handleDeleteResult = async (resultId: string) => {
    if (confirm("Are you sure you want to delete this assessment result?")) {
      await deleteResult({ resultId: resultId as any });
    }
  };

  const savedCareersData = savedCareers?.slice(0, 3) || [];

  return (
    <div className="min-h-screen bg-background py-8 px-4">
      <div className="container mx-auto max-w-7xl">
        {/* Header */}
        <div className="mb-6 sm:mb-8 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div className="flex items-center gap-3 sm:gap-4">
            <div className="w-14 h-14 sm:w-16 sm:h-16 border-3 border-black shadow-brutal overflow-hidden flex-shrink-0">
              <img
                src={studentData.avatar}
                alt={studentData.name}
                className="w-full h-full object-cover"
              />
            </div>
            <div>
              <h1 className="text-2xl sm:text-3xl md:text-4xl font-black uppercase">
                Welcome back, {studentData.name.split(" ")[0]}!
              </h1>
              <p className="text-base sm:text-lg font-bold text-gray-700">
                {studentData.gradeLevel} · {studentData.school}
              </p>
            </div>
          </div>
          <div className="flex gap-2 flex-wrap sm:flex-nowrap">
            <Link href="/dashboard/student/profile" className="flex-1 sm:flex-initial">
              <button className="w-full sm:w-auto px-4 py-2 bg-white border-3 border-black shadow-brutal hover:shadow-brutal-lg transition-all flex items-center justify-center gap-2 font-bold">
                <User className="w-4 h-4" />
                Profile
              </button>
            </Link>
            <Link href="/dashboard/student/settings" className="flex-1 sm:flex-initial">
              <button className="w-full sm:w-auto px-4 py-2 bg-white border-3 border-black shadow-brutal hover:shadow-brutal-lg transition-all flex items-center justify-center gap-2 font-bold">
                <Settings className="w-4 h-4" />
                Settings
              </button>
            </Link>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 mb-6 sm:mb-8">
          <div className="bg-brutal-yellow border-3 border-black shadow-brutal p-4 sm:p-6">
            <div className="flex items-center justify-between mb-2">
              <Bookmark className="w-6 h-6 sm:w-8 sm:h-8" />
              <span className="text-3xl sm:text-4xl font-black">{savedCareers?.length || 0}</span>
            </div>
            <h3 className="text-lg sm:text-xl font-black uppercase">Saved Careers</h3>
            <p className="font-bold text-gray-700 text-sm sm:text-base">Careers you are interested in</p>
          </div>

          <div className="bg-brutal-pink border-3 border-black shadow-brutal p-4 sm:p-6">
            <div className="flex items-center justify-between mb-2">
              <Target className="w-6 h-6 sm:w-8 sm:h-8" />
              <span className="text-3xl sm:text-4xl font-black">{assessmentResults?.length || 0}</span>
            </div>
            <h3 className="text-lg sm:text-xl font-black uppercase">Assessments</h3>
            <p className="font-bold text-gray-700 text-sm sm:text-base">Career discovery tests taken</p>
          </div>

          <div className="bg-brutal-green border-3 border-black shadow-brutal p-4 sm:p-6">
            <div className="flex items-center justify-between mb-2">
              <TrendingUp className="w-6 h-6 sm:w-8 sm:h-8" />
              <span className="text-3xl sm:text-4xl font-black">
                {assessmentResults && assessmentResults.length > 0
                  ? Math.round(assessmentResults[0].careerMatches[0]?.matchPercentage || 0)
                  : 0}%
              </span>
            </div>
            <h3 className="text-lg sm:text-xl font-black uppercase">Top Match</h3>
            <p className="font-bold text-gray-700 text-sm sm:text-base">Your best career match score</p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Saved Careers Section */}
            <div className="bg-white border-3 border-black shadow-brutal-lg">
              <div className="p-4 sm:p-6 border-b-3 border-black">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                  <div className="flex items-center gap-2 sm:gap-3">
                    <Bookmark className="w-5 h-5 sm:w-6 sm:h-6" />
                    <h2 className="text-xl sm:text-2xl font-black uppercase">Saved Careers</h2>
                  </div>
                  <Link href="/careers" className="w-full sm:w-auto">
                    <button className="w-full sm:w-auto px-4 py-2 bg-brutal-blue text-white font-bold uppercase border-3 border-black shadow-brutal hover:shadow-brutal-lg transition-all text-sm">
                      Browse All
                    </button>
                  </Link>
                </div>
              </div>

              <div className="p-4 sm:p-6">
                {savedCareersData.length > 0 ? (
                  <div className="space-y-4">
                    {savedCareersData.map((career: any) => career && (
                      <Link
                        key={career._id}
                        href={`/careers/${career._id}`}
                        className="block"
                      >
                        <div className="border-2 border-black p-3 sm:p-4 hover:shadow-brutal transition-all">
                          <div className="flex items-start gap-3 sm:gap-4">
                            <div className="w-16 h-16 sm:w-20 sm:h-20 border-2 border-black overflow-hidden flex-shrink-0">
                              <img
                                src={career.videoThumbnail}
                                alt={career.title}
                                className="w-full h-full object-cover"
                              />
                            </div>
                            <div className="flex-1 min-w-0">
                              <h3 className="text-lg sm:text-xl font-black mb-1">{career.title}</h3>
                              <p className="text-xs sm:text-sm font-bold text-gray-700 mb-2 line-clamp-2">
                                {career.shortDescription}
                              </p>
                              <div className="flex flex-wrap items-center gap-2">
                                <span className="px-2 py-1 bg-brutal-yellow text-xs font-bold uppercase border-2 border-black">
                                  {career.category}
                                </span>
                                <span className="text-xs sm:text-sm font-bold text-gray-600">
                                  {(career.salaryMin / 1000000).toFixed(1)}M - {(career.salaryMax / 1000000).toFixed(1)}M RWF
                                </span>
                              </div>
                            </div>
                            <ArrowRight className="w-5 h-5 sm:w-6 sm:h-6 flex-shrink-0 hidden sm:block" />
                          </div>
                        </div>
                      </Link>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-12">
                    <Bookmark className="w-16 h-16 mx-auto mb-4 text-gray-400" />
                    <h3 className="text-xl font-black mb-2">No Saved Careers Yet</h3>
                    <p className="text-gray-600 font-bold mb-4">
                      Start exploring careers and bookmark the ones you like!
                    </p>
                    <Link href="/careers">
                      <button className="px-6 py-3 bg-primary text-white font-bold uppercase border-3 border-black shadow-brutal hover:shadow-brutal-lg transition-all">
                        Explore Careers
                      </button>
                    </Link>
                  </div>
                )}
              </div>
            </div>

            {/* Assessment Results Section */}
            <div className="bg-white border-3 border-black shadow-brutal-lg">
              <div className="p-4 sm:p-6 border-b-3 border-black">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                  <div className="flex items-center gap-2 sm:gap-3">
                    <Sparkles className="w-5 h-5 sm:w-6 sm:h-6" />
                    <h2 className="text-xl sm:text-2xl font-black uppercase">Assessment Results</h2>
                  </div>
                  <Link href="/assessments" className="w-full sm:w-auto">
                    <button className="w-full sm:w-auto px-4 py-2 bg-brutal-pink text-white font-bold uppercase border-3 border-black shadow-brutal hover:shadow-brutal-lg transition-all text-sm">
                      Take New
                    </button>
                  </Link>
                </div>
              </div>

              <div className="p-4 sm:p-6">
                {assessmentResults && assessmentResults.length > 0 ? (
                  <div className="space-y-4">
                    {assessmentResults.slice(0, 3).map((result) => {
                      const topMatch = result.careerMatches[0];
                      const topCareer = topMatch?.career;

                      return (
                        <div
                          key={result._id}
                          className="border-2 border-black p-3 sm:p-4"
                        >
                          <div className="flex flex-col gap-3">
                            <div className="flex-1">
                              <div className="flex flex-wrap items-center gap-2 mb-2">
                                <span className="text-xs sm:text-sm font-bold text-gray-600">
                                  {formatAssessmentDate(new Date(result.completedAt).toISOString())}
                                </span>
                                <span className="px-2 py-1 bg-brutal-green text-black text-xs font-bold border-2 border-black">
                                  {Math.round(topMatch?.matchPercentage || 0)}% Match
                                </span>
                              </div>
                              <h4 className="text-base sm:text-lg font-black mb-1">
                                Top Match: {topCareer?.title || "Unknown Career"}
                              </h4>
                              <p className="text-xs sm:text-sm font-bold text-gray-700">
                                {topCareer?.category || ""}
                              </p>
                            </div>
                            <div className="flex gap-2">
                              <button
                                onClick={() => router.push(`/assessment/results?id=${result._id}`)}
                                className="flex-1 sm:flex-initial px-4 py-2 sm:py-2 min-h-[44px] bg-white border-2 border-black shadow-brutal-sm hover:shadow-brutal transition-all flex items-center justify-center gap-2 font-bold text-sm"
                              >
                                <Eye className="w-4 h-4" />
                                View
                              </button>
                              <button
                                onClick={() => handleDeleteResult(result._id)}
                                className="px-3 sm:px-4 py-2 min-h-[44px] bg-white border-2 border-2 border-black shadow-brutal-sm hover:shadow-brutal hover:bg-red-50 transition-all"
                                title="Delete result"
                              >
                                <Trash2 className="w-4 h-4 text-red-600" />
                              </button>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                ) : (
                  <div className="text-center py-8 sm:py-12">
                    <Sparkles className="w-12 h-12 sm:w-16 sm:h-16 mx-auto mb-3 sm:mb-4 text-gray-400" />
                    <h3 className="text-lg sm:text-xl font-black mb-2">No Assessments Yet</h3>
                    <p className="text-sm sm:text-base text-gray-600 font-bold mb-4 px-4">
                      Take a career assessment to discover your perfect match!
                    </p>
                    <Link href="/assessments">
                      <button className="px-6 py-3 min-h-[44px] bg-primary text-white font-bold uppercase border-3 border-black shadow-brutal hover:shadow-brutal-lg transition-all text-sm sm:text-base">
                        Start Assessment
                      </button>
                    </Link>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Quick Actions */}
            <div className="bg-white border-3 border-black shadow-brutal-lg">
              <div className="p-4 sm:p-6 border-b-3 border-black">
                <h2 className="text-lg sm:text-xl font-black uppercase">Quick Actions</h2>
              </div>
              <div className="p-4 sm:p-6 space-y-3">
                <Link href="/careers">
                  <button className="w-full px-4 py-3 min-h-[44px] bg-brutal-blue text-white font-bold uppercase border-3 border-black shadow-brutal hover:shadow-brutal-lg transition-all text-left flex items-center gap-3 text-sm sm:text-base">
                    <BookOpen className="w-5 h-5" />
                    Explore Careers
                  </button>
                </Link>
                <Link href="/assessments">
                  <button className="w-full px-4 py-3 min-h-[44px] bg-brutal-pink text-white font-bold uppercase border-3 border-black shadow-brutal hover:shadow-brutal-lg transition-all text-left flex items-center gap-3 text-sm sm:text-base">
                    <Sparkles className="w-5 h-5" />
                    Take Assessment
                  </button>
                </Link>
                <Link href="/mentors">
                  <button className="w-full px-4 py-3 min-h-[44px] bg-brutal-green text-white font-bold uppercase border-3 border-black shadow-brutal hover:shadow-brutal-lg transition-all text-left flex items-center gap-3 text-sm sm:text-base">
                    <Calendar className="w-5 h-5" />
                    Book Mentor
                  </button>
                </Link>
              </div>
            </div>

            {/* Next Steps */}
            <div className="bg-brutal-yellow border-3 border-black shadow-brutal-lg p-4 sm:p-6">
              <h3 className="text-lg sm:text-xl font-black uppercase mb-4">Next Steps</h3>
              <ul className="space-y-3">
                <li className="flex items-start gap-3">
                  <span className="w-6 h-6 bg-black text-white flex items-center justify-center font-black text-sm flex-shrink-0">
                    1
                  </span>
                  <span className="font-bold text-sm sm:text-base">
                    {!assessmentResults || assessmentResults.length === 0
                      ? "Take your first career assessment"
                      : "Explore your top matched careers"}
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="w-6 h-6 bg-black text-white flex items-center justify-center font-black text-sm flex-shrink-0">
                    2
                  </span>
                  <span className="font-bold text-sm sm:text-base">
                    {!savedCareers || savedCareers.length === 0
                      ? "Save careers you are interested in"
                      : "Book a chat with a professional mentor"}
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="w-6 h-6 bg-black text-white flex items-center justify-center font-black text-sm flex-shrink-0">
                    3
                  </span>
                  <span className="font-bold text-sm sm:text-base">
                    Create a plan for your education path
                  </span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
