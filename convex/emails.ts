import { internalAction } from "./_generated/server";
import { v } from "convex/values";

/**
 * Internal action to send emails via Next.js API route
 * This is called from mutations after database operations complete
 */
export const sendEmail = internalAction({
  args: {
    type: v.union(
      v.literal("booking_confirmation"),
      v.literal("booking_reminder"),
      v.literal("mentor_application")
    ),
    data: v.any(),
  },
  handler: async (ctx, args) => {
    const apiUrl = process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000";
    const webhookSecret = process.env.CONVEX_WEBHOOK_SECRET;

    // In production, require webhook secret to be present so the API route can validate requests
    if (process.env.NODE_ENV === "production" && !webhookSecret) {
      const error = "CONVEX_WEBHOOK_SECRET is not set (required in production)";
      console.error(error);
      return { success: false, error };
    }

    try {
      const response = await fetch(`${apiUrl}/api/emails/send`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          ...(webhookSecret && { Authorization: `Bearer ${webhookSecret}` }),
        },
        body: JSON.stringify({
          type: args.type,
          data: args.data,
        }),
      });

      if (!response.ok) {
        const error = await response.text();
        console.error("Failed to send email:", error);
        return { success: false, error };
      }

      const result = await response.json();
      return { success: true, messageId: result.messageId };
    } catch (error) {
      console.error("Error sending email:", error);
      return { success: false, error: String(error) };
    }
  },
});
