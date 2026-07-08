"use client";

import { DataTable } from "@/components/ui/DataTable";
import { StatsCard } from "@/components/dashboard/StatsCard";
import { UserManagementIcon } from "@/components/ui/icons/UserManagementIcon";
import { ReviewIcon } from "@/components/ui/icons/ReviewIcon";
import { createReviewColumns } from "@/config/review-table.config";
import { useReview } from "@/hooks/useReview";
import { useGetShipperStatsQuery } from "@/lib/redux/features/reviews/reviewsApi";

export default function ReviewPage() {
    const { data: statsData } = useGetShipperStatsQuery();
    const stats = statsData?.data;

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
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
                <StatsCard
                    title="Total Users"
                    value={(stats?.total_users ?? 0).toLocaleString()}
                    icon={<UserManagementIcon className="h-6 w-6 text-white" />}
                />
                <StatsCard
                    title="Total Reviews"
                    value={(stats?.total_reviews ?? 0).toLocaleString()}
                    icon={<ReviewIcon className="h-6 w-6 text-white" />}
                />
                <StatsCard
                    title="Total Facilities"
                    value={(stats?.total_facilities ?? 0).toLocaleString()}
                    icon={
                        <svg className="h-6 w-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                        </svg>
                    }
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