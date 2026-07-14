"use client";

import { useState } from "react";
import { useGetProfileQuery, useUpdateProfileMutation, useUpdatePasswordMutation } from "@/lib/redux/features/settings/settingsApi";
import { ProfileData, SettingsTab } from "@/types";
import { useAppDispatch } from "@/lib/redux/hooks";
import { updateUser } from "@/lib/redux/features/auth/authSlice";
import toast from "react-hot-toast";

export const useSettings = () => {
    const [activeTab, setActiveTab] = useState<SettingsTab>("general");
    const { data: profile, isLoading, refetch } = useGetProfileQuery();
    const [updateProfileMutation] = useUpdateProfileMutation();
    const [updatePasswordMutation] = useUpdatePasswordMutation();
    const dispatch = useAppDispatch();

    const handleTabChange = (tab: SettingsTab) => {
        setActiveTab(tab);
    };

    const handleProfileUpdate = async ({ data, imageFile }: { data: Record<string, unknown>; imageFile?: File }) => {
        try {
            console.log("Updating profile with data:", JSON.stringify(data, null, 2));
            await updateProfileMutation({ data, imageFile }).unwrap();
            console.log("Mutation succeeded, refetching profile...");

            // Wait for refetch to complete, then update Redux with fresh data
            const freshProfile = await refetch();
            console.log("Fresh profile after refetch:", freshProfile);

            if (freshProfile.data) {
                dispatch(updateUser({
                    name: freshProfile.data.name,
                    email: freshProfile.data.email,
                    avatar: freshProfile.data.avatar,
                    phone_number: freshProfile.data.phone_number,
                }));
            }

            toast.success("Profile updated successfully!");
        } catch (err: unknown) {
            console.error("Profile update error:", err);
            let errorMessage = "Failed to update profile";
            
            if (err && typeof err === 'object') {
                const errorObj = err as { 
                    data?: { message?: string; success?: boolean; error?: string };
                    error?: string;
                    status?: number;
                };
                
                if (errorObj.data?.message) {
                    errorMessage = errorObj.data.message;
                } else if (errorObj.data?.error) {
                    errorMessage = errorObj.data.error;
                } else if (errorObj.error) {
                    errorMessage = errorObj.error;
                } else if (typeof errorObj.data === 'string') {
                    errorMessage = errorObj.data;
                }
            }
            
            toast.error(errorMessage);
        }
    };

    const handlePasswordChange = async (data: { old_password: string; new_password: string }) => {
        try {
            await updatePasswordMutation(data).unwrap();
            toast.success("Password updated successfully!");
            return true;
        } catch (err: unknown) {
            const error = err as { data?: { message?: string } };
            toast.error(error?.data?.message || "Failed to update password");
            return false;
        }
    };

    return {
        activeTab,
        profile: profile || {
            name: "",
            email: "",
            phone_number: "",
        },
        isLoading,
        handleTabChange,
        handleProfileUpdate,
        handlePasswordChange,
    };
};