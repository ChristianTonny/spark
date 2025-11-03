"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowLeft, Save, Bell, Lock, Globe, User } from "lucide-react";

export default function StudentSettingsPage() {
  const [notifications, setNotifications] = useState({
    email: true,
    push: false,
    assessments: true,
    mentors: true,
  });

  const [privacy, setPrivacy] = useState({
    profileVisible: true,
    shareProgress: false,
  });

  const handleSave = () => {
    alert("Settings saved successfully!");
  };

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
                  checked={notifications.email}
                  onChange={(e) => setNotifications({...notifications, email: e.target.checked})}
                  className="w-6 h-6 border-2 border-black"
                />
              </div>
              <div className="flex items-center justify-between p-4 border-2 border-black">
                <div>
                  <h3 className="font-black">Assessment Reminders</h3>
                  <p className="text-sm font-bold text-gray-700">Get notified about new assessments</p>
                </div>
                <input
                  type="checkbox"
                  checked={notifications.assessments}
                  onChange={(e) => setNotifications({...notifications, assessments: e.target.checked})}
                  className="w-6 h-6 border-2 border-black"
                />
              </div>
              <div className="flex items-center justify-between p-4 border-2 border-black">
                <div>
                  <h3 className="font-black">Mentor Messages</h3>
                  <p className="text-sm font-bold text-gray-700">Notifications for mentor sessions</p>
                </div>
                <input
                  type="checkbox"
                  checked={notifications.mentors}
                  onChange={(e) => setNotifications({...notifications, mentors: e.target.checked})}
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
                  checked={privacy.profileVisible}
                  onChange={(e) => setPrivacy({...privacy, profileVisible: e.target.checked})}
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
                  checked={privacy.shareProgress}
                  onChange={(e) => setPrivacy({...privacy, shareProgress: e.target.checked})}
                  className="w-6 h-6 border-2 border-black"
                />
              </div>
            </div>
          </div>

          {/* Save Button */}
          <div className="flex justify-end">
            <button
              onClick={handleSave}
              className="px-8 py-4 bg-primary text-white font-bold uppercase border-3 border-black shadow-brutal hover:shadow-brutal-lg transition-all flex items-center gap-3"
            >
              <Save className="w-5 h-5" />
              Save Settings
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
