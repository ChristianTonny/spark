'use client';

import { Suspense, useMemo, useState } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { Sparkles, ArrowRight, Bookmark, RotateCcw, ChevronDown, ChevronUp } from 'lucide-react';
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
    <div className="min-h-screen bg-background py-10 px-4">
      <div className="container mx-auto max-w-5xl space-y-8">
        {/* Minimal header */}
        <div className="flex items-start justify-between gap-6">
          <div>
            <p className="text-xs font-black uppercase text-gray-600 mb-2 flex items-center gap-2">
              <Sparkles className="w-4 h-4" />
              Results
            </p>
            <h1 className="text-4xl md:text-5xl font-black uppercase leading-tight">
              Your Top Match
            </h1>
            <p className="text-base md:text-lg font-bold text-gray-700 mt-2">
              Focus on the next 1–2 steps. Everything else is optional.
            </p>
          </div>
          <div className="hidden md:block">
            <Link href="/assessment">
              <button className="px-5 py-3 bg-white text-black font-bold uppercase border-3 border-black shadow-brutal hover:shadow-brutal-lg hover:translate-x-[-2px] hover:translate-y-[-2px] transition-all flex items-center gap-2">
                <RotateCcw className="w-4 h-4" />
                Retake
              </button>
            </Link>
          </div>
        </div>

        {/* Top match hero */}
        {top1?.career && (
          <div className="bg-white border-3 border-black shadow-brutal-lg p-6 md:p-8">
            <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-6">
              <div className="min-w-0">
                <h2 className="text-3xl md:text-4xl font-black mb-2">{top1.career.title}</h2>
                <p className="text-base md:text-lg font-bold text-gray-700 mb-4">
                  {top1.career.shortDescription}
                </p>

                {top1.reasons && top1.reasons.length > 0 && (
                  <ul className="space-y-1 mb-5">
                    {top1.reasons.slice(0, 3).map((reason: string, idx: number) => (
                      <li key={idx} className="text-sm text-gray-700 font-bold flex items-start gap-2">
                        <span className="text-brutal-green">✓</span>
                        {reason}
                      </li>
                    ))}
                  </ul>
                )}

                <div className="flex flex-wrap gap-3">
                  <Link href={`/careers/${top1.career._id}`}>
                    <button className="px-6 py-3 bg-black text-white font-bold uppercase text-sm border-3 border-black shadow-brutal-sm hover:shadow-brutal hover:translate-x-[-2px] hover:translate-y-[-2px] transition-all flex items-center gap-2">
                      View Career
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </Link>
                  <button
                    onClick={(e) => handleBookmark(e, top1.career!._id, top1.career!.title)}
                    className={`px-6 py-3 font-bold uppercase text-sm border-3 border-black shadow-brutal-sm hover:shadow-brutal hover:translate-x-[-2px] hover:translate-y-[-2px] transition-all flex items-center gap-2 ${
                      bookmarkedIds?.includes(top1.career._id) ? 'bg-brutal-yellow text-black' : 'bg-white text-black'
                    }`}
                  >
                    <Bookmark className={`w-4 h-4 ${bookmarkedIds?.includes(top1.career._id) ? 'fill-current' : ''}`} />
                    {bookmarkedIds?.includes(top1.career._id) ? 'Saved' : 'Save'}
                  </button>
                </div>
              </div>

              <div className="flex-shrink-0">
                <div className="text-center p-4 bg-primary border-3 border-black">
                  <div className="text-4xl font-black text-white mb-1">{top1.matchScore}%</div>
                  <div className="text-xs font-black uppercase text-white">Match</div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Next options */}
        {(top2?.career || top3?.career) && (
          <div className="grid md:grid-cols-2 gap-6">
            {[top2, top3].filter(Boolean).map((m: any, idx: number) => (
              <div key={m.career._id} className="bg-white border-3 border-black shadow-brutal p-6">
                <p className="text-xs font-black uppercase text-gray-600 mb-2">Option #{idx + 2}</p>
                <h3 className="text-2xl font-black mb-2">{m.career.title}</h3>
                <p className="text-sm font-bold text-gray-700 mb-4 line-clamp-2">{m.career.shortDescription}</p>
                <div className="flex items-center justify-between gap-3">
                  <Link href={`/careers/${m.career._id}`}>
                    <button className="px-4 py-2 bg-black text-white font-bold uppercase text-xs border-2 border-black hover:shadow-brutal transition-all">
                      View →
                    </button>
                  </Link>
                  <div className="px-3 py-2 bg-background border-2 border-black font-black text-sm">
                    {m.matchScore}%
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Strengths (minimal) */}
        {strengths && strengths.length > 0 && (
          <div className="bg-white border-3 border-black shadow-brutal p-6 md:p-8">
            <div className="flex items-start justify-between gap-6">
              <div>
                <h2 className="text-2xl md:text-3xl font-black uppercase mb-2">Strengths Snapshot</h2>
                <p className="text-sm font-bold text-gray-700">
                  {strengthsSummary || "Your strengths are being calculated."}
                </p>
              </div>
              <button
                onClick={() => setShowStrengthDetails((v) => !v)}
                className="px-4 py-2 bg-white border-2 border-black shadow-brutal-sm hover:shadow-brutal transition-all font-bold text-xs uppercase"
              >
                {showStrengthDetails ? "Hide details" : "See details"}
              </button>
            </div>

            {showStrengthDetails && (
              <div className="mt-6 space-y-4">
                {strengths.map((strength, index) => (
                  <div key={index} className="border-2 border-black p-5 bg-background">
                    <h3 className="text-lg md:text-xl font-black mb-2">{strength.title}</h3>
                    <p className="text-sm font-bold text-gray-700">{strength.description}</p>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* All matches (toggle) */}
        {displayMatches.length > 10 && (
          <div className="bg-white border-3 border-black shadow-brutal p-6 md:p-8">
            <div className="flex items-center justify-between gap-4">
              <div>
                <h2 className="text-2xl md:text-3xl font-black uppercase">All Matches</h2>
                <p className="text-sm font-bold text-gray-700 mt-1">
                  You have {displayMatches.length} matches. Keep it simple—use this only if needed.
                </p>
              </div>
              <button
                onClick={toggleShowAll}
                className="px-5 py-3 bg-accent text-black font-bold uppercase border-3 border-black shadow-brutal hover:shadow-brutal-lg hover:translate-x-[-2px] hover:translate-y-[-2px] transition-all flex items-center gap-2"
              >
                {showAllMatches ? `Show Top 10` : `Show All ${displayMatches.length}`}
                {showAllMatches ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
              </button>
            </div>

            {showAllMatches && (
              <div className="mt-6 space-y-4">
                {displayMatches.slice(0, 25).map((match: any, index: number) => {
                  const { career, matchScore } = match;
                  if (!career) return null;
                  return (
                    <Link key={career._id} href={`/careers/${career._id}`}>
                      <div className="border-2 border-black p-4 bg-white hover:shadow-brutal transition-all flex items-center justify-between gap-4">
                        <div className="min-w-0">
                          <p className="text-xs font-black uppercase text-gray-600 mb-1">#{index + 1}</p>
                          <p className="font-black text-base truncate">{career.title}</p>
                          <p className="text-xs font-bold text-gray-600 truncate">{career.category}</p>
                        </div>
                        <div className="flex items-center gap-3 flex-shrink-0">
                          <div className="px-3 py-2 bg-background border-2 border-black font-black text-sm">
                            {matchScore}%
                          </div>
                          <ArrowRight className="w-4 h-4" />
                        </div>
                      </div>
                    </Link>
                  );
                })}
                <div className="pt-2 text-center">
                  <button
                    onClick={toggleShowAll}
                    className="px-6 py-3 bg-white border-2 border-black shadow-brutal-sm hover:shadow-brutal transition-all font-bold text-sm uppercase inline-flex items-center gap-2"
                  >
                    Collapse to Top 10 <ChevronUp className="w-4 h-4" />
                  </button>
                </div>
              </div>
            )}
          </div>
        )}

        {/* Relevant Mentors Section */}
        {relevantMentors && relevantMentors.length > 0 && (
          <div className="bg-white border-3 border-black shadow-brutal p-6 md:p-8 mb-8">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-2xl md:text-3xl font-black uppercase mb-2">Talk to Professionals</h2>
                <p className="text-gray-700 font-medium">
                  Connect with mentors who work in your top matched careers
                </p>
              </div>
              <Link href="/mentors">
                <button className="px-4 py-2 bg-white border-2 border-black shadow-brutal-sm hover:shadow-brutal transition-all font-bold text-sm hidden md:block">
                  View All →
                </button>
              </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
              {relevantMentors.slice(0, 3).map((mentor) => (
                <div
                  key={mentor._id}
                  className="border-2 border-black p-4 hover:shadow-brutal transition-all"
                >
                  <div className="flex items-start gap-3 mb-3">
                    <div className="w-12 h-12 border-2 border-black bg-brutal-yellow flex items-center justify-center flex-shrink-0">
                      {mentor.avatar ? (
                        <img
                          src={mentor.avatar}
                          alt={`${mentor.firstName} ${mentor.lastName}`}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <span className="font-black text-lg">
                          {mentor.firstName?.charAt(0) || '?'}
                        </span>
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="font-black text-base mb-1 truncate">
                        {mentor.firstName} {mentor.lastName}
                      </h3>
                      <p className="text-xs font-bold text-gray-600 truncate">
                        {mentor.jobTitle}
                      </p>
                      {mentor.company && (
                        <p className="text-xs font-medium text-gray-500 truncate">
                          at {mentor.company}
                        </p>
                      )}
                    </div>
                  </div>

                  {mentor.bio && (
                    <p className="text-xs text-gray-700 mb-3 line-clamp-2">
                      {mentor.bio}
                    </p>
                  )}

                  <div className="flex items-center gap-2 mb-3">
                    <div className="flex items-center gap-1">
                      <Sparkles className="w-3 h-3 text-yellow-500" />
                      <span className="text-xs font-bold">{mentor.rating || 5.0}</span>
                    </div>
                    <span className="text-xs text-gray-600">
                      ({mentor.chatsCompleted || 0} chats)
                    </span>
                    {mentor.yearsExperience && (
                      <>
                        <span className="text-xs text-gray-400">•</span>
                        <span className="text-xs font-medium text-gray-600">
                          {mentor.yearsExperience}+ yrs
                        </span>
                      </>
                    )}
                  </div>

                  <Link href={`/mentors/${mentor.userId}`}>
                    <button className="w-full px-4 py-2 bg-brutal-orange text-white font-bold uppercase text-xs border-2 border-black shadow-brutal-sm hover:shadow-brutal transition-all">
                      Book 60-min Session
                    </button>
                  </Link>
                </div>
              ))}
            </div>

            <Link href="/mentors" className="block md:hidden mt-4">
              <button className="w-full px-4 py-2 bg-white border-2 border-black shadow-brutal-sm hover:shadow-brutal transition-all font-bold text-sm">
                View All Mentors →
              </button>
            </Link>
          </div>
        )}

        {/* School Recommendations for Top Matches (ALU only for now) */}
        {topMatchSchools && topMatchSchools.length > 0 && (
          <div className="bg-white border-3 border-black shadow-brutal p-6 md:p-8 mb-8">
            <SchoolRecommendations
              schools={topMatchSchools.filter(
                (s) =>
                  typeof s.name === "string" &&
                  (s.name.includes("African Leadership University") ||
                    s.name.includes("ALU"))
              )}
              title="Recommended Schools for Your Top Matches"
              maxDisplay={1}
              showViewAll={false}
            />
            <p className="mt-4 text-sm text-gray-600 font-bold">
              These institutions offer programs that align with your top career matches.
              Click "Visit Website" to learn about admission requirements and application processes.
            </p>
          </div>
        )}

        {/* Next Steps Section */}
        {top1?.career && (
          <div className="bg-white border-3 border-black shadow-brutal p-8 mb-8">
            <h2 className="text-3xl font-black mb-6 uppercase">Your Next Steps</h2>
            <p className="text-lg font-bold text-gray-700 mb-6">
              Based on your top match ({top1.career.title}), here&apos;s what you should do next:
            </p>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="border-2 border-black p-6">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 bg-accent border-2 border-black flex items-center justify-center">
                    <span className="text-xl font-black text-black">1</span>
                  </div>
                  <h3 className="text-xl font-black">Research Deeply</h3>
                </div>
                <p className="text-sm font-bold text-gray-700 mb-3">
                  Read the detailed career guide to understand day-to-day work, required education, and career progression.
                </p>
                <Link href={`/careers/${top1.career._id}`}>
                  <button className="px-4 py-2 bg-black text-white font-bold text-sm border-2 border-black hover:shadow-brutal transition-all">
                    View Career Guide →
                  </button>
                </Link>
              </div>

              <div className="border-2 border-black p-6">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 bg-primary border-2 border-black flex items-center justify-center">
                    <span className="text-xl font-black text-black">2</span>
                  </div>
                  <h3 className="text-xl font-black">Compare Options</h3>
                </div>
                <p className="text-sm font-bold text-gray-700 mb-3">
                  Not sure between your top matches? Compare them side-by-side to see the differences.
                </p>
                <Link href={`/careers/compare?ids=${displayMatches.slice(0, 3).map(m => m.career?._id).filter(Boolean).join(',')}`}>
                  <button className="px-4 py-2 bg-black text-white font-bold text-sm border-2 border-black hover:shadow-brutal transition-all">
                    Compare Top 3 Careers →
                  </button>
                </Link>
              </div>

              <div className="border-2 border-black p-6">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 bg-secondary border-2 border-black flex items-center justify-center">
                    <span className="text-xl font-black text-black">3</span>
                  </div>
                  <h3 className="text-xl font-black">Talk to Professionals</h3>
                </div>
                <p className="text-sm font-bold text-gray-700 mb-3">
                  Connect with mentors who work in your top career matches for real-world insights.
                </p>
                <Link href="/mentors">
                  <button className="px-4 py-2 bg-black text-white font-bold text-sm border-2 border-black hover:shadow-brutal transition-all">
                    Find Mentors →
                  </button>
                </Link>
              </div>

              <div className="border-2 border-black p-6">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 bg-brutal-green border-2 border-black flex items-center justify-center">
                    <span className="text-xl font-black text-black">4</span>
                  </div>
                  <h3 className="text-xl font-black">Start Learning</h3>
                </div>
                <p className="text-sm font-bold text-gray-700 mb-3">
                  Begin building skills relevant to your top careers through online courses and projects.
                </p>
                <Link href={`/learn?careerId=${encodeURIComponent(top1.career._id)}`}>
                  <button className="px-4 py-2 bg-black text-white font-bold text-sm border-2 border-black hover:shadow-brutal transition-all">
                    Start Learning →
                  </button>
                </Link>
              </div>
            </div>
          </div>
        )}

        {/* Actions */}
        <div className="grid md:grid-cols-2 gap-6 mb-8">
          <Link href="/assessment">
            <button className="w-full px-6 py-4 bg-white text-black font-bold uppercase border-3 border-black shadow-brutal hover:shadow-brutal-lg hover:translate-x-[-2px] hover:translate-y-[-2px] transition-all flex items-center justify-center gap-2">
              <RotateCcw className="w-5 h-5" />
              Retake Assessment
            </button>
          </Link>
          <Link href="/careers">
            <button className="w-full px-6 py-4 bg-primary text-white font-bold uppercase border-3 border-black shadow-brutal hover:shadow-brutal-lg hover:translate-x-[-2px] hover:translate-y-[-2px] transition-all flex items-center justify-center gap-2">
              Browse All Careers
              <ArrowRight className="w-5 h-5" />
            </button>
          </Link>
        </div>


        {/* Back Link */}
        <div className="text-center mt-8">
          <Link href="/dashboard/student" className="text-lg font-bold text-gray-600 hover:text-black">
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
