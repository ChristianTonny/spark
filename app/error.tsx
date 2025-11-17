'use client';

import { useEffect } from 'react';
import { Button } from '@/components/ui/button';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log error to error reporting service
    console.error('Error boundary caught:', error);
  }, [error]);

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <div className="bg-white border-3 border-black shadow-brutal p-8 max-w-md w-full">
        <h2 className="font-black text-2xl uppercase mb-4">Something went wrong!</h2>
        <p className="font-bold text-gray-700 mb-6">
          We encountered an unexpected error. Please try again.
        </p>
        <div className="space-y-3">
          <Button
            onClick={reset}
            className="w-full"
          >
            Try Again
          </Button>
          <Button
            onClick={() => window.location.href = '/'}
            variant="outline"
            className="w-full"
          >
            Go Home
          </Button>
        </div>
      </div>
    </div>
  );
}
