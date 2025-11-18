'use client';

import { SignUp } from '@clerk/nextjs';

export default function EducatorSignUpPage() {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold mb-2">Educator Sign Up</h1>
          <p className="text-lg text-gray-600">Create your account to guide students</p>
        </div>

        <SignUp
          routing="hash"
          appearance={{
            elements: {
              rootBox: "w-full",
              card: "bg-white shadow-lg rounded-lg",
            },
          }}
          afterSignUpUrl="/onboarding/auto-role?role=educator"
          signInUrl="/sign-in"
        />
      </div>
    </div>
  );
}
