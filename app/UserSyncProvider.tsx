"use client";

import { useUser } from "@clerk/nextjs";
import { useMutation } from "convex/react";
import { api } from "../convex/_generated/api";
import { useEffect } from "react";

/**
 * Automatically syncs authenticated user from Clerk to Convex database
 */
export function UserSyncProvider({ children }: { children: React.ReactNode }) {
  const { user, isLoaded } = useUser();
  const storeUser = useMutation(api.users.store);

  useEffect(() => {
    // Wait for Clerk to load and user to be available
    if (!isLoaded || !user) return;

    // Store/update user in Convex
    const syncUser = async () => {
      try {
        // Check if there's a stored role from the signup flow
        const storedRole = typeof window !== 'undefined'
          ? localStorage.getItem('signup_role')
          : null;

        await storeUser({
          clerkId: user.id,
          email: user.primaryEmailAddress?.emailAddress ?? "",
          firstName: user.firstName ?? "",
          lastName: user.lastName ?? "",
          avatar: user.imageUrl,
          phone: user.primaryPhoneNumber?.phoneNumber,
          // Pass role if it was stored during signup
          ...(storedRole && {
            role: storedRole as "student" | "mentor" | "company" | "partner"
          }),
        });

        // Clear the stored role after successful sync
        if (storedRole && typeof window !== 'undefined') {
          localStorage.removeItem('signup_role');
        }
      } catch (error) {
        console.error("Failed to sync user:", error);
      }
    };

    syncUser();
  }, [user, isLoaded, storeUser]);

  return <>{children}</>;
}
