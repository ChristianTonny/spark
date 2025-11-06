'use client';

import Link from 'next/link';
import { GraduationCap, Users } from 'lucide-react';

/**
 * Role selection page - users choose if they're a Student or Mentor
 * This is the first step in the signup flow
 */
export default function SignUpRoleSelection() {
  return (
    <div className="min-h-screen bg-brutal-bg flex items-center justify-center p-4">
      <div className="w-full max-w-5xl">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-5xl md:text-6xl font-black mb-4">
            Join Opportunity<span className="text-brutal-orange">Map</span>
          </h1>
          <p className="text-xl md:text-2xl font-bold text-gray-700">
            Choose how you want to get started
          </p>
        </div>

        {/* Role Cards */}
        <div className="grid md:grid-cols-2 gap-8 mb-8">
          {/* Student Card */}
          <Link
            href="/sign-up/student"
            className="group block"
          >
            <div className="bg-white border-3 border-brutal-border shadow-brutal hover:shadow-brutal-lg hover:translate-x-[-4px] hover:translate-y-[-4px] transition-all p-8 h-full">
              <div className="flex flex-col items-center text-center space-y-6">
                <div className="w-24 h-24 bg-brutal-blue text-white border-3 border-brutal-border shadow-brutal-sm flex items-center justify-center">
                  <GraduationCap className="w-12 h-12" />
                </div>

                <div>
                  <h2 className="text-3xl font-black mb-3 group-hover:text-brutal-blue transition-colors">
                    I'm a Student
                  </h2>
                  <p className="text-lg text-gray-700 mb-6">
                    Explore careers, take assessments, and connect with mentors to discover your future path
                  </p>
                </div>

                <div className="space-y-2 text-left w-full">
                  <div className="flex items-start gap-2">
                    <span className="text-brutal-blue font-bold">✓</span>
                    <span className="text-gray-700">Browse 100+ career paths</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="text-brutal-blue font-bold">✓</span>
                    <span className="text-gray-700">Take career assessments</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="text-brutal-blue font-bold">✓</span>
                    <span className="text-gray-700">Connect with mentors</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="text-brutal-blue font-bold">✓</span>
                    <span className="text-gray-700">Track your progress</span>
                  </div>
                </div>

                <div className="pt-4">
                  <span className="px-8 py-4 bg-brutal-blue text-white font-bold text-lg uppercase border-3 border-brutal-border shadow-brutal inline-block group-hover:shadow-brutal-lg transition-all">
                    Sign Up as Student
                  </span>
                </div>
              </div>
            </div>
          </Link>

          {/* Mentor Card */}
          <Link
            href="/sign-up/mentor"
            className="group block"
          >
            <div className="bg-white border-3 border-brutal-border shadow-brutal hover:shadow-brutal-lg hover:translate-x-[-4px] hover:translate-y-[-4px] transition-all p-8 h-full">
              <div className="flex flex-col items-center text-center space-y-6">
                <div className="w-24 h-24 bg-brutal-orange text-white border-3 border-brutal-border shadow-brutal-sm flex items-center justify-center">
                  <Users className="w-12 h-12" />
                </div>

                <div>
                  <h2 className="text-3xl font-black mb-3 group-hover:text-brutal-orange transition-colors">
                    I'm a Mentor
                  </h2>
                  <p className="text-lg text-gray-700 mb-6">
                    Share your expertise, guide students, and make a difference in Rwanda's next generation
                  </p>
                </div>

                <div className="space-y-2 text-left w-full">
                  <div className="flex items-start gap-2">
                    <span className="text-brutal-orange font-bold">✓</span>
                    <span className="text-gray-700">Share your career journey</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="text-brutal-orange font-bold">✓</span>
                    <span className="text-gray-700">Guide Rwandan students</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="text-brutal-orange font-bold">✓</span>
                    <span className="text-gray-700">Set your availability</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="text-brutal-orange font-bold">✓</span>
                    <span className="text-gray-700">Earn as you mentor</span>
                  </div>
                </div>

                <div className="pt-4">
                  <span className="px-8 py-4 bg-brutal-orange text-white font-bold text-lg uppercase border-3 border-brutal-border shadow-brutal inline-block group-hover:shadow-brutal-lg transition-all">
                    Sign Up as Mentor
                  </span>
                </div>
              </div>
            </div>
          </Link>
        </div>

        {/* Already have account */}
        <div className="text-center">
          <p className="text-lg text-gray-700">
            Already have an account?{' '}
            <Link href="/sign-in" className="font-bold text-brutal-orange hover:underline">
              Sign In
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
