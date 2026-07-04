"use client";

import { useState } from "react";
import { useGetProfileQuery, useUpdateProfileMutation } from "@/lib/redux/features/settings/settingsApi";
import { ProfileData, SettingsTab } from "@/types";
import toast from "react-hot-toast";

export const useSettings = () => {
    const [activeTab, setActiveTab] = useState<SettingsTab>("general");
    const { data: profile, isLoading, refetch } = useGetProfileQuery();
    const [updateProfileMutation] = useUpdateProfileMutation();

    const handleTabChange = (tab: SettingsTab) => {
        setActiveTab(tab);
    };

    const handleProfileUpdate = async (data: ProfileData) => {
        try {
            await updateProfileMutation(data).unwrap();
            toast.success("Profile updated successfully!");
        } catch (err) {
            toast.error("Failed to update profile");
        }
    };

    return {
        activeTab,
        profile: profile || {
            firstName: "",
            lastName: "",
            email: "",
            phone: "",
        },
        isLoading,
        handleTabChange,
        handleProfileUpdate,
    };
};
