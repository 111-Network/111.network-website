'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
} from '@/components/ui/field';
import { Input } from '@/components/ui/input';
import { useAuth } from '@/hooks/use-auth';
import { useRole } from '@/hooks/use-role';

/**
 * Login form validation schema
 */
const loginSchema = z.object({
  email: z.string().email('Please enter a valid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
});

type LoginFormData = z.infer<typeof loginSchema>;

/**
 * Login form component props
 */
interface LoginFormProps extends React.ComponentProps<'div'> {
  redirectTo?: string;
}

/**
 * Login form component
 * 
 * Handles user authentication with email and password.
 * Redirects to dashboard on successful login.
 */
export function LoginForm({
  className,
  redirectTo,
  ...props
}: LoginFormProps) {
  const router = useRouter();
  const { login, isLoading } = useAuth();
  const { isPending } = useRole();
  const [error, setError] = useState<string | null>(null);
  const [showPassword, setShowPassword] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data: LoginFormData) => {
    setError(null);
    try {
      console.log('Attempting login...');
      await login(data.email, data.password);
      console.log('Login completed, waiting for session sync...');
      
      // Wait for cookies to be set and role to be fetched
      // Give Supabase time to set cookies properly
      await new Promise(resolve => setTimeout(resolve, 500));
      
      // Redirect to dashboard after successful login
      const destination = redirectTo || '/dashboard';
      console.log('Redirecting to:', destination);
      
      // Use window.location.href instead of router.push to force a full page reload
      // This ensures cookies are properly sent to the server and middleware can see them
      window.location.href = destination;
    } catch (err: any) {
      // Log the full error for debugging
      console.error('Login error:', err);
      
      // Handle different error types from Supabase
      const errorMessage = err.message || err.error?.message || 'An error occurred during login. Please try again.';
      
      if (errorMessage.includes('Invalid login credentials') || errorMessage.includes('invalid_credentials')) {
        setError('Invalid email or password. Please try again.');
      } else if (errorMessage.includes('Email not confirmed') || errorMessage.includes('email_not_confirmed')) {
        setError('Please confirm your email address before logging in. Check your inbox for a confirmation email.');
      } else if (errorMessage.includes('Too many requests') || errorMessage.includes('too_many_requests')) {
        setError('Too many login attempts. Please try again later.');
      } else if (errorMessage.includes('User not found')) {
        setError('No account found with this email address.');
      } else if (errorMessage.includes('Network') || errorMessage.includes('fetch')) {
        setError('Network error. Please check your connection and try again.');
      } else {
        // Show the actual error message for debugging
        setError(`Login failed: ${errorMessage}`);
      }
    }
  };

  return (
    <div className={cn('flex flex-col gap-6', className)} {...props}>
      <Card>
        <CardHeader>
          <CardTitle>Login to your account</CardTitle>
          <CardDescription>
            Enter your email below to login to your account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)}>
            <FieldGroup>
              {error && (
                <div className="rounded-md bg-destructive/10 border border-destructive/20 p-3 text-sm text-destructive">
                  {error}
                </div>
              )}
              
              {isPending && (
                <div className="rounded-md bg-warning/10 border border-warning/20 p-3 text-sm text-warning-foreground">
                  Your account is pending approval. You will be able to access the dashboard once approved by a core team member.
                </div>
              )}

              <Field>
                <FieldLabel htmlFor="email">Email</FieldLabel>
                <Input
                  id="email"
                  type="email"
                  placeholder="m@example.com"
                  {...register('email')}
                  disabled={isLoading}
                  aria-invalid={errors.email ? 'true' : 'false'}
                />
                {errors.email && (
                  <p className="text-sm text-destructive mt-1">
                    {errors.email.message}
                  </p>
                )}
              </Field>

              <Field>
                <div className="flex items-center">
                  <FieldLabel htmlFor="password">Password</FieldLabel>
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="ml-auto text-sm underline-offset-4 hover:underline text-muted-foreground"
                  >
                    {showPassword ? 'Hide' : 'Show'}
                  </button>
                </div>
                <Input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  {...register('password')}
                  disabled={isLoading}
                  aria-invalid={errors.password ? 'true' : 'false'}
                />
                {errors.password && (
                  <p className="text-sm text-destructive mt-1">
                    {errors.password.message}
                  </p>
                )}
              </Field>

              <Field>
                <Button type="submit" disabled={isLoading} className="w-full">
                  {isLoading ? 'Logging in...' : 'Login'}
                </Button>
                <FieldDescription className="text-center">
                  Core team members and approved contributors only
                </FieldDescription>
              </Field>
            </FieldGroup>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
