"use client";

import { DollarSign, Clock, GraduationCap, Info, AlertCircle, Sparkles } from "lucide-react";
import { Card, CardContent } from "./ui/card";
import { Badge } from "./ui/badge";

interface School {
  _id: string;
  name: string;
  type: string;
  location: {
    city: string;
    district: string;
  };
  partnershipTier: "featured" | "partner" | "listed";
  programsOffered: Array<{
    name: string;
    duration: string;
    tuitionPerYear: number;
    careerIds: string[];
  }>;
  logo?: string;
  website?: string;
}

interface CostStage {
  stage: string;
  duration: string;
  costMin: number;
  costMax: number;
  description: string;
  schools?: School[];
}

interface AdditionalCosts {
  materials?: { min: number; max: number; description: string };
  living?: { min: number; max: number; description: string };
  certifications?: { min: number; max: number; description: string };
  other?: { min: number; max: number; description: string };
}

interface CostAnalysis {
  totalCostMin: number;
  totalCostMax: number;
  breakdown: CostStage[];
  additionalCosts: AdditionalCosts;
  financialAidAvailable: boolean;
  scholarshipInfo?: string;
  lastUpdated: number;
}

interface CostBreakdownProps {
  costAnalysis: CostAnalysis;
  displayMode?: "compact" | "full";
  showSchools?: boolean;
}

