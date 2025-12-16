'use client';

import { SignUp } from '@clerk/nextjs';
import { Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { AssessmentLoader } from '@/components/assessment-loader';

function StudentSignUpInner() {
  const searchParams = useSearchParams();
  const returnTo = searchParams.get("returnTo") || "";
  const safeReturnTo =
    returnTo.startsWith("/") && !returnTo.startsWith("//") ? returnTo : "";

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold mb-2">Student Sign Up</h1>
          <p className="text-lg text-gray-600">Create your account to explore careers</p>
        </div>

        <SignUp
          routing="hash"
          appearance={{
            elements: {
              rootBox: "w-full",
              card: "bg-white shadow-lg rounded-lg",
            },
          }}
          afterSignUpUrl={
            safeReturnTo
              ? `/onboarding/auto-role?role=student&returnTo=${encodeURIComponent(safeReturnTo)}`
              : "/onboarding/auto-role?role=student"
          }
          signInUrl={safeReturnTo ? `/sign-in?returnTo=${encodeURIComponent(safeReturnTo)}` : "/sign-in"}
        />
      </div>
    </div>
  );
}

export default function StudentSignUpPage() {
  return (
    <Suspense fallback={<AssessmentLoader fullscreen message="Loading..." />}>
      <StudentSignUpInner />
    </Suspense>
  );
}
