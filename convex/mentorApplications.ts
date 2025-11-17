import { mutation, query } from "./_generated/server";
import { v } from "convex/values";

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
    // Check if email already applied
    const existing = await ctx.db
      .query("mentorApplications")
      .withIndex("by_email", (q) => q.eq("email", args.email))
      .first();

    if (existing) {
      throw new Error("An application with this email already exists. Please contact support if you need to update your application.");
    }

    const applicationId = await ctx.db.insert("mentorApplications", {
      ...args,
      status: "pending",
      submittedAt: Date.now(),
    });

    return { applicationId };
  },
});

// Check application status (by email, no auth required)
export const checkStatus = query({
  args: {
    email: v.string(),
  },
  handler: async (ctx, args) => {
    const application = await ctx.db
      .query("mentorApplications")
      .withIndex("by_email", (q) => q.eq("email", args.email))
      .first();

    if (!application) {
      return null;
    }

    return {
      status: application.status,
      submittedAt: application.submittedAt,
      reviewedAt: application.reviewedAt,
    };
  },
});

// Get all mentor applications (admin only - we'll add auth later)
export const list = query({
  args: {},
  handler: async (ctx) => {
    return await ctx.db
      .query("mentorApplications")
      .order("desc")
      .collect();
  },
});

// Get applications by status
export const listByStatus = query({
  args: { status: v.union(v.literal("pending"), v.literal("approved"), v.literal("rejected")) },
  handler: async (ctx, args) => {
    return await ctx.db
      .query("mentorApplications")
      .filter((q) => q.eq(q.field("status"), args.status))
      .order("desc")
      .collect();
  },
});

// Get single application by ID
export const getById = query({
  args: { id: v.id("mentorApplications") },
  handler: async (ctx, args) => {
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
    await ctx.db.patch(args.id, {
      status: "rejected",
      reviewedAt: Date.now(),
      reviewNotes: args.reviewNotes,
    });

    return { success: true };
  },
});

// Delete application
export const deleteApplication = mutation({
  args: { id: v.id("mentorApplications") },
  handler: async (ctx, args) => {
    await ctx.db.delete(args.id);
    return { success: true };
  },
});
