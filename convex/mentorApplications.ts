import { mutation, query } from "./_generated/server";
import { v } from "convex/values";
import { getCurrentUserOrThrow } from "./users";

// Submit a new mentor application
export const submit = mutation({
  args: {
    fullName: v.string(),
    email: v.string(),
    phone: v.string(),
    linkedin: v.optional(v.string()),
    currentRole: v.string(),
    company: v.string(),
    yearsExperience: v.string(),
    industry: v.string(),
    careerField: v.string(),
    availability: v.string(),
    motivation: v.string(),
    sessionsPerMonth: v.string(),
    focusAreas: v.array(v.string()),
  },
  handler: async (ctx, args) => {
    const applicationId = await ctx.db.insert("mentorApplications", {
      ...args,
      status: "pending",
      submittedAt: Date.now(),
    });

    return { applicationId };
  },
});

// Get all mentor applications (admin only)
export const list = query({
  args: {},
  handler: async (ctx) => {
    const currentUser = await getCurrentUserOrThrow(ctx);

    // Only admins can view all applications
    if (currentUser.role !== "admin") {
      throw new Error("Unauthorized: Only admins can view mentor applications");
    }

    return await ctx.db
      .query("mentorApplications")
      .order("desc")
      .collect();
  },
});

// Get applications by status (admin only)
export const listByStatus = query({
  args: { status: v.union(v.literal("pending"), v.literal("approved"), v.literal("rejected")) },
  handler: async (ctx, args) => {
    const currentUser = await getCurrentUserOrThrow(ctx);

    // Only admins can view applications
    if (currentUser.role !== "admin") {
      throw new Error("Unauthorized: Only admins can view mentor applications");
    }

    return await ctx.db
      .query("mentorApplications")
      .filter((q) => q.eq(q.field("status"), args.status))
      .order("desc")
      .collect();
  },
});

// Get single application by ID (admin only)
export const getById = query({
  args: { id: v.id("mentorApplications") },
  handler: async (ctx, args) => {
    const currentUser = await getCurrentUserOrThrow(ctx);

    // Only admins can view individual applications
    if (currentUser.role !== "admin") {
      throw new Error("Unauthorized: Only admins can view mentor applications");
    }

    return await ctx.db.get(args.id);
  },
});

// Approve application (admin only)
export const approve = mutation({
  args: {
    id: v.id("mentorApplications"),
    reviewNotes: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    const currentUser = await getCurrentUserOrThrow(ctx);

    // Only admins can approve applications
    if (currentUser.role !== "admin") {
      throw new Error("Unauthorized: Only admins can approve mentor applications");
    }

    await ctx.db.patch(args.id, {
      status: "approved",
      reviewedAt: Date.now(),
      reviewNotes: args.reviewNotes,
    });

    return { success: true };
  },
});

// Reject application (admin only)
export const reject = mutation({
  args: {
    id: v.id("mentorApplications"),
    reviewNotes: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    const currentUser = await getCurrentUserOrThrow(ctx);

    // Only admins can reject applications
    if (currentUser.role !== "admin") {
      throw new Error("Unauthorized: Only admins can reject mentor applications");
    }

    await ctx.db.patch(args.id, {
      status: "rejected",
      reviewedAt: Date.now(),
      reviewNotes: args.reviewNotes,
    });

    return { success: true };
  },
});

// Delete application (admin only)
export const deleteApplication = mutation({
  args: { id: v.id("mentorApplications") },
  handler: async (ctx, args) => {
    const currentUser = await getCurrentUserOrThrow(ctx);

    // Only admins can delete applications
    if (currentUser.role !== "admin") {
      throw new Error("Unauthorized: Only admins can delete mentor applications");
    }

    await ctx.db.delete(args.id);
    return { success: true };
  },
});
