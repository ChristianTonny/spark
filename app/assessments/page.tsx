'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Brain, Sparkles, Target, Clock, ArrowRight, History, TrendingUp, Eye, Trash2 } from 'lucide-react';
import { formatAssessmentDate } from '@/lib/date-utils';
import { useQuery, useMutation } from "convex/react";
import { api } from "../../convex/_generated/api";
import { AssessmentResultSkeleton } from '@/components/loading-skeleton';
import { useConvexAuth } from '@/lib/hooks/useConvexAuth';

export default function AssessmentsPage() {
  const router = useRouter();
  const { user, isLoading: authLoading } = useConvexAuth();

  // Fetch assessment results from Convex (only if user is authenticated)
  const previousResults = useQuery(api.assessments.getResults, user ? {} : "skip");

  const deleteResult = useMutation(api.assessments.deleteResult);

  // Loading if user auth is loading OR if results query is loading
  const isLoadingHistory = authLoading || (user && previousResults === undefined);

  const handleDelete = async (resultId: string) => {
    if (confirm('Are you sure you want to delete this assessment result?')) {
      await deleteResult({ resultId: resultId as any });
    }
  };
  return (
    <div className="min-h-screen bg-background py-6 sm:py-8 md:py-12 px-4">
      <div className="container mx-auto max-w-6xl">
        {/* Header */}
        <div className="text-center mb-8 sm:mb-12">
          <div className="inline-flex items-center justify-center w-16 h-16 sm:w-20 sm:h-20 bg-primary border-3 border-black shadow-brutal mb-4 sm:mb-6">
            <Brain className="w-10 h-10 sm:w-12 sm:h-12 text-white" />
          </div>
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-black mb-3 sm:mb-4 uppercase">
            Career Assessment
          </h1>
          <p className="text-lg sm:text-xl md:text-2xl font-bold text-gray-700">
            Discover Your Perfect Career Match
          </p>
        </div>

        {/* Main Card */}
        <div className="bg-white border-3 border-black shadow-brutal-lg p-4 sm:p-6 md:p-8 lg:p-12 mb-6 sm:mb-8">
          {/* What to Expect */}
          <div className="mb-8 sm:mb-10">
            <h2 className="text-xl sm:text-2xl md:text-3xl font-black uppercase mb-4 sm:mb-6">What to Expect</h2>
            <p className="text-sm sm:text-base md:text-lg font-bold text-gray-700 mb-4">
              This 10-minute assessment will help you discover careers that match your interests,
              skills, and goals. Answer honestly - there are no right or wrong answers!
            </p>
          </div>

          {/* Features Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6 mb-8 sm:mb-10">
            <div className="p-4 sm:p-6 bg-background border-3 border-black">
              <div className="flex items-center gap-2 sm:gap-3 mb-2 sm:mb-3">
                <div className="p-2 bg-accent border-2 border-black">
                  <Target className="w-5 h-5 sm:w-6 sm:h-6" />
                </div>
                <h3 className="text-base sm:text-lg md:text-xl font-black uppercase">15 Questions</h3>
              </div>
              <p className="text-xs sm:text-sm font-bold text-gray-700">
                Quick and focused questions about your interests and strengths
              </p>
            </div>

            <div className="p-4 sm:p-6 bg-background border-3 border-black">
              <div className="flex items-center gap-2 sm:gap-3 mb-2 sm:mb-3">
                <div className="p-2 bg-secondary border-2 border-black">
                  <Clock className="w-5 h-5 sm:w-6 sm:h-6 text-orange-500" />
                </div>
                <h3 className="text-base sm:text-lg md:text-xl font-black uppercase">10 Minutes</h3>
              </div>
              <p className="text-sm font-bold text-gray-700">
                Complete at your own pace - you can pause and resume anytime
              </p>
            </div>

            <div className="p-6 bg-background border-3 border-black">
              <div className="flex items-center gap-3 mb-3">
                <div className="p-2 bg-primary border-2 border-black">
                  <Sparkles className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-xl font-black uppercase">Top 5 Matches</h3>
              </div>
              <p className="text-sm font-bold text-gray-700">
                Get personalized career recommendations with match scores
              </p>
            </div>
          </div>

          {/* Topics Covered */}
          <div className="mb-10">
            <h2 className="text-3xl font-black uppercase mb-6">Topics Covered</h2>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 bg-black text-white flex items-center justify-center font-black">
                  1
                </div>
                <div>
                  <p className="font-black text-lg">Your Interests</p>
                  <p className="text-sm font-bold text-gray-700">What subjects and activities excite you?</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-8 h-8 bg-black text-white flex items-center justify-center font-black">
                  2
                </div>
                <div>
                  <p className="font-black text-lg">Your Strengths</p>
                  <p className="text-sm font-bold text-gray-700">What skills come naturally to you?</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-8 h-8 bg-black text-white flex items-center justify-center font-black">
                  3
                </div>
                <div>
                  <p className="font-black text-lg">Work Environment</p>
                  <p className="text-sm font-bold text-gray-700">Where do you see yourself working?</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-8 h-8 bg-black text-white flex items-center justify-center font-black">
                  4
                </div>
                <div>
                  <p className="font-black text-lg">Career Goals</p>
                  <p className="text-sm font-bold text-gray-700">What matters most to you in a career?</p>
                </div>
              </div>
            </div>
          </div>

          {/* CTA Button */}
          <Link href="/assessment/questions">
            <button className="w-full px-6 sm:px-8 py-4 sm:py-6 min-h-[60px] bg-primary text-white font-black uppercase text-lg sm:text-xl md:text-2xl border-3 border-black shadow-brutal hover:shadow-brutal-lg hover:translate-x-[-4px] hover:translate-y-[-4px] transition-all flex items-center justify-center gap-3 sm:gap-4">
              {previousResults && previousResults.length > 0 ? 'Retake Assessment' : 'Start Assessment'}
              <ArrowRight className="w-6 h-6 sm:w-8 sm:h-8" />
            </button>
          </Link>
        </div>

        {/* Previous Results Section - Always show with empty state */}
        <div className="mb-6 sm:mb-8">
          <div className="bg-white border-3 border-black shadow-brutal-lg p-4 sm:p-6 md:p-8">
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
                            <span className="px-2 py-1 bg-brutal-green text-black text-xs font-bold border-2 border-black">
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
                            className="px-4 py-2 bg-white border-2 border-black shadow-brutal-sm hover:shadow-brutal transition-all flex items-center gap-2 font-bold"
                          >
                            <Eye className="w-4 h-4" />
                            View Results
                          </button>
                          <button
                            onClick={() => handleDelete(result._id)}
                            className="px-4 py-2 bg-white border-2 border-black shadow-brutal-sm hover:shadow-brutal hover:bg-red-50 transition-all"
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

        {/* Additional Info */}
        <div className="grid md:grid-cols-2 gap-6">
          <div className="p-6 bg-white border-3 border-black shadow-brutal">
            <h3 className="text-xl font-black uppercase mb-3">💾 Your Privacy</h3>
            <p className="text-sm font-bold text-gray-700">
              Your responses are saved to your account so you can review and retake the 
              assessment anytime. We never share your data.
            </p>
          </div>

          <div className="p-6 bg-white border-3 border-black shadow-brutal">
            <h3 className="text-xl font-black uppercase mb-3">🔄 Retake Anytime</h3>
            <p className="text-sm font-bold text-gray-700">
              Your interests change as you grow! Feel free to retake the assessment 
              every few months to see new recommendations.
            </p>
          </div>
        </div>

        {/* Back Link */}
        <div className="text-center mt-8">
          <Link href="/" className="text-lg font-bold text-gray-600 hover:text-black">
            ← Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
}
