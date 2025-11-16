import { v } from "convex/values";
import { mutation, query } from "./_generated/server";

// Helper to get current user
async function getCurrentUserId(ctx: any) {
  const identity = await ctx.auth.getUserIdentity();
  if (!identity) {
    return null;
  }

  const user = await ctx.db
    .query("users")
    .withIndex("by_token", (q) => q.eq("tokenIdentifier", identity.tokenIdentifier))
    .first();

  return user?._id;
}

// Set or update availability slots for a mentor
export const setAvailability = mutation({
  args: {
    slots: v.array(
      v.object({
        dayOfWeek: v.number(),
        startTime: v.string(),
        endTime: v.string(),
        maxBookings: v.optional(v.number()),
      })
    ),
  },
  handler: async (ctx, args) => {
    const userId = await getCurrentUserId(ctx);
    if (!userId) {
      throw new Error("Not authenticated");
    }

    // Verify user is a mentor
    const user = await ctx.db.get(userId);
    if (!user || user.role !== "mentor") {
      throw new Error("Only mentors can set availability");
    }

    // Delete existing slots for this mentor
    const existingSlots = await ctx.db
      .query("availabilitySlots")
      .withIndex("by_professional", (q) => q.eq("professionalId", userId))
      .collect();

    for (const slot of existingSlots) {
      await ctx.db.delete(slot._id);
    }

    // Create new slots
    const now = Date.now();
    for (const slot of args.slots) {
      await ctx.db.insert("availabilitySlots", {
        professionalId: userId,
        dayOfWeek: slot.dayOfWeek,
        startTime: slot.startTime,
        endTime: slot.endTime,
        maxBookings: slot.maxBookings || 1,
        isActive: true,
        effectiveFrom: now,
      });
    }

    return { success: true };
  },
});

// Get availability for a specific mentor
export const getAvailability = query({
  args: {
    professionalId: v.optional(v.id("users")),
  },
  handler: async (ctx, args) => {
    let professionalId = args.professionalId;

    // If no professionalId provided, use current user
    if (!professionalId) {
      const userId = await getCurrentUserId(ctx);
      if (!userId) {
        throw new Error("Not authenticated");
      }
      professionalId = userId;
    }

    const slots = await ctx.db
      .query("availabilitySlots")
      .withIndex("by_professional", (q) => q.eq("professionalId", professionalId))
      .filter((q) => q.eq(q.field("isActive"), true))
      .collect();

    return slots;
  },
});

// Get available time slots for booking (student view)
export const getAvailableSlots = query({
  args: {
    professionalId: v.id("users"),
    startDate: v.number(), // Unix timestamp
    endDate: v.number(),   // Unix timestamp
  },
  handler: async (ctx, args) => {
    const { professionalId, startDate, endDate } = args;

    // Get mentor's availability template
    const availabilitySlots = await ctx.db
      .query("availabilitySlots")
      .withIndex("by_professional", (q) => q.eq("professionalId", professionalId))
      .filter((q) => q.eq(q.field("isActive"), true))
      .collect();

    if (availabilitySlots.length === 0) {
      return [];
    }

    // Get existing bookings for this mentor in the date range
    const existingBookings = await ctx.db
      .query("careerChats")
      .withIndex("by_professional_and_status", (q) =>
        q.eq("professionalId", professionalId).eq("status", "confirmed")
      )
      .filter((q) =>
        q.and(
          q.gte(q.field("scheduledAt"), startDate),
          q.lte(q.field("scheduledAt"), endDate)
        )
      )
      .collect();

    // Generate available slots
    const availableSlots: Array<{
      date: number;
      startTime: string;
      endTime: string;
      dayOfWeek: number;
    }> = [];

    const currentDate = new Date(startDate);
    const endDateTime = new Date(endDate);

    while (currentDate <= endDateTime) {
      const dayOfWeek = currentDate.getDay();
      const dateTimestamp = currentDate.getTime();

      // Find availability for this day of week
      const dayAvailability = availabilitySlots.filter(
        (slot) => slot.dayOfWeek === dayOfWeek
      );

      for (const slot of dayAvailability) {
        // Create timestamp for this specific slot
        const [startHour, startMin] = slot.startTime.split(":").map(Number);
        const slotDate = new Date(currentDate);
        slotDate.setHours(startHour, startMin, 0, 0);
        const slotTimestamp = slotDate.getTime();

        // Skip if slot is in the past
        if (slotTimestamp < Date.now()) {
          continue;
        }

        // Check if slot is already booked
        const isBooked = existingBookings.some(
          (booking) => booking.scheduledAt === slotTimestamp
        );

        if (!isBooked) {
          availableSlots.push({
            date: slotTimestamp,
            startTime: slot.startTime,
            endTime: slot.endTime,
            dayOfWeek: dayOfWeek,
          });
        }
      }

      // Move to next day
      currentDate.setDate(currentDate.getDate() + 1);
    }

    return availableSlots;
  },
});

// Delete a specific availability slot
export const deleteSlot = mutation({
  args: {
    slotId: v.id("availabilitySlots"),
  },
  handler: async (ctx, args) => {
    const userId = await getCurrentUserId(ctx);
    if (!userId) {
      throw new Error("Not authenticated");
    }

    const slot = await ctx.db.get(args.slotId);
    if (!slot) {
      throw new Error("Slot not found");
    }

    // Verify ownership
    if (slot.professionalId !== userId) {
      throw new Error("Not authorized");
    }

    await ctx.db.delete(args.slotId);
    return { success: true };
  },
});

// Toggle slot active status
export const toggleSlotStatus = mutation({
  args: {
    slotId: v.id("availabilitySlots"),
  },
  handler: async (ctx, args) => {
    const userId = await getCurrentUserId(ctx);
    if (!userId) {
      throw new Error("Not authenticated");
    }

    const slot = await ctx.db.get(args.slotId);
    if (!slot) {
      throw new Error("Slot not found");
    }

    // Verify ownership
    if (slot.professionalId !== userId) {
      throw new Error("Not authorized");
    }

    await ctx.db.patch(args.slotId, {
      isActive: !slot.isActive,
    });

    return { success: true };
  },
});
