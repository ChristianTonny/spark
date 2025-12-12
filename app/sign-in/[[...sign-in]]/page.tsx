"use client";

import { SignIn } from "@clerk/nextjs";
import { useSearchParams } from "next/navigation";
import { Suspense } from "react";

function SignInInner() {
  const searchParams = useSearchParams();
  const returnTo = searchParams.get("returnTo") || "";

  // Only allow internal redirects
  const safeReturnTo =
    returnTo.startsWith("/") && !returnTo.startsWith("//") ? returnTo : "";

  const redirectUrl = safeReturnTo
    ? `/auth-redirect?returnTo=${encodeURIComponent(safeReturnTo)}`
    : "/auth-redirect";

  const signUpUrl = safeReturnTo
    ? `/sign-up?returnTo=${encodeURIComponent(safeReturnTo)}`
    : "/sign-up";

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-5xl md:text-6xl font-bold mb-2">
            Opportunity<span className="text-orange-600">Map</span>
          </h1>
          <p className="text-xl text-gray-600">Welcome Back!</p>
        </div>

        <SignIn
          appearance={{
            elements: {
              rootBox: "mx-auto",
              card: "bg-white shadow-lg rounded-lg",
            },
          }}
          routing="path"
          path="/sign-in"
          signUpUrl={signUpUrl}
          redirectUrl={redirectUrl}
        />
      </div>
    </div>
  );
}

export default function SignInPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
          <div className="w-full max-w-md text-center font-bold">Loading…</div>
        </div>
      }
    >
      <SignInInner />
    </Suspense>
  );
}
