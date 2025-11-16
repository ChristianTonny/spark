'use client';

import { useState } from 'react';
import { Star, Calendar } from 'lucide-react';
import { useQuery } from 'convex/react';
import { api } from '@/convex/_generated/api';
import { Id } from '@/convex/_generated/dataModel';
import { RatingModal } from './RatingModal';

export function PendingRatings() {
  const unratedSessions = useQuery(api.careerChats.getUnratedSessions);
  const [selectedSession, setSelectedSession] = useState<{
    chatId: Id<"careerChats">;
    mentorName: string;
    sessionDate?: number;
  } | null>(null);

  if (!unratedSessions || unratedSessions.length === 0) {
    return null;
  }

  return (
    <>
      <div className="bg-brutal-yellow border-3 border-black shadow-brutal-lg p-6">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <Star className="w-6 h-6" />
            <h2 className="text-2xl font-black uppercase">Rate Your Sessions</h2>
          </div>
          <span className="px-3 py-1 bg-black text-brutal-yellow font-black text-sm border-2 border-black">
            {unratedSessions.length} Pending
          </span>
        </div>

        <p className="font-bold text-gray-700 mb-4">
          Share your experience to help other students and improve mentor sessions!
        </p>

        <div className="space-y-3">
          {unratedSessions.slice(0, 3).map((session) => (
            <div
              key={session.chatId}
              className="bg-white border-2 border-black shadow-brutal p-4 flex items-center justify-between"
            >
              <div className="flex items-center gap-4 flex-1">
                {/* Avatar */}
                <div className="w-12 h-12 border-2 border-black shadow-brutal flex-shrink-0 overflow-hidden bg-gray-200">
                  {session.mentorAvatar ? (
                    <img
                      src={session.mentorAvatar}
                      alt={session.mentorName}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center bg-brutal-blue text-white text-lg font-black">
                      {session.mentorName.split(' ').map(n => n[0]).join('')}
                    </div>
                  )}
                </div>

                {/* Info */}
                <div className="flex-1 min-w-0">
                  <p className="font-black truncate">{session.mentorName}</p>
                  <p className="text-sm font-bold text-gray-600 truncate">
                    {session.mentorRole} at {session.mentorCompany}
                  </p>
                  {session.completedAt && (
                    <p className="text-xs font-bold text-gray-500 flex items-center gap-1 mt-1">
                      <Calendar className="w-3 h-3" />
                      {new Date(session.completedAt).toLocaleDateString()}
                    </p>
                  )}
                </div>
              </div>

              {/* CTA Button */}
              <button
                onClick={() =>
                  setSelectedSession({
                    chatId: session.chatId,
                    mentorName: session.mentorName,
                    sessionDate: session.completedAt,
                  })
                }
                className="px-4 py-2 bg-brutal-blue text-white font-bold uppercase text-sm border-2 border-black shadow-brutal hover:shadow-brutal-lg hover:translate-x-[-2px] hover:translate-y-[-2px] transition-all flex items-center gap-2 flex-shrink-0"
              >
                <Star className="w-4 h-4" />
                Rate
              </button>
            </div>
          ))}
        </div>

        {unratedSessions.length > 3 && (
          <p className="text-sm font-bold text-gray-600 mt-3 text-center">
            + {unratedSessions.length - 3} more session{unratedSessions.length - 3 !== 1 ? 's' : ''} to rate
          </p>
        )}
      </div>

      {/* Rating Modal */}
      {selectedSession && (
        <RatingModal
          isOpen={true}
          onClose={() => setSelectedSession(null)}
          chatId={selectedSession.chatId}
          mentorName={selectedSession.mentorName}
          sessionDate={selectedSession.sessionDate}
          onRatingSubmitted={() => {
            // Refresh will happen automatically via Convex reactivity
            setSelectedSession(null);
          }}
        />
      )}
    </>
  );
}
