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
  const [queryParams, setQueryParams] = useState<{
    professionalId: Id<"users">;
    startDate: number;
    endDate: number;
  } | null>(null);

  useEffect(() => {
    if (!isOpen) {
      setQueryParams(null);
      return;
    }

    const now = Date.now();
    setQueryParams({
      professionalId: mentorId,
      startDate: now,
      endDate: now + 14 * 24 * 60 * 60 * 1000,
    });
  }, [isOpen, mentorId]);

  const availableSlots = useQuery(
    api.availabilitySlots.getAvailableSlots,
    queryParams ?? "skip"
  );

  // Debug logging
  useEffect(() => {
    if (!isOpen) return;

    console.log("BookingModal opened for mentor:", mentorId);
    console.log("Query parameters:", queryParams);
    console.log("Available slots result:", availableSlots);

    if (availableSlots === undefined) {
      console.log("Query is still loading...");
    } else if (availableSlots === null) {
      console.log("Query returned null (error state)");
    } else if (Array.isArray(availableSlots)) {
      console.log("Query succeeded! Found slots:", availableSlots.length);
    }
  }, [isOpen, mentorId, queryParams, availableSlots]);

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
      <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4">
        <div className="bg-white border-3 border-black w-full max-w-2xl max-h-[95vh] sm:max-h-[90vh] overflow-y-auto shadow-brutal">
          {/* Header */}
          <div className="flex items-center justify-between p-4 sm:p-6 border-b-3 border-black">
            <div className="flex-1 min-w-0 pr-2">
              <h2 className="font-black text-xl sm:text-2xl uppercase">Book a Session</h2>
              <p className="text-xs sm:text-sm text-gray-600 mt-1 truncate">with {mentorName}</p>
            </div>
            <button
              onClick={onClose}
              className="p-2 sm:p-2.5 min-w-[44px] min-h-[44px] flex items-center justify-center hover:bg-gray-100 border-2 border-black transition-colors flex-shrink-0"
              aria-label="Close modal"
            >
              <X className="w-5 h-5 sm:w-6 sm:h-6" />
            </button>
          </div>

          {/* Content */}
          <div className="p-4 sm:p-6 space-y-4 sm:space-y-6">
            {/* Time Slot Picker */}
            {availableSlots === undefined ? (
              <div className="border-3 border-black p-6 sm:p-8 bg-white text-center">
                <div className="flex flex-col items-center gap-3 sm:gap-4">
                  <div className="animate-spin w-8 h-8 border-3 border-black border-t-transparent rounded-full"></div>
                  <p className="font-bold uppercase text-sm sm:text-base">Loading available time slots...</p>
                </div>
              </div>
            ) : availableSlots === null ? (
              <div className="border-3 border-black p-6 sm:p-8 bg-red-50 text-center">
                <p className="font-bold text-red-600 uppercase text-sm sm:text-base">Error loading slots</p>
                <p className="text-xs sm:text-sm mt-2">Please try again later</p>
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
                <label className="block font-bold mb-2 uppercase text-xs sm:text-sm">
                  Career Topic (Optional)
                </label>
                <select
                  value={selectedCareerId}
                  onChange={(e) => setSelectedCareerId(e.target.value)}
                  className="w-full p-3 sm:p-3.5 border-3 border-black bg-white font-bold text-sm sm:text-base min-h-[48px]"
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
              <label className="block font-bold mb-2 uppercase text-xs sm:text-sm">
                Message to Mentor (Optional)
              </label>
              <textarea
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Let the mentor know what you'd like to discuss..."
                className="w-full p-3 sm:p-3.5 border-3 border-black min-h-[100px] sm:min-h-[120px] resize-none text-sm sm:text-base"
                maxLength={500}
              />
              <p className="text-xs text-gray-500 mt-1">
                {message.length}/500 characters
              </p>
            </div>

            {/* Session Duration Info */}
            <div className="bg-yellow-50 border-2 border-black p-3 sm:p-4">
              <p className="font-bold text-xs sm:text-sm mb-1">Session Duration:</p>
              <p className="text-xs sm:text-sm">60 minutes</p>
            </div>
          </div>

          {/* Footer */}
          <div className="flex flex-col sm:flex-row gap-2 sm:gap-3 p-4 sm:p-6 border-t-3 border-black">
            <Button
              onClick={handleSubmit}
              disabled={!selectedSlot || isSubmitting}
              className="flex-1 min-h-[48px] text-sm sm:text-base"
            >
              {isSubmitting ? "Sending Request..." : "Send Booking Request"}
            </Button>
            <Button
              onClick={onClose}
              variant="outline"
              disabled={isSubmitting}
              className="sm:flex-initial min-h-[48px] text-sm sm:text-base"
            >
              Cancel
            </Button>
          </div>
        </div>
      </div>
    </>
  );
}
