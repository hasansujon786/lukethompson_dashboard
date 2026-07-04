"use client";

import { useState, useMemo, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  resetPasswordSchema,
  ResetPasswordFormData,
} from "@/lib/validation/auth.schema";
import { Button } from "@/components/ui/Button";
import { PasswordInput } from "./PasswordInput";
import { PasswordRequirements } from "./PasswordRequirements";
import { useAuth } from "@/hooks/useAuth";
import { validatePassword } from "@/lib/utils";
import { CheckCircle2 } from "lucide-react";
import toast from "react-hot-toast";

export const ResetPasswordForm = () => {
  const { resetPassword, isLoading, emailForReset, resetToken } = useAuth();
  const [password, setPassword] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm<ResetPasswordFormData>({
    resolver: zodResolver(resetPasswordSchema),
    defaultValues: {
      password: "",
      confirmPassword: "",
    },
  });

  const currentPassword = watch("password");
  const passwordValidation = useMemo(
    () => validatePassword(currentPassword),
    [currentPassword],
  );

  // Use token from Redux state (stored after OTP verification)
  const tokenToUse = resetToken || "";

  const onSubmit = async (data: ResetPasswordFormData) => {
    if (!emailForReset || !tokenToUse) {
      toast.error("Invalid session. Please try again.");
      return;
    }

    await resetPassword({
      email: emailForReset,
      token: tokenToUse,
      password: data.password,
    });
  };

  const allRequirementsMet = Object.values(passwordValidation).every(Boolean);

  return (
    <div className="w-full">
      <div className="mb-8 text-center">
        <h1 className="text-2xl font-bold text-white font-liberation">
          Create your new password
        </h1>
        <p className="mt-2 text-base font-normal text-white-secondary">
          Create a new password to securely access your account.
        </p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <div>
          <PasswordInput
            label="Password"
            placeholder="Enter your password"
            required
            error={errors.password?.message}
            {...register("password")}
            onChange={(e) => setPassword(e.target.value)}
          />
          {currentPassword && !allRequirementsMet && (
            <p className="mt-1 text-xs text-warning-yellow">
              *At least 1 letter, *1 number and *8 characters
            </p>
          )}
        </div>

        <PasswordInput
          label="Confirm New Password"
          placeholder="Confirm your password"
          required
          error={errors.confirmPassword?.message}
          {...register("confirmPassword")}
        />

        {currentPassword && (
          <div className="rounded-lg bg-form-bg/50 p-4 border border-border-light">
            <div className="mb-3 flex items-center gap-2">
              <CheckCircle2 className="h-5 w-5 text-green-success" />
              <span className="text-sm font-medium text-white">
                Password Requirements
              </span>
            </div>
            <PasswordRequirements
              password={currentPassword}
              validation={passwordValidation}
            />
          </div>
        )}

        <Button
          type="submit"
          fullWidth
          isLoading={isLoading}
          className="rounded-xl"
        >
          Save
        </Button>
      </form>
    </div>
  );
};
