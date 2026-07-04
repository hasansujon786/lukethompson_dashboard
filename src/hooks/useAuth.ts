"use client";

import { useCallback } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { useAppDispatch, useAppSelector } from "@/lib/redux/hooks";
import {
  setCredentials,
  setError,
  clearError,
  setEmailForReset,
  clearEmailForReset,
  logout as logoutAction,
} from "@/lib/redux/features/auth/authSlice";
import {
  useLoginMutation,
  useForgotPasswordMutation,
  useVerifyOTPMutation,
  useResetPasswordMutation,
  useLogoutMutation,
  useGetCurrentUserQuery,
} from "@/lib/redux/features/auth/authApi";
import { ROUTES } from "@/constants";

export const useAuth = () => {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const { isAuthenticated, error, user, emailForReset } = useAppSelector(
    (state) => state.auth,
  );

  const [loginMutation] = useLoginMutation();
  const [forgotPasswordMutation] = useForgotPasswordMutation();
  const [verifyOTPMutation] = useVerifyOTPMutation();
  const [resetPasswordMutation] = useResetPasswordMutation();
  const [logoutMutation] = useLogoutMutation();

  const { isLoading: isFetchingUser } = useGetCurrentUserQuery(undefined, {
    skip: !isAuthenticated,
  });

  const login = useCallback(
    async (credentials: { email: string; password: string }) => {
      try {
        dispatch(clearError());

        const response = await loginMutation(credentials).unwrap();

        const accessToken = response.authorization.access_token;

        // Store token in cookie for middleware
        if (typeof window !== "undefined") {
          document.cookie = `accessToken=${accessToken}; path=/; max-age=86400`;
        }

        dispatch(
          setCredentials({
            user: {
              id: response.user.id,
              email: response.user.email,
              name: response.user.name,
              avatar: response.user.avatar,
              phone: response.user.phone_number,
              createdAt: response.user.created_at,
              updatedAt: response.user.created_at,
              role: response.user.type as "admin" | "user",
            },
            accessToken,
            refreshToken: "",
          }),
        );

        toast.success(response.message || "Login successful!");
        router.push(ROUTES.DASHBOARD);
      } catch (err) {
        const message = err instanceof Error ? err.message : "Login failed";
        dispatch(setError(message));
        toast.error(message);
      }
    },
    [dispatch, loginMutation, router],
  );

  const forgotPassword = useCallback(
    async (data: { email: string }) => {
      try {
        dispatch(clearError());

        const response = await forgotPasswordMutation(data).unwrap();
        dispatch(setEmailForReset(data.email));

        toast.success(response.message);
        router.push(ROUTES.VERIFY_OTP);
      } catch (err) {
        const message =
          err instanceof Error ? err.message : "Failed to send OTP";
        dispatch(setError(message));
        toast.error(message);
      }
    },
    [dispatch, forgotPasswordMutation, router],
  );

  const verifyOTP = useCallback(
    async (data: { email: string; otp: string }) => {
      try {
        dispatch(clearError());

        const response = await verifyOTPMutation(data).unwrap();

        toast.success(response.message);
        router.push(ROUTES.RESET_PASSWORD);
      } catch (err) {
        const message = err instanceof Error ? err.message : "Invalid OTP";
        dispatch(setError(message));
        toast.error(message);
      }
    },
    [dispatch, verifyOTPMutation, router],
  );

  const resetPassword = useCallback(
    async (data: { email: string; password: string; confirmPassword: string }) => {
      try {
        dispatch(clearError());

        const response = await resetPasswordMutation(data).unwrap();

        dispatch(clearEmailForReset());

        toast.success(response.message);
        router.push(ROUTES.SUCCESS);
      } catch (err) {
        const message =
          err instanceof Error ? err.message : "Failed to reset password";
        dispatch(setError(message));
        toast.error(message);
      }
    },
    [dispatch, resetPasswordMutation, router],
  );

  const logout = useCallback(async () => {
    try {
      // Clear token cookie
      if (typeof window !== "undefined") {
        document.cookie = "accessToken=; path=/; max-age=0";
      }

      await logoutMutation();
      dispatch(logoutAction());
      toast.success("Logged out successfully");
      router.push(ROUTES.LOGIN);
    } catch (err) {
      // Clear token even if API fails
      if (typeof window !== "undefined") {
        document.cookie = "accessToken=; path=/; max-age=0";
      }
      dispatch(logoutAction());
      toast.error("Logout failed");
      router.push(ROUTES.LOGIN);
    }
  }, [dispatch, logoutMutation, router]);

  return {
    isAuthenticated,
    isLoading: isFetchingUser,
    error,
    user,
    emailForReset,
    login,
    forgotPassword,
    verifyOTP,
    resetPassword,
    logout,
  };
};