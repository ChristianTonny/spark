'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

/**
 * Legacy /login route - redirects to new Clerk sign-in page
 */
export default function LoginRedirect() {
  const router = useRouter();

  useEffect(() => {
    router.replace('/sign-in');
  }, [router]);

  return (
    <div className="min-h-screen bg-background flex items-center justify-center">
      <p className="text-xl font-bold">Redirecting to sign in...</p>
    </div>
  );
}
