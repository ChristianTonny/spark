import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useConvexAuth } from './useConvexAuth';

type UserRole = 'student' | 'mentor' | 'educator' | 'company' | 'partner';

/**
 * Hook to protect pages based on user role
 * Redirects unauthorized users to their appropriate dashboard
 */
export function useRoleGuard(allowedRoles: UserRole[]) {
  const router = useRouter();
  const { user, isLoading } = useConvexAuth();

  useEffect(() => {
    if (isLoading) return;

    if (!user) {
      // Not authenticated - redirect to login
      router.push('/sign-in');
      return;
    }

    const userRole = user.role as UserRole;

    // Check if user's role is in the allowed list
    if (!allowedRoles.includes(userRole)) {
      // Redirect to user's appropriate dashboard
      switch (userRole) {
        case 'student':
          router.push('/dashboard/student');
          break;
        case 'mentor':
          router.push('/dashboard/mentor');
          break;
        case 'educator':
          router.push('/dashboard/educator');
          break;
        case 'company':
          router.push('/dashboard/company');
          break;
        case 'partner':
          router.push('/dashboard/partner');
          break;
        default:
          router.push('/');
      }
    }
  }, [user, isLoading, allowedRoles, router]);

  return { user, isLoading, isAuthorized: user && allowedRoles.includes(user.role as UserRole) };
}

/**
 * Get the dashboard path for a given role
 */
export function getDashboardPath(role: UserRole): string {
  switch (role) {
    case 'student':
      return '/dashboard/student';
    case 'mentor':
      return '/dashboard/mentor';
    case 'educator':
      return '/dashboard/educator';
    case 'company':
      return '/dashboard/company';
    case 'partner':
      return '/dashboard/partner';
    default:
      return '/';
  }
}
