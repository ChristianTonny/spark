// Reusable skeleton loading components

export function CareerCardSkeleton() {
  return (
    <div className="bg-white border-3 border-brutal-border shadow-brutal animate-pulse">
      {/* Image skeleton */}
      <div className="h-48 bg-gray-200 border-b-3 border-brutal-border" />

      {/* Content */}
      <div className="p-6 space-y-4">
        {/* Title */}
        <div className="h-8 bg-gray-200 rounded w-3/4" />

        {/* Description */}
        <div className="space-y-2">
          <div className="h-4 bg-gray-200 rounded w-full" />
          <div className="h-4 bg-gray-200 rounded w-5/6" />
        </div>

        {/* Skills */}
        <div className="flex gap-2">
          <div className="h-6 bg-gray-200 rounded w-16" />
          <div className="h-6 bg-gray-200 rounded w-20" />
          <div className="h-6 bg-gray-200 rounded w-14" />
        </div>

        {/* Footer */}
        <div className="pt-4 border-t-3 border-gray-200 flex justify-between items-center">
          <div className="h-6 bg-gray-200 rounded w-24" />
          <div className="h-6 bg-gray-200 rounded w-6" />
        </div>
      </div>
    </div>
  );
}

export function MentorCardSkeleton() {
  return (
    <div className="bg-white border-3 border-black shadow-brutal animate-pulse">
      {/* Header */}
      <div className="p-6 border-b-3 border-black">
        <div className="flex items-start gap-4">
          <div className="w-20 h-20 bg-gray-200 border-3 border-black flex-shrink-0" />
          <div className="flex-1 space-y-2">
            <div className="h-6 bg-gray-200 rounded w-3/4" />
            <div className="h-4 bg-gray-200 rounded w-1/2" />
            <div className="h-4 bg-gray-200 rounded w-2/3" />
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="p-6 space-y-4">
        {/* Stats */}
        <div className="flex gap-4 pb-4 border-b-2 border-gray-200">
          <div className="h-6 bg-gray-200 rounded w-16" />
          <div className="h-6 bg-gray-200 rounded w-20" />
        </div>

        {/* Bio */}
        <div className="space-y-2">
          <div className="h-4 bg-gray-200 rounded w-full" />
          <div className="h-4 bg-gray-200 rounded w-4/5" />
        </div>

        {/* Button */}
        <div className="h-12 bg-gray-200 rounded border-3 border-black" />
      </div>
    </div>
  );
}

export function AssessmentResultSkeleton() {
  return (
    <div className="border-2 border-black p-6 animate-pulse">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div className="flex-1 space-y-3">
          <div className="flex items-center gap-3">
            <div className="h-4 bg-gray-200 rounded w-24" />
            <div className="h-6 bg-gray-200 rounded w-20" />
          </div>
          <div className="h-6 bg-gray-200 rounded w-2/3" />
          <div className="h-4 bg-gray-200 rounded w-full" />
        </div>
        <div className="flex gap-2">
          <div className="h-10 bg-gray-200 rounded w-32 border-2 border-black" />
          <div className="h-10 bg-gray-200 rounded w-10 border-2 border-black" />
        </div>
      </div>
    </div>
  );
}

export function CareerDetailSkeleton() {
  return (
    <div className="min-h-screen bg-white">
      <div className="border-b-4 border-black">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="h-10 bg-gray-200 rounded w-32 animate-pulse" />
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8 md:py-12 animate-pulse">
        {/* Hero */}
        <div className="mb-12 space-y-6">
          <div className="h-8 bg-gray-200 rounded w-32" />
          <div className="h-12 bg-gray-200 rounded w-3/4" />
          <div className="h-6 bg-gray-200 rounded w-full" />

          {/* Key Info Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="h-32 bg-gray-200 rounded border-2 border-black" />
            ))}
          </div>
        </div>

        {/* Video */}
        <div className="aspect-video bg-gray-200 rounded border-4 border-black mb-12" />

        {/* Content */}
        <div className="grid md:grid-cols-3 gap-8">
          <div className="md:col-span-2 space-y-8">
            <div className="space-y-4">
              <div className="h-8 bg-gray-200 rounded w-1/2" />
              <div className="space-y-2">
                <div className="h-4 bg-gray-200 rounded w-full" />
                <div className="h-4 bg-gray-200 rounded w-full" />
                <div className="h-4 bg-gray-200 rounded w-3/4" />
              </div>
            </div>
          </div>
          <div className="space-y-6">
            <div className="h-32 bg-gray-200 rounded border-2 border-black" />
            <div className="h-40 bg-gray-200 rounded border-2 border-black" />
          </div>
        </div>
      </div>
    </div>
  );
}

export function TableSkeleton({ rows = 5 }: { rows?: number }) {
  return (
    <div className="space-y-4 animate-pulse">
      {Array.from({ length: rows }).map((_, i) => (
        <div key={i} className="flex items-center gap-4 p-4 border-2 border-gray-200">
          <div className="w-12 h-12 bg-gray-200 rounded-full" />
          <div className="flex-1 space-y-2">
            <div className="h-4 bg-gray-200 rounded w-3/4" />
            <div className="h-3 bg-gray-200 rounded w-1/2" />
          </div>
          <div className="h-8 bg-gray-200 rounded w-20" />
        </div>
      ))}
    </div>
  );
}

// Simple spinner component
export function Spinner({ size = 'md' }: { size?: 'sm' | 'md' | 'lg' }) {
  const sizeClasses = {
    sm: 'w-4 h-4 border-2',
    md: 'w-6 h-6 border-2',
    lg: 'w-8 h-8 border-3',
  };

  return (
    <div
      className={`${sizeClasses[size]} border-current border-t-transparent rounded-full animate-spin`}
      role="status"
      aria-label="Loading"
    />
  );
}

// Loading overlay for full screen
import { AssessmentLoader } from './assessment-loader';

export function LoadingOverlay({ message = 'Loading...' }: { message?: string }) {
  return (
    <AssessmentLoader fullscreen message={message} />
  );
}
