"use client";

import { useState } from "react";
import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import { BookingRequestCard } from "@/components/BookingRequestCard";
import { BookingListItem } from "@/components/BookingListItem";
import { ChatDrawer } from "@/components/ChatDrawer";
import { Calendar, Clock, CheckCircle } from "lucide-react";

type TabType = "pending" | "confirmed" | "past";

export default function MentorBookingsPage() {
  const [activeTab, setActiveTab] = useState<TabType>("pending");
  const [selectedChatId, setSelectedChatId] = useState<Id<"careerChats"> | null>(null);
  const [chatInfo, setChatInfo] = useState<{
    otherPersonName: string;
    scheduledAt?: number;
    careerTitle?: string;
  } | null>(null);

  const pendingBookings = useQuery(api.careerChats.getMentorBookings, {
    status: "pending",
  });
  const confirmedBookings = useQuery(api.careerChats.getMentorBookings, {
    status: "confirmed",
  });
  const completedBookings = useQuery(api.careerChats.getMentorBookings, {
    status: "completed",
  });

  const handleOpenChat = (
    chatId: Id<"careerChats">,
    booking: {
      student: { name: string } | null;
      scheduledAt?: number;
      career?: { title: string } | null;
    }
  ) => {
    setSelectedChatId(chatId);
    setChatInfo({
      otherPersonName: booking.student?.name || "Student",
      scheduledAt: booking.scheduledAt,
      careerTitle: booking.career?.title,
    });
  };

  const tabs: Array<{ key: TabType; label: string; icon: any }> = [
    { key: "pending", label: "Pending Requests", icon: Clock },
    { key: "confirmed", label: "Confirmed", icon: CheckCircle },
    { key: "past", label: "Past Sessions", icon: Calendar },
  ];

  const isLoading =
    pendingBookings === undefined ||
    confirmedBookings === undefined ||
    completedBookings === undefined;

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-black uppercase mb-2">
            Booking Requests
          </h1>
          <p className="text-lg text-gray-600">
            Manage your mentoring session bookings
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
                    <span>{tab.label}</span>
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
                        Review and approve or decline each booking request below.
                      </p>
                    </div>
                    <div className="grid gap-4">
                      {pendingBookings.map((booking) => (
                        <BookingRequestCard
                          key={booking._id}
                          booking={booking}
                        />
                      ))}
                    </div>
                  </>
                ) : (
                  <div className="border-3 border-black p-12 bg-white text-center">
                    <Clock className="w-16 h-16 mx-auto mb-4 text-gray-400" />
                    <h3 className="font-black text-xl mb-2">
                      No pending requests
                    </h3>
                    <p className="text-gray-600">
                      When students request bookings, they'll appear here.
                    </p>
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
                        userType="mentor"
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
                      Approved sessions will appear here.
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
                        userType="mentor"
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
            href="/dashboard/mentor"
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
