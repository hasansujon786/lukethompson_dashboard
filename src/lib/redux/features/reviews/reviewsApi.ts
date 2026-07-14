import { api } from "../api/apiSlice";
import { ShipperRating, ShipperStatsResponse, ApiPaginatedResponse } from "@/types";

export const reviewsApi = api.injectEndpoints({
    endpoints: (builder) => ({
        getReviews: builder.query<ApiPaginatedResponse<ShipperRating>, { page?: number; limit?: number; search?: string }>({
            query: (params) => ({
                url: "/admin/shipper/ratings",
                method: "GET",
                params,
            }),
            providesTags: ["Reviews"],
        }),

        getReview: builder.query<{ success: boolean; message: string; data: ShipperRating }, string>({
            query: (id) => ({
                url: `/admin/shipper/ratings/${id}`,
                method: "GET",
            }),
            providesTags: ["Reviews"],
        }),

        deleteReview: builder.mutation<{ success: boolean; message: string }, string>({
            query: (id) => ({
                url: `/admin/shipper/ratings/${id}`,
                method: "DELETE",
            }),
            invalidatesTags: ["Reviews"],
        }),

        getShipperStats: builder.query<ShipperStatsResponse, void>({
            query: () => ({
                url: "/admin/shipper/stats",
                method: "GET",
            }),
            providesTags: ["Reviews"],
        }),
    }),
});

export const {
    useGetReviewsQuery,
    useGetReviewQuery,
    useDeleteReviewMutation,
    useGetShipperStatsQuery,
} = reviewsApi;