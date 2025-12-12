'use client';

import { Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { useQuery } from 'convex/react';
import { api } from '../../convex/_generated/api';
import { Spinner } from '@/components/loading-skeleton';

function LearnInner() {
  const searchParams = useSearchParams();
  const careerId = searchParams.get('careerId');

  const career = useQuery(
    api.careers.getById,
    careerId ? ({ id: careerId as any } as any) : 'skip'
  );

  if (!careerId) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center p-4">
        <div className="bg-white border-3 border-black shadow-brutal p-6 max-w-lg w-full">
          <h1 className="text-2xl font-black uppercase mb-3">Start Learning</h1>
          <p className="text-sm font-bold text-gray-700 mb-6">
            Missing career selection. Go back to your results and try again.
          </p>
          <Link href="/assessment/results">
            <button className="px-4 py-2 bg-black text-white font-bold text-sm border-2 border-black hover:shadow-brutal transition-all">
              Back to Results →
            </button>
          </Link>
        </div>
      </div>
    );
  }

  if (career === undefined) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <Spinner size="lg" />
          <p className="mt-4 text-xl font-bold">Loading learning plan...</p>
        </div>
      </div>
    );
  }

  if (!career) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center p-4">
        <div className="bg-white border-3 border-black shadow-brutal p-6 max-w-lg w-full">
          <h1 className="text-2xl font-black uppercase mb-3">Start Learning</h1>
          <p className="text-sm font-bold text-gray-700 mb-6">
            That career could not be found.
          </p>
          <Link href="/assessment/results">
            <button className="px-4 py-2 bg-black text-white font-bold text-sm border-2 border-black hover:shadow-brutal transition-all">
              Back to Results →
            </button>
          </Link>
        </div>
      </div>
    );
  }

  const resources =
    (career as any).resources && Array.isArray((career as any).resources)
      ? ((career as any).resources as Array<{
          name: string;
          type: string;
          rating: number;
          description: string;
          url?: string;
        }>)
      : [];

  return (
    <div className="min-h-screen bg-background py-10 px-4">
      <div className="container mx-auto max-w-3xl space-y-6">
        <Link href={`/careers/${career._id}`} className="inline-flex items-center gap-2 font-bold text-sm text-gray-700 hover:text-black">
          <ArrowLeft className="w-4 h-4" />
          Back to career
        </Link>

        <div className="bg-white border-3 border-black shadow-brutal-lg p-6 md:p-8">
          <p className="text-xs font-black uppercase text-gray-600 mb-2">Start learning</p>
          <h1 className="text-3xl md:text-4xl font-black mb-2">{career.title}</h1>
          <p className="text-sm md:text-base font-bold text-gray-700 mb-6">
            A simple plan to begin this path. Keep it small, do it consistently.
          </p>

          <div className="space-y-4">
            <div className="border-2 border-black p-5 bg-background">
              <h2 className="text-lg font-black uppercase mb-2">This week</h2>
              <ol className="list-decimal list-inside space-y-2 text-sm font-bold text-gray-800">
                <li>Read the career guide and write 3 questions you still have.</li>
                <li>Pick 1 beginner resource and commit to 30–60 minutes/day.</li>
                <li>Do 1 small project (even a tiny one) and document it.</li>
              </ol>
            </div>

            <div className="border-2 border-black p-5 bg-background">
              <h2 className="text-lg font-black uppercase mb-2">Next 30 days</h2>
              <ol className="list-decimal list-inside space-y-2 text-sm font-bold text-gray-800">
                <li>Finish 1 course/module and produce 1 tangible output.</li>
                <li>Talk to a mentor or professional and validate your assumptions.</li>
                <li>Compare this path with your #2 option to confirm fit.</li>
              </ol>
            </div>
          </div>

          <div className="mt-8">
            <h2 className="text-xl font-black uppercase mb-3">Suggested resources</h2>
            {resources.length === 0 ? (
              <p className="text-sm font-bold text-gray-700">
                No curated resources for this career yet. Use the career page resources section when available.
              </p>
            ) : (
              <div className="space-y-3">
                {resources.slice(0, 6).map((r, idx) => (
                  <div key={idx} className="border-2 border-black p-4 bg-white">
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <p className="font-black">{r.name}</p>
                        <p className="text-xs font-bold text-gray-600 uppercase mt-1">
                          {r.type} • {r.rating}/3
                        </p>
                        <p className="text-sm font-bold text-gray-700 mt-2">{r.description}</p>
                      </div>
                      {r.url && (
                        <a
                          href={r.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="px-4 py-2 bg-black text-white font-bold text-xs uppercase border-2 border-black hover:shadow-brutal transition-all inline-flex items-center gap-2 h-fit"
                        >
                          Open <ArrowRight className="w-4 h-4" />
                        </a>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="mt-8 flex flex-col md:flex-row gap-3">
            <Link href={`/careers/${career._id}`} className="flex-1">
              <button className="w-full px-6 py-4 bg-white text-black font-bold uppercase border-3 border-black shadow-brutal hover:shadow-brutal-lg hover:translate-x-[-2px] hover:translate-y-[-2px] transition-all">
                View career guide
              </button>
            </Link>
            <Link href={`/careers/compare?ids=${encodeURIComponent(career._id)}`} className="flex-1">
              <button className="w-full px-6 py-4 bg-primary text-white font-bold uppercase border-3 border-black shadow-brutal hover:shadow-brutal-lg hover:translate-x-[-2px] hover:translate-y-[-2px] transition-all">
                Compare options
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function LearnPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-background flex items-center justify-center">
          <div className="text-center">
            <Spinner size="lg" />
            <p className="mt-4 text-xl font-bold">Loading...</p>
          </div>
        </div>
      }
    >
      <LearnInner />
    </Suspense>
  );
}


