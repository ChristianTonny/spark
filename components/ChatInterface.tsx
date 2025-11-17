"use client";

import React, { useState, useEffect, useRef } from "react";
import { useQuery, useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import { Send, User } from "lucide-react";

interface ChatInterfaceProps {
  chatId: Id<"careerChats">;
  bookingInfo?: {
    otherPersonName: string;
    scheduledAt?: number;
    careerTitle?: string;
  };
}

export function ChatInterface({ chatId, bookingInfo }: ChatInterfaceProps) {
  const [messageText, setMessageText] = useState("");
  const [isSending, setIsSending] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const messages = useQuery(api.messages.list, { chatId });
  const sendMessage = useMutation(api.messages.send);
  const markAsRead = useMutation(api.messages.markAsRead);

  // Auto-scroll to bottom when new messages arrive
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // Mark messages as read when chat is opened
  useEffect(() => {
    if (messages && messages.length > 0) {
      markAsRead({ chatId }).catch(console.error);
    }
  }, [chatId, messages, markAsRead]);

  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!messageText.trim() || isSending) return;

    setIsSending(true);
    try {
      await sendMessage({
        chatId,
        content: messageText.trim(),
      });
      setMessageText("");
    } catch (error) {
      console.error("Error sending message:", error);
      alert("Failed to send message. Please try again.");
    } finally {
      setIsSending(false);
    }
  };

  const formatTime = (timestamp: number) => {
    return new Date(timestamp).toLocaleString("en-RW", {
      timeZone: "Africa/Kigali",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const formatDate = (timestamp: number) => {
    const date = new Date(timestamp);
    const today = new Date();
    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);

    if (date.toDateString() === today.toDateString()) {
      return "Today";
    } else if (date.toDateString() === yesterday.toDateString()) {
      return "Yesterday";
    } else {
      return date.toLocaleDateString("en-RW", {
        timeZone: "Africa/Kigali",
        month: "short",
        day: "numeric",
      });
    }
  };

  return (
    <div className="flex flex-col h-full">
      {/* Chat Header */}
      {bookingInfo && (
        <div className="border-b-3 border-black p-4 bg-white">
          <h3 className="font-black text-lg uppercase">
            {bookingInfo.otherPersonName}
          </h3>
          {bookingInfo.scheduledAt && (
            <p className="text-sm text-gray-600">
              Session: {new Date(bookingInfo.scheduledAt).toLocaleString("en-RW", {
                timeZone: "Africa/Kigali",
                dateStyle: "medium",
                timeStyle: "short",
              })}
            </p>
          )}
          {bookingInfo.careerTitle && (
            <p className="text-sm text-gray-600">Topic: {bookingInfo.careerTitle}</p>
          )}
        </div>
      )}

      {/* Messages Area */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50">
        {messages === undefined ? (
          <div className="text-center text-gray-500">Loading messages...</div>
        ) : messages.length === 0 ? (
          <div className="text-center text-gray-500 py-8">
            <p className="font-bold mb-2">No messages yet</p>
            <p className="text-sm">Start the conversation!</p>
          </div>
        ) : (
          <>
            {messages.map((message, index) => {
              const showDate =
                index === 0 ||
                formatDate(message.sentAt) !==
                  formatDate(messages[index - 1].sentAt);

              return (
                <div key={message._id}>
                  {/* Date Divider */}
                  {showDate && (
                    <div className="flex items-center justify-center my-4">
                      <div className="bg-gray-200 border-2 border-black px-3 py-1 text-xs font-bold uppercase">
                        {formatDate(message.sentAt)}
                      </div>
                    </div>
                  )}

                  {/* Message */}
                  {message.type === "system" ? (
                    <div className="flex justify-center">
                      <div className="bg-yellow-100 border-2 border-black px-4 py-2 text-sm text-center max-w-md">
                        {message.content}
                      </div>
                    </div>
                  ) : (
                    <div
                      className={`flex ${
                        message.isOwn ? "justify-end" : "justify-start"
                      }`}
                    >
                      <div
                        className={`max-w-[70%] ${
                          message.isOwn ? "items-end" : "items-start"
                        } flex flex-col gap-1`}
                      >
                        {!message.isOwn && (
                          <div className="flex items-center gap-2 px-2">
                            <div className="w-6 h-6 rounded-full border-2 border-black bg-gray-200 flex items-center justify-center overflow-hidden">
                              {message.sender?.avatar ? (
                                <img
                                  src={message.sender.avatar}
                                  alt={message.sender.name}
                                  className="w-full h-full object-cover"
                                />
                              ) : (
                                <User className="w-3 h-3" />
                              )}
                            </div>
                            <span className="text-xs font-bold">
                              {message.sender?.name}
                            </span>
                          </div>
                        )}
                        <div
                          className={`p-3 border-3 border-black ${
                            message.isOwn
                              ? "bg-brutal-blue text-white"
                              : "bg-white"
                          }`}
                        >
                          <p className="text-sm whitespace-pre-wrap break-words">
                            {message.content}
                          </p>
                        </div>
                        <span className="text-xs text-gray-500 px-2">
                          {formatTime(message.sentAt)}
                        </span>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
            <div ref={messagesEndRef} />
          </>
        )}
      </div>

      {/* Input Area */}
      <div className="border-t-3 border-black p-4 bg-white">
        <form onSubmit={handleSend} className="flex gap-2">
          <input
            type="text"
            value={messageText}
            onChange={(e) => setMessageText(e.target.value)}
            placeholder="Type your message..."
            className="flex-1 px-4 py-2 border-3 border-black focus:outline-none focus:ring-2 focus:ring-brutal-blue"
            disabled={isSending}
          />
          <button
            type="submit"
            disabled={!messageText.trim() || isSending}
            className="px-6 py-2 bg-brutal-blue text-white border-3 border-black shadow-brutal hover:shadow-brutal-lg disabled:opacity-50 disabled:cursor-not-allowed transition-all"
          >
            <Send className="w-5 h-5" />
          </button>
        </form>
      </div>
    </div>
  );
}
