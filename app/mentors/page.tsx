'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Search, Star, Calendar, MessageCircle } from 'lucide-react';
import { useQuery } from "convex/react";
import { api } from "../../convex/_generated/api";
import { MentorCardSkeleton } from '@/components/loading-skeleton';
import { EmptyState } from '@/components/error-state';

export default function MentorsPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [bookingMessage, setBookingMessage] = useState<string | null>(null);

  // Fetch professionals from Convex
  const allProfessionals = useQuery(api.professionals.search, {
    searchQuery: searchQuery || undefined,
  });

  const isLoading = allProfessionals === undefined;

  return (
    <div className="min-h-screen bg-background py-8">
      <div className="container mx-auto px-4 max-w-7xl">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-5xl md:text-6xl font-black mb-4 uppercase">Browse Mentors</h1>
          <p className="text-xl font-bold text-gray-700">
            Connect with professionals and get career advice in 15-minute sessions
          </p>
        </div>

        {/* Search and Filters */}
        <div className="mb-8 space-y-4">
          {/* Search Bar */}
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-6 h-6 text-gray-500" />
            <input
              type="text"
              placeholder="Search by name, role, or company..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-14 pr-4 py-4 text-lg font-bold border-3 border-black shadow-brutal focus:shadow-brutal-lg focus:outline-none transition-all"
            />
          </div>

        </div>

        {/* Results Count */}
        <div className="mb-6">
          <p className="text-lg font-bold">
            {allProfessionals?.length || 0} {allProfessionals?.length === 1 ? 'mentor' : 'mentors'} available
          </p>
        </div>

        {/* Booking Message */}
        {bookingMessage && (
          <div className="mb-6 bg-yellow-100 border-3 border-yellow-500 p-4">
            <p className="text-yellow-900 font-bold">ℹ️ {bookingMessage}</p>
          </div>
        )}

        {/* Mentors Grid */}
        {isLoading ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {Array.from({ length: 6 }).map((_, i) => (
              <MentorCardSkeleton key={i} />
            ))}
          </div>
        ) : allProfessionals && allProfessionals.length > 0 ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {allProfessionals.map((mentor) => {
              return (
                <div
                  key={mentor._id}
                  className="bg-white border-3 border-black shadow-brutal hover:shadow-brutal-lg hover:translate-x-[-2px] hover:translate-y-[-2px] transition-all"
                >
                  {/* Header */}
                  <div className="p-6 border-b-3 border-black">
                    <div className="flex items-start gap-4">
                      <div className="w-20 h-20 border-3 border-black shadow-brutal-sm overflow-hidden flex-shrink-0">
                        <img
                          src={mentor.avatar}
                          alt={`${mentor.firstName} ${mentor.lastName}`}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="text-xl font-black mb-1 truncate">{mentor.firstName} {mentor.lastName}</h3>
                        <p className="text-sm font-bold text-gray-700 mb-1">{mentor.jobTitle}</p>
                        <p className="text-sm font-bold text-gray-600">{mentor.company}</p>
                      </div>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-6">
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

                    {/* Bio */}
                    <p className="text-sm font-bold text-gray-700 mb-4 line-clamp-2">
                      {mentor.bio}
                    </p>

                    {/* CTA Button */}
                    <button
                      onClick={() => {
                        if (mentor.calendlyUrl) {
                          window.open(mentor.calendlyUrl, '_blank', 'noopener,noreferrer');
                        } else {
                          setBookingMessage(`${mentor.firstName} ${mentor.lastName}'s calendar is not yet available. Please check back later.`);
                          setTimeout(() => setBookingMessage(null), 5000);
                        }
                      }}
                      className="w-full px-4 py-3 bg-primary text-white font-bold uppercase text-sm border-3 border-black shadow-brutal hover:shadow-brutal-lg hover:translate-x-[-2px] hover:translate-y-[-2px] transition-all flex items-center justify-center gap-2"
                    >
                      <Calendar className="w-4 h-4" />
                      Book Session
                    </button>
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
        {allProfessionals && allProfessionals.length > 0 && (
          <div className="mt-16">
            <div className="bg-white border-3 border-black shadow-brutal p-8">
              <h2 className="text-3xl font-black mb-6 uppercase">How Mentor Sessions Work</h2>
              <div className="grid md:grid-cols-3 gap-6">
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
                  <div className="w-12 h-12 bg-secondary border-3 border-black flex items-center justify-center mb-3">
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
    </div>
  );
}
