import { v } from "convex/values";
import { mutation } from "./_generated/server";

/**
 * Utility mutation to assign educator role to a user
 * This is used by the setup-educator admin page
 */
export const makeUserEducator = mutation({
  args: {
    email: v.string(),
  },
  handler: async (ctx, args) => {
    const user = await ctx.db
      .query("users")
      .withIndex("by_email", (q) => q.eq("email", args.email))
      .first();

    if (!user) {
      return {
        success: false,
        message: `User with email ${args.email} not found. Please make sure they have signed up first.`,
      };
    }

    if (user.role === "educator") {
      return {
        success: false,
        message: `User ${args.email} is already an educator.`,
      };
    }

    // Update the user role to educator
    await ctx.db.patch(user._id, {
      role: "educator",
    });

    return {
      success: true,
      message: `Successfully assigned educator role to ${args.email}`,
    };
  },
});

