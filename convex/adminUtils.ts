import { mutation, query } from "./_generated/server";
import { v } from "convex/values";

/**
 * Admin utility to check user role by email
 */
export const getUserByEmail = query({
  args: { email: v.string() },
  handler: async (ctx, args) => {
    const user = await ctx.db
      .query("users")
      .withIndex("by_email", (q) => q.eq("email", args.email))
      .first();

    if (!user) {
      return { error: "User not found" };
    }

    // Get professional profile if mentor
    let professionalProfile = null;
    if (user.role === "mentor") {
      professionalProfile = await ctx.db
        .query("professionals")
        .withIndex("by_user", (q) => q.eq("userId", user._id))
        .first();
    }

    return {
      user,
      professionalProfile,
    };
  },
});

/**
 * Admin utility to fix user role
 */
export const fixUserRole = mutation({
  args: {
    email: v.string(),
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
    const user = await ctx.db
      .query("users")
      .withIndex("by_email", (q) => q.eq("email", args.email))
      .first();

    if (!user) {
      throw new Error("User not found");
    }

    await ctx.db.patch(user._id, {
      role: args.role,
    });

    return { success: true, userId: user._id, newRole: args.role };
  },
});

