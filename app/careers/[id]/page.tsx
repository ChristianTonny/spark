"use client";

import { useParams, useRouter } from "next/navigation";
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
import { careers, professionals } from "@/lib/data";
import { useState, useEffect } from "react";

export default function CareerDetailPage() {
  const params = useParams();
  const router = useRouter();
  const careerId = params.id as string;
  
  const career = careers.find(c => c.id === careerId);
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [showVideo, setShowVideo] = useState(false);

  // Check if career is bookmarked on mount
  useEffect(() => {
    const bookmarks = JSON.parse(localStorage.getItem('bookmarkedCareers') || '[]');
    setIsBookmarked(bookmarks.includes(careerId));
  }, [careerId]);

  // Handle bookmark toggle
  const handleBookmark = () => {
    const bookmarks = JSON.parse(localStorage.getItem('bookmarkedCareers') || '[]');
    let newBookmarks;
    
    if (bookmarks.includes(careerId)) {
      newBookmarks = bookmarks.filter((id: string) => id !== careerId);
      setIsBookmarked(false);
    } else {
      newBookmarks = [...bookmarks, careerId];
      setIsBookmarked(true);
    }
    
    localStorage.setItem('bookmarkedCareers', JSON.stringify(newBookmarks));
  };

  // Get available professionals for this career
  const availableProfessionals = career?.professionalsAvailable
    ?.map(profId => professionals.find(p => p.id === profId))
    .filter(Boolean) || [];

  // Get related careers
  const relatedCareersList = career?.relatedCareers
    ?.map(carId => careers.find(c => c.id === carId))
    .filter(Boolean)
    .slice(0, 3) || [];

  // 404 if career not found
  if (!career) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center p-4">
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-4">Career Not Found</h1>
          <p className="text-gray-600 mb-6">The career you're looking for doesn't exist.</p>
          <Button onClick={() => router.push('/careers')}>
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Careers
          </Button>
        </div>
      </div>
    );
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
                <p className="font-bold text-sm leading-tight">
                  {career.requiredEducation}
                </p>
              </CardContent>
            </Card>

            <Card className="border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
              <CardContent className="p-6">
                <MapPin className="h-8 w-8 mb-2 text-brutal-pink" />
                <p className="text-sm text-gray-600 mb-1">Location</p>
                <p className="font-bold text-lg">
                  {career.location || "Rwanda"}
                </p>
              </CardContent>
            </Card>

            <Card className="border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
              <CardContent className="p-6">
                <Clock className="h-8 w-8 mb-2 text-primary" />
                <p className="text-sm text-gray-600 mb-1">Experience</p>
                <p className="font-bold text-lg">
                  Entry to Senior
                </p>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Video Section */}
        <Card className="border-4 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] mb-12">
          <CardContent className="p-0">
            {!showVideo ? (
              <div className="relative aspect-video bg-gradient-to-br from-brutal-yellow to-primary">
                <img 
                  src={career.videoThumbnail} 
                  alt={career.title}
                  className="w-full h-full object-cover"
                />
                <button
                  onClick={() => setShowVideo(true)}
                  className="absolute inset-0 flex items-center justify-center bg-black/30 hover:bg-black/40 transition-colors group"
                  aria-label="Play video"
                  title="Play career video"
                >
                  <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center border-4 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] group-hover:scale-110 transition-transform">
                    <Play className="h-10 w-10 text-black ml-1" fill="currentColor" />
                  </div>
                </button>
                <div className="absolute bottom-4 left-4 bg-white px-4 py-2 border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
                  <p className="font-bold">Watch: A Day in the Life</p>
                </div>
              </div>
            ) : (
              <div className="aspect-video">
                <iframe
                  width="100%"
                  height="100%"
                  src={career.videoUrl}
                  title={`${career.title} Career Video`}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  className="w-full h-full"
                />
              </div>
            )}
          </CardContent>
        </Card>

        <div className="grid md:grid-cols-3 gap-8 mb-12">
          {/* Main Content - 2 columns */}
          <div className="md:col-span-2 space-y-8">
            {/* About This Career */}
            <section>
              <h2 className="text-3xl font-bold mb-4 border-b-4 border-black pb-2">
                About This Career
              </h2>
              <p className="text-lg text-gray-700 leading-relaxed">
                {career.fullDescription}
              </p>
            </section>

            {/* Required Skills */}
            <section>
              <h2 className="text-3xl font-bold mb-4 border-b-4 border-black pb-2">
                Required Skills
              </h2>
              <div className="flex flex-wrap gap-3">
                {career.requiredSkills.map((skill, index) => (
                  <Badge
                    key={index}
                    className="text-base px-4 py-2 bg-white border-2 border-black shadow-[3px_3px_0px_0px_rgba(0,0,0,1)]"
                  >
                    {skill}
                  </Badge>
                ))}
              </div>
            </section>

            {/* Career Path */}
            {career.careerPath && career.careerPath.length > 0 && (
              <section>
                <h2 className="text-3xl font-bold mb-6 border-b-4 border-black pb-2">
                  Your Path to {career.title}
                </h2>
                <div className="space-y-6">
                  {career.careerPath.map((step, index) => (
                    <Card 
                      key={index}
                      className="border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] transition-all"
                    >
                      <CardContent className="p-6">
                        <div className="flex items-start gap-4">
                          <div className="w-12 h-12 bg-primary text-white rounded-full flex items-center justify-center text-xl font-bold border-2 border-black flex-shrink-0">
                            {index + 1}
                          </div>
                          <div className="flex-1">
                            <div className="flex items-center gap-3 mb-2">
                              <h3 className="text-xl font-bold">{step.stage}</h3>
                              <Badge className="bg-brutal-yellow text-black border-2 border-black">
                                {step.duration}
                              </Badge>
                            </div>
                            <p className="text-gray-700 mb-3">{step.description}</p>
                            
                            {step.requirements && step.requirements.length > 0 && (
                              <div className="mb-3">
                                <p className="font-semibold text-sm mb-2">Requirements:</p>
                                <ul className="list-disc list-inside text-sm text-gray-600 space-y-1">
                                  {step.requirements.map((req, reqIndex) => (
                                    <li key={reqIndex}>{req}</li>
                                  ))}
                                </ul>
                              </div>
                            )}
                            
                            {step.estimatedCost && (
                              <div className="flex items-center gap-2 text-sm">
                                <DollarSign className="h-4 w-4 text-brutal-green" />
                                <span className="font-semibold">
                                  Estimated Cost: {(step.estimatedCost / 1000000).toFixed(1)}M RWF
                                </span>
                              </div>
                            )}
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </section>
            )}
          </div>

          {/* Sidebar - 1 column */}
          <div className="space-y-6">
            {/* Sponsored By */}
            {career.sponsoredBy && (
              <Card className="border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] bg-brutal-yellow/20">
                <CardContent className="p-6">
                  <p className="text-sm font-semibold mb-3">Sponsored by</p>
                  <div className="flex items-center gap-3">
                    <img 
                      src={career.sponsoredBy.companyLogo} 
                      alt={career.sponsoredBy.companyName}
                      className="w-16 h-16 object-contain border-2 border-black bg-white p-2"
                    />
                    <p className="font-bold text-lg">{career.sponsoredBy.companyName}</p>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Quick Stats */}
            <Card className="border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
              <CardContent className="p-6">
                <h3 className="font-bold text-lg mb-4">Career Stats</h3>
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Views</span>
                    <span className="font-bold">{career.views?.toLocaleString() || '0'}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Saves</span>
                    <span className="font-bold">{career.saves?.toLocaleString() || '0'}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Mentors Available</span>
                    <span className="font-bold">{availableProfessionals.length}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Available Mentors Section */}
        {availableProfessionals.length > 0 && (
          <section id="mentors-section" className="mb-12">
            <h2 className="text-3xl font-bold mb-6 border-b-4 border-black pb-2">
              Connect with {career.title} Professionals
            </h2>
            <p className="text-gray-700 mb-6">
              Book a 15-minute chat with experienced professionals to learn more about this career.
            </p>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {availableProfessionals.map((professional: any) => (
                <Card 
                  key={professional.id}
                  className="border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] transition-all"
                >
                  <CardContent className="p-6">
                    <div className="flex items-start gap-4 mb-4">
                      <img 
                        src={professional.avatar} 
                        alt={professional.name}
                        className="w-16 h-16 rounded-full border-2 border-black"
                      />
                      <div className="flex-1">
                        <h3 className="font-bold text-lg mb-1">{professional.name}</h3>
                        <p className="text-sm text-gray-600 mb-1">{professional.jobTitle}</p>
                        <p className="text-sm font-semibold">{professional.company}</p>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-2 mb-3">
                      <Star className="h-4 w-4 text-brutal-yellow fill-current" />
                      <span className="font-semibold">{professional.rating}</span>
                      <span className="text-sm text-gray-600">
                        ({professional.chatsCompleted} chats)
                      </span>
                    </div>
                    
                    <p className="text-sm text-gray-700 mb-4 line-clamp-2">
                      {professional.bio}
                    </p>
                    
                    <Button 
                      className="w-full bg-primary text-white border-2 border-black shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] hover:shadow-[1px_1px_0px_0px_rgba(0,0,0,1)] transition-all"
                      onClick={() => {
                        if (professional.calendlyUrl) {
                          window.open(professional.calendlyUrl, '_blank', 'noopener,noreferrer');
                        } else {
                          alert(`Booking with ${professional.name} - Calendly link not available yet.`);
                        }
                      }}
                    >
                      <Calendar className="h-4 w-4 mr-2" />
                      Book 15-min Chat
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>
        )}

        {/* Related Careers */}
        {relatedCareersList.length > 0 && (
          <section>
            <h2 className="text-3xl font-bold mb-6 border-b-4 border-black pb-2">
              Related Careers
            </h2>
            <div className="grid md:grid-cols-3 gap-6">
              {relatedCareersList.map((relatedCareer: any) => (
                <Card 
                  key={relatedCareer.id}
                  className="border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] transition-all cursor-pointer group"
                  onClick={() => router.push(`/careers/${relatedCareer.id}`)}
                >
                  <CardContent className="p-0">
                    <div className="aspect-video bg-gradient-to-br from-brutal-yellow to-brutal-blue relative overflow-hidden">
                      <img 
                        src={relatedCareer.videoThumbnail} 
                        alt={relatedCareer.title}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="p-6">
                      <Badge className="mb-2 bg-white border-2 border-black">
                        {relatedCareer.category}
                      </Badge>
                      <h3 className="font-bold text-xl mb-2 group-hover:text-primary transition-colors">
                        {relatedCareer.title}
                      </h3>
                      <p className="text-sm text-gray-600 mb-4 line-clamp-2">
                        {relatedCareer.shortDescription}
                      </p>
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-semibold">
                          {(relatedCareer.salaryMin / 1000000).toFixed(1)}-{(relatedCareer.salaryMax / 1000000).toFixed(1)}M RWF
                        </span>
                        <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  );
}
