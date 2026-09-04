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

        banUser: builder.mutation<{ success: boolean; message: string }, string>({
            query: (id) => ({
                url: `/admin/users/${id}/ban`,
                method: "PATCH",
            }),
            invalidatesTags: ["Users"],
        }),

        unbanUser: builder.mutation<{ success: boolean; message: string }, string>({
            query: (id) => ({
                url: `/admin/users/${id}/unban`,
                method: "PATCH",
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

        deleteUser: builder.mutation<{ success: boolean; message: string }, string>({
            query: (id) => ({
                url: `/admin/users/${id}`,
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

        toggleFoundingMemberStatus: builder.mutation<{ success: boolean; message: string; data: User }, string>({
            query: (id) => ({
                url: `/admin/users/${id}/founding-member`,
                method: "PATCH",
            }),
            invalidatesTags: ["Users"],
        }),
    }),
});

export const {
    useGetUsersQuery,
    useGetUserQuery,
    useBanUserMutation,
    useUnbanUserMutation,
    useApproveUserMutation,
    useDeleteUserMutation,
    useGetUserStopLogsQuery,
    useToggleFoundingMemberStatusMutation
} = usersApi;
