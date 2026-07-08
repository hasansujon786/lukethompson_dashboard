import { api } from "../api/apiSlice";
import { Review, ShipperStatsResponse } from "@/types";

export const reviewsApi = api.injectEndpoints({
    endpoints: (builder) => ({
        getReviews: builder.query<Review[], { page?: number; limit?: number; search?: string }>({
            query: (params) => ({
                url: "/reviews",
                method: "GET",
                params,
            }),
            providesTags: ["Reviews"],
        }),

        getReview: builder.query<Review, string>({
            query: (id) => ({
                url: `/reviews/${id}`,
                method: "GET",
            }),
            providesTags: ["Reviews"],
        }),

        deleteReview: builder.mutation<void, string>({
            query: (id) => ({
                url: `/reviews/${id}`,
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