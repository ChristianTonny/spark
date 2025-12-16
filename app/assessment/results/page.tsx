'use client';

import { Suspense, useMemo, useState } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { Sparkles, ArrowRight, Bookmark, RotateCcw, ChevronDown, ChevronUp, Maximize2 } from 'lucide-react';
import { useQuery, useMutation } from "convex/react";
import { api } from "../../../convex/_generated/api";
import { AssessmentLoader } from '@/components/assessment-loader';
import { useConvexAuth } from '@/lib/hooks/useConvexAuth';
import { useToast } from '@/lib/use-toast';
import { ToastContainer } from '@/components/toast-container';
import { SchoolRecommendations } from '@/components/SchoolRecommendations';
import { SimpleModal } from '@/components/SimpleModal';

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
      <AssessmentLoader
        fullscreen
        message="Loading results..."
        subMessage="Finding your career matches"
      />
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
              You'd Be Great At This
            </h1>
            <p className="text-base md:text-lg font-bold text-gray-700 mt-2">
              Here's what fits — and what to do next.
            </p>
          </div>
          <div className="hidden md:block">
            <Link href="/assessment">
              <button className="px-3 py-2 bg-white text-black font-bold uppercase text-sm border-2 border-black shadow-brutal-sm hover:translate-x-[-1px] hover:translate-y-[-1px] transition-all flex items-center gap-2">
                <RotateCcw className="w-3 h-3" />
                Retake
              </button>
            </Link>
          </div>
        </div>

        {/* Top match hero - Gradient Design */}
        {top1?.career && (
          <div
            className="border-3 border-black p-6 md:p-8 hover:shadow-brutal transition-all"
            style={{ background: 'linear-gradient(135deg, #0752D8 0%, #478DE2 50%, #77B1F1 100%)' }}
          >
            <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-6">
              <div className="min-w-0">
                <h2 className="text-3xl md:text-4xl font-black mb-2 text-white">{top1.career.title}</h2>
                <p className="text-base md:text-lg font-bold text-white/90 mb-4">
                  {top1.career.shortDescription}
                </p>

                {top1.reasons && top1.reasons.length > 0 && (
                  <ul className="space-y-1 mb-5">
                    {top1.reasons.slice(0, 2).map((reason: string, idx: number) => (
                      <li key={idx} className="text-sm text-white/90 font-bold flex items-start gap-2">
                        <span className="text-white">✓</span>
                        {reason}
                      </li>
                    ))}
                  </ul>
                )}

                <div className="flex flex-wrap gap-3">
                  <Link href={`/careers/${top1.career._id}`}>
                    <button
                      className="px-6 py-3 bg-black text-white font-bold uppercase text-sm border-2 border-black hover:translate-x-[-1px] hover:translate-y-[-1px] transition-all flex items-center gap-2"
                      style={{ boxShadow: '3px 3px 0px 0px rgba(255, 255, 255, 0.5)' }}
                    >
                      View Career
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </Link>
                  <button
                    onClick={(e) => handleBookmark(e, top1.career!._id, top1.career!.title)}
                    className={`px-6 py-3 font-bold uppercase text-sm border-2 border-black hover:translate-x-[-1px] hover:translate-y-[-1px] transition-all flex items-center gap-2 ${bookmarkedIds?.includes(top1.career._id) ? 'bg-brutal-yellow text-black' : 'bg-white text-black'
                      }`}
                  >
                    <Bookmark className={`w-4 h-4 ${bookmarkedIds?.includes(top1.career._id) ? 'fill-current' : ''}`} />
                    {bookmarkedIds?.includes(top1.career._id) ? 'Saved' : 'Save'}
                  </button>
                </div>
              </div>

              <div className="flex-shrink-0">
                <div className="text-center p-4 bg-white border-3 border-black">
                  <div className="text-4xl font-black text-black mb-1">{top1.matchScore}%</div>
                  <div className="text-xs font-black uppercase text-black">Match</div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Next options */}
        {(top2?.career || top3?.career) && (
          <div className="grid md:grid-cols-2 gap-6">
            {[top2, top3].filter(Boolean).map((m: any, idx: number) => (
              <div key={m.career._id} className="bg-white border-3 border-black p-6 hover:shadow-brutal transition-all flex flex-col">
                <p className="text-xs font-black uppercase text-gray-600 mb-2">Option #{idx + 2}</p>
                <h3 className="text-2xl font-black mb-2">{m.career.title}</h3>
                <p className="text-sm font-bold text-gray-700 mb-4 line-clamp-2 flex-grow">{m.career.shortDescription}</p>
                <div className="flex items-center justify-between gap-3 mt-auto">
                  <Link href={`/careers/${m.career._id}`}>
                    <button className="px-4 py-2 bg-black text-white font-bold uppercase text-xs border-2 border-black hover:translate-x-[-1px] hover:translate-y-[-1px] transition-all">
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
        {/* Explore More Section - Combined Strengths + All Matches */}
        {((strengths?.length ?? 0) > 0 || displayMatches.length > 10) && (
          <div className="bg-white border-3 border-black p-6 md:p-8 hover:shadow-brutal transition-all">
            <h2 className="text-2xl md:text-3xl font-black uppercase mb-4">Explore More</h2>

            <div className="grid md:grid-cols-2 gap-4">
              {/* Strengths */}
              {strengths && strengths.length > 0 && (
                <div className="border-2 border-black p-4">
                  <div className="flex items-center justify-between gap-3 mb-2">
                    <h3 className="text-base font-black">Your Strengths</h3>
                    <button
                      onClick={() => setShowStrengthDetails(true)}
                      className="px-3 py-1 bg-white border-2 border-black shadow-brutal-sm hover:translate-x-[-1px] hover:translate-y-[-1px] transition-all font-bold text-xs"
                    >
                      See Details
                    </button>
                  </div>
                  <p className="text-sm font-bold text-gray-600 line-clamp-2">
                    {strengthsSummary || "Your strengths are being calculated."}
                  </p>
                </div>
              )}

              {/* All Matches */}
              {displayMatches.length > 10 && (
                <div className="border-2 border-black p-4">
                  <div className="flex items-center justify-between gap-3 mb-2">
                    <h3 className="text-base font-black">All Matches</h3>
                    <button
                      onClick={() => setShowAllMatches(true)}
                      className="px-3 py-1 bg-brutal-blue text-white border-2 border-black shadow-brutal-sm hover:translate-x-[-1px] hover:translate-y-[-1px] transition-all font-bold text-xs"
                    >
                      Show {displayMatches.length}
                    </button>
                  </div>
                  <p className="text-sm font-bold text-gray-600">
                    {displayMatches.length} career matches found
                  </p>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Strengths Modal */}
        <SimpleModal
          isOpen={showStrengthDetails}
          onClose={() => setShowStrengthDetails(false)}
          title="Your Strengths"
        >
          <div className="space-y-3">
            {strengths?.map((strength, index) => (
              <div key={index} className="border-2 border-black p-4 bg-background hover:shadow-brutal hover:translate-x-[-2px] hover:translate-y-[-2px] transition-all cursor-default">
                <h4 className="text-base font-black mb-1">{strength.title}</h4>
                <p className="text-sm font-bold text-gray-700">{strength.description}</p>
              </div>
            ))}
          </div>
        </SimpleModal>

        {/* All Matches Modal */}
        <SimpleModal
          isOpen={showAllMatches}
          onClose={() => setShowAllMatches(false)}
          title={`All ${displayMatches.length} Matches`}
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {displayMatches.slice(0, 25).map((match: any, index: number) => {
              const { career, matchScore } = match;
              if (!career) return null;

              // Different subtle gradients based on rank tier
              const getHeaderStyle = () => {
                if (index === 0) return { background: 'linear-gradient(135deg, #0752D8 0%, #478DE2 100%)' };
                if (index === 1) return { background: 'linear-gradient(135deg, #478DE2 0%, #77B1F1 100%)' };
                if (index === 2) return { background: 'linear-gradient(135deg, #77B1F1 0%, #a8cffa 100%)' };
                if (index < 10) return { background: '#f5f5f5' };
                return { background: '#fafafa' };
              };

              const isTop3 = index < 3;

              return (
                <Link key={career._id} href={`/careers/${career._id}`} onClick={() => setShowAllMatches(false)}>
                  <div className={`border-2 border-black bg-white hover:shadow-brutal hover:translate-x-[-2px] hover:translate-y-[-2px] transition-all h-full ${isTop3 ? 'border-3' : ''}`}>
                    {/* Card Header with subtle gradient */}
                    <div
                      className="flex items-center justify-between p-3 border-b-2 border-black"
                      style={getHeaderStyle()}
                    >
                      <span className={`font-black text-sm ${isTop3 ? 'text-white' : 'text-gray-700'}`}>#{index + 1}</span>
                      <span className={`px-2 py-1 border-2 border-black font-black text-xs ${matchScore >= 80 ? 'bg-white text-black' : matchScore >= 60 ? 'bg-brutal-yellow text-black' : 'bg-white text-black'}`}>
                        {matchScore}%
                      </span>
                    </div>

                    {/* Card Body */}
                    <div className="p-4">
                      <h3 className="font-black text-lg mb-1 line-clamp-1">{career.title}</h3>
                      <p className="text-xs font-bold text-gray-600 mb-3">{career.category}</p>
                      <div className="flex items-center gap-1 text-brutal-blue font-bold text-xs">
                        View Career <ArrowRight className="w-3 h-3" />
                      </div>
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        </SimpleModal>

        {/* Relevant Mentors Section */}
        {relevantMentors && relevantMentors.length > 0 && (
          <div className="bg-white border-3 border-black p-6 md:p-8 mb-8 hover:shadow-brutal transition-all">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-2xl md:text-3xl font-black uppercase mb-2">Talk to Professionals</h2>
                <p className="text-gray-700 font-medium">
                  Connect with mentors who work in your top matched careers
                </p>
              </div>
              <Link href="/mentors">
                <button className="px-4 py-2 bg-white border-2 border-black shadow-brutal-sm hover:translate-x-[-1px] hover:translate-y-[-1px] transition-all font-bold text-sm hidden md:block">
                  View All →
                </button>
              </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
              {relevantMentors.slice(0, 2).map((mentor) => (
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
                    <button className="w-full px-4 py-2 bg-brutal-orange text-white font-bold uppercase text-xs border-2 border-black shadow-brutal-sm hover:translate-x-[-1px] hover:translate-y-[-1px] transition-all">
                      Book 60-min Session
                    </button>
                  </Link>
                </div>
              ))}
            </div>

            <Link href="/mentors" className="block md:hidden mt-4">
              <button className="w-full px-4 py-2 bg-white border-2 border-black shadow-brutal-sm hover:translate-x-[-1px] hover:translate-y-[-1px] transition-all font-bold text-sm">
                View All Mentors →
              </button>
            </Link>
          </div>
        )
        }

        {/* School Recommendations for Top Matches (ALU only for now) */}
        {
          topMatchSchools && topMatchSchools.length > 0 && (
            <div className="bg-white border-3 border-black p-6 md:p-8 mb-8">
              <SchoolRecommendations
                schools={topMatchSchools.filter(
                  (s) =>
                    typeof s.name === "string" &&
                    (s.name.includes("African Leadership University") ||
                      s.name.includes("ALU"))
                )}
                title="Recommended Schools for Your Top Matches"
                maxDisplay={1}
              />
            </div>
          )
        }

        {/* What Now Section */}
        {
          top1?.career && (
            <div className="bg-white border-3 border-black p-6 md:p-8 mb-8 hover:shadow-brutal transition-all">
              <h2 className="text-2xl md:text-3xl font-black mb-4 uppercase">What Now?</h2>
              <div className="grid md:grid-cols-2 gap-4 md:gap-6">
                <div className="border-2 border-black p-4 flex flex-col">
                  <div className="flex items-center gap-2 mb-2">
                    <div className="w-6 h-6 bg-accent border-2 border-black flex items-center justify-center text-sm font-black">1</div>
                    <h3 className="text-base font-black">Explore This Career</h3>
                  </div>
                  <p className="text-sm font-bold text-gray-700 mb-3 flex-grow">
                    See what this job is actually like — daily work, skills, salaries.
                  </p>
                  <Link href={`/careers/${top1.career._id}`} className="mt-auto">
                    <button className="px-3 py-2 bg-accent text-black font-bold text-xs border-2 border-black hover:translate-x-[-1px] hover:translate-y-[-1px] transition-all">
                      View Career →
                    </button>
                  </Link>
                </div>

                <div className="border-2 border-black p-4 flex flex-col">
                  <div className="flex items-center gap-2 mb-2">
                    <div className="w-6 h-6 bg-primary border-2 border-black flex items-center justify-center text-sm font-black text-white">2</div>
                    <h3 className="text-base font-black">Talk to Someone Who Does This</h3>
                  </div>
                  <p className="text-sm font-bold text-gray-700 mb-3 flex-grow">
                    Ask a real professional your questions.
                  </p>
                  <Link href="/mentors" className="mt-auto">
                    <button className="px-3 py-2 bg-primary text-white font-bold text-xs border-2 border-black hover:translate-x-[-1px] hover:translate-y-[-1px] transition-all">
                      Find Mentors →
                    </button>
                  </Link>
                </div>
              </div>
            </div>
          )
        }



        {/* Back Link */}
        <div className="text-center mt-8">
          <Link href="/dashboard/student" className="text-lg font-bold text-gray-600 hover:text-black">
            ← Back to Dashboard
          </Link>
        </div>
      </div >

      {/* Toast Notifications */}
      < ToastContainer toasts={toast.toasts} onClose={toast.removeToast} />
    </div >
  );
}

export default function AssessmentResultsPage() {
  return (
    <Suspense fallback={
      <AssessmentLoader fullscreen message="Loading results..." />
    }>
      <AssessmentResultsContent />
    </Suspense>
  );
}
