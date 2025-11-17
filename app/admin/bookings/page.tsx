"use client";

import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import { Calendar, User, Clock, CheckCircle, XCircle, AlertCircle } from "lucide-react";

export default function AdminBookingsPage() {
  const allBookings = useQuery(api.careerChats.listAll);

  if (allBookings === undefined) {
    return (
      <div className="p-8">
        <div className="animate-pulse space-y-4">
          <div className="h-12 bg-gray-200 rounded w-1/3"></div>
          <div className="h-64 bg-gray-200 rounded"></div>
        </div>
      </div>
    );
  }

  const pendingBookings = allBookings?.filter((b) => b.status === "pending") || [];
  const confirmedBookings = allBookings?.filter((b) => b.status === "confirmed") || [];
  const completedBookings = allBookings?.filter((b) => b.status === "completed") || [];
  const cancelledBookings = allBookings?.filter((b) => b.status === "cancelled") || [];

  return (
    <div className="p-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-4xl font-black uppercase mb-2">Bookings Management</h1>
        <p className="text-gray-600">View and manage all platform bookings</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
        <StatCard
          title="Total Bookings"
          value={allBookings.length}
          icon={Calendar}
          color="bg-brutal-blue"
        />
        <StatCard
          title="Pending"
          value={pendingBookings.length}
          icon={Clock}
          color="bg-brutal-orange"
        />
        <StatCard
          title="Confirmed"
          value={confirmedBookings.length}
          icon={CheckCircle}
          color="bg-brutal-green"
        />
        <StatCard
          title="Completed"
          value={completedBookings.length}
          icon={CheckCircle}
          color="bg-brutal-purple"
        />
      </div>

      {/* Bookings Table */}
      <div className="border-3 border-black shadow-brutal bg-white overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-black text-white">
              <tr>
                <th className="px-6 py-4 text-left font-black uppercase text-sm">
                  Date
                </th>
                <th className="px-6 py-4 text-left font-black uppercase text-sm">
                  Student
                </th>
                <th className="px-6 py-4 text-left font-black uppercase text-sm">
                  Mentor
                </th>
                <th className="px-6 py-4 text-left font-black uppercase text-sm">
                  Status
                </th>
                <th className="px-6 py-4 text-left font-black uppercase text-sm">
                  Rating
                </th>
              </tr>
            </thead>
            <tbody className="divide-y-2 divide-black">
              {allBookings.length === 0 ? (
                <tr>
                  <td colSpan={5} className="px-6 py-12 text-center text-gray-500">
                    <Calendar className="w-12 h-12 mx-auto mb-3 opacity-30" />
                    <p className="font-bold uppercase">No bookings found</p>
                  </td>
                </tr>
              ) : (
                allBookings.map((booking) => (
                  <BookingRow key={booking._id} booking={booking} />
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

function StatCard({
  title,
  value,
  icon: Icon,
  color,
}: {
  title: string;
  value: number;
  icon: any;
  color: string;
}) {
  return (
    <div className={`${color} border-3 border-black shadow-brutal p-6 text-white`}>
      <div className="flex items-start justify-between mb-4">
        <Icon className="w-8 h-8" />
      </div>
      <div className="text-3xl font-black mb-1">{value}</div>
      <div className="text-sm font-bold uppercase">{title}</div>
    </div>
  );
}

function BookingRow({ booking }: { booking: any }) {
  const getStatusColor = (status: string) => {
    switch (status) {
      case "pending":
        return "bg-brutal-orange";
      case "confirmed":
        return "bg-brutal-green";
      case "completed":
        return "bg-brutal-purple";
      case "cancelled":
        return "bg-red-500";
      default:
        return "bg-gray-500";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "pending":
        return <Clock className="w-4 h-4" />;
      case "confirmed":
        return <CheckCircle className="w-4 h-4" />;
      case "completed":
        return <CheckCircle className="w-4 h-4" />;
      case "cancelled":
        return <XCircle className="w-4 h-4" />;
      default:
        return <AlertCircle className="w-4 h-4" />;
    }
  };

  const formatDate = (timestamp: number) => {
    return new Date(timestamp).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <tr className="hover:bg-gray-50 transition-colors">
      <td className="px-6 py-4">
        <div className="flex items-center gap-2 text-sm font-medium">
          <Calendar className="w-4 h-4 text-gray-400" />
          {formatDate(booking.requestedAt)}
        </div>
      </td>
      <td className="px-6 py-4">
        <div className="font-medium">Student ID: {booking.studentId}</div>
      </td>
      <td className="px-6 py-4">
        <div className="font-medium">Mentor ID: {booking.professionalId}</div>
      </td>
      <td className="px-6 py-4">
        <span
          className={`${getStatusColor(
            booking.status
          )} text-white px-3 py-1 text-xs font-bold uppercase border-2 border-black inline-flex items-center gap-1`}
        >
          {getStatusIcon(booking.status)}
          {booking.status}
        </span>
      </td>
      <td className="px-6 py-4">
        {booking.rating ? (
          <div className="flex items-center gap-1">
            <span className="font-bold">{booking.rating}</span>
            <span className="text-gray-500">/ 5</span>
          </div>
        ) : (
          <span className="text-gray-400">Not rated</span>
        )}
      </td>
    </tr>
  );
}
