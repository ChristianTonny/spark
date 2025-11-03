"use client";

import { useState, useEffect } from "react";
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
import { careers } from "@/lib/data";
import { getAssessmentResults, formatAssessmentDate, deleteAssessmentResult } from "@/lib/assessment-storage";

export default function StudentDashboard() {
  const router = useRouter();
  const [bookmarkedCareers, setBookmarkedCareers] = useState<string[]>([]);
  const [assessmentResults, setAssessmentResults] = useState<any[]>([]);

  const studentData = {
    name: "Jane Mukarwego",
    gradeLevel: "Senior 5",
    school: "Lycée de Kigali",
    avatar: "https://api.dicebear.com/7.x/initials/svg?seed=JM&backgroundColor=ffb627",
  };

  useEffect(() => {
    const bookmarks = JSON.parse(localStorage.getItem("bookmarkedCareers") || "[]");
    const results = getAssessmentResults();
    setBookmarkedCareers(bookmarks);
    setAssessmentResults(results);
  }, []);

  const handleDeleteResult = (id: string) => {
    if (confirm("Are you sure you want to delete this assessment result?")) {
      deleteAssessmentResult(id);
      setAssessmentResults(getAssessmentResults());
    }
  };

  const savedCareersData = bookmarkedCareers
    .map((id: string) => careers.find(c => c.id === id))
    .filter(Boolean)
    .slice(0, 3);

  return (
    <div className="min-h-screen bg-background py-8 px-4">
      <div className="container mx-auto max-w-7xl">
        {/* Header */}
        <div className="mb-8 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 border-3 border-black shadow-brutal overflow-hidden">
              <img
                src={studentData.avatar}
                alt={studentData.name}
                className="w-full h-full object-cover"
              />
            </div>
            <div>
              <h1 className="text-3xl md:text-4xl font-black uppercase">
                Welcome back, {studentData.name.split(" ")[0]}!
              </h1>
              <p className="text-lg font-bold text-gray-700">
                {studentData.gradeLevel}  {studentData.school}
              </p>
            </div>
          </div>
          <div className="flex gap-2">
            <Link href="/dashboard/student/profile">
              <button className="px-4 py-2 bg-white border-3 border-black shadow-brutal hover:shadow-brutal-lg transition-all flex items-center gap-2 font-bold">
                <User className="w-4 h-4" />
                Profile
              </button>
            </Link>
            <Link href="/dashboard/student/settings">
              <button className="px-4 py-2 bg-white border-3 border-black shadow-brutal hover:shadow-brutal-lg transition-all flex items-center gap-2 font-bold">
                <Settings className="w-4 h-4" />
                Settings
              </button>
            </Link>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          <div className="bg-brutal-yellow border-3 border-black shadow-brutal p-6">
            <div className="flex items-center justify-between mb-2">
              <Bookmark className="w-8 h-8" />
              <span className="text-4xl font-black">{bookmarkedCareers.length}</span>
            </div>
            <h3 className="text-xl font-black uppercase">Saved Careers</h3>
            <p className="font-bold text-gray-700">Careers you are interested in</p>
          </div>

          <div className="bg-brutal-pink border-3 border-black shadow-brutal p-6">
            <div className="flex items-center justify-between mb-2">
              <Target className="w-8 h-8" />
              <span className="text-4xl font-black">{assessmentResults.length}</span>
            </div>
            <h3 className="text-xl font-black uppercase">Assessments</h3>
            <p className="font-bold text-gray-700">Career discovery tests taken</p>
          </div>

          <div className="bg-brutal-green border-3 border-black shadow-brutal p-6">
            <div className="flex items-center justify-between mb-2">
              <TrendingUp className="w-8 h-8" />
              <span className="text-4xl font-black">
                {assessmentResults.length > 0 ? (assessmentResults[0].topMatches[0]?.matchScore || 0) : 0}%
              </span>
            </div>
            <h3 className="text-xl font-black uppercase">Top Match</h3>
            <p className="font-bold text-gray-700">Your best career match score</p>
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {/* Main Content */}
          <div className="md:col-span-2 space-y-6">
            {/* Saved Careers Section */}
            <div className="bg-white border-3 border-black shadow-brutal-lg">
              <div className="p-6 border-b-3 border-black">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Bookmark className="w-6 h-6" />
                    <h2 className="text-2xl font-black uppercase">Saved Careers</h2>
                  </div>
                  <Link href="/careers">
                    <button className="px-4 py-2 bg-brutal-blue text-white font-bold uppercase border-3 border-black shadow-brutal hover:shadow-brutal-lg transition-all text-sm">
                      Browse All
                    </button>
                  </Link>
                </div>
              </div>

              <div className="p-6">
                {savedCareersData.length > 0 ? (
                  <div className="space-y-4">
                    {savedCareersData.map((career: any) => career && (
                      <Link
                        key={career.id}
                        href={`/careers/${career.id}`}
                        className="block"
                      >
                        <div className="border-2 border-black p-4 hover:shadow-brutal transition-all">
                          <div className="flex items-start gap-4">
                            <div className="w-20 h-20 border-2 border-black overflow-hidden flex-shrink-0">
                              <img
                                src={career.videoThumbnail}
                                alt={career.title}
                                className="w-full h-full object-cover"
                              />
                            </div>
                            <div className="flex-1 min-w-0">
                              <h3 className="text-xl font-black mb-1">{career.title}</h3>
                              <p className="text-sm font-bold text-gray-700 mb-2 line-clamp-2">
                                {career.shortDescription}
                              </p>
                              <div className="flex items-center gap-2">
                                <span className="px-2 py-1 bg-brutal-yellow text-xs font-bold uppercase border-2 border-black">
                                  {career.category}
                                </span>
                                <span className="text-sm font-bold text-gray-600">
                                  {(career.salaryMin / 1000000).toFixed(1)}M - {(career.salaryMax / 1000000).toFixed(1)}M RWF
                                </span>
                              </div>
                            </div>
                            <ArrowRight className="w-6 h-6 flex-shrink-0" />
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
              <div className="p-6 border-b-3 border-black">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Sparkles className="w-6 h-6" />
                    <h2 className="text-2xl font-black uppercase">Assessment Results</h2>
                  </div>
                  <Link href="/assessments">
                    <button className="px-4 py-2 bg-brutal-pink text-white font-bold uppercase border-3 border-black shadow-brutal hover:shadow-brutal-lg transition-all text-sm">
                      Take New
                    </button>
                  </Link>
                </div>
              </div>

              <div className="p-6">
                {assessmentResults.length > 0 ? (
                  <div className="space-y-4">
                    {assessmentResults.slice(0, 3).map((result) => {
                      const topMatch = result.topMatches[0];
                      const topCareer = careers.find(c => c.id === topMatch?.careerId);
                      
                      return (
                        <div 
                          key={result.id}
                          className="border-2 border-black p-4"
                        >
                          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                            <div className="flex-1">
                              <div className="flex items-center gap-3 mb-2">
                                <span className="text-sm font-bold text-gray-600">
                                  {formatAssessmentDate(result.completedAt)}
                                </span>
                                <span className="px-2 py-1 bg-brutal-green text-black text-xs font-bold border-2 border-black">
                                  {topMatch?.matchScore || 0}% Match
                                </span>
                              </div>
                              <h4 className="text-lg font-black mb-1">
                                Top Match: {topCareer?.title || "Unknown Career"}
                              </h4>
                              <p className="text-sm font-bold text-gray-700">
                                {topCareer?.shortDescription || ""}
                              </p>
                            </div>
                            <div className="flex gap-2">
                              <button
                                onClick={() => router.push(`/assessment/results?id=${result.id}`)}
                                className="px-4 py-2 bg-white border-2 border-black shadow-brutal-sm hover:shadow-brutal transition-all flex items-center gap-2 font-bold"
                              >
                                <Eye className="w-4 h-4" />
                                View
                              </button>
                              <button
                                onClick={() => handleDeleteResult(result.id)}
                                className="px-4 py-2 bg-white border-2 border-2 border-black shadow-brutal-sm hover:shadow-brutal hover:bg-red-50 transition-all"
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
                  <div className="text-center py-12">
                    <Sparkles className="w-16 h-16 mx-auto mb-4 text-gray-400" />
                    <h3 className="text-xl font-black mb-2">No Assessments Yet</h3>
                    <p className="text-gray-600 font-bold mb-4">
                      Take a career assessment to discover your perfect match!
                    </p>
                    <Link href="/assessments">
                      <button className="px-6 py-3 bg-primary text-white font-bold uppercase border-3 border-black shadow-brutal hover:shadow-brutal-lg transition-all">
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
              <div className="p-6 border-b-3 border-black">
                <h2 className="text-xl font-black uppercase">Quick Actions</h2>
              </div>
              <div className="p-6 space-y-3">
                <Link href="/careers">
                  <button className="w-full px-4 py-3 bg-brutal-blue text-white font-bold uppercase border-3 border-black shadow-brutal hover:shadow-brutal-lg transition-all text-left flex items-center gap-3">
                    <BookOpen className="w-5 h-5" />
                    Explore Careers
                  </button>
                </Link>
                <Link href="/assessments">
                  <button className="w-full px-4 py-3 bg-brutal-pink text-white font-bold uppercase border-3 border-black shadow-brutal hover:shadow-brutal-lg transition-all text-left flex items-center gap-3">
                    <Sparkles className="w-5 h-5" />
                    Take Assessment
                  </button>
                </Link>
                <Link href="/mentors">
                  <button className="w-full px-4 py-3 bg-brutal-green text-white font-bold uppercase border-3 border-black shadow-brutal hover:shadow-brutal-lg transition-all text-left flex items-center gap-3">
                    <Calendar className="w-5 h-5" />
                    Book Mentor
                  </button>
                </Link>
              </div>
            </div>

            {/* Next Steps */}
            <div className="bg-brutal-yellow border-3 border-black shadow-brutal-lg p-6">
              <h3 className="text-xl font-black uppercase mb-4">Next Steps</h3>
              <ul className="space-y-3">
                <li className="flex items-start gap-3">
                  <span className="w-6 h-6 bg-black text-white flex items-center justify-center font-black text-sm flex-shrink-0">
                    1
                  </span>
                  <span className="font-bold">
                    {assessmentResults.length === 0 
                      ? "Take your first career assessment" 
                      : "Explore your top matched careers"}
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="w-6 h-6 bg-black text-white flex items-center justify-center font-black text-sm flex-shrink-0">
                    2
                  </span>
                  <span className="font-bold">
                    {bookmarkedCareers.length === 0
                      ? "Save careers you are interested in"
                      : "Book a chat with a professional mentor"}
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="w-6 h-6 bg-black text-white flex items-center justify-center font-black text-sm flex-shrink-0">
                    3
                  </span>
                  <span className="font-bold">
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
