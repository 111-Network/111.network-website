import { redirect } from 'next/navigation';

/**
 * Root page
 * 
 * Redirects to dashboard (will be protected and redirect to login if not authenticated)
 */
export default function Home() {
  redirect('/dashboard');
}
