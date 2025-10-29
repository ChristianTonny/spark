"use client";

import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  BookOpen,
  Download,
  Search,
  Filter,
  Star,
  FileText,
  Video,
  Image as ImageIcon,
  Clock,
  CheckCircle,
} from "lucide-react";
import Link from "next/link";

export default function ContentBrowsePage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedSubject, setSelectedSubject] = useState("all");
  const [selectedGrade, setSelectedGrade] = useState("all");
  const [selectedType, setSelectedType] = useState("all");

  // Mock content data
  const contentItems = [
    {
      id: 1,
      title: "Algebra Fundamentals Complete Guide",
      subject: "Mathematics",
      grade: "O-Level Year 2",
      type: "PDF",
      size: "45 MB",
      downloads: 1245,
      rating: 4.9,
      duration: "3 hours read",
      verified: true,
      description: "Comprehensive guide covering all algebra basics from equations to functions.",
      topics: ["Equations", "Functions", "Graphs"],
    },
    {
      id: 2,
      title: "Chemical Reactions Video Series",
      subject: "Chemistry",
      grade: "O-Level Year 3",
      type: "Video",
      size: "320 MB",
      downloads: 892,
      rating: 4.8,
      duration: "2.5 hours",
      verified: true,
      description: "Step-by-step video explanations of common chemical reactions.",
      topics: ["Reactions", "Equations", "Lab Work"],
    },
    {
      id: 3,
      title: "Physics Mechanics Practice Problems",
      subject: "Physics",
      grade: "A-Level Year 1",
      type: "PDF",
      size: "28 MB",
      downloads: 756,
      rating: 4.7,
      duration: "2 hours",
      verified: true,
      description: "100+ practice problems with detailed solutions for mechanics.",
      topics: ["Motion", "Forces", "Energy"],
    },
    {
      id: 4,
      title: "Biology Cell Structure Diagrams",
      subject: "Biology",
      grade: "O-Level Year 2",
      type: "Images",
      size: "15 MB",
      downloads: 643,
      rating: 4.6,
      duration: "Quick reference",
      verified: true,
      description: "High-quality labeled diagrams of cell structures.",
      topics: ["Cells", "Organelles", "Diagrams"],
    },
    {
      id: 5,
      title: "English Grammar Essentials",
      subject: "English",
      grade: "O-Level Year 1",
      type: "PDF",
      size: "22 MB",
      downloads: 1104,
      rating: 4.8,
      duration: "4 hours read",
      verified: true,
      description: "Complete grammar guide with examples and exercises.",
      topics: ["Tenses", "Punctuation", "Writing"],
    },
    {
      id: 6,
      title: "Trigonometry Video Lessons",
      subject: "Mathematics",
      grade: "A-Level Year 1",
      type: "Video",
      size: "280 MB",
      downloads: 521,
      rating: 4.9,
      duration: "3 hours",
      verified: false,
      description: "Detailed video lessons on trigonometric functions and identities.",
      topics: ["Sin/Cos/Tan", "Identities", "Graphs"],
    },
  ];

  const subjects = ["All", "Mathematics", "Physics", "Chemistry", "Biology", "English"];
  const grades = ["All", "O-Level Year 1", "O-Level Year 2", "O-Level Year 3", "A-Level Year 1", "A-Level Year 2"];
  const types = ["All", "PDF", "Video", "Images"];

  // Filter content
  const filteredContent = contentItems.filter((item) => {
    const matchesSearch = item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         item.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesSubject = selectedSubject === "all" || item.subject === selectedSubject;
    const matchesGrade = selectedGrade === "all" || item.grade === selectedGrade;
    const matchesType = selectedType === "all" || item.type === selectedType;
    
    return matchesSearch && matchesSubject && matchesGrade && matchesType;
  });

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "PDF":
        return <FileText className="h-5 w-5" />;
      case "Video":
        return <Video className="h-5 w-5" />;
      case "Images":
        return <ImageIcon className="h-5 w-5" />;
      default:
        return <FileText className="h-5 w-5" />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-end mb-4">
          <Link href="/dashboard/student">
            <Button variant="outline">Back to Dashboard</Button>
          </Link>
        </div>
        {/* Search and Filters */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Search className="h-5 w-5" />
              Search & Filter
            </CardTitle>
            <CardDescription>Find the perfect learning materials</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {/* Search Bar */}
              <div>
                <Label htmlFor="search">Search Content</Label>
                <Input
                  id="search"
                  placeholder="Search by title, description, or topic..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  icon={<Search className="h-5 w-5" />}
                />
              </div>

              {/* Filters */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <Label htmlFor="subject">Subject</Label>
                  <select
                    id="subject"
                    value={selectedSubject}
                    onChange={(e) => setSelectedSubject(e.target.value)}
                    className="flex h-12 w-full rounded-lg border border-gray-300 bg-white px-4 py-3 text-base focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-spark-blue"
                  >
                    {subjects.map((subject) => (
                      <option key={subject} value={subject.toLowerCase()}>
                        {subject}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <Label htmlFor="grade">Grade Level</Label>
                  <select
                    id="grade"
                    value={selectedGrade}
                    onChange={(e) => setSelectedGrade(e.target.value)}
                    className="flex h-12 w-full rounded-lg border border-gray-300 bg-white px-4 py-3 text-base focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-spark-blue"
                  >
                    {grades.map((grade) => (
                      <option key={grade} value={grade.toLowerCase()}>
                        {grade}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <Label htmlFor="type">Content Type</Label>
                  <select
                    id="type"
                    value={selectedType}
                    onChange={(e) => setSelectedType(e.target.value)}
                    className="flex h-12 w-full rounded-lg border border-gray-300 bg-white px-4 py-3 text-base focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-spark-blue"
                  >
                    {types.map((type) => (
                      <option key={type} value={type.toLowerCase()}>
                        {type}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Active Filters Display */}
              {(selectedSubject !== "all" || selectedGrade !== "all" || selectedType !== "all" || searchQuery) && (
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="text-sm text-gray-600">Active filters:</span>
                  {searchQuery && (
                    <Badge variant="secondary">Search: "{searchQuery}"</Badge>
                  )}
                  {selectedSubject !== "all" && (
                    <Badge variant="secondary">Subject: {selectedSubject}</Badge>
                  )}
                  {selectedGrade !== "all" && (
                    <Badge variant="secondary">Grade: {selectedGrade}</Badge>
                  )}
                  {selectedType !== "all" && (
                    <Badge variant="secondary">Type: {selectedType}</Badge>
                  )}
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => {
                      setSearchQuery("");
                      setSelectedSubject("all");
                      setSelectedGrade("all");
                      setSelectedType("all");
                    }}
                  >
                    Clear All
                  </Button>
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Results */}
        <div className="mb-4 flex items-center justify-between">
          <p className="text-gray-600">
            Showing <span className="font-semibold text-gray-900">{filteredContent.length}</span> results
          </p>
        </div>

        {/* Content Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredContent.map((item) => (
            <Card key={item.id} className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex items-start justify-between mb-2">
                  <div className="flex items-center gap-2">
                    {getTypeIcon(item.type)}
                    <Badge variant="secondary" className="text-xs">
                      {item.type}
                    </Badge>
                  </div>
                  {item.verified && (
                    <Badge variant="success" className="text-xs">
                      <CheckCircle className="h-3 w-3 mr-1" />
                      Verified
                    </Badge>
                  )}
                </div>
                <CardTitle className="text-lg line-clamp-2">{item.title}</CardTitle>
                <CardDescription className="line-clamp-2">{item.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {/* Metadata */}
                  <div className="flex items-center gap-2 flex-wrap">
                    <Badge variant="outline" className="text-xs">
                      {item.subject}
                    </Badge>
                    <Badge variant="outline" className="text-xs">
                      {item.grade}
                    </Badge>
                  </div>

                  {/* Topics */}
                  <div className="flex items-center gap-1 flex-wrap">
                    {item.topics.map((topic, idx) => (
                      <span key={idx} className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded">
                        {topic}
                      </span>
                    ))}
                  </div>

                  {/* Stats */}
                  <div className="flex items-center gap-4 text-sm text-gray-600">
                    <span className="flex items-center gap-1">
                      <Download className="h-4 w-4" />
                      {item.downloads}
                    </span>
                    <span className="flex items-center gap-1">
                      <Star className="h-4 w-4 fill-spark-orange text-spark-orange" />
                      {item.rating}
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock className="h-4 w-4" />
                      {item.duration}
                    </span>
                  </div>

                  <div className="text-sm text-gray-500">
                    Size: {item.size}
                  </div>

                  {/* Actions */}
                  <div className="flex gap-2 pt-2">
                    <Link href={`/content/view/${item.id}`} className="flex-1">
                      <Button variant="default" className="w-full">
                        <Download className="h-4 w-4 mr-2" />
                        Download
                      </Button>
                    </Link>
                    <Link href={`/content/view/${item.id}`}>
                      <Button variant="outline">Preview</Button>
                    </Link>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* No Results */}
        {filteredContent.length === 0 && (
          <Card className="p-12 text-center">
            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Search className="h-8 w-8 text-gray-400" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">No content found</h3>
            <p className="text-gray-600 mb-4">
              Try adjusting your filters or search terms
            </p>
            <Button
              variant="outline"
              onClick={() => {
                setSearchQuery("");
                setSelectedSubject("all");
                setSelectedGrade("all");
                setSelectedType("all");
              }}
            >
              Clear Filters
            </Button>
          </Card>
        )}
      </div>
    </div>
  );
}
