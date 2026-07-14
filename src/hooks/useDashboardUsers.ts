"use client";

import { useGetUsersQuery, useBanUserMutation, useUnbanUserMutation, useApproveUserMutation, useDeleteUserMutation } from "@/lib/redux/features/users/usersApi";
import { User } from "@/types";
import toast from "react-hot-toast";

export const useDashboardUsers = () => {
  const { data, isLoading, refetch } = useGetUsersQuery({ page: 1, limit: 5 });
  const [banUserMutation] = useBanUserMutation();
  const [unbanUserMutation] = useUnbanUserMutation();
  const [approveUserMutation] = useApproveUserMutation();
  const [deleteUserMutation] = useDeleteUserMutation();

  const users = data?.data || [];

  const handleSearch = async (query: string) => {
    refetch();
  };

  const handleBanUser = async (user: User) => {
    try {
      if (user.status === "BANNED") {
        await unbanUserMutation(user.id).unwrap();
        toast.success(`${user.name} unbanned successfully`);
      } else {
        await banUserMutation(user.id).unwrap();
        toast.success(`${user.name} banned successfully`);
      }
      refetch();
    } catch (err) {
      toast.error("Failed to update user status");
    }
  };

  const handleApproveUser = async (user: User) => {
    try {
      await approveUserMutation(user.id).unwrap();
      toast.success(`${user.name} approved`);
      refetch();
    } catch (err) {
      toast.error("Failed to approve user");
    }
  };

  const handleDeleteUser = async (user: User) => {
    try {
      await deleteUserMutation(user.id).unwrap();
      toast.success(`${user.name} deleted`);
      refetch();
    } catch (err) {
      toast.error("Failed to delete user");
    }
  };

  return {
    users,
    isLoading,
    handleSearch,
    handleBanUser,
    handleApproveUser,
    handleDeleteUser,
  };
};