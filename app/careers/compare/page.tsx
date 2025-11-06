'use client';

import { useState, useEffect } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { useQuery } from 'convex/react';
import { api } from '../../../convex/_generated/api';
import Link from 'next/link';
import {
  ArrowLeft, X, Plus, DollarSign, GraduationCap, Briefcase,
  TrendingUp, Check, AlertCircle
} from 'lucide-react';

export default function CareerComparePage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [showAddCareer, setShowAddCareer] = useState(false);

  const allCareers = useQuery(api.careers.list);

  // Parse IDs from URL on mount
  useEffect(() => {
    const ids = searchParams.get('ids');
    if (ids) {
      setSelectedIds(ids.split(',').slice(0, 3)); // Max 3 careers
    }
  }, [searchParams]);

  const selectedCareers = allCareers?.filter(career =>
    selectedIds.includes(career._id)
  ) || [];

  const availableCareers = allCareers?.filter(career =>
    !selectedIds.includes(career._id)
  ) || [];

  const addCareer = (careerId: string) => {
    if (selectedIds.length < 3) {
      const newIds = [...selectedIds, careerId];
      setSelectedIds(newIds);
      router.push(`/careers/compare?ids=${newIds.join(',')}`);
      setShowAddCareer(false);
    }
  };

  const removeCareer = (careerId: string) => {
    const newIds = selectedIds.filter(id => id !== careerId);
    setSelectedIds(newIds);
    if (newIds.length === 0) {
      router.push('/careers');
    } else {
      router.push(`/careers/compare?ids=${newIds.join(',')}`);
    }
  };

  const formatSalary = (min: number, max: number, currency: string) => {
    const format = (num: number) => {
      if (num >= 1000000) return `${(num / 1000000).toFixed(1)}M`;
      if (num >= 1000) return `${(num / 1000).toFixed(0)}K`;
      return num.toString();
    };
    return `${format(min)} - ${format(max)} ${currency}`;
  };

  if (!allCareers) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-black border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-xl font-bold">Loading careers...</p>
        </div>
      </div>
    );
  }

  if (selectedCareers.length === 0) {
    return (
      <div className="min-h-screen bg-background py-8 px-4">
        <div className="container mx-auto max-w-5xl">
          <Link
            href="/careers"
            className="inline-flex items-center gap-2 text-gray-700 hover:text-black font-bold mb-6"
          >
            <ArrowLeft className="w-5 h-5" />
            Back to Careers
          </Link>

          <div className="text-center py-16">
            <div className="w-24 h-24 bg-primary border-3 border-black shadow-brutal mx-auto mb-6 flex items-center justify-center">
              <AlertCircle className="w-12 h-12 text-white" />
            </div>
            <h1 className="text-3xl md:text-4xl font-black mb-4">No Careers Selected</h1>
            <p className="text-lg text-gray-700 font-bold mb-8">
              Select careers from the careers page to compare them side by side
            </p>
            <Link
              href="/careers"
              className="inline-block px-8 py-4 bg-primary text-white font-bold uppercase border-3 border-black shadow-brutal hover:shadow-brutal-lg hover:translate-x-[-2px] hover:translate-y-[-2px] transition-all"
            >
              Browse Careers
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background py-8 px-4">
      <div className="container mx-auto max-w-7xl">
        {/* Header */}
        <div className="mb-8">
          <Link
            href="/careers"
            className="inline-flex items-center gap-2 text-gray-700 hover:text-black font-bold mb-4"
          >
            <ArrowLeft className="w-5 h-5" />
            Back to Careers
          </Link>
          <h1 className="text-3xl md:text-4xl font-black mb-2">Compare Careers</h1>
          <p className="text-lg font-bold text-gray-700">
            Side-by-side comparison of {selectedCareers.length} career{selectedCareers.length > 1 ? 's' : ''}
          </p>
        </div>

        {/* Comparison Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {selectedCareers.map((career) => (
            <div key={career._id} className="bg-white border-3 border-black shadow-brutal-lg">
              {/* Career Header */}
              <div className="bg-primary text-white p-6 relative">
                <button
                  onClick={() => removeCareer(career._id)}
                  className="absolute top-4 right-4 w-8 h-8 bg-white text-black border-2 border-black hover:bg-red-100 transition-colors flex items-center justify-center"
                  title="Remove from comparison"
                >
                  <X className="w-5 h-5" />
                </button>
                <h2 className="text-2xl font-black pr-10">{career.title}</h2>
                <p className="font-bold mt-2">{career.category}</p>
              </div>

              {/* Career Details */}
              <div className="p-6 space-y-6">
                {/* Salary */}
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <DollarSign className="w-5 h-5" />
                    <h3 className="font-black uppercase text-sm">Salary Range</h3>
                  </div>
                  <p className="font-bold text-lg">
                    {formatSalary(career.salaryMin, career.salaryMax, career.currency)}
                  </p>
                </div>

                {/* Education */}
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <GraduationCap className="w-5 h-5" />
                    <h3 className="font-black uppercase text-sm">Required Education</h3>
                  </div>
                  <p className="font-bold">{career.requiredEducation}</p>
                </div>

                {/* Skills */}
                <div>
                  <div className="flex items-center gap-2 mb-3">
                    <Briefcase className="w-5 h-5" />
                    <h3 className="font-black uppercase text-sm">Key Skills</h3>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {career.requiredSkills.slice(0, 5).map((skill, idx) => (
                      <span
                        key={idx}
                        className="px-3 py-1 bg-brutal-yellow text-black text-xs font-bold border-2 border-black"
                      >
                        {skill}
                      </span>
                    ))}
                    {career.requiredSkills.length > 5 && (
                      <span className="px-3 py-1 bg-gray-200 text-gray-700 text-xs font-bold border-2 border-black">
                        +{career.requiredSkills.length - 5} more
                      </span>
                    )}
                  </div>
                </div>

                {/* Career Path */}
                {career.careerPath && career.careerPath.length > 0 && (
                  <div>
                    <div className="flex items-center gap-2 mb-3">
                      <TrendingUp className="w-5 h-5" />
                      <h3 className="font-black uppercase text-sm">Career Path</h3>
                    </div>
                    <div className="space-y-2">
                      {career.careerPath.map((step, idx) => (
                        <div key={idx} className="flex items-start gap-2 text-sm">
                          <Check className="w-4 h-4 mt-0.5 flex-shrink-0" />
                          <div>
                            <p className="font-black">{step.stage}</p>
                            <p className="text-gray-600">{step.duration}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* View Details Button */}
                <Link
                  href={`/careers/${career._id}`}
                  className="block w-full px-4 py-3 bg-white border-3 border-black shadow-brutal-sm hover:shadow-brutal transition-all text-center font-bold uppercase text-sm"
                >
                  View Full Details
                </Link>
              </div>
            </div>
          ))}

          {/* Add Career Card */}
          {selectedCareers.length < 3 && (
            <div className="bg-white border-3 border-black border-dashed shadow-brutal-lg">
              <button
                onClick={() => setShowAddCareer(true)}
                className="w-full h-full min-h-[400px] flex flex-col items-center justify-center gap-4 hover:bg-gray-50 transition-colors p-6"
              >
                <div className="w-16 h-16 bg-primary border-3 border-black shadow-brutal flex items-center justify-center">
                  <Plus className="w-8 h-8 text-white" />
                </div>
                <div className="text-center">
                  <p className="font-black text-xl mb-2">Add Another Career</p>
                  <p className="text-gray-600 font-bold">
                    Compare up to 3 careers
                  </p>
                </div>
              </button>
            </div>
          )}
        </div>

        {/* Add Career Modal */}
        {showAddCareer && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
            <div className="bg-white border-3 border-black shadow-brutal-lg max-w-2xl w-full max-h-[80vh] overflow-auto">
              <div className="p-6 border-b-3 border-black flex items-center justify-between sticky top-0 bg-white">
                <h2 className="text-2xl font-black">Select a Career</h2>
                <button
                  onClick={() => setShowAddCareer(false)}
                  className="w-8 h-8 border-2 border-black hover:bg-gray-100 transition-colors flex items-center justify-center"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
              <div className="p-6 space-y-3">
                {availableCareers.length === 0 ? (
                  <p className="text-center text-gray-600 font-bold py-8">
                    No more careers available to add
                  </p>
                ) : (
                  availableCareers.map((career) => (
                    <button
                      key={career._id}
                      onClick={() => addCareer(career._id)}
                      className="w-full p-4 border-2 border-black hover:shadow-brutal-sm transition-all text-left"
                    >
                      <p className="font-black text-lg">{career.title}</p>
                      <p className="text-sm text-gray-600 font-bold">{career.category}</p>
                    </button>
                  ))
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
