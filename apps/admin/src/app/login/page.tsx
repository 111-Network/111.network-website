'use client';

import { Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { LoginForm } from '@/components/login-form';

/**
 * Login page content that uses search params
 */
function LoginPageContent() {
  const searchParams = useSearchParams();
  const error = searchParams.get('error');
  const redirect = searchParams.get('redirect');

  let errorMessage: string | null = null;

  // Only show error messages for actual errors, not for redirect parameter
  if (error === 'no_role') {
    errorMessage =
      'Your account does not have admin access. Please contact a core team member.';
  } else if (error === 'pending') {
    errorMessage =
      'Your account is pending approval. You will be able to access the dashboard once approved by a core team member.';
  } else if (error === 'session_expired') {
    errorMessage = 'Your session has expired. Please log in again.';
  } else if (error === 'auth_required') {
    errorMessage = 'Please log in to access this page.';
  }
  // Don't show error message just for redirect parameter

  return (
    <div className="flex min-h-svh w-full items-center justify-center p-6 md:p-10">
      <div className="w-full max-w-sm space-y-4">
        {errorMessage && (
          <div className="rounded-md bg-destructive/10 border border-destructive/20 p-4 text-sm text-destructive">
            {errorMessage}
          </div>
        )}
        <LoginForm redirectTo={redirect || undefined} />
      </div>
    </div>
  );
}

/**
 * Login page
 * 
 * Handles authentication and redirects authenticated users to dashboard.
 * Shows error messages from query parameters.
 */
export default function LoginPage() {
  return (
    <Suspense fallback={
      <div className="flex min-h-svh w-full items-center justify-center">
        <div className="text-center">
          <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-r-transparent" />
          <p className="mt-4 text-sm text-muted-foreground">Loading...</p>
        </div>
      </div>
    }>
      <LoginPageContent />
    </Suspense>
  );
}
