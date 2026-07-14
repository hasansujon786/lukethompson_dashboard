"use client";

import { useGetStatsQuery, useGetRevenueDataQuery, useGetPlanBreakdownQuery } from "@/lib/redux/features/dashboard/dashboardApi";
import { DashboardStats, RevenueData, PlanBreakdown, StatsSummaryResponse, RevenueChartItem, PlanStatsResponse } from "@/types";

export const useDashboardStats = () => {
  const { data: statsResponse, isLoading: isLoadingStats } = useGetStatsQuery();
  const { data: revenueResponse, isLoading: isLoadingRevenue } = useGetRevenueDataQuery({ year: new Date().getFullYear().toString() });
  const { data: planResponse, isLoading: isLoadingPlans } = useGetPlanBreakdownQuery();

  // Transform stats response to match component expectations
  const stats: DashboardStats = {
    totalUsers: statsResponse?.total_user || 0,
    monthlyRevenue: parseFloat(statsResponse?.monthly_revenue || "0"),
    proSubscribers: statsResponse?.pro_subscriber || 0,
    stopsToday: statsResponse?.stops_today || 0,
  };

  // Transform revenue data: convert string revenue to number
  const revenueData: RevenueData[] = (revenueResponse || []).map((item: RevenueChartItem) => ({
    month: item.month,
    revenue: parseFloat(item.revenue || "0"),
  }));

  // Transform plan breakdown to match component expectations
  const planBreakdown: PlanBreakdown[] = (planResponse?.plans || []).map((item, index) => ({
    name: item.plan,
    value: item.count,
    color: ["#00E676", "#3B82F6", "#F59E0B", "#EF4444", "#8B5CF6"][index % 5],
    subscribers: item.count,
  }));

  const isLoading = isLoadingStats || isLoadingRevenue || isLoadingPlans;

  return {
    stats,
    revenueData,
    planBreakdown,
    isLoading,
  };
};