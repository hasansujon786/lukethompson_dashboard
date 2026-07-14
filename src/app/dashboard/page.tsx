"use client";

import { useRouter } from "next/navigation";
import { StatsCard } from "@/components/dashboard/StatsCard";
import { RevenueChart } from "@/components/dashboard/RevenueChart";
import { PlanBreakdown } from "@/components/dashboard/PlanBreakdown";
import { DataTable } from "@/components/ui/DataTable";
import { Button } from "@/components/ui/Button";
import { UserManagementIcon } from "@/components/ui/icons/UserManagementIcon";
import { MonthlyRevenueIcon } from "@/components/ui/icons/MonthlyRevenueIcon";
import { SubscriptionIcon } from "@/components/ui/icons/SubscriptionIcon";
import { StopsTodayIcon } from "@/components/ui/icons/StopsTodayIcon";
import { createUserColumns } from "@/config/user-table.config";
import { useDashboardUsers } from "@/hooks/useDashboardUsers";
import { useDashboardStats } from "@/hooks/useDashboardStats";
import { User } from "@/types";
import { LoadingPage } from "@/components/shared/LoadingPage";

export default function DashboardPage() {
  const router = useRouter();
  const { stats, revenueData, planBreakdown, isLoading } = useDashboardStats();
  const { users, handleSearch, handleBanUser, handleDeleteUser } =
    useDashboardUsers();

  const handleViewUser = (user: User) => {
    router.push(`/dashboard/users/${user.id}`);
  };

  // if (isLoading || !stats || !revenueData || !planBreakdown) {
  //   return <LoadingPage />;
  // }

  const userColumns = createUserColumns({
    onView: handleViewUser,
    onBan: handleBanUser,
    onDelete: handleDeleteUser,
    showEye: false, // No eye icon on dashboard preview
  });

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

      {/* Charts */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <RevenueChart data={revenueData} />
        </div>
        <div>
          <PlanBreakdown
            data={planBreakdown}
            totalSubscribers={stats.proSubscribers}
          />
        </div>
      </div>

      {/* User Table Preview - maxRows 3 */}
      <DataTable
        data={users}
        columns={userColumns}
        title="User Management"
        showSearch
        searchPlaceholder="Search users..."
        onSearch={handleSearch}
        maxRows={3}
        headerAction={
          <Button
            size="default"
            className="h-9"
            onClick={() => router.push("/dashboard/users")}
          >
            See All
          </Button>
        }
      />
    </div>
  );
}
