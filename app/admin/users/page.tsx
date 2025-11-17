"use client";

import { useState } from "react";
import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import { Users, Search, Filter, Mail, Calendar, Shield } from "lucide-react";

type UserRole = "student" | "mentor" | "educator" | "company" | "partner" | "admin";

export default function UserManagementPage() {
  const [selectedRole, setSelectedRole] = useState<UserRole | "all">("all");
  const [searchQuery, setSearchQuery] = useState("");

  const allUsers = useQuery(api.admin.getAllUsers, {
    role: selectedRole === "all" ? undefined : selectedRole,
  });

  const filteredUsers = allUsers?.filter((user) => {
    if (!searchQuery) return true;
    const query = searchQuery.toLowerCase();
    return (
      user.firstName?.toLowerCase().includes(query) ||
      user.lastName?.toLowerCase().includes(query) ||
      user.email.toLowerCase().includes(query)
    );
  });

  if (allUsers === undefined) {
    return (
      <div className="p-8">
        <div className="animate-pulse space-y-4">
          <div className="h-12 bg-gray-200 rounded w-1/3"></div>
          <div className="h-64 bg-gray-200 rounded"></div>
        </div>
      </div>
    );
  }

  const roles: Array<{ key: UserRole | "all"; label: string }> = [
    { key: "all", label: "All Users" },
    { key: "student", label: "Students" },
    { key: "mentor", label: "Mentors" },
    { key: "educator", label: "Educators" },
    { key: "company", label: "Companies" },
    { key: "partner", label: "Partners" },
    { key: "admin", label: "Admins" },
  ];

  return (
    <div className="p-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-4xl font-black uppercase mb-2">User Management</h1>
        <p className="text-gray-600">
          Manage platform users and their roles
        </p>
      </div>

      {/* Filters */}
      <div className="mb-6 space-y-4">
        {/* Search */}
        <div className="relative">
          <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input
            type="text"
            placeholder="Search by name or email..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-12 pr-4 py-3 border-3 border-black font-medium focus:outline-none focus:shadow-brutal transition-all"
          />
        </div>

        {/* Role Filter */}
        <div className="flex items-center gap-2 flex-wrap">
          <Filter className="w-5 h-5 text-gray-600" />
          <span className="font-bold uppercase text-sm">Filter by role:</span>
          {roles.map((role) => (
            <button
              key={role.key}
              onClick={() => setSelectedRole(role.key)}
              className={`
                px-4 py-2 font-bold uppercase text-sm border-2 border-black transition-all
                ${
                  selectedRole === role.key
                    ? "bg-black text-white"
                    : "bg-white text-black hover:bg-gray-100"
                }
              `}
            >
              {role.label}
            </button>
          ))}
        </div>
      </div>

      {/* Stats */}
      <div className="mb-6 grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-brutal-blue border-3 border-black shadow-brutal p-4 text-white">
          <div className="text-2xl font-black">{allUsers.length}</div>
          <div className="text-sm font-bold uppercase">Total Users</div>
        </div>
        <div className="bg-brutal-green border-3 border-black shadow-brutal p-4 text-white">
          <div className="text-2xl font-black">
            {allUsers.filter((u) => u.role === "student").length}
          </div>
          <div className="text-sm font-bold uppercase">Students</div>
        </div>
        <div className="bg-brutal-purple border-3 border-black shadow-brutal p-4 text-white">
          <div className="text-2xl font-black">
            {allUsers.filter((u) => u.role === "mentor").length}
          </div>
          <div className="text-sm font-bold uppercase">Mentors</div>
        </div>
        <div className="bg-brutal-orange border-3 border-black shadow-brutal p-4 text-white">
          <div className="text-2xl font-black">
            {filteredUsers?.length || 0}
          </div>
          <div className="text-sm font-bold uppercase">Filtered</div>
        </div>
      </div>

      {/* Users Table */}
      <div className="border-3 border-black shadow-brutal bg-white overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-black text-white">
              <tr>
                <th className="px-6 py-4 text-left font-black uppercase text-sm">
                  User
                </th>
                <th className="px-6 py-4 text-left font-black uppercase text-sm">
                  Email
                </th>
                <th className="px-6 py-4 text-left font-black uppercase text-sm">
                  Role
                </th>
                <th className="px-6 py-4 text-left font-black uppercase text-sm">
                  Joined
                </th>
                <th className="px-6 py-4 text-left font-black uppercase text-sm">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y-2 divide-black">
              {!filteredUsers || filteredUsers.length === 0 ? (
                <tr>
                  <td colSpan={5} className="px-6 py-12 text-center text-gray-500">
                    <Users className="w-12 h-12 mx-auto mb-3 opacity-30" />
                    <p className="font-bold uppercase">No users found</p>
                  </td>
                </tr>
              ) : (
                filteredUsers.map((user) => (
                  <UserRow key={user._id} user={user} />
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

function UserRow({ user }: { user: any }) {
  const getRoleBadgeColor = (role: string) => {
    switch (role) {
      case "admin":
        return "bg-red-500 text-white";
      case "mentor":
        return "bg-brutal-purple text-white";
      case "student":
        return "bg-brutal-blue text-white";
      case "educator":
        return "bg-brutal-green text-white";
      case "company":
        return "bg-brutal-orange text-white";
      case "partner":
        return "bg-brutal-yellow text-black";
      default:
        return "bg-gray-500 text-white";
    }
  };

  const formatDate = (timestamp: number) => {
    return new Date(timestamp).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  const getInitials = (firstName?: string, lastName?: string) => {
    const first = firstName?.charAt(0) || "";
    const last = lastName?.charAt(0) || "";
    return (first + last).toUpperCase() || "?";
  };

  return (
    <tr className="hover:bg-gray-50 transition-colors">
      {/* User */}
      <td className="px-6 py-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-gray-300 border-2 border-black flex items-center justify-center font-black">
            {getInitials(user.firstName, user.lastName)}
          </div>
          <div>
            <div className="font-bold">
              {user.firstName} {user.lastName}
            </div>
            {user.phone && (
              <div className="text-xs text-gray-500">{user.phone}</div>
            )}
          </div>
        </div>
      </td>

      {/* Email */}
      <td className="px-6 py-4">
        <div className="flex items-center gap-2 text-sm">
          <Mail className="w-4 h-4 text-gray-400" />
          <span className="truncate max-w-xs">{user.email}</span>
        </div>
      </td>

      {/* Role */}
      <td className="px-6 py-4">
        <span
          className={`${getRoleBadgeColor(
            user.role
          )} px-3 py-1 text-xs font-bold uppercase border-2 border-black inline-flex items-center gap-1`}
        >
          {user.role === "admin" && <Shield className="w-3 h-3" />}
          {user.role}
        </span>
      </td>

      {/* Joined */}
      <td className="px-6 py-4">
        <div className="flex items-center gap-2 text-sm text-gray-600">
          <Calendar className="w-4 h-4" />
          {formatDate(user.createdAt)}
        </div>
      </td>

      {/* Actions */}
      <td className="px-6 py-4">
        <button
          className="px-4 py-2 bg-white text-black text-sm font-bold uppercase border-2 border-black hover:bg-gray-100 transition-all"
          onClick={() => {
            // TODO: View user details
            alert(`View details for ${user.email}\nUser ID: ${user._id}`);
          }}
        >
          View Details
        </button>
      </td>
    </tr>
  );
}
