"use client";

import { useState } from "react";
import { useGetPlansQuery, useGetSubscriptionStatsQuery, useDeletePlanMutation } from "@/lib/redux/features/subscription/subscriptionApi";
import { SubscriptionPlan } from "@/types";
import toast from "react-hot-toast";

export const useSubscription = () => {
    const { data: plans = [], isLoading: isLoadingPlans, refetch: refetchPlans } = useGetPlansQuery();
    const { data: stats, isLoading: isLoadingStats } = useGetSubscriptionStatsQuery();
    const [deletePlanMutation] = useDeletePlanMutation();

    const [deleteTarget, setDeleteTarget] = useState<SubscriptionPlan | null>(null);
    const [editingPlan, setEditingPlan] = useState<SubscriptionPlan | null>(null);
    const [isAddingPlan, setIsAddingPlan] = useState(false);
    const [successMessage, setSuccessMessage] = useState("");

    const isLoading = isLoadingPlans || isLoadingStats;

    const handleEditPlan = (plan: SubscriptionPlan) => {
        setEditingPlan(plan);
        setIsAddingPlan(false);
    };

    const handleCloseEdit = () => {
        setEditingPlan(null);
        setIsAddingPlan(false);
    };

    const handleAddPlan = () => {
        setIsAddingPlan(true);
        setEditingPlan(null);
    };

    const handleDeleteClick = (plan: SubscriptionPlan) => {
        setDeleteTarget(plan);
    };

    const handleDeleteConfirm = async (plan: SubscriptionPlan) => {
        try {
            await deletePlanMutation(plan.id).unwrap();
            setDeleteTarget(null);
            toast.success(`${plan.name} deleted`);
            refetchPlans();
        } catch (err) {
            toast.error("Failed to delete plan");
        }
    };

    const handleDeleteCancel = () => {
        setDeleteTarget(null);
    };

    const handleShowSuccess = (message: string) => {
        setSuccessMessage(message);
    };

    const handleCloseSuccess = () => {
        setSuccessMessage("");
    };

    return {
        plans,
        stats: stats || {
            totalSubscribers: 0,
            activePlans: 0,
            monthlyRevenue: 0,
            conversionRate: 0,
        },
        isLoading,
        deleteTarget,
        editingPlan,
        isAddingPlan,
        successMessage,
        handleEditPlan,
        handleCloseEdit,
        handleAddPlan,
        handleDeleteClick,
        handleDeleteConfirm,
        handleDeleteCancel,
        handleShowSuccess,
        handleCloseSuccess,
    };
};