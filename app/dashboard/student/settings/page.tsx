"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { ArrowLeft, Save, Bell, Lock } from "lucide-react";
import { useQuery, useMutation } from "convex/react";
import { api } from "../../../../convex/_generated/api";
import { useConvexAuth } from "@/lib/hooks/useConvexAuth";
import { Spinner } from "@/components/loading-skeleton";

export default function StudentSettingsPage() {
  const { user, isLoading: authLoading } = useConvexAuth();
  const [isSaving, setIsSaving] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Fetch current settings
  const currentSettings = useQuery(api.userSettings.getCurrent);
  const updateSettings = useMutation(api.userSettings.update);

  const [settings, setSettings] = useState({
    emailNotifications: true,
    weeklyDigest: true,
    careerRecommendations: true,
    profilePublic: false,
    showEmail: false,
    showProgress: true,
  });

  // Load settings from backend
  useEffect(() => {
    if (currentSettings) {
      setSettings({
        emailNotifications: currentSettings.emailNotifications,
        weeklyDigest: currentSettings.weeklyDigest,
        careerRecommendations: currentSettings.careerRecommendations,
        profilePublic: currentSettings.profilePublic,
        showEmail: currentSettings.showEmail,
        showProgress: currentSettings.showProgress,
      });
    }
  }, [currentSettings]);

  const handleSave = async () => {
    setIsSaving(true);
    setError(null);
    setSuccess(false);

    try {
      await updateSettings(settings);
      setSuccess(true);

      // Hide success message after 3 seconds
      setTimeout(() => {
        setSuccess(false);
      }, 3000);
    } catch (err) {
      console.error("Failed to save settings:", err);
      setError(err instanceof Error ? err.message : "Failed to save settings. Please try again.");
    } finally {
      setIsSaving(false);
    }
  };

  if (authLoading || !user || currentSettings === undefined) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <Spinner size="lg" />
          <p className="mt-4 text-xl font-bold">Loading settings...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background py-8 px-4">
      <div className="container mx-auto max-w-4xl">
        {/* Header */}
        <div className="mb-8">
          <Link href="/dashboard/student">
            <button className="px-4 py-2 bg-white border-3 border-black shadow-brutal hover:shadow-brutal-lg transition-all flex items-center gap-2 font-bold mb-4">
              <ArrowLeft className="w-4 h-4" />
              Back to Dashboard
            </button>
          </Link>
          <h1 className="text-4xl md:text-5xl font-black uppercase">Settings</h1>
          <p className="text-lg font-bold text-gray-700">Manage your account preferences</p>
        </div>

        {/* Success Message */}
        {success && (
          <div className="bg-green-100 border-3 border-green-500 p-4 mb-6">
            <p className="font-bold text-green-900">✓ Settings saved successfully!</p>
          </div>
        )}

        {/* Error Message */}
        {error && (
          <div className="bg-red-100 border-3 border-red-500 p-4 mb-6">
            <p className="font-bold text-red-900">✗ {error}</p>
          </div>
        )}

        <div className="space-y-6">
          {/* Notifications */}
          <div className="bg-white border-3 border-black shadow-brutal-lg">
            <div className="p-6 border-b-3 border-black">
              <div className="flex items-center gap-3">
                <Bell className="w-6 h-6" />
                <h2 className="text-2xl font-black uppercase">Notifications</h2>
              </div>
            </div>
            <div className="p-6 space-y-4">
              <div className="flex items-center justify-between p-4 border-2 border-black">
                <div>
                  <h3 className="font-black">Email Notifications</h3>
                  <p className="text-sm font-bold text-gray-700">Receive updates via email</p>
                </div>
                <input
                  type="checkbox"
                  checked={settings.emailNotifications}
                  onChange={(e) => setSettings({...settings, emailNotifications: e.target.checked})}
                  className="w-6 h-6 border-2 border-black"
                />
              </div>
              <div className="flex items-center justify-between p-4 border-2 border-black">
                <div>
                  <h3 className="font-black">Weekly Digest</h3>
                  <p className="text-sm font-bold text-gray-700">Get weekly summary of your progress</p>
                </div>
                <input
                  type="checkbox"
                  checked={settings.weeklyDigest}
                  onChange={(e) => setSettings({...settings, weeklyDigest: e.target.checked})}
                  className="w-6 h-6 border-2 border-black"
                />
              </div>
              <div className="flex items-center justify-between p-4 border-2 border-black">
                <div>
                  <h3 className="font-black">Career Recommendations</h3>
                  <p className="text-sm font-bold text-gray-700">Notifications for new career suggestions</p>
                </div>
                <input
                  type="checkbox"
                  checked={settings.careerRecommendations}
                  onChange={(e) => setSettings({...settings, careerRecommendations: e.target.checked})}
                  className="w-6 h-6 border-2 border-black"
                />
              </div>
            </div>
          </div>

          {/* Privacy */}
          <div className="bg-white border-3 border-black shadow-brutal-lg">
            <div className="p-6 border-b-3 border-black">
              <div className="flex items-center gap-3">
                <Lock className="w-6 h-6" />
                <h2 className="text-2xl font-black uppercase">Privacy</h2>
              </div>
            </div>
            <div className="p-6 space-y-4">
              <div className="flex items-center justify-between p-4 border-2 border-black">
                <div>
                  <h3 className="font-black">Public Profile</h3>
                  <p className="text-sm font-bold text-gray-700">Make your profile visible to mentors</p>
                </div>
                <input
                  type="checkbox"
                  checked={settings.profilePublic}
                  onChange={(e) => setSettings({...settings, profilePublic: e.target.checked})}
                  className="w-6 h-6 border-2 border-black"
                />
              </div>
              <div className="flex items-center justify-between p-4 border-2 border-black">
                <div>
                  <h3 className="font-black">Show Email</h3>
                  <p className="text-sm font-bold text-gray-700">Display email on public profile</p>
                </div>
                <input
                  type="checkbox"
                  checked={settings.showEmail}
                  onChange={(e) => setSettings({...settings, showEmail: e.target.checked})}
                  className="w-6 h-6 border-2 border-black"
                />
              </div>
              <div className="flex items-center justify-between p-4 border-2 border-black">
                <div>
                  <h3 className="font-black">Share Progress</h3>
                  <p className="text-sm font-bold text-gray-700">Share your progress with educators</p>
                </div>
                <input
                  type="checkbox"
                  checked={settings.showProgress}
                  onChange={(e) => setSettings({...settings, showProgress: e.target.checked})}
                  className="w-6 h-6 border-2 border-black"
                />
              </div>
            </div>
          </div>

          {/* Save Button */}
          <div className="flex justify-end">
            <button
              onClick={handleSave}
              disabled={isSaving}
              className="px-8 py-4 bg-primary text-white font-bold uppercase border-3 border-black shadow-brutal hover:shadow-brutal-lg transition-all flex items-center gap-3 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Save className="w-5 h-5" />
              {isSaving ? "Saving..." : "Save Settings"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
