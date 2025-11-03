'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { 
  User, Calendar, MessageCircle, Star, TrendingUp, Clock, 
  Users, ArrowRight, CheckCircle, Settings, Bell
} from 'lucide-react';

export default function MentorDashboardPage() {
  const [upcomingSessions, setUpcomingSessions] = useState<any[]>([]);
  const [studentQuestions, setStudentQuestions] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Mock mentor profile - in a real app, this would come from authentication
  const mentorProfile = {
    id: 'prof-1',
    name: 'Jean Claude Niyonsenga',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=JeanClaude',
    company: 'Andela',
    jobTitle: 'Senior Software Engineer',
    rating: 4.9,
    totalSessions: 47,
    yearsExperience: 8,
    responseRate: 98,
    responseTime: '< 2 hours',
  };

  const stats = {
    sessionsThisMonth: 12,
    totalEarnings: 420,
    avgRating: 4.9,
    completionRate: 98,
  };

  // Load mock data
  useEffect(() => {
    // Simulate loading
    setTimeout(() => {
      // Mock upcoming sessions
      setUpcomingSessions([
        {
          id: 1,
          studentName: 'Alex Johnson',
          studentAvatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=AlexJohnson',
          topic: 'Career advice in Software Engineering',
          date: 'Nov 5, 2025',
          time: '2:00 PM',
          duration: '15 min',
          status: 'confirmed',
        },
        {
          id: 2,
          studentName: 'Maria Garcia',
          studentAvatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=MariaGarcia',
          topic: 'Transitioning to tech career',
          date: 'Nov 6, 2025',
          time: '10:30 AM',
          duration: '15 min',
          status: 'confirmed',
        },
        {
          id: 3,
          studentName: 'David Kim',
          studentAvatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=DavidKim',
          topic: 'Learning web development',
          date: 'Nov 7, 2025',
          time: '4:15 PM',
          duration: '15 min',
          status: 'pending',
        },
      ]);

      // Mock student questions
      setStudentQuestions([
        {
          id: 1,
          studentName: 'Sarah Williams',
          question: 'What programming language should I learn first as a beginner?',
          askedAt: '2 hours ago',
          replies: 0,
        },
        {
          id: 2,
          studentName: 'Michael Brown',
          question: 'How do I build a portfolio with no experience?',
          askedAt: '5 hours ago',
          replies: 1,
        },
        {
          id: 3,
          studentName: 'Emily Chen',
          question: 'What soft skills are most important in tech?',
          askedAt: '1 day ago',
          replies: 2,
        },
      ]);

      setIsLoading(false);
    }, 800);
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4 max-w-7xl">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h1 className="text-5xl font-black mb-2">Mentor Dashboard</h1>
              <p className="text-xl text-gray-700">Welcome back, {mentorProfile.name}!</p>
            </div>
            <div className="flex items-center gap-3">
              <Link
                href="/dashboard/mentor/notifications"
                className="p-3 bg-white border-2 border-brutal-border shadow-brutal-sm hover:shadow-brutal transition-all relative"
                title="Notifications"
              >
                <Bell className="w-5 h-5" />
                <span className="absolute -top-1 -right-1 w-5 h-5 bg-brutal-orange text-white text-xs font-black flex items-center justify-center rounded-full border-2 border-white">
                  3
                </span>
              </Link>
              <Link
                href="/dashboard/mentor/settings"
                className="px-4 py-2 bg-white border-2 border-brutal-border shadow-brutal-sm hover:shadow-brutal transition-all font-bold uppercase text-sm flex items-center gap-2"
              >
                <Settings className="w-4 h-4" />
                Settings
              </Link>
            </div>
          </div>
        </div>

        {/* Profile Overview Card */}
        <div className="mb-8 bg-gradient-to-r from-brutal-blue to-brutal-purple border-3 border-brutal-border shadow-brutal-lg p-8">
          <div className="flex flex-col md:flex-row items-start md:items-center gap-6">
            <div className="w-24 h-24 bg-white border-3 border-brutal-border shadow-brutal flex-shrink-0">
              <img
                src={mentorProfile.avatar}
                alt={mentorProfile.name}
                className="w-full h-full"
              />
            </div>
            
            <div className="flex-1">
              <h2 className="text-3xl font-black text-white mb-1">{mentorProfile.name}</h2>
              <p className="text-xl font-bold text-white/90 mb-3">
                {mentorProfile.jobTitle} at {mentorProfile.company}
              </p>
              <div className="flex flex-wrap gap-4 text-white">
                <div className="flex items-center gap-2">
                  <Star className="w-5 h-5 fill-white" />
                  <span className="font-bold">{mentorProfile.rating} Rating</span>
                </div>
                <div className="flex items-center gap-2">
                  <MessageCircle className="w-5 h-5" />
                  <span className="font-bold">{mentorProfile.totalSessions} Sessions</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="w-5 h-5" />
                  <span className="font-bold">{mentorProfile.responseTime} Response</span>
                </div>
              </div>
            </div>

            <Link
              href="/dashboard/mentor/profile"
              className="px-6 py-3 bg-white text-brutal-text font-bold uppercase text-sm border-2 border-brutal-border shadow-brutal hover:shadow-brutal-lg hover:translate-x-[-2px] hover:translate-y-[-2px] transition-all flex items-center gap-2"
            >
              <User className="w-4 h-4" />
              Edit Profile
            </Link>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid md:grid-cols-4 gap-6 mb-8">
          {/* Sessions This Month */}
          <div className="bg-brutal-yellow border-3 border-brutal-border shadow-brutal-lg p-6">
            <div className="flex items-center justify-between mb-2">
              <Calendar className="w-8 h-8" />
              <span className="text-3xl font-black">{stats.sessionsThisMonth}</span>
            </div>
            <p className="font-black uppercase text-sm">Sessions This Month</p>
          </div>

          {/* Total Earnings */}
          <div className="bg-brutal-green border-3 border-brutal-border shadow-brutal-lg p-6">
            <div className="flex items-center justify-between mb-2">
              <TrendingUp className="w-8 h-8" />
              <span className="text-3xl font-black">${stats.totalEarnings}</span>
            </div>
            <p className="font-black uppercase text-sm">Total Earnings</p>
          </div>

          {/* Average Rating */}
          <div className="bg-brutal-pink border-3 border-brutal-border shadow-brutal-lg p-6">
            <div className="flex items-center justify-between mb-2">
              <Star className="w-8 h-8 fill-black" />
              <span className="text-3xl font-black">{stats.avgRating}</span>
            </div>
            <p className="font-black uppercase text-sm">Average Rating</p>
          </div>

          {/* Completion Rate */}
          <div className="bg-brutal-blue border-3 border-brutal-border shadow-brutal-lg p-6 text-white">
            <div className="flex items-center justify-between mb-2">
              <CheckCircle className="w-8 h-8" />
              <span className="text-3xl font-black">{stats.completionRate}%</span>
            </div>
            <p className="font-black uppercase text-sm">Completion Rate</p>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Left Column - Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Upcoming Sessions */}
            <div className="bg-white border-3 border-brutal-border shadow-brutal-lg p-8">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-3xl font-black uppercase flex items-center gap-2">
                  <Calendar className="w-8 h-8" />
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
                    <div key={i} className="h-24 bg-gray-200 animate-pulse border-2 border-gray-300" />
                  ))}
                </div>
              ) : upcomingSessions.length === 0 ? (
                <div className="text-center py-12">
                  <Calendar className="w-16 h-16 mx-auto mb-4 text-gray-400" />
                  <p className="text-gray-600 font-bold mb-2">No upcoming sessions</p>
                  <p className="text-sm text-gray-500">New bookings will appear here</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {upcomingSessions.map((session) => (
                    <div
                      key={session.id}
                      className="border-2 border-brutal-border p-6 hover:shadow-brutal transition-all"
                    >
                      <div className="flex items-start gap-4">
                        <div className="w-12 h-12 bg-brutal-pink border-2 border-brutal-border flex-shrink-0">
                          <img
                            src={session.studentAvatar}
                            alt={session.studentName}
                            className="w-full h-full"
                          />
                        </div>
                        
                        <div className="flex-1">
                          <div className="flex items-start justify-between mb-2">
                            <div>
                              <h3 className="text-xl font-black">{session.studentName}</h3>
                              <p className="text-sm text-gray-700 font-bold">{session.topic}</p>
                            </div>
                            <span className={`px-3 py-1 text-xs font-black uppercase border-2 border-brutal-border ${
                              session.status === 'confirmed' 
                                ? 'bg-brutal-green' 
                                : 'bg-brutal-yellow'
                            }`}>
                              {session.status}
                            </span>
                          </div>
                          
                          <div className="flex flex-wrap gap-4 text-sm font-bold text-gray-600">
                            <span className="flex items-center gap-1">
                              <Calendar className="w-4 h-4" />
                              {session.date}
                            </span>
                            <span className="flex items-center gap-1">
                              <Clock className="w-4 h-4" />
                              {session.time} ({session.duration})
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
            <div className="bg-white border-3 border-brutal-border shadow-brutal-lg p-8">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-3xl font-black uppercase flex items-center gap-2">
                  <MessageCircle className="w-8 h-8" />
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
