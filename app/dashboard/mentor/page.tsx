'use client';

import { useState } from 'react';
import Link from 'next/link';
import {
  User, Calendar, MessageCircle, Star, TrendingUp, Clock,
  Users, ArrowRight, CheckCircle, Settings, Bell
} from 'lucide-react';
import { useQuery } from "convex/react";
import { api } from "../../../convex/_generated/api";
import { useConvexAuth } from "@/lib/hooks/useConvexAuth";

export default function MentorDashboardPage() {
  const { user, clerkUser, isLoading: authLoading } = useConvexAuth();

  // Fetch real data from Convex
  const professionalProfile = useQuery(api.professionals.getCurrent, user ? {} : "skip");
  const upcomingSessions = useQuery(api.careerChats.getMentorUpcoming, user ? {} : "skip");
  const stats = useQuery(api.careerChats.getMentorStats, user ? {} : "skip");

  const [studentQuestions] = useState<any[]>([]); // Placeholder for now

  const isLoading = authLoading || upcomingSessions === undefined || stats === undefined;

  const mentorProfile = {
    name: clerkUser ? `${clerkUser.firstName} ${clerkUser.lastName}` : "Mentor",
    avatar: clerkUser?.imageUrl || 'https://api.dicebear.com/7.x/avataaars/svg?seed=Mentor',
    company: professionalProfile?.company || 'Your Company',
    jobTitle: professionalProfile?.jobTitle || 'Your Job Title',
    rating: stats?.avgRating || 5.0,
    totalSessions: stats?.totalSessions || 0,
    yearsExperience: professionalProfile?.yearsExperience || 0,
    responseRate: stats?.completionRate || 100,
    responseTime: '< 2 hours',
  };

  // Format date helper
  const formatSessionDate = (timestamp: number) => {
    const date = new Date(timestamp);
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
  };

  const formatSessionTime = (timestamp: number) => {
    const date = new Date(timestamp);
    return date.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' });
  };

  return (
    <div className="min-h-screen bg-gray-50 py-4 sm:py-8">
      <div className="container mx-auto px-4 max-w-7xl">
        {/* Header */}
        <div className="mb-6 sm:mb-8">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-4">
            <div>
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-black mb-2">Mentor Dashboard</h1>
              <p className="text-base sm:text-lg md:text-xl text-gray-700">Welcome back, {mentorProfile.name}!</p>
            </div>
            <div className="flex items-center gap-2 sm:gap-3">
              <Link
                href="/dashboard/mentor/notifications"
                className="p-3 min-h-[44px] min-w-[44px] bg-white border-2 border-brutal-border shadow-brutal-sm hover:shadow-brutal transition-all relative flex items-center justify-center"
                title="Notifications"
              >
                <Bell className="w-5 h-5" />
                <span className="absolute -top-1 -right-1 w-5 h-5 bg-brutal-orange text-white text-xs font-black flex items-center justify-center rounded-full border-2 border-white">
                  3
                </span>
              </Link>
              <Link
                href="/dashboard/mentor/settings"
                className="px-4 py-2 min-h-[44px] bg-white border-2 border-brutal-border shadow-brutal-sm hover:shadow-brutal transition-all font-bold uppercase text-xs sm:text-sm flex items-center gap-2"
              >
                <Settings className="w-4 h-4" />
                <span className="hidden sm:inline">Settings</span>
              </Link>
            </div>
          </div>
        </div>

        {/* Profile Overview Card */}
        <div className="mb-6 sm:mb-8 bg-gradient-to-r from-brutal-blue to-brutal-purple border-3 border-brutal-border shadow-brutal-lg p-4 sm:p-6 md:p-8">
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-6">
            <div className="w-20 h-20 sm:w-24 sm:h-24 bg-white border-3 border-brutal-border shadow-brutal flex-shrink-0">
              <img
                src={mentorProfile.avatar}
                alt={mentorProfile.name}
                className="w-full h-full"
              />
            </div>

            <div className="flex-1 w-full sm:w-auto">
              <h2 className="text-2xl sm:text-3xl font-black text-white mb-1">{mentorProfile.name}</h2>
              <p className="text-base sm:text-lg md:text-xl font-bold text-white/90 mb-2 sm:mb-3">
                {mentorProfile.jobTitle} at {mentorProfile.company}
              </p>
              <div className="flex flex-wrap gap-3 sm:gap-4 text-white text-sm sm:text-base">
                <div className="flex items-center gap-2">
                  <Star className="w-4 h-4 sm:w-5 sm:h-5 fill-white" />
                  <span className="font-bold">{mentorProfile.rating} Rating</span>
                </div>
                <div className="flex items-center gap-2">
                  <MessageCircle className="w-4 h-4 sm:w-5 sm:h-5" />
                  <span className="font-bold">{mentorProfile.totalSessions} Sessions</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4 sm:w-5 sm:h-5" />
                  <span className="font-bold">{mentorProfile.responseTime} Response</span>
                </div>
              </div>
            </div>

            <Link
              href="/dashboard/mentor/profile"
              className="w-full sm:w-auto px-6 py-3 min-h-[44px] bg-white text-brutal-text font-bold uppercase text-xs sm:text-sm border-2 border-brutal-border shadow-brutal hover:shadow-brutal-lg hover:translate-x-[-2px] hover:translate-y-[-2px] transition-all flex items-center justify-center gap-2"
            >
              <User className="w-4 h-4" />
              Edit Profile
            </Link>
          </div>
        </div>        {/* Stats Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 md:gap-6 mb-6 sm:mb-8">
          {/* Sessions This Month */}
          <div className="bg-brutal-yellow border-3 border-brutal-border shadow-brutal-lg p-4 sm:p-6">
            <div className="flex items-center justify-between mb-2">
              <Calendar className="w-6 h-6 sm:w-8 sm:h-8" />
              <span className="text-2xl sm:text-3xl font-black">{stats?.sessionsThisMonth || 0}</span>
            </div>
            <p className="font-black uppercase text-xs sm:text-sm">Sessions This Month</p>
          </div>

          {/* Total Earnings */}
          <div className="bg-brutal-green border-3 border-brutal-border shadow-brutal-lg p-4 sm:p-6">
            <div className="flex items-center justify-between mb-2">
              <TrendingUp className="w-6 h-6 sm:w-8 sm:h-8" />
              <span className="text-2xl sm:text-3xl font-black">${stats?.totalEarnings || 0}</span>
            </div>
            <p className="font-black uppercase text-xs sm:text-sm">Total Earnings</p>
          </div>

          {/* Average Rating */}
          <div className="bg-brutal-pink border-3 border-brutal-border shadow-brutal-lg p-4 sm:p-6">
            <div className="flex items-center justify-between mb-2">
              <Star className="w-6 h-6 sm:w-8 sm:h-8 fill-black" />
              <span className="text-2xl sm:text-3xl font-black">{stats?.avgRating || 5.0}</span>
            </div>
            <p className="font-black uppercase text-xs sm:text-sm">Average Rating</p>
          </div>

          {/* Completion Rate */}
          <div className="bg-brutal-blue border-3 border-brutal-border shadow-brutal-lg p-4 sm:p-6 text-white">
            <div className="flex items-center justify-between mb-2">
              <CheckCircle className="w-6 h-6 sm:w-8 sm:h-8" />
              <span className="text-2xl sm:text-3xl font-black">{stats?.completionRate || 100}%</span>
            </div>
            <p className="font-black uppercase text-xs sm:text-sm">Completion Rate</p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8">
          {/* Left Column - Main Content */}
          <div className="lg:col-span-2 space-y-6 sm:space-y-8">
            {/* Upcoming Sessions */}
            <div className="bg-white border-3 border-brutal-border shadow-brutal-lg p-4 sm:p-6 md:p-8">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-6">
                <h2 className="text-xl sm:text-2xl md:text-3xl font-black uppercase flex items-center gap-2">
                  <Calendar className="w-6 h-6 sm:w-8 sm:h-8" />
                  Upcoming Sessions
                </h2>
                <Link
                  href="/dashboard/mentor/sessions"
                  className="text-sm font-bold text-brutal-text hover:underline flex items-center gap-1"
                >
                  View All <ArrowRight className="w-4 h-4" />
                </Link>
              </div>

              {isLoading ? (
                <div className="space-y-4">
                  {[1, 2, 3].map((i) => (
                    <div key={i} className="h-20 sm:h-24 bg-gray-200 animate-pulse border-2 border-gray-300" />
                  ))}
                </div>
              ) : !upcomingSessions || upcomingSessions.length === 0 ? (
                <div className="text-center py-8 sm:py-12">
                  <Calendar className="w-12 h-12 sm:w-16 sm:h-16 mx-auto mb-3 sm:mb-4 text-gray-400" />
                  <p className="text-gray-600 font-bold mb-2 text-sm sm:text-base">No upcoming sessions</p>
                  <p className="text-xs sm:text-sm text-gray-500">New bookings will appear here</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {upcomingSessions.map((session) => (
                    <div
                      key={session._id}
                      className="border-2 border-brutal-border p-4 sm:p-6 hover:shadow-brutal transition-all"
                    >
                      <div className="flex flex-col sm:flex-row items-start gap-3 sm:gap-4">
                        <div className="w-12 h-12 sm:w-12 sm:h-12 bg-brutal-pink border-2 border-brutal-border flex-shrink-0">
                          <img
                            src={session.studentAvatar || 'https://api.dicebear.com/7.x/avataaars/svg?seed=Student'}
                            alt={session.studentName}
                            className="w-full h-full"
                          />
                        </div>

                        <div className="flex-1 w-full">
                          <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2 mb-2">
                            <div>
                              <h3 className="text-lg sm:text-xl font-black">{session.studentName}</h3>
                              <p className="text-xs sm:text-sm text-gray-700 font-bold">{session.careerTitle}</p>
                            </div>
                            <span className={`px-3 py-1 text-xs font-black uppercase border-2 border-brutal-border self-start ${
                              session.status === 'scheduled'
                                ? 'bg-brutal-green'
                                : 'bg-brutal-yellow'
                            }`}>
                              {session.status}
                            </span>
                          </div>

                          <div className="flex flex-wrap gap-3 sm:gap-4 text-xs sm:text-sm font-bold text-gray-600">
                            <span className="flex items-center gap-1">
                              <Calendar className="w-4 h-4" />
                              {formatSessionDate(session.scheduledAt)}
                            </span>
                            <span className="flex items-center gap-1">
                              <Clock className="w-4 h-4" />
                              {formatSessionTime(session.scheduledAt)} ({session.duration} min)
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Student Questions */}
            <div className="bg-white border-3 border-brutal-border shadow-brutal-lg p-4 sm:p-6 md:p-8">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-6">
                <h2 className="text-xl sm:text-2xl md:text-3xl font-black uppercase flex items-center gap-2">
                  <MessageCircle className="w-6 h-6 sm:w-8 sm:h-8" />
                  Student Questions
                </h2>
                <Link
                  href="/questions"
                  className="text-sm font-bold text-brutal-text hover:underline flex items-center gap-1"
                >
                  View All <ArrowRight className="w-4 h-4" />
                </Link>
              </div>

              {isLoading ? (
                <div className="space-y-4">
                  {[1, 2, 3].map((i) => (
                    <div key={i} className="h-20 bg-gray-200 animate-pulse border-2 border-gray-300" />
                  ))}
                </div>
              ) : studentQuestions.length === 0 ? (
                <div className="text-center py-12">
                  <MessageCircle className="w-16 h-16 mx-auto mb-4 text-gray-400" />
                  <p className="text-gray-600 font-bold mb-2">No questions yet</p>
                  <p className="text-sm text-gray-500">Student questions will appear here</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {studentQuestions.map((q) => (
                    <div
                      key={q.id}
                      className="border-2 border-brutal-border p-4 hover:shadow-brutal-sm transition-all cursor-pointer"
                    >
                      <div className="flex items-start justify-between mb-2">
                        <p className="font-bold text-gray-900">{q.question}</p>
                        {q.replies > 0 && (
                          <span className="px-2 py-1 bg-brutal-green text-xs font-black border-2 border-brutal-border">
                            {q.replies} {q.replies === 1 ? 'Reply' : 'Replies'}
                          </span>
                        )}
                      </div>
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-gray-600 font-bold">
                          Asked by {q.studentName}
                        </span>
                        <span className="text-gray-500 font-bold">{q.askedAt}</span>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Right Column - Sidebar */}
          <div className="space-y-6">
            {/* Quick Actions */}
            <div className="bg-white border-3 border-brutal-border shadow-brutal-lg p-6">
              <h3 className="text-xl font-black uppercase mb-4">Quick Actions</h3>
              <div className="space-y-3">
                <Link
                  href="/dashboard/mentor/availability"
                  className="block w-full px-4 py-3 bg-brutal-blue text-white font-bold uppercase text-sm border-2 border-brutal-border shadow-brutal hover:shadow-brutal-lg hover:translate-x-[-2px] hover:translate-y-[-2px] transition-all text-center"
                >
                  Update Availability
                </Link>
                <Link
                  href="/dashboard/mentor/sessions"
                  className="block w-full px-4 py-3 bg-brutal-pink font-bold uppercase text-sm border-2 border-brutal-border shadow-brutal hover:shadow-brutal-lg hover:translate-x-[-2px] hover:translate-y-[-2px] transition-all text-center"
                >
                  Manage Sessions
                </Link>
                <Link
                  href="/questions/ask"
                  className="block w-full px-4 py-3 bg-brutal-green font-bold uppercase text-sm border-2 border-brutal-border shadow-brutal hover:shadow-brutal-lg hover:translate-x-[-2px] hover:translate-y-[-2px] transition-all text-center"
                >
                  Answer Questions
                </Link>
              </div>
            </div>

            {/* Tips for Mentors */}
            <div className="bg-brutal-yellow border-3 border-brutal-border shadow-brutal-lg p-6">
              <h3 className="text-xl font-black uppercase mb-4"> Mentor Tips</h3>
              <ul className="space-y-3">
                <li className="flex items-start gap-2">
                  <span className="text-lg"></span>
                  <span className="text-sm font-bold">Respond to sessions within 24 hours</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-lg"></span>
                  <span className="text-sm font-bold">Keep availability calendar updated</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-lg"></span>
                  <span className="text-sm font-bold">Share real career experiences</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-lg"></span>
                  <span className="text-sm font-bold">Be encouraging and supportive</span>
                </li>
              </ul>
            </div>

            {/* Performance */}
            <div className="bg-white border-3 border-brutal-border shadow-brutal-lg p-6">
              <h3 className="text-xl font-black uppercase mb-4 flex items-center gap-2">
                <TrendingUp className="w-5 h-5" />
                This Month
              </h3>
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between mb-2">
                    <span className="text-sm font-bold">Session Goal</span>
                    <span className="text-sm font-black">{stats.sessionsThisMonth}/15</span>
                  </div>
                  <div className="w-full h-3 bg-gray-200 border-2 border-brutal-border">
                    <div 
                      className="h-full bg-brutal-blue"
                      style={{ width: `${(stats.sessionsThisMonth / 15) * 100}%` }}
                    />
                  </div>
                </div>
                
                <div>
                  <div className="flex justify-between mb-2">
                    <span className="text-sm font-bold">Response Rate</span>
                    <span className="text-sm font-black">{mentorProfile.responseRate}%</span>
                  </div>
                  <div className="w-full h-3 bg-gray-200 border-2 border-brutal-border">
                    <div 
                      className="h-full bg-brutal-green"
                      style={{ width: `${mentorProfile.responseRate}%` }}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
