'use client';

import { SignUp } from "@clerk/nextjs";
import { useEffect } from "react";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

/**
 * Student signup page
 * Stores role in localStorage and redirects to student dashboard after signup
 */
export default function StudentSignUpPage() {
  useEffect(() => {
    // Store role in localStorage so UserSyncProvider can read it
    if (typeof window !== 'undefined') {
      localStorage.setItem('signup_role', 'student');
    }
  }, []);

  return (
    <div className="min-h-screen bg-brutal-bg flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Back button */}
        <Link
          href="/sign-up"
          className="inline-flex items-center gap-2 mb-6 text-gray-700 hover:text-brutal-blue font-bold transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
          Back to role selection
        </Link>

        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-5xl md:text-6xl font-black mb-2">
            Opportunity<span className="text-brutal-blue">Map</span>
          </h1>
          <p className="text-xl font-bold text-gray-700">
            Student Sign Up
          </p>
          <p className="text-sm text-gray-600 mt-2">
            Start exploring your future career path
          </p>
        </div>

        {/* Clerk SignUp Component */}
        <SignUp
          appearance={{
            elements: {
              rootBox: "mx-auto",
              card: "bg-white shadow-brutal border-3 border-brutal-border",
              headerTitle: "hidden",
              headerSubtitle: "hidden",
            }
          }}
          routing="path"
          path="/sign-up/student"
          signInUrl="/sign-in"
          afterSignUpUrl="/dashboard/student"
          redirectUrl="/dashboard/student"
        />
      </div>
    </div>
  );
}
