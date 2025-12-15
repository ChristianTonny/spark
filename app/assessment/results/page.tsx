'use client';

import { Suspense, useMemo, useState } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { ArrowRight, ArrowLeft, Bookmark, RotateCcw, ChevronDown, ChevronUp, Star } from 'lucide-react';
import { useQuery, useMutation } from "convex/react";
import { api } from "../../../convex/_generated/api";
import { Spinner } from '@/components/loading-skeleton';
import { useConvexAuth } from '@/lib/hooks/useConvexAuth';
import { useToast } from '@/lib/use-toast';
import { ToastContainer } from '@/components/toast-container';

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

    const strengthsMap: Record<string, { title: string; shortTitle: string; description: string }> = {
      realistic: {
        title: "Hands-On Problem Solver",
        shortTitle: "Practical",
        description: "You excel at practical, tangible work. Building, fixing, and working with tools or equipment comes naturally to you."
      },
      investigative: {
        title: "Analytical Thinker",
        shortTitle: "Analytical",
        description: "You excel at breaking down complex problems. Research and systematic thinking are your strengths."
      },
      artistic: {
        title: "Creative Innovator",
        shortTitle: "Creative",
        description: "You bring fresh perspectives and original thinking. Design and artistic expression are your strengths."
      },
      social: {
        title: "People Champion",
        shortTitle: "People-Focused",
        description: "You excel at helping and connecting with others. Empathy and communication are your strengths."
      },
      enterprising: {
        title: "Strategic Leader",
        shortTitle: "Leadership",
        description: "You excel at leading and influencing. Taking initiative and driving projects forward are your strengths."
      },
      conventional: {
        title: "Systematic Organizer",
        shortTitle: "Organized",
        description: "You excel at structure and detail-oriented work. Processes and systems are your forte."
      },
    };

    return topTypes.map(type => strengthsMap[type]).filter(Boolean);
  };

  const strengths = generateStrengthsNarrative();

  // Show loading state
  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#FAFAF9] flex items-center justify-center">
        <div className="text-center">
          <Spinner size="lg" />
          <p className="mt-4 text-lg font-medium text-gray-700">Loading results...</p>
        </div>
      </div>
    );
  }

  // Show empty state if no results
  if (!currentResult || displayMatches.length === 0) {
    return (
      <div className="min-h-screen bg-[#FAFAF9] flex items-center justify-center p-4">
        <div className="text-center max-w-md">
          <h2 className="text-2xl font-semibold text-gray-900 mb-3">No Results Found</h2>
          <p className="text-gray-600 mb-6">
            Complete the assessment to see your career matches.
          </p>
          <Link href="/assessment">
            <button className="px-6 py-3 bg-gray-900 text-white font-semibold rounded-lg hover:bg-gray-800 transition-colors">
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

  // Filter schools to ALU only
  const aluSchools = topMatchSchools?.filter(
    (s) =>
      typeof s.name === "string" &&
      (s.name.includes("African Leadership University") || s.name.includes("ALU"))
  ) || [];

  return (
    <div className="min-h-screen bg-[#FAFAF9]">
      {/* Header */}
      <div className="border-b border-gray-200 bg-white">
        <div className="max-w-4xl mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <button
                onClick={() => router.back()}
                className="p-2 -ml-2 text-gray-500 hover:text-gray-900 transition-colors"
                aria-label="Go back"
              >
                <ArrowLeft className="w-5 h-5" />
              </button>
              <h1 className="text-2xl font-semibold text-gray-900">Your Results</h1>
            </div>
            <Link href="/assessment">
              <button className="px-4 py-2 text-sm font-medium text-gray-600 hover:text-gray-900 border border-gray-300 rounded-lg hover:border-gray-400 transition-colors flex items-center gap-2">
                <RotateCcw className="w-4 h-4" />
                Retake
              </button>
            </Link>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-8 space-y-8">
        {/* Top Match Hero */}
        {top1?.career && (
          <section className="bg-white rounded-xl border border-gray-200 p-6 md:p-8 shadow-sm">
            <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-6">
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-3 mb-3">
                  <span className="text-sm font-medium text-gray-500 uppercase tracking-wide">
                    Top Match
                  </span>
                  <span className="px-2.5 py-1 bg-emerald-50 text-emerald-700 text-sm font-semibold rounded-full">
                    {top1.matchScore}% fit
                  </span>
                </div>
                <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-3">
                  {top1.career.title}
                </h2>
                <p className="text-gray-600 mb-5 leading-relaxed">
                  {top1.career.shortDescription}
                </p>

                {top1.reasons && top1.reasons.length > 0 && (
                  <ul className="space-y-2 mb-6">
                    {top1.reasons.slice(0, 3).map((reason: string, idx: number) => (
                      <li key={idx} className="text-sm text-gray-700 flex items-start gap-2">
                        <span className="text-emerald-600 mt-0.5">✓</span>
                        {reason}
                      </li>
                    ))}
                  </ul>
                )}

                <div className="flex flex-wrap gap-3">
                  <Link href={`/careers/${top1.career._id}`}>
                    <button className="px-5 py-2.5 bg-gray-900 text-white font-medium rounded-lg hover:bg-gray-800 transition-colors flex items-center gap-2">
                      View Career
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </Link>
                  <button
                    onClick={(e) => handleBookmark(e, top1.career!._id, top1.career!.title)}
                    className={`px-5 py-2.5 font-medium rounded-lg border transition-colors flex items-center gap-2 ${
                      bookmarkedIds?.includes(top1.career._id)
                        ? 'bg-amber-50 text-amber-700 border-amber-200'
                        : 'bg-white text-gray-700 border-gray-300 hover:border-gray-400'
                    }`}
                  >
                    <Bookmark className={`w-4 h-4 ${bookmarkedIds?.includes(top1.career._id) ? 'fill-current' : ''}`} />
                    {bookmarkedIds?.includes(top1.career._id) ? 'Saved' : 'Save'}
                  </button>
                </div>
              </div>
            </div>
          </section>
        )}

        {/* Other Top Matches */}
        {(top2?.career || top3?.career) && (
          <section>
            <h3 className="text-sm font-medium text-gray-500 uppercase tracking-wide mb-4">
              Also Strong Matches
            </h3>
            <div className="grid md:grid-cols-2 gap-4">
              {[top2, top3].filter(Boolean).map((m: any) => (
                <Link key={m.career._id} href={`/careers/${m.career._id}`}>
                  <div className="bg-white rounded-xl border border-gray-200 p-5 hover:border-gray-300 hover:shadow-sm transition-all cursor-pointer">
                    <div className="flex items-start justify-between gap-4">
                      <div className="min-w-0 flex-1">
                        <h4 className="font-semibold text-gray-900 mb-1">{m.career.title}</h4>
                        <p className="text-sm text-gray-600 line-clamp-2">{m.career.shortDescription}</p>
                      </div>
                      <span className="px-2.5 py-1 bg-gray-100 text-gray-700 text-sm font-medium rounded-full flex-shrink-0">
                        {m.matchScore}%
                      </span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </section>
        )}

        {/* Strengths Snapshot */}
        {strengths && strengths.length > 0 && (
          <section className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-900">Your Strengths</h3>
              <button
                onClick={() => setShowStrengthDetails((v) => !v)}
                className="text-sm font-medium text-gray-500 hover:text-gray-900 transition-colors"
              >
                {showStrengthDetails ? 'Hide details' : 'See details'}
              </button>
            </div>
            
            {!showStrengthDetails ? (
              <div className="flex flex-wrap gap-2">
                {strengths.map((s, i) => (
                  <span key={i} className="px-3 py-1.5 bg-gray-100 text-gray-700 text-sm font-medium rounded-full">
                    {s.shortTitle}
                  </span>
                ))}
              </div>
            ) : (
              <div className="space-y-4">
                {strengths.map((s, i) => (
                  <div key={i} className="pb-4 border-b border-gray-100 last:border-0 last:pb-0">
                    <h4 className="font-medium text-gray-900 mb-1">{s.title}</h4>
                    <p className="text-sm text-gray-600">{s.description}</p>
                  </div>
                ))}
              </div>
            )}
          </section>
        )}

        {/* All Matches */}
        {displayMatches.length > 3 && (
          <section className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="text-lg font-semibold text-gray-900">All Matches</h3>
                <p className="text-sm text-gray-500 mt-0.5">{displayMatches.length} careers matched</p>
              </div>
              <button
                onClick={toggleShowAll}
                className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors flex items-center gap-2"
              >
                {showAllMatches ? 'Show Less' : 'View All'}
                {showAllMatches ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
              </button>
            </div>

            {/* Compact list */}
            <div className="space-y-1">
              {(showAllMatches ? displayMatches : displayMatches.slice(0, 6)).map((match: any, index: number) => {
                const { career, matchScore } = match;
                if (!career) return null;
                return (
                  <Link key={career._id} href={`/careers/${career._id}`}>
                    <div className="flex items-center justify-between p-3 -mx-2 rounded-lg hover:bg-gray-50 transition-colors">
                      <div className="flex items-center gap-3 min-w-0">
                        <span className="text-sm font-medium text-gray-400 w-5">{index + 1}</span>
                        <span className="font-medium text-gray-900 truncate">{career.title}</span>
                      </div>
                      <div className="flex items-center gap-3 flex-shrink-0">
                        <span className="text-sm font-medium text-gray-500">{matchScore}%</span>
                        <ArrowRight className="w-4 h-4 text-gray-400" />
                      </div>
                    </div>
                  </Link>
                );
              })}
            </div>

            {showAllMatches && displayMatches.length > 10 && (
              <div className="pt-4 mt-4 border-t border-gray-100 text-center">
                <button
                  onClick={toggleShowAll}
                  className="text-sm font-medium text-gray-500 hover:text-gray-900 transition-colors"
                >
                  Show less
                </button>
              </div>
            )}
          </section>
        )}

        {/* Mentors Section */}
        {relevantMentors && relevantMentors.length > 0 && (
          <section className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
            <div className="flex items-center justify-between mb-5">
              <div>
                <h3 className="text-lg font-semibold text-gray-900">Talk to Professionals</h3>
                <p className="text-sm text-gray-500 mt-0.5">Mentors in your matched careers</p>
              </div>
              <Link href="/mentors" className="text-sm font-medium text-gray-500 hover:text-gray-900 transition-colors">
                View all →
              </Link>
            </div>

            <div className="grid md:grid-cols-3 gap-4">
              {relevantMentors.slice(0, 3).map((mentor) => (
                <Link key={mentor._id} href={`/mentors/${mentor.userId}`}>
                  <div className="p-4 rounded-lg border border-gray-200 hover:border-gray-300 hover:shadow-sm transition-all cursor-pointer">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center flex-shrink-0 overflow-hidden">
                        {mentor.avatar ? (
                          <img
                            src={mentor.avatar}
                            alt={`${mentor.firstName} ${mentor.lastName}`}
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <span className="font-semibold text-gray-600">
                            {mentor.firstName?.charAt(0) || '?'}
                          </span>
                        )}
                      </div>
                      <div className="min-w-0">
                        <h4 className="font-medium text-gray-900 truncate">
                          {mentor.firstName} {mentor.lastName}
                        </h4>
                        <p className="text-xs text-gray-500 truncate">{mentor.jobTitle}</p>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 text-xs text-gray-500">
                      <Star className="w-3 h-3 text-amber-500 fill-amber-500" />
                      <span className="font-medium">{mentor.rating || 5.0}</span>
                      <span>•</span>
                      <span>{mentor.chatsCompleted || 0} sessions</span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </section>
        )}

        {/* Featured Partner School */}
        {aluSchools.length > 0 && (
          <section className="bg-gradient-to-br from-orange-50 to-amber-50 rounded-xl border border-orange-200 p-6">
            <div className="flex items-center gap-2 mb-4">
              <span className="px-2.5 py-1 bg-orange-100 text-orange-700 text-xs font-semibold rounded-full uppercase tracking-wide">
                Featured Partner
              </span>
            </div>
            
            {aluSchools.slice(0, 1).map((school) => (
              <div key={school._id}>
                <h3 className="text-xl font-bold text-gray-900 mb-2">{school.name}</h3>
                <p className="text-gray-700 mb-4 text-sm leading-relaxed">
                  {school.description || "A leading institution offering programs aligned with your career matches."}
                </p>
                <div className="flex flex-wrap gap-3">
                  {school.website && (
                    <a href={school.website} target="_blank" rel="noopener noreferrer">
                      <button className="px-4 py-2 bg-orange-600 text-white font-medium text-sm rounded-lg hover:bg-orange-700 transition-colors">
                        Visit Website
                      </button>
                    </a>
                  )}
                  <Link href={`/careers?school=${school._id}`}>
                    <button className="px-4 py-2 bg-white text-gray-700 font-medium text-sm rounded-lg border border-gray-300 hover:border-gray-400 transition-colors">
                      View Programs
                    </button>
                  </Link>
                </div>
              </div>
            ))}
          </section>
        )}

        {/* Next Steps - Simplified */}
        {top1?.career && (
          <section className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
            <h3 className="text-lg font-semibold text-gray-900 mb-5">Your Next Steps</h3>
            <div className="grid md:grid-cols-2 gap-4">
              <Link href={`/careers/${top1.career._id}`}>
                <div className="p-4 rounded-lg border border-gray-200 hover:border-gray-300 hover:shadow-sm transition-all cursor-pointer group">
                  <div className="flex items-center gap-3 mb-2">
                    <span className="w-7 h-7 bg-gray-100 rounded-full flex items-center justify-center text-sm font-semibold text-gray-600">1</span>
                    <span className="font-medium text-gray-900">Research this career</span>
                  </div>
                  <p className="text-sm text-gray-600 pl-10">Read the detailed career guide</p>
                </div>
              </Link>

              <Link href={`/careers/compare?ids=${displayMatches.slice(0, 3).map(m => m.career?._id).filter(Boolean).join(',')}`}>
                <div className="p-4 rounded-lg border border-gray-200 hover:border-gray-300 hover:shadow-sm transition-all cursor-pointer group">
                  <div className="flex items-center gap-3 mb-2">
                    <span className="w-7 h-7 bg-gray-100 rounded-full flex items-center justify-center text-sm font-semibold text-gray-600">2</span>
                    <span className="font-medium text-gray-900">Compare your top 3</span>
                  </div>
                  <p className="text-sm text-gray-600 pl-10">See differences side-by-side</p>
                </div>
              </Link>

              <Link href="/mentors">
                <div className="p-4 rounded-lg border border-gray-200 hover:border-gray-300 hover:shadow-sm transition-all cursor-pointer group">
                  <div className="flex items-center gap-3 mb-2">
                    <span className="w-7 h-7 bg-gray-100 rounded-full flex items-center justify-center text-sm font-semibold text-gray-600">3</span>
                    <span className="font-medium text-gray-900">Talk to a professional</span>
                  </div>
                  <p className="text-sm text-gray-600 pl-10">Get real-world insights</p>
                </div>
              </Link>

              <Link href={`/learn?careerId=${encodeURIComponent(top1.career._id)}`}>
                <div className="p-4 rounded-lg border border-gray-200 hover:border-gray-300 hover:shadow-sm transition-all cursor-pointer group">
                  <div className="flex items-center gap-3 mb-2">
                    <span className="w-7 h-7 bg-gray-100 rounded-full flex items-center justify-center text-sm font-semibold text-gray-600">4</span>
                    <span className="font-medium text-gray-900">Start learning</span>
                  </div>
                  <p className="text-sm text-gray-600 pl-10">Build relevant skills</p>
                </div>
              </Link>
            </div>
          </section>
        )}

        {/* Footer Actions */}
        <div className="flex flex-col sm:flex-row gap-3 pt-4">
          <Link href="/assessment" className="flex-1">
            <button className="w-full px-6 py-3 font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:border-gray-400 transition-colors flex items-center justify-center gap-2">
              <RotateCcw className="w-4 h-4" />
              Retake Assessment
            </button>
          </Link>
          <Link href="/careers" className="flex-1">
            <button className="w-full px-6 py-3 font-medium text-white bg-gray-900 rounded-lg hover:bg-gray-800 transition-colors flex items-center justify-center gap-2">
              Browse All Careers
              <ArrowRight className="w-4 h-4" />
            </button>
          </Link>
        </div>

        {/* Back Link */}
        <div className="text-center py-8">
          <Link href="/dashboard/student" className="text-sm font-medium text-gray-500 hover:text-gray-900 transition-colors">
            ← Back to Dashboard
          </Link>
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
      <div className="min-h-screen bg-[#FAFAF9] flex items-center justify-center">
        <div className="text-center">
          <Spinner size="lg" />
          <p className="mt-4 text-lg font-medium text-gray-700">Loading results...</p>
        </div>
      </div>
    }>
      <AssessmentResultsContent />
    </Suspense>
  );
}
