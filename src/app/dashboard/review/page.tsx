'use client';

import { DataTable } from '@/components/ui/DataTable';
import { StatsCard } from '@/components/dashboard/StatsCard';
import { UserManagementIcon } from '@/components/ui/icons/UserManagementIcon';
import { MonthlyRevenueIcon } from '@/components/ui/icons/MonthlyRevenueIcon';
import { SubscriptionIcon } from '@/components/ui/icons/SubscriptionIcon';
import { StopsTodayIcon } from '@/components/ui/icons/StopsTodayIcon';
import { createReviewColumns } from '@/config/review-table.config';
import { useReview } from '@/hooks/useReview';
import { useDashboardStats } from '@/hooks/useDashboardStats';

export default function ReviewPage() {
    const { stats } = useDashboardStats();

    const {
        reviews,
        currentPage,
        totalPages,
        selectedReview,
        handleSearch,
        handleViewReview,
        handleDeleteReview,
        handlePageChange,
    } = useReview({ itemsPerPage: 8 });

    const columns = createReviewColumns({
        onDelete: handleDeleteReview,
        onView: handleViewReview,
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

            {/* Review Table with Pagination */}
            <DataTable
                data={reviews}
                columns={columns}
                title="Driver's Review"
                showSearch
                searchPlaceholder="Search drivers..."
                onSearch={handleSearch}
                emptyMessage="No reviews found"
                pagination={{
                    currentPage,
                    totalPages,
                    onPageChange: handlePageChange,
                }}
            />
        </div>
    );
}