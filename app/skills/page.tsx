'use client';

/**
 * /skills — Standalone skill audit + job matching
 *
 * Step machine:
 *
 *   select ──▶ loading ──▶ results
 *
 * Auth model:
 *   - Anonymous: state in sessionStorage (cleared on tab close)
 *     Results show in-session only. "Save results" CTA prompts signup.
 *   - Authenticated: skills + analysis persisted to Convex.
 *
 * Accepts ?career=[careerId] from /assessment/results CTA.
 */

import { Suspense, useCallback, useEffect, useReducer, useRef } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft, ArrowRight, Loader2, RotateCcw, LogIn } from 'lucide-react';
import { useQuery, useAction, useMutation } from 'convex/react';
import { anyApi } from 'convex/server';
import { useConvexAuth } from '@/lib/hooks/useConvexAuth';
import { SkillSelector, type SelectedSkill } from '@/components/SkillSelector';
import { JobMatches } from '@/components/JobMatches';
import { SkillGapPanel } from '@/components/SkillGapPanel';
import { Spinner } from '@/components/loading-skeleton';
import type { RecommendationOutput, JobListingInput, UserSkillInput } from '../../convex/lib/skillAnalysis';

// ─── State machine ────────────────────────────────────────────────────────────

type Step = 'select' | 'loading' | 'results';

interface State {
  step: Step;
  skills: SelectedSkill[];
  recommendation: RecommendationOutput | null;
  analysisSource: 'ai' | 'fallback' | null;
  error: string | null;
  completedResourceIds: Set<string>;
}

type Action =
  | { type: 'SET_SKILLS'; skills: SelectedSkill[] }
  | { type: 'START_ANALYSIS' }
  | { type: 'ANALYSIS_DONE'; recommendation: RecommendationOutput; source: 'ai' | 'fallback' }
  | { type: 'ANALYSIS_ERROR'; error: string }
  | { type: 'RESET' }
  | { type: 'COMPLETE_RESOURCE'; resourceId: string };

function reducer(state: State, action: Action): State {
  switch (action.type) {
    case 'SET_SKILLS':
      return { ...state, skills: action.skills };
    case 'START_ANALYSIS':
      return { ...state, step: 'loading', error: null };
    case 'ANALYSIS_DONE':
      return { ...state, step: 'results', recommendation: action.recommendation, analysisSource: action.source };
    case 'ANALYSIS_ERROR':
      return { ...state, step: 'select', error: action.error };
    case 'RESET':
      return { ...initialState };
    case 'COMPLETE_RESOURCE':
      return { ...state, completedResourceIds: new Set([...state.completedResourceIds, action.resourceId]) };
  }
}

const initialState: State = {
  step: 'select',
  skills: [],
  recommendation: null,
  analysisSource: null,
  error: null,
  completedResourceIds: new Set(),
};

const SESSION_STORAGE_KEY = 'spark_skills_state';

// ─── Page content ─────────────────────────────────────────────────────────────

