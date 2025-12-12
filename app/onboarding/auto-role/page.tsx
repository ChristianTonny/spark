'use client';

import { Suspense, useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useUser } from '@clerk/nextjs';
import { useMutation, useQuery } from 'convex/react';
import { api } from '../../../convex/_generated/api';

/**
 * Automatic role setter - Sets user role based on sign-up page selection
 * This page is hit immediately after Clerk sign-up completes
 */
function AutoRoleContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { user, isLoaded } = useUser();
  const updateUserRole = useMutation(api.users.updateRole);
  const convexUser = useQuery(api.users.current);
  
  const [error, setError] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState(true);
  const [retryCount, setRetryCount] = useState(0);

  useEffect(() => {
    const setRoleAndRedirect = async () => {
      // Wait for Clerk to load
      if (!isLoaded) return;
      
      if (!user) {
        setError('No user found. Please try signing in again.');
        setIsProcessing(false);
        return;
      }

      // Wait for user to be synced to Convex (with retry logic)
      if (convexUser === undefined) {
        // Still loading, wait
        return;
      }

      if (convexUser === null && retryCount < 10) {
        // User not yet synced, retry after a short delay
        setTimeout(() => setRetryCount(retryCount + 1), 500);
        return;
      }

      if (convexUser === null) {
        setError('Failed to sync your account. Please refresh the page or sign in again.');
        setIsProcessing(false);
        return;
      }

      // Get the role from query params
      const role = searchParams.get('role') as 'student' | 'educator' | 'mentor' | null;
      const returnTo = searchParams.get("returnTo") || "";
      const safeReturnTo =
        returnTo.startsWith("/") && !returnTo.startsWith("//") ? returnTo : "";
      
      if (!role || !['student', 'educator', 'mentor'].includes(role)) {
        // Default to student dashboard if no valid role
        router.push('/dashboard/student');
        return;
      }

      try {
        // Guardrails:
        // - Student can be set immediately.
        // - Mentor/Educator cannot be self-selected to access dashboards.
        //   Mentors must complete onboarding first; educators require admin assignment.
        if (role === "student" && convexUser.role !== role) {
          await updateUserRole({ role });
        }

        // Redirect to returnTo if provided (internal only). Otherwise use role default.
        if (safeReturnTo) {
          router.push(safeReturnTo);
          return;
        }

        switch (role) {
          case 'student':
            router.push('/dashboard/student');
            break;
          case 'educator':
            setError("Educator access is by invitation. Please sign up as a student or contact an admin.");
            setIsProcessing(false);
            break;
          case 'mentor':
            router.push('/onboarding/mentor'); // Mentors need additional setup
            break;
          default:
            router.push('/dashboard/student');
        }
      } catch (err) {
        console.error('Failed to set role:', err);
        setError(err instanceof Error ? err.message : 'Failed to set up your account. Please try again.');
        setIsProcessing(false);
      }
    };

    setRoleAndRedirect();
  }, [isLoaded, user, convexUser, searchParams, updateUserRole, router, retryCount]);

  // Show error state
  if (error) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center px-4">
        <div className="text-center max-w-md">
          <div className="bg-red-100 border-3 border-red-500 p-6 mb-6">
            <p className="text-red-800 font-bold text-lg mb-2">Setup Error</p>
            <p className="text-red-700">{error}</p>
          </div>
          <button
            onClick={() => router.push('/sign-in')}
            className="px-6 py-3 bg-brutal-orange text-white font-bold uppercase border-3 border-black shadow-brutal hover:shadow-brutal-lg hover:translate-x-[-2px] hover:translate-y-[-2px] transition-all"
          >
            Go to Sign In
          </button>
        </div>
      </div>
    );
  }

  // Show loading state
  return (
    <div className="min-h-screen bg-background flex items-center justify-center">
      <div className="text-center">
        <div className="w-16 h-16 border-4 border-black border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
        <p className="text-xl font-bold">Setting up your account...</p>
        <p className="text-gray-600 mt-2">Please wait a moment</p>
      </div>
    </div>
  );
}

export default function AutoRolePage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-background flex items-center justify-center">
          <div className="text-center">
            <div className="w-16 h-16 border-4 border-black border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
            <p className="text-xl font-bold">Loading...</p>
          </div>
        </div>
      }
    >
      <AutoRoleContent />
    </Suspense>
  );
}
