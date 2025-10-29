"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Mail, Lock, CheckCircle, ArrowLeft } from "lucide-react";
import Link from "next/link";

const emailSchema = z.object({
  email: z.string().email("Invalid email address"),
});

const codeSchema = z.object({
  code: z.string().length(6, "Code must be 6 digits"),
});

const passwordSchema = z.object({
  password: z.string().min(6, "Password must be at least 6 characters"),
  confirmPassword: z.string(),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"],
});

type EmailFormData = z.infer<typeof emailSchema>;
type CodeFormData = z.infer<typeof codeSchema>;
type PasswordFormData = z.infer<typeof passwordSchema>;

export default function ResetPasswordPage() {
  const [step, setStep] = useState(1);
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const emailForm = useForm<EmailFormData>({
    resolver: zodResolver(emailSchema),
  });

  const codeForm = useForm<CodeFormData>({
    resolver: zodResolver(codeSchema),
  });

  const passwordForm = useForm<PasswordFormData>({
    resolver: zodResolver(passwordSchema),
  });

  const handleEmailSubmit = async (data: EmailFormData) => {
    setIsLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 1000));
    setEmail(data.email);
    setStep(2);
    setIsLoading(false);
  };

  const handleCodeSubmit = async (data: CodeFormData) => {
    setIsLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 1000));
    console.log("Code verified:", data.code);
    setStep(3);
    setIsLoading(false);
  };

  const handlePasswordSubmit = async (data: PasswordFormData) => {
    setIsLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 1000));
    console.log("Password reset:", data);
    setStep(4);
    setIsLoading(false);
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <Link href="/login">
            <button className="inline-flex items-center text-spark-blue hover:text-spark-blue-dark mb-4">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Login
            </button>
          </Link>
          <h1 className="text-3xl font-bold text-gray-900">Reset Password</h1>
          <p className="text-gray-600 mt-2">
            {step === 1 && "Enter your email to receive a reset code"}
            {step === 2 && "Enter the verification code sent to your email"}
            {step === 3 && "Create a new password"}
            {step === 4 && "Your password has been reset successfully"}
          </p>
        </div>

        {/* Step 1: Email */}
        {step === 1 && (
          <Card>
            <CardHeader>
              <CardTitle>Email Address</CardTitle>
              <CardDescription>We'll send you a verification code</CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={emailForm.handleSubmit(handleEmailSubmit)} className="space-y-4">
                <div>
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="your.email@example.com"
                    icon={<Mail className="h-5 w-5" />}
                    error={emailForm.formState.errors.email?.message}
                    {...emailForm.register("email")}
                  />
                </div>
                <Button type="submit" className="w-full" loading={isLoading}>
                  Send Reset Code
                </Button>
              </form>
            </CardContent>
          </Card>
        )}

        {/* Step 2: Verification Code */}
        {step === 2 && (
          <Card>
            <CardHeader>
              <CardTitle>Verification Code</CardTitle>
              <CardDescription>
                Enter the 6-digit code sent to {email}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={codeForm.handleSubmit(handleCodeSubmit)} className="space-y-4">
                <div>
                  <Label htmlFor="code">6-Digit Code</Label>
                  <Input
                    id="code"
                    placeholder="123456"
                    maxLength={6}
                    error={codeForm.formState.errors.code?.message}
                    {...codeForm.register("code")}
                  />
                </div>
                <div className="flex gap-3">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => setStep(1)}
                    className="flex-1"
                  >
                    Back
                  </Button>
                  <Button type="submit" className="flex-1" loading={isLoading}>
                    Verify Code
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        )}

        {/* Step 3: New Password */}
        {step === 3 && (
          <Card>
            <CardHeader>
              <CardTitle>New Password</CardTitle>
              <CardDescription>Choose a strong password</CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={passwordForm.handleSubmit(handlePasswordSubmit)} className="space-y-4">
                <div>
                  <Label htmlFor="password">New Password</Label>
                  <Input
                    id="password"
                    type="password"
                    placeholder="At least 6 characters"
                    icon={<Lock className="h-5 w-5" />}
                    error={passwordForm.formState.errors.password?.message}
                    {...passwordForm.register("password")}
                  />
                </div>
                <div>
                  <Label htmlFor="confirmPassword">Confirm Password</Label>
                  <Input
                    id="confirmPassword"
                    type="password"
                    placeholder="Re-enter password"
                    icon={<Lock className="h-5 w-5" />}
                    error={passwordForm.formState.errors.confirmPassword?.message}
                    {...passwordForm.register("confirmPassword")}
                  />
                </div>
                <Button type="submit" className="w-full" loading={isLoading}>
                  Reset Password
                </Button>
              </form>
            </CardContent>
          </Card>
        )}

        {/* Step 4: Success */}
        {step === 4 && (
          <Card>
            <CardContent className="pt-12 pb-12 text-center">
              <div className="w-16 h-16 bg-spark-green rounded-full flex items-center justify-center mx-auto mb-4">
                <CheckCircle className="h-8 w-8 text-white" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900 mb-2">
                Password Reset Complete!
              </h2>
              <p className="text-gray-600 mb-8">
                You can now sign in with your new password
              </p>
              <Link href="/login">
                <Button size="lg" className="w-full">
                  Go to Login
                </Button>
              </Link>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}
