'use client';

import Link from 'next/link';
import { Brain, Sparkles, Target, Clock, ArrowRight } from 'lucide-react';

export default function AssessmentIntroPage() {
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
                  <Clock className="w-6 h-6 text-black" />
                </div>
                <h3 className="text-xl font-black uppercase text-black">10 Minutes</h3>
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
              Start Assessment
              <ArrowRight className="w-8 h-8" />
            </button>
          </Link>
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
          <Link href="/dashboard/student" className="text-lg font-bold text-gray-600 hover:text-black">
            ← Back to Dashboard
          </Link>
        </div>
      </div>
    </div>
  );
}
