'use client';

import { useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import {
  User, Calendar, MessageCircle, Star, TrendingUp, Clock,
  Users, ArrowRight, CheckCircle, Settings, Bell, DollarSign, Award
} from 'lucide-react';
import { useQuery } from 'convex/react';
import { api } from '../../../convex/_generated/api';
import { useConvexAuth } from '../../../lib/hooks/useConvexAuth';
import { useRoleGuard } from '../../../lib/hooks/useRoleGuard';

export default function MentorDashboardPage() {
  const router = useRouter();
  const { user, isLoading: authLoading } = useConvexAuth();
  const professional = useQuery(api.professionals.getCurrentProfessional);

  // Protect this page - only mentors can access
  useRoleGuard(['mentor']);

  // Redirect to onboarding if no professional profile
  useEffect(() => {
    if (!authLoading && user && professional === null && user.role === 'mentor') {
      router.push('/onboarding/mentor');
    }
  }, [professional, authLoading, user, router]);

  // Loading state
  if (authLoading || professional === undefined) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="animate-pulse">
            <h1 className="text-4xl font-black mb-4">Loading your dashboard...</h1>
          </div>
        </div>
      </div>
    );
  }

  // No professional profile found
  if (!professional) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <h1 className="text-4xl font-black mb-4">Redirecting to onboarding...</h1>
        </div>
      </div>
    );
  }

  const fullName = `${professional.firstName} ${professional.lastName}`;

  return (
    <div className="min-h-screen bg-gray-50 py-4 sm:py-8">
      <div className="container mx-auto px-4 max-w-7xl">
        {/* Header */}
        <div className="mb-6 sm:mb-8">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-4">
            <div>
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-black mb-2">Mentor Dashboard</h1>
              <p className="text-base sm:text-lg md:text-xl text-gray-700">Welcome back, {professional.firstName}!</p>
            </div>
            <div className="flex items-center gap-2 sm:gap-3">
              <Link
                href="/dashboard/mentor/notifications"
                className="p-3 min-h-[44px] min-w-[44px] bg-white border-2 border-brutal-border shadow-brutal-sm hover:shadow-brutal transition-all relative flex items-center justify-center"
                title="Notifications"
              >
                <Bell className="w-5 h-5" />
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
        <div className="mb-6 sm:mb-8 bg-gradient-to-r from-brutal-orange to-brutal-pink border-3 border-brutal-border shadow-brutal-lg p-4 sm:p-6 md:p-8">
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-6">
            <div className="w-20 h-20 sm:w-24 sm:h-24 bg-white border-3 border-brutal-border shadow-brutal flex-shrink-0 overflow-hidden">
              {professional.avatar ? (
                <img
                  src={professional.avatar}
                  alt={fullName}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center bg-brutal-blue text-white text-3xl font-black">
                  {professional.firstName?.[0]}{professional.lastName?.[0]}
                </div>
              )}
            </div>

            <div className="flex-1 w-full sm:w-auto">
              <h2 className="text-2xl sm:text-3xl font-black text-white mb-1">{fullName}</h2>
              <p className="text-base sm:text-lg md:text-xl font-bold text-white/90 mb-2 sm:mb-3">
                {professional.jobTitle} at {professional.company}
              </p>
              <div className="flex flex-wrap gap-3 sm:gap-4 text-white text-sm sm:text-base">
                <div className="flex items-center gap-2">
                  <Star className="w-4 h-4 sm:w-5 sm:h-5 fill-white" />
                  <span className="font-bold">{professional.rating.toFixed(1)} Rating</span>
                </div>
                <div className="flex items-center gap-2">
                  <MessageCircle className="w-4 h-4 sm:w-5 sm:h-5" />
                  <span className="font-bold">{professional.chatsCompleted} Sessions</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4 sm:w-5 sm:h-5" />
                  <span className="font-bold">{professional.yearsExperience} years experience</span>
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
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 md:gap-6 mb-6 sm:mb-8">
          {/* Sessions Completed */}
          <div className="bg-brutal-blue text-white border-3 border-brutal-border shadow-brutal-lg p-4 sm:p-6">
            <div className="flex items-center justify-between mb-2">
              <MessageCircle className="w-6 h-6 sm:w-8 sm:h-8" />
              <span className="text-2xl sm:text-3xl font-black">{professional.chatsCompleted}</span>
            </div>
            <p className="font-black uppercase text-xs sm:text-sm">Total Sessions</p>
          </div>

          {/* Total Earnings */}
          <div className="bg-brutal-green border-3 border-brutal-border shadow-brutal-lg p-4 sm:p-6">
            <div className="flex items-center justify-between mb-2">
              <DollarSign className="w-6 h-6 sm:w-8 sm:h-8" />
              <span className="text-2xl sm:text-3xl font-black">{(professional.totalEarnings / 1000).toFixed(0)}K</span>
            </div>
            <p className="font-black uppercase text-xs sm:text-sm">Total Earnings (RWF)</p>
          </div>

          {/* Average Rating */}
          <div className="bg-brutal-yellow border-3 border-brutal-border shadow-brutal-lg p-4 sm:p-6">
            <div className="flex items-center justify-between mb-2">
              <Star className="w-6 h-6 sm:w-8 sm:h-8 fill-black" />
              <span className="text-2xl sm:text-3xl font-black">{professional.rating.toFixed(1)}</span>
            </div>
            <p className="font-black uppercase text-xs sm:text-sm">Average Rating</p>
          </div>

          {/* Years Experience */}
          <div className="bg-brutal-pink border-3 border-brutal-border shadow-brutal-lg p-4 sm:p-6">
            <div className="flex items-center justify-between mb-2">
              <Award className="w-6 h-6 sm:w-8 sm:h-8" />
              <span className="text-2xl sm:text-3xl font-black">{professional.yearsExperience}</span>
            </div>
            <p className="font-black uppercase text-xs sm:text-sm">Years Experience</p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8">
          {/* Left Column - Main Content */}
          <div className="lg:col-span-2 space-y-6 sm:space-y-8">
            {/* Bio Section */}
            <div className="bg-white border-3 border-brutal-border shadow-brutal-lg p-4 sm:p-6 md:p-8">
              <h2 className="text-xl sm:text-2xl md:text-3xl font-black uppercase mb-4">About Me</h2>
              <p className="text-gray-700 leading-relaxed">{professional.bio}</p>
            </div>

            {/* Getting Started Guide */}
            <div className="bg-white border-3 border-brutal-border shadow-brutal-lg p-4 sm:p-6 md:p-8">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-6">
                <h2 className="text-xl sm:text-2xl md:text-3xl font-black uppercase flex items-center gap-2">
                  <CheckCircle className="w-6 h-6 sm:w-8 sm:h-8" />
                  Getting Started
                </h2>
              </div>

              <div className="space-y-4">
                <div className="border-2 border-brutal-border p-4 sm:p-6">
                  <h3 className="text-lg font-black mb-2">1. Set Your Availability</h3>
                  <p className="text-gray-700 mb-3">
                    Let students know when you&apos;re available for mentoring sessions
                  </p>
                  <Link
                    href="/dashboard/mentor/availability"
                    className="inline-block px-6 py-2 bg-brutal-blue text-white font-bold uppercase text-sm border-2 border-brutal-border shadow-brutal hover:shadow-brutal-lg transition-all"
                  >
                    Set Availability
                  </Link>
                </div>

                <div className="border-2 border-brutal-border p-4 sm:p-6">
                  <h3 className="text-lg font-black mb-2">2. Browse Career Categories</h3>
                  <p className="text-gray-700 mb-3">
                    Choose which career paths you can provide guidance on
                  </p>
                  <Link
                    href="/careers"
                    className="inline-block px-6 py-2 bg-brutal-orange text-white font-bold uppercase text-sm border-2 border-brutal-border shadow-brutal hover:shadow-brutal-lg transition-all"
                  >
                    Browse Careers
                  </Link>
                </div>

                <div className="border-2 border-brutal-border p-4 sm:p-6">
                  <h3 className="text-lg font-black mb-2">3. Wait for Bookings</h3>
                  <p className="text-gray-700">
                    Students will discover your profile and book sessions with you
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Sidebar */}
          <div className="space-y-6">
            {/* Quick Actions */}
            <div className="bg-white border-3 border-brutal-border shadow-brutal-lg p-6">
              <h3 className="text-xl font-black uppercase mb-4">Quick Actions</h3>
              <div className="space-y-3">
                <Link
                  href="/dashboard/mentor/bookings"
                  className="block w-full px-4 py-3 bg-brutal-green text-white font-bold uppercase text-sm border-2 border-brutal-border shadow-brutal hover:shadow-brutal-lg hover:translate-x-[-2px] hover:translate-y-[-2px] transition-all text-center"
                >
                  Manage Bookings
                </Link>
                <Link
                  href="/dashboard/mentor/availability"
                  className="block w-full px-4 py-3 bg-brutal-blue text-white font-bold uppercase text-sm border-2 border-brutal-border shadow-brutal hover:shadow-brutal-lg hover:translate-x-[-2px] hover:translate-y-[-2px] transition-all text-center"
                >
                  Update Availability
                </Link>
                <Link
                  href="/dashboard/mentor/profile"
                  className="block w-full px-4 py-3 bg-brutal-orange text-white font-bold uppercase text-sm border-2 border-brutal-border shadow-brutal hover:shadow-brutal-lg hover:translate-x-[-2px] hover:translate-y-[-2px] transition-all text-center"
                >
                  Edit Profile
                </Link>
                <Link
                  href="/mentors"
                  className="block w-full px-4 py-3 bg-gray-700 text-white font-bold uppercase text-sm border-2 border-brutal-border shadow-brutal hover:shadow-brutal-lg hover:translate-x-[-2px] hover:translate-y-[-2px] transition-all text-center"
                >
                  View Public Profile
                </Link>
              </div>
            </div>

            {/* Tips for Mentors */}
            <div className="bg-brutal-yellow border-3 border-brutal-border shadow-brutal-lg p-6">
              <h3 className="text-xl font-black uppercase mb-4">Mentor Tips</h3>
              <ul className="space-y-3">
                <li className="flex items-start gap-2">
                  <span className="text-lg">✓</span>
                  <span className="text-sm font-bold">Respond to sessions within 24 hours</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-lg">✓</span>
                  <span className="text-sm font-bold">Keep availability calendar updated</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-lg">✓</span>
                  <span className="text-sm font-bold">Share real career experiences</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-lg">✓</span>
                  <span className="text-sm font-bold">Be encouraging and supportive</span>
                </li>
              </ul>
            </div>

            {/* Impact */}
            <div className="bg-white border-3 border-brutal-border shadow-brutal-lg p-6">
              <h3 className="text-xl font-black uppercase mb-4 flex items-center gap-2">
                <Users className="w-5 h-5" />
                Your Impact
              </h3>
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between mb-2">
                    <span className="text-sm font-bold">Sessions Goal</span>
                    <span className="text-sm font-black">{professional.chatsCompleted}/50</span>
                  </div>
                  <div className="w-full h-3 bg-gray-200 border-2 border-brutal-border">
                    <div
                      className="h-full bg-brutal-blue"
                      style={{ width: `${Math.min((professional.chatsCompleted / 50) * 100, 100)}%` }}
                    />
                  </div>
                </div>

                <div className="pt-4 border-t-2 border-gray-200">
                  <p className="text-sm font-bold text-gray-700">
                    You&apos;re helping shape the future of Rwandan students! 🇷🇼
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
