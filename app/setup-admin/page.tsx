'use client';

import { useState } from 'react';
import { useMutation, useQuery } from 'convex/react';
import { api } from '../../convex/_generated/api';

/**
 * Admin setup utility page
 * Use this to make ctonny111@gmail.com an admin
 */
export default function SetupAdminPage() {
  const [email, setEmail] = useState('ctonny111@gmail.com');
  const [result, setResult] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);
  
  const makeUserAdmin = useMutation(api.admin.makeUserAdmin);
  const checkUser = useQuery(
    api.adminUtils.getUserByEmail,
    email ? { email } : 'skip'
  );

  const handleMakeAdmin = async () => {
    setError(null);
    setResult(null);
    try {
      const res = await makeUserAdmin({ email });
      setResult(res);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to make user admin');
    }
  };

  return (
    <div className="min-h-screen bg-brutal-bg py-12 px-4">
      <div className="container mx-auto max-w-2xl">
        <div className="bg-brutal-orange border-3 border-brutal-border shadow-brutal-lg p-6 mb-6 text-white">
          <h1 className="text-3xl font-black mb-2">⚠️ ADMIN SETUP UTILITY</h1>
          <p className="font-bold">
            This page is for initial setup only. Make ctonny111@gmail.com an admin.
          </p>
        </div>

        <div className="bg-white border-3 border-brutal-border shadow-brutal p-6 mb-6">
          <h2 className="text-2xl font-black mb-4">Make User Admin</h2>
          
          <div className="mb-4">
            <label className="block font-bold mb-2">Email:</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-2 border-3 border-brutal-border font-bold"
              placeholder="user@example.com"
            />
          </div>

          {/* Check current status */}
          {checkUser && (
            <div className="mb-4 p-4 bg-gray-100 border-2 border-black">
              <h3 className="font-black mb-2">Current Status:</h3>
              {checkUser.error ? (
                <p className="text-red-600 font-bold">{checkUser.error}</p>
              ) : checkUser.user ? (
                <div>
                  <p className="font-bold">
                    Role: <span className={checkUser.user.role === 'admin' ? 'text-green-600' : 'text-orange-600'}>
                      {checkUser.user.role}
                    </span>
                  </p>
                  <p className="text-sm text-gray-600 mt-1">
                    {checkUser.user.firstName} {checkUser.user.lastName}
                  </p>
                </div>
              ) : null}
            </div>
          )}

          <button
            onClick={handleMakeAdmin}
            className="w-full px-6 py-3 bg-brutal-orange text-white font-bold uppercase border-3 border-brutal-border shadow-brutal hover:shadow-brutal-lg hover:translate-x-[-2px] hover:translate-y-[-2px] transition-all"
          >
            Make Admin
          </button>

          {/* Result */}
          {result && (
            <div className="mt-4 p-4 bg-green-100 border-3 border-green-600">
              <h3 className="font-black mb-2 text-green-800">✓ Success!</h3>
              <pre className="text-sm overflow-auto">
                {JSON.stringify(result, null, 2)}
              </pre>
              <p className="mt-3 font-bold text-green-800">
                Now sign out and sign back in with {email}
              </p>
            </div>
          )}

          {/* Error */}
          {error && (
            <div className="mt-4 p-4 bg-red-100 border-3 border-red-600">
              <h3 className="font-black mb-2 text-red-800">✗ Error</h3>
              <p className="text-red-700 font-bold">{error}</p>
            </div>
          )}
        </div>

        <div className="bg-brutal-yellow border-3 border-brutal-border shadow-brutal p-6">
          <h3 className="font-black mb-3">📝 Instructions:</h3>
          <ol className="space-y-2 text-sm font-bold list-decimal list-inside">
            <li>Make sure the user (ctonny111@gmail.com) has signed up first</li>
            <li>Click &quot;Make Admin&quot; button above</li>
            <li>Wait for success message</li>
            <li>Sign out and sign back in</li>
            <li>You should be redirected to /admin dashboard</li>
          </ol>
        </div>

        <div className="mt-6 text-center">
          <a href="/" className="text-lg font-bold text-gray-600 hover:text-black">
            ← Back to Home
          </a>
        </div>
      </div>
    </div>
  );
}

