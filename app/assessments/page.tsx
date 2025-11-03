'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Brain, Sparkles, Target, Clock, ArrowRight, History, TrendingUp, Eye, Trash2 } from 'lucide-react';
import { getAssessmentResults, formatAssessmentDate, deleteAssessmentResult, type AssessmentResult } from '@/lib/assessment-storage';
import { careers } from '@/lib/data';
import { AssessmentResultSkeleton } from '@/components/loading-skeleton';

export default function AssessmentsPage() {
  const router = useRouter();
  const [previousResults, setPreviousResults] = useState<AssessmentResult[]>([]);
  const [showHistory, setShowHistory] = useState(false);
  const [isLoadingHistory, setIsLoadingHistory] = useState(true);

  useEffect(() => {
    const results = getAssessmentResults();
    setPreviousResults(results);
    setShowHistory(results.length > 0);
    // Simulate loading delay
    setTimeout(() => setIsLoadingHistory(false), 500);
  }, []);

  const handleDelete = (id: string) => {
    if (confirm('Are you sure you want to delete this assessment result?')) {
      deleteAssessmentResult(id);
      const results = getAssessmentResults();
      setPreviousResults(results);
      setShowHistory(results.length > 0);
    }
  };
  return (
    <div className="min-h-screen bg-background py-12 px-4">
      <div className="container mx-auto max-w-4xl">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-primary border-3 border-black shadow-brutal mb-6">
            <Brain className="w-12 h-12 text-white" />
          </div>
          <h1 className="text-5xl md:text-7xl font-black mb-4 uppercase">
            Career Assessment
          </h1>
          <p className="text-2xl font-bold text-gray-700">
            Discover Your Perfect Career Match
          </p>
        </div>

        {/* Main Card */}
        <div className="bg-white border-3 border-black shadow-brutal-lg p-8 md:p-12 mb-8">
          {/* What to Expect */}
          <div className="mb-10">
            <h2 className="text-3xl font-black uppercase mb-6">What to Expect</h2>
            <p className="text-lg font-bold text-gray-700 mb-4">
              This 10-minute assessment will help you discover careers that match your interests, 
              skills, and goals. Answer honestly - there are no right or wrong answers!
            </p>
          </div>

          {/* Features Grid */}
          <div className="grid md:grid-cols-3 gap-6 mb-10">
            <div className="p-6 bg-background border-3 border-black">
              <div className="flex items-center gap-3 mb-3">
                <div className="p-2 bg-accent border-2 border-black">
                  <Target className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-black uppercase">15 Questions</h3>
              </div>
              <p className="text-sm font-bold text-gray-700">
                Quick and focused questions about your interests and strengths
              </p>
            </div>

            <div className="p-6 bg-background border-3 border-black">
              <div className="flex items-center gap-3 mb-3">
                <div className="p-2 bg-secondary border-2 border-black">
                  <Clock className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-xl font-black uppercase">10 Minutes</h3>
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
            <button className="w-full px-8 py-6 bg-primary text-white font-black uppercase text-2xl border-3 border-black shadow-brutal hover:shadow-brutal-lg hover:translate-x-[-4px] hover:translate-y-[-4px] transition-all flex items-center justify-center gap-4">
              {previousResults.length > 0 ? 'Retake Assessment' : 'Start Assessment'}
              <ArrowRight className="w-8 h-8" />
            </button>
          </Link>
        </div>

        {/* Previous Results Section - Always show with empty state */}
        <div className="mb-8">
          <div className="bg-white border-3 border-black shadow-brutal-lg p-8">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <History className="w-8 h-8" />
                <h2 className="text-3xl font-black uppercase">Previous Results</h2>
              </div>
              {previousResults.length > 0 && (
                <span className="px-3 py-1 bg-brutal-yellow text-black font-bold border-2 border-black">
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
                  {previousResults.map((result) => {
                  const topMatch = result.topMatches[0];
                  const topCareer = careers.find(c => c.id === topMatch?.careerId);
                  
                  return (
                    <div 
                      key={result.id}
                      className="border-2 border-black p-6 hover:shadow-brutal transition-all"
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
                          <h3 className="text-xl font-black mb-1">
                            Top Match: {topCareer?.title || 'Unknown Career'}
                          </h3>
                          <p className="text-sm text-gray-700 font-bold">
                            {topCareer?.shortDescription || 'No description available'}
                          </p>
                        </div>

                        <div className="flex gap-2">
                          <button
                            onClick={() => router.push(`/assessment/results?id=${result.id}`)}
                            className="px-4 py-2 bg-white border-2 border-black shadow-brutal-sm hover:shadow-brutal transition-all flex items-center gap-2 font-bold"
                          >
                            <Eye className="w-4 h-4" />
                            View Results
                          </button>
                          <button
                            onClick={() => handleDelete(result.id)}
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
            {!isLoadingHistory && previousResults.length === 0 && (
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
