"use client";

import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Settings as SettingsIcon, ArrowLeft, Bell, Globe, Save, Wifi } from "lucide-react";
import Link from "next/link";

export default function StudentSettingsPage() {
  const [notifications, setNotifications] = useState(true);
  const [emailAlerts, setEmailAlerts] = useState(true);
  const [dataSaver, setDataSaver] = useState(false);
  const [offlineMode, setOfflineMode] = useState(true);
  const [language, setLanguage] = useState("english");

  const handleSave = () => {
    console.log("Settings saved:", {
      notifications,
      emailAlerts,
      dataSaver,
      offlineMode,
      language,
    });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white border-b border-gray-200 sticky top-10 z-40">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Link href="/dashboard/student">
                <div className="w-10 h-10 bg-spark-blue rounded-lg flex items-center justify-center">
                  <SettingsIcon className="w-6 h-6 text-white" />
                </div>
              </Link>
              <h1 className="text-xl font-bold text-gray-900">Settings</h1>
            </div>
            <Link href="/dashboard/student">
              <Button variant="outline">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back
              </Button>
            </Link>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8 max-w-3xl space-y-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Bell className="h-5 w-5" />
              Notifications
            </CardTitle>
            <CardDescription>Manage how you receive updates</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <Label>Push Notifications</Label>
                <p className="text-sm text-gray-600">Receive alerts about answers, new content, etc.</p>
              </div>
              <button
                onClick={() => setNotifications(!notifications)}
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                  notifications ? "bg-spark-blue" : "bg-gray-300"
                }`}
              >
                <span
                  className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                    notifications ? "translate-x-6" : "translate-x-1"
                  }`}
                />
              </button>
            </div>

            <div className="flex items-center justify-between">
              <div>
                <Label>Email Alerts</Label>
                <p className="text-sm text-gray-600">Get email updates for important events</p>
              </div>
              <button
                onClick={() => setEmailAlerts(!emailAlerts)}
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                  emailAlerts ? "bg-spark-blue" : "bg-gray-300"
                }`}
              >
                <span
                  className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                    emailAlerts ? "translate-x-6" : "translate-x-1"
                  }`}
                />
              </button>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Wifi className="h-5 w-5" />
              Data & Offline
            </CardTitle>
            <CardDescription>Manage data usage and offline features</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <Label>Data Saver Mode</Label>
                <p className="text-sm text-gray-600">Reduce data usage by loading lower quality images</p>
              </div>
              <button
                onClick={() => setDataSaver(!dataSaver)}
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                  dataSaver ? "bg-spark-blue" : "bg-gray-300"
                }`}
              >
                <span
                  className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                    dataSaver ? "translate-x-6" : "translate-x-1"
                  }`}
                />
              </button>
            </div>

            <div className="flex items-center justify-between">
              <div>
                <Label>Offline Mode</Label>
                <p className="text-sm text-gray-600">Enable offline content access</p>
              </div>
              <button
                onClick={() => setOfflineMode(!offlineMode)}
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                  offlineMode ? "bg-spark-green" : "bg-gray-300"
                }`}
              >
                <span
                  className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                    offlineMode ? "translate-x-6" : "translate-x-1"
                  }`}
                />
              </button>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Globe className="h-5 w-5" />
              Language & Region
            </CardTitle>
            <CardDescription>Choose your preferred language</CardDescription>
          </CardHeader>
          <CardContent>
            <div>
              <Label htmlFor="language">Display Language</Label>
              <select
                id="language"
                value={language}
                onChange={(e) => setLanguage(e.target.value)}
                className="flex h-12 w-full rounded-lg border border-gray-300 bg-white px-4 py-3 text-base focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-spark-blue mt-2"
              >
                <option value="english">English</option>
                <option value="kinyarwanda">Kinyarwanda</option>
                <option value="french">French</option>
              </select>
            </div>
          </CardContent>
        </Card>

        <div className="flex gap-3">
          <Link href="/dashboard/student" className="flex-1">
            <Button variant="outline" className="w-full">
              Cancel
            </Button>
          </Link>
          <Button onClick={handleSave} className="flex-1">
            <Save className="h-4 w-4 mr-2" />
            Save Settings
          </Button>
        </div>
      </div>
    </div>
  );
}
