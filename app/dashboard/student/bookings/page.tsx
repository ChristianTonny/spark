"use client";

import { useState } from "react";
import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import { BookingListItem } from "@/components/BookingListItem";
import { BookingStatusBadge } from "@/components/BookingStatusBadge";
import { ChatDrawer } from "@/components/ChatDrawer";
import { Calendar, Clock, CheckCircle, User } from "lucide-react";

type TabType = "pending" | "confirmed" | "past";

export default function StudentBookingsPage() {
  const [activeTab, setActiveTab] = useState<TabType>("pending");
  const [selectedChatId, setSelectedChatId] = useState<Id<"careerChats"> | null>(null);
  const [chatInfo, setChatInfo] = useState<{
    otherPersonName: string;
    scheduledAt?: number;
    careerTitle?: string;
  } | null>(null);

  const pendingBookings = useQuery(api.careerChats.getStudentBookings, {
    status: "pending",
  });
  const confirmedBookings = useQuery(api.careerChats.getStudentBookings, {
    status: "confirmed",
  });
  const completedBookings = useQuery(api.careerChats.getStudentBookings, {
    status: "completed",
  });

  const handleOpenChat = (
    chatId: Id<"careerChats">,
    booking: {
      mentor: { name: string } | null;
      scheduledAt?: number;
      career?: { title: string } | null;
    }
  ) => {
    setSelectedChatId(chatId);
    setChatInfo({
      otherPersonName: booking.mentor?.name || "Mentor",
      scheduledAt: booking.scheduledAt,
      careerTitle: booking.career?.title,
    });
  };

  const tabs: Array<{ key: TabType; label: string; icon: any }> = [
    { key: "pending", label: "Pending", icon: Clock },
    { key: "confirmed", label: "Confirmed", icon: CheckCircle },
    { key: "past", label: "Past Sessions", icon: Calendar },
  ];

  const isLoading =
    pendingBookings === undefined ||
    confirmedBookings === undefined ||
    completedBookings === undefined;

  const formatDate = (timestamp: number) => {
    return new Date(timestamp).toLocaleString("en-RW", {
      timeZone: "Africa/Kigali",
      weekday: "long",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-black uppercase mb-2">My Bookings</h1>
          <p className="text-lg text-gray-600">
            View and manage your mentor session bookings
          </p>
        </div>

        {/* Tabs */}
        <div className="border-3 border-black bg-white mb-6">
          <div className="flex border-b-3 border-black">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              const count =
                tab.key === "pending"
                  ? pendingBookings?.length || 0
                  : tab.key === "confirmed"
                  ? confirmedBookings?.length || 0
                  : completedBookings?.length || 0;

              return (
                <button
                  key={tab.key}
                  onClick={() => setActiveTab(tab.key)}
                  className={`flex-1 px-6 py-4 font-bold uppercase text-sm border-r-3 border-black last:border-r-0 transition-colors ${
                    activeTab === tab.key
                      ? "bg-brutal-blue text-white"
                      : "bg-white hover:bg-gray-50"
                  }`}
                >
                  <div className="flex items-center justify-center gap-2">
                    <Icon className="w-5 h-5" />
                    <span className="hidden sm:inline">{tab.label}</span>
                    {count > 0 && (
                      <span
                        className={`px-2 py-0.5 text-xs rounded-full border-2 ${
                          activeTab === tab.key
                            ? "bg-white text-black border-white"
                            : "bg-brutal-orange text-white border-black"
                        }`}
                      >
                        {count}
                      </span>
                    )}
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Content */}
        {isLoading ? (
          <div className="border-3 border-black p-8 bg-white text-center">
            <p className="font-bold">Loading bookings...</p>
          </div>
        ) : (
          <div className="space-y-4">
            {/* Pending Tab */}
            {activeTab === "pending" && (
              <>
                {pendingBookings && pendingBookings.length > 0 ? (
                  <>
                    <div className="bg-yellow-100 border-3 border-black p-4">
                      <p className="font-bold">
                        You have {pendingBookings.length} pending request
                        {pendingBookings.length !== 1 ? "s" : ""}
                      </p>
                      <p className="text-sm mt-1">
                        Waiting for mentor approval. You'll be notified when they
                        respond.
                      </p>
                    </div>
                    <div className="grid gap-4 sm:grid-cols-2">
                      {pendingBookings.map((booking) => (
                        <div
                          key={booking._id}
                          className="border-3 border-black bg-white shadow-brutal p-4"
                        >
                          <div className="flex items-start justify-between mb-4">
                            <div className="flex items-start gap-3 flex-1">
                              <div className="w-12 h-12 rounded-full border-2 border-black bg-gray-200 flex items-center justify-center overflow-hidden">
                                {booking.mentor?.avatar ? (
                                  <img
                                    src={booking.mentor.avatar}
                                    alt={booking.mentor.name}
                                    className="w-full h-full object-cover"
                                  />
                                ) : (
                                  <User className="w-6 h-6 text-gray-500" />
                                )}
                              </div>
                              <div>
                                <h3 className="font-black text-lg uppercase">
                                  {booking.mentor?.name || "Unknown"}
                                </h3>
                                {booking.mentor && (
                                  <p className="text-sm text-gray-600">
                                    {booking.mentor.title}
                                    {booking.mentor.company &&
                                      ` at ${booking.mentor.company}`}
                                  </p>
                                )}
                              </div>
                            </div>
                            <BookingStatusBadge status={booking.status} />
                          </div>

                          {booking.scheduledAt && (
                            <div className="text-sm space-y-1">
                              <div className="flex items-center gap-2">
                                <Calendar className="w-4 h-4 text-gray-600" />
                                <span>{formatDate(booking.scheduledAt)}</span>
                              </div>
                              <div className="flex items-center gap-2">
                                <Clock className="w-4 h-4 text-gray-600" />
                                <span>{booking.duration} minutes</span>
                              </div>
                            </div>
                          )}

                          {booking.career && (
                            <div className="mt-3 bg-gray-50 border-2 border-black p-2">
                              <p className="font-bold text-xs uppercase text-gray-600">
                                Topic:
                              </p>
                              <p className="font-bold">{booking.career.title}</p>
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  </>
                ) : (
                  <div className="border-3 border-black p-12 bg-white text-center">
                    <Clock className="w-16 h-16 mx-auto mb-4 text-gray-400" />
                    <h3 className="font-black text-xl mb-2">No pending requests</h3>
                    <p className="text-gray-600 mb-4">
                      You haven't requested any mentor sessions yet.
                    </p>
                    <a
                      href="/mentors"
                      className="inline-block px-6 py-3 bg-brutal-blue text-white font-bold uppercase border-3 border-black hover:bg-brutal-blue/90 transition-colors"
                    >
                      Browse Mentors
                    </a>
                  </div>
                )}
              </>
            )}

            {/* Confirmed Tab */}
            {activeTab === "confirmed" && (
              <>
                {confirmedBookings && confirmedBookings.length > 0 ? (
                  <div className="grid gap-4 sm:grid-cols-2">
                    {confirmedBookings.map((booking) => (
                      <BookingListItem
                        key={booking._id}
                        booking={booking}
                        userType="student"
                        onOpenChat={(chatId) => handleOpenChat(chatId, booking)}
                      />
                    ))}
                  </div>
                ) : (
                  <div className="border-3 border-black p-12 bg-white text-center">
                    <CheckCircle className="w-16 h-16 mx-auto mb-4 text-gray-400" />
                    <h3 className="font-black text-xl mb-2">
                      No confirmed bookings
                    </h3>
                    <p className="text-gray-600">
                      When mentors approve your requests, they'll appear here.
                    </p>
                  </div>
                )}
              </>
            )}

            {/* Past Tab */}
            {activeTab === "past" && (
              <>
                {completedBookings && completedBookings.length > 0 ? (
                  <div className="grid gap-4 sm:grid-cols-2">
                    {completedBookings.map((booking) => (
                      <BookingListItem
                        key={booking._id}
                        booking={booking}
                        userType="student"
                        onOpenChat={(chatId) => handleOpenChat(chatId, booking)}
                      />
                    ))}
                  </div>
                ) : (
                  <div className="border-3 border-black p-12 bg-white text-center">
                    <Calendar className="w-16 h-16 mx-auto mb-4 text-gray-400" />
                    <h3 className="font-black text-xl mb-2">No past sessions</h3>
                    <p className="text-gray-600">
                      Completed sessions will appear here.
                    </p>
                  </div>
                )}
              </>
            )}
          </div>
        )}

        {/* Back Button */}
        <div className="mt-8">
          <a
            href="/dashboard/student"
            className="inline-block px-6 py-3 border-3 border-black bg-white font-bold uppercase hover:bg-gray-100 transition-colors"
          >
            ← Back to Dashboard
          </a>
        </div>
      </div>

      {/* Chat Drawer */}
      <ChatDrawer
        isOpen={selectedChatId !== null}
        onClose={() => {
          setSelectedChatId(null);
          setChatInfo(null);
        }}
        chatId={selectedChatId}
        bookingInfo={chatInfo || undefined}
      />
    </div>
  );
}
