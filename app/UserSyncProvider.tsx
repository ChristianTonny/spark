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
        // Get role from Clerk's public metadata (secure, set server-side or via role selection)
        const role = user.publicMetadata?.role as "student" | "mentor" | "educator" | "company" | "partner" | undefined;

        await storeUser({
          clerkId: user.id,
          email: user.primaryEmailAddress?.emailAddress ?? "",
          firstName: user.firstName ?? "",
          lastName: user.lastName ?? "",
          avatar: user.imageUrl,
          phone: user.primaryPhoneNumber?.phoneNumber,
          // Pass role from Clerk metadata if it exists
          ...(role && { role }),
        });
      } catch (error) {
        console.error("Failed to sync user:", error);
      }
    };

    syncUser();
  }, [user, isLoaded, storeUser]);

  return <>{children}</>;
}
