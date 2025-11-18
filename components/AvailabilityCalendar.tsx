"use client";

import React, { useState } from "react";

interface TimeSlot {
  dayOfWeek: number;
  startTime: string;
  endTime: string;
}

interface AvailabilityCalendarProps {
  existingSlots?: TimeSlot[];
  onSave: (slots: TimeSlot[]) => void;
  isSaving?: boolean;
}

const DAYS = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
const TIME_SLOTS = [
  "08:00",
  "09:00",
  "10:00",
  "11:00",
  "12:00",
  "13:00",
  "14:00",
  "15:00",
  "16:00",
  "17:00",
  "18:00",
  "19:00",
  "20:00",
];

export function AvailabilityCalendar({
  existingSlots = [],
  onSave,
  isSaving = false,
}: AvailabilityCalendarProps) {
  const [selectedSlots, setSelectedSlots] = useState<Set<string>>(() => {
    // Initialize with existing slots
    const slots = new Set<string>();
    existingSlots.forEach((slot) => {
      slots.add(`${slot.dayOfWeek}-${slot.startTime}`);
    });
    return slots;
  });

  const toggleSlot = (dayOfWeek: number, startTime: string) => {
    const slotKey = `${dayOfWeek}-${startTime}`;
    const newSlots = new Set(selectedSlots);

    if (newSlots.has(slotKey)) {
      newSlots.delete(slotKey);
    } else {
      newSlots.add(slotKey);
    }

    setSelectedSlots(newSlots);
  };

  const handleSave = () => {
    const slots: TimeSlot[] = [];

    selectedSlots.forEach((slotKey) => {
      const [dayStr, startTime] = slotKey.split("-");
      const dayOfWeek = parseInt(dayStr);
      const startHour = parseInt(startTime.split(":")[0]);
      const endHour = startHour + 1;
      const endTime = `${endHour.toString().padStart(2, "0")}:00`;

      slots.push({
        dayOfWeek,
        startTime,
        endTime,
      });
    });

    onSave(slots);
  };

  const isSlotSelected = (dayOfWeek: number, startTime: string) => {
    return selectedSlots.has(`${dayOfWeek}-${startTime}`);
  };

  return (
    <div className="space-y-6">
      {/* Calendar Grid */}
      <div className="border-3 border-black bg-white">
        {/* Header Row */}
        <div className="grid grid-cols-8 border-b-3 border-black">
          <div className="p-4 border-r-3 border-black font-black uppercase text-sm">
            Time
          </div>
          {DAYS.map((day) => (
            <div
              key={day}
              className="p-4 border-r-3 border-black last:border-r-0 font-black uppercase text-sm text-center"
            >
              {day.slice(0, 3)}
            </div>
          ))}
        </div>

        {/* Time Slots Grid */}
        <div>
          {TIME_SLOTS.map((time, timeIndex) => (
            <div
              key={time}
              className={`grid grid-cols-8 ${
                timeIndex < TIME_SLOTS.length - 1 ? "border-b-2 border-black" : ""
              }`}
            >
              <div className="p-4 border-r-3 border-black font-bold text-sm">
                {time}
              </div>
              {DAYS.map((_, dayIndex) => {
                const selected = isSlotSelected(dayIndex, time);
                return (
                  <button
                    key={dayIndex}
                    onClick={() => toggleSlot(dayIndex, time)}
                    className={`p-4 border-r-3 border-black last:border-r-0 transition-colors hover:bg-gray-100 ${
                      selected
                        ? "bg-brutal-green text-black font-bold"
                        : "bg-white"
                    }`}
                  >
                    {selected && "✓"}
                  </button>
                );
              })}
            </div>
          ))}
        </div>
      </div>

      {/* Instructions */}
      <div className="bg-yellow-100 border-3 border-black p-4">
        <p className="font-bold mb-2">How to use:</p>
        <ul className="list-disc list-inside space-y-1 text-sm">
          <li>Click time slots to mark when you&apos;re available</li>
          <li>Each slot is 1 hour long</li>
          <li>Click again to remove a slot</li>
          <li>Students will only see available future times</li>
        </ul>
      </div>

      {/* Action Buttons */}
      <div className="flex gap-4">
        <button
          onClick={handleSave}
          disabled={isSaving || selectedSlots.size === 0}
          className="flex-1 px-5 py-3 sm:px-6 min-h-[48px] border-3 border-black bg-brutal-green font-bold uppercase text-sm sm:text-base text-black hover:bg-green-400 active:bg-green-400 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isSaving ? "Saving..." : "Save Availability"}
        </button>
        <button
          onClick={() => setSelectedSlots(new Set())}
          disabled={selectedSlots.size === 0}
          className="px-5 py-3 sm:px-6 min-h-[48px] border-3 border-black bg-white font-bold uppercase text-sm sm:text-base text-black hover:bg-gray-100 active:bg-gray-100 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Clear All
        </button>
      </div>

      {/* Summary */}
      <div className="border-3 border-black p-4 bg-white">
        <p className="font-bold mb-2">Summary:</p>
        <p className="text-sm">
          {selectedSlots.size} hour{selectedSlots.size !== 1 ? "s" : ""} selected per week
        </p>
      </div>
    </div>
  );
}
