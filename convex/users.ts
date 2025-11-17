import { v } from "convex/values";
import { mutation, query, QueryCtx } from "./_generated/server";

/**
 * Get the current authenticated user from Clerk
 */
export async function getCurrentUser(ctx: QueryCtx) {
  const identity = await ctx.auth.getUserIdentity();
  if (!identity) {
    return null;
  }

  // Check if user exists in our database
  const user = await ctx.db
    .query("users")
    .withIndex("by_token", (q) => q.eq("tokenIdentifier", identity.tokenIdentifier))
    .first();

  return user;
}

/**
 * Get the current user's ID (throws if not authenticated)
 */
export async function getCurrentUserOrThrow(ctx: QueryCtx) {
  const user = await getCurrentUser(ctx);
  if (!user) {
    throw new Error("User not authenticated");
  }
  return user;
}

/**
 * Get current user (query)
 */
export const current = query({
  args: {},
  handler: async (ctx) => {
    return await getCurrentUser(ctx);
  },
});

/**
 * Debug auth - check what Clerk is sending
 */
export const debugAuth = query({
  args: {},
  handler: async (ctx) => {
    const identity = await ctx.auth.getUserIdentity();
    return {
      hasIdentity: !!identity,
      identity: identity ? {
        tokenIdentifier: identity.tokenIdentifier,
        subject: identity.subject,
        issuer: identity.issuer,
      } : null,
    };
  },
});

/**
 * Store or update user from Clerk authentication
 * This gets called automatically when a user signs in
 */
export const store = mutation({
  args: {
    clerkId: v.string(),
    email: v.string(),
    firstName: v.string(),
    lastName: v.string(),
    avatar: v.optional(v.string()),
    phone: v.optional(v.string()),
    role: v.optional(v.union(
      v.literal("student"),
      v.literal("mentor"),
      v.literal("educator"),
      v.literal("company"),
      v.literal("partner"),
      v.literal("admin")
    )),
  },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) {
      throw new Error("Unauthenticated");
    }

    // Check if user already exists by tokenIdentifier
    let existingUser = await ctx.db
      .query("users")
      .withIndex("by_token", (q) => q.eq("tokenIdentifier", identity.tokenIdentifier))
      .first();

    // If not found by token, check by email (for users created manually like admins)
    if (!existingUser) {
      existingUser = await ctx.db
        .query("users")
        .withIndex("by_email", (q) => q.eq("email", args.email))
        .first();
    }

    if (existingUser) {
      // Update existing user, preserving their role (important for admins!)
      await ctx.db.patch(existingUser._id, {
        tokenIdentifier: identity.tokenIdentifier, // Link Clerk to existing user
        clerkId: args.clerkId,
        email: args.email,
        firstName: args.firstName,
        lastName: args.lastName,
        avatar: args.avatar,
        phone: args.phone,
        // IMPORTANT: Don't overwrite role if not provided (preserves admin role)
        ...(args.role && { role: args.role }),
      });
      return existingUser._id;
    } else {
      // Create new user with default role as student
      const userId = await ctx.db.insert("users", {
        tokenIdentifier: identity.tokenIdentifier,
        clerkId: args.clerkId,
        email: args.email,
        firstName: args.firstName,
        lastName: args.lastName,
        avatar: args.avatar,
        phone: args.phone,
        role: args.role || "student", // Default to student role
        createdAt: Date.now(),
      });

      // If student, create student profile
      if (!args.role || args.role === "student") {
        await ctx.db.insert("studentProfiles", {
          userId: userId,
          gradeLevel: "Not specified",
          careersExplored: 0,
          chatsCompleted: 0,
          chatsUpcoming: 0,
          assessmentsTaken: 0,
        });
      }

      return userId;
    }
  },
});

/**
 * Update user role
 */
export const updateRole = mutation({
  args: {
    role: v.union(
      v.literal("student"),
      v.literal("mentor"),
      v.literal("educator"),
      v.literal("company"),
      v.literal("partner"),
      v.literal("admin")
    ),
  },
  handler: async (ctx, args) => {
    const user = await getCurrentUserOrThrow(ctx);

    await ctx.db.patch(user._id, {
      role: args.role,
    });

    // If changing to student and no profile exists, create one
    if (args.role === "student") {
      const existingProfile = await ctx.db
        .query("studentProfiles")
        .withIndex("by_user", (q) => q.eq("userId", user._id))
        .first();

      if (!existingProfile) {
        await ctx.db.insert("studentProfiles", {
          userId: user._id,
          gradeLevel: "Not specified",
          careersExplored: 0,
          chatsCompleted: 0,
          chatsUpcoming: 0,
          assessmentsTaken: 0,
        });
      }
    }

    return user._id;
  },
});

/**
 * Get user by ID
 */
export const getById = query({
  args: { userId: v.id("users") },
  handler: async (ctx, args) => {
    return await ctx.db.get(args.userId);
  },
});
