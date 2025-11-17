'use client';

import { useState, useEffect } from 'react';
import { X, MessageCircle, Calendar, Bell, ArrowRight } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { Id } from '@/convex/_generated/dataModel';

interface NotificationToastProps {
  notification: {
    _id: Id<'notifications'>;
    type: string;
    title: string;
    message: string;
    read: boolean;
    userId: Id<'users'>;
    relatedChatId?: Id<'careerChats'>;
    relatedUserId?: Id<'users'>;
    metadata?: {
      mentorId?: Id<'professionals'>;
      studentId?: Id<'users'>;
      bookingId?: Id<'careerChats'>;
      messageId?: Id<'messages'>;
      senderName?: string;
      senderImage?: string;
      senderRole?: 'mentor' | 'student';
    };
    createdAt: string;
  };
  onClose: () => void;
  onMarkAsRead: (id: Id<'notifications'>) => void;
  userRole: 'student' | 'mentor';
}

export function NotificationToast({ notification, onClose, onMarkAsRead, userRole }: NotificationToastProps) {
  const router = useRouter();
  const [isExiting, setIsExiting] = useState(false);
  const [progress, setProgress] = useState(100);

  const handleClose = () => {
    setIsExiting(true);
    setTimeout(() => {
      onClose();
    }, 300);
  };

  // Auto-dismiss after 8 seconds
  useEffect(() => {
    const duration = 8000;
    const interval = 50;
    const decrement = (100 / duration) * interval;

    const timer = setInterval(() => {
      setProgress((prev) => {
        const newProgress = prev - decrement;
        if (newProgress <= 0) {
          handleClose();
          return 0;
        }
        return newProgress;
      });
    }, interval);

    return () => clearInterval(timer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleClick = () => {
    // Mark as read
    if (!notification.read) {
      onMarkAsRead(notification._id);
    }

    // Navigate based on notification type
    if (notification.type === 'message' && notification.relatedChatId) {
      // Navigate to bookings/dashboard with chat ID to auto-open
      if (userRole === 'student') {
        router.push(`/dashboard/student/bookings?openChat=${notification.relatedChatId}`);
      } else {
        // For mentors, just go to dashboard - they'll see it in recent bookings
        router.push(`/dashboard/mentor`);
      }
    } else if (notification.type === 'booking') {
      if (userRole === 'student') {
        router.push(`/dashboard/student/bookings`);
      } else {
        router.push(`/dashboard/mentor`);
      }
    } else {
      // Fallback to dashboard
      router.push(`/dashboard/${userRole}`);
    }

    handleClose();
  };

  const getIcon = () => {
    switch (notification.type) {
      case 'message':
        return <MessageCircle className="w-5 h-5 text-black" />;
      case 'booking':
        return <Calendar className="w-5 h-5 text-black" />;
      default:
        return <Bell className="w-5 h-5 text-black" />;
    }
  };

  const getBackgroundColor = () => {
    switch (notification.type) {
      case 'message':
        return 'bg-brutal-blue';
      case 'booking':
        return 'bg-brutal-green';
      default:
        return 'bg-brutal-yellow';
    }
  };

  const senderImage = notification.metadata?.senderImage || 
    `https://api.dicebear.com/7.x/initials/svg?seed=${notification.metadata?.senderName || 'User'}`;

  return (
    <div
      className={`fixed bottom-6 right-6 z-50 transition-all duration-300 ${
        isExiting ? 'translate-x-[120%] opacity-0' : 'translate-x-0 opacity-100'
      }`}
      style={{ animation: isExiting ? 'none' : 'slideInRight 0.3s ease-out' }}
    >
      <div
        className="bg-white border-3 border-black shadow-brutal-lg max-w-sm cursor-pointer hover:shadow-brutal transition-shadow"
        onClick={handleClick}
      >
        {/* Progress bar */}
        <div className="h-1 bg-gray-200 w-full">
          <div
            className={`h-full ${getBackgroundColor()} transition-all duration-50 ease-linear`}
            style={{ width: `${progress}%` }}
          />
        </div>

        <div className="p-4">
          <div className="flex items-start gap-3">
            {/* Profile Image */}
            <div className="relative flex-shrink-0">
              <div className="w-12 h-12 border-2 border-black overflow-hidden">
                <img
                  src={senderImage}
                  alt={notification.metadata?.senderName || 'User'}
                  className="w-full h-full object-cover"
                />
              </div>
              {/* Icon badge */}
              <div className={`absolute -bottom-1 -right-1 w-6 h-6 ${getBackgroundColor()} border-2 border-black flex items-center justify-center`}>
                {getIcon()}
              </div>
            </div>

            {/* Content */}
            <div className="flex-1 min-w-0">
              <div className="flex items-start justify-between gap-2 mb-1">
                <h4 className="font-black text-sm leading-tight">{notification.title}</h4>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleClose();
                  }}
                  className="text-gray-400 hover:text-gray-600 transition-colors flex-shrink-0"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
              <p className="text-xs font-bold text-gray-700 mb-2 line-clamp-2">
                {notification.message}
              </p>
              <div className="flex items-center gap-1 text-xs font-bold text-gray-500">
                <span>Click to view</span>
                <ArrowRight className="w-3 h-3" />
              </div>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes slideInRight {
          from {
            transform: translateX(120%);
            opacity: 0;
          }
          to {
            transform: translateX(0);
            opacity: 1;
          }
        }
      `}</style>
    </div>
  );
}

