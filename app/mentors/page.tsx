'use client';

import { useState, useMemo } from 'react';
import Link from 'next/link';
import { Search, Star, Calendar, MessageCircle, Award, CheckCircle, Clock } from 'lucide-react';
import { useQuery } from "convex/react";
import { api } from "../../convex/_generated/api";
import { MentorCardSkeleton } from '@/components/loading-skeleton';
import { EmptyState } from '@/components/error-state';
import { BookingModal } from '@/components/BookingModal';
import { ChatDrawer } from '@/components/ChatDrawer';
import { Id } from "@/convex/_generated/dataModel";
import { useConvexAuth } from '@/lib/hooks/useConvexAuth';

export default function MentorsPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedMentorId, setSelectedMentorId] = useState<Id<"users"> | null>(null);
  const [selectedMentorName, setSelectedMentorName] = useState('');
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);
  const [isChatDrawerOpen, setIsChatDrawerOpen] = useState(false);
  const [selectedChatId, setSelectedChatId] = useState<Id<"careerChats"> | null>(null);
  const [selectedChatInfo, setSelectedChatInfo] = useState<{
    mentorName: string;
    scheduledAt?: number;
  } | null>(null);
  

  const { user } = useConvexAuth();

  // Fetch professionals from Convex
  const allProfessionals = useQuery(api.professionals.search, {
    searchQuery: searchQuery || undefined,
  });

  // Fetch current user's professional profile if they're a mentor
  const currentProfessional = useQuery(
    api.professionals.getCurrentProfessional,
    user?.role === 'mentor' ? {} : 'skip'
  );

  // Fetch student's interaction history with mentors
  const mentorInteractions = useQuery(
    api.careerChats.getStudentMentorInteractions,
    user?.role === 'student' ? {} : 'skip'
  );

  // Fetch mentors the student has booked
  const yourMentors = useQuery(
    api.careerChats.getStudentMentors,
    user?.role === 'student' ? {} : 'skip'
  );

  const isLoading = allProfessionals === undefined;

  // Sort mentors
  const sortedProfessionals = useMemo(() => {
    if (!allProfessionals) return [];

    let filtered = [...allProfessionals];

    // If user is a mentor viewing their own profile
    if (currentProfessional && user?.role === 'mentor') {
      const currentUserId = currentProfessional.userId;
      const currentCareerIds = currentProfessional.careerIds || [];

      // Separate current user from others
      const currentUser = filtered.find(p => p.userId === currentUserId);
      const otherMentors = filtered.filter(p => p.userId !== currentUserId);

      // Sort others by career similarity
      const sortedOthers = otherMentors.sort((a, b) => {
        const aMatchCount = (a.careerIds || []).filter(id => currentCareerIds.includes(id)).length;
        const bMatchCount = (b.careerIds || []).filter(id => currentCareerIds.includes(id)).length;
        return bMatchCount - aMatchCount; // Higher match count first
      });

      // Return current user first, then similar mentors
      return currentUser ? [currentUser, ...sortedOthers] : sortedOthers;
    }

    return filtered;
  }, [allProfessionals, currentProfessional, user]);

  return (
    <div className="min-h-screen bg-background py-6 sm:py-8">
      <div className="container mx-auto px-3 sm:px-4 max-w-7xl">
        {/* Header */}
        <div className="mb-6 sm:mb-8">
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black mb-3 sm:mb-4 uppercase">Browse Mentors</h1>
          <p className="text-base sm:text-lg md:text-xl font-bold text-gray-700">
            Connect with professionals and get career advice in 15-minute sessions
          </p>
        </div>

        {/* Search Bar */}
        <div className="mb-6 sm:mb-8">
          <div className="relative">
            <Search className="absolute left-3 sm:left-4 top-1/2 -translate-y-1/2 w-5 h-5 sm:w-6 sm:h-6 text-gray-500" />
            <input
              type="text"
              placeholder="Search by name, role, or company..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-11 sm:pl-14 pr-3 sm:pr-4 py-3 sm:py-4 text-base sm:text-lg font-bold border-3 border-black shadow-brutal focus:shadow-brutal-lg focus:outline-none transition-all"
            />
          </div>
        </div>

        {/* Your Mentors Section (for students who have booked mentors) */}
        {yourMentors && yourMentors.length > 0 && !searchQuery && (
          <div className="bg-brutal-yellow border-3 border-black shadow-brutal-lg p-4 sm:p-6 mb-6 sm:mb-8">
            <h2 className="text-xl sm:text-2xl font-black uppercase mb-3 sm:mb-4 flex items-center gap-2">
              <Award className="w-5 h-5 sm:w-6 sm:h-6" />
              Your Mentors
            </h2>
            <p className="text-xs sm:text-sm font-bold mb-3 sm:mb-4">
              Mentors you have booked or are currently working with
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
              {yourMentors.map((mentor) => (
                <Link key={mentor.userId} href={`/mentors/${mentor.userId}`}>
                  <div className="border-3 border-black bg-white p-4 hover:shadow-brutal transition-all cursor-pointer">
                    <div className="flex items-start gap-3 mb-3">
                      {/* Avatar */}
                      <div className="w-16 h-16 border-3 border-black shadow-brutal-sm overflow-hidden flex-shrink-0">
                        {mentor.avatar ? (
                          <img
                            src={mentor.avatar}
                            alt={mentor.name}
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center bg-brutal-orange text-white text-xl font-black">
                            {mentor.name.split(' ').map(n => n[0]).join('')}
                          </div>
                        )}
                      </div>

                      {/* Info */}
                      <div className="flex-1 min-w-0">
                        <h3 className="font-black text-lg truncate">{mentor.name}</h3>
                        <p className="text-sm font-bold text-gray-600 truncate">{mentor.jobTitle}</p>
                        <p className="text-xs font-bold text-gray-500 truncate">{mentor.company}</p>
                      </div>
                    </div>

                    {/* Status and Rating */}
                    <div className="flex items-center justify-between pt-3 border-t-2 border-gray-200">
                      <div className="flex items-center gap-1">
                        <Star className="w-4 h-4 fill-accent text-accent" />
                        <span className="font-black text-sm">{mentor.rating.toFixed(1)}</span>
                      </div>

                      {/* Status Badge */}
                      {mentor.status === 'pending' && (
                        <span className="px-2 py-1 bg-brutal-orange text-white text-xs font-black border-2 border-black">
                          PENDING
                        </span>
                      )}
                      {mentor.status === 'confirmed' && (
                        <span className="px-2 py-1 bg-brutal-blue text-white text-xs font-black border-2 border-black">
                          CONFIRMED
                        </span>
                      )}
                      {mentor.status === 'completed' && (
                        <span className="px-2 py-1 bg-brutal-green text-black text-xs font-black border-2 border-black">
                          COMPLETED
                        </span>
                      )}
                    </div>

                    {/* Scheduled Date */}
                    {mentor.scheduledAt && (
                      <div className="mt-2 flex items-center gap-1 text-xs font-bold text-gray-600">
                        <Calendar className="w-3 h-3" />
                        <span>
                          {new Date(mentor.scheduledAt).toLocaleDateString('en-US', {
                            month: 'short',
                            day: 'numeric',
                          })}
                        </span>
                      </div>
                    )}
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}

        {/* Results Count */}
        <div className="mb-6">
          <p className="text-lg font-bold">
            {sortedProfessionals?.length || 0} {sortedProfessionals?.length === 1 ? 'mentor' : 'mentors'} available
          </p>
        </div>

        {/* Your Profile Banner (for mentors viewing their own profile) */}
        {currentProfessional && user?.role === 'mentor' && !searchQuery && (
          <div className="mb-6 bg-brutal-yellow border-3 border-black shadow-brutal-lg p-4">
            <div className="flex items-center gap-2">
              <Award className="w-5 h-5" />
              <p className="font-black text-sm uppercase">Your Profile Preview Below</p>
            </div>
            <p className="text-sm font-bold mt-1">
              This is how students see your mentor profile. Other mentors in your field are shown after.
            </p>
          </div>
        )}

        {/* Mentors Grid */}
        {isLoading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {Array.from({ length: 6 }).map((_, i) => (
              <MentorCardSkeleton key={i} />
            ))}
          </div>
        ) : sortedProfessionals && sortedProfessionals.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {sortedProfessionals.map((mentor, index) => {
              const isCurrentUser = currentProfessional && mentor.userId === currentProfessional.userId;

              // Check student's interaction history with this mentor
              const hasContacted = mentorInteractions?.contactedMentorIds.includes(mentor.userId);
              const hasActiveBooking = mentorInteractions?.activeBookingMentorIds.includes(mentor.userId);
              const hasChatHistory = mentorInteractions?.chatHistoryMentorIds.includes(mentor.userId);

              return (
                <div
                  key={mentor._id}
                  className={`bg-white border-3 border-black shadow-brutal hover:shadow-brutal-lg hover:translate-x-[-2px] hover:translate-y-[-2px] transition-all ${
                    isCurrentUser ? 'ring-4 ring-brutal-yellow' : ''
                  }`}
                >
                  {/* Header */}
                  <Link href={`/mentors/${mentor.userId}`} className={`block p-4 sm:p-6 border-b-3 border-black ${isCurrentUser ? 'bg-brutal-yellow/20' : ''} hover:bg-gray-50 transition-colors`}>
                    <div className="flex items-start gap-3 sm:gap-4">
                      <div className="w-16 h-16 sm:w-20 sm:h-20 border-3 border-black shadow-brutal-sm overflow-hidden flex-shrink-0">
                        <img
                          src={mentor.avatar}
                          alt={`${mentor.firstName} ${mentor.lastName}`}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 flex-wrap">
                          <h3 className="text-lg sm:text-xl font-black mb-1 truncate">
                            {mentor.firstName} {mentor.lastName}
                          </h3>
                          {isCurrentUser && (
                            <span className="px-2 py-0.5 bg-brutal-yellow border-2 border-black text-xs font-black uppercase">
                              You
                            </span>
                          )}
                        </div>
                        <p className="text-xs sm:text-sm font-bold text-gray-700 mb-1 truncate">{mentor.jobTitle}</p>
                        <p className="text-xs sm:text-sm font-bold text-gray-600 truncate">{mentor.company}</p>
                      </div>
                    </div>
                  </Link>

                  {/* Content */}
                  <div className="p-4 sm:p-6">
                    {/* Stats */}
                    <div className="flex items-center gap-4 mb-4 pb-4 border-b-2 border-gray-200">
                      <div className="flex items-center gap-1">
                        <Star className="w-5 h-5 fill-accent text-accent" />
                        <span className="font-black text-lg">{mentor.rating}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <MessageCircle className="w-5 h-5 text-gray-600" />
                        <span className="font-bold text-sm">{mentor.chatsCompleted} chats</span>
                      </div>
                    </div>

                    {/* Interaction Indicators (for students) */}
                    {user?.role === 'student' && (hasContacted || hasActiveBooking || hasChatHistory) && (
                      <div className="mb-4 flex flex-wrap gap-2">
                        {hasActiveBooking && (
                          <div className="flex items-center gap-1 px-2 py-1 bg-brutal-green border-2 border-black text-xs font-black uppercase">
                            <Clock className="w-3 h-3" />
                            <span>Active Booking</span>
                          </div>
                        )}
                        {hasChatHistory && (
                          <div className="flex items-center gap-1 px-2 py-1 bg-brutal-blue text-white border-2 border-black text-xs font-black uppercase">
                            <MessageCircle className="w-3 h-3" />
                            <span>Chat History</span>
                          </div>
                        )}
                        {hasContacted && !hasActiveBooking && !hasChatHistory && (
                          <div className="flex items-center gap-1 px-2 py-1 bg-gray-200 border-2 border-black text-xs font-black uppercase">
                            <CheckCircle className="w-3 h-3" />
                            <span>Contacted</span>
                          </div>
                        )}
                      </div>
                    )}

                    {/* Bio */}
                    <p className="text-sm font-bold text-gray-700 mb-4 line-clamp-2">
                      {mentor.bio}
                    </p>

                    {/* CTA Button */}
                    {isCurrentUser ? (
                      <Link href="/dashboard/mentor/profile">
                        <button className="w-full px-4 py-3 sm:py-3.5 min-h-[48px] bg-brutal-yellow text-black font-bold uppercase text-xs sm:text-sm border-3 border-black shadow-brutal hover:shadow-brutal-lg hover:translate-x-[-2px] hover:translate-y-[-2px] active:shadow-none transition-all flex items-center justify-center gap-2">
                          Edit Your Profile
                        </button>
                      </Link>
                    ) : user?.role === 'student' && hasChatHistory ? (
                      <MessageMentorButton
                        mentorUserId={mentor.userId}
                        mentorName={`${mentor.firstName} ${mentor.lastName}`}
                        onChatOpen={(chatId, mentorName, scheduledAt) => {
                          setSelectedChatId(chatId);
                          setSelectedChatInfo({ mentorName, scheduledAt });
                          setIsChatDrawerOpen(true);
                        }}
                      />
                    ) : user?.role === 'student' && hasActiveBooking ? (
                      <button
                        onClick={() => {
                          setSelectedMentorId(mentor.userId);
                          setSelectedMentorName(`${mentor.firstName} ${mentor.lastName}`);
                          setIsBookingModalOpen(true);
                        }}
                        className="w-full px-4 py-3 sm:py-3.5 min-h-[48px] bg-brutal-green text-black font-bold uppercase text-xs sm:text-sm border-3 border-black shadow-brutal hover:shadow-brutal-lg hover:translate-x-[-2px] hover:translate-y-[-2px] active:shadow-none transition-all flex items-center justify-center gap-2"
                      >
                        <Clock className="w-4 h-4" />
                        View Booking
                      </button>
                    ) : (
                      <button
                        onClick={() => {
                          setSelectedMentorId(mentor.userId);
                          setSelectedMentorName(`${mentor.firstName} ${mentor.lastName}`);
                          setIsBookingModalOpen(true);
                        }}
                        className="w-full px-4 py-3 sm:py-3.5 min-h-[48px] bg-primary text-white font-bold uppercase text-xs sm:text-sm border-3 border-black shadow-brutal hover:shadow-brutal-lg hover:translate-x-[-2px] hover:translate-y-[-2px] active:shadow-none transition-all flex items-center justify-center gap-2"
                      >
                        <Calendar className="w-4 h-4" />
                        Book Session
                      </button>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <EmptyState
            title="No mentors found"
            message="Try adjusting your search to find mentors."
            action={{
              label: 'Clear Search',
              onClick: () => {
                setSearchQuery('');
              }
            }}
          />
        )}

        {/* Info Section */}
        {sortedProfessionals && sortedProfessionals.length > 0 && (
          <div className="mt-12 sm:mt-16">
            <div className="bg-white border-3 border-black shadow-brutal p-6 sm:p-8">
              <h2 className="text-2xl sm:text-3xl font-black mb-4 sm:mb-6 uppercase">How Mentor Sessions Work</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6">
                <div>
                  <div className="w-12 h-12 bg-primary border-3 border-black flex items-center justify-center mb-3">
                    <span className="text-2xl font-black text-white">1</span>
                  </div>
                  <h3 className="text-xl font-black mb-2">Book a Session</h3>
                  <p className="text-sm font-bold text-gray-700">
                    Choose an available time slot that works for you. Sessions are 15 minutes long.
                  </p>
                </div>
                <div>
                  <div className="w-12 h-12 bg-brutal-orange border-3 border-black flex items-center justify-center mb-3">
                    <span className="text-2xl font-black text-white">2</span>
                  </div>
                  <h3 className="text-xl font-black mb-2">Prepare Questions</h3>
                  <p className="text-sm font-bold text-gray-700">
                    Think about what you want to learn. Ask about their career path, daily work, or advice.
                  </p>
                </div>
                <div>
                  <div className="w-12 h-12 bg-accent border-3 border-black flex items-center justify-center mb-3">
                    <span className="text-2xl font-black">3</span>
                  </div>
                  <h3 className="text-xl font-black mb-2">Join the Chat</h3>
                  <p className="text-sm font-bold text-gray-700">
                    At the scheduled time, join the video call and have a real conversation with a professional.
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Back Link */}
        <div className="text-center mt-8">
          <Link href="/" className="text-lg font-bold text-gray-600 hover:text-black">
            ← Back to Home
          </Link>
        </div>
      </div>

      {/* Booking Modal */}
      {selectedMentorId && (
        <BookingModal
          isOpen={isBookingModalOpen}
          onClose={() => {
            setIsBookingModalOpen(false);
            setSelectedMentorId(null);
            setSelectedMentorName('');
          }}
          mentorId={selectedMentorId}
          mentorName={selectedMentorName}
        />
      )}

      {/* Chat Drawer */}
      <ChatDrawer
        isOpen={isChatDrawerOpen}
        onClose={() => {
          setIsChatDrawerOpen(false);
          setSelectedChatId(null);
          setSelectedChatInfo(null);
        }}
        chatId={selectedChatId}
        bookingInfo={selectedChatInfo ? {
          otherPersonName: selectedChatInfo.mentorName,
          scheduledAt: selectedChatInfo.scheduledAt,
        } : undefined}
      />
    </div>
  );
}

// Component to handle Message Mentor button with chat lookup
function MessageMentorButton({
  mentorUserId,
  mentorName,
  onChatOpen,
}: {
  mentorUserId: Id<"users">;
  mentorName: string;
  onChatOpen: (chatId: Id<"careerChats">, mentorName: string, scheduledAt?: number) => void;
}) {
  const chatData = useQuery(api.careerChats.getChatWithMentor, { mentorUserId });

  const handleClick = () => {
    if (chatData) {
      onChatOpen(chatData.chatId, chatData.mentorName, chatData.scheduledAt);
    }
  };

  return (
    <button
      onClick={handleClick}
      disabled={!chatData}
      className="w-full px-4 py-3 sm:py-3.5 min-h-[48px] bg-brutal-blue text-white font-bold uppercase text-xs sm:text-sm border-3 border-black shadow-brutal hover:shadow-brutal-lg hover:translate-x-[-2px] hover:translate-y-[-2px] active:shadow-none transition-all flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
    >
      <MessageCircle className="w-4 h-4" />
      Message Mentor
    </button>
  );
}
