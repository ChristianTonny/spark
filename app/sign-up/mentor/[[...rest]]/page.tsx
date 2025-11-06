'use client';

import { SignUp } from "@clerk/nextjs";
import { useEffect } from "react";

/**
 * Mentor signup page (catch-all route for Clerk)
 * Stores role in localStorage and redirects to mentor onboarding after signup
 */
export default function MentorSignUpPage() {
  useEffect(() => {
    // Store role in localStorage so UserSyncProvider can read it
    if (typeof window !== 'undefined') {
      localStorage.setItem('signup_role', 'mentor');
    }
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <SignUp
          routing="path"
          path="/sign-up/mentor"
          signInUrl="/sign-in"
          afterSignUpUrl="/onboarding/mentor"
          redirectUrl="/onboarding/mentor"
        />
      </div>
    </div>
  );
}
