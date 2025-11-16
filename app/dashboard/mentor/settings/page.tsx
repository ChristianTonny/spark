'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { ArrowLeft, Bell, Mail, Shield, Eye, EyeOff, RotateCcw } from 'lucide-react';
import { useQuery, useMutation } from 'convex/react';
import { api } from '@/convex/_generated/api';
import { useConvexAuth } from '@/lib/hooks/useConvexAuth';
import { useRoleGuard } from '@/lib/hooks/useRoleGuard';
import { Button } from '@/components/ui/button';
import { useToast } from '@/lib/use-toast';
import { ToastContainer } from '@/components/toast-container';

export default function MentorSettingsPage() {
  const router = useRouter();
  const toast = useToast();
  const { user, isLoading: authLoading } = useConvexAuth();
  const professional = useQuery(api.professionals.getCurrentProfessional);

  useRoleGuard(['mentor']);

  // Get user settings from database
  const userSettings = useQuery(api.userSettings.getUserSettings);

  // Mutations
  const updateSettings = useMutation(api.userSettings.updateSettings);
  const resetToDefaults = useMutation(api.userSettings.resetToDefaults);

  const [settings, setSettings] = useState({
    emailNotifications: true,
    pushNotifications: true,
    bookingReminders: true,
    messageNotifications: true,
    marketingEmails: false,
    profileVisibility: 'public' as 'public' | 'private',
    showOnlineStatus: true,
  });

  // Sync local state with database settings when they load
  useEffect(() => {
    if (userSettings) {
      setSettings({
        emailNotifications: userSettings.emailNotifications,
        pushNotifications: userSettings.pushNotifications,
        bookingReminders: userSettings.bookingReminders,
        messageNotifications: userSettings.messageNotifications,
        marketingEmails: userSettings.marketingEmails,
        profileVisibility: userSettings.profileVisibility,
        showOnlineStatus: userSettings.showOnlineStatus,
      });
    }
  }, [userSettings]);

  const handleSaveSettings = async () => {
    try {
      await updateSettings({
        emailNotifications: settings.emailNotifications,
        pushNotifications: settings.pushNotifications,
        bookingReminders: settings.bookingReminders,
        messageNotifications: settings.messageNotifications,
        marketingEmails: settings.marketingEmails,
        profileVisibility: settings.profileVisibility,
        showOnlineStatus: settings.showOnlineStatus,
      });
      toast.success('Settings saved successfully!');
    } catch (error) {
      toast.error('Failed to save settings');
      console.error('Settings save error:', error);
    }
  };

  const handleResetToDefaults = async () => {
    if (confirm('Are you sure you want to reset all settings to their defaults?')) {
      try {
        await resetToDefaults({});
        toast.success('Settings reset to defaults!');
      } catch (error) {
        toast.error('Failed to reset settings');
        console.error('Settings reset error:', error);
      }
    }
  };

  if (authLoading || professional === undefined) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="animate-pulse">
            <h1 className="text-4xl font-black mb-4">Loading settings...</h1>
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
          <h1 className="text-4xl md:text-5xl font-black mb-2 uppercase">Settings</h1>
          <p className="text-lg font-bold text-gray-700">
            Manage your account preferences
          </p>
        </div>

        <div className="space-y-6">
          {/* Notification Settings */}
          <div className="bg-white border-3 border-black shadow-brutal-lg p-6">
            <h2 className="text-2xl font-black mb-4 uppercase flex items-center gap-2">
              <Bell className="w-6 h-6" />
              Notifications
            </h2>
            <div className="space-y-4">
              <div className="flex items-center justify-between py-3 border-b-2 border-gray-200">
                <div>
                  <h3 className="font-black">Email Notifications</h3>
                  <p className="text-sm text-gray-600 font-bold">Receive email updates about your account</p>
                </div>
                <button
                  onClick={() => setSettings({ ...settings, emailNotifications: !settings.emailNotifications })}
                  className={`relative w-14 h-8 border-3 border-black transition-colors ${
                    settings.emailNotifications ? 'bg-brutal-green' : 'bg-gray-300'
                  }`}
                >
                  <div
                    className={`absolute top-0.5 w-6 h-6 bg-white border-2 border-black transition-transform ${
                      settings.emailNotifications ? 'translate-x-6' : 'translate-x-0.5'
                    }`}
                  />
                </button>
              </div>

              <div className="flex items-center justify-between py-3 border-b-2 border-gray-200">
                <div>
                  <h3 className="font-black">Push Notifications</h3>
                  <p className="text-sm text-gray-600 font-bold">Receive in-app notifications</p>
                </div>
                <button
                  onClick={() => setSettings({ ...settings, pushNotifications: !settings.pushNotifications })}
                  className={`relative w-14 h-8 border-3 border-black transition-colors ${
                    settings.pushNotifications ? 'bg-brutal-green' : 'bg-gray-300'
                  }`}
                >
                  <div
                    className={`absolute top-0.5 w-6 h-6 bg-white border-2 border-black transition-transform ${
                      settings.pushNotifications ? 'translate-x-6' : 'translate-x-0.5'
                    }`}
                  />
                </button>
              </div>

              <div className="flex items-center justify-between py-3 border-b-2 border-gray-200">
                <div>
                  <h3 className="font-black">Booking Reminders</h3>
                  <p className="text-sm text-gray-600 font-bold">Get notified when students book sessions</p>
                </div>
                <button
                  onClick={() => setSettings({ ...settings, bookingReminders: !settings.bookingReminders })}
                  className={`relative w-14 h-8 border-3 border-black transition-colors ${
                    settings.bookingReminders ? 'bg-brutal-green' : 'bg-gray-300'
                  }`}
                >
                  <div
                    className={`absolute top-0.5 w-6 h-6 bg-white border-2 border-black transition-transform ${
                      settings.bookingReminders ? 'translate-x-6' : 'translate-x-0.5'
                    }`}
                  />
                </button>
              </div>

              <div className="flex items-center justify-between py-3 border-b-2 border-gray-200">
                <div>
                  <h3 className="font-black">Message Notifications</h3>
                  <p className="text-sm text-gray-600 font-bold">Get notified about new messages</p>
                </div>
                <button
                  onClick={() => setSettings({ ...settings, messageNotifications: !settings.messageNotifications })}
                  className={`relative w-14 h-8 border-3 border-black transition-colors ${
                    settings.messageNotifications ? 'bg-brutal-green' : 'bg-gray-300'
                  }`}
                >
                  <div
                    className={`absolute top-0.5 w-6 h-6 bg-white border-2 border-black transition-transform ${
                      settings.messageNotifications ? 'translate-x-6' : 'translate-x-0.5'
                    }`}
                  />
                </button>
              </div>

              <div className="flex items-center justify-between py-3">
                <div>
                  <h3 className="font-black">Marketing Emails</h3>
                  <p className="text-sm text-gray-600 font-bold">Receive tips and platform updates</p>
                </div>
                <button
                  onClick={() => setSettings({ ...settings, marketingEmails: !settings.marketingEmails })}
                  className={`relative w-14 h-8 border-3 border-black transition-colors ${
                    settings.marketingEmails ? 'bg-brutal-green' : 'bg-gray-300'
                  }`}
                >
                  <div
                    className={`absolute top-0.5 w-6 h-6 bg-white border-2 border-black transition-transform ${
                      settings.marketingEmails ? 'translate-x-6' : 'translate-x-0.5'
                    }`}
                  />
                </button>
              </div>
            </div>
          </div>

          {/* Privacy Settings */}
          <div className="bg-white border-3 border-black shadow-brutal-lg p-6">
            <h2 className="text-2xl font-black mb-4 uppercase flex items-center gap-2">
              <Shield className="w-6 h-6" />
              Privacy
            </h2>
            <div className="space-y-4">
              <div className="py-3 border-b-2 border-gray-200">
                <h3 className="font-black mb-2">Profile Visibility</h3>
                <p className="text-sm text-gray-600 font-bold mb-3">
                  Control who can see your mentor profile
                </p>
                <div className="flex gap-3">
                  <button
                    onClick={() => setSettings({ ...settings, profileVisibility: 'public' })}
                    className={`flex-1 px-4 py-3 border-3 border-black font-bold uppercase text-sm transition-all ${
                      settings.profileVisibility === 'public'
                        ? 'bg-brutal-blue text-white shadow-brutal'
                        : 'bg-white hover:shadow-brutal'
                    }`}
                  >
                    <Eye className="w-4 h-4 mx-auto mb-1" />
                    Public
                  </button>
                  <button
                    onClick={() => setSettings({ ...settings, profileVisibility: 'private' })}
                    className={`flex-1 px-4 py-3 border-3 border-black font-bold uppercase text-sm transition-all ${
                      settings.profileVisibility === 'private'
                        ? 'bg-brutal-blue text-white shadow-brutal'
                        : 'bg-white hover:shadow-brutal'
                    }`}
                  >
                    <EyeOff className="w-4 h-4 mx-auto mb-1" />
                    Private
                  </button>
                </div>
              </div>

              <div className="py-3">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-black">Show Online Status</h3>
                    <p className="text-sm text-gray-600 font-bold">
                      Let students see when you're online
                    </p>
                  </div>
                  <button
                    onClick={() => setSettings({ ...settings, showOnlineStatus: !settings.showOnlineStatus })}
                    className={`relative w-14 h-8 border-3 border-black transition-colors ${
                      settings.showOnlineStatus ? 'bg-brutal-green' : 'bg-gray-300'
                    }`}
                  >
                    <div
                      className={`absolute top-0.5 w-6 h-6 bg-white border-2 border-black transition-transform ${
                        settings.showOnlineStatus ? 'translate-x-6' : 'translate-x-0.5'
                      }`}
                    />
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Account Information */}
          <div className="bg-white border-3 border-black shadow-brutal-lg p-6">
            <h2 className="text-2xl font-black mb-4 uppercase flex items-center gap-2">
              <Mail className="w-6 h-6" />
              Account
            </h2>
            <div className="space-y-4">
              <div className="py-3 border-b-2 border-gray-200">
                <h3 className="font-black mb-1">Email Address</h3>
                <p className="text-sm text-gray-600 font-bold">{professional.email}</p>
              </div>
              <div className="py-3 border-b-2 border-gray-200">
                <h3 className="font-black mb-1">Account Type</h3>
                <p className="text-sm text-gray-600 font-bold">Mentor</p>
              </div>
              <div className="py-3">
                <h3 className="font-black mb-1">Member Since</h3>
                <p className="text-sm text-gray-600 font-bold">
                  {new Date(professional.createdAt).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                  })}
                </p>
              </div>
            </div>
          </div>

          {/* Danger Zone */}
          <div className="bg-red-50 border-3 border-red-500 shadow-brutal-lg p-6">
            <h2 className="text-2xl font-black mb-4 uppercase text-red-600">Danger Zone</h2>
            <div className="space-y-4">
              <div>
                <h3 className="font-black mb-2">Reset All Settings</h3>
                <p className="text-sm text-gray-600 font-bold mb-3">
                  Reset all preferences to their default values.
                </p>
                <Button
                  variant="destructive"
                  size="sm"
                  onClick={handleResetToDefaults}
                  className="flex items-center gap-2"
                >
                  <RotateCcw className="w-4 h-4" />
                  Reset to Defaults
                </Button>
              </div>
              <div>
                <h3 className="font-black mb-2">Deactivate Account</h3>
                <p className="text-sm text-gray-600 font-bold mb-3">
                  Temporarily hide your profile from students. You can reactivate anytime.
                </p>
                <Button variant="destructive" size="sm" disabled>
                  Deactivate Account (Coming Soon)
                </Button>
              </div>
            </div>
          </div>

          {/* Save Button */}
          <div className="flex gap-4">
            <Button
              onClick={handleSaveSettings}
              size="lg"
              className="flex-1"
            >
              Save Settings
            </Button>
            <Button
              variant="outline"
              size="lg"
              onClick={() => router.push('/dashboard/mentor')}
            >
              Cancel
            </Button>
          </div>
        </div>
      </div>

      {/* Toast Notifications */}
      <ToastContainer toasts={toast.toasts} onClose={toast.removeToast} />
    </div>
  );
}
