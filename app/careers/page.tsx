'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Search, Filter, ArrowRight, Bookmark, GitCompare, Check } from 'lucide-react';
import { useQuery, useMutation } from "convex/react";
import { api } from "../../convex/_generated/api";
import { CareerCardSkeleton } from '@/components/loading-skeleton';
import { EmptyState } from '@/components/error-state';
import { useToast } from '@/lib/use-toast';
import { ToastContainer } from '@/components/toast-container';
import { useConvexAuth } from '@/lib/hooks/useConvexAuth';
import type { Id } from "@/convex/_generated/dataModel";

export default function CareersPage() {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [salaryFilter, setSalaryFilter] = useState('all');
  const [selectedForComparison, setSelectedForComparison] = useState<Set<Id<"careers">>>(new Set());
  const toast = useToast();
  const { user, isLoading: authLoading } = useConvexAuth();

  // Fetch data from Convex
  const allCareers = useQuery(api.careers.search, {
    searchQuery: searchQuery || undefined,
    category: selectedCategory !== 'All' ? selectedCategory : undefined,
    salaryFilter,
  });

  const categories = useQuery(api.careers.getCategories);

  // Only fetch bookmarks if user is authenticated and synced
  const bookmarkedIds = useQuery(api.savedCareers.getIds, user ? {} : "skip");
  const toggleBookmark = useMutation(api.savedCareers.toggle);
  const bookmarkedCareers = useQuery(api.savedCareers.list, user ? {} : "skip");

  // Toggle bookmark
  const handleBookmark = async (e: React.MouseEvent, careerId: string, careerTitle: string) => {
    e.preventDefault();
    e.stopPropagation();

    // Require authentication to bookmark
    if (!user) {
      toast.error('Please sign in to bookmark careers');
      return;
    }

    try {
      const result = await toggleBookmark({
        careerId,
      });

      if (result.action === 'added') {
        toast.success(`Added ${careerTitle} to bookmarks`);
      } else {
        toast.success(`Removed ${careerTitle} from bookmarks`);
      }
    } catch (error) {
      toast.error('Failed to update bookmark');
    }
  };

  // Toggle career selection for comparison
  const handleToggleSelection = (e: React.MouseEvent, careerId: Id<"careers">) => {
    e.preventDefault();
    e.stopPropagation();

    const newSelection = new Set(selectedForComparison);
    
    if (newSelection.has(careerId)) {
      newSelection.delete(careerId);
    } else {
      if (newSelection.size >= 3) {
        toast.error('You can only compare up to 3 careers at once');
        return;
      }
      newSelection.add(careerId);
    }
    
    setSelectedForComparison(newSelection);
  };

  // Navigate to comparison page
  const handleCompare = () => {
    if (selectedForComparison.size < 2) {
      toast.error('Please select at least 2 careers to compare');
      return;
    }
    
    const ids = Array.from(selectedForComparison).join(',');
    router.push(`/careers/compare?ids=${ids}`);
  };

  // Loading state - only wait for public data (careers and categories)
  const isLoading = allCareers === undefined || categories === undefined;

  return (
    <div className="min-h-screen py-4 sm:py-8">
      <div className="container mx-auto px-3 sm:px-4 max-w-7xl">
        {/* Header */}
        <div className="mb-6 sm:mb-8">
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black mb-3 sm:mb-4">Explore Careers</h1>
          <p className="text-sm sm:text-base md:text-lg text-gray-700">
            Browse {allCareers?.length || 0}+ career paths and find your future
          </p>
        </div>

        {/* Saved Careers Section */}
        {!isLoading && bookmarkedCareers && bookmarkedCareers.length > 0 && (
          <div className="mb-6 sm:mb-8 p-4 sm:p-6 bg-brutal-yellow border-3 border-brutal-border shadow-brutal-lg">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-4">
              <div className="flex items-center gap-2">
                <Bookmark className="w-5 h-5 sm:w-6 sm:h-6" />
                <h2 className="text-xl sm:text-2xl font-black uppercase">Your Saved Careers</h2>
              </div>
              <Link
                href="/dashboard/student"
                className="px-4 py-2 min-h-[44px] bg-white border-2 border-brutal-border shadow-brutal-sm hover:shadow-brutal transition-all font-bold text-xs sm:text-sm uppercase text-center"
              >
                View All →
              </Link>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              {bookmarkedCareers.slice(0, 3).map((career) => (
                <Link
                  key={career._id}
                  href={`/careers/${career._id}`}
                  className="p-4 bg-white border-2 border-brutal-border hover:shadow-brutal transition-all"
                >
                  <h3 className="font-black text-base sm:text-lg mb-1">{career.title}</h3>
                  <p className="text-xs sm:text-sm text-gray-600 font-bold">{career.category}</p>
                </Link>
              ))}
            </div>
          </div>
        )}

        {/* Search and Filters */}
        <div className="mb-6 sm:mb-8 space-y-4">
          {/* Search Bar */}
          <div className="relative">
            <Search className="absolute left-3 sm:left-4 top-1/2 -translate-y-1/2 w-5 h-5 sm:w-6 sm:h-6 text-gray-500" />
            <input
              type="text"
              placeholder="Search careers..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 sm:pl-14 pr-4 py-3 sm:py-4 min-h-[44px] text-base sm:text-lg font-bold border-3 border-brutal-border shadow-brutal focus:shadow-brutal-lg focus:outline-none transition-all"
            />
          </div>

          {/* Filters */}
          <div className="flex flex-col lg:flex-row gap-4">
            {/* Category Filter */}
            <div className="flex-1">
              <label className="block font-black text-xs sm:text-sm uppercase mb-2">Category</label>
              <div className="flex flex-wrap gap-2">
                {['All', ...(categories || [])].map((category) => (
                  <button
                    key={category}
                    onClick={() => setSelectedCategory(category)}
                    className={`px-3 sm:px-4 py-2 min-h-[44px] font-bold uppercase text-xs sm:text-sm border-3 border-brutal-border transition-all ${
                      selectedCategory === category
                        ? 'bg-brutal-orange text-white shadow-brutal'
                        : 'bg-white hover:shadow-brutal-sm'
                    }`}
                  >
                    {category}
                  </button>
                ))}
              </div>
            </div>

            {/* Salary Filter */}
            <div className="lg:w-64">
              <label className="block font-black text-xs sm:text-sm uppercase mb-2" htmlFor="salary-filter">
                Salary Range
              </label>
              <select
                id="salary-filter"
                value={salaryFilter}
                onChange={(e) => setSalaryFilter(e.target.value)}
                className="w-full px-3 sm:px-4 py-2 sm:py-3 min-h-[44px] font-bold border-3 border-brutal-border shadow-brutal focus:shadow-brutal-lg focus:outline-none text-sm sm:text-base"
                aria-label="Filter by salary range"
              >
                <option value="all">All Salaries</option>
                <option value="low">Under 5M RWF</option>
                <option value="mid">5M - 10M RWF</option>
                <option value="high">Above 10M RWF</option>
              </select>
            </div>
          </div>
        </div>

        {/* Results Count */}
        <div className="mb-6">
          <p className="text-base sm:text-lg font-bold text-gray-600">
            {allCareers?.length || 0} {allCareers?.length === 1 ? 'career' : 'careers'} found
          </p>
        </div>

        {/* Career Grid */}
        {isLoading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {Array.from({ length: 6 }).map((_, i) => (
              <CareerCardSkeleton key={i} />
            ))}
          </div>
        ) : allCareers && allCareers.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {allCareers.map((career, index) => (
              <Link
                key={career._id}
                href={`/careers/${career._id}`}
                className="group block"
              >
                <div className="bg-white border-3 border-brutal-border shadow-brutal hover:shadow-brutal-lg hover:translate-x-[-2px] hover:translate-y-[-2px] transition-all overflow-hidden h-full flex flex-col">
                  {/* Image */}
                  <div className="relative h-44 sm:h-48 md:h-52 overflow-hidden border-b-3 border-brutal-border">
                    <img
                      src={career.videoThumbnail}
                      alt={career.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute top-2 sm:top-3 right-2 sm:right-3">
                      <span className="px-2 sm:px-3 py-1 bg-white text-brutal-text text-xs sm:text-sm font-bold uppercase border-2 border-brutal-border shadow-brutal-sm">
                        {career.category}
                      </span>
                    </div>

                    {/* Comparison Checkbox */}
                    <button
                      onClick={(e) => handleToggleSelection(e, career._id)}
                      className={`absolute bottom-2 sm:bottom-3 left-2 sm:left-3 p-2 sm:p-2.5 min-h-[44px] min-w-[44px] border-2 border-brutal-border shadow-brutal-sm hover:bg-brutal-blue hover:text-white active:scale-95 transition-all ${
                        selectedForComparison.has(career._id) ? 'bg-brutal-blue text-white' : 'bg-white'
                      }`}
                      aria-label={selectedForComparison.has(career._id) ? 'Remove from comparison' : 'Add to comparison'}
                      title={selectedForComparison.has(career._id) ? 'Remove from comparison' : 'Add to comparison'}
                    >
                      {selectedForComparison.has(career._id) ? (
                        <Check className="w-4 h-4 sm:w-5 sm:h-5" />
                      ) : (
                        <GitCompare className="w-4 h-4 sm:w-5 sm:h-5" />
                      )}
                    </button>

                    <button
                      onClick={(e) => handleBookmark(e, career._id, career.title)}
                      className={`absolute top-2 sm:top-3 left-2 sm:left-3 p-2 sm:p-2.5 min-h-[44px] min-w-[44px] border-2 border-brutal-border shadow-brutal-sm hover:bg-brutal-yellow active:scale-95 transition-all ${
                        bookmarkedIds?.includes(career._id) ? 'bg-brutal-yellow' : 'bg-white'
                      }`}
                      aria-label={bookmarkedIds?.includes(career._id) ? 'Remove bookmark' : 'Add bookmark'}
                      title={bookmarkedIds?.includes(career._id) ? 'Remove bookmark' : 'Add bookmark'}
                    >
                      <Bookmark className={`w-4 h-4 sm:w-5 sm:h-5 ${bookmarkedIds?.includes(career._id) ? 'fill-current' : ''}`} />
                    </button>
                  </div>

                  {/* Content */}
                  <div className="p-4 sm:p-6 flex-1 flex flex-col">
                    <h3 className="text-xl sm:text-2xl font-black mb-2 group-hover:text-brutal-orange transition-colors">
                      {career.title}
                    </h3>
                    <p className="text-sm sm:text-base text-gray-700 mb-4 line-clamp-3 flex-1">
                      {career.shortDescription}
                    </p>

                    {/* Skills */}
                    <div className="mb-4">
                      <div className="flex flex-wrap gap-2">
                        {career.requiredSkills.slice(0, 3).map((skill) => (
                          <span
                            key={skill}
                            className="px-2 py-1 bg-brutal-bg text-xs font-bold uppercase border-2 border-brutal-border"
                          >
                            {skill}
                          </span>
                        ))}
                        {career.requiredSkills.length > 3 && (
                          <span className="px-2 py-1 text-xs font-bold text-gray-500">
                            +{career.requiredSkills.length - 3} more
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Footer */}
                    <div className="grid grid-cols-2 gap-4 pt-4 border-t-3 border-gray-200">
                      <div>
                        <p className="text-sm font-bold text-gray-600 uppercase">Salary</p>
                        <p className="text-lg font-black text-brutal-orange">
                          {(career.salaryMin / 1000000).toFixed(1)}M - {(career.salaryMax / 1000000).toFixed(1)}M
                        </p>
                      </div>
                      {career.costAnalysis && (
                        <div className="text-right">
                          <p className="text-sm font-bold text-gray-600 uppercase">Entry Cost</p>
                          <p className="text-lg font-black text-brutal-blue">
                            {(career.costAnalysis.totalCostMin / 1000000).toFixed(1)}M+
                          </p>
                        </div>
                      )}
                      {!career.costAnalysis && <div></div>}
                    </div>
                    <div className="pt-2 flex justify-end">
                      <ArrowRight className="w-6 h-6 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <EmptyState
            title="No careers found"
            message="Try adjusting your search query or filters to find more careers."
            action={{
              label: 'Clear Filters',
              onClick: () => {
                setSearchQuery('');
                setSelectedCategory('All');
                setSalaryFilter('all');
              }
            }}
          />
        )}

        {/* CTA Section */}
        {allCareers && allCareers.length > 0 && (
          <div className="mt-12 sm:mt-16 text-center">
            <div className="inline-block p-6 sm:p-8 bg-brutal-blue text-white border-3 border-brutal-border shadow-brutal-xl">
              <h3 className="text-2xl sm:text-3xl font-black mb-3 sm:mb-4">Not sure where to start?</h3>
              <p className="text-base sm:text-lg mb-4 sm:mb-6 opacity-90">
                Take our assessment to find careers that match your interests
              </p>
              <Link
                href="/assessments"
                className="inline-block px-6 sm:px-8 py-3 sm:py-4 min-h-[48px] bg-white text-brutal-blue font-bold uppercase border-3 border-brutal-border shadow-brutal hover:shadow-brutal-lg active:shadow-none transition-all text-sm sm:text-base"
              >
                Take Assessment
              </Link>
            </div>
          </div>
        )}
      </div>
      
      {/* Toast Notifications */}
      <ToastContainer toasts={toast.toasts} onClose={toast.removeToast} />

      {/* Floating Compare Button */}
      {selectedForComparison.size > 0 && (
        <div className="fixed bottom-4 sm:bottom-6 right-4 sm:right-6 left-4 sm:left-auto z-50">
          <button
            onClick={handleCompare}
            className="w-full sm:w-auto px-4 sm:px-6 py-3 sm:py-4 min-h-[52px] bg-brutal-blue text-white font-bold uppercase border-3 border-black shadow-brutal-lg hover:shadow-brutal-xl active:shadow-brutal transition-all flex items-center justify-center gap-2 sm:gap-3 text-sm sm:text-base"
          >
            <GitCompare className="w-4 h-4 sm:w-5 sm:h-5" />
            <span className="hidden sm:inline">Compare Selected ({selectedForComparison.size})</span>
            <span className="sm:hidden">Compare ({selectedForComparison.size})</span>
            <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5" />
          </button>
        </div>
      )}
    </div>
  );
}
