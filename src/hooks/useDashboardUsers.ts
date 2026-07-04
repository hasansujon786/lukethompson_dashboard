"use client";

import { useGetUsersQuery, useBanUserMutation, useDeleteUserMutation } from "@/lib/redux/features/users/usersApi";
import { User } from "@/types";
import toast from "react-hot-toast";

export const useDashboardUsers = () => {
  const { data: users = [], isLoading, refetch } = useGetUsersQuery();
  const [banUserMutation] = useBanUserMutation();
  const [deleteUserMutation] = useDeleteUserMutation();

  const handleSearch = async (query: string) => {
    // RTK Query handles filtering on the server side
    // For client-side search, you can refetch with params
    // Or implement client-side filtering here
    refetch();
  };

  const handleBanUser = async (user: User) => {
    try {
      await banUserMutation(user.id).unwrap();
      toast.success(
        `${user.name} ${user.status === "Banned" ? "unbanned" : "banned"}`,
      );
    } catch (err) {
      toast.error("Failed to update user status");
    }
  };

  const handleDeleteUser = async (user: User) => {
    try {
      await deleteUserMutation(user.id).unwrap();
      toast.success(`${user.name} deleted`);
    } catch (err) {
      toast.error("Failed to delete user");
    }
  };

  return {
    users,
    isLoading,
    handleSearch,
    handleBanUser,
    handleDeleteUser,
  };
};