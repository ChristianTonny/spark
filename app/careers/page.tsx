'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Search, Filter, ArrowRight, Bookmark } from 'lucide-react';
import { careers, getCategories } from '@/lib/data';
import { CareerCardSkeleton } from '@/components/loading-skeleton';
import { EmptyState } from '@/components/error-state';
import { useToast } from '@/lib/use-toast';
import { ToastContainer } from '@/components/toast-container';

export default function CareersPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [salaryFilter, setSalaryFilter] = useState('all');
  const [bookmarkedCareers, setBookmarkedCareers] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const toast = useToast();

  const categories = ['All', ...getCategories()];

  // Load bookmarks from localStorage on mount
  useEffect(() => {
    const bookmarks = JSON.parse(localStorage.getItem('bookmarkedCareers') || '[]');
    setBookmarkedCareers(bookmarks);
    // Simulate loading delay for demonstration
    setTimeout(() => setIsLoading(false), 800);
  }, []);

  // Toggle bookmark
  const handleBookmark = (e: React.MouseEvent, careerId: string) => {
    e.preventDefault();
    e.stopPropagation();
    
    const bookmarks = JSON.parse(localStorage.getItem('bookmarkedCareers') || '[]');
    const careerTitle = careers.find(c => c.id === careerId)?.title || 'Career';
    let newBookmarks;
    
    if (bookmarks.includes(careerId)) {
      newBookmarks = bookmarks.filter((id: string) => id !== careerId);
      toast.success(`Removed ${careerTitle} from bookmarks`);
    } else {
      newBookmarks = [...bookmarks, careerId];
      toast.success(`Added ${careerTitle} to bookmarks`);
    }
    
    localStorage.setItem('bookmarkedCareers', JSON.stringify(newBookmarks));
    setBookmarkedCareers(newBookmarks);
  };

  // Filter careers
  const filteredCareers = careers.filter((career) => {
    const matchesSearch = searchQuery === '' || 
      career.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      career.shortDescription.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesCategory = selectedCategory === 'All' || career.category === selectedCategory;
    
    const matchesSalary = 
      salaryFilter === 'all' ||
      (salaryFilter === 'low' && career.salaryMax <= 5000000) ||
      (salaryFilter === 'mid' && career.salaryMin > 5000000 && career.salaryMax <= 10000000) ||
      (salaryFilter === 'high' && career.salaryMin > 10000000);

    return matchesSearch && matchesCategory && matchesSalary;
  });

  return (
    <div className="min-h-screen py-8">
      <div className="container mx-auto px-4 max-w-7xl">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-5xl md:text-6xl font-black mb-4">Explore Careers</h1>
          <p className="text-xl text-gray-700">
            Browse {careers.length}+ career paths and find your future
          </p>
        </div>

        {/* Saved Careers Section */}
        {bookmarkedCareers.length > 0 && (
          <div className="mb-8 p-6 bg-brutal-yellow border-3 border-brutal-border shadow-brutal-lg">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <Bookmark className="w-6 h-6" />
                <h2 className="text-2xl font-black uppercase">Your Saved Careers</h2>
              </div>
              <Link
                href="/dashboard/student"
                className="px-4 py-2 bg-white border-2 border-brutal-border shadow-brutal-sm hover:shadow-brutal transition-all font-bold text-sm uppercase"
              >
                View All →
              </Link>
            </div>
            <div className="grid md:grid-cols-3 gap-4">
              {careers.filter(c => bookmarkedCareers.includes(c.id)).slice(0, 3).map((career) => (
                <Link
                  key={career.id}
                  href={`/careers/${career.id}`}
                  className="p-4 bg-white border-2 border-brutal-border hover:shadow-brutal transition-all"
                >
                  <h3 className="font-black text-lg mb-1">{career.title}</h3>
                  <p className="text-sm text-gray-600 font-bold">{career.category}</p>
                </Link>
              ))}
            </div>
          </div>
        )}

        {/* Search and Filters */}
        <div className="mb-8 space-y-4">
          {/* Search Bar */}
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-6 h-6 text-gray-500" />
            <input
              type="text"
              placeholder="Search careers..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-14 pr-4 py-4 text-lg font-bold border-3 border-brutal-border shadow-brutal focus:shadow-brutal-lg focus:outline-none transition-all"
            />
          </div>

          {/* Filters */}
          <div className="flex flex-col md:flex-row gap-4">
            {/* Category Filter */}
            <div className="flex-1">
              <label className="block font-black text-sm uppercase mb-2">Category</label>
              <div className="flex flex-wrap gap-2">
                {categories.map((category) => (
                  <button
                    key={category}
                    onClick={() => setSelectedCategory(category)}
                    className={`px-4 py-2 font-bold uppercase text-sm border-3 border-brutal-border transition-all ${
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
            <div className="md:w-64">
              <label className="block font-black text-sm uppercase mb-2" htmlFor="salary-filter">
                Salary Range
              </label>
              <select
                id="salary-filter"
                value={salaryFilter}
                onChange={(e) => setSalaryFilter(e.target.value)}
                className="w-full px-4 py-3 font-bold border-3 border-brutal-border shadow-brutal focus:shadow-brutal-lg focus:outline-none"
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
          <p className="text-lg font-bold">
            {filteredCareers.length} {filteredCareers.length === 1 ? 'career' : 'careers'} found
          </p>
        </div>

        {/* Career Grid */}
        {isLoading ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {Array.from({ length: 6 }).map((_, i) => (
              <CareerCardSkeleton key={i} />
            ))}
          </div>
        ) : filteredCareers.length > 0 ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredCareers.map((career, index) => (
              <Link
                key={career.id}
                href={`/careers/${career.id}`}
                className="group block"
              >
                <div className="bg-white border-3 border-brutal-border shadow-brutal hover:shadow-brutal-lg hover:translate-x-[-2px] hover:translate-y-[-2px] transition-all overflow-hidden h-full flex flex-col">
                  {/* Image */}
                  <div className="relative h-48 overflow-hidden border-b-3 border-brutal-border">
                    <img
                      src={career.videoThumbnail}
                      alt={career.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute top-3 right-3">
                      <span className="px-3 py-1 bg-white text-brutal-text text-sm font-bold uppercase border-2 border-brutal-border shadow-brutal-sm">
                        {career.category}
                      </span>
                    </div>
                    <button 
                      onClick={(e) => handleBookmark(e, career.id)}
                      className={`absolute top-3 left-3 p-2 border-2 border-brutal-border shadow-brutal-sm hover:bg-brutal-yellow transition-colors ${
                        bookmarkedCareers.includes(career.id) ? 'bg-brutal-yellow' : 'bg-white'
                      }`}
                      aria-label={bookmarkedCareers.includes(career.id) ? 'Remove bookmark' : 'Add bookmark'}
                      title={bookmarkedCareers.includes(career.id) ? 'Remove bookmark' : 'Add bookmark'}
                    >
                      <Bookmark className={`w-5 h-5 ${bookmarkedCareers.includes(career.id) ? 'fill-current' : ''}`} />
                    </button>
                  </div>

                  {/* Content */}
                  <div className="p-6 flex-1 flex flex-col">
                    <h3 className="text-2xl font-black mb-2 group-hover:text-brutal-orange transition-colors">
                      {career.title}
                    </h3>
                    <p className="text-gray-700 mb-4 line-clamp-3 flex-1">
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
                    <div className="flex items-center justify-between pt-4 border-t-3 border-gray-200">
                      <div>
                        <p className="text-sm font-bold text-gray-600 uppercase">Salary</p>
                        <p className="text-lg font-black text-brutal-orange">
                          {(career.salaryMin / 1000000).toFixed(1)}M - {(career.salaryMax / 1000000).toFixed(1)}M
                        </p>
                      </div>
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
        {filteredCareers.length > 0 && (
          <div className="mt-16 text-center">
            <div className="inline-block p-8 bg-brutal-blue text-white border-3 border-brutal-border shadow-brutal-xl">
              <h3 className="text-3xl font-black mb-4">Not sure where to start?</h3>
              <p className="text-lg mb-6 opacity-90">
                Take our assessment to find careers that match your interests
              </p>
              <Link
                href="/assessments"
                className="inline-block px-8 py-4 bg-white text-brutal-blue font-bold uppercase border-3 border-brutal-border shadow-brutal hover:shadow-brutal-lg hover:translate-x-[-2px] hover:translate-y-[-2px] transition-all"
              >
                Take Assessment
              </Link>
            </div>
          </div>
        )}
      </div>
      
      {/* Toast Notifications */}
      <ToastContainer toasts={toast.toasts} onClose={toast.removeToast} />
    </div>
  );
}
