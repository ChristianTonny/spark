'use client';

import Link from 'next/link';
import { GraduationCap, Users } from 'lucide-react';

/**
 * Role selection page - users choose if they're a Student or Mentor
 * This is the first step in the signup flow
 */
export default function SignUpRoleSelection() {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="w-full max-w-4xl">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-3">
            Join Opportunity<span className="text-orange-500">Map</span>
          </h1>
          <p className="text-lg md:text-xl text-gray-600">
            Choose how you want to get started
          </p>
        </div>

        {/* Role Cards */}
        <div className="grid md:grid-cols-2 gap-6 mb-8">
          {/* Student Card */}
          <Link
            href="/sign-up/student"
            className="group block"
          >
            <div className="bg-white rounded-lg border border-gray-200 hover:border-blue-500 hover:shadow-lg transition-all p-8 h-full">
              <div className="flex flex-col items-center text-center space-y-6">
                <div className="w-20 h-20 bg-blue-500 text-white rounded-full flex items-center justify-center">
                  <GraduationCap className="w-10 h-10" />
                </div>

                <div>
                  <h2 className="text-2xl font-bold mb-2 group-hover:text-blue-500 transition-colors">
                    I'm a Student
                  </h2>
                  <p className="text-gray-600 mb-6">
                    Explore careers, take assessments, and connect with mentors to discover your future path
                  </p>
                </div>

                <div className="space-y-2 text-left w-full">
                  <div className="flex items-start gap-2">
                    <span className="text-blue-500 font-bold">✓</span>
                    <span className="text-gray-700">Browse 100+ career paths</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="text-blue-500 font-bold">✓</span>
                    <span className="text-gray-700">Take career assessments</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="text-blue-500 font-bold">✓</span>
                    <span className="text-gray-700">Connect with mentors</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="text-blue-500 font-bold">✓</span>
                    <span className="text-gray-700">Track your progress</span>
                  </div>
                </div>

                <div className="pt-4">
                  <span className="px-6 py-3 bg-blue-500 text-white font-semibold rounded-lg inline-block group-hover:bg-blue-600 transition-colors">
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
            <div className="bg-white rounded-lg border border-gray-200 hover:border-orange-500 hover:shadow-lg transition-all p-8 h-full">
              <div className="flex flex-col items-center text-center space-y-6">
                <div className="w-20 h-20 bg-orange-500 text-white rounded-full flex items-center justify-center">
                  <Users className="w-10 h-10" />
                </div>

                <div>
                  <h2 className="text-2xl font-bold mb-2 group-hover:text-orange-500 transition-colors">
                    I'm a Mentor
                  </h2>
                  <p className="text-gray-600 mb-6">
                    Share your expertise, guide students, and make a difference in Rwanda's next generation
                  </p>
                </div>

                <div className="space-y-2 text-left w-full">
                  <div className="flex items-start gap-2">
                    <span className="text-orange-500 font-bold">✓</span>
                    <span className="text-gray-700">Share your career journey</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="text-orange-500 font-bold">✓</span>
                    <span className="text-gray-700">Guide Rwandan students</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="text-orange-500 font-bold">✓</span>
                    <span className="text-gray-700">Set your availability</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="text-orange-500 font-bold">✓</span>
                    <span className="text-gray-700">Earn as you mentor</span>
                  </div>
                </div>

                <div className="pt-4">
                  <span className="px-6 py-3 bg-orange-500 text-white font-semibold rounded-lg inline-block group-hover:bg-orange-600 transition-colors">
                    Sign Up as Mentor
                  </span>
                </div>
              </div>
            </div>
          </Link>
        </div>

        {/* Already have account */}
        <div className="text-center">
          <p className="text-gray-600">
            Already have an account?{' '}
            <Link href="/sign-in" className="font-semibold text-orange-500 hover:text-orange-600 hover:underline">
              Sign In
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
