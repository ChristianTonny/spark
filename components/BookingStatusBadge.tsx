import React from "react";

type BookingStatus =
  | "pending"
  | "confirmed"
  | "scheduled"
  | "completed"
  | "cancelled"
  | "rejected"
  | "no_show";

interface BookingStatusBadgeProps {
  status: BookingStatus;
  className?: string;
}

export function BookingStatusBadge({
  status,
  className = "",
}: BookingStatusBadgeProps) {
  const statusConfig = {
    pending: {
      label: "Pending",
      bgColor: "bg-brutal-orange",
      textColor: "text-white",
    },
    confirmed: {
      label: "Confirmed",
      bgColor: "bg-brutal-green",
      textColor: "text-black",
    },
    scheduled: {
      label: "Scheduled",
      bgColor: "bg-brutal-blue",
      textColor: "text-white",
    },
    completed: {
      label: "Completed",
      bgColor: "bg-brutal-blue",
      textColor: "text-white",
    },
    cancelled: {
      label: "Cancelled",
      bgColor: "bg-red-500",
      textColor: "text-white",
    },
    rejected: {
      label: "Declined",
      bgColor: "bg-red-500",
      textColor: "text-white",
    },
    no_show: {
      label: "No Show",
      bgColor: "bg-gray-500",
      textColor: "text-white",
    },
  };

  const config = statusConfig[status];

  return (
    <span
      className={`inline-flex items-center px-3 py-1 text-xs font-black uppercase border-2 border-black ${config.bgColor} ${config.textColor} ${className}`}
    >
      {config.label}
    </span>
  );
}
