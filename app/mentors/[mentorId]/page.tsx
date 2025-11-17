'use client';

import Link from 'next/link';
import { ArrowLeft, Star, Calendar, MessageCircle, Briefcase, Award, Edit2, Trash2, CheckCircle, Clock, AlertCircle } from 'lucide-react';
import { useQuery, useMutation } from 'convex/react';
import { api } from '@/convex/_generated/api';
import { Id } from '@/convex/_generated/dataModel';
import { BookingModal } from '@/components/BookingModal';
import { RatingModal } from '@/components/RatingModal';
import { ChatDrawer } from '@/components/ChatDrawer';
import { useState } from 'react';
import { useConvexAuth } from '@/lib/hooks/useConvexAuth';

export default function MentorProfilePage({
  params,
}: {
  params: { mentorId: string };
}) {
  const mentorUserId = params.mentorId as Id<"users">;

  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);
  const [isRatingModalOpen, setIsRatingModalOpen] = useState(false);
  const [isChatDrawerOpen, setIsChatDrawerOpen] = useState(false);
  const [selectedChatId, setSelectedChatId] = useState<Id<"careerChats"> | null>(null);
  const [selectedSession, setSelectedSession] = useState<{
    chatId: Id<"careerChats">;
    mentorName: string;
    sessionDate?: number;
    existingRating?: number;
    existingFeedback?: string;
    isEditing: boolean;
  } | null>(null);

  const { user } = useConvexAuth();

  const mentor = useQuery(api.professionals.getMentorProfile, { userId: mentorUserId });
  const studentSessions = useQuery(
    api.careerChats.getStudentSessionsWithMentor,
    user ? { mentorUserId } : "skip"
  );

  const deleteRating = useMutation(api.careerChats.deleteRating);
  const completeSession = useMutation(api.careerChats.completeSession);

  if (mentor === undefined) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="animate-pulse text-2xl font-black">Loading mentor profile...</div>
      </div>
    );
  }

  if (mentor === null) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-black mb-4">Mentor Not Found</h1>
          <Link href="/mentors">
            <button className="px-6 py-3 bg-primary text-white font-bold uppercase border-3 border-black shadow-brutal hover:shadow-brutal-lg transition-all">
              Browse All Mentors
            </button>
          </Link>
        </div>
      </div>
    );
  }

  const fullName = `${mentor.firstName} ${mentor.lastName}`;

  // Rating stars component
  const RatingStars = ({ rating, size = 'sm' }: { rating: number; size?: 'sm' | 'lg' }) => {
    const starSize = size === 'lg' ? 'w-6 h-6' : 'w-5 h-5';
    return (
      <div className="flex items-center gap-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <Star
            key={star}
            className={`${starSize} ${
              star <= Math.round(rating)
                ? 'fill-brutal-yellow text-brutal-yellow'
                : 'text-gray-300'
            }`}
          />
        ))}
      </div>
    );
  };

  const handleRateSession = (session: any, isEdit: boolean = false) => {
    setSelectedSession({
      chatId: session.chatId,
      mentorName: session.mentorName,
      sessionDate: session.completedAt,
      existingRating: session.rating,
      existingFeedback: session.feedback,
      isEditing: isEdit,
    });
    setIsRatingModalOpen(true);
  };

  const handleDeleteRating = async (chatId: Id<"careerChats">) => {
    if (confirm('Are you sure you want to delete this rating? This action cannot be undone.')) {
      try {
        await deleteRating({ chatId });
      } catch (error) {
        console.error('Failed to delete rating:', error);
        alert('Failed to delete rating. Please try again.');
      }
    }
  };

  const handleOpenChat = (chatId: Id<"careerChats">) => {
    setSelectedChatId(chatId);
    setIsChatDrawerOpen(true);
  };

  // Calculate session counts
  const pendingCount = studentSessions?.filter(s => s.status === 'pending').length || 0;
  const confirmedCount =
    studentSessions?.filter((s) => s.status === 'confirmed' || s.status === 'scheduled').length || 0;
  const completedCount = studentSessions?.filter(s => s.status === 'completed').length || 0;
  const unratedSessionsCount =
    studentSessions?.filter((s) => !s.hasRating).length || 0;

  return (
    <div className="min-h-screen bg-background py-8">
      <div className="container mx-auto px-4 max-w-6xl">
        {/* Back Button */}
        <Link href="/mentors" className="inline-flex items-center gap-2 text-lg font-bold text-gray-700 hover:text-black mb-6">
          <ArrowLeft className="w-5 h-5" />
          Back to All Mentors
        </Link>

        {/* Your Sessions with this Mentor - Shows if student has any sessions */}
        {studentSessions && studentSessions.length > 0 && (
          <div className="bg-white border-3 border-black shadow-brutal-lg mb-6">
            {/* Header */}
            <div className="p-6 border-b-3 border-black bg-brutal-yellow">
              <div className="flex items-center justify-between gap-4">
                <div>
                  <h3 className="text-2xl font-black uppercase">Your Sessions with {fullName}</h3>
                  <p className="font-bold text-gray-700 mt-1">
                    {studentSessions.length} session{studentSessions.length !== 1 ? 's' : ''} total
                    {pendingCount > 0 && <span className="text-brutal-orange"> • {pendingCount} pending</span>}
                    {confirmedCount > 0 && (
                      <span className="text-brutal-blue"> • {confirmedCount} confirmed/scheduled</span>
                    )}
                    {completedCount > 0 && <span className="text-brutal-green"> • {completedCount} completed</span>}
                    {unratedSessionsCount > 0 && (
                      <span className="text-red-600"> • {unratedSessionsCount} unrated</span>
                    )}
                  </p>
                </div>
              </div>
            </div>

            {/* Sessions List */}
            <div className="p-6 space-y-4">
              {studentSessions.map((session) => {
                const isConfirmedOrScheduled = session.status === 'confirmed' || session.status === 'scheduled';

                return (
                  <div
                    key={session.chatId}
                    className="border-3 border-black p-5 bg-background hover:shadow-brutal transition-all"
                  >
                    <div className="flex items-start justify-between gap-4">
                      {/* Session Info */}
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-3 flex-wrap">
                          <Calendar className="w-5 h-5 text-gray-600" />
                          <span className="font-bold text-gray-700">
                            {session.scheduledAt
                              ? new Date(session.scheduledAt).toLocaleDateString('en-US', {
                                  month: 'long',
                                  day: 'numeric',
                                  year: 'numeric',
                                  hour: '2-digit',
                                  minute: '2-digit',
                                })
                              : 'No date set'}
                          </span>

                          {/* Status Badge */}
                          {session.status === 'pending' && (
                            <span className="px-3 py-1 bg-brutal-orange text-white text-xs font-black border-2 border-black flex items-center gap-1">
                              <Clock className="w-3 h-3" />
                              PENDING
                            </span>
                          )}
                          {session.status === 'confirmed' && (
                            <span className="px-3 py-1 bg-brutal-blue text-white text-xs font-black border-2 border-black flex items-center gap-1">
                              <CheckCircle className="w-3 h-3" />
                              CONFIRMED
                            </span>
                          )}
                          {session.status === 'scheduled' && (
                            <span className="px-3 py-1 bg-brutal-blue text-white text-xs font-black border-2 border-black flex items-center gap-1">
                              <Clock className="w-3 h-3" />
                              SCHEDULED
                            </span>
                          )}
                          {session.status === 'completed' && !session.hasRating && (
                            <span className="px-3 py-1 bg-red-500 text-white text-xs font-black border-2 border-black flex items-center gap-1">
                              <AlertCircle className="w-3 h-3" />
                              NOT RATED
                            </span>
                          )}
                          {session.status === 'completed' && session.hasRating && (
                            <span className="px-3 py-1 bg-brutal-green text-black text-xs font-black border-2 border-black flex items-center gap-1">
                              <Star className="w-3 h-3" />
                              RATED
                            </span>
                          )}
                        </div>

                        {/* Status-specific messages */}
                        {session.status === 'pending' && (
                          <div className="ml-8">
                            <p className="text-sm font-bold text-gray-600">
                              Waiting for mentor to confirm your booking request
                            </p>
                          </div>
                        )}

                        {isConfirmedOrScheduled && !session.canComplete && (
                          <div className="ml-8">
                            <p className="text-sm font-bold text-brutal-blue">
                              Session scheduled - Join at the scheduled time
                            </p>
                          </div>
                        )}

                        {isConfirmedOrScheduled && session.canComplete && (
                          <div className="ml-8">
                            <p className="text-sm font-bold text-brutal-green">
                              Session time has passed - You can mark it as complete
                            </p>
                          </div>
                        )}

                        {/* Show rating if exists */}
                        {session.hasRating && (
                          <div className="ml-8 space-y-2 mt-3">
                            <div className="flex items-center gap-2">
                              <span className="font-bold text-sm text-gray-600">Your Rating:</span>
                              <div className="flex items-center gap-1">
                                {[1, 2, 3, 4, 5].map((star) => (
                                  <Star
                                    key={star}
                                    className={`w-5 h-5 ${
                                      star <= (session.rating || 0)
                                        ? 'fill-brutal-yellow text-brutal-yellow'
                                        : 'text-gray-300'
                                    }`}
                                  />
                                ))}
                                <span className="ml-2 font-black text-lg">{session.rating}.0</span>
                              </div>
                            </div>
                            {session.feedback && (
                              <div>
                                <span className="font-bold text-sm text-gray-600">Your Feedback:</span>
                                <p className="mt-1 text-gray-700 font-bold italic">&quot;{session.feedback}&quot;</p>
                              </div>
                            )}
                          </div>
                        )}
                      </div>

                      {/* Actions */}
                      <div className="flex flex-col gap-2">
                        {/* Show Message button for confirmed/scheduled/completed sessions */}
                        {(isConfirmedOrScheduled || session.status === 'completed') && (
                          <button
                            onClick={() => handleOpenChat(session.chatId)}
                            className="px-4 py-2 bg-brutal-blue text-black font-bold uppercase text-sm border-3 border-black shadow-brutal hover:shadow-brutal-lg hover:translate-x-[-2px] hover:translate-y-[-2px] transition-all flex items-center gap-2"
                          >
                            <MessageCircle className="w-4 h-4" />
                            Message
                          </button>
                        )}

                        {/* Rate or Edit Rating */}
                        {(isConfirmedOrScheduled || session.status === 'completed') && !session.hasRating && (
                          <button
                            onClick={() => handleRateSession(session, false)}
                            className="px-4 py-2 bg-brutal-yellow text-black font-bold uppercase text-sm border-3 border-black shadow-brutal hover:shadow-brutal-lg hover:translate-x-[-2px] hover:translate-y-[-2px] transition-all flex items-center gap-2"
                          >
                            <Star className="w-4 h-4" />
                            Rate
                          </button>
                        )}

                        {/* Edit existing rating */}
                        {session.hasRating && (
                          <>
                            <button
                              onClick={() => handleRateSession(session, true)}
                              className="px-4 py-2 bg-brutal-purple text-white font-bold uppercase text-sm border-3 border-black shadow-brutal hover:shadow-brutal-lg hover:translate-x-[-2px] hover:translate-y-[-2px] transition-all flex items-center gap-2"
                            >
                              <Edit2 className="w-4 h-4" />
                              Edit Rating
                            </button>
                            <button
                              onClick={() => handleDeleteRating(session.chatId)}
                              className="px-4 py-2 bg-red-500 text-black font-bold uppercase text-sm border-3 border-black shadow-brutal hover:shadow-brutal-lg hover:translate-x-[-2px] hover:translate-y-[-2px] transition-all flex items-center gap-2"
                            >
                              <Trash2 className="w-4 h-4" />
                              Delete Rating
                            </button>
                          </>
                        )}

                        {/* Pending - Show status only */}
                        {session.status === 'pending' && (
                          <div className="text-sm font-bold text-gray-500 text-center px-4 py-2">
                            Awaiting confirmation
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* Header Section */}
        <div className="bg-gradient-to-r from-brutal-blue to-brutal-purple border-3 border-black shadow-brutal-lg p-8 mb-8">
          <div className="flex flex-col md:flex-row items-start md:items-center gap-6">
            {/* Avatar */}
            <div className="w-32 h-32 border-3 border-black shadow-brutal flex-shrink-0 overflow-hidden bg-white">
              {mentor.avatar ? (
                <img
                  src={mentor.avatar}
                  alt={fullName}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center bg-brutal-orange text-white text-5xl font-black">
                  {mentor.firstName?.[0]}{mentor.lastName?.[0]}
                </div>
              )}
            </div>

            {/* Info */}
            <div className="flex-1">
              <h1 className="text-4xl font-black text-white mb-2">{fullName}</h1>
              <p className="text-xl font-bold text-white/90 mb-3">
                {mentor.jobTitle} at {mentor.company}
              </p>

              {/* Stats */}
              <div className="flex flex-wrap gap-4 text-white">
                <div className="flex items-center gap-2">
                  <div className="flex items-center gap-1">
                    <RatingStars rating={mentor.rating} />
                    <span className="font-black text-lg ml-1">{mentor.rating.toFixed(1)}</span>
                  </div>
                  <span className="font-bold">({mentor.totalReviews} reviews)</span>
                </div>
                <div className="flex items-center gap-2">
                  <MessageCircle className="w-5 h-5" />
                  <span className="font-bold">{mentor.chatsCompleted} sessions completed</span>
                </div>
                <div className="flex items-center gap-2">
                  <Briefcase className="w-5 h-5" />
                  <span className="font-bold">{mentor.yearsExperience} years experience</span>
                </div>
              </div>
            </div>

            {/* CTA Button */}
            <button
              onClick={() => setIsBookingModalOpen(true)}
              className="px-8 py-4 bg-brutal-yellow text-black font-bold uppercase text-lg border-3 border-black shadow-brutal hover:shadow-brutal-lg hover:translate-x-[-2px] hover:translate-y-[-2px] transition-all flex items-center gap-2"
            >
              <Calendar className="w-5 h-5" />
              Book Session
            </button>
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="md:col-span-2 space-y-8">
            {/* About */}
            <div className="bg-white border-3 border-black shadow-brutal-lg p-6">
              <h2 className="text-2xl font-black uppercase mb-4">About {mentor.firstName}</h2>
              <p className="text-gray-700 font-bold leading-relaxed whitespace-pre-wrap">
                {mentor.bio}
              </p>
            </div>

            {/* Reviews */}
            <div className="bg-white border-3 border-black shadow-brutal-lg p-6">
              <h2 className="text-2xl font-black uppercase mb-6">Student Reviews</h2>

              {mentor.reviews && mentor.reviews.length > 0 ? (
                <div className="space-y-4">
                  {mentor.reviews.map((review, idx) => (
                    <div key={idx} className="border-b-2 border-gray-200 last:border-0 pb-4 last:pb-0">
                      <div className="flex items-start justify-between mb-2">
                        <div>
                          <p className="font-black">{review.studentName}</p>
                          <RatingStars rating={review.rating} />
                        </div>
                        <span className="text-sm text-gray-500 font-bold">
                          {new Date(review.completedAt).toLocaleDateString()}
                        </span>
                      </div>
                      {review.feedback && (
                        <p className="text-gray-700 font-bold mt-2">{review.feedback}</p>
                      )}
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8 text-gray-500 font-bold">
                  No reviews yet. Be the first to book a session and leave a review!
                </div>
              )}
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Rating Breakdown */}
            <div className="bg-white border-3 border-black shadow-brutal-lg p-6">
              <h3 className="text-xl font-black uppercase mb-4">Rating Breakdown</h3>
              <div className="space-y-3">
                {[5, 4, 3, 2, 1].map((stars) => {
                  const count = mentor.ratingDistribution[stars as keyof typeof mentor.ratingDistribution] || 0;
                  const percentage = mentor.totalReviews > 0 ? (count / mentor.totalReviews) * 100 : 0;

                  return (
                    <div key={stars} className="flex items-center gap-2">
                      <span className="font-bold text-sm w-8">{stars}★</span>
                      <div className="flex-1 h-3 bg-gray-200 border-2 border-black">
                        <div
                          className="h-full bg-brutal-yellow"
                          style={{ width: `${percentage}%` }}
                        />
                      </div>
                      <span className="font-bold text-sm w-8 text-right">{count}</span>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Professional Info */}
            <div className="bg-white border-3 border-black shadow-brutal-lg p-6">
              <h3 className="text-xl font-black uppercase mb-4">Professional Info</h3>
              <div className="space-y-3">
                <div>
                  <p className="text-xs font-black uppercase text-gray-600 mb-1">Company</p>
                  <p className="font-bold">{mentor.company}</p>
                </div>
                <div>
                  <p className="text-xs font-black uppercase text-gray-600 mb-1">Role</p>
                  <p className="font-bold">{mentor.jobTitle}</p>
                </div>
                <div>
                  <p className="text-xs font-black uppercase text-gray-600 mb-1">Experience</p>
                  <p className="font-bold">{mentor.yearsExperience} years</p>
                </div>
                {mentor.ratePerChat && mentor.ratePerChat > 0 && (
                  <div>
                    <p className="text-xs font-black uppercase text-gray-600 mb-1">Session Rate</p>
                    <p className="font-bold">{(mentor.ratePerChat / 1000).toFixed(0)}K RWF</p>
                  </div>
                )}
              </div>
            </div>

            {/* Quick Stats */}
            <div className="bg-brutal-green border-3 border-black shadow-brutal-lg p-6">
              <h3 className="text-xl font-black uppercase mb-4">Impact</h3>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="font-bold">Sessions:</span>
                  <span className="text-2xl font-black">{mentor.chatsCompleted}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="font-bold">Rating:</span>
                  <span className="text-2xl font-black">{mentor.rating.toFixed(1)}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="font-bold">Reviews:</span>
                  <span className="text-2xl font-black">{mentor.totalReviews}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Booking Modal */}
      <BookingModal
        isOpen={isBookingModalOpen}
        onClose={() => setIsBookingModalOpen(false)}
        mentorId={mentorUserId}
        mentorName={fullName}
      />

      {/* Rating Modal */}
      {selectedSession && (
        <RatingModal
          isOpen={isRatingModalOpen}
          onClose={() => {
            setIsRatingModalOpen(false);
            setSelectedSession(null);
          }}
          chatId={selectedSession.chatId}
          mentorName={selectedSession.mentorName}
          sessionDate={selectedSession.sessionDate}
          existingRating={selectedSession.existingRating}
          existingFeedback={selectedSession.existingFeedback}
          isEditing={selectedSession.isEditing}
          onRatingSubmitted={() => {
            setIsRatingModalOpen(false);
            setSelectedSession(null);
            // Convex will automatically refresh the studentRatings query
          }}
        />
      )}

      {/* Chat Drawer */}
      <ChatDrawer
        isOpen={isChatDrawerOpen}
        onClose={() => {
          setIsChatDrawerOpen(false);
          setSelectedChatId(null);
        }}
        chatId={selectedChatId}
        bookingInfo={
          selectedChatId && studentSessions
            ? (() => {
                const session = studentSessions.find(s => s.chatId === selectedChatId);
                return session
                  ? {
                      otherPersonName: session.mentorName,
                      scheduledAt: session.scheduledAt,
                    }
                  : undefined;
              })()
            : undefined
        }
      />
    </div>
  );
}