function SkillsPageContent() {
  const searchParams = useSearchParams();
  const targetCareerId = searchParams.get('career') ?? undefined;
  const { user } = useConvexAuth();

  const [state, dispatch] = useReducer(reducer, initialState, (init) => {
    // Restore session state (anonymous users, tab refresh)
    try {
      const saved = sessionStorage.getItem(SESSION_STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved) as Partial<State>;
        if (parsed.step === 'results' && parsed.recommendation && parsed.skills) {
          return {
            ...init,
            ...parsed,
            completedResourceIds: new Set(Array.isArray(parsed.completedResourceIds) ? parsed.completedResourceIds : []),
          };
        }
      }
    } catch {
      // sessionStorage unavailable (private browsing, etc.) — use React state only
    }
    return init;
  });

  // Persist to sessionStorage when results are available
  const prevStepRef = useRef<Step>(state.step);
  useEffect(() => {
    if (state.step === 'results' && state.recommendation) {
      try {
        sessionStorage.setItem(SESSION_STORAGE_KEY, JSON.stringify({
          step: state.step,
          skills: state.skills,
          recommendation: state.recommendation,
          analysisSource: state.analysisSource,
          completedResourceIds: Array.from(state.completedResourceIds),
        }));
      } catch { /* sessionStorage unavailable — no-op */ }
    }
    if (state.step === 'select' && prevStepRef.current === 'results') {
      try { sessionStorage.removeItem(SESSION_STORAGE_KEY); } catch { /* no-op */ }
    }
    prevStepRef.current = state.step;
  }, [state]);

  // Convex data — anyApi used because skillAnalysis types are generated at runtime
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const taxonomy = useQuery(anyApi.skillAnalysis.getSkillTaxonomy as any);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const jobs = useQuery(anyApi.skillAnalysis.getJobListings as any, {});
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const runAnalysis = useAction(anyApi.skillAnalysis.runSkillAnalysis as any);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const saveSkillProfile = useMutation(anyApi.skillAnalysis.saveSkillProfile as any);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const saveLearningProgress = useMutation(anyApi.skillAnalysis.saveLearningProgress as any);

  // Mentor suggestions (if authenticated)
  const mentors = useQuery(
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    anyApi.professionals.list as any,
    user ? {} : 'skip',
  );

  const handleAnalyze = useCallback(async () => {
    if (state.skills.length === 0) return;

    dispatch({ type: 'START_ANALYSIS' });

    try {
      // Save profile for authenticated users, get version
      let profileVersion = 1;
      if (user) {
        const result = await saveSkillProfile({
          userId: user._id,
          skills: state.skills,
          preferredIndustries: [],
          targetCareerId,
        });
        profileVersion = result.version;
      }

      const result = await runAnalysis({
        userId: user?._id,
        skills: state.skills,
        profileVersion,
        targetCareerId,
      });

      dispatch({ type: 'ANALYSIS_DONE', recommendation: result.recommendation, source: result.source });
    } catch (err) {
      dispatch({ type: 'ANALYSIS_ERROR', error: 'Analysis failed. Please try again.' });
      console.error('[skills] analysis error', err);
    }
  }, [state.skills, user, runAnalysis, saveSkillProfile, targetCareerId]);

  const handleCompleteResource = useCallback(async (resourceId: string, skillName: string) => {
    dispatch({ type: 'COMPLETE_RESOURCE', resourceId });
    if (user) {
      try {
        await saveLearningProgress({ userId: user._id, targetSkill: skillName, completedResourceId: resourceId });
      } catch {
        // Non-critical — local state already updated
      }
    }
  }, [user, saveLearningProgress]);

  // ─── Render ─────────────────────────────────────────────────────────────────

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto max-w-4xl px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <Link href="/assessment/results" className="inline-flex items-center gap-2 text-sm font-bold text-gray-600 hover:text-black mb-4">
            <ArrowLeft className="w-4 h-4" />
            Back to Assessment
          </Link>
          <h1 className="text-4xl md:text-5xl font-black uppercase mb-2">Job Readiness Check</h1>
          <p className="text-lg font-bold text-gray-700">
            Select your skills → See which Rwanda jobs you qualify for today, and exactly what to learn next.
          </p>
        </div>

        {/* ── STEP: SELECT ──────────────────────────────────────────────── */}
        {state.step === 'select' && (
          <div className="space-y-6">
            {state.error && (
              <div className="p-4 bg-red-50 border-3 border-red-400 font-bold text-red-800">
                {state.error}
              </div>
            )}

            {!taxonomy ? (
              <div className="flex justify-center p-12"><Spinner size="lg" /></div>
            ) : (
              <>
                <SkillSelector
                  taxonomy={taxonomy}
                  selected={state.skills}
                  onChange={(skills) => dispatch({ type: 'SET_SKILLS', skills })}
                />

                <div className="sticky bottom-4">
                  <button
                    onClick={handleAnalyze}
                    disabled={state.skills.length === 0}
                    className="w-full flex items-center justify-center gap-2 px-6 py-4 bg-black text-white font-black text-lg uppercase border-3 border-black shadow-brutal hover:shadow-brutal-lg transition-all disabled:opacity-40 disabled:cursor-not-allowed"
                  >
                    Analyse My Skills
                    <ArrowRight className="w-5 h-5" />
                  </button>
                  {state.skills.length === 0 && (
                    <p className="text-center text-sm font-bold text-gray-500 mt-2">
                      Select at least one skill to continue
                    </p>
                  )}
                </div>
              </>
            )}
          </div>
        )}

        {/* ── STEP: LOADING ─────────────────────────────────────────────── */}
        {state.step === 'loading' && (
          <div className="flex flex-col items-center justify-center py-24 gap-6">
            <Loader2 className="w-12 h-12 animate-spin" />
            <div className="text-center">
              <p className="font-black text-xl">Analysing your skills…</p>
              <p className="font-bold text-gray-600 mt-2">
                Matching {state.skills.length} skill{state.skills.length !== 1 ? 's' : ''} against Rwanda job listings
              </p>
            </div>
          </div>
        )}

        {/* ── STEP: RESULTS ─────────────────────────────────────────────── */}
        {state.step === 'results' && state.recommendation && (
          <div className="space-y-8">
            {/* Source badge */}
            {state.analysisSource === 'fallback' && (
              <p className="text-xs font-bold text-gray-400 text-right">Analysis: data-driven model</p>
            )}

            {/* Anonymous save prompt */}
            {!user && (
              <div className="flex items-center justify-between p-4 bg-blue-50 border-3 border-blue-400">
                <div>
                  <p className="font-black text-blue-900">Save your results</p>
                  <p className="font-bold text-sm text-blue-700">Sign up to track progress and revisit your analysis.</p>
                </div>
                <Link
                  href="/sign-up/student"
                  className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white font-black border-2 border-blue-800 hover:bg-blue-700 transition-colors whitespace-nowrap text-sm"
                >
                  <LogIn className="w-4 h-4" />
                  Sign up free
                </Link>
              </div>
            )}

            {/* Tabs */}
            <SkillResultTabs
              recommendation={state.recommendation}
              jobs={(jobs ?? []) as JobListingInput[]}
              userSkills={state.skills as UserSkillInput[]}
              isAuthenticated={!!user}
              completedResourceIds={state.completedResourceIds}
              onCompleteResource={handleCompleteResource}
              mentors={mentors}
              targetCareerId={targetCareerId}
            />

            {/* Restart */}
            <div className="flex justify-center">
              <button
                onClick={() => dispatch({ type: 'RESET' })}
                className="flex items-center gap-2 px-4 py-2 border-2 border-black font-bold text-sm hover:bg-gray-50 transition-colors"
              >
                <RotateCcw className="w-4 h-4" />
                Update my skills
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

// ─── Result tabs ───────────────────────────────────────────────────────────────

function SkillResultTabs({
  recommendation, jobs, userSkills, isAuthenticated,
  completedResourceIds, onCompleteResource, mentors, targetCareerId,
}: {
  recommendation: RecommendationOutput;
  jobs: JobListingInput[];
  userSkills: UserSkillInput[];
  isAuthenticated: boolean;
  completedResourceIds: Set<string>;
  onCompleteResource: (resourceId: string, skillName: string) => void;
  mentors: unknown;
  targetCareerId?: string;
}) {
  const [activeTab, setActiveTab] = useReducer((_: string, next: string) => next, 'jobs');

  const currentIds = new Set(recommendation.currentOpportunityIds);
  const nextIds = new Set(recommendation.nextLevelOpportunityIds);
  const currentJobs = jobs.filter((j) => currentIds.has(j._id));
  const nextJobs = jobs.filter((j) => nextIds.has(j._id));
  const allRelevantJobs = [...new Map([...currentJobs, ...nextJobs].map((j) => [j._id, j])).values()];

  const mentorList = Array.isArray(mentors) ? mentors : [];

  const tabs = [
    { id: 'jobs', label: `Job Matches (${allRelevantJobs.length})` },
    { id: 'gaps', label: `Skill Gaps (${recommendation.skillGaps.length})` },
  ];

  return (
    <div>
      <div className="flex border-b-3 border-black mb-6">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => activeTab !== tab.id && setActiveTab(tab.id)}
            className={`px-6 py-3 font-black text-sm uppercase border-r-2 border-black transition-colors
              ${activeTab === tab.id ? 'bg-black text-white' : 'bg-white text-black hover:bg-gray-50'}`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {activeTab === 'jobs' && (
        <div className="space-y-4">
          {allRelevantJobs.length === 0 ? (
            <div className="p-8 bg-white border-3 border-black text-center">
              <p className="font-black text-lg">No current matches</p>
              <p className="font-bold text-gray-600 mt-2">
                Close your skill gaps below to unlock opportunities.
              </p>
              <button
                onClick={() => setActiveTab('gaps')}
                className="mt-4 px-4 py-2 bg-black text-white font-bold border-2 border-black hover:bg-gray-800 transition-colors"
              >
                View skill gaps →
              </button>
            </div>
          ) : (
            <JobMatches
              jobs={allRelevantJobs}
              userSkills={userSkills}
            />
          )}
        </div>
      )}

      {activeTab === 'gaps' && (
        <SkillGapPanel
          recommendation={recommendation}
          isAuthenticated={isAuthenticated}
          completedResourceIds={completedResourceIds}
          onCompleteResource={onCompleteResource}
          mentorSuggestions={mentorList as Parameters<typeof SkillGapPanel>[0]['mentorSuggestions']}
          targetCareerId={targetCareerId}
        />
      )}
    </div>
  );
}

// ─── Export with Suspense (required for useSearchParams) ─────────────────────

export default function SkillsPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-background flex items-center justify-center">
        <Spinner size="lg" />
      </div>
    }>
      <SkillsPageContent />
    </Suspense>
  );
}
