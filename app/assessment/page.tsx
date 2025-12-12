'use client';

import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

export default function AssessmentIntroPage() {
  return (
    <div className="min-h-screen bg-background px-4 py-12">
      <div className="container mx-auto max-w-3xl">
        <div className="bg-white border-3 border-black shadow-brutal-lg p-8 md:p-12">
          <h1 className="text-4xl md:text-6xl font-black uppercase mb-4">
            Career Assessment
          </h1>
          <p className="text-lg md:text-xl font-bold text-gray-700 mb-8">
            25 quick questions → your top career matches.
          </p>

          <div className="space-y-3 text-sm md:text-base font-bold text-gray-800 mb-10">
            <p>• Answer honestly. No right or wrong answers.</p>
            <p>• Takes ~10–15 minutes.</p>
            <p>• If you’re not signed in, we’ll ask you to sign in at the end to save results.</p>
          </div>

          <Link href="/assessment/questions">
            <button className="w-full px-8 py-6 bg-primary text-white font-black uppercase text-xl md:text-2xl border-3 border-black shadow-brutal hover:shadow-brutal-lg hover:translate-x-[-4px] hover:translate-y-[-4px] transition-all flex items-center justify-center gap-4">
              Start
              <ArrowRight className="w-8 h-8" />
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}
