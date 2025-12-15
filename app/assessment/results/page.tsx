'use client';

import { Suspense, useMemo, useState } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { Sparkles, ArrowRight, Bookmark, RotateCcw, ChevronDown, ChevronUp, ArrowLeft, Check } from 'lucide-react';
import { useQuery, useMutation } from "convex/react";
import { api } from "../../../convex/_generated/api";
import { Spinner } from '@/components/loading-skeleton';
import { useConvexAuth } from '@/lib/hooks/useConvexAuth';
import { useToast } from '@/lib/use-toast';
import { ToastContainer } from '@/components/toast-container';
import { SchoolRecommendations } from '@/components/SchoolRecommendations';

function AssessmentResultsContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const resultId = searchParams.get('id');
  const { user, isLoading: authLoading } = useConvexAuth();
  const toast = useToast();
  const [showAllMatches, setShowAllMatches] = useState(false);
  const [showStrengthDetails, setShowStrengthDetails] = useState(false);

  // Fetch all results for current user (only if authenticated)
  const allResults = useQuery(api.assessments.getResults, user ? {} : "skip");
  const bookmarkedIds = useQuery(api.savedCareers.getIds, user ? {} : "skip");
  const toggleBookmark = useMutation(api.savedCareers.toggle);

  // Handle bookmark toggle
  const handleBookmark = async (e: React.MouseEvent, careerId: string, careerTitle: string) => {
    e.preventDefault();
    e.stopPropagation();

    if (!user) {
      toast.error('Please sign in to bookmark careers');
      return;
    }

    try {
      const result = await toggleBookmark({ careerId });
      if (result.action === 'added') {
        toast.success(`Added ${careerTitle} to bookmarks`);
      } else {
        toast.success(`Removed ${careerTitle} from bookmarks`);
      }
    } catch (error) {
      toast.error('Failed to update bookmark');
    }
  };

  // Find the specific result by ID, or use the most recent one
  let currentResult = null;
  if (allResults && allResults.length > 0) {
    if (resultId) {
      currentResult = allResults.find(r => r._id === resultId);
      if (!currentResult) {
        // If specific result not found, use most recent
        currentResult = allResults[0];
      }
    } else {
      // No ID specified, use most recent
      currentResult = allResults[0];
    }
  }

  // Get mentors/schools for the CURRENT result (top 3 careers)
  const topCareerIds = useMemo(() => {
    if (!currentResult) return [];
    return currentResult.careerMatches
      .slice(0, 3)
      .map((m: any) => m.careerId)
      .filter(Boolean) as any[];
  }, [currentResult]);

  const relevantMentors = useQuery(
    api.professionals.getByCareerIds,
    topCareerIds.length > 0 ? { careerIds: topCareerIds } : "skip"
  );

  const topMatchSchools = useQuery(
    api.careers.getSchoolsForCareers,
    topCareerIds.length > 0 ? { careerIds: topCareerIds } : "skip"
  );

  const isLoading = authLoading || (user && allResults === undefined);

  // Prepare display matches from Convex result
  const displayMatches = currentResult
    ? currentResult.careerMatches.map(m => ({
        career: m.career,
        matchScore: Math.round(m.matchPercentage),
        reasons: m.matchReasons,
      })).filter(m => m.career !== null)
    : [];

  // Get assessment scores for strengths narrative
  const scores = currentResult?.scores;

  // Generate strengths narrative
  const generateStrengthsNarrative = () => {
    if (!scores?.riasec) return null;

    const riasec = scores.riasec;
    const topTypes = Object.entries(riasec)
      .sort(([, a], [, b]) => (b as number) - (a as number))
      .slice(0, 3)
      .map(([type]) => type);

    const strengthsMap: Record<string, { title: string; description: string; careers: string }> = {
      realistic: {
        title: "🔧 Hands-On Problem Solver",
        description: "You excel at practical, tangible work. You like building, fixing, and working with tools or equipment. Your mechanical aptitude and preference for concrete results make you effective in hands-on roles.",
        careers: "Engineering, Construction, Manufacturing, IT Support"
      },
      investigative: {
        title: "🔬 Analytical Thinker",
        description: "You excel at breaking down complex problems logically. Research, data analysis, and systematic thinking come naturally to you. You enjoy understanding how things work at a deep level.",
        careers: "Data Analyst, Researcher, Scientist, Software Developer"
      },
      artistic: {
        title: "🎨 Creative Innovator",
        description: "You excel at creative and original thinking. Design, artistic expression, and innovative solutions are your strengths. You bring fresh perspectives and aesthetic sensibility to your work.",
        careers: "Designer, Writer, Artist, Content Creator, Marketing"
      },
      social: {
        title: "🤝 People Champion",
        description: "You excel at helping and working with people. Teaching, mentoring, and supporting others energizes you. Your empathy and communication skills make you effective in people-focused roles.",
        careers: "Teacher, Counselor, Healthcare, Human Resources"
      },
      enterprising: {
        title: "💼 Strategic Leader",
        description: "You excel at leading and influencing others. Taking initiative, making decisions, and driving projects forward are your strengths. Your entrepreneurial mindset helps you spot opportunities.",
        careers: "Manager, Entrepreneur, Sales, Business Development"
      },
      conventional: {
        title: "📊 Systematic Organizer",
        description: "You excel at structure and organization. Detail-oriented work, processes, and systems are your forte. Your conscientiousness and reliability make you excellent at maintaining order.",
        careers: "Accountant, Administrator, Project Manager, Analyst"
      },
    };

    return topTypes.map(type => strengthsMap[type]).filter(Boolean);
  };

  const strengths = generateStrengthsNarrative();
  const strengthsSummary = strengths
    ? strengths
        .slice(0, 3)
        .map((s) => s.title.replace(/^[^A-Za-z0-9]+/, "").trim())
        .join(" • ")
    : null;

  // Show loading state
  if (isLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <Spinner size="lg" />
          <p className="mt-4 text-xl font-bold">Loading results...</p>
          <p className="text-gray-600 font-medium">Finding your career matches</p>
        </div>
      </div>
    );
  }

  // Show empty state if no results
  if (!currentResult || displayMatches.length === 0) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center p-4">
        <div className="text-center max-w-md">
          <h2 className="text-2xl font-black mb-4">No Results Found</h2>
          <p className="text-gray-700 font-bold mb-6">
            Complete the assessment to see your career matches.
          </p>
          <Link href="/assessment">
            <button className="px-6 py-3 bg-primary text-white font-bold uppercase border-3 border-black shadow-brutal hover:shadow-brutal-lg transition-all">
              Take Assessment
            </button>
          </Link>
        </div>
      </div>
    );
  }

  const top1 = displayMatches[0];
  const top2 = displayMatches[1];
  const top3 = displayMatches[2];

  const toggleShowAll = () => setShowAllMatches((v) => !v);

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 md:px-8">
      <div className="container mx-auto max-w-5xl space-y-12">
        {/* Navigation & Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-4">
            <Link 
              href="/dashboard/student" 
              className="inline-flex items-center text-sm font-semibold text-gray-500 hover:text-black transition-colors"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Dashboard
            </Link>
            <div>
              <h1 className="text-3xl md:text-5xl font-bold text-gray-900 tracking-tight">
                Your Top Match
              </h1>
              <p className="text-lg text-gray-600 mt-2 font-medium max-w-2xl">
                Based on your interests and personality, this career path is your strongest fit.
              </p>
            </div>
          </div>
          <div>
            <Link href="/assessment">
              <button className="px-6 py-3 bg-white text-gray-900 font-bold border border-gray-200 rounded-full hover:bg-gray-50 hover:border-gray-300 transition-all flex items-center gap-2 shadow-sm">
                <RotateCcw className="w-4 h-4" />
                Retake Assessment
              </button>
            </Link>
          </div>
        </div>

        {/* Top match hero */}
        {top1?.career && (
          <div className="bg-white border border-gray-200 shadow-xl shadow-gray-200/40 rounded-2xl overflow-hidden transition-all duration-300 hover:shadow-2xl hover:shadow-gray-200/50">
            <div className="p-8 md:p-10 flex flex-col md:flex-row gap-8 md:gap-12">
              <div className="flex-1 min-w-0 space-y-6">
                <div>
                  <div className="inline-flex items-center px-3 py-1 rounded-full bg-green-50 text-green-700 text-sm font-bold mb-4 border border-green-100">
                    #1 Recommendation
                  </div>
                  <h2 className="text-4xl font-bold text-gray-900 mb-3">{top1.career.title}</h2>
                  <p className="text-xl text-gray-600 leading-relaxed font-medium">
                    {top1.career.shortDescription}
                  </p>
                </div>

                {top1.reasons && top1.reasons.length > 0 && (
                  <div className="bg-gray-50 rounded-xl p-6 border border-gray-100">
                    <h3 className="text-sm font-bold text-gray-900 uppercase tracking-wide mb-3">Why it fits you</h3>
                    <ul className="space-y-3">
                      {top1.reasons.slice(0, 3).map((reason: string, idx: number) => (
                        <li key={idx} className="text-base text-gray-700 font-medium flex items-start gap-3">
                          <div className="mt-1 w-5 h-5 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0">
                            <Check className="w-3 h-3 text-green-600" strokeWidth={3} />
                          </div>
                          {reason}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                <div className="flex flex-wrap gap-4 pt-2">
                  <Link href={`/careers/${top1.career._id}`}>
                    <button className="px-8 py-4 bg-gray-900 text-white font-bold text-lg rounded-xl shadow-lg hover:bg-black hover:-translate-y-1 transition-all flex items-center gap-2">
                      View Career Guide
                      <ArrowRight className="w-5 h-5" />
                    </button>
                  </Link>
                  <button
                    onClick={(e) => handleBookmark(e, top1.career!._id, top1.career!.title)}
                    className={`px-8 py-4 font-bold text-lg rounded-xl border-2 transition-all flex items-center gap-2 ${
                      bookmarkedIds?.includes(top1.career._id) 
                        ? 'bg-yellow-50 border-yellow-400 text-yellow-800' 
                        : 'bg-white border-gray-200 text-gray-700 hover:border-gray-400 hover:bg-gray-50'
                    }`}
                  >
                    <Bookmark className={`w-5 h-5 ${bookmarkedIds?.includes(top1.career._id) ? 'fill-current' : ''}`} />
                    {bookmarkedIds?.includes(top1.career._id) ? 'Saved' : 'Save for Later'}
                  </button>
                </div>
              </div>

              <div className="flex-shrink-0 md:w-64">
                <div className="bg-gray-900 text-white rounded-2xl p-6 text-center shadow-lg relative overflow-hidden group">
                  <div className="absolute top-0 right-0 p-3 opacity-10 group-hover:opacity-20 transition-opacity">
                    <Sparkles className="w-24 h-24" />
                  </div>
                  <div className="relative z-10">
                    <div className="text-6xl font-black tracking-tighter mb-2">{top1.matchScore}%</div>
                    <div className="text-sm font-bold uppercase tracking-widest text-gray-300">Match Score</div>
                    <div className="mt-4 pt-4 border-t border-gray-700">
                      <p className="text-sm text-gray-300 font-medium">
                        Strong alignment with your interests & personality
                      </p>
                    </div>
                  </div>
                </div>
                
                {/* Secondary CTA area */}
                <div className="mt-4 p-4 bg-blue-50 rounded-xl border border-blue-100 text-center">
                  <p className="text-sm font-bold text-blue-900 mb-2">Ready to start?</p>
                  <Link href={`/learn?careerId=${encodeURIComponent(top1.career._id)}`}>
                    <button className="w-full py-2 bg-blue-600 text-white font-bold rounded-lg text-sm hover:bg-blue-700 transition-colors">
                      Start Learning Path
                    </button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Next options */}
        {(top2?.career || top3?.career) && (
          <div className="grid md:grid-cols-2 gap-6">
            {[top2, top3].filter(Boolean).map((m: any, idx: number) => (
              <div key={m.career._id} className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <span className="text-xs font-bold uppercase text-gray-500 tracking-wider">Option #{idx + 2}</span>
                    <h3 className="text-xl font-bold text-gray-900 mt-1">{m.career.title}</h3>
                  </div>
                  <div className="px-3 py-1 bg-gray-100 rounded-lg font-bold text-sm text-gray-700">
                    {m.matchScore}%
                  </div>
                </div>
                <p className="text-gray-600 font-medium mb-6 line-clamp-2 h-12">
                  {m.career.shortDescription}
                </p>
                <div className="flex items-center justify-between border-t border-gray-100 pt-4">
                   <span className="text-sm font-semibold text-gray-500">{m.career.category}</span>
                   <Link href={`/careers/${m.career._id}`}>
                    <button className="text-blue-600 font-bold text-sm hover:text-blue-800 transition-colors flex items-center gap-1">
                      View Details <ArrowRight className="w-4 h-4" />
                    </button>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Strengths (minimal) */}
        {strengths && strengths.length > 0 && (
          <div className="bg-white border border-gray-200 rounded-2xl p-8 shadow-sm">
            <div className="flex items-center justify-between mb-8">
              <div>
                <h2 className="text-2xl font-bold text-gray-900">Your Strengths Snapshot</h2>
                <p className="text-gray-600 font-medium mt-1">
                  Key traits that drive your career matches
                </p>
              </div>
            </div>

            <div className="grid md:grid-cols-3 gap-6">
              {strengths.map((strength, index) => (
                <div key={index} className="bg-gray-50 rounded-xl p-6 border border-gray-100">
                  <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-sm mb-4 text-xl">
                    {strength.title.split(' ')[0]}
                  </div>
                  <h3 className="text-lg font-bold text-gray-900 mb-2">
                    {strength.title.replace(/^[^A-Za-z0-9]+/, "").trim()}
                  </h3>
                  <p className="text-sm text-gray-600 leading-relaxed font-medium">
                    {strength.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* All matches (toggle) */}
        {displayMatches.length > 3 && (
          <div className="bg-white border border-gray-200 rounded-2xl p-8 shadow-sm">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
              <div>
                <h2 className="text-2xl font-bold text-gray-900">All Career Matches</h2>
                <p className="text-gray-600 font-medium mt-1">
                  Explore other possibilities ranked by fit
                </p>
              </div>
              <button
                onClick={toggleShowAll}
                className="px-5 py-2.5 bg-gray-100 text-gray-900 font-bold rounded-lg hover:bg-gray-200 transition-colors flex items-center gap-2 text-sm"
              >
                {showAllMatches ? `Show Top 10 Only` : `View All ${displayMatches.length} Matches`}
                {showAllMatches ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
              </button>
            </div>

            {showAllMatches ? (
              <div className="grid gap-3 animate-in fade-in slide-in-from-top-4 duration-500">
                {displayMatches.slice(3, 25).map((match: any, index: number) => {
                  const { career, matchScore } = match;
                  if (!career) return null;
                  return (
                    <Link key={career._id} href={`/careers/${career._id}`}>
                      <div className="group border border-gray-100 rounded-xl p-4 bg-white hover:border-gray-300 hover:shadow-md transition-all flex items-center justify-between gap-4">
                        <div className="flex items-center gap-4 min-w-0">
                          <span className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center text-xs font-bold text-gray-500 group-hover:bg-gray-900 group-hover:text-white transition-colors">
                            #{index + 4}
                          </span>
                          <div className="min-w-0">
                            <p className="font-bold text-gray-900 truncate">{career.title}</p>
                            <p className="text-xs font-medium text-gray-500 truncate">{career.category}</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-4 flex-shrink-0">
                          <span className="font-bold text-sm text-gray-700 bg-gray-50 px-3 py-1 rounded-md">
                            {matchScore}% Match
                          </span>
                          <ArrowRight className="w-4 h-4 text-gray-300 group-hover:text-gray-900 transition-colors" />
                        </div>
                      </div>
                    </Link>
                  );
                })}
              </div>
            ) : (
              <div className="text-center py-8 bg-gray-50 rounded-xl border border-dashed border-gray-200">
                <p className="text-gray-500 font-medium mb-4">
                  We found {displayMatches.length - 3} more careers that match your profile.
                </p>
                <button
                  onClick={toggleShowAll}
                  className="px-5 py-2 bg-white border border-gray-300 text-gray-700 font-bold rounded-lg hover:bg-gray-50 transition-colors text-sm shadow-sm"
                >
                  Expand Full List
                </button>
              </div>
            )}
          </div>
        )}

        {/* Mentors & Schools - Side by Side on Desktop */}
        <div className="grid lg:grid-cols-2 gap-8">
            
            {/* Relevant Mentors Section */}
            {relevantMentors && relevantMentors.length > 0 && (
              <div className="bg-white border border-gray-200 rounded-2xl p-8 shadow-sm h-full">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-xl font-bold text-gray-900">Talk to Professionals</h2>
                  <Link href="/mentors" className="text-sm font-bold text-blue-600 hover:underline">
                    View All
                  </Link>
                </div>

                <div className="space-y-4">
                  {relevantMentors.slice(0, 3).map((mentor) => (
                    <div
                      key={mentor._id}
                      className="border border-gray-100 rounded-xl p-4 hover:border-gray-300 hover:bg-gray-50 transition-all flex items-start gap-4"
                    >
                      <div className="w-12 h-12 rounded-full bg-gray-200 overflow-hidden flex-shrink-0">
                        {mentor.avatar ? (
                          <img
                            src={mentor.avatar}
                            alt={`${mentor.firstName} ${mentor.lastName}`}
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center font-bold text-gray-500">
                            {mentor.firstName?.charAt(0) || '?'}
                          </div>
                        )}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex justify-between items-start">
                          <div>
                            <h3 className="font-bold text-gray-900 truncate">
                              {mentor.firstName} {mentor.lastName}
                            </h3>
                            <p className="text-xs font-medium text-gray-600 truncate">
                              {mentor.jobTitle} {mentor.company && `at ${mentor.company}`}
                            </p>
                          </div>
                          <div className="flex items-center gap-1 text-xs font-bold bg-yellow-50 text-yellow-700 px-2 py-1 rounded">
                            <span className="text-yellow-500">★</span> {mentor.rating || 5.0}
                          </div>
                        </div>
                        <Link href={`/mentors/${mentor.userId}`}>
                          <button className="mt-3 text-xs font-bold text-gray-900 border border-gray-300 rounded px-3 py-1.5 hover:bg-gray-900 hover:text-white transition-colors">
                            Book Session
                          </button>
                        </Link>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* School Recommendations */}
            {topMatchSchools && topMatchSchools.length > 0 && (
              <div className="bg-white border border-gray-200 rounded-2xl p-8 shadow-sm h-full">
                <SchoolRecommendations
                  schools={topMatchSchools.filter(
                    (s) =>
                      typeof s.name === "string" &&
                      (s.name.includes("African Leadership University") ||
                        s.name.includes("ALU"))
                  )}
                  title="Featured Partner"
                  maxDisplay={1}
                  showViewAll={false}
                />
                <p className="mt-4 text-sm text-gray-500 font-medium">
                  Verified institution offering programs for your top matches.
                </p>
              </div>
            )}
        </div>

        {/* Bottom CTA */}
        <div className="bg-gray-900 rounded-2xl p-8 md:p-12 text-center text-white relative overflow-hidden">
          <div className="relative z-10 max-w-2xl mx-auto">
            <h2 className="text-2xl md:text-3xl font-bold mb-4">Ready to take the next step?</h2>
            <p className="text-gray-300 mb-8 font-medium">
              Explore our full database of careers, schools, and mentors.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/careers">
                <button className="px-8 py-3 bg-white text-gray-900 font-bold rounded-full hover:bg-gray-100 transition-colors">
                  Browse All Careers
                </button>
              </Link>
              <Link href="/dashboard/student">
                <button className="px-8 py-3 bg-transparent border border-gray-600 text-white font-bold rounded-full hover:bg-gray-800 transition-colors">
                  Go to Dashboard
                </button>
              </Link>
            </div>
          </div>
        </div>

      </div>

      {/* Toast Notifications */}
      <ToastContainer toasts={toast.toasts} onClose={toast.removeToast} />
    </div>
  );
}

export default function AssessmentResultsPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <Spinner size="lg" />
          <p className="mt-4 text-xl font-bold">Loading results...</p>
        </div>
      </div>
    }>
      <AssessmentResultsContent />
    </Suspense>
  );
}
