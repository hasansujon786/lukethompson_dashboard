import { api } from "../api/apiSlice";
import { ProfileData } from "@/types";

interface PasswordChangePayload {
    old_password: string;
    new_password: string;
}

export const settingsApi = api.injectEndpoints({
    endpoints: (builder) => ({
        getProfile: builder.query<ProfileData, void>({
            query: () => ({
                url: "/auth/me",
                method: "GET",
            }),
            transformResponse: (response: unknown): ProfileData => {
                console.log("getProfile transformResponse:", response);
                try {
                    const resp = response as Record<string, unknown>;
                    const data = (resp.data || resp) as Record<string, unknown>;
                    return {
                        name: (data.name as string) || "",
                        email: (data.email as string) || "",
                        phone_number: (data.phone_number as string) || "",
                        avatar: (data.avatar as string) || "",
                    };
                } catch {
                    return { name: "", email: "", phone_number: "" };
                }
            },
            providesTags: ["Settings"],
        }),

        updateProfile: builder.mutation<ProfileData, { data: Record<string, unknown>; imageFile?: File }>({
            query: ({ data, imageFile }) => {
                if (imageFile) {
                    const formData = new FormData();
                    formData.append('name', data.name as string);
                    formData.append('phone_number', data.phone_number as string);
                    formData.append('image', imageFile);

                    return {
                        url: "/auth/update",
                        method: "PATCH",
                        body: formData,
                    };
                }

                return {
                    url: "/auth/update",
                    method: "PATCH",
                    body: data,
                };
            },
            transformResponse: (response: unknown): ProfileData => {
                console.log("updateProfile transformResponse:", response);
                try {
                    const resp = response as Record<string, unknown>;
                    const data = (resp.data || resp) as Record<string, unknown>;
                    return {
                        name: (data.name as string) || "",
                        email: (data.email as string) || "",
                        phone_number: (data.phone_number as string) || "",
                        avatar: (data.avatar as string) || "",
                    };
                } catch {
                    return { name: "", email: "", phone_number: "" };
                }
            },
            invalidatesTags: ["Settings", "Auth"],
        }),

        updatePassword: builder.mutation<{ message: string }, PasswordChangePayload>({
            query: (data) => ({
                url: "/auth/change-password",
                method: "PATCH",
                body: data,
            }),
            transformResponse: (response: unknown): { message: string } => {
                try {
                    const data = response as { message?: string };
                    return { message: data.message || "Password updated successfully" };
                } catch {
                    return { message: "Password updated successfully" };
                }
            },
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