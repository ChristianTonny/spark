'use client';

import { useState } from 'react';
import { useQuery, useMutation } from 'convex/react';
import { api } from '../../../convex/_generated/api';

export default function FixUserRolePage() {
  const [email, setEmail] = useState('christian.tonny.gentil@gmail.com');
  const [selectedRole, setSelectedRole] = useState<'student' | 'mentor' | 'educator' | 'admin'>('mentor');
  const [checkResult, setCheckResult] = useState<any>(null);
  const [fixResult, setFixResult] = useState<any>(null);

  const getUserByEmail = useQuery(api.adminUtils.getUserByEmail, email ? { email } : 'skip');
  const fixUserRole = useMutation(api.adminUtils.fixUserRole);

  const handleCheck = () => {
    setCheckResult(getUserByEmail);
  };

  const handleFix = async () => {
    try {
      const result = await fixUserRole({ email, role: selectedRole });
      setFixResult(result);
      // Refresh the check
      setTimeout(() => {
        setCheckResult(null);
        handleCheck();
      }, 1000);
    } catch (error) {
      setFixResult({ error: error instanceof Error ? error.message : 'Failed to fix role' });
    }
  };

  return (
    <div className="min-h-screen bg-brutal-bg py-12 px-4">
      <div className="container mx-auto max-w-3xl">
        <h1 className="text-4xl font-black mb-8">Fix User Role Utility</h1>

        <div className="bg-white border-3 border-brutal-border shadow-brutal p-6 mb-6">
          <h2 className="text-2xl font-black mb-4">Check User</h2>
          <div className="mb-4">
            <label className="block font-bold mb-2">Email:</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-2 border-3 border-brutal-border"
              placeholder="user@example.com"
            />
          </div>
          <button
            onClick={handleCheck}
            className="px-6 py-3 bg-brutal-blue text-white font-bold border-3 border-brutal-border shadow-brutal hover:shadow-brutal-lg"
          >
            Check User
          </button>

          {checkResult && (
            <div className="mt-4 p-4 bg-gray-100 border-2 border-black">
              <h3 className="font-black mb-2">Result:</h3>
              <pre className="text-sm overflow-auto">
                {JSON.stringify(checkResult, null, 2)}
              </pre>
            </div>
          )}
        </div>

        <div className="bg-white border-3 border-brutal-border shadow-brutal p-6">
          <h2 className="text-2xl font-black mb-4">Fix User Role</h2>
          <div className="mb-4">
            <label className="block font-bold mb-2">New Role:</label>
            <select
              value={selectedRole}
              onChange={(e) => setSelectedRole(e.target.value as any)}
              className="w-full px-4 py-2 border-3 border-brutal-border font-bold"
            >
              <option value="student">Student</option>
              <option value="mentor">Mentor</option>
              <option value="educator">Educator</option>
              <option value="admin">Admin</option>
            </select>
          </div>
          <button
            onClick={handleFix}
            className="px-6 py-3 bg-brutal-orange text-white font-bold border-3 border-brutal-border shadow-brutal hover:shadow-brutal-lg"
          >
            Fix Role
          </button>

          {fixResult && (
            <div className="mt-4 p-4 bg-green-100 border-2 border-green-600">
              <h3 className="font-black mb-2">Fix Result:</h3>
              <pre className="text-sm overflow-auto">
                {JSON.stringify(fixResult, null, 2)}
              </pre>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

