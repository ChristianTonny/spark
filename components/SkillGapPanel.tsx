'use client';

import { useState } from 'react';
import Link from 'next/link';
import { TrendingUp, BookOpen, Clock, CheckCircle, Circle, ChevronDown, ChevronUp, Users } from 'lucide-react';
import type { RecommendationOutput, SkillGapOutput } from '../convex/lib/skillAnalysis';

interface MentorSuggestion {
  _id: string;
  userId: string;
  jobTitle: string;
  company: string;
  rating: number;
  careerIds: string[];
}

interface Props {
  recommendation: RecommendationOutput;
  isAuthenticated: boolean;
  completedResourceIds?: Set<string>;
  onCompleteResource?: (resourceId: string, skillName: string) => void;
  mentorSuggestions?: MentorSuggestion[];
  targetCareerId?: string;
}

const IMPORTANCE_STYLE: Record<string, string> = {
  critical: 'bg-red-100 text-red-800 border-red-400',
  high: 'bg-orange-100 text-orange-800 border-orange-400',
  medium: 'bg-yellow-100 text-yellow-800 border-yellow-400',
  low: 'bg-gray-100 text-gray-700 border-gray-400',
};

function formatRWF(amount: number): string {
  if (amount >= 1_000_000) return `+${(amount / 1_000_000).toFixed(1)}M RWF/mo`;
  return `+${(amount / 1_000).toFixed(0)}k RWF/mo`;
}

