'use client';

import { Suspense, useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useQuery } from 'convex/react';
import { api } from '../../convex/_generated/api';
import { useConvexAuth } from '@/lib/hooks/useConvexAuth';

/**
 * Smart redirect page - redirects users based on their role
 * Used after sign-in to route users to appropriate dashboard
 */
function AuthRedirectInner() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { user, isLoading } = useConvexAuth();
  const isAdmin = useQuery(api.admin.isAdmin);
  const [retryCount, setRetryCount] = useState(0);

  useEffect(() => {
    // Wait for user to load
    if (isLoading) return;

    // If user hasn't loaded yet and we haven't retried too much, wait a bit
    if (!user && retryCount < 5) {
      const timer = setTimeout(() => setRetryCount(retryCount + 1), 500);
      return () => clearTimeout(timer);
    }

    // If still no user after retries, redirect to sign-in
    if (!user) {
      router.push('/sign-in');
      return;
    }

    // If caller provided a returnTo, honor it (internal paths only)
    const returnTo = searchParams.get("returnTo") || "";
    if (returnTo.startsWith("/") && !returnTo.startsWith("//")) {
      router.push(returnTo);
      return;
    }

    // Wait for admin check to load
    if (isAdmin === undefined) return;

    // Admin users always go to admin dashboard
    if (isAdmin === true) {
      router.push('/admin');
      return;
    }

    // Redirect based on user role
    switch (user.role) {
      case 'admin':
        router.push('/admin');
        break;
      case 'student':
        router.push('/dashboard/student');
        break;
      case 'mentor':
        router.push('/dashboard/mentor');
        break;
      case 'educator':
        router.push('/dashboard/educator');
        break;
      default:
        // If no role is set or unrecognized role, redirect to role selection
        router.push('/sign-up');
    }
  }, [user, isAdmin, isLoading, router, retryCount, searchParams]);

  // Show loading state
  return (
    <div className="min-h-screen bg-background flex items-center justify-center">
      <div className="text-center">
        <div className="w-16 h-16 border-4 border-black border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
        <p className="text-xl font-bold">Redirecting...</p>
        <p className="text-gray-600 mt-2">Taking you to your dashboard</p>
      </div>
    </div>
  );
}

export default function AuthRedirectPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-background flex items-center justify-center">
          <div className="text-center">
            <div className="w-16 h-16 border-4 border-black border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
            <p className="text-xl font-bold">Redirecting...</p>
            <p className="text-gray-600 mt-2">Preparing your session</p>
          </div>
        </div>
      }
    >
      <AuthRedirectInner />
    </Suspense>
  );
}

