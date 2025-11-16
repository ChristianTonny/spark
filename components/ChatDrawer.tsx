"use client";

import React, { useEffect } from "react";
import { X } from "lucide-react";
import { ChatInterface } from "./ChatInterface";
import { Id } from "@/convex/_generated/dataModel";

interface ChatDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  chatId: Id<"careerChats"> | null;
  bookingInfo?: {
    otherPersonName: string;
    scheduledAt?: number;
    careerTitle?: string;
  };
}

export function ChatDrawer({
  isOpen,
  onClose,
  chatId,
  bookingInfo,
}: ChatDrawerProps) {
  // Close on escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener("keydown", handleEscape);
      // Prevent body scroll when drawer is open
      document.body.style.overflow = "hidden";
    }

    return () => {
      document.removeEventListener("keydown", handleEscape);
      document.body.style.overflow = "unset";
    };
  }, [isOpen, onClose]);

  if (!isOpen || !chatId) return null;

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/50 z-40 transition-opacity"
        onClick={onClose}
      />

      {/* Drawer */}
      <div
        className={`fixed right-0 top-0 h-full w-full sm:w-[500px] bg-white border-l-3 border-black z-50 transform transition-transform duration-300 ${
          isOpen ? "translate-x-0" : "translate-x-full"
        } flex flex-col`}
      >
        {/* Drawer Header */}
        <div className="flex items-center justify-between p-4 border-b-3 border-black bg-white">
          <h2 className="font-black text-xl uppercase">Chat</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 border-2 border-black transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Chat Interface */}
        <div className="flex-1 overflow-hidden">
          <ChatInterface chatId={chatId} bookingInfo={bookingInfo} />
        </div>
      </div>
    </>
  );
}
