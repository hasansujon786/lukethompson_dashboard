import { api } from "../api/apiSlice";
import { ProfileData, SettingsTab } from "@/types";

export const settingsApi = api.injectEndpoints({
    endpoints: (builder) => ({
        getProfile: builder.query<ProfileData, void>({
            query: () => ({
                url: "/settings/profile",
                method: "GET",
            }),
            providesTags: ["Settings"],
        }),

        updateProfile: builder.mutation<ProfileData, Partial<ProfileData>>({
            query: (data) => ({
                url: "/settings/profile",
                method: "PUT",
                body: data,
            }),
            invalidatesTags: ["Settings"],
        }),

        updatePassword: builder.mutation<{ message: string }, { currentPassword: string; newPassword: string }>({
            query: (data) => ({
                url: "/settings/password",
                method: "PUT",
                body: data,
            }),
        }),

        updateNotifications: builder.mutation<{ message: string }, Partial<ProfileData>>({
            query: (data) => ({
                url: "/settings/notifications",
                method: "PUT",
                body: data,
            }),
            invalidatesTags: ["Settings"],
        }),
    }),
});

export const {
    useGetProfileQuery,
    useUpdateProfileMutation,
    useUpdatePasswordMutation,
    useUpdateNotificationsMutation,
} = settingsApi;