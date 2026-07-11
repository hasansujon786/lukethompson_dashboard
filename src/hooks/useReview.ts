"use client";

import { useState, useCallback } from "react";
import { useGetReviewsQuery, useDeleteReviewMutation } from "@/lib/redux/features/reviews/reviewsApi";
import { ShipperRating } from "@/types";
import toast from "react-hot-toast";

interface UseReviewOptions {
    itemsPerPage?: number;
}

export const useReview = ({ itemsPerPage = 8 }: UseReviewOptions = {}) => {
    const [searchQuery, setSearchQuery] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const [selectedReview, setSelectedReview] = useState<ShipperRating | null>(null);
    const [deleteTarget, setDeleteTarget] = useState<ShipperRating | null>(null);

    const { data, isLoading, refetch } = useGetReviewsQuery({
        page: currentPage,
        limit: itemsPerPage,
        search: searchQuery || undefined,
    });

    const [deleteReviewMutation] = useDeleteReviewMutation();

    const reviews = data?.data || [];
    const totalReviews = data?.meta_data?.total || 0;
    const totalPages = Math.ceil(totalReviews / itemsPerPage);

    const handleSearch = useCallback((query: string) => {
        setSearchQuery(query);
        setCurrentPage(1);
    }, []);

    const handleViewReview = useCallback((review: ShipperRating) => {
        setSelectedReview(review);
    }, []);

    const handleCloseDetail = useCallback(() => {
        setSelectedReview(null);
    }, []);

    const handleDeleteReview = useCallback(async (review: ShipperRating) => {
        setDeleteTarget(review);
    }, []);

    const handleConfirmDelete = useCallback(async (review: ShipperRating) => {
        try {
            await deleteReviewMutation(review.id).unwrap();
            toast.success(`${review.user?.name || "Shipper"}'s review deleted`);
            setDeleteTarget(null);
            refetch();
        } catch (err) {
            toast.error("Failed to delete review");
        }
    }, [deleteReviewMutation, refetch]);

    const handleCancelDelete = useCallback(() => {
        setDeleteTarget(null);
    }, []);

    const handlePageChange = useCallback((page: number) => {
        setCurrentPage(page);
    }, []);

    return {
        reviews,
        filteredTotal: totalReviews,
        searchQuery,
        currentPage,
        totalPages,
        selectedReview,
        deleteTarget,
        isLoading,
        handleSearch,
        handleViewReview,
        handleCloseDetail,
        handleDeleteReview,
        handleConfirmDelete,
        handleCancelDelete,
        handlePageChange,
    };
};