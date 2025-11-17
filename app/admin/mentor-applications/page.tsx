"use client";

import { useState } from "react";
import { useQuery, useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import {
  CheckCircle,
  XCircle,
  Clock,
  Mail,
  Phone,
  Briefcase,
  Calendar,
  Target,
  Linkedin,
  ChevronDown,
  ChevronUp,
} from "lucide-react";

type ApplicationStatus = "pending" | "approved" | "rejected";

export default function MentorApplicationsPage() {
  const [activeTab, setActiveTab] = useState<ApplicationStatus>("approved");
  const [expandedId, setExpandedId] = useState<Id<"mentorApplications"> | null>(null);

  const allApplications = useQuery(api.admin.getAllApplications, {});

  // Filter applications based on active tab
  const applications = allApplications?.filter((app) => app.status === activeTab);

  const approveApplication = useMutation(api.admin.approveApplication);
  const rejectApplication = useMutation(api.admin.rejectApplication);

  const [approving, setApproving] = useState<Id<"mentorApplications"> | null>(null);
  const [rejecting, setRejecting] = useState<Id<"mentorApplications"> | null>(null);

  const handleApprove = async (applicationId: Id<"mentorApplications">) => {
    if (!confirm("Are you sure you want to approve this mentor application?")) {
      return;
    }

    setApproving(applicationId);
    try {
      await approveApplication({ applicationId });
      alert("Application approved successfully! Mentor account has been created.");
    } catch (error: any) {
      alert(`Failed to approve: ${error.message}`);
    } finally {
      setApproving(null);
    }
  };

  const handleReject = async (applicationId: Id<"mentorApplications">) => {
    const notes = prompt("Please provide a reason for rejection (will be sent to applicant):");
    if (!notes) return;

    setRejecting(applicationId);
    try {
      await rejectApplication({ applicationId, notes });
      alert("Application rejected.");
    } catch (error: any) {
      alert(`Failed to reject: ${error.message}`);
    } finally {
      setRejecting(null);
    }
  };

  const toggleExpand = (id: Id<"mentorApplications">) => {
    setExpandedId(expandedId === id ? null : id);
  };

  if (allApplications === undefined) {
    return (
      <div className="p-8">
        <div className="animate-pulse space-y-4">
          <div className="h-12 bg-gray-200 rounded w-1/3"></div>
          <div className="h-64 bg-gray-200 rounded"></div>
        </div>
      </div>
    );
  }

  const tabs: { key: ApplicationStatus; label: string; count: number }[] = [
    { key: "pending", label: "Pending", count: allApplications?.filter(a => a.status === "pending").length || 0 },
    { key: "approved", label: "Approved", count: allApplications?.filter(a => a.status === "approved").length || 0 },
    { key: "rejected", label: "Rejected", count: allApplications?.filter(a => a.status === "rejected").length || 0 },
  ];

  return (
    <div className="p-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-4xl font-black uppercase mb-2">Mentor Applications</h1>
        <p className="text-gray-600">Review and approve mentor applications</p>
      </div>

      {/* Tabs */}
      <div className="flex gap-2 mb-6 border-b-3 border-black">
        {tabs.map((tab) => (
          <button
            key={tab.key}
            onClick={() => setActiveTab(tab.key)}
            className={`
              px-6 py-3 font-bold uppercase border-3 border-black transition-all
              ${
                activeTab === tab.key
                  ? "bg-black text-white -mb-[3px]"
                  : "bg-white text-black hover:bg-gray-100"
              }
            `}
          >
            {tab.label}
            <span
              className={`ml-2 px-2 py-1 text-xs ${
                activeTab === tab.key ? "bg-white text-black" : "bg-gray-200"
              }`}
            >
              {tab.count}
            </span>
          </button>
        ))}
      </div>

      {/* Applications List */}
      <div className="space-y-4">
        {!applications || applications.length === 0 ? (
          <div className="border-3 border-black shadow-brutal p-12 text-center bg-white">
            <p className="text-gray-500 font-bold uppercase">
              No {activeTab} applications
            </p>
          </div>
        ) : (
          applications.map((app) => (
            <ApplicationCard
              key={app._id}
              application={app}
              isExpanded={expandedId === app._id}
              onToggleExpand={() => toggleExpand(app._id)}
              onApprove={() => handleApprove(app._id)}
              onReject={() => handleReject(app._id)}
              isApproving={approving === app._id}
              isRejecting={rejecting === app._id}
            />
          ))
        )}
      </div>
    </div>
  );
}

function ApplicationCard({
  application,
  isExpanded,
  onToggleExpand,
  onApprove,
  onReject,
  isApproving,
  isRejecting,
}: {
  application: any;
  isExpanded: boolean;
  onToggleExpand: () => void;
  onApprove: () => void;
  onReject: () => void;
  isApproving: boolean;
  isRejecting: boolean;
}) {
  const formatDate = (timestamp: number) => {
    return new Date(timestamp).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  const getStatusColor = () => {
    switch (application.status) {
      case "pending":
        return "bg-brutal-orange";
      case "approved":
        return "bg-brutal-green";
      case "rejected":
        return "bg-red-500";
      default:
        return "bg-gray-500";
    }
  };

  return (
    <div className="border-3 border-black shadow-brutal bg-white">
      {/* Header */}
      <div className="p-6">
        <div className="flex items-start justify-between mb-4">
          <div className="flex-1">
            <div className="flex items-center gap-3 mb-2">
              <h3 className="text-2xl font-black uppercase">{application.fullName}</h3>
              <span
                className={`${getStatusColor()} text-white text-xs font-bold uppercase px-3 py-1 border-2 border-black`}
              >
                {application.status}
              </span>
            </div>
            <p className="text-lg font-bold text-gray-700">
              {application.currentRole} at {application.company}
            </p>
            <p className="text-sm text-gray-600">
              {application.yearsExperience} experience • {application.industry}
            </p>
          </div>
          <button
            onClick={onToggleExpand}
            className="p-2 hover:bg-gray-100 border-2 border-black transition-all"
          >
            {isExpanded ? (
              <ChevronUp className="w-5 h-5" />
            ) : (
              <ChevronDown className="w-5 h-5" />
            )}
          </button>
        </div>

        {/* Quick Info */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
          <div className="flex items-center gap-2 text-sm">
            <Mail className="w-4 h-4 text-gray-500" />
            <span className="truncate">{application.email}</span>
          </div>
          <div className="flex items-center gap-2 text-sm">
            <Phone className="w-4 h-4 text-gray-500" />
            <span>{application.phone}</span>
          </div>
          <div className="flex items-center gap-2 text-sm">
            <Calendar className="w-4 h-4 text-gray-500" />
            <span>Applied {formatDate(application.submittedAt)}</span>
          </div>
          <div className="flex items-center gap-2 text-sm">
            <Briefcase className="w-4 h-4 text-gray-500" />
            <span>{application.careerField}</span>
          </div>
        </div>

        {/* Expanded Details */}
        {isExpanded && (
          <div className="border-t-2 border-black pt-4 mt-4 space-y-4">
            {/* LinkedIn */}
            {application.linkedin && (
              <div>
                <label className="block text-sm font-bold uppercase mb-1 flex items-center gap-2">
                  <Linkedin className="w-4 h-4" />
                  LinkedIn Profile
                </label>
                <a
                  href={application.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-brutal-blue underline font-medium"
                >
                  {application.linkedin}
                </a>
              </div>
            )}

            {/* Motivation */}
            <div>
              <label className="block text-sm font-bold uppercase mb-1">
                Why They Want to Mentor
              </label>
              <p className="text-gray-700 bg-gray-50 p-4 border-2 border-gray-200">
                {application.motivation}
              </p>
            </div>

            {/* Availability & Commitment */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-bold uppercase mb-1">
                  Availability
                </label>
                <p className="text-gray-700 bg-gray-50 p-3 border-2 border-gray-200">
                  {application.availability}
                </p>
              </div>
              <div>
                <label className="block text-sm font-bold uppercase mb-1">
                  Sessions Per Month
                </label>
                <p className="text-gray-700 bg-gray-50 p-3 border-2 border-gray-200">
                  {application.sessionsPerMonth}
                </p>
              </div>
            </div>

            {/* Focus Areas */}
            <div>
              <label className="block text-sm font-bold uppercase mb-2 flex items-center gap-2">
                <Target className="w-4 h-4" />
                Focus Areas
              </label>
              <div className="flex flex-wrap gap-2">
                {application.focusAreas.map((area: string) => (
                  <span
                    key={area}
                    className="px-3 py-1 bg-brutal-yellow text-black text-sm font-bold border-2 border-black"
                  >
                    {area}
                  </span>
                ))}
              </div>
            </div>

            {/* Review Notes (if rejected or approved) */}
            {application.reviewNotes && (
              <div>
                <label className="block text-sm font-bold uppercase mb-1">
                  Review Notes
                </label>
                <p className="text-gray-700 bg-gray-50 p-4 border-2 border-gray-200">
                  {application.reviewNotes}
                </p>
                {application.reviewedAt && (
                  <p className="text-xs text-gray-500 mt-1">
                    Reviewed on {formatDate(application.reviewedAt)}
                  </p>
                )}
              </div>
            )}
          </div>
        )}

        {/* Actions (only for pending) */}
        {application.status === "pending" && (
          <div className="flex gap-4 mt-6 pt-4 border-t-2 border-black">
            <button
              onClick={onApprove}
              disabled={isApproving || isRejecting}
              className="flex-1 px-6 py-3 bg-brutal-green text-white font-bold uppercase border-3 border-black shadow-brutal hover:shadow-brutal-lg hover:translate-x-[-2px] hover:translate-y-[-2px] transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              <CheckCircle className="w-5 h-5" />
              {isApproving ? "Approving..." : "Approve"}
            </button>
            <button
              onClick={onReject}
              disabled={isApproving || isRejecting}
              className="flex-1 px-6 py-3 bg-red-500 text-white font-bold uppercase border-3 border-black shadow-brutal hover:shadow-brutal-lg hover:translate-x-[-2px] hover:translate-y-[-2px] transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              <XCircle className="w-5 h-5" />
              {isRejecting ? "Rejecting..." : "Reject"}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
