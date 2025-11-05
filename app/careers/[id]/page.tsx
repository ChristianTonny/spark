"use client";

import { useParams, useRouter } from "next/navigation";
import { useQuery, useMutation } from "convex/react";
import { api } from "../../../convex/_generated/api";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import {
  ArrowLeft,
  Bookmark,
  Play,
  DollarSign,
  GraduationCap,
  MapPin,
  Clock,
  Calendar,
  Star,
  ArrowRight,
  ExternalLink
} from "lucide-react";
import { useState } from "react";
import { CareerDetailSkeleton } from "@/components/loading-skeleton";
import { NotFoundError } from "@/components/error-state";
import Link from "next/link";

const DEMO_STUDENT_ID = "demo-student-123";

export default function CareerDetailPage() {
  const params = useParams();
  const router = useRouter();
  const careerId = params.id as string;

  const [showVideo, setShowVideo] = useState(false);

  // Fetch career from Convex
  const career = useQuery(api.careers.getById, { id: careerId as any });
  const bookmarkedIds = useQuery(api.savedCareers.getIds, { studentId: DEMO_STUDENT_ID });
  const toggleBookmark = useMutation(api.savedCareers.toggle);

  // Get available professionals for this career
  const availableProfessionals = useQuery(
    api.professionals.getByCareerIds,
    career ? { careerIds: [careerId] } : "skip"
  );

  // Get related careers
  const allCareers = useQuery(api.careers.list);
  const relatedCareersList = career && allCareers
    ? allCareers.filter(c => career.relatedCareerIds.includes(c._id)).slice(0, 3)
    : [];

  // Handle bookmark toggle
  const handleBookmark = async () => {
    await toggleBookmark({
      studentId: DEMO_STUDENT_ID,
      careerId,
    });
  };

  const isBookmarked = bookmarkedIds?.includes(careerId);

  // Loading state
  if (career === undefined || bookmarkedIds === undefined) {
    return <CareerDetailSkeleton />;
  }

  // 404 if career not found
  if (career === null) {
    return <NotFoundError type="career" onGoBack={() => router.push('/careers')} />;
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Back Button */}
      <div className="border-b-4 border-black">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <Button
            variant="ghost"
            onClick={() => router.push('/careers')}
            className="hover:bg-gray-100"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Careers
          </Button>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8 md:py-12">
        {/* Hero Section */}
        <div className="mb-12">
          <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-6 mb-6">
            <div className="flex-1">
              <Badge className="mb-4 bg-brutal-yellow text-black border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
                {career.category}
              </Badge>
              <h1 className="text-4xl md:text-5xl font-bold mb-4 leading-tight">
                {career.title}
              </h1>
              <p className="text-xl text-gray-700 leading-relaxed">
                {career.shortDescription}
              </p>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-3">
              <Button
                onClick={handleBookmark}
                variant={isBookmarked ? "default" : "outline"}
                size="lg"
                className={`border-2 border-black ${
                  isBookmarked
                    ? 'bg-primary text-white shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:bg-primary/90'
                    : 'bg-white shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:bg-gray-50'
                }`}
              >
                <Bookmark className={`h-5 w-5 ${isBookmarked ? 'fill-current' : ''}`} />
              </Button>
              <Button
                onClick={() => {
                  const mentorSection = document.getElementById('mentors-section');
                  mentorSection?.scrollIntoView({ behavior: 'smooth' });
                }}
                size="lg"
                className="bg-primary text-white border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] transition-all"
              >
                <Calendar className="h-5 w-5 mr-2" />
                Book a Chat
              </Button>
            </div>
          </div>

          {/* Key Info Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <Card className="border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
              <CardContent className="p-6">
                <DollarSign className="h-8 w-8 mb-2 text-brutal-green" />
                <p className="text-sm text-gray-600 mb-1">Salary Range</p>
                <p className="font-bold text-lg">
                  {(career.salaryMin / 1000000).toFixed(1)}-{(career.salaryMax / 1000000).toFixed(1)}M RWF
                </p>
              </CardContent>
            </Card>

            <Card className="border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
              <CardContent className="p-6">
                <GraduationCap className="h-8 w-8 mb-2 text-brutal-blue" />
                <p className="text-sm text-gray-600 mb-1">Education</p>
                <p className="font-bold text-sm">{career.requiredEducation}</p>
              </CardContent>
            </Card>

            <Card className="border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
              <CardContent className="p-6">
                <Clock className="h-8 w-8 mb-2 text-brutal-orange" />
                <p className="text-sm text-gray-600 mb-1">Experience</p>
                <p className="font-bold text-sm">Entry to Senior Level</p>
              </CardContent>
            </Card>

            <Card className="border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
              <CardContent className="p-6">
                <MapPin className="h-8 w-8 mb-2 text-brutal-pink" />
                <p className="text-sm text-gray-600 mb-1">Location</p>
                <p className="font-bold text-sm">Rwanda</p>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Video Section */}
        {career.videoUrl && (
          <Card className="mb-12 border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
            <CardContent className="p-0">
              {!showVideo ? (
                <div
                  className="relative h-96 cursor-pointer group overflow-hidden"
                  onClick={() => setShowVideo(true)}
                >
                  <img
                    src={career.videoThumbnail}
                    alt={career.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                    <div className="bg-white rounded-full p-6 group-hover:scale-110 transition-transform shadow-xl">
                      <Play className="h-12 w-12 text-primary" fill="currentColor" />
                    </div>
                  </div>
                </div>
              ) : (
                <div className="relative h-96">
                  <iframe
                    src={career.videoUrl}
                    className="w-full h-full"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  />
                </div>
              )}
            </CardContent>
          </Card>
        )}

        {/* About Section */}
        <div className="mb-12">
          <h2 className="text-3xl font-bold mb-6">About This Career</h2>
          <Card className="border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
            <CardContent className="p-6">
              <p className="text-lg text-gray-700 leading-relaxed whitespace-pre-line">
                {career.fullDescription}
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Required Skills */}
        <div className="mb-12">
          <h2 className="text-3xl font-bold mb-6">Required Skills</h2>
          <div className="flex flex-wrap gap-3">
            {career.requiredSkills.map((skill) => (
              <Badge
                key={skill}
                className="px-4 py-2 text-sm bg-white border-2 border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition-all"
              >
                {skill}
              </Badge>
            ))}
          </div>
        </div>

        {/* Career Path */}
        {career.careerPath.length > 0 && (
          <div className="mb-12">
            <h2 className="text-3xl font-bold mb-6">Career Path</h2>
            <div className="space-y-6">
              {career.careerPath.map((step, index) => (
                <Card key={index} className="border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
                  <CardContent className="p-6">
                    <div className="flex gap-4">
                      <div className="flex-shrink-0">
                        <div className="w-12 h-12 bg-primary text-white rounded-full flex items-center justify-center font-bold text-xl border-2 border-black">
                          {index + 1}
                        </div>
                      </div>
                      <div className="flex-1">
                        <h3 className="text-xl font-bold mb-2">{step.stage}</h3>
                        <p className="text-gray-700 mb-2">{step.description}</p>
                        <div className="flex flex-wrap gap-4 text-sm text-gray-600">
                          <span className="flex items-center gap-1">
                            <Clock className="h-4 w-4" />
                            {step.duration}
                          </span>
                          {step.estimatedCost && (
                            <span className="flex items-center gap-1">
                              <DollarSign className="h-4 w-4" />
                              ~{(step.estimatedCost / 1000000).toFixed(1)}M RWF
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}

        {/* Available Mentors */}
        {availableProfessionals && availableProfessionals.length > 0 && (
          <div id="mentors-section" className="mb-12">
            <h2 className="text-3xl font-bold mb-6">Talk to a Professional</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {availableProfessionals.map((prof) => (
                <Card key={prof._id} className="border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] transition-all">
                  <CardContent className="p-6">
                    <div className="flex items-start gap-4 mb-4">
                      <img
                        src={prof.avatar}
                        alt={`${prof.firstName} ${prof.lastName}`}
                        className="w-16 h-16 rounded-full border-2 border-black"
                      />
                      <div className="flex-1">
                        <h3 className="font-bold text-lg">{prof.firstName} {prof.lastName}</h3>
                        <p className="text-sm text-gray-600">{prof.jobTitle}</p>
                        <p className="text-sm text-gray-600">{prof.company}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 mb-4">
                      <Star className="h-4 w-4 text-yellow-500" fill="currentColor" />
                      <span className="font-bold">{prof.rating}</span>
                      <span className="text-sm text-gray-600">({prof.chatsCompleted} chats)</span>
                    </div>
                    {prof.calendlyUrl && (
                      <a
                        href={prof.calendlyUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="block w-full"
                      >
                        <Button className="w-full bg-primary text-white border-2 border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition-all">
                          <Calendar className="h-4 w-4 mr-2" />
                          Book 15-min Chat
                        </Button>
                      </a>
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}

        {/* Related Careers */}
        {relatedCareersList.length > 0 && (
          <div className="mb-12">
            <h2 className="text-3xl font-bold mb-6">Related Careers</h2>
            <div className="grid md:grid-cols-3 gap-6">
              {relatedCareersList.map((relatedCareer) => (
                <Link key={relatedCareer._id} href={`/careers/${relatedCareer._id}`}>
                  <Card className="border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] transition-all cursor-pointer h-full">
                    <CardContent className="p-6">
                      <Badge className="mb-3 bg-brutal-yellow text-black border-2 border-black">
                        {relatedCareer.category}
                      </Badge>
                      <h3 className="font-bold text-xl mb-2">{relatedCareer.title}</h3>
                      <p className="text-gray-700 text-sm mb-4 line-clamp-2">
                        {relatedCareer.shortDescription}
                      </p>
                      <div className="flex items-center text-primary font-bold">
                        Explore <ArrowRight className="h-4 w-4 ml-2" />
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
