'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Search, Filter, ArrowRight, Bookmark } from 'lucide-react';
import { careers, getCategories } from '@/lib/data';

export default function CareersPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [salaryFilter, setSalaryFilter] = useState('all');
  const [bookmarkedCareers, setBookmarkedCareers] = useState<string[]>([]);

  const categories = ['All', ...getCategories()];

  // Load bookmarks from localStorage on mount
  useEffect(() => {
    const bookmarks = JSON.parse(localStorage.getItem('bookmarkedCareers') || '[]');
    setBookmarkedCareers(bookmarks);
  }, []);

  // Toggle bookmark
  const handleBookmark = (e: React.MouseEvent, careerId: string) => {
    e.preventDefault();
    e.stopPropagation();
    
    const bookmarks = JSON.parse(localStorage.getItem('bookmarkedCareers') || '[]');
    let newBookmarks;
    
    if (bookmarks.includes(careerId)) {
      newBookmarks = bookmarks.filter((id: string) => id !== careerId);
    } else {
      newBookmarks = [...bookmarks, careerId];
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
        {filteredCareers.length > 0 ? (
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
          <div className="text-center py-16">
            <div className="inline-block p-8 bg-white border-3 border-brutal-border shadow-brutal">
              <Filter className="w-16 h-16 mx-auto mb-4 text-gray-400" />
              <h3 className="text-2xl font-black mb-2">No careers found</h3>
              <p className="text-gray-700 mb-4">
                Try adjusting your filters or search query
              </p>
              <button
                onClick={() => {
                  setSearchQuery('');
                  setSelectedCategory('All');
                  setSalaryFilter('all');
                }}
                className="px-6 py-3 bg-brutal-orange text-white font-bold uppercase border-3 border-brutal-border shadow-brutal hover:shadow-brutal-lg transition-all"
              >
                Clear Filters
              </button>
            </div>
          </div>
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
    </div>
  );
}
