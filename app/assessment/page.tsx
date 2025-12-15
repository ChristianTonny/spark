'use client';

import Link from 'next/link';
import { ArrowRight, Sparkles } from 'lucide-react';

export default function AssessmentIntroPage() {
  return (
    <div className="min-h-screen bg-white flex flex-col items-center justify-center px-4 py-12 relative overflow-hidden">
      {/* Subtle background decoration */}
      <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-blue-600 via-purple-600 to-orange-500 opacity-80" />
      
      <div className="container mx-auto max-w-2xl text-center z-10">
        <div className="mb-8 inline-flex items-center justify-center p-3 bg-gray-50 rounded-full">
          <Sparkles className="w-6 h-6 text-orange-500" />
        </div>
        
        <h1 className="text-4xl md:text-6xl font-bold tracking-tight text-gray-900 mb-6">
          Find your path.
        </h1>
        
        <p className="text-xl md:text-2xl text-gray-600 mb-12 leading-relaxed font-medium">
          25 questions. 10 minutes. <br/>
          Discover careers that fit who you are.
        </p>

        <div className="bg-white rounded-2xl border border-gray-200 shadow-xl shadow-gray-200/50 p-8 md:p-10 mb-12 text-left transform transition-all hover:scale-[1.01] duration-300">
          <div className="space-y-4 text-base md:text-lg text-gray-700">
            <p className="flex items-start gap-3">
              <span className="text-green-500 font-bold mt-1">✓</span>
              <span>Answer honestly. There are no wrong answers.</span>
            </p>
            <p className="flex items-start gap-3">
              <span className="text-green-500 font-bold mt-1">✓</span>
              <span>Results based on your unique interests & style.</span>
            </p>
            <p className="flex items-start gap-3">
              <span className="text-green-500 font-bold mt-1">✓</span>
              <span>Save your results by signing in at the end.</span>
            </p>
          </div>
        </div>

        <Link href="/assessment/questions">
          <button className="group relative inline-flex items-center justify-center px-10 py-5 text-lg md:text-xl font-bold text-white transition-all duration-200 bg-gray-900 rounded-full hover:bg-black focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-900 shadow-lg hover:shadow-xl hover:-translate-y-1">
            Start Assessment
            <ArrowRight className="w-5 h-5 ml-2 transition-transform duration-200 group-hover:translate-x-1" />
          </button>
        </Link>
        
        <p className="mt-8 text-sm text-gray-500 font-medium">
          Trusted by students across Rwanda
        </p>
      </div>
    </div>
  );
}
