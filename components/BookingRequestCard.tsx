"use client";

import React, { useState } from "react";
import { useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import { Button } from "./ui/button";
import { Check, X, Calendar, Clock, User, GraduationCap } from "lucide-react";

interface BookingRequestCardProps {
  booking: {
    _id: Id<"careerChats">;
    scheduledAt?: number;
    duration: number;
    studentMessage?: string;
    student: {
      name: string;
      avatar?: string;
      gradeLevel?: string;
      school?: string;
    } | null;
    career: {
      title: string;
      category: string;
    } | null;
  };
}

export function BookingRequestCard({ booking }: BookingRequestCardProps) {
  const [isApproving, setIsApproving] = useState(false);
  const [isRejecting, setIsRejecting] = useState(false);
  const [showRejectForm, setShowRejectForm] = useState(false);
  const [rejectReason, setRejectReason] = useState("");

  const approveBooking = useMutation(api.careerChats.approveBooking);
  const rejectBooking = useMutation(api.careerChats.rejectBooking);

  const handleApprove = async () => {
    setIsApproving(true);
    try {
      await approveBooking({ chatId: booking._id });
    } catch (error) {
      console.error("Error approving booking:", error);
      alert("Failed to approve booking. Please try again.");
    } finally {
      setIsApproving(false);
    }
  };

  const handleReject = async () => {
    setIsRejecting(true);
    try {
      await rejectBooking({
        chatId: booking._id,
        reason: rejectReason || undefined,
      });
      setShowRejectForm(false);
      setRejectReason("");
    } catch (error) {
      console.error("Error rejecting booking:", error);
      alert("Failed to reject booking. Please try again.");
    } finally {
      setIsRejecting(false);
    }
  };

  const formatDate = (timestamp: number) => {
    return new Date(timestamp).toLocaleString("en-RW", {
      timeZone: "Africa/Kigali",
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <div className="border-3 border-black bg-white shadow-brutal">
      <div className="p-6 space-y-4">
        {/* Student Info */}
        <div className="flex items-start gap-4">
          <div className="w-16 h-16 rounded-full border-3 border-black bg-gray-200 flex items-center justify-center overflow-hidden">
            {booking.student?.avatar ? (
              <img
                src={booking.student.avatar}
                alt={booking.student.name}
                className="w-full h-full object-cover"
              />
            ) : (
              <User className="w-8 h-8 text-gray-500" />
            )}
          </div>
          <div className="flex-1">
            <h3 className="font-black text-xl uppercase">
              {booking.student?.name || "Unknown Student"}
            </h3>
            {booking.student?.gradeLevel && (
              <p className="flex items-center gap-2 text-sm text-gray-600">
                <GraduationCap className="w-4 h-4" />
                {booking.student.gradeLevel} {booking.student.school && `• ${booking.student.school}`}
              </p>
            )}
          </div>
        </div>

        {/* Booking Details */}
        <div className="space-y-2 border-t-2 border-black pt-4">
          {booking.scheduledAt && (
            <div className="flex items-start gap-3">
              <Calendar className="w-5 h-5 mt-0.5" />
              <div>
                <p className="font-bold">Requested Time:</p>
                <p className="text-sm">{formatDate(booking.scheduledAt)}</p>
              </div>
            </div>
          )}

          <div className="flex items-start gap-3">
            <Clock className="w-5 h-5 mt-0.5" />
            <div>
              <p className="font-bold">Duration:</p>
              <p className="text-sm">{booking.duration} minutes</p>
            </div>
          </div>

          {booking.career && (
            <div className="bg-brutal-blue/10 border-2 border-black p-3">
              <p className="font-bold text-sm">Career Topic:</p>
              <p className="text-sm">{booking.career.title}</p>
              <p className="text-xs text-gray-600">{booking.career.category}</p>
            </div>
          )}

          {booking.studentMessage && (
            <div className="bg-yellow-50 border-2 border-black p-3">
              <p className="font-bold text-sm mb-1">Message from Student:</p>
              <p className="text-sm italic">&quot;{booking.studentMessage}&quot;</p>
            </div>
          )}
        </div>

        {/* Actions */}
        {!showRejectForm ? (
          <div className="flex gap-3 pt-4 border-t-2 border-black">
            <Button
              onClick={handleApprove}
              disabled={isApproving || isRejecting}
              className="flex-1 !bg-brutal-green hover:!bg-brutal-green/90 !text-black"
            >
              <Check className="w-5 h-5 mr-2" />
              {isApproving ? "Approving..." : "Approve"}
            </Button>
            <Button
              onClick={() => setShowRejectForm(true)}
              disabled={isApproving || isRejecting}
              variant="outline"
              className="flex-1 !text-red-600 hover:!bg-red-50"
            >
              <X className="w-5 h-5 mr-2" />
              Decline
            </Button>
          </div>
        ) : (
          <div className="space-y-3 pt-4 border-t-2 border-black">
            <label className="block">
              <span className="font-bold text-sm">Reason for declining (optional):</span>
              <textarea
                value={rejectReason}
                onChange={(e) => setRejectReason(e.target.value)}
                className="mt-1 w-full p-2 border-2 border-black min-h-[80px]"
                placeholder="Let the student know why you can't accept this booking..."
              />
            </label>
            <div className="flex gap-3">
              <Button
                onClick={handleReject}
                disabled={isRejecting}
                className="flex-1 !bg-red-500 hover:!bg-red-600"
              >
                {isRejecting ? "Declining..." : "Confirm Decline"}
              </Button>
              <Button
                onClick={() => {
                  setShowRejectForm(false);
                  setRejectReason("");
                }}
                variant="outline"
                disabled={isRejecting}
              >
                Cancel
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
