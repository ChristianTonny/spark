import { useQuery } from "convex/react";
import { useUser } from "@clerk/nextjs";
import { api } from "../../convex/_generated/api";

/**
 * Hook that ensures both Clerk and Convex auth are ready
 * Handles the race condition where user is authenticated with Clerk
 * but hasn't been synced to Convex database yet
 */
export function useConvexAuth() {
  const { user: clerkUser, isLoaded: clerkLoaded } = useUser();
  const convexUser = useQuery(api.users.current);

  // We're loading if:
  // 1. Clerk hasn't loaded yet, OR
  // 2. User is logged into Clerk but Convex user query hasn't returned yet (undefined means loading)
  const isLoading = !clerkLoaded || (clerkUser && convexUser === undefined);

  // User is authenticated if they exist in Convex database
  const isAuthenticated = !!convexUser;

  return {
    user: convexUser,
    clerkUser,
    isLoading,
    isAuthenticated,
  };
}
