"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  BookOpen,
  Download,
  MessageCircle,
  CheckCircle,
  Flame,
  Settings,
  TrendingUp,
  FileText,
  Target,
  Award,
  Calendar,
  Clock,
} from "lucide-react";
import Link from "next/link";

export default function StudentDashboard() {
  // Mock data
  const studentData = {
    name: "Jane Mukarwego",
    gradeLevel: "O-Level Year 2",
    avatar: "JM",
    streak: 12,
    contentDownloaded: 8,
    questionsAsked: 23,
    practiceCompleted: 78,
  };

  const recentActivity = [
    {
      id: 1,
      type: "download",
      title: "Downloaded Mathematics - Algebra Pack",
      subject: "Mathematics",
      time: "2 hours ago",
      icon: Download,
    },
    {
      id: 2,
      type: "question",
      title: "Asked question about Quadratic Equations",
      subject: "Mathematics",
      time: "5 hours ago",
      icon: MessageCircle,
    },
    {
      id: 3,
      type: "practice",
      title: "Completed Chemistry Practice Test",
      subject: "Chemistry",
      time: "1 day ago",
      icon: CheckCircle,
    },
    {
      id: 4,
      type: "download",
      title: "Downloaded Physics - Mechanics Pack",
      subject: "Physics",
      time: "2 days ago",
      icon: Download,
    },
  ];

  const downloadedContent = [
    {
      id: 1,
      title: "Algebra Fundamentals",
      subject: "Mathematics",
      size: "45 MB",
      progress: 60,
      downloadDate: "Jan 15, 2024",
    },
    {
      id: 2,
      title: "Chemical Reactions",
      subject: "Chemistry",
      size: "32 MB",
      progress: 100,
      downloadDate: "Jan 10, 2024",
    },
    {
      id: 3,
      title: "Physics Mechanics",
      subject: "Physics",
      size: "58 MB",
      progress: 35,
      downloadDate: "Jan 18, 2024",
    },
  ];

  const learningGoals = [
    {
      id: 1,
      goal: "Complete Algebra Module",
      progress: 75,
      dueDate: "Feb 15, 2024",
      status: "on-track",
    },
    {
      id: 2,
      goal: "Master Chemical Equations",
      progress: 50,
      dueDate: "Feb 20, 2024",
      status: "on-track",
    },
    {
      id: 3,
      goal: "Physics Practice Problems",
      progress: 30,
      dueDate: "Feb 10, 2024",
      status: "behind",
    },
  ];

  const achievements = [
    { id: 1, name: "7-Day Streak", icon: "🔥", unlocked: true },
    { id: 2, name: "First Download", icon: "📥", unlocked: true },
    { id: 3, name: "10 Questions Asked", icon: "❓", unlocked: true },
    { id: 4, name: "Practice Master", icon: "🎯", unlocked: false },
    { id: 5, name: "30-Day Streak", icon: "⭐", unlocked: false },
    { id: 6, name: "Top Contributor", icon: "🏆", unlocked: false },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        {/* Profile Section */}
        <Card className="mb-8">
          <CardContent className="pt-6">
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6">
              <div className="w-20 h-20 rounded-full bg-spark-blue flex items-center justify-center text-white text-2xl font-bold">
                {studentData.avatar}
              </div>
              <div className="flex-1">
                <h2 className="text-2xl font-bold text-gray-900 mb-1">
                  {studentData.name}
                </h2>
                <div className="flex items-center gap-2 mb-2">
                  <Badge variant="secondary">{studentData.gradeLevel}</Badge>
                  <div className="flex items-center gap-1 text-spark-orange">
                    <Flame className="h-4 w-4" />
                    <span className="text-sm font-semibold">
                      {studentData.streak} day streak
                    </span>
                  </div>
                </div>
              </div>
              <Link href="/dashboard/student/profile">
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
                  <p className="text-sm text-gray-600 mb-1">Study Streak</p>
                  <p className="text-3xl font-bold text-gray-900">
                    {studentData.streak}
                  </p>
                  <p className="text-xs text-gray-500 mt-1">days active</p>
                </div>
                <Flame className="h-10 w-10 text-spark-orange" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600 mb-1">Content</p>
                  <p className="text-3xl font-bold text-gray-900">
                    {studentData.contentDownloaded}
                  </p>
                  <p className="text-xs text-gray-500 mt-1">packs downloaded</p>
                </div>
                <Download className="h-10 w-10 text-spark-blue" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600 mb-1">Questions</p>
                  <p className="text-3xl font-bold text-gray-900">
                    {studentData.questionsAsked}
                  </p>
                  <p className="text-xs text-gray-500 mt-1">asked mentors</p>
                </div>
                <MessageCircle className="h-10 w-10 text-spark-purple" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600 mb-1">Practice</p>
                  <p className="text-3xl font-bold text-gray-900">
                    {studentData.practiceCompleted}%
                  </p>
                  <p className="text-xs text-gray-500 mt-1">completed</p>
                </div>
                <TrendingUp className="h-10 w-10 text-spark-green" />
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content - Left Column (2/3 width) */}
          <div className="lg:col-span-2 space-y-8">
            {/* Recent Activity */}
            <Card>
              <CardHeader>
                <CardTitle>Recent Activity</CardTitle>
                <CardDescription>Your learning activity in the last 7 days</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentActivity.map((activity) => {
                    const Icon = activity.icon;
                    return (
                      <div
                        key={activity.id}
                        className="flex items-start gap-4 p-4 rounded-lg hover:bg-gray-50 transition-colors"
                      >
                        <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0">
                          <Icon className="h-5 w-5 text-spark-blue" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium text-gray-900">
                            {activity.title}
                          </p>
                          <div className="flex items-center gap-2 mt-1">
                            <Badge variant="secondary" className="text-xs">
                              {activity.subject}
                            </Badge>
                            <span className="text-xs text-gray-500 flex items-center gap-1">
                              <Clock className="h-3 w-3" />
                              {activity.time}
                            </span>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </CardContent>
            </Card>

            {/* Downloaded Content */}
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle>Downloaded Content</CardTitle>
                    <CardDescription>Your offline learning materials</CardDescription>
                  </div>
                  <Link href="/content/browse">
                    <Button variant="outline" size="sm">
                      Browse More
                    </Button>
                  </Link>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {downloadedContent.map((content) => (
                    <div
                      key={content.id}
                      className="p-4 rounded-lg border border-gray-200 hover:border-spark-blue transition-colors"
                    >
                      <div className="flex items-start justify-between mb-3">
                        <div>
                          <h4 className="font-semibold text-gray-900 mb-1">
                            {content.title}
                          </h4>
                          <div className="flex items-center gap-2">
                            <Badge variant="secondary" className="text-xs">
                              {content.subject}
                            </Badge>
                            <span className="text-xs text-gray-500">{content.size}</span>
                          </div>
                        </div>
                        <Link href={`/content/view/${content.id}`}>
                          <Button variant="outline" size="sm">
                            View
                          </Button>
                        </Link>
                      </div>
                      <div className="space-y-2">
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-gray-600">Progress</span>
                          <span className="font-medium text-gray-900">
                            {content.progress}%
                          </span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div
                            className="bg-spark-blue rounded-full h-2 transition-all"
                            style={{ width: `${content.progress}%` }}
                          />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Right Sidebar (1/3 width) */}
          <div className="space-y-8">
            {/* Learning Goals */}
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="flex items-center gap-2">
                    <Target className="h-5 w-5 text-spark-blue" />
                    Goals
                  </CardTitle>
                  <Link href="/dashboard/student/goals/new">
                    <Button variant="ghost" size="sm">
                      + New
                    </Button>
                  </Link>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {learningGoals.map((goal) => (
                    <div key={goal.id} className="space-y-2">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <p className="text-sm font-medium text-gray-900">
                            {goal.goal}
                          </p>
                          <div className="flex items-center gap-2 mt-1">
                            <Calendar className="h-3 w-3 text-gray-400" />
                            <span className="text-xs text-gray-500">{goal.dueDate}</span>
                          </div>
                        </div>
                        <Badge
                          variant={goal.status === "on-track" ? "success" : "warning"}
                          className="text-xs"
                        >
                          {goal.status === "on-track" ? "On Track" : "Behind"}
                        </Badge>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-1.5">
                        <div
                          className={`rounded-full h-1.5 transition-all ${
                            goal.status === "on-track"
                              ? "bg-spark-green"
                              : "bg-spark-orange"
                          }`}
                          style={{ width: `${goal.progress}%` }}
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
                  <Award className="h-5 w-5 text-spark-purple" />
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
                          ? "bg-gradient-to-br from-spark-blue to-spark-purple shadow-md"
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
                <Link href="/content">
                  <Button variant="outline" className="w-full justify-start">
                    <Download className="h-4 w-4 mr-2" />
                    Browse Content
                  </Button>
                </Link>
                <Link href="/questions/ask">
                  <Button variant="outline" className="w-full justify-start">
                    <MessageCircle className="h-4 w-4 mr-2" />
                    Ask a Question
                  </Button>
                </Link>
                <Link href="/practice">
                  <Button variant="outline" className="w-full justify-start">
                    <FileText className="h-4 w-4 mr-2" />
                    Start Practice
                  </Button>
                </Link>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
