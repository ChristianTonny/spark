"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  BookOpen,
  MessageCircle,
  CheckCircle,
  Clock,
  Users,
  Settings,
  TrendingUp,
  Heart,
  AlertCircle,
  Send,
  Award,
} from "lucide-react";
import Link from "next/link";

export default function MentorDashboard() {
  // Mock data
  const mentorData = {
    name: "Emmanuel Nkunda",
    expertiseArea: "Mathematics & Sciences",
    avatar: "EN",
    questionsAnswered: 87,
    studentsHelped: 52,
    averageResponseTime: "2.3 hrs",
    helpfulRating: 96,
  };

  const pendingQuestions = [
    {
      id: 1,
      student: "Jane M.",
      subject: "Mathematics",
      question: "Can someone explain how to solve quadratic equations using the formula?",
      postedTime: "15 min ago",
      urgency: "high",
    },
    {
      id: 2,
      student: "David K.",
      subject: "Physics",
      question: "I'm confused about Newton's second law. How do I apply F=ma in real problems?",
      postedTime: "1 hour ago",
      urgency: "medium",
    },
    {
      id: 3,
      student: "Sarah N.",
      subject: "Chemistry",
      question: "What's the difference between covalent and ionic bonding?",
      postedTime: "3 hours ago",
      urgency: "low",
    },
  ];

  const recentAnswers = [
    {
      id: 1,
      student: "John D.",
      subject: "Mathematics",
      question: "How do I factor polynomials?",
      answeredTime: "2 hours ago",
      helpful: 12,
      status: "resolved",
    },
    {
      id: 2,
      student: "Mary W.",
      subject: "Biology",
      question: "Can you explain photosynthesis?",
      answeredTime: "5 hours ago",
      helpful: 8,
      status: "resolved",
    },
    {
      id: 3,
      student: "Peter M.",
      subject: "Physics",
      question: "Help with projectile motion",
      answeredTime: "1 day ago",
      helpful: 15,
      status: "resolved",
    },
  ];

  const subjectBreakdown = [
    { subject: "Mathematics", questions: 34, percentage: 39 },
    { subject: "Physics", questions: 25, percentage: 29 },
    { subject: "Chemistry", questions: 18, percentage: 21 },
    { subject: "Biology", questions: 10, percentage: 11 },
  ];

  const achievements = [
    { id: 1, name: "First Answer", icon: "🎯", unlocked: true },
    { id: 2, name: "10 Students Helped", icon: "🌟", unlocked: true },
    { id: 3, name: "50 Questions Answered", icon: "💯", unlocked: true },
    { id: 4, name: "Fast Responder", icon: "⚡", unlocked: true },
    { id: 5, name: "100 Helpful Votes", icon: "❤️", unlocked: false },
    { id: 6, name: "Top Mentor", icon: "🏆", unlocked: false },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 sticky top-10 z-40">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Link href="/">
                <div className="w-10 h-10 bg-spark-purple rounded-lg flex items-center justify-center">
                  <BookOpen className="w-6 h-6 text-white" />
                </div>
              </Link>
              <h1 className="text-xl font-bold text-gray-900">Mentor Dashboard</h1>
            </div>
            <div className="flex items-center gap-3">
              <Badge variant="online" className="hidden sm:flex">
                Connected
              </Badge>
              <Link href="/dashboard/mentor/settings">
                <Button variant="ghost" size="icon">
                  <Settings className="h-5 w-5" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        {/* Profile Section */}
        <Card className="mb-8">
          <CardContent className="pt-6">
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6">
              <div className="w-20 h-20 rounded-full bg-spark-purple flex items-center justify-center text-white text-2xl font-bold">
                {mentorData.avatar}
              </div>
              <div className="flex-1">
                <h2 className="text-2xl font-bold text-gray-900 mb-1">
                  {mentorData.name}
                </h2>
                <div className="flex items-center gap-2 mb-2">
                  <Badge variant="secondary">{mentorData.expertiseArea}</Badge>
                  <div className="flex items-center gap-1 text-spark-purple">
                    <Heart className="h-4 w-4 fill-current" />
                    <span className="text-sm font-semibold">
                      {mentorData.helpfulRating}% Helpful
                    </span>
                  </div>
                </div>
              </div>
              <Link href="/dashboard/mentor/profile">
                <Button variant="outline">Edit Profile</Button>
              </Link>
            </div>
          </CardContent>
        </Card>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600 mb-1">Questions Answered</p>
                  <p className="text-3xl font-bold text-gray-900">
                    {mentorData.questionsAnswered}
                  </p>
                  <p className="text-xs text-gray-500 mt-1">total responses</p>
                </div>
                <MessageCircle className="h-10 w-10 text-spark-blue" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600 mb-1">Students Helped</p>
                  <p className="text-3xl font-bold text-gray-900">
                    {mentorData.studentsHelped}
                  </p>
                  <p className="text-xs text-gray-500 mt-1">unique students</p>
                </div>
                <Users className="h-10 w-10 text-spark-green" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600 mb-1">Avg. Response</p>
                  <p className="text-3xl font-bold text-gray-900">
                    {mentorData.averageResponseTime}
                  </p>
                  <p className="text-xs text-gray-500 mt-1">response time</p>
                </div>
                <Clock className="h-10 w-10 text-spark-orange" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600 mb-1">Helpful Rating</p>
                  <p className="text-3xl font-bold text-gray-900">
                    {mentorData.helpfulRating}%
                  </p>
                  <p className="text-xs text-gray-500 mt-1">satisfaction</p>
                </div>
                <TrendingUp className="h-10 w-10 text-spark-purple" />
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content - Left Column (2/3 width) */}
          <div className="lg:col-span-2 space-y-8">
            {/* Pending Questions Queue */}
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="flex items-center gap-2">
                      <AlertCircle className="h-5 w-5 text-spark-orange" />
                      Questions Awaiting Your Help
                    </CardTitle>
                    <CardDescription>Students need your expertise</CardDescription>
                  </div>
                  <Badge variant="warning">{pendingQuestions.length} pending</Badge>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {pendingQuestions.map((item) => (
                    <div
                      key={item.id}
                      className="p-4 rounded-lg border border-gray-200 hover:border-spark-purple transition-colors"
                    >
                      <div className="flex items-start justify-between mb-2">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-2">
                            <span className="font-semibold text-gray-900">
                              {item.student}
                            </span>
                            <Badge variant="secondary" className="text-xs">
                              {item.subject}
                            </Badge>
                            <Badge
                              variant={
                                item.urgency === "high"
                                  ? "destructive"
                                  : item.urgency === "medium"
                                  ? "warning"
                                  : "secondary"
                              }
                              className="text-xs"
                            >
                              {item.urgency}
                            </Badge>
                          </div>
                          <p className="text-sm text-gray-700 mb-2">
                            {item.question}
                          </p>
                          <span className="text-xs text-gray-500 flex items-center gap-1">
                            <Clock className="h-3 w-3" />
                            {item.postedTime}
                          </span>
                        </div>
                      </div>
                      <div className="flex gap-2 mt-3">
                        <Link href={`/dashboard/mentor/answer/${item.id}`}>
                          <Button size="sm" variant="default">
                            <Send className="h-4 w-4 mr-2" />
                            Answer
                          </Button>
                        </Link>
                        <Button size="sm" variant="outline">
                          View Details
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Recent Answers */}
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle>Your Recent Answers</CardTitle>
                    <CardDescription>Questions you've helped with recently</CardDescription>
                  </div>
                  <Link href="/dashboard/mentor/history">
                    <Button variant="outline" size="sm">
                      View All
                    </Button>
                  </Link>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentAnswers.map((answer) => (
                    <div
                      key={answer.id}
                      className="p-4 rounded-lg border border-gray-200 hover:border-spark-green transition-colors"
                    >
                      <div className="flex items-start justify-between mb-2">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            <span className="font-semibold text-gray-900">
                              {answer.student}
                            </span>
                            <Badge variant="secondary" className="text-xs">
                              {answer.subject}
                            </Badge>
                            <Badge variant="success" className="text-xs">
                              <CheckCircle className="h-3 w-3 mr-1" />
                              Resolved
                            </Badge>
                          </div>
                          <p className="text-sm text-gray-700 mb-2">
                            {answer.question}
                          </p>
                          <div className="flex items-center gap-3 text-xs text-gray-500">
                            <span className="flex items-center gap-1">
                              <Clock className="h-3 w-3" />
                              {answer.answeredTime}
                            </span>
                            <span className="flex items-center gap-1 text-spark-purple">
                              <Heart className="h-3 w-3 fill-current" />
                              {answer.helpful} found helpful
                            </span>
                          </div>
                        </div>
                      </div>
                      <div className="flex gap-2 mt-3">
                        <Button size="sm" variant="outline">
                          View Answer
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Right Sidebar (1/3 width) */}
          <div className="space-y-8">
            {/* Subject Breakdown */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <MessageCircle className="h-5 w-5 text-spark-blue" />
                  Subject Breakdown
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {subjectBreakdown.map((item, idx) => (
                    <div key={idx} className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-medium text-gray-900">
                          {item.subject}
                        </span>
                        <span className="text-sm text-gray-600 font-medium">
                          {item.questions}
                        </span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div
                          className="bg-spark-purple rounded-full h-2"
                          style={{ width: `${item.percentage}%` }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Achievements */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Award className="h-5 w-5 text-spark-orange" />
                  Achievements
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-3 gap-3">
                  {achievements.map((achievement) => (
                    <div
                      key={achievement.id}
                      className={`aspect-square rounded-lg flex flex-col items-center justify-center p-2 text-center transition-all ${
                        achievement.unlocked
                          ? "bg-gradient-to-br from-spark-purple to-spark-blue shadow-md"
                          : "bg-gray-100"
                      }`}
                    >
                      <span className="text-2xl mb-1">{achievement.icon}</span>
                      <span
                        className={`text-xs font-medium ${
                          achievement.unlocked ? "text-white" : "text-gray-400"
                        }`}
                      >
                        {achievement.name}
                      </span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Quick Actions */}
            <Card>
              <CardHeader>
                <CardTitle>Quick Actions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <Link href="/dashboard/mentor/questions">
                  <Button variant="default" className="w-full justify-start">
                    <MessageCircle className="h-4 w-4 mr-2" />
                    Browse All Questions
                  </Button>
                </Link>
                <Link href="/dashboard/mentor/students">
                  <Button variant="outline" className="w-full justify-start">
                    <Users className="h-4 w-4 mr-2" />
                    Students I've Helped
                  </Button>
                </Link>
                <Link href="/dashboard/mentor/availability">
                  <Button variant="outline" className="w-full justify-start">
                    <Clock className="h-4 w-4 mr-2" />
                    Set Availability
                  </Button>
                </Link>
              </CardContent>
            </Card>

            {/* Tips */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <AlertCircle className="h-5 w-5 text-spark-orange" />
                  Mentoring Tips
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3 text-sm text-gray-600">
                  <p>
                    💡 <strong>Be clear:</strong> Break down complex concepts into simple steps.
                  </p>
                  <p>
                    🎯 <strong>Ask questions:</strong> Help students think through problems themselves.
                  </p>
                  <p>
                    ❤️ <strong>Be encouraging:</strong> Positive feedback boosts confidence.
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
