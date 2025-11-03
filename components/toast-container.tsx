// Toast container for displaying notifications
'use client';

import { AlertCircle, CheckCircle, Info, X } from 'lucide-react';
import type { Toast } from '@/lib/use-toast';

interface ToastContainerProps {
  toasts: Toast[];
  onClose: (id: string) => void;
}

export function ToastContainer({ toasts, onClose }: ToastContainerProps) {
  if (toasts.length === 0) return null;

  return (
    <div className="fixed bottom-4 right-4 z-50 flex flex-col gap-2 max-w-md">
      {toasts.map((toast) => (
        <ToastItem key={toast.id} toast={toast} onClose={onClose} />
      ))}
    </div>
  );
}

function ToastItem({ toast, onClose }: { toast: Toast; onClose: (id: string) => void }) {
  const config = {
    success: {
      bg: 'bg-green-600',
      icon: <CheckCircle className="w-5 h-5 flex-shrink-0" />,
      title: 'Success',
    },
    error: {
      bg: 'bg-red-600',
      icon: <AlertCircle className="w-5 h-5 flex-shrink-0" />,
      title: 'Error',
    },
    info: {
      bg: 'bg-blue-600',
      icon: <Info className="w-5 h-5 flex-shrink-0" />,
      title: 'Info',
    },
  };

  const { bg, icon, title } = config[toast.type];

  return (
    <div
      className={`${bg} text-white p-4 border-3 border-black shadow-brutal animate-in slide-in-from-bottom-5 duration-300`}
      role="alert"
    >
      <div className="flex items-start gap-3">
        {icon}
        <div className="flex-1 min-w-0">
          <p className="font-bold mb-1">{title}</p>
          <p className="text-sm break-words">{toast.message}</p>
        </div>
        <button
          onClick={() => onClose(toast.id)}
          className="text-white hover:text-gray-200 transition-colors flex-shrink-0"
          aria-label="Close notification"
        >
          <X className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
}
