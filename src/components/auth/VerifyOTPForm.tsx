"use client";

import { useMemo } from "react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  verifyOTPSchema,
  VerifyOTPFormData,
} from "@/lib/validation/auth.schema";
import { Button } from "@/components/ui/Button";
import { OTPInput } from "@/components/ui/OTPInput";
import { CountdownTimer } from "@/components/shared/CountdownTimer";
import { useAuth } from "@/hooks/useAuth";
import { maskEmail } from "@/lib/utils";
import { APP_CONFIG } from "@/constants";
import toast from "react-hot-toast";

export const VerifyOTPForm = () => {
  const { verifyOTP, forgotPassword, isLoading, emailForReset } = useAuth();

  const maskedEmail = useMemo(() => {
    if (emailForReset) {
      return maskEmail(emailForReset);
    }
    return "";
  }, [emailForReset]);

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<VerifyOTPFormData>({
    resolver: zodResolver(verifyOTPSchema),
    defaultValues: {
      otp: "",
    },
  });

  const onSubmit = async (data: VerifyOTPFormData) => {
    if (!emailForReset) {
      toast.error("Email not found. Please try again.");
      return;
    }

    await verifyOTP({
      email: emailForReset,
      otp: data.otp,
    });
  };

  const handleResendOTP = async () => {
    if (!emailForReset) {
      toast.error("Email not found. Please try again.");
      return;
    }

    try {
      await forgotPassword({ email: emailForReset });
      toast.success("OTP resent successfully");
    } catch (error) {
      toast.error("Failed to resend OTP");
    }
  };

  return (
    <div className="w-full">
      <div className="mb-8 text-center">
        <h1 className="text-2xl font-bold text-white font-liberation">
          Enter OTP
        </h1>
        <p className="mt-2 text-base font-normal text-white-secondary">
          We have shared a code to your registered email address
        </p>
        {maskedEmail && (
          <p className="mt-1 text-sm font-medium text-green-success">
            {maskedEmail}
          </p>
        )}
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <Controller
          name="otp"
          control={control}
          render={({ field }) => (
            <OTPInput
              value={field.value}
              onChange={field.onChange}
              error={errors.otp?.message}
              length={6}
            />
          )}
        />

        <Button
          type="submit"
          fullWidth
          isLoading={isLoading}
          className="rounded-xl"
        >
          Verify Your Account
        </Button>

        <div className="text-center">
          <CountdownTimer
            initialSeconds={APP_CONFIG.otpTimeout}
            onResend={handleResendOTP}
          />
        </div>
      </form>
    </div>
  );
};
