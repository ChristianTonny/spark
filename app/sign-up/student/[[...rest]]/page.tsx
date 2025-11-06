'use client';

import { SignUp } from "@clerk/nextjs";
import { useEffect } from "react";

/**
 * Student signup page (catch-all route for Clerk)
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
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <SignUp
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
