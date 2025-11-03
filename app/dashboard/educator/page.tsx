"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  BookOpen,
  Upload,
  CheckCircle,
  Clock,
  Users,
  Settings,
  TrendingUp,
  FileText,
  AlertCircle,
  Eye,
  BarChart3,
} from "lucide-react";
import Link from "next/link";

export default function EducatorDashboard() {
  // Mock data
  const educatorData = {
    name: "Dr. Sarah Mugisha",
    subject: "Mathematics",
    avatar: "SM",
    contentUploaded: 24,
    contentVerified: 18,
    studentsReached: 456,
    averageRating: 4.8,
  };

  const pendingVerification = [
    {
      id: 1,
      title: "Quadratic Equations Practice Set",
      subject: "Mathematics",
      submittedBy: "John Doe",
      submittedDate: "2 hours ago",
      status: "pending",
    },
    {
      id: 2,
      title: "Chemical Bonding Explained",
      subject: "Chemistry",
      submittedBy: "Jane Smith",
      submittedDate: "5 hours ago",
      status: "pending",
    },
    {
      id: 3,
      title: "Physics Motion Problems",
      subject: "Physics",
      submittedBy: "Mike Johnson",
      submittedDate: "1 day ago",
      status: "pending",
    },
  ];

  const recentUploads = [
    {
      id: 1,
      title: "Algebra Fundamentals Module",
      subject: "Mathematics",
      uploadDate: "Jan 20, 2024",
      downloads: 145,
      rating: 4.9,
      status: "verified",
    },
    {
      id: 2,
      title: "Trigonometry Practice Tests",
      subject: "Mathematics",
      uploadDate: "Jan 18, 2024",
      downloads: 98,
      rating: 4.7,
      status: "verified",
    },
    {
      id: 3,
      title: "Calculus Introduction",
      subject: "Mathematics",
      uploadDate: "Jan 15, 2024",
      downloads: 67,
      rating: 4.8,
      status: "under-review",
    },
  ];

  const studentEngagement = [
    { subject: "Mathematics", students: 234, growth: "+12%" },
    { subject: "Physics", students: 156, growth: "+8%" },
    { subject: "Chemistry", students: 66, growth: "+5%" },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        {/* Profile Section */}
        <Card className="mb-8">
          <CardContent className="pt-6">
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6">
              <div className="w-20 h-20 rounded-full bg-spark-green flex items-center justify-center text-white text-2xl font-bold">
                {educatorData.avatar}
              </div>
              <div className="flex-1">
                <h2 className="text-2xl font-bold text-gray-900 mb-1">
                  {educatorData.name}
                </h2>
                <div className="flex items-center gap-2 mb-2">
                  <Badge variant="secondary">{educatorData.subject} Educator</Badge>
                  <div className="flex items-center gap-1 text-spark-orange">
                    <span className="text-sm font-semibold">
                      ⭐ {educatorData.averageRating} Rating
                    </span>
                  </div>
                </div>
              </div>
              <Link href="/dashboard/educator/profile">
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
                  <p className="text-sm text-gray-600 mb-1">Content Uploaded</p>
                  <p className="text-3xl font-bold text-gray-900">
                    {educatorData.contentUploaded}
                  </p>
                  <p className="text-xs text-gray-500 mt-1">total materials</p>
                </div>
                <Upload className="h-10 w-10 text-spark-blue" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600 mb-1">Verified</p>
                  <p className="text-3xl font-bold text-gray-900">
                    {educatorData.contentVerified}
                  </p>
                  <p className="text-xs text-gray-500 mt-1">approved content</p>
                </div>
                <CheckCircle className="h-10 w-10 text-spark-green" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600 mb-1">Students Reached</p>
                  <p className="text-3xl font-bold text-gray-900">
                    {educatorData.studentsReached}
                  </p>
                  <p className="text-xs text-gray-500 mt-1">unique learners</p>
                </div>
                <Users className="h-10 w-10 text-spark-purple" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600 mb-1">Avg. Rating</p>
                  <p className="text-3xl font-bold text-gray-900">
                    {educatorData.averageRating}
                  </p>
                  <p className="text-xs text-gray-500 mt-1">out of 5.0</p>
                </div>
                <TrendingUp className="h-10 w-10 text-spark-orange" />
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content - Left Column (2/3 width) */}
          <div className="lg:col-span-2 space-y-8">
            {/* Pending Verification Queue */}
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="flex items-center gap-2">
                      <Clock className="h-5 w-5 text-spark-orange" />
                      Pending Verification
                    </CardTitle>
                    <CardDescription>Content awaiting your review</CardDescription>
                  </div>
                  <Badge variant="warning">{pendingVerification.length} pending</Badge>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {pendingVerification.map((item) => (
                    <div
                      key={item.id}
                      className="p-4 rounded-lg border border-gray-200 hover:border-spark-blue transition-colors"
                    >
                      <div className="flex items-start justify-between mb-2">
                        <div>
                          <h4 className="font-semibold text-gray-900 mb-1">
                            {item.title}
                          </h4>
                          <div className="flex items-center gap-2">
                            <Badge variant="secondary" className="text-xs">
                              {item.subject}
                            </Badge>
                            <span className="text-xs text-gray-500">
                              by {item.submittedBy}
                            </span>
                          </div>
                        </div>
                        <Badge variant="warning" className="text-xs">
                          <Clock className="h-3 w-3 mr-1" />
                          {item.submittedDate}
                        </Badge>
                      </div>
                      <div className="flex gap-2 mt-3">
                        <Button size="sm" variant="default">
                          <Eye className="h-4 w-4 mr-2" />
                          Review
                        </Button>
                        <Button size="sm" variant="outline">
                          Details
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Recent Uploads */}
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle>Your Recent Uploads</CardTitle>
                    <CardDescription>Content you&apos;ve created and uploaded</CardDescription>
                  </div>
                  <Link href="/dashboard/educator/content">
                    <Button variant="outline" size="sm">
                      View All
                    </Button>
                  </Link>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentUploads.map((content) => (
                    <div
                      key={content.id}
                      className="p-4 rounded-lg border border-gray-200 hover:border-spark-green transition-colors"
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
                            <span className="text-xs text-gray-500">
                              {content.uploadDate}
                            </span>
                          </div>
                        </div>
                        <Badge
                          variant={content.status === "verified" ? "success" : "warning"}
                          className="text-xs"
                        >
                          {content.status === "verified" ? (
                            <>
                              <CheckCircle className="h-3 w-3 mr-1" />
                              Verified
                            </>
                          ) : (
                            <>
                              <Clock className="h-3 w-3 mr-1" />
                              Under Review
                            </>
                          )}
                        </Badge>
                      </div>
                      <div className="flex items-center gap-4 text-sm text-gray-600">
                        <span className="flex items-center gap-1">
                          <Users className="h-4 w-4" />
                          {content.downloads} downloads
                        </span>
                        <span className="flex items-center gap-1">
                          ⭐ {content.rating}
                        </span>
                      </div>
                      <div className="flex gap-2 mt-3">
                        <Button size="sm" variant="outline">
                          <Eye className="h-4 w-4 mr-2" />
                          View
                        </Button>
                        <Button size="sm" variant="outline">
                          Edit
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
            {/* Student Engagement */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BarChart3 className="h-5 w-5 text-spark-blue" />
                  Student Engagement
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {studentEngagement.map((item, idx) => (
                    <div key={idx} className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-medium text-gray-900">
                          {item.subject}
                        </span>
                        <Badge variant="success" className="text-xs">
                          {item.growth}
                        </Badge>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="flex-1 bg-gray-200 rounded-full h-2">
                          <div
                            className="bg-spark-blue rounded-full h-2"
                            style={{ width: `${(item.students / 250) * 100}%` }}
                          />
                        </div>
                        <span className="text-sm text-gray-600 font-medium">
                          {item.students}
                        </span>
                      </div>
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
                <Link href="/dashboard/educator/upload">
                  <Button variant="default" className="w-full justify-start">
                    <Upload className="h-4 w-4 mr-2" />
                    Upload New Content
                  </Button>
                </Link>
                <Link href="/dashboard/educator/verify">
                  <Button variant="outline" className="w-full justify-start">
                    <CheckCircle className="h-4 w-4 mr-2" />
                    Verify Submissions
                  </Button>
                </Link>
                <Link href="/dashboard/educator/analytics">
                  <Button variant="outline" className="w-full justify-start">
                    <BarChart3 className="h-4 w-4 mr-2" />
                    View Analytics
                  </Button>
                </Link>
                <Link href="/dashboard/educator/resources">
                  <Button variant="outline" className="w-full justify-start">
                    <FileText className="h-4 w-4 mr-2" />
                    Resource Library
                  </Button>
                </Link>
              </CardContent>
            </Card>

            {/* Tips */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <AlertCircle className="h-5 w-5 text-spark-orange" />
                  Tips
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3 text-sm text-gray-600">
                  <p>
                    💡 <strong>Quality matters:</strong> Well-structured content gets higher ratings.
                  </p>
                  <p>
                    📝 <strong>Review promptly:</strong> Fast verification helps students learn faster.
                  </p>
                  <p>
                    🎯 <strong>Include practice:</strong> Content with exercises has 2x engagement.
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
