/**
 * Notification Triggers - Auto-create notifications for key events
 *
 * This module provides helper functions to automatically create notifications
 * when specific events occur (bookings, messages, ratings, etc.)
 */

import { Id } from "./_generated/dataModel";
import { MutationCtx } from "./_generated/server";

/**
 * Create notification for new booking request
 * Triggered when: Student requests a session with a mentor
 * Notifies: Mentor
 */
export async function notifyBookingRequest(
  ctx: MutationCtx,
  data: {
    mentorUserId: Id<"users">;
    studentUserId: Id<"users">;
    chatId: Id<"careerChats">;
  }
) {
  const student = await ctx.db.get(data.studentUserId);
  if (!student) return;

  const studentName = `${student.firstName} ${student.lastName}`;

  await ctx.db.insert("notifications", {
    userId: data.mentorUserId,
    type: "booking",
    title: "New Booking Request",
    message: `${studentName} requested a session with you`,
    read: false,
    createdAt: Date.now(),
    relatedChatId: data.chatId,
    relatedUserId: data.studentUserId,
  });
}

/**
 * Create notification for booking confirmation
 * Triggered when: Mentor approves a booking
 * Notifies: Student
 */
export async function notifyBookingConfirmed(
  ctx: MutationCtx,
  data: {
    studentUserId: Id<"users">;
    mentorUserId: Id<"users">;
    chatId: Id<"careerChats">;
    scheduledAt?: number;
  }
) {
  const mentor = await ctx.db.get(data.mentorUserId);
  if (!mentor) return;

  const mentorName = `${mentor.firstName} ${mentor.lastName}`;
  const dateStr = data.scheduledAt
    ? new Date(data.scheduledAt).toLocaleDateString("en-US", {
        month: "long",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      })
    : "soon";

  await ctx.db.insert("notifications", {
    userId: data.studentUserId,
    type: "booking",
    title: "Booking Confirmed!",
    message: `${mentorName} confirmed your session${
      data.scheduledAt ? ` on ${dateStr}` : ""
    }`,
    read: false,
    createdAt: Date.now(),
    relatedChatId: data.chatId,
    relatedUserId: data.mentorUserId,
  });
}

/**
 * Create notification for booking rejection
 * Triggered when: Mentor declines a booking
 * Notifies: Student
 */
export async function notifyBookingRejected(
  ctx: MutationCtx,
  data: {
    studentUserId: Id<"users">;
    mentorUserId: Id<"users">;
    chatId: Id<"careerChats">;
    reason?: string;
  }
) {
  const mentor = await ctx.db.get(data.mentorUserId);
  if (!mentor) return;

  const mentorName = `${mentor.firstName} ${mentor.lastName}`;

  await ctx.db.insert("notifications", {
    userId: data.studentUserId,
    type: "booking",
    title: "Booking Declined",
    message: `${mentorName} declined your booking request${
      data.reason ? `: ${data.reason}` : ""
    }`,
    read: false,
    createdAt: Date.now(),
    relatedChatId: data.chatId,
    relatedUserId: data.mentorUserId,
  });
}

/**
 * Create notification for new message
 * Triggered when: Someone sends a message in a chat
 * Notifies: Other participant
 */
export async function notifyNewMessage(
  ctx: MutationCtx,
  data: {
    recipientUserId: Id<"users">;
    senderUserId: Id<"users">;
    chatId: Id<"careerChats">;
    messagePreview: string;
  }
) {
  const sender = await ctx.db.get(data.senderUserId);
  if (!sender) return;

  const senderName = `${sender.firstName} ${sender.lastName}`;
  const preview =
    data.messagePreview.length > 50
      ? data.messagePreview.substring(0, 50) + "..."
      : data.messagePreview;

  await ctx.db.insert("notifications", {
    userId: data.recipientUserId,
    type: "message",
    title: `New message from ${senderName}`,
    message: preview,
    read: false,
    createdAt: Date.now(),
    relatedChatId: data.chatId,
    relatedUserId: data.senderUserId,
  });
}

/**
 * Create notification for rating request
 * Triggered when: Session is marked as completed
 * Notifies: Student
 */
export async function notifyRatingRequest(
  ctx: MutationCtx,
  data: {
    studentUserId: Id<"users">;
    mentorUserId: Id<"users">;
    chatId: Id<"careerChats">;
  }
) {
  const mentor = await ctx.db.get(data.mentorUserId);
  if (!mentor) return;

  const mentorName = `${mentor.firstName} ${mentor.lastName}`;

  await ctx.db.insert("notifications", {
    userId: data.studentUserId,
    type: "review",
    title: "Rate Your Session",
    message: `How was your session with ${mentorName}? Leave a review!`,
    read: false,
    createdAt: Date.now(),
    relatedChatId: data.chatId,
    relatedUserId: data.mentorUserId,
  });
}

/**
 * Create notification for new review/rating
 * Triggered when: Student rates a mentor
 * Notifies: Mentor
 */
export async function notifyNewRating(
  ctx: MutationCtx,
  data: {
    mentorUserId: Id<"users">;
    studentUserId: Id<"users">;
    chatId: Id<"careerChats">;
    rating: number;
  }
) {
  const student = await ctx.db.get(data.studentUserId);
  if (!student) return;

  const studentName = `${student.firstName} ${student.lastName}`;

  await ctx.db.insert("notifications", {
    userId: data.mentorUserId,
    type: "review",
    title: "New Review Received",
    message: `${studentName} rated your session ${data.rating} stars`,
    read: false,
    createdAt: Date.now(),
    relatedChatId: data.chatId,
    relatedUserId: data.studentUserId,
  });
}

/**
 * Create notification for session reminder
 * Triggered when: 24 hours before scheduled session
 * Notifies: Both student and mentor
 */
export async function notifySessionReminder(
  ctx: MutationCtx,
  data: {
    userId: Id<"users">;
    otherUserId: Id<"users">;
    chatId: Id<"careerChats">;
    scheduledAt: number;
  }
) {
  const otherUser = await ctx.db.get(data.otherUserId);
  if (!otherUser) return;

  const otherUserName = `${otherUser.firstName} ${otherUser.lastName}`;
  const timeStr = new Date(data.scheduledAt).toLocaleString("en-US", {
    month: "long",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });

  await ctx.db.insert("notifications", {
    userId: data.userId,
    type: "booking",
    title: "Session Tomorrow",
    message: `Your session with ${otherUserName} is tomorrow at ${timeStr}`,
    read: false,
    createdAt: Date.now(),
    relatedChatId: data.chatId,
    relatedUserId: data.otherUserId,
  });
}
