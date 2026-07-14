import { TrashIcon } from '../ui/icons/TrashIcon';
import { FeatureItem } from './FeatureItem';
import { SubscriptionPlan } from '@/types/subscription.types';

interface PlanCardProps {
    plan: SubscriptionPlan;
    onEdit?: (plan: SubscriptionPlan) => void;
    onDelete: (plan: SubscriptionPlan) => void;
}

const INTERVAL_LABELS: Record<string, string> = {
    MONTHLY: '/month',
    YEARLY: '/year',
    WEEKLY: '/week',
};

export const PlanCard = ({ plan, onEdit, onDelete }: PlanCardProps) => {
    return (
        <div className="flex w-[271px] flex-col gap-4 rounded-2xl bg-form-bg p-5">
            {/* Header */}
            <div className="flex items-start justify-between">
                <div className="flex flex-col gap-2">
                    <div className="flex items-start justify-between">
                        <span className="inline-flex rounded-full bg-green-success/10 px-4 py-1 text-sm text-green-success">
                            {plan.name}
                        </span>
                    </div>
                    <p className="text-sm text-white-secondary">{plan.description}</p>
                </div>

                <div className='flex items-center justify-center h-full'>
                    <button onClick={() => onDelete(plan)} className="rounded p-1 text-white-secondary hover:bg-red-500/20">
                        <TrashIcon />
                    </button>
                </div>
            </div>

            {/* Price */}
            <div className="flex items-end gap-1">
                <span className="text-[32px] font-bold leading-none text-white">${plan.price}</span>
                <span className="text-sm text-white-secondary">{INTERVAL_LABELS[plan.interval] || '/month'}</span>
            </div>

            {/* Features */}
            <div className="flex flex-col gap-3 rounded-b-xl bg-form-bg">
                {plan.features.map((feature) => (
                    <FeatureItem
                        key={feature.id}
                        text={feature.name}
                        included={feature.enabled}
                    />
                ))}
            </div>

            {/* Edit Button */}
            <button
                onClick={() => onEdit?.(plan)}
                className="w-full rounded-lg bg-green-success px-4 py-2 text-sm font-medium text-white hover:bg-green-success/90 transition-colors"
            >
                Edit Plan
            </button>
        </div>
    );
};