export function CostBreakdown({ 
  costAnalysis, 
  displayMode = "full",
  showSchools = false 
}: CostBreakdownProps) {
  const formatCurrency = (amount: number) => {
    return `${(amount / 1000000).toFixed(1)}M RWF`;
  };

  const formatDate = (timestamp: number) => {
    return new Date(timestamp).toLocaleDateString('en-RW', {
      year: 'numeric',
      month: 'long'
    });
  };

  if (displayMode === "compact") {
    return (
      <Card className="border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
        <CardContent className="p-4 sm:p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <DollarSign className="w-5 h-5 text-brutal-green" />
              <h3 className="text-lg font-black uppercase">Total Investment</h3>
            </div>
            {costAnalysis.financialAidAvailable && (
              <Badge className="bg-brutal-yellow text-black border-2 border-black text-xs">
                Financial Aid Available
              </Badge>
            )}
          </div>
          
          <div className="text-center py-4 bg-brutal-bg border-2 border-black mb-4">
            <p className="text-3xl font-black text-brutal-green">
              {formatCurrency(costAnalysis.totalCostMin)} - {formatCurrency(costAnalysis.totalCostMax)}
            </p>
            <p className="text-sm font-bold text-gray-600 mt-1">Total Cost Range</p>
          </div>

          <div className="space-y-2 text-sm">
            {costAnalysis.breakdown.map((stage, index) => (
              <div key={index} className="flex items-center justify-between p-2 bg-background border-2 border-black">
                <span className="font-bold">{stage.stage}</span>
                <span className="font-black text-brutal-orange">
                  {formatCurrency(stage.costMin)} - {formatCurrency(stage.costMax)}
                </span>
              </div>
            ))}
          </div>

          <p className="text-xs text-gray-600 mt-4 flex items-center gap-1">
            <Info className="w-3 h-3" />
            Updated {formatDate(costAnalysis.lastUpdated)}
          </p>
        </CardContent>
      </Card>
    );
  }

  // Full mode display
  return (
    <div className="space-y-6">
      {/* Total Cost Header */}
      <Card className="border-3 border-black shadow-brutal-lg bg-brutal-green/10">
        <CardContent className="p-6 sm:p-8">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
            <div>
              <h3 className="text-2xl font-black uppercase mb-2">Total Investment Required</h3>
              <p className="text-gray-700 font-bold">
                Estimated costs to enter this career in Rwanda
              </p>
            </div>
            {costAnalysis.financialAidAvailable && (
              <Badge className="bg-brutal-yellow text-black border-2 border-black w-fit">
                <Sparkles className="w-4 h-4 mr-1" />
                Financial Aid Available
              </Badge>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="text-center p-6 bg-white border-3 border-black">
              <p className="text-sm font-bold text-gray-600 uppercase mb-2">Minimum Investment</p>
              <p className="text-4xl font-black text-brutal-green">
                {formatCurrency(costAnalysis.totalCostMin)}
              </p>
            </div>
            <div className="text-center p-6 bg-white border-3 border-black">
              <p className="text-sm font-bold text-gray-600 uppercase mb-2">Maximum Investment</p>
              <p className="text-4xl font-black text-brutal-orange">
                {formatCurrency(costAnalysis.totalCostMax)}
              </p>
            </div>
          </div>

          {costAnalysis.scholarshipInfo && (
            <div className="mt-4 p-4 bg-brutal-blue/10 border-2 border-brutal-blue">
              <p className="text-sm font-bold text-gray-700 flex items-start gap-2">
                <Info className="w-4 h-4 mt-0.5 text-brutal-blue flex-shrink-0" />
                {costAnalysis.scholarshipInfo}
              </p>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Stage-by-Stage Breakdown */}
      <div>
        <h3 className="text-xl font-black uppercase mb-4">Cost Breakdown by Stage</h3>
        <div className="space-y-4">
          {costAnalysis.breakdown.map((stage, index) => (
            <Card key={index} className="border-2 border-black shadow-brutal">
              <CardContent className="p-6">
                {/* Stage Header */}
                <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4 mb-4">
                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0 w-12 h-12 bg-primary text-white rounded-full flex items-center justify-center font-black text-xl border-2 border-black">
                      {index + 1}
                    </div>
                    <div className="flex-1">
                      <h4 className="text-xl font-black mb-1">{stage.stage}</h4>
                      <p className="text-sm text-gray-600 font-bold flex items-center gap-2">
                        <Clock className="w-4 h-4" />
                        {stage.duration}
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-2xl font-black text-brutal-green">
                      {formatCurrency(stage.costMin)} - {formatCurrency(stage.costMax)}
                    </p>
                  </div>
                </div>

                {/* Stage Description */}
                <p className="text-sm text-gray-700 mb-4 pl-16">{stage.description}</p>

                {/* Schools for this stage */}
                {showSchools && stage.schools && stage.schools.length > 0 && (
                  <div className="mt-4 p-4 bg-brutal-bg border-2 border-black">
                    <p className="text-sm font-black uppercase text-gray-600 mb-3 flex items-center gap-2">
                      <GraduationCap className="w-4 h-4" />
                      Recommended Schools for this Stage
                    </p>
                    <div className="space-y-2">
                      {stage.schools.slice(0, 3).map((school) => (
                        <div 
                          key={school._id}
                          className="p-3 bg-white border-2 border-black hover:shadow-brutal-sm transition-all"
                        >
                          <div className="flex items-start justify-between gap-2">
                            <div className="flex-1">
                              <div className="flex items-center gap-2 mb-1">
                                <p className="font-black text-sm">{school.name}</p>
                                {school.partnershipTier === "featured" && (
                                  <Badge className="bg-brutal-orange text-white border-2 border-black text-xs px-2 py-0">
                                    Featured
                                  </Badge>
                                )}
                              </div>
                              <p className="text-xs text-gray-600 font-bold">
                                {school.location.city}, {school.location.district}
                              </p>
                            </div>
                            {school.website && (
                              <a
                                href={school.website}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-xs font-bold text-brutal-blue hover:underline whitespace-nowrap"
                              >
                                Visit Website →
                              </a>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Additional Costs */}
      {(costAnalysis.additionalCosts.materials || 
        costAnalysis.additionalCosts.living || 
        costAnalysis.additionalCosts.certifications ||
        costAnalysis.additionalCosts.other) && (
        <Card className="border-2 border-black shadow-brutal">
          <CardContent className="p-6">
            <h3 className="text-xl font-black uppercase mb-4 flex items-center gap-2">
              <AlertCircle className="w-5 h-5" />
              Additional Costs to Consider
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {costAnalysis.additionalCosts.materials && (
                <div className="p-4 bg-background border-2 border-black">
                  <p className="font-black text-sm uppercase text-gray-600 mb-2">Materials & Supplies</p>
                  <p className="text-lg font-black text-brutal-orange mb-2">
                    {formatCurrency(costAnalysis.additionalCosts.materials.min)} - {formatCurrency(costAnalysis.additionalCosts.materials.max)}
                  </p>
                  <p className="text-xs text-gray-700">{costAnalysis.additionalCosts.materials.description}</p>
                </div>
              )}
              {costAnalysis.additionalCosts.living && (
                <div className="p-4 bg-background border-2 border-black">
                  <p className="font-black text-sm uppercase text-gray-600 mb-2">Living Expenses</p>
                  <p className="text-lg font-black text-brutal-orange mb-2">
                    {formatCurrency(costAnalysis.additionalCosts.living.min)} - {formatCurrency(costAnalysis.additionalCosts.living.max)}
                  </p>
                  <p className="text-xs text-gray-700">{costAnalysis.additionalCosts.living.description}</p>
                </div>
              )}
              {costAnalysis.additionalCosts.certifications && (
                <div className="p-4 bg-background border-2 border-black">
                  <p className="font-black text-sm uppercase text-gray-600 mb-2">Certifications & Licenses</p>
                  <p className="text-lg font-black text-brutal-orange mb-2">
                    {formatCurrency(costAnalysis.additionalCosts.certifications.min)} - {formatCurrency(costAnalysis.additionalCosts.certifications.max)}
                  </p>
                  <p className="text-xs text-gray-700">{costAnalysis.additionalCosts.certifications.description}</p>
                </div>
              )}
              {costAnalysis.additionalCosts.other && (
                <div className="p-4 bg-background border-2 border-black">
                  <p className="font-black text-sm uppercase text-gray-600 mb-2">Other Costs</p>
                  <p className="text-lg font-black text-brutal-orange mb-2">
                    {formatCurrency(costAnalysis.additionalCosts.other.min)} - {formatCurrency(costAnalysis.additionalCosts.other.max)}
                  </p>
                  <p className="text-xs text-gray-700">{costAnalysis.additionalCosts.other.description}</p>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Last Updated Notice */}
      <p className="text-sm text-gray-600 font-bold flex items-center gap-2">
        <Info className="w-4 h-4" />
        Cost data last updated: {formatDate(costAnalysis.lastUpdated)}. All amounts are estimates in Rwandan Francs.
      </p>
    </div>
  );
}

