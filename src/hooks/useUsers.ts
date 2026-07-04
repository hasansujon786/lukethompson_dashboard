"use client";

import { useState } from "react";
import { useGetUsersQuery, useBanUserMutation, useDeleteUserMutation } from "@/lib/redux/features/users/usersApi";
import { User } from "@/types";
import toast from "react-hot-toast";

interface UseUsersOptions {
  itemsPerPage?: number;
}

export const useUsers = ({ itemsPerPage = 8 }: UseUsersOptions = {}) => {
  const { data: users = [], isLoading, refetch } = useGetUsersQuery();
  const [banUserMutation] = useBanUserMutation();
  const [deleteUserMutation] = useDeleteUserMutation();

  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);

  const filteredUsers = users.filter(
    (user) =>
      user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.phone?.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  const totalPages = Math.ceil(filteredUsers.length / itemsPerPage);

  const paginatedUsers = filteredUsers.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage,
  );

  const handleSearch = async (query: string) => {
    setSearchQuery(query);
    setCurrentPage(1);
  };

  const handleViewUser = (user: User) => {
    setSelectedUser(user);
  };

  const handleCloseDetail = () => {
    setSelectedUser(null);
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

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  return {
    users: paginatedUsers,
    filteredTotal: filteredUsers.length,
    searchQuery,
    currentPage,
    totalPages,
    selectedUser,
    handleSearch,
    handleViewUser,
    handleCloseDetail,
    handleBanUser,
    handleDeleteUser,
    handlePageChange,
  };
};
