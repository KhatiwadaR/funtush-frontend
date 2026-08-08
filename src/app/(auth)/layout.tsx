/**
 * Authentication Layout
 * Full-screen centered card with Funtush logo at top
 * Used by: /login, /forgot-password
 */

import Image from 'next/image';

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}