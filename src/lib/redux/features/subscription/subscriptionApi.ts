import { api } from "../api/apiSlice";
import { SubscriptionPlan, SubscriptionStats } from "@/types";

export const subscriptionApi = api.injectEndpoints({
    endpoints: (builder) => ({
        getPlans: builder.query<SubscriptionPlan[], void>({
            query: () => ({
                url: "/subscription/plans",
                method: "GET",
            }),
            providesTags: ["Subscription"],
        }),

        getPlan: builder.query<SubscriptionPlan, string>({
            query: (id) => ({
                url: `/subscription/plans/${id}`,
                method: "GET",
            }),
            providesTags: ["Subscription"],
        }),

        createPlan: builder.mutation<SubscriptionPlan, Partial<SubscriptionPlan>>({
            query: (planData) => ({
                url: "/subscription/plans",
                method: "POST",
                body: planData,
            }),
            invalidatesTags: ["Subscription"],
        }),

        updatePlan: builder.mutation<SubscriptionPlan, { id: string; data: Partial<SubscriptionPlan> }>({
            query: ({ id, data }) => ({
                url: `/subscription/plans/${id}`,
                method: "PUT",
                body: data,
            }),
            invalidatesTags: ["Subscription"],
        }),

        deletePlan: builder.mutation<void, string>({
            query: (id) => ({
                url: `/subscription/plans/${id}`,
                method: "DELETE",
            }),
            invalidatesTags: ["Subscription"],
        }),

        getSubscriptionStats: builder.query<SubscriptionStats, void>({
            query: () => ({
                url: "/subscription/stats",
                method: "GET",
            }),
            providesTags: ["Subscription"],
        }),
    }),
});

export const {
    useGetPlansQuery,
    useGetPlanQuery,
    useCreatePlanMutation,
    useUpdatePlanMutation,
    useDeletePlanMutation,
    useGetSubscriptionStatsQuery,
} = subscriptionApi;
