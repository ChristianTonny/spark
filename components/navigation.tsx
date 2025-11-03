'use client';

import Link from 'next/link';
import { Menu, X, Compass, BookOpen, Users, LayoutDashboard, Settings, User } from 'lucide-react';
import { useState } from 'react';

export default function Navigation() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { href: '/careers', label: 'Careers', icon: Compass },
    { href: '/assessments', label: 'Assessments', icon: BookOpen },
    { href: '/mentors', label: 'Mentors', icon: Users },
    { href: '/dashboard/student', label: 'Dashboard', icon: LayoutDashboard },
  ];

  return (
    <nav className="sticky top-0 z-50 bg-white border-b-4 border-brutal-border">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 group">
            <div className="w-10 h-10 bg-brutal-orange border-3 border-brutal-border shadow-brutal-sm group-hover:shadow-brutal transition-all flex items-center justify-center">
              <span className="text-white font-black text-xl">O</span>
            </div>
            <span className="text-2xl font-black text-brutal-text">OpportunityMap</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-2">
            {navLinks.map((link) => {
              const Icon = link.icon;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className="flex items-center gap-2 px-4 py-2 font-bold uppercase text-sm border-2 border-transparent hover:border-brutal-border hover:shadow-brutal-sm transition-all"
                >
                  <Icon className="w-4 h-4" />
                  {link.label}
                </Link>
              );
            })}

            <div className="ml-4 flex items-center gap-2">
              {/* Profile & Settings Icons */}
              <Link
                href="/dashboard/student"
                className="p-2 border-2 border-brutal-border hover:shadow-brutal-sm transition-all"
                title="Dashboard"
              >
                <User className="w-5 h-5" />
              </Link>
              <Link
                href="/dashboard/student/settings"
                className="p-2 border-2 border-brutal-border hover:shadow-brutal-sm transition-all"
                title="Settings"
              >
                <Settings className="w-5 h-5" />
              </Link>
              
              <Link
                href="/login"
                className="px-4 py-2 font-bold uppercase text-sm border-2 border-brutal-border hover:shadow-brutal-sm transition-all"
              >
                Login
              </Link>
              <Link
                href="/signup"
                className="px-4 py-2 bg-brutal-orange text-white font-bold uppercase text-sm border-2 border-brutal-border shadow-brutal hover:shadow-brutal-lg hover:translate-x-[-2px] hover:translate-y-[-2px] transition-all"
              >
                Sign Up
              </Link>
            </div>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 border-3 border-brutal-border bg-white shadow-brutal-sm active:shadow-none"
            aria-label="Toggle menu"
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
        <div className="md:hidden border-t-3 border-brutal-border bg-white">
          <div className="container mx-auto px-4 py-4 space-y-2">
            {navLinks.map((link) => {
              const Icon = link.icon;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center gap-3 px-4 py-3 font-bold uppercase border-2 border-brutal-border shadow-brutal-sm hover:shadow-brutal transition-all"
                >
                  <Icon className="w-5 h-5" />
                  {link.label}
                </Link>
              );
            })}
            
            <div className="pt-4 space-y-2 border-t-3 border-brutal-border">
              <Link
                href="/login"
                onClick={() => setMobileMenuOpen(false)}
                className="block text-center px-4 py-3 font-bold uppercase border-2 border-brutal-border shadow-brutal-sm"
              >
                Login
              </Link>
              <Link
                href="/signup"
                onClick={() => setMobileMenuOpen(false)}
                className="block text-center px-4 py-3 bg-brutal-orange text-white font-bold uppercase border-2 border-brutal-border shadow-brutal"
              >
                Sign Up
              </Link>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
