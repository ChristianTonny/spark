'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import {
  Calendar, Clock, User, Video, ArrowLeft,
  CheckCircle, XCircle, AlertCircle, ExternalLink,
  ChevronDown, ChevronUp, Mail, Star
} from 'lucide-react';
import { useQuery } from 'convex/react';
import { api } from '../../../../convex/_generated/api';
import { useRoleGuard } from '../../../../lib/hooks/useRoleGuard';

type SessionStatus = 'scheduled' | 'completed' | 'cancelled' | 'no_show';

interface SessionDetailProps {
  session: any;
  onClose: () => void;
}

function SessionDetailModal({ session, onClose }: SessionDetailProps) {
  const formatDate = (timestamp: number) => {
    return new Date(timestamp).toLocaleDateString('en-RW', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  const formatTime = (timestamp: number) => {
    return new Date(timestamp).toLocaleTimeString('en-RW', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: false,
    });
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white border-3 border-brutal-border shadow-brutal-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="bg-brutal-blue text-white p-4 sm:p-6 border-b-3 border-brutal-border">
          <div className="flex justify-between items-start">
            <div>
              <h2 className="text-2xl sm:text-3xl font-black mb-2">Session Details</h2>
              <p className="text-sm sm:text-base opacity-90">
                {formatDate(session.scheduledAt)} at {formatTime(session.scheduledAt)}
              </p>
            </div>
            <button
              onClick={onClose}
              className="p-2 hover:bg-white/20 transition-colors min-h-[44px] min-w-[44px] flex items-center justify-center"
              aria-label="Close"
            >
              <XCircle className="w-6 h-6" />
            </button>
          </div>
        </div>

        <div className="p-4 sm:p-6 space-y-6">
          {/* Student Info */}
          <div className="border-3 border-brutal-border shadow-brutal p-4">
            <h3 className="font-black text-lg mb-3 uppercase">Student Information</h3>
            {session.student ? (
              <div className="flex items-start gap-4">
                <div className="w-16 h-16 bg-brutal-blue border-3 border-brutal-border shadow-brutal flex-shrink-0 overflow-hidden">
                  {session.student.avatar ? (
                    <img
                      src={session.student.avatar}
                      alt={session.student.name}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-white text-xl font-black">
                      {session.student.name.split(' ').map((n: string) => n[0]).join('')}
                    </div>
                  )}
                </div>
                <div className="flex-1">
                  <p className="font-bold text-lg">{session.student.name}</p>
                  <p className="text-gray-600">{session.student.email}</p>
                  <div className="flex flex-wrap gap-2 mt-2">
                    <span className="px-3 py-1 bg-brutal-yellow border-2 border-brutal-border shadow-brutal-sm text-xs font-bold">
                      {session.student.gradeLevel}
                    </span>
                    {session.student.school && (
                      <span className="px-3 py-1 bg-brutal-green border-2 border-brutal-border shadow-brutal-sm text-xs font-bold">
                        {session.student.school}
                      </span>
                    )}
                  </div>
                </div>
              </div>
            ) : (
              <p className="text-gray-500">Student information not available</p>
            )}
          </div>

          {/* Career Topic */}
          <div className="border-3 border-brutal-border shadow-brutal p-4">
            <h3 className="font-black text-lg mb-3 uppercase">Career Discussion</h3>
            {session.career ? (
              <div>
                <p className="font-bold text-xl mb-1">{session.career.title}</p>
                <p className="text-gray-600">{session.career.category}</p>
              </div>
            ) : (
              <p className="text-gray-500">Career information not available</p>
            )}
          </div>

          {/* Session Details */}
          <div className="border-3 border-brutal-border shadow-brutal p-4">
            <h3 className="font-black text-lg mb-3 uppercase">Session Details</h3>
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <Clock className="w-5 h-5 text-gray-600" />
                <span className="font-bold">Duration:</span>
                <span>{session.duration} minutes</span>
              </div>
              <div className="flex items-center gap-2">
                <Calendar className="w-5 h-5 text-gray-600" />
                <span className="font-bold">Date:</span>
                <span>{formatDate(session.scheduledAt)}</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-5 h-5 text-gray-600" />
                <span className="font-bold">Time:</span>
                <span>{formatTime(session.scheduledAt)}</span>
              </div>
            </div>
          </div>

          {/* Meeting Link */}
          {session.meetingUrl && session.status === 'scheduled' && (
            <a
              href={session.meetingUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="block w-full py-3 px-4 bg-brutal-green border-3 border-brutal-border shadow-brutal hover:shadow-brutal-lg transition-all font-black uppercase text-center flex items-center justify-center gap-2"
            >
              <Video className="w-5 h-5" />
              Join Meeting
              <ExternalLink className="w-4 h-4" />
            </a>
          )}

          {/* Rating & Feedback (for completed sessions) */}
          {session.status === 'completed' && (
            <div className="border-3 border-brutal-border shadow-brutal p-4">
              <h3 className="font-black text-lg mb-3 uppercase">Student Feedback</h3>
              {session.rating && (
                <div className="flex items-center gap-2 mb-2">
                  <Star className="w-5 h-5 text-brutal-yellow fill-current" />
                  <span className="font-bold">{session.rating}/5</span>
                </div>
              )}
              {session.feedback && (
                <p className="text-gray-700 italic">"{session.feedback}"</p>
              )}
              {!session.rating && !session.feedback && (
                <p className="text-gray-500">No feedback provided yet</p>
              )}
            </div>
          )}

          {/* Close Button */}
          <button
            onClick={onClose}
            className="w-full py-3 px-4 bg-white border-3 border-brutal-border shadow-brutal hover:shadow-brutal-lg transition-all font-black uppercase"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}

function SessionCard({ session, onClick }: { session: any; onClick: () => void }) {
  const getStatusBadge = (status: SessionStatus) => {
    switch (status) {
      case 'scheduled':
        return (
          <span className="px-3 py-1 bg-brutal-blue text-white border-2 border-brutal-border shadow-brutal-sm text-xs font-bold uppercase">
            Scheduled
          </span>
        );
      case 'completed':
        return (
          <span className="px-3 py-1 bg-brutal-green text-white border-2 border-brutal-border shadow-brutal-sm text-xs font-bold uppercase flex items-center gap-1">
            <CheckCircle className="w-4 h-4" />
            Completed
          </span>
        );
      case 'cancelled':
        return (
          <span className="px-3 py-1 bg-brutal-orange text-white border-2 border-brutal-border shadow-brutal-sm text-xs font-bold uppercase flex items-center gap-1">
            <XCircle className="w-4 h-4" />
            Cancelled
          </span>
        );
      case 'no_show':
        return (
          <span className="px-3 py-1 bg-red-500 text-white border-2 border-brutal-border shadow-brutal-sm text-xs font-bold uppercase flex items-center gap-1">
            <AlertCircle className="w-4 h-4" />
            No Show
          </span>
        );
    }
  };

  const formatDate = (timestamp: number) => {
    return new Date(timestamp).toLocaleDateString('en-RW', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    });
  };

  const formatTime = (timestamp: number) => {
    return new Date(timestamp).toLocaleTimeString('en-RW', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: false,
    });
  };

  return (
    <div
      onClick={onClick}
      className="bg-white border-3 border-brutal-border shadow-brutal hover:shadow-brutal-lg transition-all cursor-pointer p-4"
    >
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-3">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 bg-brutal-blue border-2 border-brutal-border shadow-brutal flex-shrink-0 overflow-hidden">
            {session.student?.avatar ? (
              <img
                src={session.student.avatar}
                alt={session.student.name}
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-white text-sm font-black">
                {session.student?.name.split(' ').map((n: string) => n[0]).join('') || '?'}
              </div>
            )}
          </div>
          <div>
            <p className="font-bold text-lg">{session.student?.name || 'Unknown Student'}</p>
            <p className="text-sm text-gray-600">{session.student?.gradeLevel}</p>
          </div>
        </div>
        {getStatusBadge(session.status)}
      </div>

      <div className="space-y-2">
        <div className="flex items-center gap-2 text-gray-700">
          <User className="w-4 h-4" />
          <span className="font-bold">{session.career?.title || 'Career discussion'}</span>
        </div>
        <div className="flex items-center gap-2 text-gray-700">
          <Calendar className="w-4 h-4" />
          <span>{formatDate(session.scheduledAt)}</span>
          <Clock className="w-4 h-4 ml-2" />
          <span>{formatTime(session.scheduledAt)}</span>
        </div>
        {session.status === 'completed' && session.rating && (
          <div className="flex items-center gap-2 text-gray-700">
            <Star className="w-4 h-4 text-brutal-yellow fill-current" />
            <span className="font-bold">{session.rating}/5</span>
          </div>
        )}
      </div>

      {session.meetingUrl && session.status === 'scheduled' && (
        <div className="mt-3 pt-3 border-t-2 border-gray-200">
          <div className="flex items-center gap-2 text-brutal-blue font-bold text-sm">
            <Video className="w-4 h-4" />
            <span>Meeting link available</span>
          </div>
        </div>
      )}
    </div>
  );
}

export default function MentorSessionsPage() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<'upcoming' | 'past'>('upcoming');
  const [selectedSession, setSelectedSession] = useState<any | null>(null);

  // Protect this page - only mentors can access
  useRoleGuard(['mentor']);

  // Fetch sessions
  const upcomingSessions = useQuery(api.professionals.getMentorUpcomingSessions);
  const pastSessions = useQuery(api.professionals.getMentorPastSessions);

  const isLoading = upcomingSessions === undefined || pastSessions === undefined;

  return (
    <div className="min-h-screen bg-gray-50 py-4 sm:py-8">
      <div className="container mx-auto px-4 max-w-6xl">
        {/* Header */}
        <div className="mb-6 sm:mb-8">
          <Link
            href="/dashboard/mentor"
            className="inline-flex items-center gap-2 text-brutal-blue hover:underline mb-4 font-bold min-h-[44px]"
          >
            <ArrowLeft className="w-5 h-5" />
            Back to Dashboard
          </Link>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-black mb-2">My Sessions</h1>
          <p className="text-base sm:text-lg text-gray-700">
            Manage your mentorship sessions with students
          </p>
        </div>

        {/* Tab Navigation */}
        <div className="mb-6 border-b-3 border-brutal-border">
          <div className="flex gap-2 sm:gap-4">
            <button
              onClick={() => setActiveTab('upcoming')}
              className={`px-4 sm:px-6 py-3 font-black uppercase text-sm sm:text-base min-h-[44px] transition-all ${
                activeTab === 'upcoming'
                  ? 'bg-brutal-blue text-white border-3 border-brutal-border shadow-brutal'
                  : 'bg-white text-gray-700 border-3 border-transparent hover:border-brutal-border'
              }`}
            >
              Upcoming
              {upcomingSessions && upcomingSessions.length > 0 && (
                <span className="ml-2 px-2 py-1 bg-white text-brutal-blue rounded-full text-xs">
                  {upcomingSessions.length}
                </span>
              )}
            </button>
            <button
              onClick={() => setActiveTab('past')}
              className={`px-4 sm:px-6 py-3 font-black uppercase text-sm sm:text-base min-h-[44px] transition-all ${
                activeTab === 'past'
                  ? 'bg-brutal-blue text-white border-3 border-brutal-border shadow-brutal'
                  : 'bg-white text-gray-700 border-3 border-transparent hover:border-brutal-border'
              }`}
            >
              Past Sessions
            </button>
          </div>
        </div>

        {/* Loading State */}
        {isLoading && (
          <div className="text-center py-12">
            <div className="animate-pulse">
              <h2 className="text-2xl font-black mb-2">Loading sessions...</h2>
              <p className="text-gray-600">Please wait</p>
            </div>
          </div>
        )}

        {/* Upcoming Sessions Tab */}
        {!isLoading && activeTab === 'upcoming' && (
          <div>
            {upcomingSessions && upcomingSessions.length > 0 ? (
              <div className="grid gap-4 sm:gap-6">
                {upcomingSessions.map((session) => (
                  <SessionCard
                    key={session._id}
                    session={session}
                    onClick={() => setSelectedSession(session)}
                  />
                ))}
              </div>
            ) : (
              <div className="bg-white border-3 border-brutal-border shadow-brutal p-8 sm:p-12 text-center">
                <Calendar className="w-16 h-16 mx-auto mb-4 text-gray-400" />
                <h2 className="text-2xl font-black mb-2">No Upcoming Sessions</h2>
                <p className="text-gray-600 mb-6">
                  You don't have any scheduled sessions yet. Students can book sessions with you through your mentor profile.
                </p>
                <Link
                  href="/dashboard/mentor/availability"
                  className="inline-block px-6 py-3 bg-brutal-blue text-white border-3 border-brutal-border shadow-brutal hover:shadow-brutal-lg transition-all font-black uppercase"
                >
                  Set Your Availability
                </Link>
              </div>
            )}
          </div>
        )}

        {/* Past Sessions Tab */}
        {!isLoading && activeTab === 'past' && (
          <div>
            {pastSessions && pastSessions.length > 0 ? (
              <div className="grid gap-4 sm:gap-6">
                {pastSessions.map((session) => (
                  <SessionCard
                    key={session._id}
                    session={session}
                    onClick={() => setSelectedSession(session)}
                  />
                ))}
              </div>
            ) : (
              <div className="bg-white border-3 border-brutal-border shadow-brutal p-8 sm:p-12 text-center">
                <CheckCircle className="w-16 h-16 mx-auto mb-4 text-gray-400" />
                <h2 className="text-2xl font-black mb-2">No Past Sessions</h2>
                <p className="text-gray-600">
                  You haven't completed any mentorship sessions yet. Once you complete sessions, they'll appear here.
                </p>
              </div>
            )}
          </div>
        )}

        {/* Session Detail Modal */}
        {selectedSession && (
          <SessionDetailModal
            session={selectedSession}
            onClose={() => setSelectedSession(null)}
          />
        )}
      </div>
    </div>
  );
}
