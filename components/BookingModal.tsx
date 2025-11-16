"use client";

import React, { useState, useEffect } from "react";
import { useQuery, useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import { TimeSlotPicker } from "./TimeSlotPicker";
import { Button } from "./ui/button";
import { X } from "lucide-react";

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  mentorId: Id<"users">;
  mentorName: string;
  careers?: Array<{ _id: string; title: string }>;
}

interface TimeSlot {
  date: number;
  startTime: string;
  endTime: string;
  dayOfWeek: number;
}

export function BookingModal({
  isOpen,
  onClose,
  mentorId,
  mentorName,
  careers = [],
}: BookingModalProps) {
  const [selectedSlot, setSelectedSlot] = useState<TimeSlot | null>(null);
  const [selectedCareerId, setSelectedCareerId] = useState<string>("");
  const [message, setMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Get available slots for next 14 days
  const now = Date.now();
  const twoWeeksLater = now + 14 * 24 * 60 * 60 * 1000;

  const availableSlots = useQuery(api.availabilitySlots.getAvailableSlots, {
    professionalId: mentorId,
    startDate: now,
    endDate: twoWeeksLater,
  });

  const createBookingRequest = useMutation(api.careerChats.createBookingRequest);

  // Reset form when modal opens/closes
  useEffect(() => {
    if (!isOpen) {
      setSelectedSlot(null);
      setSelectedCareerId("");
      setMessage("");
    }
  }, [isOpen]);

  // Close on escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener("keydown", handleEscape);
      document.body.style.overflow = "hidden";
    }

    return () => {
      document.removeEventListener("keydown", handleEscape);
      document.body.style.overflow = "unset";
    };
  }, [isOpen, onClose]);

  const handleSubmit = async () => {
    if (!selectedSlot) {
      alert("Please select a time slot");
      return;
    }

    setIsSubmitting(true);
    try {
      await createBookingRequest({
        professionalId: mentorId,
        careerId: selectedCareerId || undefined,
        scheduledAt: selectedSlot.date,
        duration: 60, // Default 60 minutes
        studentMessage: message || undefined,
      });

      alert("Booking request sent! The mentor will review and respond soon.");
      onClose();
    } catch (error) {
      console.error("Error creating booking request:", error);
      alert(
        error instanceof Error
          ? error.message
          : "Failed to create booking request. Please try again."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isOpen) return null;

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/50 z-40"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        <div className="bg-white border-3 border-black w-full max-w-2xl max-h-[90vh] overflow-y-auto shadow-brutal">
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b-3 border-black">
            <div>
              <h2 className="font-black text-2xl uppercase">Book a Session</h2>
              <p className="text-sm text-gray-600 mt-1">with {mentorName}</p>
            </div>
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-100 border-2 border-black transition-colors"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          {/* Content */}
          <div className="p-6 space-y-6">
            {/* Time Slot Picker */}
            {availableSlots === undefined ? (
              <div className="text-center py-8">
                <p className="font-bold">Loading available time slots...</p>
              </div>
            ) : (
              <TimeSlotPicker
                availableSlots={availableSlots}
                selectedSlot={selectedSlot}
                onSelectSlot={setSelectedSlot}
              />
            )}

            {/* Career Topic (Optional) */}
            {careers.length > 0 && (
              <div>
                <label className="block font-bold mb-2 uppercase text-sm">
                  Career Topic (Optional)
                </label>
                <select
                  value={selectedCareerId}
                  onChange={(e) => setSelectedCareerId(e.target.value)}
                  className="w-full p-3 border-3 border-black bg-white font-bold"
                >
                  <option value="">General Discussion</option>
                  {careers.map((career) => (
                    <option key={career._id} value={career._id}>
                      {career.title}
                    </option>
                  ))}
                </select>
              </div>
            )}

            {/* Message (Optional) */}
            <div>
              <label className="block font-bold mb-2 uppercase text-sm">
                Message to Mentor (Optional)
              </label>
              <textarea
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Let the mentor know what you'd like to discuss..."
                className="w-full p-3 border-3 border-black min-h-[100px] resize-none"
                maxLength={500}
              />
              <p className="text-xs text-gray-500 mt-1">
                {message.length}/500 characters
              </p>
            </div>

            {/* Session Duration Info */}
            <div className="bg-yellow-50 border-2 border-black p-4">
              <p className="font-bold text-sm mb-1">Session Duration:</p>
              <p className="text-sm">60 minutes</p>
            </div>
          </div>

          {/* Footer */}
          <div className="flex gap-3 p-6 border-t-3 border-black">
            <Button
              onClick={handleSubmit}
              disabled={!selectedSlot || isSubmitting}
              className="flex-1"
            >
              {isSubmitting ? "Sending Request..." : "Send Booking Request"}
            </Button>
            <Button
              onClick={onClose}
              variant="outline"
              disabled={isSubmitting}
            >
              Cancel
            </Button>
          </div>
        </div>
      </div>
    </>
  );
}
