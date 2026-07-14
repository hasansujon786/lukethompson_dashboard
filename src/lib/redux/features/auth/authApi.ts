import { api } from "../api/apiSlice";
import { User, LoginCredentials, ForgotPasswordRequest, VerifyOTPRequest, ResetPasswordRequest } from "@/types";

export const authApi = api.injectEndpoints({
    endpoints: (builder) => ({
        login: builder.mutation<
            {
                user: {
                    id: string;
                    email: string;
                    name: string;
                    avatar?: string;
                    phone_number?: string;
                    created_at: string;
                    type: "admin" | "user";
                };
                accessToken: string;
                message: string;
                authorization: {
                    type: string;
                    access_token: string;
                };
            },
            LoginCredentials
        >({
            query: (credentials) => ({
                url: "/auth/login",
                method: "POST",
                body: credentials,
            }),
            invalidatesTags: ["Auth"],
        }),

        forgotPassword: builder.mutation<
            { message: string },
            { email: string }
        >({
            query: (data) => ({
                url: "/auth/forgot-password",
                method: "POST",
                body: data,
            }),
        }),

        verifyOTP: builder.mutation<
            { message: string },
            { email: string; token: string }
        >({
            query: (data) => ({
                url: "/auth/check-otp",
                method: "POST",
                body: data,
            }),
        }),

        resetPassword: builder.mutation<
            { message: string },
            { email: string; token: string; password: string }
        >({
            query: (data) => ({
                url: "/auth/reset-password",
                method: "POST",
                body: data,
            }),
        }),

        logout: builder.mutation<void, void>({
            query: () => ({
                url: "/auth/logout",
                method: "POST",
            }),
            invalidatesTags: ["Auth"],
        }),

        refreshToken: builder.mutation<
            { accessToken: string; refreshToken: string },
            { refreshToken: string }
        >({
            query: (data) => ({
                url: "/auth/refresh",
                method: "POST",
                body: data,
            }),
        }),

        getCurrentUser: builder.query<User, void>({
            query: () => ({
                url: "/auth/me",
                method: "GET",
            }),
            providesTags: ["Auth"],
        }),
    }),
});

export const {
    useLoginMutation,
    useForgotPasswordMutation,
    useVerifyOTPMutation,
    useResetPasswordMutation,
    useLogoutMutation,
    useRefreshTokenMutation,
    useGetCurrentUserQuery,
} = authApi;