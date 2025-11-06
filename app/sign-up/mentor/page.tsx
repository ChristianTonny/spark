'use client';

import { SignUp } from '@clerk/nextjs';

export default function MentorSignUpPage() {
  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-black uppercase mb-2">Mentor Sign Up</h1>
          <p className="text-lg font-bold text-gray-700">Create your account to mentor students</p>
        </div>

        <SignUp
          routing="hash"
          appearance={{
            elements: {
              rootBox: "w-full",
              card: "bg-white border-3 border-black shadow-brutal",
            },
          }}
          afterSignUpUrl="/onboarding/role-selection"
          signInUrl="/sign-in"
        />
      </div>
    </div>
  );
}
