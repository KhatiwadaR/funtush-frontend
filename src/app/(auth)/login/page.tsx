'use client';

/**
 * Login Page - Redesigned
 * 
 * Centered card with left purple panel + right form
 * Matches new Figma design
 */

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Eye, EyeOff, Mail, Lock } from 'lucide-react';

import { AuthLeftPanel } from '@/components/auth/AuthLeftPanel';
import { saveSessionEverywhere, ROLE_REDIRECT } from '@/lib/auth';
import { ROUTES } from '@/lib/constants/routes';
import type { RawUser, SessionUser } from '@/types/user';

import usersData from '../../../../data/users.json';

const users = usersData as RawUser[];

export default function LoginPage() {
  const router = useRouter();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(true);
  const [showPassword, setShowPassword] = useState(false);

  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [formError, setFormError] = useState('');

  const [isLoading, setIsLoading] = useState(false);

  function validateEmail(value: string): string {
    if (!value) return 'Email is required';
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) return 'Please enter a valid email address';
    return '';
  }

  function validatePassword(value: string): string {
    if (!value) return 'Password is required';
    if (value.length < 8) return 'Password must be at least 8 characters';
    return '';
  }

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setFormError('');

    const emailErr = validateEmail(email);
    const passwordErr = validatePassword(password);
    setEmailError(emailErr);
    setPasswordError(passwordErr);
    if (emailErr || passwordErr) return;

    setIsLoading(true);

    try {
      await new Promise((r) => setTimeout(r, 400));

      const foundUser = users.find(
        (u) => u.email === email && u.password === password
      );

      if (!foundUser) {
        setFormError('Invalid email or password');
        setIsLoading(false);
        return;
      }

      const session: SessionUser = {
        id: foundUser.id,
        role: foundUser.role,
        agency_id: foundUser.agency_id,
        name: foundUser.name,
        email: foundUser.email,
        country: foundUser.country,
        phone: foundUser.phone,
        member_since: foundUser.member_since,
        token: `mock-jwt-${foundUser.id}-${Date.now()}`,
      };

      saveSessionEverywhere(session);
      router.push(ROLE_REDIRECT[foundUser.role]);
    } catch {
      setFormError('Something went wrong. Please try again.');
      setIsLoading(false);
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-neutral-100 px-4 py-8">

      {/* ═══════════════════════════════════════════ */}
      {/* CENTERED CARD                              */}
      {/* ═══════════════════════════════════════════ */}
      <div className="grid w-full max-w-5xl overflow-hidden rounded-2xl bg-white shadow-xl md:grid-cols-2">

        {/* LEFT — Purple Panel */}
        <AuthLeftPanel />

        {/* RIGHT — Login Form */}
        <div className="flex items-center justify-center bg-white px-8 py-10 sm:px-12">

          <div className="w-full max-w-sm">

            {/* ── Title ── */}
            <h2 className="text-2xl font-bold text-neutral-900">
              Welcome back
            </h2>
            <p className="mt-1 text-sm text-neutral-500">
              Log in to your Funtush trekker account
            </p>

            {/* ── Form ── */}
            <form onSubmit={handleSubmit} noValidate className="mt-6 space-y-4">

              {formError && (
                <div className="rounded-lg bg-danger-50 px-4 py-2.5 text-sm text-danger-700">
                  {formError}
                </div>
              )}

              {/* Email */}
              <div>
                <label htmlFor="email" className="block text-sm font-semibold text-neutral-900">
                  Email
                </label>
                <div className="relative mt-1">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-neutral-400" />
                  <input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => {
                      setEmail(e.target.value);
                      if (emailError) setEmailError('');
                    }}
                    onBlur={() => setEmailError(validateEmail(email))}
                    placeholder="you@example.com"
                    autoComplete="email"
                    className={`w-full rounded-lg border bg-white pl-9 pr-4 py-2.5 text-sm text-neutral-900 outline-none transition-colors
                      placeholder:text-neutral-400
                      focus:ring-2
                      ${
                        emailError
                          ? 'border-danger-400 focus:border-danger-500 focus:ring-danger-100'
                          : 'border-neutral-300 focus:border-primary-500 focus:ring-primary-100'
                      }`}
                  />
                </div>
                {emailError && (
                  <p className="mt-1 text-xs text-danger-600">{emailError}</p>
                )}
              </div>

              {/* Password */}
              <div>
                <label htmlFor="password" className="block text-sm font-semibold text-neutral-900">
                  Password
                </label>
                <div className="relative mt-1">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-neutral-400" />
                  <input
                    id="password"
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onChange={(e) => {
                      setPassword(e.target.value);
                      if (passwordError) setPasswordError('');
                    }}
                    onBlur={() => setPasswordError(validatePassword(password))}
                    placeholder="At least 8 characters"
                    autoComplete="current-password"
                    className={`w-full rounded-lg border bg-white pl-9 pr-11 py-2.5 text-sm text-neutral-900 outline-none transition-colors
                      placeholder:text-neutral-400
                      focus:ring-2
                      ${
                        passwordError
                          ? 'border-danger-400 focus:border-danger-500 focus:ring-danger-100'
                          : 'border-neutral-300 focus:border-primary-500 focus:ring-primary-100'
                      }`}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword((prev) => !prev)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-neutral-400 hover:text-neutral-600"
                    aria-label={showPassword ? 'Hide password' : 'Show password'}
                  >
                    {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                </div>
                {passwordError && (
                  <p className="mt-1 text-xs text-danger-600">{passwordError}</p>
                )}
              </div>

              {/* Remember me + Forgot Password */}
              <div className="flex items-center justify-between">
                <label className="flex cursor-pointer items-center gap-2 select-none">
                  <input
                    type="checkbox"
                    checked={rememberMe}
                    onChange={(e) => setRememberMe(e.target.checked)}
                    className="h-4 w-4 cursor-pointer rounded border-neutral-300 accent-primary-600"
                  />
                  <span className="text-sm text-neutral-700">Remember me</span>
                </label>

                <Link
                  href={ROUTES.AUTH.FORGOT_PASSWORD}
                  className="text-sm font-medium text-primary-600 hover:text-primary-700"
                >
                  Forgot password?
                </Link>
              </div>

              {/* Submit button */}
              <button
                type="submit"
                disabled={isLoading}
                className="mt-2 w-full rounded-lg bg-primary-600 py-2.5 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 disabled:opacity-60"
              >
                {isLoading ? 'Signing in...' : 'Log In'}
              </button>
            </form>

            {/* ── Divider ── */}
            <div className="mt-6 flex items-center gap-3">
              <div className="h-px flex-1 bg-neutral-200" />
              <span className="text-xs text-neutral-400">OR</span>
              <div className="h-px flex-1 bg-neutral-200" />
            </div>

            {/* ── Bottom Link ── */}
            <p className="mt-6 text-center text-sm text-neutral-700">
              New to Funtush?{' '}
              <Link
                href="/register"
                className="font-semibold text-primary-600 hover:underline"
              >
                Create an account
              </Link>
              <br />
              <span className="text-xs text-neutral-500">as a trekker or a trekking agency.</span>
            </p>

          </div>
        </div>
      </div>
    </div>
  );
}