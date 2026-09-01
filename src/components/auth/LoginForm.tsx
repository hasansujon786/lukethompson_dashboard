'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { loginSchema, LoginFormData } from '@/lib/validation/auth.schema';
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';
import { Checkbox } from '@/components/ui/Checkbox';
import { PasswordInput } from './PasswordInput';
import { useAuth } from '@/hooks/useAuth';
import Link from 'next/link';
import { ROUTES } from '@/constants';

export const LoginForm = () => {
  const { login, isLoading } = useAuth();

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: '',
      password: '',
      rememberMe: false,
    },
  });

  const rememberMe = watch('rememberMe');

  const onSubmit = async (data: LoginFormData) => {
    await login(data);
  };

  return (
    <div className="w-full">
      <div className="mb-6 sm:mb-8 text-center">
        <h1 className="text-xl sm:text-2xl font-bold text-white font-liberation">
          Sign in to GetDockPay
        </h1>
        <p className="mt-2 text-sm sm:text-base font-normal text-white-secondary">
          Log in to your account
        </p>
      </div>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="space-y-5 sm:space-y-6"
      >
        <Input
          label="Email Address"
          type="email"
          placeholder="Enter your email"
          required
          error={errors.email?.message}
          {...register('email')}
        />

        <PasswordInput
          label="Password"
          placeholder="Enter your password"
          required
          error={errors.password?.message}
          {...register('password')}
        />

        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <Checkbox
            label="Remember me"
            checked={rememberMe}
            onChange={e => setValue('rememberMe', e.target.checked)}
          />

          <Link
            href={ROUTES.FORGOT_PASSWORD}
            className="text-sm text-green-success hover:text-green-success/80 transition-colors"
          >
            Forgot password?
          </Link>
        </div>

        <Button type="submit" fullWidth isLoading={isLoading}>
          Login
        </Button>
      </form>
    </div>
  );
};
