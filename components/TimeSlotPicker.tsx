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
          This mentor hasn't set their availability yet. Please check back later.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2 mb-4">
        <Calendar className="w-5 h-5" />
        <h3 className="font-bold uppercase">Select a Time Slot</h3>
      </div>

      <div className="space-y-4 max-h-[400px] overflow-y-auto">
        {dates.map((dateKey) => {
          const daySlots = slotsByDate[dateKey];
          return (
            <div key={dateKey} className="border-2 border-black bg-white">
              <div className="bg-gray-100 border-b-2 border-black p-3">
                <p className="font-bold">{formatDate(dateKey)}</p>
              </div>
              <div className="p-3 grid grid-cols-2 sm:grid-cols-3 gap-2">
                {daySlots.map((slot, index) => {
                  const isSelected =
                    selectedSlot?.date === slot.date &&
                    selectedSlot?.startTime === slot.startTime;
                  return (
                    <button
                      key={index}
                      onClick={() => onSelectSlot(slot)}
                      className={`p-3 border-2 border-black font-bold transition-all hover:scale-105 ${
                        isSelected
                          ? "bg-brutal-green text-black shadow-brutal"
                          : "bg-white hover:bg-gray-50"
                      }`}
                    >
                      <div className="flex items-center justify-center gap-2">
                        <Clock className="w-4 h-4" />
                        <span>{slot.startTime}</span>
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
        <div className="bg-brutal-blue border-3 border-black p-4 text-white">
          <p className="font-bold mb-1">Selected:</p>
          <p>
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
