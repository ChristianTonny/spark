'use client';

import { SignUp } from '@clerk/nextjs';
import { useRouter } from 'next/navigation';

export default function StudentSignUpPage() {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-black uppercase mb-2">Student Sign Up</h1>
          <p className="text-lg font-bold text-gray-700">Create your account to explore careers</p>
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
