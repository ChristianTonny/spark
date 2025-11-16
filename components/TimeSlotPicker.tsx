"use client";

import React, { useState } from "react";
import { Calendar, Clock } from "lucide-react";

interface TimeSlot {
  date: number;
  startTime: string;
  endTime: string;
  dayOfWeek: number;
}

interface TimeSlotPickerProps {
  availableSlots: TimeSlot[];
  selectedSlot: TimeSlot | null;
  onSelectSlot: (slot: TimeSlot) => void;
}

export function TimeSlotPicker({
  availableSlots,
  selectedSlot,
  onSelectSlot,
}: TimeSlotPickerProps) {
  // Group slots by date
  const slotsByDate = availableSlots.reduce((acc, slot) => {
    const dateKey = new Date(slot.date).toDateString();
    if (!acc[dateKey]) {
      acc[dateKey] = [];
    }
    acc[dateKey].push(slot);
    return acc;
  }, {} as Record<string, TimeSlot[]>);

  const dates = Object.keys(slotsByDate).sort(
    (a, b) => new Date(a).getTime() - new Date(b).getTime()
  );

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);

    if (date.toDateString() === today.toDateString()) {
      return "Today";
    } else if (date.toDateString() === tomorrow.toDateString()) {
      return "Tomorrow";
    } else {
      return date.toLocaleDateString("en-RW", {
        timeZone: "Africa/Kigali",
        weekday: "long",
        month: "long",
        day: "numeric",
      });
    }
  };

  if (availableSlots.length === 0) {
    return (
      <div className="border-3 border-black p-8 bg-white text-center">
        <Calendar className="w-16 h-16 mx-auto mb-4 text-gray-400" />
        <h3 className="font-black text-xl mb-2">No Available Slots</h3>
        <p className="text-gray-600">
          This mentor hasn&apos;t set their availability yet. Please check back later.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-3 sm:space-y-4">
      <div className="flex items-center gap-2 mb-3 sm:mb-4">
        <Calendar className="w-4 h-4 sm:w-5 sm:h-5" />
        <h3 className="font-bold uppercase text-sm sm:text-base">Select a Time Slot</h3>
      </div>

      <div className="space-y-3 sm:space-y-4 max-h-[350px] sm:max-h-[400px] overflow-y-auto">
        {dates.map((dateKey) => {
          const daySlots = slotsByDate[dateKey];
          return (
            <div key={dateKey} className="border-2 border-black bg-white">
              <div className="bg-gray-100 border-b-2 border-black p-2.5 sm:p-3">
                <p className="font-bold text-sm sm:text-base">{formatDate(dateKey)}</p>
              </div>
              <div className="p-2.5 sm:p-3 grid grid-cols-2 sm:grid-cols-3 gap-2">
                {daySlots.map((slot, index) => {
                  const isSelected =
                    selectedSlot?.date === slot.date &&
                    selectedSlot?.startTime === slot.startTime;
                  return (
                    <button
                      key={index}
                      onClick={() => onSelectSlot(slot)}
                      className={`p-3 sm:p-3.5 min-h-[48px] sm:min-h-[52px] border-2 border-black font-bold transition-all active:scale-95 ${
                        isSelected
                          ? "bg-brutal-green text-black shadow-brutal"
                          : "bg-white active:bg-gray-50"
                      }`}
                      aria-label={`Select time slot at ${slot.startTime}`}
                    >
                      <div className="flex items-center justify-center gap-1.5 sm:gap-2">
                        <Clock className="w-4 h-4 flex-shrink-0" />
                        <span className="text-sm sm:text-base">{slot.startTime}</span>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>

      {selectedSlot && (
        <div className="bg-brutal-blue border-3 border-black p-3 sm:p-4 text-white">
          <p className="font-bold mb-1 text-sm sm:text-base">Selected:</p>
          <p className="text-sm sm:text-base">
            {new Date(selectedSlot.date).toLocaleDateString("en-RW", {
              timeZone: "Africa/Kigali",
              weekday: "long",
              month: "long",
              day: "numeric",
            })}{" "}
            at {selectedSlot.startTime}
          </p>
        </div>
      )}
    </div>
  );
}
