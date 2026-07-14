import { api } from '../api/apiSlice';
import {
  SubscriptionPlan,
  SubscriptionFeature,
  SubscriptionStats,
  ApiResponse,
} from '@/types';

export const subscriptionApi = api.injectEndpoints({
  endpoints: builder => ({
    // Get all subscription plans
    getPlans: builder.query<SubscriptionPlan[], void>({
      query: () => ({
        url: '/admin/subscriptions/plans',
        method: 'GET',
      }),
      transformResponse: (response: ApiResponse<SubscriptionPlan[]>) =>
        response.data ?? [],
      providesTags: ['Subscription'],
    }),

    // Get single subscription plan
    getPlan: builder.query<SubscriptionPlan, string>({
      query: id => ({
        url: `/admin/subscriptions/plans/${id}`,
        method: 'GET',
      }),
      transformResponse: (response: ApiResponse<SubscriptionPlan>) =>
        response.data!,
      providesTags: ['Subscription'],
    }),

    // Create subscription plan
    createPlan: builder.mutation<SubscriptionPlan, Record<string, unknown>>({
      query: planData => ({
        url: '/admin/subscriptions/plans',
        method: 'POST',
        body: planData,
      }),
      transformResponse: (response: ApiResponse<SubscriptionPlan>) =>
        response.data!,
      invalidatesTags: ['Subscription'],
    }),

    // Update subscription plan (PATCH)
    updatePlan: builder.mutation<
      SubscriptionPlan,
      { id: string; data: Record<string, unknown> }
    >({
      query: ({ id, data }) => ({
        url: `/admin/subscriptions/plans/${id}`,
        method: 'PATCH',
        body: data,
      }),
      transformResponse: (response: ApiResponse<SubscriptionPlan>) =>
        response.data!,
      invalidatesTags: ['Subscription'],
    }),

    // Delete subscription plan
    deletePlan: builder.mutation<void, string>({
      query: id => ({
        url: `/admin/subscriptions/plans/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Subscription'],
    }),

    // Get all subscription features
    getFeatures: builder.query<SubscriptionFeature[], void>({
      query: () => ({
        url: '/admin/subscriptions/features',
        method: 'GET',
      }),
      transformResponse: (response: ApiResponse<SubscriptionFeature[]>) =>
        response.data ?? [],
      providesTags: ['Subscription'],
    }),

    // Get single subscription feature
    getFeature: builder.query<SubscriptionFeature, string>({
      query: id => ({
        url: `/admin/subscriptions/features/${id}`,
        method: 'GET',
      }),
      transformResponse: (response: ApiResponse<SubscriptionFeature>) =>
        response.data!,
      providesTags: ['Subscription'],
    }),

    // Get subscription stats
    getSubscriptionStats: builder.query<SubscriptionStats, void>({
      query: () => ({
        url: '/admin/subscriptions/stats',
        method: 'GET',
      }),
      providesTags: ['Subscription'],
    }),
  }),
});

export const {
  useGetPlansQuery,
  useGetPlanQuery,
  useCreatePlanMutation,
  useUpdatePlanMutation,
  useDeletePlanMutation,
  useGetFeaturesQuery,
  useGetFeatureQuery,
  useGetSubscriptionStatsQuery,
} = subscriptionApi;
