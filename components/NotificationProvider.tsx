'use client';

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { useQuery, useMutation } from 'convex/react';
import { api } from '@/convex/_generated/api';
import { useConvexAuth } from '@/lib/hooks/useConvexAuth';
import { NotificationToast } from './NotificationToast';
import { Id } from '@/convex/_generated/dataModel';

interface NotificationContextType {
  unreadCount: number | undefined;
  showToast: (notification: any) => void;
}

const NotificationContext = createContext<NotificationContextType | undefined>(undefined);

export function useNotifications() {
  const context = useContext(NotificationContext);
  if (!context) {
    throw new Error('useNotifications must be used within NotificationProvider');
  }
  return context;
}

interface NotificationProviderProps {
  children: ReactNode;
}

export function NotificationProvider({ children }: NotificationProviderProps) {
  const { user } = useConvexAuth();
  const [toasts, setToasts] = useState<any[]>([]);
  const [lastNotificationId, setLastNotificationId] = useState<Id<'notifications'> | null>(null);
  const [userRole, setUserRole] = useState<'student' | 'mentor'>('student');

  // Get notifications and unread count
  const notifications = useQuery(api.notifications.getNotifications, user ? {} : 'skip');
  const unreadCount = useQuery(api.notifications.getUnreadCount, user ? {} : 'skip');
  const currentUser = useQuery(api.users.current, user ? {} : 'skip');

  // Mutations
  const markAsRead = useMutation(api.notifications.markAsRead);

  // Determine user role
  useEffect(() => {
    if (currentUser?.role) {
      setUserRole(currentUser.role as 'student' | 'mentor');
    }
  }, [currentUser]);

  const showToast = (notification: any) => {
    // Don't show if already in toasts
    if (toasts.some(t => t._id === notification._id)) {
      return;
    }

    setToasts(prev => [...prev, notification]);
  };

  // Listen for new notifications
  useEffect(() => {
    if (!notifications || notifications.length === 0) {
      return;
    }

    // Get the latest notification
    const latestNotification = notifications[0];

    // If this is a new notification (not the first load and different from last seen)
    if (lastNotificationId && latestNotification._id !== lastNotificationId) {
      // Only show toast for unread notifications
      if (!latestNotification.read) {
        showToast(latestNotification);
      }
    }

    // Update last seen notification
    if (latestNotification._id !== lastNotificationId) {
      setLastNotificationId(latestNotification._id);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [notifications, lastNotificationId]);

  const handleCloseToast = (notificationId: Id<'notifications'>) => {
    setToasts(prev => prev.filter(t => t._id !== notificationId));
  };

  const handleMarkAsRead = async (notificationId: Id<'notifications'>) => {
    try {
      await markAsRead({ notificationId });
    } catch (error) {
      console.error('Failed to mark notification as read:', error);
    }
  };

  return (
    <NotificationContext.Provider value={{ unreadCount, showToast }}>
      {children}
      
      {/* Render toasts */}
      <div className="fixed bottom-6 right-6 z-50 space-y-3">
        {toasts.map((notification, index) => (
          <div
            key={notification._id}
            style={{
              transform: `translateY(-${index * 10}px)`,
              zIndex: 50 - index,
            }}
          >
            <NotificationToast
              notification={notification}
              onClose={() => handleCloseToast(notification._id)}
              onMarkAsRead={handleMarkAsRead}
              userRole={userRole}
            />
          </div>
        ))}
      </div>
    </NotificationContext.Provider>
  );
}

