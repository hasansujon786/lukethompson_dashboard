"use client";

import { useState, useCallback } from "react";
import { useGetUserStopLogsQuery } from "@/lib/redux/features/users/usersApi";
import { StopLog, StopLogsQueryParams } from "@/types";

interface UseUserStopLogsOptions {
    limit?: number;
}

export const useUserStopLogs = (userId: string, { limit = 10 }: UseUserStopLogsOptions = {}) => {
    const [searchQuery, setSearchQuery] = useState("");
    const [statusFilter, setStatusFilter] = useState("ALL");
    const [cursor, setCursor] = useState<string | undefined>();

    const { data, isLoading, refetch } = useGetUserStopLogsQuery({
        userId,
        params: {
            cursor,
            limit,
            search: searchQuery || undefined,
            status: statusFilter !== "ALL" ? statusFilter : undefined,
        },
    });

    const stopLogs = data?.data || [];
    const nextCursor = data?.meta_data?.next_cursor || null;

    const handleSearch = useCallback((query: string) => {
        setSearchQuery(query);
        setCursor(undefined);
    }, []);

    const handleStatusChange = useCallback((status: string) => {
        setStatusFilter(status);
        setCursor(undefined);
    }, []);

    const handleLoadMore = useCallback(() => {
        if (nextCursor) {
            setCursor(nextCursor);
        }
    }, [nextCursor]);

    return {
        stopLogs,
        isLoading,
        hasMore: !!nextCursor,
        searchQuery,
        statusFilter,
        handleSearch,
        handleStatusChange,
        handleLoadMore,
        refetch,
    };
};