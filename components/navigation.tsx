'use client';

import Link from 'next/link';
import { Menu, X, Compass, BookOpen, Users, LayoutDashboard, Calendar, Clock, DollarSign, Bell, Newspaper } from 'lucide-react';
import { useState } from 'react';
import { SignedIn, SignedOut, UserButton, useUser } from '@clerk/nextjs';
import { useQuery } from 'convex/react';
import { api } from '../convex/_generated/api';
import { getDashboardPath } from '@/lib/hooks/useRoleGuard';

export default function Navigation() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { user: clerkUser } = useUser();
  const convexUser = useQuery(api.users.current);
  const unreadCount = useQuery(api.notifications.getUnreadCount);

  // Get user's role from Convex (source of truth)
  const userRole = convexUser?.role || (clerkUser?.publicMetadata?.role as string) || 'student';

  // Define navigation links based on role
  const getNavLinks = () => {
    const commonLinks = [];

    // Admins see admin dashboard
    if (userRole === 'admin') {
      commonLinks.push(
        { href: '/admin', label: 'Admin Dashboard', icon: LayoutDashboard }
      );
      return commonLinks;
    }

    // Students see career exploration pages + dashboard + bookings
    if (userRole === 'student') {
      commonLinks.push(
        { href: '/careers', label: 'Careers', icon: Compass },
        { href: '/blog', label: 'Resources', icon: Newspaper },
        { href: '/assessments', label: 'Assessments', icon: BookOpen },
        { href: '/mentors', label: 'Mentors', icon: Users },
        { href: '/dashboard/student/bookings', label: 'My Bookings', icon: Calendar },
        { href: '/dashboard/student', label: 'Dashboard', icon: LayoutDashboard }
      );
    }

    // Mentors see mentor-specific navigation
    if (userRole === 'mentor') {
      commonLinks.push(
        { href: '/dashboard/mentor', label: 'Dashboard', icon: LayoutDashboard },
        { href: '/dashboard/mentor/bookings', label: 'Bookings', icon: Calendar },
        { href: '/dashboard/mentor/articles', label: 'My Articles', icon: Newspaper },
        { href: '/dashboard/mentor/availability', label: 'Availability', icon: Clock },
        { href: '/dashboard/mentor/earnings', label: 'Earnings', icon: DollarSign }
      );
    }

    // Educators and other roles see Dashboard only
    if (userRole === 'educator' || (userRole !== 'student' && userRole !== 'mentor')) {
      const dashboardPath = getDashboardPath(userRole as any);
      commonLinks.push({ href: dashboardPath, label: 'Dashboard', icon: LayoutDashboard });
    }

    return commonLinks;
  };

  const navLinks = getNavLinks();

  return (
    <nav className="sticky top-0 z-50 bg-white border-b-4 border-brutal-border">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 group">
            <div className="w-10 h-10 bg-brutal-orange border-2 border-brutal-border shadow-brutal-sm group-hover:shadow-brutal transition-all flex items-center justify-center">
              <span className="text-white font-black text-xl">O</span>
            </div>
            <span className="text-lg sm:text-xl font-black text-brutal-text">OpportunityMap</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden xl:flex items-center gap-2">
            {/* Public links - always visible */}
            <SignedOut>
              <Link
                href="/careers"
                className="flex items-center gap-2 px-3 py-2 font-bold uppercase text-xs border-2 border-transparent hover:border-brutal-border hover:shadow-brutal-sm transition-all"
              >
                <Compass className="w-4 h-4" />
                Careers
              </Link>
              <Link
                href="/blog"
                className="flex items-center gap-2 px-3 py-2 font-bold uppercase text-xs border-2 border-transparent hover:border-brutal-border hover:shadow-brutal-sm transition-all"
              >
                <Newspaper className="w-4 h-4" />
                Resources
              </Link>
              <Link
                href="/mentors"
                className="flex items-center gap-2 px-3 py-2 font-bold uppercase text-xs border-2 border-transparent hover:border-brutal-border hover:shadow-brutal-sm transition-all"
              >
                <Users className="w-4 h-4" />
                Mentors
              </Link>
            </SignedOut>

            {/* Signed-in user links */}
            <SignedIn>
              {navLinks.map((link) => {
                const Icon = link.icon;
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    className="flex items-center gap-2 px-3 py-2 font-bold uppercase text-xs border-2 border-transparent hover:border-brutal-border hover:shadow-brutal-sm transition-all"
                  >
                    <Icon className="w-4 h-4" />
                    {link.label}
                  </Link>
                );
              })}
            </SignedIn>

            <div className="ml-4 flex items-center gap-2">
              {/* Signed In - Show Notification Bell and User Button */}
              <SignedIn>
                <Link
                  href={userRole === 'admin' ? '/admin/notifications' : `/dashboard/${userRole}/notifications`}
                  className="relative p-2 border-2 border-brutal-border hover:shadow-brutal-sm transition-all bg-white"
                  aria-label={`Notifications${unreadCount ? ` (${unreadCount} unread)` : ''}`}
                >
                  <Bell className="w-5 h-5" />
                  {unreadCount && unreadCount > 0 ? (
                    <span className="absolute -top-1 -right-1 bg-brutal-orange text-white text-xs font-black rounded-full w-5 h-5 flex items-center justify-center border-2 border-black">
                      {unreadCount > 9 ? '9+' : unreadCount}
                    </span>
                  ) : null}
                </Link>
                <UserButton
                  appearance={{
                    elements: {
                      avatarBox: "w-10 h-10 border-2 border-brutal-border",
                    }
                  }}
                  afterSignOutUrl="/"
                />
              </SignedIn>

              {/* Signed Out - Show Login/Signup Buttons */}
              <SignedOut>
                <Link
                  href="/sign-in"
                  className="px-3 py-2 font-bold uppercase text-xs border-2 border-brutal-border hover:shadow-brutal-sm transition-all"
                >
                  Login
                </Link>
                <Link
                  href="/sign-up"
                  className="px-3 py-2 bg-brutal-orange text-white font-bold uppercase text-xs border-2 border-brutal-border shadow-brutal hover:shadow-brutal-lg hover:translate-x-[-2px] hover:translate-y-[-2px] transition-all"
                >
                  Sign Up
                </Link>
              </SignedOut>
            </div>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="xl:hidden p-3 min-w-[44px] min-h-[44px] flex items-center justify-center border-3 border-brutal-border bg-white shadow-brutal-sm active:shadow-none transition-all"
            aria-label="Toggle menu"
            aria-expanded={mobileMenuOpen}
          >
            {mobileMenuOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <Menu className="w-6 h-6" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="xl:hidden border-t-3 border-brutal-border bg-white animate-in fade-in slide-in-from-top-5 duration-200">
          <div className="container mx-auto px-4 py-6 space-y-3">
            {/* Public links for signed-out users */}
            <SignedOut>
              <Link
                href="/careers"
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center gap-3 px-4 py-4 min-h-[52px] font-bold uppercase text-sm border-2 border-brutal-border shadow-brutal-sm active:shadow-none transition-all bg-white"
              >
                <Compass className="w-5 h-5 flex-shrink-0" />
                <span>Careers</span>
              </Link>
              <Link
                href="/blog"
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center gap-3 px-4 py-4 min-h-[52px] font-bold uppercase text-sm border-2 border-brutal-border shadow-brutal-sm active:shadow-none transition-all bg-white"
              >
                <Newspaper className="w-5 h-5 flex-shrink-0" />
                <span>Resources</span>
              </Link>
              <Link
                href="/mentors"
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center gap-3 px-4 py-4 min-h-[52px] font-bold uppercase text-sm border-2 border-brutal-border shadow-brutal-sm active:shadow-none transition-all bg-white"
              >
                <Users className="w-5 h-5 flex-shrink-0" />
                <span>Mentors</span>
              </Link>
            </SignedOut>

            {/* Signed-in user links */}
            <SignedIn>
              {navLinks.map((link) => {
                const Icon = link.icon;
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className="flex items-center gap-3 px-4 py-4 min-h-[52px] font-bold uppercase text-sm border-2 border-brutal-border shadow-brutal-sm active:shadow-none transition-all bg-white"
                  >
                    <Icon className="w-5 h-5 flex-shrink-0" />
                    <span>{link.label}</span>
                  </Link>
                );
              })}
            </SignedIn>

            <div className="pt-4 space-y-3 border-t-3 border-brutal-border mt-4">
              {/* Signed In - Show Notification Link and User Button */}
              <SignedIn>
                <Link
                  href={userRole === 'admin' ? '/admin/notifications' : `/dashboard/${userRole}/notifications`}
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center justify-between px-4 py-4 min-h-[52px] font-bold uppercase text-sm border-2 border-brutal-border shadow-brutal-sm active:shadow-none transition-all bg-white"
                >
                  <div className="flex items-center gap-3">
                    <Bell className="w-5 h-5 flex-shrink-0" />
                    <span>Notifications</span>
                  </div>
                  {unreadCount && unreadCount > 0 ? (
                    <span className="bg-brutal-orange text-white text-xs font-black rounded-full w-6 h-6 flex items-center justify-center border-2 border-black">
                      {unreadCount > 9 ? '9+' : unreadCount}
                    </span>
                  ) : null}
                </Link>
                <div className="flex items-center justify-center py-4">
                  <UserButton
                    appearance={{
                      elements: {
                        avatarBox: "w-12 h-12 border-2 border-brutal-border",
                      }
                    }}
                    afterSignOutUrl="/"
                  />
                </div>
              </SignedIn>

              {/* Signed Out - Show Login/Signup Buttons */}
              <SignedOut>
                <Link
                  href="/sign-in"
                  onClick={() => setMobileMenuOpen(false)}
                  className="block text-center px-4 py-4 min-h-[52px] font-bold uppercase text-sm border-2 border-brutal-border shadow-brutal-sm active:shadow-none transition-all bg-white"
                >
                  Login
                </Link>
                <Link
                  href="/sign-up"
                  onClick={() => setMobileMenuOpen(false)}
                  className="block text-center px-4 py-4 min-h-[52px] bg-brutal-orange text-white font-bold uppercase text-sm border-2 border-brutal-border shadow-brutal active:shadow-none transition-all"
                >
                  Sign Up
                </Link>
              </SignedOut>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
