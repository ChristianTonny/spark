"use client";

import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Users,
  FileText,
  Calendar,
  Newspaper,
  BarChart3,
  LogOut,
} from "lucide-react";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const pathname = usePathname();
  const isAdmin = useQuery(api.admin.isAdmin);

  // Redirect if not admin
  useEffect(() => {
    if (isAdmin === false) {
      router.push("/");
    }
  }, [isAdmin, router]);

  // Show loading state while checking
  if (isAdmin === undefined) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="animate-pulse text-center">
          <div className="h-12 w-12 bg-gray-300 rounded-full mx-auto mb-4"></div>
          <div className="h-4 w-32 bg-gray-300 rounded mx-auto"></div>
        </div>
      </div>
    );
  }

  // Don't render if not admin (will redirect)
  if (!isAdmin) {
    return null;
  }

  const navigation = [
    {
      name: "Dashboard",
      href: "/admin",
      icon: LayoutDashboard,
    },
    {
      name: "Mentor Applications",
      href: "/admin/mentor-applications",
      icon: FileText,
    },
    {
      name: "User Management",
      href: "/admin/users",
      icon: Users,
    },
    {
      name: "Bookings",
      href: "/admin/bookings",
      icon: Calendar,
    },
    {
      name: "Articles",
      href: "/admin/articles",
      icon: Newspaper,
    },
    {
      name: "Analytics",
      href: "/admin/analytics",
      icon: BarChart3,
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Sidebar */}
      <aside className="w-64 bg-black text-white border-r-4 border-black flex flex-col">
        {/* Logo/Header */}
        <div className="p-6 border-b-2 border-gray-800">
          <Link href="/admin" className="block">
            <h1 className="text-2xl font-black uppercase">
              SPARK
              <span className="block text-sm text-brutal-yellow">Admin Panel</span>
            </h1>
          </Link>
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-4">
          <ul className="space-y-2">
            {navigation.map((item) => {
              const Icon = item.icon;
              const isActive = pathname === item.href;

              return (
                <li key={item.name}>
                  <Link
                    href={item.href}
                    className={`
                      flex items-center gap-3 px-4 py-3 rounded-none border-2 transition-all
                      ${
                        isActive
                          ? "bg-brutal-yellow text-black border-brutal-yellow font-black"
                          : "bg-transparent text-white border-gray-700 hover:bg-gray-900 hover:border-white font-bold"
                      }
                    `}
                  >
                    <Icon className="w-5 h-5" />
                    {item.name}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        {/* Footer */}
        <div className="p-4 border-t-2 border-gray-800">
          <Link
            href="/"
            className="flex items-center gap-3 px-4 py-3 text-gray-400 hover:text-white hover:bg-gray-900 border-2 border-gray-700 transition-all"
          >
            <LogOut className="w-5 h-5" />
            Exit Admin
          </Link>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto">
        {children}
      </main>
    </div>
  );
}
