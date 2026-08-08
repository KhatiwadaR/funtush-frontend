'use client';

/**
 * Agency Sign Up Page
 */

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { Eye, EyeOff, ArrowLeft } from 'lucide-react';
import toast from 'react-hot-toast';

export default function RegisterPage() {
  const router = useRouter();

  // ── Form State ──
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [agreedToTerms, setAgreedToTerms] = useState(false);

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  // ── Errors ──
  const [errors, setErrors] = useState<{
    fullName?: string;
    email?: string;
    password?: string;
    confirmPassword?: string;
    terms?: string;
    form?: string;
  }>({});

  const [isLoading, setIsLoading] = useState(false);

  // ── Validation ──
  function validate() {
    const newErrors: typeof errors = {};

    if (!fullName.trim()) newErrors.fullName = 'Full name is required';
    else if (fullName.trim().length < 2) newErrors.fullName = 'Name too short';

    if (!email) newErrors.email = 'Email is required';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))
      newErrors.email = 'Please enter a valid email';

    if (!password) newErrors.password = 'Password is required';
    else if (password.length < 8)
      newErrors.password = 'Password must be at least 8 characters';

    if (!confirmPassword) newErrors.confirmPassword = 'Please confirm your password';
    else if (password !== confirmPassword)
      newErrors.confirmPassword = 'Passwords do not match';

    if (!agreedToTerms)
      newErrors.terms = 'You must agree to the Terms & Conditions';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }

  // ── Submit ──
  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!validate()) return;

    setIsLoading(true);

    try {
      await new Promise((r) => setTimeout(r, 800));

      toast.success('Account created! Please sign in.');
      setTimeout(() => {
        router.push('/login');
      }, 800);
    } catch {
      setErrors({ form: 'Something went wrong. Please try again.' });
      setIsLoading(false);
    }
  }

  return (
    <div className="grid min-h-screen w-full grid-cols-1 bg-white md:grid-cols-2">

      {/* LEFT — Swayambhu Image                       */}
      <div className="relative hidden min-h-screen md:block">
        <Image
          src="/swyambhu.png"
          alt="Swayambhu temple"
          fill
          priority
          className="object-cover"
          sizes="50vw"
        />
      </div>

      {/* RIGHT — Sign Up Form                         */}
      <div className="flex min-h-screen items-center justify-center bg-white px-6 py-12 sm:px-12 lg:px-20">

        <div className="w-full max-w-md">

          {/* ── Back Link ── */}
          <Link
            href="/login"
            className="mb-4 inline-flex items-center gap-1.5 text-xs font-medium text-neutral-500 transition hover:text-neutral-700"
          >
            <ArrowLeft className="h-3 w-3" />
            Back to Sign in
          </Link>

          {/* ── Brand ── */}
          <div className="text-center">
            <h1 className="text-4xl font-bold text-primary-600">
              Green Agency
            </h1>
            <p className="mt-2 text-base text-neutral-500">
              Manage your treks with ease
            </p>
          </div>

          {/* ── Form Title ── */}
          <h2 className="mt-8 text-lg font-bold text-neutral-900">
            Create an account
          </h2>

          {/* ── Form ── */}
          <form onSubmit={handleSubmit} noValidate className="mt-4 space-y-4">

            {errors.form && (
              <div className="rounded-lg bg-danger-50 px-4 py-3 text-sm text-danger-700">
                {errors.form}
              </div>
            )}

            {/* Full Name */}
            <div>
              <label htmlFor="fullName" className="block text-sm font-semibold text-neutral-900">
                Full Name
              </label>
              <input
                id="fullName"
                type="text"
                value={fullName}
                onChange={(e) => {
                  setFullName(e.target.value);
                  if (errors.fullName) setErrors((prev) => ({ ...prev, fullName: undefined }));
                }}
                placeholder="John Doe"
                autoComplete="name"
                className={`mt-1 w-full rounded-lg border bg-white px-4 py-2.5 text-sm text-neutral-900 outline-none transition-colors
                  placeholder:text-neutral-400
                  focus:ring-2
                  ${
                    errors.fullName
                      ? 'border-danger-400 focus:border-danger-500 focus:ring-danger-100'
                      : 'border-neutral-300 focus:border-primary-500 focus:ring-primary-100'
                  }`}
              />
              {errors.fullName && (
                <p className="mt-1 text-xs text-danger-600">{errors.fullName}</p>
              )}
            </div>

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
                  if (errors.email) setErrors((prev) => ({ ...prev, email: undefined }));
                }}
                placeholder="name@company.com"
                autoComplete="email"
                className={`mt-1 w-full rounded-lg border bg-white px-4 py-2.5 text-sm text-neutral-900 outline-none transition-colors
                  placeholder:text-neutral-400
                  focus:ring-2
                  ${
                    errors.email
                      ? 'border-danger-400 focus:border-danger-500 focus:ring-danger-100'
                      : 'border-neutral-300 focus:border-primary-500 focus:ring-primary-100'
                  }`}
              />
              {errors.email && (
                <p className="mt-1 text-xs text-danger-600">{errors.email}</p>
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
                    if (errors.password) setErrors((prev) => ({ ...prev, password: undefined }));
                  }}
                  placeholder="••••••••••••"
                  autoComplete="new-password"
                  className={`w-full rounded-lg border bg-white px-4 py-2.5 pr-11 text-sm text-neutral-900 outline-none transition-colors
                    placeholder:text-neutral-400
                    focus:ring-2
                    ${
                      errors.password
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
              {errors.password && (
                <p className="mt-1 text-xs text-danger-600">{errors.password}</p>
              )}
            </div>

            {/* Confirm Password */}
            <div>
              <label htmlFor="confirmPassword" className="block text-sm font-semibold text-neutral-900">
                Confirm password
              </label>
              <div className="relative mt-1">
                <input
                  id="confirmPassword"
                  type={showConfirmPassword ? 'text' : 'password'}
                  value={confirmPassword}
                  onChange={(e) => {
                    setConfirmPassword(e.target.value);
                    if (errors.confirmPassword) setErrors((prev) => ({ ...prev, confirmPassword: undefined }));
                  }}
                  placeholder="••••••••••••"
                  autoComplete="new-password"
                  className={`w-full rounded-lg border bg-white px-4 py-2.5 pr-11 text-sm text-neutral-900 outline-none transition-colors
                    placeholder:text-neutral-400
                    focus:ring-2
                    ${
                      errors.confirmPassword
                        ? 'border-danger-400 focus:border-danger-500 focus:ring-danger-100'
                        : 'border-neutral-300 focus:border-primary-500 focus:ring-primary-100'
                    }`}
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword((prev) => !prev)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-neutral-500 hover:text-neutral-700"
                  aria-label={showConfirmPassword ? 'Hide password' : 'Show password'}
                >
                  {showConfirmPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
              {errors.confirmPassword && (
                <p className="mt-1 text-xs text-danger-600">{errors.confirmPassword}</p>
              )}
            </div>

            {/* Terms Checkbox */}
            <div>
              <label className="flex cursor-pointer items-center gap-2 select-none">
                <input
                  type="checkbox"
                  checked={agreedToTerms}
                  onChange={(e) => {
                    setAgreedToTerms(e.target.checked);
                    if (errors.terms) setErrors((prev) => ({ ...prev, terms: undefined }));
                  }}
                  className="h-4 w-4 cursor-pointer rounded border-neutral-400 accent-primary-600"
                />
                <span className="text-xs font-medium text-primary-600">
                  I agree to the Terms &amp; Conditions
                </span>
              </label>
              {errors.terms && (
                <p className="mt-1 text-xs text-danger-600">{errors.terms}</p>
              )}
            </div>

            {/* Submit button */}
            <button
              type="submit"
              disabled={isLoading}
              className="mt-6 w-full rounded-lg bg-primary-600 py-3 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 disabled:opacity-60"
            >
              {isLoading ? 'Creating account...' : 'Sign Up'}
            </button>
          </form>

          {/* ── Bottom Link ── */}
          <p className="mt-8 text-center text-xs text-neutral-700">
            Already have an account?{' '}
            <Link
              href="/login"
              className="font-semibold text-primary-600 hover:underline"
            >
              Sign In
            </Link>
          </p>

        </div>
      </div>
    </div>
  );
}