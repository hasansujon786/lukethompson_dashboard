"use client";

import { useGetStatsQuery, useGetRevenueDataQuery, useGetPlanBreakdownQuery } from "@/lib/redux/features/dashboard/dashboardApi";

export const useDashboardStats = () => {
  const { data: stats, isLoading: isLoadingStats } = useGetStatsQuery();
  const { data: revenueData, isLoading: isLoadingRevenue } = useGetRevenueDataQuery();
  const { data: planBreakdown, isLoading: isLoadingPlans } = useGetPlanBreakdownQuery();

  const isLoading = isLoadingStats || isLoadingRevenue || isLoadingPlans;

  return {
    stats: stats || {
      totalUsers: 0,
      monthlyRevenue: 0,
      proSubscribers: 0,
      stopsToday: 0,
    },
    revenueData: revenueData || [],
    planBreakdown: planBreakdown || [],
    isLoading,
  };
};