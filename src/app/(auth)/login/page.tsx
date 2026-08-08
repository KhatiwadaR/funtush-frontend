'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { Eye, EyeOff } from 'lucide-react';

import { saveSessionEverywhere, ROLE_REDIRECT } from '@/lib/auth';
import { ROUTES } from '@/lib/constants/routes';
import type { RawUser, SessionUser } from '@/types/user';

import usersData from '../../../../data/users.json';

const users = usersData as RawUser[];

export default function LoginPage() {
  const router = useRouter();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
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
    <div className="grid min-h-screen w-full grid-cols-1 bg-white md:grid-cols-2">

      {/* ═══════════════════════════════════════════ */}
      {/* LEFT — Mountain Image                       */}
      {/* ═══════════════════════════════════════════ */}
      <div className="relative hidden min-h-screen md:block">
        <Image
          src="/mountain.png"
          alt="Mountain scenery"
          fill
          priority
          className="object-cover"
          sizes="50vw"
        />
      </div>

      {/* ═══════════════════════════════════════════ */}
      {/* RIGHT — Sign In Form                        */}
      {/* ═══════════════════════════════════════════ */}
      <div className="flex min-h-screen items-center justify-center bg-white px-6 py-12 sm:px-12 lg:px-20">

        <div className="w-full max-w-md">

          {/* ── Brand ── */}
          <div className="text-center">
            <h1 className="text-4xl font-bold" style={{ color: '#4F46E5' }}>
  Green Agency
</h1>
            <p className="mt-2 text-base text-neutral-500">
              Manage your treks with ease
            </p>
          </div>

          {/* ── Form Title ── */}
          <h2 className="mt-10 text-lg font-bold text-neutral-900">
            Welcome Back
          </h2>

          {/* ── Form ── */}
          <form onSubmit={handleSubmit} noValidate className="mt-4 space-y-4">

            {formError && (
              <div className="rounded-lg bg-danger-50 px-4 py-3 text-sm text-danger-700">
                {formError}
              </div>
            )}

            {/* Email */}
            <div>
              <label htmlFor="email" className="block text-sm font-semibold text-neutral-900">
                Email
              </label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  if (emailError) setEmailError('');
                }}
                onBlur={() => setEmailError(validateEmail(email))}
                placeholder="name@company.com"
                autoComplete="email"
                className={`mt-1 w-full rounded-lg border bg-white px-4 py-2.5 text-sm text-neutral-900 outline-none transition-colors
                  placeholder:text-neutral-400
                  focus:ring-2
                  ${
                    emailError
                      ? 'border-danger-400 focus:border-danger-500 focus:ring-danger-100'
                      : 'border-neutral-300 focus:border-primary-500 focus:ring-primary-100'
                  }`}
              />
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
                <input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                    if (passwordError) setPasswordError('');
                  }}
                  onBlur={() => setPasswordError(validatePassword(password))}
                  placeholder="••••••••••••"
                  autoComplete="current-password"
                  className={`w-full rounded-lg border bg-white px-4 py-2.5 pr-11 text-sm text-neutral-900 outline-none transition-colors
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
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-neutral-500 hover:text-neutral-700"
                  aria-label={showPassword ? 'Hide password' : 'Show password'}
                >
                  {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
              {passwordError && (
                <p className="mt-1 text-xs text-danger-600">{passwordError}</p>
              )}
            </div>

            {/* Forgot password */}
            <div className="flex justify-end">
             <Link
              href={ROUTES.AUTH.FORGOT_PASSWORD}
              className="text-xs font-medium hover:underline"
              style={{ color: '#4F46E5' }}
              >
                 Forgot Password?
              </Link>
            </div>

            {/* Submit button */}
            <button
             type="submit"
             disabled={isLoading}
             style={{ backgroundColor: '#4F46E5' }}
             className="mt-6 w-full rounded-lg py-3 text-sm font-semibold text-white shadow-sm transition-all hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-60"
             >
              {isLoading ? 'Signing in...' : 'Sign in'}
            </button>
          </form>

          {/* ── Divider ── */}
          <div className="mt-6 text-center">
            <p className="text-xs text-neutral-500">or continue with</p>
          </div>

          {/* ── Social Login (Visual Only) ── */}
          <div className="mt-4 flex justify-center gap-4">
            <SocialButton icon={<AppleIcon />} label="Apple" />
            <SocialButton icon={<GoogleIcon />} label="Google" />
            <SocialButton icon={<FacebookIcon />} label="Facebook" />
          </div>

          {/* ── Bottom Link ── */}
          <p className="mt-8 text-center text-xs text-neutral-700">
            Don&apos;t have an account?{' '}
            <Link
              href="/register"
              className="font-semibold text-primary-600 hover:underline"
            >
              Sign Up
            </Link>
          </p>

        </div>
      </div>
    </div>
  );
}

// ─── Social Button ────────────────────────────

function SocialButton({ icon, label }: { icon: React.ReactNode; label: string }) {
  return (
    <button
      type="button"
      aria-label={`Continue with ${label}`}
      className="flex h-11 w-11 items-center justify-center rounded-full border border-neutral-200 bg-white shadow-sm transition-all hover:border-neutral-300 hover:shadow-md"
    >
      {icon}
    </button>
  );
}

// ─── Apple Icon ──────────────────────────────

function AppleIcon() {
  return (
    <svg className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor">
      <path d="M17.05 20.28c-.98.95-2.05.8-3.08.35-1.09-.46-2.09-.48-3.24 0-1.44.62-2.2.44-3.06-.35C2.79 15.25 3.51 7.59 9.05 7.31c1.35.07 2.29.74 3.08.8 1.18-.24 2.31-.93 3.57-.84 1.51.12 2.65.72 3.4 1.8-3.12 1.87-2.38 5.98.48 7.13-.57 1.5-1.31 2.99-2.54 4.09zM12.03 7.25c-.15-2.23 1.66-4.07 3.74-4.25.29 2.58-2.34 4.5-3.74 4.25z" />
    </svg>
  );
}

// ─── Google Icon ─────────────────────────────

function GoogleIcon() {
  return (
    <svg className="h-5 w-5" viewBox="0 0 24 24">
      <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
      <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
      <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
      <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
    </svg>
  );
}

// ─── Facebook Icon ───────────────────────────

function FacebookIcon() {
  return (
    <svg className="h-5 w-5" viewBox="0 0 24 24" fill="#1877F2">
      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
    </svg>
  );
}