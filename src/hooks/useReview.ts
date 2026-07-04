"use client";

import { useState } from "react";
import { useGetReviewsQuery, useDeleteReviewMutation } from "@/lib/redux/features/reviews/reviewsApi";
import { Review } from "@/types";
import toast from "react-hot-toast";

interface UseReviewOptions {
    itemsPerPage?: number;
}

export const useReview = ({ itemsPerPage = 8 }: UseReviewOptions = {}) => {
    const { data: reviews = [], isLoading, refetch } = useGetReviewsQuery({});
    const [deleteReviewMutation] = useDeleteReviewMutation();

    const [searchQuery, setSearchQuery] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const [selectedReview, setSelectedReview] = useState<Review | null>(null);

    const filteredReviews = reviews.filter(
        (review) =>
            review.driverName.toLowerCase().includes(searchQuery.toLowerCase()) ||
            review.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
            review.facilityName.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const totalPages = Math.ceil(filteredReviews.length / itemsPerPage);

    const paginatedReviews = filteredReviews.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
    );

    const handleSearch = (query: string) => {
        setSearchQuery(query);
        setCurrentPage(1);
    };

    const handleViewReview = (review: Review) => {
        setSelectedReview(review);
    };

    const handleCloseDetail = () => {
        setSelectedReview(null);
    };

    const handleDeleteReview = async (review: Review) => {
        try {
            await deleteReviewMutation(review.id).unwrap();
            toast.success(`${review.driverName}'s review deleted`);
        } catch (err) {
            toast.error("Failed to delete review");
        }
    };

    const handlePageChange = (page: number) => {
        setCurrentPage(page);
    };

    return {
        reviews: paginatedReviews,
        filteredTotal: filteredReviews.length,
        searchQuery,
        currentPage,
        totalPages,
        selectedReview,
        handleSearch,
        handleViewReview,
        handleCloseDetail,
        handleDeleteReview,
        handlePageChange,
    };
};