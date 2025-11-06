'use client';

import { Suspense } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { Sparkles, ArrowRight, Bookmark, RotateCcw } from 'lucide-react';
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

  const isLoading = authLoading || (user && allResults === undefined);

  // Prepare display matches from Convex result
  const displayMatches = currentResult
    ? currentResult.careerMatches.map(m => ({
        career: m.career,
        matchScore: Math.round(m.matchPercentage),
        reasons: m.matchReasons,
      })).filter(m => m.career !== null)
    : [];

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

  return (
    <div className="min-h-screen bg-background py-12 px-4">
      <div className="container mx-auto max-w-5xl">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-accent border-3 border-black shadow-brutal mb-6">
            <Sparkles className="w-12 h-12 text-black" />
          </div>
          <h1 className="text-5xl md:text-7xl font-black mb-4 uppercase">
            Your Career Matches!
          </h1>
          <p className="text-2xl font-bold text-gray-700">
            Here are your top 5 career recommendations
          </p>
        </div>

        {/* Results Grid */}
        <div className="space-y-6 mb-12">
          {displayMatches.map((match, index) => {
            const { career, matchScore, reasons } = match;

            if (!career) return null;

            const rankColors = [
              'bg-accent', // 1st - yellow
              'bg-primary', // 2nd - orange
              'bg-secondary', // 3rd - blue
              'bg-gray-700', // 4th
              'bg-gray-600', // 5th
            ];

            return (
              <div
                key={career._id}
                className="bg-white border-3 border-black shadow-brutal hover:shadow-brutal-lg hover:translate-x-[-2px] hover:translate-y-[-2px] transition-all"
              >
                <div className="p-6 md:p-8">
                  <div className="flex flex-col md:flex-row gap-6">
                    {/* Rank Badge */}
                    <div className="flex-shrink-0">
                      <div
                        className={`w-16 h-16 ${rankColors[index]} border-3 border-black flex items-center justify-center`}
                      >
                        <span className="text-3xl font-black text-white">
                          #{index + 1}
                        </span>
                      </div>
                    </div>

                    {/* Content */}
                    <div className="flex-1">
                      <div className="flex flex-col md:flex-row md:items-start md:justify-between mb-4">
                        <div>
                          <h3 className="text-3xl font-black mb-2">{career.title}</h3>
                          <p className="text-lg font-bold text-gray-700 mb-3">
                            {career.shortDescription}
                          </p>
                          <div className="flex flex-wrap gap-2 mb-4">
                            <span className="px-3 py-1 bg-background text-xs font-black uppercase border-2 border-black">
                              {career.category}
                            </span>
                            <span className="px-3 py-1 bg-background text-xs font-black uppercase border-2 border-black">
                              {(career.salaryMin / 1000000).toFixed(1)}M - {(career.salaryMax / 1000000).toFixed(1)}M RWF
                            </span>
                          </div>

                          {/* Match Reasons */}
                          {reasons && reasons.length > 0 && (
                            <div className="mb-4">
                              <p className="text-xs font-black uppercase text-gray-600 mb-2">Why this matches:</p>
                              <ul className="space-y-1">
                                {reasons.map((reason, idx) => (
                                  <li key={idx} className="text-sm text-gray-700 font-bold flex items-start gap-2">
                                    <span className="text-brutal-green">✓</span>
                                    {reason}
                                  </li>
                                ))}
                              </ul>
                            </div>
                          )}
                        </div>

                        {/* Match Score */}
                        <div className="flex-shrink-0 md:ml-6">
                          <div className="text-center p-4 bg-primary border-3 border-black">
                            <div className="text-4xl font-black text-white mb-1">
                              {matchScore}%
                            </div>
                            <div className="text-xs font-black uppercase text-white">
                              Match
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Actions */}
                      <div className="flex flex-wrap gap-3">
                        <Link href={`/careers/${career._id}`}>
                          <button className="px-6 py-3 bg-black text-white font-bold uppercase text-sm border-3 border-black shadow-brutal-sm hover:shadow-brutal hover:translate-x-[-2px] hover:translate-y-[-2px] transition-all flex items-center gap-2">
                            Learn More
                            <ArrowRight className="w-4 h-4" />
                          </button>
                        </Link>
                        <button
                          onClick={(e) => handleBookmark(e, career._id, career.title)}
                          className={`px-6 py-3 font-bold uppercase text-sm border-3 border-black shadow-brutal-sm hover:shadow-brutal hover:translate-x-[-2px] hover:translate-y-[-2px] transition-all flex items-center gap-2 ${
                            bookmarkedIds?.includes(career._id)
                              ? 'bg-brutal-yellow text-black'
                              : 'bg-white text-black'
                          }`}
                        >
                          <Bookmark className={`w-4 h-4 ${bookmarkedIds?.includes(career._id) ? 'fill-current' : ''}`} />
                          {bookmarkedIds?.includes(career._id) ? 'Saved' : 'Save Career'}
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

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

        {/* Next Steps */}
        <div className="bg-white border-3 border-black shadow-brutal p-8">
          <h2 className="text-3xl font-black mb-6 uppercase">What&apos;s Next?</h2>
          <div className="grid md:grid-cols-3 gap-6">
            <div>
              <div className="w-12 h-12 bg-primary border-3 border-black flex items-center justify-center mb-3">
                <span className="text-2xl font-black text-white">1</span>
              </div>
              <h3 className="text-xl font-black mb-2">Explore Careers</h3>
              <p className="text-sm font-bold text-gray-700">
                Click on each career to learn more about the day-to-day work, education requirements, and salary.
              </p>
            </div>
            <div>
              <div className="w-12 h-12 bg-secondary border-3 border-black flex items-center justify-center mb-3">
                <span className="text-2xl font-black text-white">2</span>
              </div>
              <h3 className="text-xl font-black mb-2">Watch Videos</h3>
              <p className="text-sm font-bold text-gray-700">
                See real professionals talk about their careers and what a typical day looks like.
              </p>
            </div>
            <div>
              <div className="w-12 h-12 bg-accent border-3 border-black flex items-center justify-center mb-3">
                <span className="text-2xl font-black">3</span>
              </div>
              <h3 className="text-xl font-black mb-2">Book a Mentor</h3>
              <p className="text-sm font-bold text-gray-700">
                Schedule a 15-minute chat with professionals in careers that interest you.
              </p>
            </div>
          </div>
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
