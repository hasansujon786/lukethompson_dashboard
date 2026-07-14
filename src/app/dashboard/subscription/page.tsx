'use client';

import { PlanCard } from '@/components/subscription/PlanCard';
import { AddPlanCard } from '@/components/subscription/AddPlanCard';
import { DeletePlanModal } from '@/components/subscription/DeletePlanModal';
import { EditPlanModal } from '@/components/subscription/EditPlanModal';
import { SuccessModal } from '@/components/subscription/SuccessModal';
import { useSubscription } from '@/hooks/useSubscription';

export default function SubscriptionPage() {
  const {
    plans,
    features,
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
  } = useSubscription();

  return (
    <div className="space-y-8 p-6">
      {/* Header */}
      <div className="flex flex-col gap-3">
        <h1 className="text-2xl font-bold text-white">Subscription Plans</h1>
        <p className="text-sm text-white-secondary">Manage pricing, features, and billing configuration</p>
      </div>

      {/* Plan Cards */}
      <div className="flex flex-wrap gap-6">
        {plans.map((plan) => (
          <PlanCard
            key={plan.id}
            plan={plan}
            onEdit={handleEditPlan}
            onDelete={handleDeleteClick}
          />
        ))}
        <AddPlanCard onClick={handleAddPlan} />
      </div>

      {/* Delete Confirmation Modal */}
      <DeletePlanModal
        plan={deleteTarget}
        isOpen={!!deleteTarget}
        onClose={handleDeleteCancel}
        onConfirm={handleDeleteConfirm}
      />

      {/* Edit / Add Plan Modal */}
      <EditPlanModal
        editingPlan={editingPlan}
        isAdding={isAddingPlan}
        handleCloseEdit={handleCloseEdit}
        onSuccess={handleShowSuccess}
        availableFeatures={features}
        handleCreatePlan={handleCreatePlan}
        handleUpdatePlan={handleUpdatePlan}
      />

      {/* Success Modal */}
      <SuccessModal
        isOpen={!!successMessage}
        onClose={handleCloseSuccess}
        message={successMessage}
      />
    </div>
  );
}