"use client";

import React, { useState } from "react";
import { Id } from "@/convex/_generated/dataModel";
import { useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import { Button } from "./ui/button";
import { BookingStatusBadge } from "./BookingStatusBadge";
import { Calendar, Clock, User, MessageCircle, CheckCircle } from "lucide-react";

type BookingStatus =
  | "pending"
  | "confirmed"
  | "scheduled"
  | "completed"
  | "cancelled"
  | "rejected"
  | "no_show";

interface BookingListItemProps {
  booking: {
    _id: Id<"careerChats">;
    scheduledAt?: number;
    duration: number;
    status: BookingStatus;
    unreadCount?: number;
    student?: {
      name: string;
      avatar?: string;
      gradeLevel?: string;
      school?: string;
    } | null;
    mentor?: {
      name: string;
      avatar?: string;
      title?: string;
      company?: string;
    } | null;
    career?: {
      title: string;
      category?: string;
    } | null;
  };
  userType: "student" | "mentor";
  onOpenChat?: (chatId: Id<"careerChats">) => void;
}

export function BookingListItem({
  booking,
  userType,
  onOpenChat,
}: BookingListItemProps) {
  const [isCompleting, setIsCompleting] = useState(false);
  const completeSession = useMutation(api.careerChats.completeSession);

  const formatDate = (timestamp: number) => {
    return new Date(timestamp).toLocaleString("en-RW", {
      timeZone: "Africa/Kigali",
      weekday: "long",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const otherPerson = userType === "student" ? booking.mentor : booking.student;
  const canChat = booking.status === "confirmed" || booking.status === "scheduled" || booking.status === "completed";
  
  // Check if session can be marked as complete (for any confirmed/scheduled session)
  const canComplete = 
    userType === "student" && 
    (booking.status === "confirmed" || booking.status === "scheduled");

  const handleCompleteSession = async () => {
    if (!confirm("Mark this session as complete? This will move it to your past sessions.")) {
      return;
    }
    
    setIsCompleting(true);
    try {
      await completeSession({ chatId: booking._id });
    } catch (error: any) {
      console.error("Failed to complete session:", error);
      alert(error?.message || "Failed to complete session. Please try again.");
    } finally {
      setIsCompleting(false);
    }
  };

  return (
    <div className="border-3 border-black bg-white shadow-brutal p-4">
      <div className="flex items-start justify-between gap-4">
        {/* Left Side - Person Info */}
        <div className="flex items-start gap-3 flex-1">
          <div className="w-12 h-12 rounded-full border-2 border-black bg-gray-200 flex items-center justify-center overflow-hidden flex-shrink-0">
            {otherPerson?.avatar ? (
              <img
                src={otherPerson.avatar}
                alt={otherPerson.name}
                className="w-full h-full object-cover"
              />
            ) : (
              <User className="w-6 h-6 text-gray-500" />
            )}
          </div>

          <div className="flex-1 min-w-0">
            <h3 className="font-black text-lg uppercase truncate">
              {otherPerson?.name || "Unknown"}
            </h3>
            {userType === "student" && booking.mentor && (
              <p className="text-sm text-gray-600 truncate">
                {booking.mentor.title}
                {booking.mentor.company && ` at ${booking.mentor.company}`}
              </p>
            )}
            {userType === "mentor" && booking.student && (
              <p className="text-sm text-gray-600">
                {booking.student.gradeLevel}
                {booking.student.school && ` • ${booking.student.school}`}
              </p>
            )}
          </div>
        </div>

        {/* Right Side - Status */}
        <BookingStatusBadge status={booking.status} />
      </div>

      {/* Booking Details */}
      <div className="mt-4 space-y-2 text-sm">
        {booking.scheduledAt && (
          <div className="flex items-center gap-2">
            <Calendar className="w-4 h-4 text-gray-600" />
            <span>{formatDate(booking.scheduledAt)}</span>
          </div>
        )}
        <div className="flex items-center gap-2">
          <Clock className="w-4 h-4 text-gray-600" />
          <span>{booking.duration} minutes</span>
        </div>
        {booking.career && (
          <div className="bg-gray-50 border-2 border-black p-2 mt-2">
            <p className="font-bold text-xs uppercase text-gray-600">Topic:</p>
            <p className="font-bold">{booking.career.title}</p>
          </div>
        )}
      </div>

      {/* Actions */}
      {(canChat || canComplete) && (
        <div className="mt-4 pt-4 border-t-2 border-black flex gap-2">
          {canChat && onOpenChat && (
            <Button
              onClick={() => onOpenChat(booking._id)}
              className="flex-1 relative"
            >
              <MessageCircle className="w-4 h-4 mr-2" />
              Message
              {booking.unreadCount && booking.unreadCount > 0 && (
                <span className="ml-2 bg-red-500 text-white px-2 py-0.5 text-xs rounded-full border-2 border-black">
                  {booking.unreadCount}
                </span>
              )}
            </Button>
          )}
          
          {canComplete && (
            <Button
              onClick={handleCompleteSession}
              disabled={isCompleting}
              variant="outline"
              className="flex-1 bg-brutal-green text-black hover:bg-brutal-green/90 border-3 border-black"
            >
              <CheckCircle className="w-4 h-4 mr-2" />
              {isCompleting ? "Completing..." : "Mark Complete"}
            </Button>
          )}
        </div>
      )}
    </div>
  );
}
