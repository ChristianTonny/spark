"use client";

import { useState } from "react";
import { useQuery, useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  Plus, 
  Edit, 
  Trash2, 
  Eye, 
  EyeOff, 
  MapPin, 
  Users, 
  TrendingUp,
  Award,
  ExternalLink
} from "lucide-react";
import type { Id } from "@/convex/_generated/dataModel";

export default function AdminSchoolsPage() {
  const [selectedSchool, setSelectedSchool] = useState<any>(null);
  const [showInactive, setShowInactive] = useState(false);

  // Fetch schools and analytics
  const schools = useQuery(api.schools.list, { activeOnly: !showInactive });
  const analytics = useQuery(api.schools.getAnalytics, {});

  // Mutations
  const updateSchool = useMutation(api.schools.update);
  const deleteSchool = useMutation(api.schools.remove);

  const handleToggleActive = async (schoolId: Id<"schools">, currentStatus: boolean) => {
    try {
      await updateSchool({
        schoolId,
        isActive: !currentStatus,
      });
    } catch (error) {
      console.error("Failed to toggle school status:", error);
    }
  };

  const handleToggleFeatured = async (schoolId: Id<"schools">, currentStatus: boolean) => {
    try {
      await updateSchool({
        schoolId,
        featured: !currentStatus,
      });
    } catch (error) {
      console.error("Failed to toggle featured status:", error);
    }
  };

  const handleDelete = async (schoolId: Id<"schools">) => {
    if (!confirm("Are you sure you want to delete this school? This action cannot be undone.")) {
      return;
    }
    
    try {
      await deleteSchool({ schoolId });
    } catch (error) {
      console.error("Failed to delete school:", error);
    }
  };

  const getTypeLabel = (type: string) => {
    const labels: Record<string, string> = {
      university: "University",
      technical_college: "Technical College",
      vocational_school: "Vocational School",
      high_school: "High School",
      training_center: "Training Center",
      online_platform: "Online Platform",
    };
    return labels[type] || type;
  };

  const getTierColor = (tier: string) => {
    switch (tier) {
      case "featured": return "bg-brutal-orange text-white";
      case "partner": return "bg-brutal-blue text-white";
      case "listed": return "bg-gray-300 text-black";
      default: return "bg-gray-300 text-black";
    }
  };

  if (!schools) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <p className="text-xl font-bold">Loading...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background py-8 px-4">
      <div className="container mx-auto max-w-7xl">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl md:text-5xl font-black mb-2 uppercase">
            School Management
          </h1>
          <p className="text-lg font-bold text-gray-700">
            Manage institutional partners and listings
          </p>
        </div>

        {/* Analytics Dashboard */}
        {analytics && (
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
            <Card className="border-2 border-black shadow-brutal">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-bold text-gray-600 uppercase">Total Schools</p>
                    <p className="text-3xl font-black">{analytics.totalSchools}</p>
                  </div>
                  <Users className="w-10 h-10 text-brutal-blue" />
                </div>
              </CardContent>
            </Card>

            <Card className="border-2 border-black shadow-brutal">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-bold text-gray-600 uppercase">Total Clicks</p>
                    <p className="text-3xl font-black">{analytics.totalClicks}</p>
                  </div>
                  <TrendingUp className="w-10 h-10 text-brutal-green" />
                </div>
              </CardContent>
            </Card>

            <Card className="border-2 border-black shadow-brutal">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-bold text-gray-600 uppercase">Total Inquiries</p>
                    <p className="text-3xl font-black">{analytics.totalInquiries}</p>
                  </div>
                  <ExternalLink className="w-10 h-10 text-brutal-orange" />
                </div>
              </CardContent>
            </Card>

            <Card className="border-2 border-black shadow-brutal">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-bold text-gray-600 uppercase">Conversion Rate</p>
                    <p className="text-3xl font-black">{analytics.overallConversionRate}%</p>
                  </div>
                  <Award className="w-10 h-10 text-brutal-yellow" />
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Actions */}
        <div className="flex items-center justify-between mb-6">
          <Button
            onClick={() => setShowInactive(!showInactive)}
            className="px-4 py-2 bg-white border-2 border-black shadow-brutal-sm hover:shadow-brutal transition-all font-bold uppercase text-sm"
          >
            {showInactive ? <Eye className="w-4 h-4 mr-2" /> : <EyeOff className="w-4 h-4 mr-2" />}
            {showInactive ? 'Show Active Only' : 'Show All'}
          </Button>

          <Button
            className="px-6 py-3 bg-brutal-green text-white border-2 border-black shadow-brutal hover:shadow-brutal-lg transition-all font-bold uppercase text-sm flex items-center gap-2"
          >
            <Plus className="w-5 h-5" />
            Add New School
          </Button>
        </div>

        {/* Schools Table */}
        <div className="bg-white border-3 border-black shadow-brutal-lg overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-background border-b-3 border-black">
                <tr>
                  <th className="px-4 py-3 text-left text-xs font-black uppercase">School</th>
                  <th className="px-4 py-3 text-left text-xs font-black uppercase">Type</th>
                  <th className="px-4 py-3 text-left text-xs font-black uppercase">Location</th>
                  <th className="px-4 py-3 text-left text-xs font-black uppercase">Tier</th>
                  <th className="px-4 py-3 text-left text-xs font-black uppercase">Programs</th>
                  <th className="px-4 py-3 text-left text-xs font-black uppercase">Clicks</th>
                  <th className="px-4 py-3 text-left text-xs font-black uppercase">Inquiries</th>
                  <th className="px-4 py-3 text-left text-xs font-black uppercase">Status</th>
                  <th className="px-4 py-3 text-left text-xs font-black uppercase">Actions</th>
                </tr>
              </thead>
              <tbody>
                {schools.map((school, index) => (
                  <tr 
                    key={school._id} 
                    className={`border-b-2 border-black ${index % 2 === 0 ? 'bg-white' : 'bg-background'} hover:bg-brutal-yellow/10 transition-colors`}
                  >
                    <td className="px-4 py-4">
                      <div>
                        <p className="font-black text-sm">{school.name}</p>
                        {school.featured && (
                          <Badge className="mt-1 bg-brutal-orange text-white border-2 border-black text-xs">
                            Featured
                          </Badge>
                        )}
                      </div>
                    </td>
                    <td className="px-4 py-4">
                      <span className="text-sm font-bold">{getTypeLabel(school.type)}</span>
                    </td>
                    <td className="px-4 py-4">
                      <div className="flex items-center gap-1 text-sm">
                        <MapPin className="w-3 h-3" />
                        <span className="font-bold">{school.location.city}</span>
                      </div>
                    </td>
                    <td className="px-4 py-4">
                      <Badge className={`${getTierColor(school.partnershipTier)} border-2 border-black text-xs font-bold uppercase`}>
                        {school.partnershipTier}
                      </Badge>
                    </td>
                    <td className="px-4 py-4">
                      <span className="text-sm font-bold">{school.programsOffered.length}</span>
                    </td>
                    <td className="px-4 py-4">
                      <span className="text-sm font-bold">{school.clickCount}</span>
                    </td>
                    <td className="px-4 py-4">
                      <span className="text-sm font-bold">{school.inquiryCount}</span>
                    </td>
                    <td className="px-4 py-4">
                      <Badge 
                        variant={school.isActive ? "default" : "outline"}
                        className="text-xs font-bold"
                      >
                        {school.isActive ? 'Active' : 'Inactive'}
                      </Badge>
                    </td>
                    <td className="px-4 py-4">
                      <div className="flex items-center gap-2">
                        <Button
                          size="sm"
                          onClick={() => handleToggleFeatured(school._id, school.featured)}
                          className="px-2 py-1 bg-brutal-yellow text-black border-2 border-black text-xs"
                          title={school.featured ? "Remove from featured" : "Add to featured"}
                        >
                          <Award className="w-3 h-3" />
                        </Button>
                        <Button
                          size="sm"
                          onClick={() => handleToggleActive(school._id, school.isActive)}
                          className="px-2 py-1 bg-brutal-blue text-white border-2 border-black text-xs"
                          title={school.isActive ? "Deactivate" : "Activate"}
                        >
                          {school.isActive ? <EyeOff className="w-3 h-3" /> : <Eye className="w-3 h-3" />}
                        </Button>
                        <Button
                          size="sm"
                          className="px-2 py-1 bg-white border-2 border-black text-xs"
                        >
                          <Edit className="w-3 h-3" />
                        </Button>
                        <Button
                          size="sm"
                          onClick={() => handleDelete(school._id)}
                          className="px-2 py-1 bg-brutal-orange text-white border-2 border-black text-xs"
                        >
                          <Trash2 className="w-3 h-3" />
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {schools.length === 0 && (
          <div className="text-center py-12 bg-white border-3 border-black">
            <p className="text-xl font-bold text-gray-600">No schools found</p>
            <p className="text-gray-500 mt-2">Add your first school to get started</p>
          </div>
        )}

        {/* Top Performing Schools */}
        {analytics && analytics.topPerforming && analytics.topPerforming.length > 0 && (
          <div className="mt-8">
            <h2 className="text-2xl font-black uppercase mb-4">Top Performing Schools</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {analytics.topPerforming.slice(0, 6).map((school, index) => (
                <Card key={school.schoolId} className="border-2 border-black shadow-brutal">
                  <CardContent className="p-4">
                    <div className="flex items-start justify-between mb-2">
                      <p className="font-black text-lg">{school.name}</p>
                      <Badge className="text-xs">#{index + 1}</Badge>
                    </div>
                    <Badge className={`${getTierColor(school.tier)} border-2 border-black text-xs mb-3`}>
                      {school.tier}
                    </Badge>
                    <div className="grid grid-cols-2 gap-2 text-sm">
                      <div>
                        <p className="text-gray-600 font-bold">Clicks</p>
                        <p className="font-black">{school.clicks}</p>
                      </div>
                      <div>
                        <p className="text-gray-600 font-bold">Inquiries</p>
                        <p className="font-black">{school.inquiries}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

