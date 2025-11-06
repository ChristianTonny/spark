"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useConvexAuth } from "@/lib/hooks/useConvexAuth";
import { useMutation } from "convex/react";
import { api } from "../../../convex/_generated/api";

export default function OnboardingRedirectPage() {
  const router = useRouter();
  const { user, isLoading } = useConvexAuth();
  const updateUserRole = useMutation(api.users.updateRole);

  useEffect(() => {
    const handleRoleUpdate = async () => {
      if (isLoading) return;

      if (!user) {
        // Wait a bit for user to sync
        setTimeout(() => {
          window.location.reload();
        }, 2000);
        return;
      }

      // Get role from sessionStorage
      const selectedRole = sessionStorage.getItem('selectedRole') as 'student' | 'mentor' | 'company' | 'partner' | null;

      if (!selectedRole) {
        // No role selected, default to student dashboard
        router.push('/dashboard/student');
        return;
      }

      // Update user role
      try {
        await updateUserRole({ role: selectedRole });

        // Clear sessionStorage
        sessionStorage.removeItem('selectedRole');

        // Redirect based on role
        switch (selectedRole) {
          case 'mentor':
            router.push('/onboarding/mentor');
            break;
          case 'student':
            router.push('/dashboard/student');
            break;
          case 'company':
          case 'partner':
            router.push('/dashboard/student'); // Placeholder
            break;
          default:
            router.push('/dashboard/student');
        }
      } catch (error) {
        console.error('Error updating role:', error);
        // Fallback to student dashboard
        router.push('/dashboard/student');
      }
    };

    handleRoleUpdate();
  }, [user, isLoading, updateUserRole, router]);

  return (
    <div className="min-h-screen bg-background flex items-center justify-center">
      <div className="text-center">
        <div className="w-16 h-16 border-4 border-black border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
        <p className="text-xl font-bold">Setting up your account...</p>
      </div>
    </div>
  );
}
