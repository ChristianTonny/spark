'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

/**
 * Legacy /signup route - redirects to new Clerk sign-up page
 */
export default function SignupRedirect() {
  const router = useRouter();

  useEffect(() => {
    router.replace('/sign-up');
  }, [router]);

  return (
    <div className="min-h-screen bg-background flex items-center justify-center">
      <p className="text-xl font-bold">Redirecting to sign up...</p>
    </div>
  );
}
