'use client';

import { Suspense } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft, Bookmark, X, Plus, TrendingUp } from 'lucide-react';
import { useQuery, useMutation } from "convex/react";
import { api } from "../../../convex/_generated/api";
import { Spinner } from '@/components/loading-skeleton';
import { useConvexAuth } from '@/lib/hooks/useConvexAuth';
import { useToast } from '@/lib/use-toast';
import { ToastContainer } from '@/components/toast-container';
import type { Id } from "@/convex/_generated/dataModel";

function CareerComparisonContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const toast = useToast();
  const { user } = useConvexAuth();

  // Get career IDs from URL
  const idsParam = searchParams.get('ids');
  const careerIds = idsParam ? idsParam.split(',').filter(id => id) as Id<"careers">[] : [];

  // Fetch careers
  const careers = useQuery(
    api.careers.getByIds,
    careerIds.length > 0 ? { ids: careerIds } : "skip"
  );

  const bookmarkedIds = useQuery(api.savedCareers.getIds, user ? {} : "skip");
  const toggleBookmark = useMutation(api.savedCareers.toggle);

  // Handle bookmark
  const handleBookmark = async (careerId: string, careerTitle: string) => {
    if (!user) {
      toast.error('Please sign in to bookmark careers');
      return;
    }

    try {
      const result = await toggleBookmark({ careerId });
      if (result.action === 'added') {
        toast.success(`Added ${careerTitle} to bookmarks`);
      } else {
        toast.success(`Removed ${careerTitle} from bookmarks`);
      }
    } catch (error) {
      toast.error('Failed to update bookmark');
    }
  };

  // Handle remove career from comparison
  const handleRemove = (careerId: string) => {
    const newIds = careerIds.filter(id => id !== careerId);
    if (newIds.length === 0) {
      router.push('/careers');
    } else {
      router.push(`/careers/compare?ids=${newIds.join(',')}`);
    }
  };

  // Loading state
  if (careerIds.length === 0) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center p-4">
        <div className="text-center max-w-md">
          <h2 className="text-2xl font-black mb-4">No Careers Selected</h2>
          <p className="text-gray-700 font-bold mb-6">
            Select 2-3 careers from the careers page to compare them.
          </p>
          <Link href="/careers">
            <button className="px-6 py-3 bg-primary text-white font-bold uppercase border-3 border-black shadow-brutal hover:shadow-brutal-lg transition-all">
              Browse Careers
            </button>
          </Link>
        </div>
      </div>
    );
  }

  if (careers === undefined) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <Spinner size="lg" />
      </div>
    );
  }

  // Comparison categories
  const comparisonRows = [
    {
      label: 'Salary Range',
      getValue: (career: any) => `${(career.salaryMin / 1000000).toFixed(1)}M - ${(career.salaryMax / 1000000).toFixed(1)}M RWF/year`,
    },
    {
      label: 'Category',
      getValue: (career: any) => career.category,
    },
    {
      label: 'Education Required',
      getValue: (career: any) => career.educationRequired,
    },
    {
      label: 'Personality Type',
      getValue: (career: any) => career.riasecTypes.join(', '),
    },
    {
      label: 'Work Environment',
      getValue: (career: any) => career.workEnvironment,
    },
    {
      label: 'Growth Outlook',
      getValue: (career: any) => career.growthOutlook,
    },
  ];

  return (
    <div className="min-h-screen bg-background py-8 px-4">
      <div className="container mx-auto max-w-7xl">
        {/* Header */}
        <div className="mb-8">
          <Link href="/careers" className="inline-flex items-center gap-2 text-lg font-bold text-gray-700 hover:text-black mb-4">
            <ArrowLeft className="w-5 h-5" />
            Back to Careers
          </Link>
          <h1 className="text-4xl md:text-5xl font-black mb-2 uppercase">
            Compare Careers
          </h1>
          <p className="text-lg font-bold text-gray-700">
            Side-by-side comparison of {careers.length} careers
          </p>
        </div>

        {/* Desktop: Comparison Table */}
        <div className="hidden md:block bg-white border-3 border-black shadow-brutal-lg overflow-hidden">
          <table className="w-full">
            <thead>
              <tr className="border-b-3 border-black">
                <th className="p-4 text-left bg-background border-r-3 border-black w-48">
                  <span className="text-sm font-black uppercase text-gray-600">Feature</span>
                </th>
                {careers.map((career, idx) => (
                  <th key={career._id} className={`p-4 ${idx < careers.length - 1 ? 'border-r-3 border-black' : ''}`}>
                    <div className="text-left">
                      <button
                        onClick={() => handleRemove(career._id)}
                        className="float-right p-1 hover:bg-gray-100 border-2 border-black"
                        title="Remove from comparison"
                      >
                        <X className="w-4 h-4" />
                      </button>
                      <h3 className="text-xl font-black mb-2 pr-8">{career.title}</h3>
                      <p className="text-sm font-bold text-gray-600 line-clamp-2">
                        {career.shortDescription}
                      </p>
                    </div>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {comparisonRows.map((row, rowIdx) => (
                <tr key={row.label} className={`${rowIdx < comparisonRows.length - 1 ? 'border-b-2 border-black' : ''}`}>
                  <td className="p-4 bg-background border-r-3 border-black font-black text-sm">
                    {row.label}
                  </td>
                  {careers.map((career, idx) => (
                    <td
                      key={career._id}
                      className={`p-4 ${idx < careers.length - 1 ? 'border-r-3 border-black' : ''}`}
                    >
                      <span className="font-bold text-sm">{row.getValue(career)}</span>
                    </td>
                  ))}
                </tr>
              ))}
              
              {/* Actions Row */}
              <tr>
                <td className="p-4 bg-background border-r-3 border-black font-black text-sm">
                  Actions
                </td>
                {careers.map((career, idx) => (
                  <td
                    key={career._id}
                    className={`p-4 ${idx < careers.length - 1 ? 'border-r-3 border-black' : ''}`}
                  >
                    <div className="flex flex-col gap-2">
                      <Link href={`/careers/${career._id}`}>
                        <button className="w-full px-4 py-2 bg-black text-white font-bold uppercase text-xs border-3 border-black shadow-brutal-sm hover:shadow-brutal transition-all">
                          View Details
                        </button>
                      </Link>
                      <button
                        onClick={() => handleBookmark(career._id, career.title)}
                        className={`w-full px-4 py-2 font-bold uppercase text-xs border-3 border-black shadow-brutal-sm hover:shadow-brutal transition-all flex items-center justify-center gap-2 ${
                          bookmarkedIds?.includes(career._id)
                            ? 'bg-brutal-yellow text-black'
                            : 'bg-white text-black'
                        }`}
                      >
                        <Bookmark className={`w-3 h-3 ${bookmarkedIds?.includes(career._id) ? 'fill-current' : ''}`} />
                        {bookmarkedIds?.includes(career._id) ? 'Saved' : 'Save'}
                      </button>
                    </div>
                  </td>
                ))}
              </tr>
            </tbody>
          </table>
        </div>

        {/* Mobile: Stacked Cards */}
        <div className="md:hidden space-y-6">
          {careers.map((career) => (
            <div key={career._id} className="bg-white border-3 border-black shadow-brutal-lg p-6">
              <div className="flex items-start justify-between mb-4">
                <h3 className="text-2xl font-black pr-4">{career.title}</h3>
                <button
                  onClick={() => handleRemove(career._id)}
                  className="p-2 hover:bg-gray-100 border-2 border-black"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
              
              <p className="text-sm font-bold text-gray-700 mb-4">
                {career.shortDescription}
              </p>

              <div className="space-y-3 mb-4">
                {comparisonRows.map((row) => (
                  <div key={row.label} className="border-t-2 border-black pt-3">
                    <div className="text-xs font-black uppercase text-gray-600 mb-1">
                      {row.label}
                    </div>
                    <div className="font-bold text-sm">
                      {row.getValue(career)}
                    </div>
                  </div>
                ))}
              </div>

              <div className="flex flex-col gap-2">
                <Link href={`/careers/${career._id}`}>
                  <button className="w-full px-4 py-3 bg-black text-white font-bold uppercase text-sm border-3 border-black shadow-brutal hover:shadow-brutal-lg transition-all">
                    View Full Details
                  </button>
                </Link>
                <button
                  onClick={() => handleBookmark(career._id, career.title)}
                  className={`w-full px-4 py-3 font-bold uppercase text-sm border-3 border-black shadow-brutal hover:shadow-brutal-lg transition-all flex items-center justify-center gap-2 ${
                    bookmarkedIds?.includes(career._id)
                      ? 'bg-brutal-yellow text-black'
                      : 'bg-white text-black'
                  }`}
                >
                  <Bookmark className={`w-4 h-4 ${bookmarkedIds?.includes(career._id) ? 'fill-current' : ''}`} />
                  {bookmarkedIds?.includes(career._id) ? 'Saved' : 'Save Career'}
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Add Another Career Button */}
        {careers.length < 3 && (
          <div className="mt-6 text-center">
            <Link href="/careers">
              <button className="px-6 py-3 bg-white border-3 border-black shadow-brutal hover:shadow-brutal-lg transition-all font-bold uppercase flex items-center gap-2 mx-auto">
                <Plus className="w-5 h-5" />
                Add Another Career
              </button>
            </Link>
          </div>
        )}

        {/* Comparison Tips */}
        <div className="mt-8 p-6 bg-brutal-blue text-white border-3 border-black shadow-brutal">
          <h3 className="text-xl font-black mb-3 flex items-center gap-2">
            <TrendingUp className="w-5 h-5" />
            Comparison Tips
          </h3>
          <ul className="space-y-2 font-bold">
            <li>• Look at salary ranges to understand earning potential</li>
            <li>• Check education requirements to plan your study path</li>
            <li>• Match personality types with your assessment results</li>
            <li>• Consider work environment and growth outlook for long-term fit</li>
          </ul>
        </div>
      </div>

      {/* Toast Notifications */}
      <ToastContainer toasts={toast.toasts} onClose={toast.removeToast} />
    </div>
  );
}

export default function CareerComparisonPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-background flex items-center justify-center">
        <Spinner size="lg" />
      </div>
    }>
      <CareerComparisonContent />
    </Suspense>
  );
}
