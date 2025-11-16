"use client";

import { useQuery, useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import { AvailabilityCalendar } from "@/components/AvailabilityCalendar";
import { useRouter } from "next/navigation";
import { Calendar } from "lucide-react";

export default function MentorAvailabilityPage() {
  const router = useRouter();
  const availability = useQuery(api.availabilitySlots.getAvailability, {});
  const setAvailability = useMutation(api.availabilitySlots.setAvailability);

  const handleSave = async (
    slots: Array<{
      dayOfWeek: number;
      startTime: string;
      endTime: string;
    }>
  ) => {
    try {
      await setAvailability({ slots });
      alert("Availability saved successfully!");
      router.push("/dashboard/mentor");
    } catch (error) {
      console.error("Error saving availability:", error);
      alert("Failed to save availability. Please try again.");
    }
  };

  if (availability === undefined) {
    return (
      <div className="min-h-screen bg-gray-50 p-3 sm:p-4 md:p-8">
        <div className="max-w-6xl mx-auto">
          <div className="border-3 border-black p-6 sm:p-8 bg-white">
            <p className="text-center font-bold">Loading...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-3 sm:p-4 md:p-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-6 sm:mb-8">
          <div className="flex items-center gap-2 sm:gap-3 mb-3 sm:mb-4">
            <Calendar className="w-6 h-6 sm:w-8 sm:h-8" />
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-black uppercase">Set Your Availability</h1>
          </div>
          <p className="text-sm sm:text-base md:text-lg">
            Mark the times when you&apos;re available to meet with students. Students will be
            able to request bookings during these times.
          </p>
        </div>

        {/* Calendar */}
        <AvailabilityCalendar existingSlots={availability} onSave={handleSave} />

        {/* Back Button */}
        <div className="mt-6 sm:mt-8">
          <button
            onClick={() => router.push("/dashboard/mentor")}
            className="px-5 py-3 sm:px-6 min-h-[48px] border-3 border-black bg-white font-bold uppercase text-sm sm:text-base hover:bg-gray-100 active:bg-gray-100 transition-colors"
          >
            ← Back to Dashboard
          </button>
        </div>
      </div>
    </div>
  );
}
