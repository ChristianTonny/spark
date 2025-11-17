"use client";

import React, { useState, useEffect, useRef } from "react";
import { useQuery, useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import { TimeSlotPicker } from "./TimeSlotPicker";
import { Button } from "./ui/button";
import { X } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

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
  const { toast } = useToast();
  const modalRef = useRef<HTMLDivElement>(null);
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

  const createBookingRequest = useMutation(api.careerChats.createBookingRequest);

  // Reset form when modal opens/closes
  useEffect(() => {
    if (!isOpen) {
      setSelectedSlot(null);
      setSelectedCareerId("");
      setMessage("");
    }
  }, [isOpen]);

  // Focus management and accessibility
  useEffect(() => {
    if (!isOpen) return;

    const previouslyFocusedElement = document.activeElement as HTMLElement;

    // Set focus to modal
    if (modalRef.current) {
      const firstFocusable = modalRef.current.querySelector(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
      ) as HTMLElement;
      firstFocusable?.focus();
    }

    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
    };

    document.addEventListener("keydown", handleEscape);
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", handleEscape);
      document.body.style.overflow = "unset";
      // Return focus to previously focused element
      previouslyFocusedElement?.focus();
    };
  }, [isOpen, onClose]);

  const handleSubmit = async () => {
    if (!selectedSlot) {
      toast({
        title: "Time Slot Required",
        description: "Please select a time slot for your session.",
        variant: "destructive",
      });
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

      toast({
        title: "Booking Request Sent!",
        description: "The mentor will review and respond soon.",
        variant: "success",
      });
      onClose();
    } catch (error) {
      toast({
        title: "Booking Failed",
        description:
          error instanceof Error
            ? error.message
            : "Failed to create booking request. Please try again.",
        variant: "destructive",
      });
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
      <div
        className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4"
        role="dialog"
        aria-modal="true"
        aria-labelledby="booking-modal-title"
      >
        <div
          ref={modalRef}
          className="bg-white border-3 border-black w-full max-w-2xl max-h-[95vh] sm:max-h-[90vh] overflow-y-auto shadow-brutal"
        >
          {/* Header */}
          <div className="flex items-center justify-between p-4 sm:p-6 border-b-3 border-black">
            <div className="flex-1 min-w-0 pr-2">
              <h2 id="booking-modal-title" className="font-black text-xl sm:text-2xl uppercase">Book a Session</h2>
              <p className="text-xs sm:text-sm text-gray-600 mt-1 truncate">with {mentorName}</p>
            </div>
            <button
              onClick={onClose}
              className="p-2 sm:p-2.5 min-w-[44px] min-h-[44px] flex items-center justify-center hover:bg-gray-100 border-2 border-black transition-colors flex-shrink-0"
              aria-label="Close booking modal"
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
            <button
              onClick={handleSubmit}
              disabled={!selectedSlot || isSubmitting}
              className="flex-1 min-h-[48px] px-6 py-3 bg-brutal-blue text-white font-bold uppercase text-sm sm:text-base border-3 border-black shadow-brutal hover:shadow-brutal-lg disabled:opacity-50 disabled:cursor-not-allowed transition-all"
            >
              {isSubmitting ? "Sending Request..." : "Send Booking Request"}
            </button>
            <button
              onClick={onClose}
              disabled={isSubmitting}
              className="sm:flex-initial min-h-[48px] px-6 py-3 bg-white text-black font-bold uppercase text-sm sm:text-base border-3 border-black shadow-brutal hover:shadow-brutal-lg disabled:opacity-50 disabled:cursor-not-allowed transition-all"
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
