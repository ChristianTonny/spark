'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { ArrowLeft, Clock, Plus, Trash2, Save, Calendar } from 'lucide-react';
import { useQuery, useMutation } from 'convex/react';
import { api } from '../../../../convex/_generated/api';
import { useRoleGuard } from '../../../../lib/hooks/useRoleGuard';

interface TimeSlot {
  dayOfWeek: number; // 0-6 (Sunday-Saturday)
  startTime: string; // "14:00"
  endTime: string;   // "16:00"
}

const DAYS_OF_WEEK = [
  'Sunday',
  'Monday',
  'Tuesday',
  'Wednesday',
  'Thursday',
  'Friday',
  'Saturday',
];

const TIME_OPTIONS = Array.from({ length: 24 }, (_, i) => {
  const hour = i.toString().padStart(2, '0');
  return `${hour}:00`;
});

export default function AvailabilityPage() {
  // Protect this page - only mentors can access
  useRoleGuard(['mentor']);

  const professional = useQuery(api.professionals.getCurrentProfessional);
  const updateAvailability = useMutation(api.professionals.updateAvailability);

  const [timeSlots, setTimeSlots] = useState<TimeSlot[]>([]);
  const [isSaving, setIsSaving] = useState(false);
  const [saveMessage, setSaveMessage] = useState('');

  // Load existing availability
  useEffect(() => {
    if (professional?.availability) {
      setTimeSlots(professional.availability);
    }
  }, [professional]);

  const addTimeSlot = () => {
    setTimeSlots([
      ...timeSlots,
      {
        dayOfWeek: 1, // Monday by default
        startTime: '09:00',
        endTime: '10:00',
      },
    ]);
  };

  const removeTimeSlot = (index: number) => {
    setTimeSlots(timeSlots.filter((_, i) => i !== index));
  };

  const updateTimeSlot = (index: number, field: keyof TimeSlot, value: string | number) => {
    const updated = [...timeSlots];
    updated[index] = { ...updated[index], [field]: value };
    setTimeSlots(updated);
  };

  const handleSave = async () => {
    setIsSaving(true);
    setSaveMessage('');

    try {
      // Validate time slots
      for (const slot of timeSlots) {
        if (slot.startTime >= slot.endTime) {
          setSaveMessage('Error: Start time must be before end time');
          setIsSaving(false);
          return;
        }
      }

      await updateAvailability({ availability: timeSlots });
      setSaveMessage('Availability saved successfully!');
      setTimeout(() => setSaveMessage(''), 3000);
    } catch (error) {
      setSaveMessage('Error saving availability. Please try again.');
    } finally {
      setIsSaving(false);
    }
  };

  const groupedSlots = timeSlots.reduce((acc, slot) => {
    if (!acc[slot.dayOfWeek]) {
      acc[slot.dayOfWeek] = [];
    }
    acc[slot.dayOfWeek].push(slot);
    return acc;
  }, {} as Record<number, TimeSlot[]>);

  // Sort slots by start time within each day
  Object.keys(groupedSlots).forEach((day) => {
    groupedSlots[parseInt(day)].sort((a, b) => a.startTime.localeCompare(b.startTime));
  });

  const isLoading = professional === undefined;

  return (
    <div className="min-h-screen bg-gray-50 py-4 sm:py-8">
      <div className="container mx-auto px-4 max-w-4xl">
        {/* Header */}
        <div className="mb-6 sm:mb-8">
          <Link
            href="/dashboard/mentor"
            className="inline-flex items-center gap-2 text-brutal-blue hover:underline mb-4 font-bold min-h-[44px]"
          >
            <ArrowLeft className="w-5 h-5" />
            Back to Dashboard
          </Link>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-black mb-2">Set Your Availability</h1>
          <p className="text-base sm:text-lg text-gray-700">
            Choose when you're available for mentorship sessions. Students will be able to book sessions during these times.
          </p>
        </div>

        {/* Loading State */}
        {isLoading && (
          <div className="text-center py-12">
            <div className="animate-pulse">
              <h2 className="text-2xl font-black mb-2">Loading...</h2>
            </div>
          </div>
        )}

        {!isLoading && (
          <>
            {/* Weekly Calendar View */}
            <div className="mb-6 bg-white border-3 border-brutal-border shadow-brutal p-4 sm:p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl sm:text-2xl font-black uppercase flex items-center gap-2">
                  <Calendar className="w-6 h-6" />
                  Weekly Schedule
                </h2>
                <button
                  onClick={addTimeSlot}
                  className="px-4 py-2 min-h-[44px] bg-brutal-green border-3 border-brutal-border shadow-brutal hover:shadow-brutal-lg transition-all font-bold uppercase text-sm flex items-center gap-2"
                >
                  <Plus className="w-4 h-4" />
                  Add Time Slot
                </button>
              </div>

              {/* Visual Calendar */}
              <div className="grid grid-cols-1 gap-4 mb-6">
                {DAYS_OF_WEEK.map((day, dayIndex) => (
                  <div
                    key={dayIndex}
                    className={`border-2 border-brutal-border p-3 sm:p-4 ${
                      groupedSlots[dayIndex]?.length > 0 ? 'bg-brutal-blue/10' : 'bg-gray-50'
                    }`}
                  >
                    <h3 className="font-black text-base sm:text-lg mb-2">{day}</h3>
                    {groupedSlots[dayIndex]?.length > 0 ? (
                      <div className="flex flex-wrap gap-2">
                        {groupedSlots[dayIndex].map((slot, slotIndex) => (
                          <span
                            key={slotIndex}
                            className="px-3 py-1 bg-brutal-blue text-white border-2 border-brutal-border shadow-brutal-sm text-xs sm:text-sm font-bold flex items-center gap-2"
                          >
                            <Clock className="w-3 h-3" />
                            {slot.startTime} - {slot.endTime}
                          </span>
                        ))}
                      </div>
                    ) : (
                      <p className="text-sm text-gray-500">Not available</p>
                    )}
                  </div>
                ))}
              </div>

              {/* Time Slot Editor */}
              <div className="border-t-3 border-brutal-border pt-6">
                <h3 className="font-black text-lg mb-4 uppercase">Edit Time Slots</h3>

                {timeSlots.length === 0 ? (
                  <div className="text-center py-8 bg-gray-50 border-2 border-dashed border-gray-300">
                    <Clock className="w-12 h-12 mx-auto mb-3 text-gray-400" />
                    <p className="text-gray-600 mb-4">No time slots added yet</p>
                    <button
                      onClick={addTimeSlot}
                      className="px-6 py-3 min-h-[44px] bg-brutal-blue text-white border-3 border-brutal-border shadow-brutal hover:shadow-brutal-lg transition-all font-bold uppercase text-sm"
                    >
                      <Plus className="inline w-4 h-4 mr-2" />
                      Add Your First Time Slot
                    </button>
                  </div>
                ) : (
                  <div className="space-y-3">
                    {timeSlots.map((slot, index) => (
                      <div
                        key={index}
                        className="border-2 border-brutal-border p-3 sm:p-4 bg-white flex flex-col sm:flex-row sm:items-center gap-3"
                      >
                        {/* Day Selection */}
                        <div className="flex-1">
                          <label className="block text-xs font-bold mb-1 uppercase">Day</label>
                          <select
                            value={slot.dayOfWeek}
                            onChange={(e) => updateTimeSlot(index, 'dayOfWeek', parseInt(e.target.value))}
                            className="w-full px-3 py-2 border-2 border-brutal-border shadow-brutal-sm font-bold min-h-[44px]"
                          >
                            {DAYS_OF_WEEK.map((day, dayIndex) => (
                              <option key={dayIndex} value={dayIndex}>
                                {day}
                              </option>
                            ))}
                          </select>
                        </div>

                        {/* Start Time */}
                        <div className="flex-1">
                          <label className="block text-xs font-bold mb-1 uppercase">Start Time</label>
                          <select
                            value={slot.startTime}
                            onChange={(e) => updateTimeSlot(index, 'startTime', e.target.value)}
                            className="w-full px-3 py-2 border-2 border-brutal-border shadow-brutal-sm font-bold min-h-[44px]"
                          >
                            {TIME_OPTIONS.map((time) => (
                              <option key={time} value={time}>
                                {time}
                              </option>
                            ))}
                          </select>
                        </div>

                        {/* End Time */}
                        <div className="flex-1">
                          <label className="block text-xs font-bold mb-1 uppercase">End Time</label>
                          <select
                            value={slot.endTime}
                            onChange={(e) => updateTimeSlot(index, 'endTime', e.target.value)}
                            className="w-full px-3 py-2 border-2 border-brutal-border shadow-brutal-sm font-bold min-h-[44px]"
                          >
                            {TIME_OPTIONS.map((time) => (
                              <option key={time} value={time}>
                                {time}
                              </option>
                            ))}
                          </select>
                        </div>

                        {/* Delete Button */}
                        <button
                          onClick={() => removeTimeSlot(index)}
                          className="px-4 py-2 min-h-[44px] min-w-[44px] bg-red-500 text-white border-2 border-brutal-border shadow-brutal hover:shadow-brutal-lg transition-all font-bold uppercase text-sm flex items-center justify-center gap-2 sm:self-end"
                          title="Remove time slot"
                        >
                          <Trash2 className="w-4 h-4" />
                          <span className="sm:hidden">Remove</span>
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Save Button & Messages */}
            <div className="bg-white border-3 border-brutal-border shadow-brutal p-4 sm:p-6">
              <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="flex-1">
                  {saveMessage && (
                    <p
                      className={`font-bold ${
                        saveMessage.includes('Error') ? 'text-red-600' : 'text-green-600'
                      }`}
                    >
                      {saveMessage}
                    </p>
                  )}
                  <p className="text-sm text-gray-600">
                    All times are in Rwanda time (CAT/EAT, UTC+2)
                  </p>
                </div>
                <button
                  onClick={handleSave}
                  disabled={isSaving || timeSlots.length === 0}
                  className="w-full sm:w-auto px-8 py-3 min-h-[44px] bg-brutal-blue text-white border-3 border-brutal-border shadow-brutal hover:shadow-brutal-lg disabled:opacity-50 disabled:cursor-not-allowed transition-all font-black uppercase text-sm flex items-center justify-center gap-2"
                >
                  <Save className="w-5 h-5" />
                  {isSaving ? 'Saving...' : 'Save Availability'}
                </button>
              </div>
            </div>

            {/* Tips */}
            <div className="mt-6 bg-brutal-yellow border-3 border-brutal-border shadow-brutal p-4 sm:p-6">
              <h3 className="font-black text-lg mb-3 uppercase">Tips for Setting Availability</h3>
              <ul className="space-y-2 text-sm">
                <li className="flex items-start gap-2">
                  <span className="font-bold">✓</span>
                  <span>Set recurring weekly slots that work with your schedule</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="font-bold">✓</span>
                  <span>Consider peak times when students are likely to need mentorship (evenings, weekends)</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="font-bold">✓</span>
                  <span>Leave buffer time between sessions (recommended: 15 minutes)</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="font-bold">✓</span>
                  <span>Update your availability regularly to reflect any schedule changes</span>
                </li>
              </ul>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
