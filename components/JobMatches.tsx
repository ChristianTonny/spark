'use client';

import { useMemo, useState } from 'react';
import Link from 'next/link';
import { MapPin, Building2, Wifi, TrendingUp, ChevronLeft, ChevronRight } from 'lucide-react';
import { calculateJobMatchScore, type UserSkillInput, type JobListingInput } from '../convex/lib/skillAnalysis';

interface JobWithScore extends JobListingInput {
  _id: string;
  score: number;
  missingSkills: string[];
}

interface Props {
  jobs: JobListingInput[];
  userSkills: UserSkillInput[];
  pageSize?: number;
}

const LEVEL_LABEL: Record<string, string> = {
  entry: 'Entry Level',
  mid: 'Mid Level',
  senior: 'Senior',
  lead: 'Lead',
};

const SCORE_CATEGORY = (score: number) => {
  if (score >= 0.8) return { label: 'Excellent Match', color: 'bg-green-100 text-green-800 border-green-400' };
  if (score >= 0.6) return { label: 'Good Match', color: 'bg-blue-100 text-blue-800 border-blue-400' };
  if (score >= 0.4) return { label: 'Fair Match', color: 'bg-yellow-100 text-yellow-800 border-yellow-400' };
  return { label: 'Low Match', color: 'bg-red-100 text-red-800 border-red-400' };
};

function getMissingSkills(userSkills: UserSkillInput[], job: JobListingInput): string[] {
  const userNames = userSkills.map((s) => s.name.toLowerCase().trim());
  return job.requiredSkills.filter((req) => {
    const r = req.toLowerCase().trim();
    return !userNames.some((u) => u === r || u.includes(r) || r.includes(u));
  });
}

function formatRWF(amount: number): string {
  if (amount >= 1_000_000) return `${(amount / 1_000_000).toFixed(1)}M RWF`;
  return `${(amount / 1_000).toFixed(0)}k RWF`;
}

