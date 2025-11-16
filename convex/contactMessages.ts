import { mutation, query } from "./_generated/server";
import { v } from "convex/values";
import { getCurrentUserOrThrow } from "./users";

// Submit a contact form message
export const submit = mutation({
  args: {
    name: v.string(),
    email: v.string(),
    subject: v.string(),
    message: v.string(),
  },
  handler: async (ctx, args) => {
    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(args.email)) {
      throw new Error("Invalid email format");
    }

    // Validate message length
    if (args.message.trim().length < 10) {
      throw new Error("Message must be at least 10 characters long");
    }

    // Insert contact message
    const messageId = await ctx.db.insert("contactMessages", {
      name: args.name.trim(),
      email: args.email.toLowerCase().trim(),
      subject: args.subject.trim(),
      message: args.message.trim(),
      status: "new",
      submittedAt: Date.now(),
    });

    return { messageId, success: true };
  },
});

// Get all contact messages (admin only)
export const list = query({
  args: {},
  handler: async (ctx) => {
    const currentUser = await getCurrentUserOrThrow(ctx);

    // Only admins can view contact messages
    if (currentUser.role !== "admin") {
      throw new Error("Unauthorized: Only admins can view contact messages");
    }

    return await ctx.db
      .query("contactMessages")
      .order("desc")
      .collect();
  },
});

// Mark message as read (admin only)
export const markAsRead = mutation({
  args: { id: v.id("contactMessages") },
  handler: async (ctx, args) => {
    const currentUser = await getCurrentUserOrThrow(ctx);

    if (currentUser.role !== "admin") {
      throw new Error("Unauthorized: Only admins can update contact messages");
    }

    await ctx.db.patch(args.id, {
      status: "read",
    });

    return { success: true };
  },
});
