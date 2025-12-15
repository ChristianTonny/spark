'use client';

import Link from 'next/link';
import { ArrowRight, ArrowLeft } from 'lucide-react';

export default function AssessmentIntroPage() {
  return (
    <div className="min-h-screen bg-[#FAFAF9] px-4 py-16 md:py-24">
      <div className="container mx-auto max-w-2xl">
        {/* Back navigation */}
        <Link 
          href="/careers" 
          className="inline-flex items-center gap-2 text-sm font-medium text-gray-500 hover:text-gray-900 transition-colors mb-12"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Careers
        </Link>

        {/* Main content */}
        <div className="space-y-8">
          <div className="space-y-4">
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-gray-900">
              Career Assessment
            </h1>
            <p className="text-xl text-gray-600 leading-relaxed">
              25 questions. 10 minutes. Discover careers that fit you.
            </p>
          </div>

          {/* What to expect */}
          <div className="py-8 border-t border-gray-200">
            <h2 className="text-sm font-semibold uppercase tracking-wider text-gray-500 mb-4">
              What to expect
            </h2>
            <ul className="space-y-3 text-gray-700">
              <li className="flex items-start gap-3">
                <span className="w-1.5 h-1.5 bg-gray-400 rounded-full mt-2.5 flex-shrink-0" />
                <span>Answer honestly — there are no right or wrong answers</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="w-1.5 h-1.5 bg-gray-400 rounded-full mt-2.5 flex-shrink-0" />
                <span>Takes about 10–15 minutes</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="w-1.5 h-1.5 bg-gray-400 rounded-full mt-2.5 flex-shrink-0" />
                <span>Sign in at the end to save your results</span>
              </li>
            </ul>
          </div>

          {/* CTA */}
          <div className="pt-4">
            <Link href="/assessment/questions">
              <button className="w-full sm:w-auto px-8 py-4 bg-gray-900 text-white font-semibold text-lg rounded-lg hover:bg-gray-800 transition-colors flex items-center justify-center gap-3 shadow-sm">
                Start Assessment
                <ArrowRight className="w-5 h-5" />
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
