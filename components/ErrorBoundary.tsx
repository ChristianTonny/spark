'use client';

import { Component, ReactNode } from 'react';
import { AlertTriangle, RefreshCw } from 'lucide-react';

interface ErrorBoundaryProps {
  children: ReactNode;
  fallback?: ReactNode;
}

interface ErrorBoundaryState {
  hasError: boolean;
  error: Error | null;
}

/**
 * Error Boundary Component
 *
 * Catches JavaScript errors anywhere in the child component tree,
 * logs those errors, and displays a fallback UI instead of the
 * component tree that crashed.
 */
export class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error('Error Boundary caught an error:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback;
      }

      return (
        <div className="min-h-screen bg-background flex items-center justify-center p-4">
          <div className="bg-white border-4 border-black shadow-brutal-lg max-w-2xl w-full p-8">
            <div className="flex items-center gap-4 mb-6">
              <div className="bg-red-500 p-4 border-3 border-black">
                <AlertTriangle className="w-8 h-8 text-white" />
              </div>
              <div>
                <h1 className="text-3xl font-black uppercase mb-2">Oops! Something Went Wrong</h1>
                <p className="text-lg font-bold text-gray-700">
                  We encountered an unexpected error
                </p>
              </div>
            </div>

            <div className="bg-red-100 border-3 border-red-500 p-4 mb-6">
              <p className="font-bold text-red-900 mb-2">Error Details:</p>
              <p className="text-sm font-mono text-red-800 break-all">
                {this.state.error?.message || 'Unknown error occurred'}
              </p>
            </div>

            <div className="flex gap-3">
              <button
                onClick={() => window.location.href = '/'}
                className="flex-1 px-6 py-3 bg-white text-gray-900 font-bold uppercase border-3 border-black shadow-brutal hover:shadow-brutal-lg hover:translate-x-[-2px] hover:translate-y-[-2px] transition-all"
              >
                Go Home
              </button>
              <button
                onClick={() => window.location.reload()}
                className="flex-1 px-6 py-3 bg-primary text-white font-bold uppercase border-3 border-black shadow-brutal hover:shadow-brutal-lg hover:translate-x-[-2px] hover:translate-y-[-2px] transition-all flex items-center justify-center gap-2"
              >
                <RefreshCw className="w-5 h-5" />
                Reload Page
              </button>
            </div>

            <div className="mt-6 bg-yellow-100 border-3 border-yellow-500 p-4">
              <p className="text-sm font-bold text-yellow-900">
                💡 <span className="font-black">Tip:</span> If this problem persists, try clearing your browser cache or contact support at hello@opportunitymap.rw
              </p>
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
