// Reusable error and empty state components
import { AlertCircle, SearchX, FileQuestion, Wifi, RefreshCw } from 'lucide-react';
import { Button } from './ui/button';

interface ErrorStateProps {
  title?: string;
  message?: string;
  icon?: React.ReactNode;
  action?: {
    label: string;
    onClick: () => void;
  };
}

export function ErrorState({ 
  title = 'Something went wrong',
  message = 'An unexpected error occurred. Please try again.',
  icon,
  action
}: ErrorStateProps) {
  return (
    <div className="flex flex-col items-center justify-center min-h-[400px] p-8 text-center">
      <div className="bg-red-100 p-6 border-4 border-black shadow-brutal mb-6">
        {icon || <AlertCircle className="w-16 h-16 text-red-600" />}
      </div>
      <h2 className="text-2xl font-black mb-2">{title}</h2>
      <p className="text-gray-600 mb-6 max-w-md">{message}</p>
      {action && (
        <Button 
          onClick={action.onClick}
          className="bg-yellow-400 hover:bg-yellow-500"
        >
          <RefreshCw className="w-4 h-4 mr-2" />
          {action.label}
        </Button>
      )}
    </div>
  );
}

export function EmptyState({ 
  title = 'No results found',
  message = 'Try adjusting your search or filters.',
  icon,
  action
}: ErrorStateProps) {
  return (
    <div className="flex flex-col items-center justify-center min-h-[400px] p-8 text-center">
      <div className="bg-gray-100 p-6 border-4 border-black shadow-brutal mb-6">
        {icon || <SearchX className="w-16 h-16 text-gray-400" />}
      </div>
      <h2 className="text-2xl font-black mb-2">{title}</h2>
      <p className="text-gray-600 mb-6 max-w-md">{message}</p>
      {action && (
        <Button onClick={action.onClick}>
          {action.label}
        </Button>
      )}
    </div>
  );
}

export function NetworkError({ onRetry }: { onRetry: () => void }) {
  return (
    <ErrorState
      title="Connection Error"
      message="Unable to connect to the server. Please check your internet connection and try again."
      icon={<Wifi className="w-16 h-16 text-red-600" />}
      action={{ label: 'Try Again', onClick: onRetry }}
    />
  );
}

export function NotFoundError({ 
  type = 'page',
  onGoBack 
}: { 
  type?: string;
  onGoBack?: () => void;
}) {
  return (
    <ErrorState
      title={`${type.charAt(0).toUpperCase() + type.slice(1)} Not Found`}
      message={`The ${type} you're looking for doesn't exist or has been removed.`}
      icon={<FileQuestion className="w-16 h-16 text-red-600" />}
      action={onGoBack ? { label: 'Go Back', onClick: onGoBack } : undefined}
    />
  );
}

// Inline error message (for form fields, etc.)
export function InlineError({ message }: { message: string }) {
  return (
    <div className="flex items-center gap-2 p-3 bg-red-100 border-2 border-red-600 text-red-700">
      <AlertCircle className="w-4 h-4 flex-shrink-0" />
      <p className="text-sm font-medium">{message}</p>
    </div>
  );
}

// Toast-style notification (for temporary messages)
export function ErrorToast({ 
  message, 
  onClose 
}: { 
  message: string; 
  onClose: () => void;
}) {
  return (
    <div className="fixed bottom-4 right-4 z-50 animate-in slide-in-from-bottom-5">
      <div className="bg-red-600 text-white p-4 border-3 border-black shadow-brutal max-w-md">
        <div className="flex items-start gap-3">
          <AlertCircle className="w-5 h-5 flex-shrink-0 mt-0.5" />
          <div className="flex-1">
            <p className="font-bold mb-1">Error</p>
            <p className="text-sm">{message}</p>
          </div>
          <button
            onClick={onClose}
            className="text-white hover:text-gray-200 transition-colors"
            aria-label="Close notification"
          >
            ×
          </button>
        </div>
      </div>
    </div>
  );
}

export function SuccessToast({ 
  message, 
  onClose 
}: { 
  message: string; 
  onClose: () => void;
}) {
  return (
    <div className="fixed bottom-4 right-4 z-50 animate-in slide-in-from-bottom-5">
      <div className="bg-green-600 text-white p-4 border-3 border-black shadow-brutal max-w-md">
        <div className="flex items-start gap-3">
          <div className="w-5 h-5 flex-shrink-0 mt-0.5">✓</div>
          <div className="flex-1">
            <p className="font-bold mb-1">Success</p>
            <p className="text-sm">{message}</p>
          </div>
          <button
            onClick={onClose}
            className="text-white hover:text-gray-200 transition-colors"
            aria-label="Close notification"
          >
            ×
          </button>
        </div>
      </div>
    </div>
  );
}
