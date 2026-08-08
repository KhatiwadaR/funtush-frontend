'use client';

/**
 * Agency Sign Up Page
 * 
 * Mock signup for agency owners
 * Additional fields: Agency Name, Contact Number
 */

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { Eye, EyeOff, ArrowLeft, Check } from 'lucide-react';
import toast from 'react-hot-toast';

export default function AgencyRegisterPage() {
  const router = useRouter();

  // ── Form State ──
  const [agencyName, setAgencyName] = useState('');
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [agreedToTerms, setAgreedToTerms] = useState(false);

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  // ── Errors ──
  const [errors, setErrors] = useState<{
    agencyName?: string;
    fullName?: string;
    email?: string;
    phone?: string;
    password?: string;
    confirmPassword?: string;
    terms?: string;
    form?: string;
  }>({});

  const [isLoading, setIsLoading] = useState(false);

  // ── Validation ──
  function validate() {
    const newErrors: typeof errors = {};

    if (!agencyName.trim()) newErrors.agencyName = 'Agency name is required';
    else if (agencyName.trim().length < 2) newErrors.agencyName = 'Name too short';

    if (!fullName.trim()) newErrors.fullName = 'Your name is required';
    else if (fullName.trim().length < 2) newErrors.fullName = 'Name too short';

    if (!email) newErrors.email = 'Email is required';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))
      newErrors.email = 'Please enter a valid email';

    if (!phone.trim()) newErrors.phone = 'Phone number is required';
    else if (phone.trim().length < 7) newErrors.phone = 'Phone number too short';

    if (!password) newErrors.password = 'Password is required';
    else if (password.length < 8) newErrors.password = 'Password must be at least 8 characters';

    if (!confirmPassword) newErrors.confirmPassword = 'Please confirm your password';
    else if (password !== confirmPassword) newErrors.confirmPassword = 'Passwords do not match';

    if (!agreedToTerms) newErrors.terms = 'You must agree to the Terms & Conditions';

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

      toast.success('Agency account created! Please sign in.');
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

      {/* ═══════════════════════════════════════════ */}
      {/* LEFT — Mountain Image                        */}
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
      {/* RIGHT — Sign Up Form                         */}
      {/* ═══════════════════════════════════════════ */}
      <div className="flex min-h-screen items-center justify-center bg-white px-6 py-12 sm:px-12 lg:px-20">

        <div className="w-full max-w-md">

          {/* ── Back Link ── */}
          <Link
            href="/register"
            className="mb-4 inline-flex items-center gap-1.5 text-xs font-medium text-neutral-500 transition hover:text-neutral-700"
          >
            <ArrowLeft className="h-3 w-3" />
            Back
          </Link>

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
          <h2 className="mt-8 text-lg font-bold text-neutral-900">
            Register your agency
          </h2>
          <p className="mt-1 text-xs text-neutral-500">
            Start managing bookings, packages, and guides
          </p>

          {/* ── Form ── */}
          <form onSubmit={handleSubmit} noValidate className="mt-4 space-y-4">

            {errors.form && (
              <div
                className="rounded-lg px-4 py-3 text-sm"
                style={{ backgroundColor: '#FEF2F2', color: '#B91C1C' }}
              >
                {errors.form}
              </div>
            )}

            {/* Agency Name */}
            <div>
              <label htmlFor="agencyName" className="block text-sm font-semibold text-neutral-900">
                Agency Name
              </label>
              <input
                id="agencyName"
                type="text"
                value={agencyName}
                onChange={(e) => {
                  setAgencyName(e.target.value);
                  if (errors.agencyName) setErrors((prev) => ({ ...prev, agencyName: undefined }));
                }}
                placeholder="e.g. Green Agency"
                autoComplete="organization"
                className={`mt-1 w-full rounded-lg border bg-white px-4 py-2.5 text-sm text-neutral-900 outline-none transition-colors
                  placeholder:text-neutral-400
                  focus:ring-2
                  ${
                    errors.agencyName
                      ? 'border-red-400 focus:border-red-500 focus:ring-red-100'
                      : 'border-neutral-300 focus:border-indigo-500 focus:ring-indigo-100'
                  }`}
              />
              {errors.agencyName && (
                <p className="mt-1 text-xs text-red-600">{errors.agencyName}</p>
              )}
            </div>

            {/* Full Name */}
            <div>
              <label htmlFor="fullName" className="block text-sm font-semibold text-neutral-900">
                Your Name (Contact Person)
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
                      ? 'border-red-400 focus:border-red-500 focus:ring-red-100'
                      : 'border-neutral-300 focus:border-indigo-500 focus:ring-indigo-100'
                  }`}
              />
              {errors.fullName && (
                <p className="mt-1 text-xs text-red-600">{errors.fullName}</p>
              )}
            </div>

            {/* Email + Phone (2-column on desktop) */}
            <div className="grid gap-4 sm:grid-cols-2">
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
                  placeholder="agency@company.com"
                  autoComplete="email"
                  className={`mt-1 w-full rounded-lg border bg-white px-4 py-2.5 text-sm text-neutral-900 outline-none transition-colors
                    placeholder:text-neutral-400
                    focus:ring-2
                    ${
                      errors.email
                        ? 'border-red-400 focus:border-red-500 focus:ring-red-100'
                        : 'border-neutral-300 focus:border-indigo-500 focus:ring-indigo-100'
                    }`}
                />
                {errors.email && (
                  <p className="mt-1 text-xs text-red-600">{errors.email}</p>
                )}
              </div>

              {/* Phone */}
              <div>
                <label htmlFor="phone" className="block text-sm font-semibold text-neutral-900">
                  Phone
                </label>
                <input
                  id="phone"
                  type="tel"
                  value={phone}
                  onChange={(e) => {
                    setPhone(e.target.value);
                    if (errors.phone) setErrors((prev) => ({ ...prev, phone: undefined }));
                  }}
                  placeholder="+977-9XXXXXXXXX"
                  autoComplete="tel"
                  className={`mt-1 w-full rounded-lg border bg-white px-4 py-2.5 text-sm text-neutral-900 outline-none transition-colors
                    placeholder:text-neutral-400
                    focus:ring-2
                    ${
                      errors.phone
                        ? 'border-red-400 focus:border-red-500 focus:ring-red-100'
                        : 'border-neutral-300 focus:border-indigo-500 focus:ring-indigo-100'
                    }`}
                />
                {errors.phone && (
                  <p className="mt-1 text-xs text-red-600">{errors.phone}</p>
                )}
              </div>
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
                        ? 'border-red-400 focus:border-red-500 focus:ring-red-100'
                        : 'border-neutral-300 focus:border-indigo-500 focus:ring-indigo-100'
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
                <p className="mt-1 text-xs text-red-600">{errors.password}</p>
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
                        ? 'border-red-400 focus:border-red-500 focus:ring-red-100'
                        : 'border-neutral-300 focus:border-indigo-500 focus:ring-indigo-100'
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
                <p className="mt-1 text-xs text-red-600">{errors.confirmPassword}</p>
              )}
            </div>

            {/* Terms & Conditions Checkbox */}
            <div>
              <label className="flex items-center gap-2 cursor-pointer select-none">
                <input
                 type="checkbox"
                 checked={agreedToTerms}
                 onChange={(e) => {
                  setAgreedToTerms(e.target.checked);
                  if (errors.terms) setErrors((prev) => ({ ...prev, terms: undefined }));
                }}
                 className="h-4 w-4 cursor-pointer rounded border-neutral-400 accent-indigo-600"
                />
               <span className="text-xs font-medium" style={{ color: '#4F46E5' }}>
               I agree to the Terms &amp; Conditions
               </span>
              </label>
               {errors.terms && (
                 <p className="mt-1 text-xs text-red-600">{errors.terms}</p>
                 )}
                 
            </div>

            {/* Submit button */}
            <button
              type="submit"
              disabled={isLoading}
              style={{ backgroundColor: '#4F46E5' }}
              className="mt-6 w-full rounded-lg py-3 text-sm font-semibold text-white shadow-sm transition-all hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-60"
            >
              {isLoading ? 'Creating agency...' : 'Register Agency'}
            </button>
          </form>

          {/* ── Bottom Link ── */}
          <p className="mt-8 text-center text-xs text-neutral-700">
            Already have an account?{' '}
            <Link
              href="/login"
              className="font-semibold hover:underline"
              style={{ color: '#4F46E5' }}
            >
              Sign In
            </Link>
          </p>

        </div>
      </div>
    </div>
  );
}