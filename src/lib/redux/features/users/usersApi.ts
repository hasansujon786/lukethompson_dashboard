import { api } from "../api/apiSlice";
import { User, ApiPaginatedResponse, UsersQueryParams, StopLogsResponse, StopLogsQueryParams } from "@/types";

export const usersApi = api.injectEndpoints({
    endpoints: (builder) => ({
        getUsers: builder.query<ApiPaginatedResponse<User>, UsersQueryParams>({
            query: (params) => ({
                url: "/admin/users",
                method: "GET",
                params,
            }),
            providesTags: ["Users"],
        }),

        getUser: builder.query<{ success: boolean; message: string; data: User }, string>({
            query: (id) => ({
                url: `/admin/users/${id}`,
                method: "GET",
            }),
            providesTags: ["Users"],
        }),

        banUser: builder.mutation<User, string>({
            query: (id) => ({
                url: `/admin/user/${id}/ban`,
                method: "POST",
            }),
            invalidatesTags: ["Users"],
        }),

        approveUser: builder.mutation<User, string>({
            query: (id) => ({
                url: `/admin/user/${id}/approve`,
                method: "POST",
            }),
            invalidatesTags: ["Users"],
        }),

        deleteUser: builder.mutation<void, string>({
            query: (id) => ({
                url: `/admin/user/${id}`,
                method: "DELETE",
            }),
            invalidatesTags: ["Users"],
        }),

        getUserStopLogs: builder.query<StopLogsResponse, { userId: string; params?: StopLogsQueryParams }>({
            query: ({ userId, params }) => ({
                url: `/admin/stoplog/user/${userId}`,
                method: "GET",
                params,
            }),
            providesTags: ["Users"],
        }),
    }),
});

export const {
    useGetUsersQuery,
    useGetUserQuery,
    useBanUserMutation,
    useApproveUserMutation,
    useDeleteUserMutation,
    useGetUserStopLogsQuery,
} = usersApi;
