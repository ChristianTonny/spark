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
import { useConvexAuth } from "@/lib/hooks/useConvexAuth";
import { SalaryCalculator } from "@/components/SalaryCalculator";
import { RealityQuiz } from "@/components/RealityQuiz";

export default function CareerDetailPage() {
  const params = useParams();
  const router = useRouter();
  const careerId = params.id as string;
  const { user } = useConvexAuth();

  const [showVideo, setShowVideo] = useState(false);

  // Fetch career from Convex
  const career = useQuery(api.careers.getById, { id: careerId as any });
  const bookmarkedIds = useQuery(api.savedCareers.getIds, user ? {} : "skip");
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
    if (!user) {
      alert('Please sign in to bookmark careers');
      return;
    }
    await toggleBookmark({
      careerId,
    });
  };

  const isBookmarked = bookmarkedIds?.includes(careerId);

  // Loading state - only wait for career data
  if (career === undefined) {
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
        <div className="max-w-7xl mx-auto px-3 sm:px-4 py-3 sm:py-4">
          <Button
            variant="ghost"
            onClick={() => router.push('/careers')}
            className="hover:bg-gray-100 min-h-[44px]"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            <span className="text-sm sm:text-base">Back to Careers</span>
          </Button>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-3 sm:px-4 py-6 sm:py-8 md:py-12">
        {/* Hero Section */}
        <div className="mb-8 sm:mb-10 md:mb-12">
          <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4 sm:gap-6 mb-4 sm:mb-6">
            <div className="flex-1">
              <Badge className="mb-3 sm:mb-4 bg-brutal-yellow text-black border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] text-xs sm:text-sm">
                {career.category}
              </Badge>
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-3 sm:mb-4 leading-tight">
                {career.title}
              </h1>
              <p className="text-base sm:text-lg md:text-xl text-gray-700 leading-relaxed">
                {career.shortDescription}
              </p>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-2 sm:gap-3">
              <Button
                onClick={handleBookmark}
                variant={isBookmarked ? "default" : "outline"}
                size="lg"
                className={`min-h-[48px] sm:min-h-[52px] border-2 border-black ${
                  isBookmarked
                    ? 'bg-primary text-white shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:bg-primary/90'
                    : 'bg-white shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:bg-gray-50'
                }`}
              >
                <Bookmark className={`h-4 w-4 sm:h-5 sm:w-5 ${isBookmarked ? 'fill-current' : ''}`} />
              </Button>
              <Button
                onClick={() => {
                  const mentorSection = document.getElementById('mentors-section');
                  mentorSection?.scrollIntoView({ behavior: 'smooth' });
                }}
                size="lg"
                className="min-h-[48px] sm:min-h-[52px] bg-primary text-white border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] active:shadow-none transition-all text-sm sm:text-base"
              >
                <Calendar className="h-4 w-4 sm:h-5 sm:w-5 mr-1.5 sm:mr-2" />
                <span className="hidden sm:inline">Book a Chat</span>
                <span className="sm:hidden">Book</span>
              </Button>
            </div>
          </div>

          {/* Key Info Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4">
            <Card className="border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
              <CardContent className="p-4 sm:p-6">
                <DollarSign className="h-6 w-6 sm:h-8 sm:w-8 mb-1 sm:mb-2 text-brutal-green" />
                <p className="text-xs sm:text-sm text-gray-600 mb-1">Salary Range</p>
                <p className="font-bold text-sm sm:text-base md:text-lg">
                  {(career.salaryMin / 1000000).toFixed(1)}-{(career.salaryMax / 1000000).toFixed(1)}M RWF
                </p>
              </CardContent>
            </Card>

            <Card className="border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
              <CardContent className="p-4 sm:p-6">
                <GraduationCap className="h-6 w-6 sm:h-8 sm:w-8 mb-1 sm:mb-2 text-brutal-blue" />
                <p className="text-xs sm:text-sm text-gray-600 mb-1">Education</p>
                <p className="font-bold text-xs sm:text-sm">{career.requiredEducation}</p>
              </CardContent>
            </Card>

            <Card className="border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
              <CardContent className="p-4 sm:p-6">
                <Clock className="h-6 w-6 sm:h-8 sm:w-8 mb-1 sm:mb-2 text-brutal-orange" />
                <p className="text-xs sm:text-sm text-gray-600 mb-1">Experience</p>
                <p className="font-bold text-xs sm:text-sm">Entry to Senior Level</p>
              </CardContent>
            </Card>

            <Card className="border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
              <CardContent className="p-4 sm:p-6">
                <MapPin className="h-6 w-6 sm:h-8 sm:w-8 mb-1 sm:mb-2 text-brutal-pink" />
                <p className="text-xs sm:text-sm text-gray-600 mb-1">Location</p>
                <p className="font-bold text-xs sm:text-sm">Rwanda</p>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Reality Quiz - Try This Career (Featured at top) */}
        {career.realityQuiz && (
          <div className="mb-8 sm:mb-10 md:mb-12">
            <RealityQuiz
              quiz={career.realityQuiz}
              careerId={career._id}
              careerTitle={career.title}
            />
          </div>
        )}

        {/* Video Section */}
        {career.videoUrl && (
          <Card className="mb-8 sm:mb-10 md:mb-12 border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
            <CardContent className="p-0">
              {!showVideo ? (
                <div
                  className="relative h-56 sm:h-72 md:h-96 cursor-pointer group overflow-hidden"
                  onClick={() => setShowVideo(true)}
                >
                  <img
                    src={career.videoThumbnail}
                    alt={career.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                    <div className="bg-white rounded-full p-4 sm:p-6 group-hover:scale-110 transition-transform shadow-xl">
                      <Play className="h-8 w-8 sm:h-12 sm:w-12 text-primary" fill="currentColor" />
                    </div>
                  </div>
                </div>
              ) : (
                <div className="relative h-56 sm:h-72 md:h-96">
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
        <div className="mb-8 sm:mb-10 md:mb-12">
          <h2 className="text-2xl sm:text-3xl font-bold mb-4 sm:mb-6">About This Career</h2>
          <Card className="border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
            <CardContent className="p-4 sm:p-6">
              <p className="text-sm sm:text-base md:text-lg text-gray-700 leading-relaxed whitespace-pre-line">
                {career.fullDescription}
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Required Skills */}
        <div className="mb-8 sm:mb-10 md:mb-12">
          <h2 className="text-2xl sm:text-3xl font-bold mb-4 sm:mb-6">Required Skills</h2>
          <div className="flex flex-wrap gap-2 sm:gap-3">
            {career.requiredSkills.map((skill) => (
              <Badge
                key={skill}
                variant="outline"
                className="px-3 sm:px-4 py-1.5 sm:py-2 text-xs sm:text-sm text-black bg-white border-2 border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition-all font-bold"
              >
                {skill}
              </Badge>
            ))}
          </div>
        </div>

        {/* Work Environment */}
        {career.workEnvironment && (
          <div className="mb-8 sm:mb-10 md:mb-12">
            <h2 className="text-2xl sm:text-3xl font-bold mb-4 sm:mb-6">Work Environment</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6">
              <Card className="border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
                <CardContent className="p-4 sm:p-6">
                  <h3 className="font-bold text-base sm:text-lg mb-2 sm:mb-3 uppercase">Team Size</h3>
                  <p className="text-gray-700 capitalize text-sm sm:text-base md:text-lg">
                    {career.workEnvironment.teamSize === 'small' && '👥 Small Teams (2-5 people)'}
                    {career.workEnvironment.teamSize === 'large' && '👥👥👥 Large Teams (10+ people)'}
                    {career.workEnvironment.teamSize === 'solo' && '🧑 Independent Work'}
                  </p>
                </CardContent>
              </Card>

              <Card className="border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
                <CardContent className="p-4 sm:p-6">
                  <h3 className="font-bold text-base sm:text-lg mb-2 sm:mb-3 uppercase">Work Pace</h3>
                  <p className="text-gray-700 capitalize text-sm sm:text-base md:text-lg">
                    {career.workEnvironment.pace === 'flexible' && '🌊 Flexible & Self-Directed'}
                    {career.workEnvironment.pace === 'moderate' && '⚡ Moderate & Steady'}
                    {career.workEnvironment.pace === 'intense' && '🚀 Fast-Paced & Dynamic'}
                    {career.workEnvironment.pace === 'steady' && '📊 Steady & Predictable'}
                  </p>
                </CardContent>
              </Card>

              <Card className="border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
                <CardContent className="p-4 sm:p-6">
                  <h3 className="font-bold text-base sm:text-lg mb-2 sm:mb-3 uppercase">Structure</h3>
                  <p className="text-gray-700 capitalize text-sm sm:text-base md:text-lg">
                    {career.workEnvironment.structure === 'flexible' && '🎨 Flexible & Creative'}
                    {career.workEnvironment.structure === 'structured' && '📋 Structured & Organized'}
                    {career.workEnvironment.structure === 'mixed' && '🔄 Mixed Approach'}
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        )}

        {/* Day in the Life */}
        {career.dayInLife && career.dayInLife.length > 0 && (
          <div className="mb-8 sm:mb-10 md:mb-12">
            <h2 className="text-2xl sm:text-3xl font-bold mb-4 sm:mb-6">A Day in the Life</h2>
            <Card className="border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
              <CardContent className="p-4 sm:p-6">
                <div className="space-y-3 sm:space-y-4">
                  {career.dayInLife.map((item, index) => (
                    <div key={index} className="flex gap-3 sm:gap-4 items-start">
                      <div className="flex-shrink-0">
                        <div className="w-16 h-16 sm:w-20 sm:h-20 bg-accent border-2 border-black flex items-center justify-center font-bold text-xs sm:text-sm">
                          {item.time}
                        </div>
                      </div>
                      <div className="flex-1 pt-1 sm:pt-2">
                        <p className="text-sm sm:text-base md:text-lg text-gray-700">{item.activity}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Reality Check */}
        {career.realityCheck && (
          <div className="mb-8 sm:mb-10 md:mb-12">
            <h2 className="text-2xl sm:text-3xl font-bold mb-4 sm:mb-6">Reality Check</h2>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6 mb-6">
              {/* Myths */}
              <Card className="border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] bg-brutal-pink/10">
                <CardContent className="p-4 sm:p-6">
                  <h3 className="text-lg sm:text-xl font-bold mb-4 uppercase">❌ Common Myths</h3>
                  <ul className="space-y-2 sm:space-y-3">
                    {career.realityCheck.myths.map((myth, index) => (
                      <li key={index} className="flex gap-2 text-sm sm:text-base text-gray-700">
                        <span className="flex-shrink-0 mt-1">•</span>
                        <span>{myth}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>

              {/* Realities */}
              <Card className="border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] bg-brutal-green/10">
                <CardContent className="p-4 sm:p-6">
                  <h3 className="text-lg sm:text-xl font-bold mb-4 uppercase">✅ The Reality</h3>
                  <ul className="space-y-2 sm:space-y-3">
                    {career.realityCheck.realities.map((reality, index) => (
                      <li key={index} className="flex gap-2 text-sm sm:text-base text-gray-700">
                        <span className="flex-shrink-0 mt-1">•</span>
                        <span>{reality}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </div>

            {/* Surprises */}
            <Card className="border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] bg-brutal-yellow/20">
              <CardContent className="p-4 sm:p-6">
                <h3 className="text-lg sm:text-xl font-bold mb-4 uppercase">💡 What Surprised Professionals Most</h3>
                <ul className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {career.realityCheck.surprises.map((surprise, index) => (
                    <li key={index} className="flex gap-2 text-sm sm:text-base text-gray-700">
                      <span className="flex-shrink-0 mt-1">•</span>
                      <span>{surprise}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Week in the Life - Good Day vs Hard Day */}
        {career.weekInLife && (
          <div className="mb-8 sm:mb-10 md:mb-12">
            <h2 className="text-2xl sm:text-3xl font-bold mb-4 sm:mb-6">A Week in the Life</h2>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
              {/* Good Day */}
              <Card className="border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] bg-green-50">
                <CardContent className="p-4 sm:p-6">
                  <h3 className="text-lg sm:text-xl font-bold mb-4 uppercase text-green-800">🌟 A Good Day</h3>
                  <div className="space-y-3">
                    {career.weekInLife.goodDay.map((item, index) => (
                      <div key={index} className="flex gap-3 items-start">
                        <div className="flex-shrink-0 w-16 px-2 py-1 bg-green-200 border-2 border-black text-xs sm:text-sm font-bold text-center">
                          {item.time}
                        </div>
                        <p className="flex-1 text-sm sm:text-base text-gray-700 pt-1">{item.activity}</p>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Hard Day */}
              <Card className="border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] bg-orange-50">
                <CardContent className="p-4 sm:p-6">
                  <h3 className="text-lg sm:text-xl font-bold mb-4 uppercase text-orange-800">😅 A Hard Day</h3>
                  <div className="space-y-3">
                    {career.weekInLife.hardDay.map((item, index) => (
                      <div key={index} className="flex gap-3 items-start">
                        <div className="flex-shrink-0 w-16 px-2 py-1 bg-orange-200 border-2 border-black text-xs sm:text-sm font-bold text-center">
                          {item.time}
                        </div>
                        <p className="flex-1 text-sm sm:text-base text-gray-700 pt-1">{item.activity}</p>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        )}

        {/* Breaking In - Paths to Entry */}
        {career.breakingIn && career.breakingIn.length > 0 && (
          <div className="mb-8 sm:mb-10 md:mb-12">
            <h2 className="text-2xl sm:text-3xl font-bold mb-4 sm:mb-6">How to Break In</h2>
            <div className="space-y-4">
              {career.breakingIn.map((path, index) => (
                <Card key={index} className="border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
                  <CardContent className="p-4 sm:p-6">
                    <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3 mb-4">
                      <div>
                        <h3 className="text-lg sm:text-xl font-bold">{path.pathName}</h3>
                        <p className="text-sm text-gray-600">{path.percentage}% of people take this path</p>
                      </div>
                      <div className="flex flex-wrap gap-3 text-sm">
                        <Badge variant="outline" className="border-2 border-black">
                          <Clock className="h-3 w-3 mr-1" />
                          {path.timeline}
                        </Badge>
                        <Badge variant="outline" className="border-2 border-black">
                          <DollarSign className="h-3 w-3 mr-1" />
                          {path.cost}
                        </Badge>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <p className="text-sm font-bold uppercase text-gray-600 mb-2">Steps:</p>
                      <ol className="space-y-2">
                        {path.steps.map((step, stepIndex) => (
                          <li key={stepIndex} className="flex gap-2 text-sm sm:text-base text-gray-700">
                            <span className="flex-shrink-0 font-bold">{stepIndex + 1}.</span>
                            <span>{step}</span>
                          </li>
                        ))}
                      </ol>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}

        {/* Pros and Cons */}
        {career.prosAndCons && (
          <div className="mb-8 sm:mb-10 md:mb-12">
            <h2 className="text-2xl sm:text-3xl font-bold mb-4 sm:mb-6">Pros & Cons</h2>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
              {/* Pros */}
              <Card className="border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] bg-green-50">
                <CardContent className="p-4 sm:p-6">
                  <h3 className="text-lg sm:text-xl font-bold mb-4 uppercase text-green-800">✅ Pros</h3>
                  <ul className="space-y-2">
                    {career.prosAndCons.pros.map((pro, index) => (
                      <li key={index} className="flex gap-2 text-sm sm:text-base text-gray-700">
                        <span className="flex-shrink-0 mt-1">•</span>
                        <span>{pro}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>

              {/* Cons */}
              <Card className="border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] bg-orange-50">
                <CardContent className="p-4 sm:p-6">
                  <h3 className="text-lg sm:text-xl font-bold mb-4 uppercase text-orange-800">⚠️ Cons</h3>
                  <ul className="space-y-2">
                    {career.prosAndCons.cons.map((con, index) => (
                      <li key={index} className="flex gap-2 text-sm sm:text-base text-gray-700">
                        <span className="flex-shrink-0 mt-1">•</span>
                        <span>{con}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </div>

            {/* Best For / Not For */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6 mt-4 sm:mt-6">
              <Card className="border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
                <CardContent className="p-4 sm:p-6">
                  <h3 className="text-lg sm:text-xl font-bold mb-4 uppercase">👍 Best For You If...</h3>
                  <ul className="space-y-2">
                    {career.prosAndCons.bestFor.map((item, index) => (
                      <li key={index} className="flex gap-2 text-sm sm:text-base text-gray-700">
                        <span className="flex-shrink-0 mt-1">✓</span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>

              <Card className="border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
                <CardContent className="p-4 sm:p-6">
                  <h3 className="text-lg sm:text-xl font-bold mb-4 uppercase">👎 Not For You If...</h3>
                  <ul className="space-y-2">
                    {career.prosAndCons.notFor.map((item, index) => (
                      <li key={index} className="flex gap-2 text-sm sm:text-base text-gray-700">
                        <span className="flex-shrink-0 mt-1">✗</span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </div>
          </div>
        )}

        {/* Success Stories */}
        {career.successStories && career.successStories.length > 0 && (
          <div className="mb-8 sm:mb-10 md:mb-12">
            <h2 className="text-2xl sm:text-3xl font-bold mb-4 sm:mb-6">Success Stories</h2>
            <div className="space-y-4 sm:space-y-6">
              {career.successStories.map((story, index) => (
                <Card key={index} className="border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] bg-brutal-blue/5">
                  <CardContent className="p-4 sm:p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <h3 className="text-lg sm:text-xl font-bold">{story.name}, {story.age}</h3>
                        <p className="text-sm text-gray-600">From: {story.previousRole}</p>
                      </div>
                      <Badge className="bg-brutal-green text-white border-2 border-black text-xs sm:text-sm">
                        {story.currentSalary}
                      </Badge>
                    </div>

                    <div className="space-y-3 text-sm sm:text-base">
                      <div>
                        <p className="font-bold text-gray-700">Why the switch?</p>
                        <p className="text-gray-600">{story.switchTrigger}</p>
                      </div>
                      <div>
                        <p className="font-bold text-gray-700">Timeline:</p>
                        <p className="text-gray-600">{story.timeline}</p>
                      </div>
                      <div>
                        <p className="font-bold text-gray-700">Hardest part:</p>
                        <p className="text-gray-600">{story.hardestPart}</p>
                      </div>
                      <div>
                        <p className="font-bold text-gray-700">What helped most:</p>
                        <p className="text-gray-600">{story.biggestHelp}</p>
                      </div>
                      <div className="pt-3 border-t-2 border-gray-200">
                        <p className="font-bold text-gray-700 mb-1">💡 Advice:</p>
                        <p className="text-gray-700 italic">&quot;{story.advice}&quot;</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}

        {/* Salary Progression */}
        {career.salaryProgression && career.salaryProgression.length > 0 && (
          <div className="mb-8 sm:mb-10 md:mb-12">
            <h2 className="text-2xl sm:text-3xl font-bold mb-4 sm:mb-6">Salary Progression</h2>
            <Card className="border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
              <CardContent className="p-4 sm:p-6">
                <div className="space-y-4">
                  {career.salaryProgression.map((level, index) => (
                    <div key={index} className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 p-4 bg-gray-50 border-2 border-black">
                      <div className="flex-1">
                        <h3 className="font-bold text-base sm:text-lg">{level.level}</h3>
                        <p className="text-sm text-gray-600">Experience: {level.years}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-lg sm:text-xl font-black text-brutal-green">{level.range}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Salary Calculator */}
        <div className="mb-8 sm:mb-10 md:mb-12">
          <SalaryCalculator
            minSalary={career.salaryMin}
            maxSalary={career.salaryMax}
            careerTitle={career.title}
          />
        </div>

        {/* Skill Roadmap */}
        {career.skillRoadmap && career.skillRoadmap.length > 0 && (
          <div className="mb-8 sm:mb-10 md:mb-12">
            <h2 className="text-2xl sm:text-3xl font-bold mb-4 sm:mb-6">Skill Development Roadmap</h2>
            <div className="space-y-4">
              {career.skillRoadmap.map((stage, index) => (
                <Card key={index} className="border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
                  <CardContent className="p-4 sm:p-6">
                    <div className="flex items-start gap-3 mb-4">
                      <div className="flex-shrink-0 w-10 h-10 bg-primary text-white rounded-full flex items-center justify-center font-bold border-2 border-black">
                        {index + 1}
                      </div>
                      <div className="flex-1">
                        <h3 className="text-lg sm:text-xl font-bold">{stage.stage}</h3>
                        <p className="text-sm text-gray-600">{stage.duration}</p>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div>
                        <p className="font-bold text-sm uppercase text-gray-600 mb-2">Skills to Learn:</p>
                        <ul className="space-y-1">
                          {stage.skills.map((skill, skillIndex) => (
                            <li key={skillIndex} className="text-sm text-gray-700">• {skill}</li>
                          ))}
                        </ul>
                      </div>
                      <div>
                        <p className="font-bold text-sm uppercase text-gray-600 mb-2">Projects to Build:</p>
                        <ul className="space-y-1">
                          {stage.projects.map((project, projectIndex) => (
                            <li key={projectIndex} className="text-sm text-gray-700">• {project}</li>
                          ))}
                        </ul>
                      </div>
                      <div>
                        <p className="font-bold text-sm uppercase text-gray-600 mb-2">Resources:</p>
                        <ul className="space-y-1">
                          {stage.resources.map((resource, resourceIndex) => (
                            <li key={resourceIndex} className="text-sm text-gray-700">• {resource}</li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}

        {/* Career Capital */}
        {career.careerCapital && (
          <div className="mb-8 sm:mb-10 md:mb-12">
            <h2 className="text-2xl sm:text-3xl font-bold mb-4 sm:mb-6">Career Capital</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Card className="border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
                <CardContent className="p-4 sm:p-6">
                  <h3 className="font-bold text-lg mb-3 uppercase">Transferable Skills</h3>
                  <p className="text-xs text-gray-600 mb-3">Useful in any career</p>
                  <ul className="space-y-2">
                    {career.careerCapital.transferableSkills.map((skill, index) => (
                      <li key={index} className="text-sm text-gray-700">• {skill}</li>
                    ))}
                  </ul>
                </CardContent>
              </Card>

              <Card className="border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
                <CardContent className="p-4 sm:p-6">
                  <h3 className="font-bold text-lg mb-3 uppercase">Specific Skills</h3>
                  <p className="text-xs text-gray-600 mb-3">Technical expertise</p>
                  <ul className="space-y-2">
                    {career.careerCapital.specificSkills.map((skill, index) => (
                      <li key={index} className="text-sm text-gray-700">• {skill}</li>
                    ))}
                  </ul>
                </CardContent>
              </Card>

              <Card className="border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
                <CardContent className="p-4 sm:p-6">
                  <h3 className="font-bold text-lg mb-3 uppercase">Exit Opportunities</h3>
                  <p className="text-xs text-gray-600 mb-3">Where you can pivot to</p>
                  <ul className="space-y-2">
                    {career.careerCapital.exitOpportunities.map((opportunity, index) => (
                      <li key={index} className="text-sm text-gray-700">• {opportunity}</li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </div>
          </div>
        )}

        {/* Resources */}
        {career.resources && career.resources.length > 0 && (
          <div className="mb-8 sm:mb-10 md:mb-12">
            <h2 className="text-2xl sm:text-3xl font-bold mb-4 sm:mb-6">Recommended Resources</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {career.resources.map((resource, index) => (
                <Card key={index} className="border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
                  <CardContent className="p-4 sm:p-6">
                    <div className="flex items-start justify-between mb-2">
                      <div className="flex-1">
                        <h3 className="font-bold text-base sm:text-lg">{resource.name}</h3>
                        <Badge className="mt-1 text-xs" variant="outline">{resource.type}</Badge>
                      </div>
                      <div className="flex gap-1 ml-2">
                        {Array.from({ length: resource.rating }).map((_, i) => (
                          <Star key={i} className="h-4 w-4 text-yellow-500" fill="currentColor" />
                        ))}
                      </div>
                    </div>
                    <p className="text-sm text-gray-700 mb-3">{resource.description}</p>
                    {resource.url && (
                      <a
                        href={resource.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 text-sm font-bold text-primary hover:underline"
                      >
                        Visit <ExternalLink className="h-3 w-3" />
                      </a>
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}

        {/* Warning Flags */}
        {career.warningFlags && (
          <div className="mb-8 sm:mb-10 md:mb-12">
            <h2 className="text-2xl sm:text-3xl font-bold mb-4 sm:mb-6">Warning Flags</h2>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              <Card className="border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] bg-red-50">
                <CardContent className="p-4 sm:p-6">
                  <h3 className="text-lg sm:text-xl font-bold mb-4 uppercase text-red-800">🚩 Red Flags</h3>
                  <p className="text-sm text-gray-600 mb-3">Watch out for these when job hunting:</p>
                  <ul className="space-y-2">
                    {career.warningFlags.redFlags.map((flag, index) => (
                      <li key={index} className="flex gap-2 text-sm text-gray-700">
                        <span className="flex-shrink-0 mt-1">•</span>
                        <span>{flag}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>

              <Card className="border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] bg-green-50">
                <CardContent className="p-4 sm:p-6">
                  <h3 className="text-lg sm:text-xl font-bold mb-4 uppercase text-green-800">✅ Green Flags</h3>
                  <p className="text-sm text-gray-600 mb-3">Great signs of a healthy workplace:</p>
                  <ul className="space-y-2">
                    {career.warningFlags.greenFlags.map((flag, index) => (
                      <li key={index} className="flex gap-2 text-sm text-gray-700">
                        <span className="flex-shrink-0 mt-1">•</span>
                        <span>{flag}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </div>
          </div>
        )}

        {/* Career Path */}
        {career.careerPath.length > 0 && (
          <div className="mb-8 sm:mb-10 md:mb-12">
            <h2 className="text-2xl sm:text-3xl font-bold mb-4 sm:mb-6">Career Path</h2>
            <div className="space-y-4 sm:space-y-6">
              {career.careerPath.map((step, index) => (
                <Card key={index} className="border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
                  <CardContent className="p-4 sm:p-6">
                    <div className="flex gap-3 sm:gap-4">
                      <div className="flex-shrink-0">
                        <div className="w-10 h-10 sm:w-12 sm:h-12 bg-primary text-white rounded-full flex items-center justify-center font-bold text-lg sm:text-xl border-2 border-black">
                          {index + 1}
                        </div>
                      </div>
                      <div className="flex-1">
                        <h3 className="text-lg sm:text-xl font-bold mb-1 sm:mb-2">{step.stage}</h3>
                        <p className="text-sm sm:text-base text-gray-700 mb-2">{step.description}</p>
                        <div className="flex flex-wrap gap-3 sm:gap-4 text-xs sm:text-sm text-gray-600">
                          <span className="flex items-center gap-1">
                            <Clock className="h-3 w-3 sm:h-4 sm:w-4" />
                            {step.duration}
                          </span>
                          {step.estimatedCost && (
                            <span className="flex items-center gap-1">
                              <DollarSign className="h-3 w-3 sm:h-4 sm:w-4" />
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
          <div id="mentors-section" className="mb-8 sm:mb-10 md:mb-12">
            <h2 className="text-2xl sm:text-3xl font-bold mb-4 sm:mb-6">Talk to a Professional</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
              {availableProfessionals.map((prof) => (
                <Card key={prof._id} className="border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] transition-all">
                  <CardContent className="p-4 sm:p-6">
                    <div className="flex items-start gap-3 sm:gap-4 mb-3 sm:mb-4">
                      <img
                        src={prof.avatar}
                        alt={`${prof.firstName} ${prof.lastName}`}
                        className="w-12 h-12 sm:w-16 sm:h-16 rounded-full border-2 border-black"
                      />
                      <div className="flex-1">
                        <h3 className="font-bold text-base sm:text-lg">{prof.firstName} {prof.lastName}</h3>
                        <p className="text-xs sm:text-sm text-gray-600">{prof.jobTitle}</p>
                        <p className="text-xs sm:text-sm text-gray-600">{prof.company}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 mb-3 sm:mb-4">
                      <Star className="h-4 w-4 text-yellow-500" fill="currentColor" />
                      <span className="font-bold text-sm sm:text-base">{prof.rating}</span>
                      <span className="text-xs sm:text-sm text-gray-600">({prof.chatsCompleted} chats)</span>
                    </div>
                    {prof.calendlyUrl && (
                      <a
                        href={prof.calendlyUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="block w-full"
                      >
                        <Button className="w-full min-h-[48px] bg-primary text-white border-2 border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] active:shadow-none transition-all text-sm sm:text-base">
                          <Calendar className="h-4 w-4 mr-2" />
                          Book 60-min Session
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
          <div className="mb-8 sm:mb-10 md:mb-12">
            <h2 className="text-2xl sm:text-3xl font-bold mb-4 sm:mb-6">Related Careers</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6">
              {relatedCareersList.map((relatedCareer) => (
                <Link key={relatedCareer._id} href={`/careers/${relatedCareer._id}`}>
                  <Card className="border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] transition-all cursor-pointer h-full">
                    <CardContent className="p-4 sm:p-6">
                      <Badge className="mb-2 sm:mb-3 bg-brutal-yellow text-black border-2 border-black text-xs sm:text-sm">
                        {relatedCareer.category}
                      </Badge>
                      <h3 className="font-bold text-lg sm:text-xl mb-2">{relatedCareer.title}</h3>
                      <p className="text-gray-700 text-xs sm:text-sm mb-3 sm:mb-4 line-clamp-2">
                        {relatedCareer.shortDescription}
                      </p>
                      <div className="flex items-center text-primary font-bold text-sm sm:text-base">
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
