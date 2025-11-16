'use client';

import { useRouter } from 'next/navigation';
import { ArrowLeft, Bell, MessageCircle, Calendar, CheckCircle, Clock, Star, Trash2 } from 'lucide-react';
import { useQuery, useMutation } from 'convex/react';
import { api } from '@/convex/_generated/api';
import { useConvexAuth } from '@/lib/hooks/useConvexAuth';
import { useRoleGuard } from '@/lib/hooks/useRoleGuard';
import { Button } from '@/components/ui/button';
import { Id } from '@/convex/_generated/dataModel';

// Map notification type to icon and color
const getNotificationStyle = (type: string) => {
  switch (type) {
    case 'booking':
      return { icon: Calendar, color: 'bg-brutal-green' };
    case 'message':
      return { icon: MessageCircle, color: 'bg-brutal-blue' };
    case 'review':
      return { icon: Star, color: 'bg-brutal-yellow' };
    case 'system':
      return { icon: Bell, color: 'bg-brutal-orange' };
    default:
      return { icon: Bell, color: 'bg-gray-500' };
  }
};

export default function MentorNotificationsPage() {
  const router = useRouter();
  const { user, isLoading: authLoading } = useConvexAuth();
  const professional = useQuery(api.professionals.getCurrentProfessional);

  useRoleGuard(['mentor']);

  // Get real notifications from database
  const notifications = useQuery(api.notifications.getNotifications);
  const unreadCount = useQuery(api.notifications.getUnreadCount);

  // Mutations
  const markAsRead = useMutation(api.notifications.markAsRead);
  const markAllAsRead = useMutation(api.notifications.markAllAsRead);
  const deleteNotification = useMutation(api.notifications.deleteNotification);

  const formatTimeAgo = (date: Date) => {
    const seconds = Math.floor((Date.now() - date.getTime()) / 1000);

    if (seconds < 60) return 'Just now';
    if (seconds < 3600) return `${Math.floor(seconds / 60)}m ago`;
    if (seconds < 86400) return `${Math.floor(seconds / 3600)}h ago`;
    if (seconds < 604800) return `${Math.floor(seconds / 86400)}d ago`;
    return date.toLocaleDateString();
  };

  const handleMarkAllRead = async () => {
    try {
      await markAllAsRead({});
    } catch (error) {
      console.error('Failed to mark all as read:', error);
    }
  };

  const handleMarkAsRead = async (notificationId: Id<"notifications">) => {
    try {
      await markAsRead({ notificationId });
    } catch (error) {
      console.error('Failed to mark as read:', error);
    }
  };

  const handleDelete = async (notificationId: Id<"notifications">) => {
    try {
      await deleteNotification({ notificationId });
    } catch (error) {
      console.error('Failed to delete notification:', error);
    }
  };

  if (authLoading || professional === undefined || notifications === undefined) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="animate-pulse">
            <h1 className="text-4xl font-black mb-4">Loading notifications...</h1>
          </div>
        </div>
      </div>
    );
  }

  if (!professional) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <h1 className="text-4xl font-black mb-4">Profile not found</h1>
          <Button onClick={() => router.push('/dashboard/mentor')}>
            Return to Dashboard
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4 max-w-4xl">
        {/* Header */}
        <div className="mb-8">
          <button
            onClick={() => router.push('/dashboard/mentor')}
            className="flex items-center gap-2 text-lg font-bold text-gray-700 hover:text-black mb-4"
          >
            <ArrowLeft className="w-5 h-5" />
            Back to Dashboard
          </button>
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-4xl md:text-5xl font-black mb-2 uppercase">Notifications</h1>
              <p className="text-lg font-bold text-gray-700">
                {unreadCount !== undefined && unreadCount > 0
                  ? `${unreadCount} unread notification${unreadCount !== 1 ? 's' : ''}`
                  : 'All caught up!'}
              </p>
            </div>
            {unreadCount !== undefined && unreadCount > 0 && (
              <Button variant="outline" onClick={handleMarkAllRead}>
                Mark All Read
              </Button>
            )}
          </div>
        </div>

        {/* Notifications List */}
        <div className="space-y-4">
          {notifications && notifications.length === 0 ? (
            <div className="bg-white border-3 border-black shadow-brutal-lg p-12 text-center">
              <Bell className="w-16 h-16 mx-auto mb-4 text-gray-400" />
              <h2 className="text-2xl font-black mb-2">No Notifications</h2>
              <p className="text-gray-600 font-bold">
                You're all caught up! We'll notify you when something happens.
              </p>
            </div>
          ) : (
            notifications?.map((notification) => {
              const style = getNotificationStyle(notification.type);
              const Icon = style.icon;
              return (
                <div
                  key={notification._id}
                  className={`bg-white border-3 border-black shadow-brutal-lg p-4 sm:p-6 transition-all hover:shadow-brutal ${
                    !notification.read ? 'border-l-8 border-l-brutal-orange' : ''
                  }`}
                  onClick={() => !notification.read && handleMarkAsRead(notification._id)}
                  style={{ cursor: notification.read ? 'default' : 'pointer' }}
                >
                  <div className="flex gap-4">
                    <div className={`w-12 h-12 ${style.color} border-2 border-black flex items-center justify-center flex-shrink-0`}>
                      <Icon className="w-6 h-6" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-2 mb-1">
                        <h3 className="font-black text-lg">{notification.title}</h3>
                        <div className="flex items-center gap-2">
                          {!notification.read && (
                            <span className="w-2 h-2 bg-brutal-orange rounded-full flex-shrink-0 mt-2" />
                          )}
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              handleDelete(notification._id);
                            }}
                            className="text-gray-400 hover:text-red-600 transition-colors p-1"
                            title="Delete notification"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                      <p className="text-gray-700 font-bold mb-2">{notification.message}</p>
                      <div className="flex items-center gap-2 text-sm text-gray-500 font-bold">
                        <Clock className="w-4 h-4" />
                        <span>{formatTimeAgo(new Date(notification.createdAt))}</span>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })
          )}
        </div>

        {/* Info Card */}
        {notifications && notifications.length > 0 && (
          <div className="mt-8 bg-brutal-blue text-white border-3 border-black shadow-brutal-lg p-6">
            <h3 className="text-xl font-black mb-2 flex items-center gap-2">
              <Bell className="w-5 h-5" />
              Notification Settings
            </h3>
            <p className="font-bold mb-4">
              Manage how you receive notifications in your settings page.
            </p>
            <Button
              variant="outline"
              onClick={() => router.push('/dashboard/mentor/settings')}
              className="bg-white text-black hover:bg-gray-100"
            >
              Go to Settings
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
