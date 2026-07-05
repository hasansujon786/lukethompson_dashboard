"use client";

import { DataTable } from "@/components/ui/DataTable";
import { StatsCard } from "@/components/dashboard/StatsCard";
import { UserDetailView } from "@/components/users/UserDetailsView";
import { UserManagementIcon } from "@/components/ui/icons/UserManagementIcon";
import { MonthlyRevenueIcon } from "@/components/ui/icons/MonthlyRevenueIcon";
import { SubscriptionIcon } from "@/components/ui/icons/SubscriptionIcon";
import { StopsTodayIcon } from "@/components/ui/icons/StopsTodayIcon";
import { createUserColumns } from "@/config/user-table.config";
import { useUsers } from "@/hooks/useUsers";
import { useDashboardStats } from "@/hooks/useDashboardStats";

export default function UsersPage() {
  const { stats } = useDashboardStats();

  const {
    users,
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
  } = useUsers({ itemsPerPage: 10 });

  const columns = createUserColumns({
    onView: handleViewUser,
    onBan: handleBanUser,
    onApprove: handleApproveUser,
    onDelete: handleDeleteUser,
    showEye: true,
  });

  // Show detail view if a user is selected
  if (selectedUser) {
    return (
      <div className="">
        <UserDetailView user={selectedUser} onBack={handleCloseDetail} />
      </div>
    );
  }

  // Show table view with stats cards
  return (
    <div className="space-y-6 p-4 sm:p-6">
      {/* Stats Cards */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatsCard
          title="Total Users"
          value={stats.totalUsers.toLocaleString()}
          icon={<UserManagementIcon className="h-6 w-6 text-white" />}
        />
        <StatsCard
          title="Monthly Revenue"
          value={`$${stats.monthlyRevenue.toLocaleString()}`}
          icon={<MonthlyRevenueIcon className="h-6 w-6 text-white" />}
        />
        <StatsCard
          title="Pro Subscribers"
          value={stats.proSubscribers.toLocaleString()}
          icon={<SubscriptionIcon className="h-6 w-6 text-white" />}
        />
        <StatsCard
          title="Stops Today"
          value={stats.stopsToday.toLocaleString()}
          icon={<StopsTodayIcon className="h-6 w-6 text-white" />}
        />
      </div>

      {/* Full User Table with Pagination */}
      <DataTable
        data={users}
        columns={columns}
        title="User Management"
        showSearch
        searchPlaceholder="Search users..."
        onSearch={handleSearch}
        emptyMessage="No users found"
        pagination={{
          currentPage,
          totalPages,
          onPageChange: handlePageChange,
        }}
      />
    </div>
  );
}
