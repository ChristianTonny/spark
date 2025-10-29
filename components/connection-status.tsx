"use client";

import { useEffect, useState } from "react";
import { Wifi, WifiOff, Loader2 } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

export function ConnectionStatus() {
  const [isOnline, setIsOnline] = useState(true);
  const [isSyncing, setIsSyncing] = useState(false);

  useEffect(() => {
    // Check initial online status
    setIsOnline(navigator.onLine);

    // Listen for online/offline events
    const handleOnline = () => {
      setIsOnline(true);
      setIsSyncing(true);
      // Simulate sync duration
      setTimeout(() => setIsSyncing(false), 2000);
    };

    const handleOffline = () => {
      setIsOnline(false);
      setIsSyncing(false);
    };

    window.addEventListener("online", handleOnline);
    window.addEventListener("offline", handleOffline);

    return () => {
      window.removeEventListener("online", handleOnline);
      window.removeEventListener("offline", handleOffline);
    };
  }, []);

  if (isSyncing) {
    return (
      <div className="fixed top-0 left-0 right-0 z-50 bg-blue-50 border-b border-blue-200 px-4 py-2">
        <div className="flex items-center justify-center gap-2 text-sm text-blue-800">
          <Loader2 className="h-4 w-4 animate-spin" />
          <span className="font-medium">Syncing data...</span>
        </div>
      </div>
    );
  }

  if (!isOnline) {
    return (
      <div className="fixed top-0 left-0 right-0 z-50 bg-offline-bg border-b border-yellow-300 px-4 py-2">
        <div className="flex items-center justify-center gap-2 text-sm text-offline-text">
          <WifiOff className="h-4 w-4 animate-pulse-slow" />
          <span className="font-medium">Offline Mode Active</span>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed top-0 left-0 right-0 z-50 bg-online-bg border-b border-green-300 px-4 py-2">
      <div className="flex items-center justify-center gap-2 text-sm text-online-text">
        <Wifi className="h-4 w-4" />
        <span className="font-medium">Connected</span>
      </div>
    </div>
  );
}
