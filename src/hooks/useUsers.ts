"use client";

import { useState, useCallback } from "react";
import { useGetUsersQuery, useBanUserMutation, useApproveUserMutation, useDeleteUserMutation } from "@/lib/redux/features/users/usersApi";
import { User } from "@/types";
import toast from "react-hot-toast";

interface UseUsersOptions {
  itemsPerPage?: number;
}

export const useUsers = ({ itemsPerPage = 10 }: UseUsersOptions = {}) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);

  const { data, isLoading, refetch } = useGetUsersQuery({
    page: currentPage,
    limit: itemsPerPage,
    search: searchQuery || undefined,
  });

  const [banUserMutation] = useBanUserMutation();
  const [approveUserMutation] = useApproveUserMutation();
  const [deleteUserMutation] = useDeleteUserMutation();

  const users = data?.data || [];
  const totalUsers = data?.meta_data?.total || 0;
  const totalPages = Math.ceil(totalUsers / itemsPerPage);

  const handleSearch = useCallback((query: string) => {
    setSearchQuery(query);
    setCurrentPage(1);
  }, []);

  const handleViewUser = useCallback((user: User) => {
    setSelectedUser(user);
  }, []);

  const handleCloseDetail = useCallback(() => {
    setSelectedUser(null);
  }, []);

  const handleBanUser = useCallback(async (user: User) => {
    try {
      await banUserMutation(user.id).unwrap();
      toast.success(
        `${user.name} ${user.status === "BANNED" ? "unbanned" : "banned"}`,
      );
      refetch();
    } catch (err) {
      toast.error("Failed to update user status");
    }
  }, [banUserMutation, refetch]);

  const handleApproveUser = useCallback(async (user: User) => {
    try {
      await approveUserMutation(user.id).unwrap();
      toast.success(`${user.name} approved`);
      refetch();
    } catch (err) {
      toast.error("Failed to approve user");
    }
  }, [approveUserMutation, refetch]);

  const handleDeleteUser = useCallback(async (user: User) => {
    try {
      await deleteUserMutation(user.id).unwrap();
      toast.success(`${user.name} deleted`);
      refetch();
    } catch (err) {
      toast.error("Failed to delete user");
    }
  }, [deleteUserMutation, refetch]);

  const handlePageChange = useCallback((page: number) => {
    setCurrentPage(page);
  }, []);

  return {
    users,
    filteredTotal: totalUsers,
    searchQuery,
    currentPage,
    totalPages,
    selectedUser,
    isLoading,
    handleSearch,
    handleViewUser,
    handleCloseDetail,
    handleBanUser,
    handleApproveUser,
    handleDeleteUser,
    handlePageChange,
  };
};