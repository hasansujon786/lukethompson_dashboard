import { api } from "../api/apiSlice";
import { DashboardStats, RevenueData, PlanBreakdown } from "@/types";

export const dashboardApi = api.injectEndpoints({
    endpoints: (builder) => ({
        getStats: builder.query<DashboardStats, void>({
            query: () => ({
                url: "/dashboard/stats",
                method: "GET",
            }),
            providesTags: ["Dashboard"],
        }),

        getRevenueData: builder.query<RevenueData[], void>({
            query: () => ({
                url: "/dashboard/revenue",
                method: "GET",
            }),
            providesTags: ["Dashboard"],
        }),

        getPlanBreakdown: builder.query<PlanBreakdown[], void>({
            query: () => ({
                url: "/dashboard/plans",
                method: "GET",
            }),
            providesTags: ["Dashboard"],
        }),
    }),
});

export const {
    useGetStatsQuery,
    useGetRevenueDataQuery,
    useGetPlanBreakdownQuery,
} = dashboardApi;