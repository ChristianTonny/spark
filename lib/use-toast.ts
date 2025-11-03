// Toast notification hook
import { useState, useCallback, useEffect } from 'react';

export type Toast = {
  id: string;
  type: 'success' | 'error' | 'info';
  message: string;
};

export function useToast() {
  const [toasts, setToasts] = useState<Toast[]>([]);

  const addToast = useCallback((type: Toast['type'], message: string) => {
    const id = `toast-${Date.now()}-${Math.random()}`;
    const newToast: Toast = { id, type, message };
    
    setToasts((prev) => [...prev, newToast]);

    // Auto-remove after 5 seconds
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 5000);

    return id;
  }, []);

  const removeToast = useCallback((id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  const success = useCallback((message: string) => {
    return addToast('success', message);
  }, [addToast]);

  const error = useCallback((message: string) => {
    return addToast('error', message);
  }, [addToast]);

  const info = useCallback((message: string) => {
    return addToast('info', message);
  }, [addToast]);

  return {
    toasts,
    addToast,
    removeToast,
    success,
    error,
    info,
  };
}
