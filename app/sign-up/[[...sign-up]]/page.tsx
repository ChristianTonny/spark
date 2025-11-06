"use client";

import { SignUp } from "@clerk/nextjs";
import { useSearchParams } from "next/navigation";
import { useEffect } from "react";

export default function SignUpPage() {
  const searchParams = useSearchParams();
  const role = searchParams.get('role') || 'student';

  // Store role in sessionStorage for after signup
  useEffect(() => {
    if (role) {
      sessionStorage.setItem('selectedRole', role);
    }
  }, [role]);

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-5xl md:text-6xl font-black mb-2">
            Opportunity<span className="text-primary">Map</span>
          </h1>
          <p className="text-xl font-bold text-gray-700">
            {role === 'mentor' ? 'Join as a Mentor!' :
             role === 'student' ? 'Start Your Journey!' :
             role === 'company' ? 'Partner with Us!' :
             'Join Our Community!'}
          </p>
        </div>

        <SignUp
          appearance={{
            elements: {
              rootBox: "mx-auto",
              card: "bg-white shadow-lg rounded-lg",
            }
          }}
          routing="path"
          path="/sign-up"
          signInUrl="/sign-in"
          redirectUrl="/onboarding/redirect"
        />

        {/* Back to role selection */}
        <div className="text-center mt-4">
          <a href="/get-started" className="text-sm font-bold text-gray-600 hover:text-black">
            ← Change role selection
          </a>
        </div>
      </div>
    </div>
  );
}