function GapCard({ gap, isAuthenticated, completedResourceIds, onCompleteResource }: {
  gap: SkillGapOutput;
  isAuthenticated: boolean;
  completedResourceIds?: Set<string>;
  onCompleteResource?: (resourceId: string, skillName: string) => void;
}) {
  const [expanded, setExpanded] = useState(false);

  return (
    <div className="border-3 border-black bg-white">
      <button
        onClick={() => setExpanded((v) => !v)}
        className="w-full flex items-center justify-between p-4 text-left hover:bg-gray-50 transition-colors"
      >
        <div className="flex items-center gap-3 flex-wrap">
          <span className="font-black text-base">{gap.skill}</span>
          <span className={`text-xs font-bold px-2 py-0.5 border rounded-full ${IMPORTANCE_STYLE[gap.importance] ?? ''}`}>
            {gap.importance}
          </span>
          {gap.salaryImpact > 0 && (
            <span className="flex items-center gap-1 text-xs font-black text-green-700">
              <TrendingUp className="w-3 h-3" />
              {formatRWF(gap.salaryImpact)}
            </span>
          )}
        </div>
        <div className="flex items-center gap-3 text-sm font-bold text-gray-600 flex-shrink-0">
          <span className="flex items-center gap-1">
            <Clock className="w-3.5 h-3.5" />
            {gap.timeToLearn}
          </span>
          <span>{gap.opportunities} job{gap.opportunities !== 1 ? 's' : ''}</span>
          {expanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
        </div>
      </button>

      {expanded && (
        <div className="px-4 pb-4 border-t-2 border-black pt-3 space-y-3">
          {gap.learningResources.length > 0 ? (
            <>
              <p className="text-xs font-black uppercase text-gray-500">Resources</p>
              <div className="space-y-2">
                {gap.learningResources.map((resource) => {
                  const isDone = completedResourceIds?.has(resource.resourceId) ?? false;
                  return (
                    <div key={resource.resourceId} className="flex items-start justify-between gap-3 p-3 border-2 border-black">
                      <div className="flex items-start gap-2">
                        {isAuthenticated && (
                          <button
                            onClick={() => onCompleteResource?.(resource.resourceId, gap.skill)}
                            aria-label={isDone ? 'Mark incomplete' : 'Mark complete'}
                            className="mt-0.5 flex-shrink-0"
                          >
                            {isDone
                              ? <CheckCircle className="w-4 h-4 text-green-600" />
                              : <Circle className="w-4 h-4 text-gray-400" />
                            }
                          </button>
                        )}
                        <div>
                          <p className={`font-bold text-sm ${isDone ? 'line-through text-gray-400' : ''}`}>
                            {resource.title}
                          </p>
                          <p className="text-xs text-gray-500 font-bold">
                            {resource.provider} · {resource.type} · {resource.cost}
                            {resource.duration && ` · ${resource.duration}`}
                          </p>
                        </div>
                      </div>
                      <a
                        href={resource.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex-shrink-0 px-3 py-1 bg-black text-white font-bold text-xs border-2 border-black hover:bg-gray-800 transition-colors"
                      >
                        Open
                      </a>
                    </div>
                  );
                })}
              </div>
            </>
          ) : (
            <p className="text-sm font-bold text-gray-500">
              Search for &ldquo;{gap.skill}&rdquo; on Coursera, YouTube, or freeCodeCamp.
            </p>
          )}

          {!isAuthenticated && (
            <p className="text-xs font-bold text-gray-500 bg-gray-50 border border-gray-200 p-2">
              <Link href="/sign-in" className="underline">Sign in</Link> to track your progress.
            </p>
          )}
        </div>
      )}
    </div>
  );
}

export function SkillGapPanel({ recommendation, isAuthenticated, completedResourceIds, onCompleteResource, mentorSuggestions, targetCareerId }: Props) {
  const { skillGaps, learningPath, salaryProjection } = recommendation;

  return (
    <div className="space-y-6">
      {/* Salary projection */}
      <div className="p-5 bg-brutal-yellow border-3 border-black shadow-brutal">
        <h3 className="font-black text-lg mb-3 flex items-center gap-2">
          <TrendingUp className="w-5 h-5" />
          Salary Projection
        </h3>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <p className="text-xs font-black uppercase text-gray-600">Current Baseline</p>
            <p className="text-2xl font-black">
              {(salaryProjection.current / 1_000_000).toFixed(1)}M
              <span className="text-sm font-bold text-gray-600"> RWF/mo</span>
            </p>
          </div>
          <div>
            <p className="text-xs font-black uppercase text-gray-600">Potential (in {salaryProjection.timeframe})</p>
            <p className="text-2xl font-black text-green-700">
              {(salaryProjection.potential / 1_000_000).toFixed(1)}M
              <span className="text-sm font-bold text-gray-600"> RWF/mo</span>
            </p>
          </div>
        </div>
      </div>

      {/* Skill gaps */}
      {skillGaps.length > 0 ? (
        <div>
          <h3 className="font-black text-lg mb-3 flex items-center gap-2">
            <BookOpen className="w-5 h-5" />
            Top {skillGaps.length} Skill Gap{skillGaps.length !== 1 ? 's' : ''}
          </h3>
          <div className="space-y-2">
            {skillGaps.map((gap) => (
              <GapCard
                key={gap.skill}
                gap={gap}
                isAuthenticated={isAuthenticated}
                completedResourceIds={completedResourceIds}
                onCompleteResource={onCompleteResource}
              />
            ))}
          </div>
        </div>
      ) : (
        <div className="p-5 bg-green-50 border-3 border-green-400 text-center">
          <p className="font-black text-green-800 text-lg">Strong skill match!</p>
          <p className="font-bold text-green-700 mt-1">
            You already qualify for multiple current opportunities.
          </p>
        </div>
      )}

      {/* Learning path summary */}
      {learningPath.phases.length > 0 && (
        <div className="p-5 bg-white border-3 border-black">
          <h3 className="font-black text-lg mb-1">{learningPath.title}</h3>
          <p className="text-sm font-bold text-gray-600 mb-4">{learningPath.description}</p>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {learningPath.phases.map((phase, i) => (
              <div key={phase.id} className={`p-3 border-2 border-black ${i === 0 ? 'bg-blue-50' : i === 1 ? 'bg-yellow-50' : 'bg-green-50'}`}>
                <p className="font-black text-sm">{phase.title}</p>
                <p className="text-xs font-bold text-gray-600">{phase.duration}</p>
                <ul className="mt-2 space-y-1">
                  {phase.objectives.map((obj) => (
                    <li key={obj} className="text-xs font-bold text-gray-700">• {obj}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Mentor suggestions */}
      {mentorSuggestions && mentorSuggestions.length > 0 && (
        <div className="p-5 bg-white border-3 border-black">
          <h3 className="font-black text-lg mb-3 flex items-center gap-2">
            <Users className="w-5 h-5" />
            Mentors in this field
          </h3>
          <div className="space-y-2">
            {mentorSuggestions.slice(0, 3).map((mentor) => (
              <div key={mentor._id} className="flex items-center justify-between p-3 border-2 border-black">
                <div>
                  <p className="font-black text-sm">{mentor.jobTitle}</p>
                  <p className="text-xs font-bold text-gray-600">{mentor.company} · ⭐ {mentor.rating.toFixed(1)}</p>
                </div>
                <Link
                  href={`/mentors/${mentor._id}${targetCareerId ? `?career=${targetCareerId}` : ''}`}
                  className="px-3 py-1.5 bg-black text-white font-bold text-xs border-2 border-black hover:bg-gray-800 transition-colors"
                >
                  Book Chat
                </Link>
              </div>
            ))}
          </div>
          <Link
            href={`/mentors${targetCareerId ? `?career=${targetCareerId}` : ''}`}
            className="mt-3 block text-center text-sm font-black underline hover:no-underline"
          >
            View all mentors →
          </Link>
        </div>
      )}
    </div>
  );
}
