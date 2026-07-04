import { api } from "../api/apiSlice";
import { Review } from "@/types";

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
    }),
});

export const {
    useGetReviewsQuery,
    useGetReviewQuery,
    useDeleteReviewMutation,
} = reviewsApi;