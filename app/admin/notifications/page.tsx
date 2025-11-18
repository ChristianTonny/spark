'use client';

import { useQuery, useMutation } from 'convex/react';
import { api } from '../../../convex/_generated/api';
import { Id } from '../../../convex/_generated/dataModel';
import { Bell, FileText, Users, CheckCircle, Trash2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const getNotificationStyle = (type: string) => {
  switch (type) {
    case 'mentor_application':
      return { icon: FileText, color: 'bg-brutal-orange' };
    case 'user_signup':
      return { icon: Users, color: 'bg-brutal-blue' };
    case 'booking':
      return { icon: CheckCircle, color: 'bg-brutal-green' };
    default:
      return { icon: Bell, color: 'bg-gray-500' };
  }
};

export default function AdminNotificationsPage() {
  const { toast } = useToast();
  const notifications = useQuery(api.notifications.getNotifications);
  const unreadCount = useQuery(api.notifications.getUnreadCount);

  const markAsRead = useMutation(api.notifications.markAsRead);
  const markAllAsRead = useMutation(api.notifications.markAllAsRead);
  const deleteNotification = useMutation(api.notifications.deleteNotification);

  const formatTimeAgo = (timestamp: number) => {
    const seconds = Math.floor((Date.now() - timestamp) / 1000);

    if (seconds < 60) return 'Just now';
    if (seconds < 3600) return `${Math.floor(seconds / 60)}m ago`;
    if (seconds < 86400) return `${Math.floor(seconds / 3600)}h ago`;
    if (seconds < 604800) return `${Math.floor(seconds / 86400)}d ago`;
    return new Date(timestamp).toLocaleDateString();
  };

  const handleMarkAllRead = async () => {
    try {
      await markAllAsRead({});
      toast({
        title: "Success",
        description: "All notifications marked as read.",
        variant: "default",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to mark all notifications as read.",
        variant: "destructive",
      });
    }
  };

  const handleMarkAsRead = async (notificationId: Id<"notifications">) => {
    try {
      await markAsRead({ notificationId });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to mark notification as read.",
        variant: "destructive",
      });
    }
  };

  const handleDelete = async (notificationId: Id<"notifications">) => {
    try {
      await deleteNotification({ notificationId });
      toast({
        title: "Success",
        description: "Notification deleted.",
        variant: "default",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to delete notification.",
        variant: "destructive",
      });
    }
  };

  if (notifications === undefined) {
    return (
      <div className="p-8">
        <div className="animate-pulse space-y-4">
          <div className="h-12 bg-gray-200 rounded w-1/3"></div>
          <div className="h-64 bg-gray-200 rounded"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="p-8">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-4xl font-black uppercase mb-2">Notifications</h1>
            <p className="text-gray-600">
              {unreadCount && unreadCount > 0
                ? `${unreadCount} unread notification${unreadCount !== 1 ? 's' : ''}`
                : 'All caught up!'}
            </p>
          </div>
          {unreadCount && unreadCount > 0 && (
            <button
              onClick={handleMarkAllRead}
              className="px-6 py-3 bg-brutal-blue text-white font-bold uppercase border-3 border-black shadow-brutal hover:shadow-brutal-lg transition-all"
            >
              Mark All as Read
            </button>
          )}
        </div>
      </div>

      {/* Notifications List */}
      <div className="space-y-4">
        {!notifications || notifications.length === 0 ? (
          <div className="border-3 border-black shadow-brutal p-12 text-center bg-white">
            <Bell className="w-16 h-16 mx-auto mb-4 text-gray-400" />
            <p className="text-gray-500 font-bold uppercase">No notifications yet</p>
          </div>
        ) : (
          notifications.map((notification) => {
            const { icon: Icon, color } = getNotificationStyle(notification.type);

            return (
              <div
                key={notification._id}
                className={`border-3 border-black shadow-brutal bg-white p-6 transition-all ${
                  !notification.read ? 'bg-brutal-yellow/10' : ''
                }`}
              >
                <div className="flex items-start gap-4">
                  <div className={`${color} p-3 border-2 border-black flex-shrink-0`}>
                    <Icon className="w-6 h-6 text-white" />
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-4 mb-2">
                      <h3 className="font-black text-lg">{notification.title}</h3>
                      {!notification.read && (
                        <span className="bg-brutal-orange text-white text-xs font-bold uppercase px-2 py-1 border-2 border-black flex-shrink-0">
                          New
                        </span>
                      )}
                    </div>
                    <p className="text-gray-700 mb-3">{notification.message}</p>
                    <div className="flex items-center gap-4 text-sm text-gray-600">
                      <span>{formatTimeAgo(notification.createdAt)}</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 flex-shrink-0">
                    {!notification.read && (
                      <button
                        onClick={() => handleMarkAsRead(notification._id)}
                        className="p-2 border-2 border-black hover:bg-gray-100 transition-all"
                        title="Mark as read"
                      >
                        <CheckCircle className="w-5 h-5" />
                      </button>
                    )}
                    <button
                      onClick={() => handleDelete(notification._id)}
                      className="p-2 border-2 border-black hover:bg-red-100 transition-all"
                      title="Delete"
                    >
                      <Trash2 className="w-5 h-5 text-red-600" />
                    </button>
                  </div>
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}

