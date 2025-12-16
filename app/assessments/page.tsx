'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { ArrowRight, History, Eye, Trash2, Play, RotateCcw, AlertTriangle } from 'lucide-react';
import { formatAssessmentDate } from '@/lib/date-utils';
import { useQuery, useMutation } from "convex/react";
import { api } from "../../convex/_generated/api";
import { AssessmentResultSkeleton } from '@/components/loading-skeleton';
import { useConvexAuth } from '@/lib/hooks/useConvexAuth';
import { useToast } from '@/lib/use-toast';
import { ToastContainer } from '@/components/toast-container';

export default function AssessmentsPage() {
  const router = useRouter();
  const { user, isLoading: authLoading } = useConvexAuth();
  const { toasts, success, error, removeToast } = useToast();
  const [deleteConfirm, setDeleteConfirm] = useState<string | null>(null);

  // Fetch assessment results and pending assessment from Convex
  const previousResults = useQuery(api.assessments.getResults, user ? {} : "skip");
  const pendingAssessment = useQuery(api.assessments.getPending, user ? {} : "skip");

  const deleteResult = useMutation(api.assessments.deleteResult);

  // Loading if user auth is loading OR if results query is loading
  const isLoadingHistory = authLoading || (user && previousResults === undefined);

  // Determine button state: Resume (pending) > Try Again (has results) > Start Now (new)
  const getButtonConfig = () => {
    if (pendingAssessment) {
      return { text: 'Resume', icon: Play };
    }
    if (previousResults && previousResults.length > 0) {
      return { text: 'Try Again', icon: RotateCcw };
    }
    return { text: 'Start Now', icon: ArrowRight };
  };
  const buttonConfig = getButtonConfig();

  const handleDeleteClick = (resultId: string) => {
    setDeleteConfirm(resultId);
  };

  const handleDeleteConfirm = async () => {
    if (!deleteConfirm) return;
    try {
      await deleteResult({ resultId: deleteConfirm as any });
      success('Assessment result deleted');
    } catch (err) {
      error('Failed to delete result');
    }
    setDeleteConfirm(null);
  };
  return (
    <div className="min-h-screen bg-background py-6 sm:py-8 md:py-12 px-4">
      <div className="container mx-auto max-w-6xl">
        {/* Header */}
        <div className="mb-8 sm:mb-12">
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-black mb-3 sm:mb-4 uppercase">
            Find Your Career
          </h1>
          <p className="text-lg sm:text-xl md:text-2xl font-bold text-gray-700">
            25 questions. 15 minutes. See what fits.
          </p>
        </div>

        {/* Main Card - Blue Gradient Design */}
        <div
          className="border-3 border-black p-8 sm:p-10 md:p-12 mb-6 sm:mb-8 hover:shadow-brutal transition-all"
          style={{
            background: 'linear-gradient(135deg, #0752D8 0%, #478DE2 50%, #77B1F1 100%)'
          }}
        >
          {/* Intro */}
          <p className="text-lg sm:text-xl font-bold text-white/90 mb-8 max-w-2xl">
            Find out which careers match your interests and strengths — based on research, not guesswork.
          </p>

          {/* Features Row - Larger Icons */}
          <div className="flex flex-wrap items-center gap-6 sm:gap-8 mb-10">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-white border-2 border-black flex items-center justify-center text-base font-black">✓</div>
              <span className="text-white font-bold text-base">25 Questions</span>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-brutal-yellow border-2 border-black flex items-center justify-center text-base font-black">⏱</div>
              <span className="text-white font-bold text-base">15 Minutes</span>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-brutal-orange border-2 border-black flex items-center justify-center text-base font-black text-white">★</div>
              <span className="text-white font-bold text-base">Your Top Matches</span>
            </div>
          </div>

          {/* CTA Button - Black with white shadow */}
          <Link href="/assessment/questions">
            <button
              className="px-10 py-4 bg-black text-white font-black uppercase text-base sm:text-lg border-2 border-black hover:translate-x-[-1px] hover:translate-y-[-1px] transition-all flex items-center gap-3"
              style={{ boxShadow: '4px 4px 0px 0px #FFFFFF' }}
            >
              {buttonConfig.text}
              <buttonConfig.icon className="w-6 h-6" />
            </button>
          </Link>
        </div>

        {/* Previous Results Section - Always show with empty state */}
        <div className="mb-6 sm:mb-8">
          <div className="bg-white border-3 border-black p-4 sm:p-6 md:p-8 hover:shadow-brutal transition-all">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-6">
              <div className="flex items-center gap-2 sm:gap-3">
                <History className="w-6 h-6 sm:w-8 sm:h-8" />
                <h2 className="text-xl sm:text-2xl md:text-3xl font-black uppercase">Previous Results</h2>
              </div>
              {previousResults && previousResults.length > 0 && (
                <span className="px-3 py-1 bg-brutal-yellow text-black font-bold border-2 border-black text-sm sm:text-base self-start">
                  {previousResults.length} {previousResults.length === 1 ? 'result' : 'results'}
                </span>
              )}
            </div>

            {isLoadingHistory ? (
              <div className="space-y-4">
                {Array.from({ length: 2 }).map((_, i) => (
                  <AssessmentResultSkeleton key={i} />
                ))}
              </div>
            ) : (
              <div className="space-y-4">
                {previousResults && previousResults.map((result) => {
                  const topMatch = result.careerMatches[0];
                  const topCareer = topMatch?.career;

                  return (
                    <div
                      key={result._id}
                      className="border-2 border-black p-6 hover:shadow-brutal transition-all"
                    >
                      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-2">
                            <span className="text-sm font-bold text-gray-600">
                              {formatAssessmentDate(result.completedAt)}
                            </span>
                            <span className="px-2 py-1 bg-brutal-blue text-white text-xs font-bold border-2 border-black">
                              {Math.round(topMatch?.matchPercentage || 0)}% Match
                            </span>
                          </div>
                          <h3 className="text-xl font-black mb-1">
                            Top Match: {topCareer?.title || 'Unknown Career'}
                          </h3>
                          <p className="text-sm text-gray-700 font-bold">
                            {topCareer?.category || 'No description available'}
                          </p>
                        </div>

                        <div className="flex gap-2">
                          <button
                            onClick={() => router.push(`/assessment/results?id=${result._id}`)}
                            className="px-4 py-2 bg-white border-2 border-black shadow-brutal-sm hover:translate-x-[-1px] hover:translate-y-[-1px] transition-all flex items-center gap-2 font-bold"
                          >
                            <Eye className="w-4 h-4" />
                            View Results
                          </button>
                          <button
                            onClick={() => handleDeleteClick(result._id)}
                            className="px-4 py-2 bg-white border-2 border-black shadow-brutal-sm hover:translate-x-[-1px] hover:translate-y-[-1px] hover:bg-red-50 transition-all"
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
            )}

            {/* Empty State */}
            {!isLoadingHistory && !user && (
              <div className="text-center py-8">
                <p className="text-gray-600 font-bold mb-4">Sign in to view your assessment results</p>
                <p className="text-sm text-gray-500">Your results will be saved to your account</p>
              </div>
            )}
            {!isLoadingHistory && user && previousResults && previousResults.length === 0 && (
              <div className="text-center py-8">
                <p className="text-gray-600 font-bold mb-4">No assessment results yet</p>
                <p className="text-sm text-gray-500">Complete your first assessment to see results here!</p>
              </div>
            )}
          </div>
        </div>


        {/* Back Link */}
        <div className="text-center mt-8">
          <Link href="/" className="text-lg font-bold text-gray-600 hover:text-black">
            ← Back to Home
          </Link>
        </div>
      </div>

      {/* Delete Confirmation Modal */}
      {deleteConfirm && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white border-3 border-black p-6 max-w-sm w-full">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-red-100 border-2 border-black flex items-center justify-center">
                <AlertTriangle className="w-5 h-5 text-red-600" />
              </div>
              <h3 className="text-xl font-black">Delete Result?</h3>
            </div>
            <p className="text-gray-700 mb-6">
              This will permanently delete this assessment result. This action cannot be undone.
            </p>
            <div className="flex gap-3">
              <button
                onClick={() => setDeleteConfirm(null)}
                className="flex-1 px-4 py-3 bg-white text-black font-bold uppercase border-3 border-black shadow-brutal hover:shadow-brutal-lg transition-all"
              >
                Cancel
              </button>
              <button
                onClick={handleDeleteConfirm}
                className="flex-1 px-4 py-3 bg-red-600 text-white font-bold uppercase border-3 border-black shadow-brutal hover:shadow-brutal-lg transition-all"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Toast notifications */}
      <ToastContainer toasts={toasts} onClose={removeToast} />
    </div>
  );
}