export function JobMatches({ jobs, userSkills, pageSize = 10 }: Props) {
  const [page, setPage] = useState(0);
  const [industryFilter, setIndustryFilter] = useState('All');
  const [levelFilter, setLevelFilter] = useState('All');
  const [remoteOnly, setRemoteOnly] = useState(false);
  const [sortBy, setSortBy] = useState<'match' | 'salary'>('match');

  // Memoised scoring — only recomputes when skills or jobs change
  const scored = useMemo<JobWithScore[]>(() => {
    return jobs.map((job) => ({
      ...job,
      score: calculateJobMatchScore(userSkills, job),
      missingSkills: getMissingSkills(userSkills, job),
    }));
  }, [jobs, userSkills]);

  // Industries for filter
  const industries = useMemo(() => {
    const set = new Set(jobs.map((j) => j.industry));
    return ['All', ...Array.from(set).sort()];
  }, [jobs]);

  const levels = ['All', 'entry', 'mid', 'senior', 'lead'];

  // Filter + sort
  const filtered = useMemo(() => {
    let result = scored.filter((j) => j.score >= 0.1); // Show jobs with at least some match
    if (industryFilter !== 'All') result = result.filter((j) => j.industry === industryFilter);
    if (levelFilter !== 'All') result = result.filter((j) => j.level === levelFilter);
    if (remoteOnly) result = result.filter((j) => j.isRemote);
    if (sortBy === 'match') result = [...result].sort((a, b) => b.score - a.score);
    else result = [...result].sort((a, b) => (b.salaryMax + b.salaryMin) - (a.salaryMax + a.salaryMin));
    return result;
  }, [scored, industryFilter, levelFilter, remoteOnly, sortBy]);

  const totalPages = Math.ceil(filtered.length / pageSize);
  const paginated = filtered.slice(page * pageSize, (page + 1) * pageSize);

  // Reset to page 0 when filters change
  const handleFilter = (fn: () => void) => {
    fn();
    setPage(0);
  };

  if (jobs.length === 0) {
    return (
      <div className="p-8 bg-white border-3 border-black text-center">
        <p className="font-black text-lg">No job listings available</p>
        <p className="font-bold text-gray-600 mt-2">Check back soon — more Rwanda positions are added regularly.</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {/* Filters */}
      <div className="flex flex-wrap gap-3 p-4 bg-white border-3 border-black">
        <select
          value={industryFilter}
          onChange={(e) => handleFilter(() => setIndustryFilter(e.target.value))}
          className="border-2 border-black px-3 py-2 font-bold text-sm bg-white focus:outline-none"
          aria-label="Filter by industry"
        >
          {industries.map((i) => <option key={i}>{i}</option>)}
        </select>

        <select
          value={levelFilter}
          onChange={(e) => handleFilter(() => setLevelFilter(e.target.value))}
          className="border-2 border-black px-3 py-2 font-bold text-sm bg-white focus:outline-none"
          aria-label="Filter by level"
        >
          {levels.map((l) => (
            <option key={l} value={l}>{l === 'All' ? 'All Levels' : LEVEL_LABEL[l] ?? l}</option>
          ))}
        </select>

        <label className="flex items-center gap-2 font-bold text-sm cursor-pointer">
          <input
            type="checkbox"
            checked={remoteOnly}
            onChange={(e) => handleFilter(() => setRemoteOnly(e.target.checked))}
            className="w-4 h-4 border-2 border-black"
          />
          Remote only
        </label>

        <div className="ml-auto flex items-center gap-2">
          <span className="text-sm font-bold text-gray-600">Sort:</span>
          <button
            onClick={() => handleFilter(() => setSortBy('match'))}
            className={`px-3 py-1 border-2 border-black font-bold text-xs transition-colors ${sortBy === 'match' ? 'bg-black text-white' : 'bg-white hover:bg-gray-50'}`}
          >
            Match %
          </button>
          <button
            onClick={() => handleFilter(() => setSortBy('salary'))}
            className={`px-3 py-1 border-2 border-black font-bold text-xs transition-colors ${sortBy === 'salary' ? 'bg-black text-white' : 'bg-white hover:bg-gray-50'}`}
          >
            Salary
          </button>
        </div>
      </div>

      {/* Results count */}
      <p className="font-bold text-sm text-gray-600">
        {filtered.length} positions found
        {industryFilter !== 'All' || levelFilter !== 'All' || remoteOnly ? ' (filtered)' : ''}
      </p>

      {/* Job cards */}
      {paginated.length === 0 ? (
        <div className="p-8 bg-white border-3 border-black text-center">
          <p className="font-black text-lg">No matches for these filters</p>
          <button
            onClick={() => { setIndustryFilter('All'); setLevelFilter('All'); setRemoteOnly(false); setPage(0); }}
            className="mt-3 px-4 py-2 border-2 border-black font-bold text-sm hover:bg-gray-50"
          >
            Clear filters
          </button>
        </div>
      ) : (
        <div className="space-y-3">
          {paginated.map((job) => {
            const category = SCORE_CATEGORY(job.score);
            return (
              <div key={job._id} className="bg-white border-3 border-black shadow-brutal p-5 hover:shadow-brutal-lg transition-all">
                <div className="flex items-start justify-between gap-4 mb-3">
                  <div>
                    <h3 className="text-lg font-black">{job.title}</h3>
                    <div className="flex flex-wrap items-center gap-2 mt-1">
                      <span className="flex items-center gap-1 text-sm font-bold text-gray-700">
                        <Building2 className="w-3.5 h-3.5" />
                        {job.company}
                      </span>
                      <span className="flex items-center gap-1 text-sm font-bold text-gray-700">
                        <MapPin className="w-3.5 h-3.5" />
                        {job.location}
                      </span>
                      {job.isRemote && (
                        <span className="flex items-center gap-1 text-xs font-bold text-blue-700 bg-blue-50 border border-blue-300 px-2 py-0.5 rounded-full">
                          <Wifi className="w-3 h-3" />
                          Remote
                        </span>
                      )}
                    </div>
                  </div>
                  {/* Match score */}
                  <div className="text-right flex-shrink-0">
                    <div className="text-2xl font-black">{Math.round(job.score * 100)}%</div>
                    <span className={`text-xs font-bold px-2 py-0.5 border rounded-full ${category.color}`}>
                      {category.label}
                    </span>
                  </div>
                </div>

                {/* Salary + level */}
                <div className="flex flex-wrap items-center gap-3 mb-3">
                  <span className="flex items-center gap-1 font-black text-sm">
                    <TrendingUp className="w-3.5 h-3.5" />
                    {formatRWF(job.salaryMin)} – {formatRWF(job.salaryMax)}/mo
                  </span>
                  <span className="text-xs font-bold bg-gray-100 border border-gray-300 px-2 py-0.5 rounded-full">
                    {LEVEL_LABEL[job.level] ?? job.level}
                  </span>
                  <span className="text-xs font-bold bg-gray-100 border border-gray-300 px-2 py-0.5 rounded-full">
                    {job.industry}
                  </span>
                </div>

                {/* Missing skills */}
                {job.missingSkills.length > 0 && (
                  <div className="mt-2">
                    <p className="text-xs font-black text-gray-500 uppercase mb-1">Missing skills:</p>
                    <div className="flex flex-wrap gap-1">
                      {job.missingSkills.slice(0, 4).map((skill) => (
                        <span key={skill} className="text-xs font-bold bg-red-50 border border-red-300 text-red-700 px-2 py-0.5 rounded">
                          {skill}
                        </span>
                      ))}
                      {job.missingSkills.length > 4 && (
                        <span className="text-xs font-bold text-gray-500">+{job.missingSkills.length - 4} more</span>
                      )}
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex items-center justify-between pt-2">
          <button
            onClick={() => setPage((p) => Math.max(0, p - 1))}
            disabled={page === 0}
            className="flex items-center gap-1 px-4 py-2 border-2 border-black font-bold text-sm disabled:opacity-40 hover:bg-gray-50 transition-colors"
          >
            <ChevronLeft className="w-4 h-4" />
            Previous
          </button>
          <span className="font-bold text-sm">
            Page {page + 1} of {totalPages}
          </span>
          <button
            onClick={() => setPage((p) => Math.min(totalPages - 1, p + 1))}
            disabled={page >= totalPages - 1}
            className="flex items-center gap-1 px-4 py-2 border-2 border-black font-bold text-sm disabled:opacity-40 hover:bg-gray-50 transition-colors"
          >
            Next
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      )}
    </div>
  );
}
