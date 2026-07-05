"use client";

import { useState } from "react";
import { ArrowLeft } from "lucide-react";
import { User, StopLog } from "@/types";
import { useGetUserQuery, useGetUserStopLogsQuery } from "@/lib/redux/features/users/usersApi";
import { useUserStopLogs } from "@/hooks/useUserStopLogs";

interface UserDetailViewProps {
  user: User;
  onBack: () => void;
}

export const UserDetailView = ({ user, onBack }: UserDetailViewProps) => {
  const { data: userData, isLoading: userLoading } = useGetUserQuery(user.id);
  const userDetails = userData?.data || user;

  const {
    stopLogs,
    isLoading: logsLoading,
    searchQuery,
    statusFilter,
    handleSearch,
    handleStatusChange,
    refetch,
  } = useUserStopLogs(user.id, { limit: 10 });

  const avatarUrl = userDetails.avatar && typeof userDetails.avatar === "string" && userDetails.avatar.startsWith("http")
    ? userDetails.avatar
    : "/Avatar.png";

  const formatDateTime = (dateStr?: string | null) => {
    if (!dateStr) return "-";
    return new Date(dateStr).toLocaleString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const formatCurrency = (value: string) => {
    return parseFloat(value).toFixed(2);
  };

  return (
    <div className="space-y-6 bg-form-bg rounded-2xl border border-border-light p-6">
      {/* Back Button & Header */}
      <div className="flex items-center gap-4">
        <button
          onClick={onBack}
          className="rounded-lg p-2 text-white-secondary hover:bg-white/10 hover:text-white transition-colors"
        >
          <ArrowLeft size={20} />
        </button>
        <h1 className="text-2xl font-bold text-white font-liberation">
          User Details
        </h1>
      </div>

      {/* User Profile */}
      <div className="flex items-center gap-4 px-6">
        <div className="relative h-16 w-16 overflow-hidden rounded-full">
          <img
            src={avatarUrl}
            alt={userDetails.name}
            className="h-full w-full object-cover rounded-full"
            onError={(e) => {
              (e.target as HTMLImageElement).src = "/Avatar.png";
            }}
          />
        </div>
        <div>
          <h2 className="text-lg font-semibold text-white">{userDetails.name}</h2>
          <p className="text-sm text-white-secondary">{userDetails.email}</p>
          <span className="inline-flex items-center rounded-2xl px-3 py-0.5 text-xs font-medium text-white bg-white/10 mt-1">
            {userDetails.type || userDetails.role || "user"}
          </span>
        </div>
      </div>

      {/* Details Section */}
      <div className="rounded-xl border border-border-light p-6">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div>
            <label className="mb-1.5 block text-sm font-medium text-white-secondary">
              Name
            </label>
            <div className="rounded-lg border border-border-light bg-white/5 px-3 py-2.5">
              <span className="text-sm text-white">{userDetails.name}</span>
            </div>
          </div>
          <div>
            <label className="mb-1.5 block text-sm font-medium text-white-secondary">
              Email
            </label>
            <div className="rounded-lg border border-border-light bg-white/5 px-3 py-2.5">
              <span className="text-sm text-white">{userDetails.email}</span>
            </div>
          </div>
          <div>
            <label className="mb-1.5 block text-sm font-medium text-white-secondary">
              Phone Number
            </label>
            <div className="rounded-lg border border-border-light bg-white/5 px-3 py-2.5">
              <span className="text-sm text-white">{userDetails.phone_number || userDetails.phone || "-"}</span>
            </div>
          </div>
          <div>
            <label className="mb-1.5 block text-sm font-medium text-white-secondary">
              User Type
            </label>
            <div className="rounded-lg border border-border-light bg-white/5 px-3 py-2.5">
              <span className="text-sm text-white capitalize">{userDetails.type || userDetails.role || "user"}</span>
            </div>
          </div>
          <div>
            <label className="mb-1.5 block text-sm font-medium text-white-secondary">
              Created At
            </label>
            <div className="rounded-lg border border-border-light bg-white/5 px-3 py-2.5">
              <span className="text-sm text-white">{formatDateTime(userDetails.created_at || userDetails.createdAt)}</span>
            </div>
          </div>
          <div>
            <label className="mb-1.5 block text-sm font-medium text-white-secondary">
              Approved At
            </label>
            <div className="rounded-lg border border-border-light bg-white/5 px-3 py-2.5">
              <span className="text-sm text-white">{formatDateTime((userDetails as User & { approved_at?: string }).approved_at)}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Log Summary Section */}
      <div className="rounded-2xl border border-border-light bg-form-bg p-6">
        <h3 className="mb-4 text-lg font-semibold text-white">Log Summary</h3>

        {/* Search and Filter */}
        <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div className="relative flex-1 max-w-md">
            <input
              type="text"
              placeholder="Search by location or city..."
              value={searchQuery}
              onChange={(e) => handleSearch(e.target.value)}
              className="w-full rounded-lg border border-border-light bg-white/5 px-4 py-2.5 pl-10 text-sm text-white placeholder-white-secondary focus:border-green-success focus:outline-none"
            />
            <svg
              className="absolute left-3 top-2.5 h-5 w-5 text-white-secondary"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </div>

          <select
            value={statusFilter}
            onChange={(e) => handleStatusChange(e.target.value)}
            className="rounded-lg border border-border-light bg-white/5 px-4 py-2.5 text-sm text-white focus:border-green-success focus:outline-none"
          >
            <option value="ALL">All Status</option>
            <option value="PENDING">Pending</option>
            <option value="APPROVED">Approved</option>
            <option value="BANNED">Banned</option>
          </select>
        </div>

        {/* Stop Logs Table */}
        {logsLoading ? (
          <div className="flex items-center justify-center py-12">
            <div className="text-white-secondary">Loading stop logs...</div>
          </div>
        ) : stopLogs.length === 0 ? (
          <div className="flex items-center justify-center py-12">
            <p className="text-white-secondary">No stop logs found</p>
          </div>
        ) : (
          <>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-border-light">
                    <th className="pb-3 text-left text-sm font-medium text-white-secondary">Location</th>
                    <th className="pb-3 text-left text-sm font-medium text-white-secondary">Arrival Time</th>
                    <th className="pb-3 text-left text-sm font-medium text-white-secondary">Dock In Time</th>
                    <th className="pb-3 text-left text-sm font-medium text-white-secondary">Complete Time</th>
                    <th className="pb-3 text-left text-sm font-medium text-white-secondary">Departure Time</th>
                    <th className="pb-3 text-right text-sm font-medium text-white-secondary">Detention</th>
                  </tr>
                </thead>
                <tbody>
                  {stopLogs.map((log: StopLog) => (
                    <tr key={log.id} className="border-b border-border-light/50 last:border-0">
                      <td className="py-3 text-sm text-white">{log.address}</td>
                      <td className="py-3 text-sm text-white-secondary">{formatDateTime(log.arrived_at)}</td>
                      <td className="py-3 text-sm text-white-secondary">{formatDateTime(log.docked_at)}</td>
                      <td className="py-3 text-sm text-white-secondary">{formatDateTime(log.completed_at)}</td>
                      <td className="py-3 text-sm text-white-secondary">{formatDateTime(log.departed_at)}</td>
                      <td className="py-3 text-sm text-right text-white">{formatCurrency(log.detention)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </>
        )}
      </div>
    </div>
  );
};
