import { api } from "../api/apiSlice";
import { DashboardStats, RevenueData, PlanBreakdown } from "@/types";

interface RevenueChartItem {
    month: string;
    revenue: string;
}

interface PlanStatItem {
    plan: string;
    count: number;
}

interface PlanStatsResponse {
    total_users: number;
    plans: PlanStatItem[];
}

interface StatsSummaryResponse {
    total_user: number;
    monthly_revenue: string;
    pro_subscriber: number;
    stops_today: number;
}

export const dashboardApi = api.injectEndpoints({
    endpoints: (builder) => ({
        getStats: builder.query<StatsSummaryResponse, void>({
            query: () => ({
                url: "/admin/overview/stats-summary",
                method: "GET",
            }),
            transformResponse: (response: { data: StatsSummaryResponse }) => response.data,
            providesTags: ["Dashboard"],
        }),

        getRevenueData: builder.query<RevenueChartItem[], { year: string }>({
            query: (params) => ({
                url: `/admin/overview/revenue-chart?year=${params.year}`,
                method: "GET",
            }),
            transformResponse: (response: { data: RevenueChartItem[] }) => response.data,
            providesTags: ["Dashboard"],
        }),

        getPlanBreakdown: builder.query<PlanStatsResponse, void>({
            query: () => ({
                url: "/admin/overview/user-plan-stats",
                method: "GET",
            }),
            transformResponse: (response: { data: PlanStatsResponse }) => response.data,
            providesTags: ["Dashboard"],
        }),
    }),
});

export const {
    useGetStatsQuery,
    useGetRevenueDataQuery,
    useGetPlanBreakdownQuery,
} = dashboardApi;