"use client";

import { useState, useCallback } from "react";
import {
    useGetPlansQuery,
    useGetFeaturesQuery,
    useGetSubscriptionStatsQuery,
    useCreatePlanMutation,
    useUpdatePlanMutation,
    useDeletePlanMutation,
} from "@/lib/redux/features/subscription/subscriptionApi";
import { SubscriptionPlan, SubscriptionFeature } from "@/types";
import toast from "react-hot-toast";

export const useSubscription = () => {
    const { data: plans = [], isLoading: isLoadingPlans, refetch: refetchPlans } = useGetPlansQuery();
    const { data: features = [], isLoading: isLoadingFeatures } = useGetFeaturesQuery();
    const { data: stats, isLoading: isLoadingStats } = useGetSubscriptionStatsQuery();
    const [createPlanMutation] = useCreatePlanMutation();
    const [updatePlanMutation] = useUpdatePlanMutation();
    const [deletePlanMutation] = useDeletePlanMutation();

    const [deleteTarget, setDeleteTarget] = useState<SubscriptionPlan | null>(null);
    const [editingPlan, setEditingPlan] = useState<SubscriptionPlan | null>(null);
    const [isAddingPlan, setIsAddingPlan] = useState(false);
    const [successMessage, setSuccessMessage] = useState("");

    const isLoading = isLoadingPlans || isLoadingStats || isLoadingFeatures;

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
            toast.success(`${plan.name} deleted successfully`);
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

    const handleCreatePlan = useCallback(async (data: Record<string, unknown>) => {
        try {
            const result = await createPlanMutation(data).unwrap();
            toast.success("Subscription plan created successfully");
            return result;
        } catch (err: unknown) {
            const error = err as { data?: { message?: string } };
            toast.error(error?.data?.message || "Failed to create plan");
            throw err;
        }
    }, [createPlanMutation]);

    const handleUpdatePlan = useCallback(async (id: string, data: Record<string, unknown>) => {
        try {
            const result = await updatePlanMutation({ id, data }).unwrap();
            toast.success("Subscription plan updated successfully");
            return result;
        } catch (err: unknown) {
            const error = err as { data?: { message?: string } };
            toast.error(error?.data?.message || "Failed to update plan");
            throw err;
        }
    }, [updatePlanMutation]);

    return {
        plans,
        features,
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
        handleCreatePlan,
        handleUpdatePlan,
    };
};