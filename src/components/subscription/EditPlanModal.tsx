'use client';

import { useState, useEffect } from 'react';
import { Modal } from '@/components/ui/Modal';
import { FormInput } from '@/components/ui/FormInput';
import { FormDropdown } from '@/components/ui/FormDropdown';
import { Button } from '@/components/ui/Button';
import { SubscriptionPlan, SubscriptionFeature } from '@/types/subscription.types';
import { TrashIcon } from '@/components/ui/icons/TrashIcon';
import toast from 'react-hot-toast';

interface EditPlanModalProps {
    editingPlan: SubscriptionPlan | null;
    isAdding: boolean;
    handleCloseEdit: () => void;
    onSuccess: (message: string) => void;
    availableFeatures: SubscriptionFeature[];
    handleCreatePlan: (data: Record<string, unknown>) => Promise<SubscriptionPlan>;
    handleUpdatePlan: (id: string, data: Record<string, unknown>) => Promise<SubscriptionPlan>;
}

interface FeatureSelection {
    feature_id: string;
    name: string;
    key: string;
    type: string;
    enabled: boolean;
    limit_value: number | null;
}

interface CustomFeature {
    id: string;
    name: string;
    limit_value: number | null;
}

let customFeatureCounter = 0;

export const EditPlanModal = ({
    editingPlan,
    isAdding,
    handleCloseEdit,
    onSuccess,
    availableFeatures,
    handleCreatePlan,
    handleUpdatePlan,
}: EditPlanModalProps) => {
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [price, setPrice] = useState('');
    const [currency, setCurrency] = useState('USD');
    const [interval, setInterval] = useState('MONTHLY');
    const [status, setStatus] = useState('ACTIVE');
    const [sortOrder, setSortOrder] = useState('');
    const [appleProductId, setAppleProductId] = useState('');
    const [googleProductId, setGoogleProductId] = useState('');
    const [featureSelections, setFeatureSelections] = useState<FeatureSelection[]>([]);
    const [customFeatures, setCustomFeatures] = useState<CustomFeature[]>([]);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const isOpen = !!editingPlan || isAdding;
    const isEditing = !!editingPlan;

    useEffect(() => {
        if (editingPlan) {
            setName(editingPlan.name);
            setDescription(editingPlan.description);
            setPrice(editingPlan.price.toString());
            setCurrency(editingPlan.currency);
            setInterval(editingPlan.interval);
            setStatus(editingPlan.status);
            setSortOrder(editingPlan.sort_order.toString());
            setAppleProductId(editingPlan.apple_product_id || '');
            setGoogleProductId(editingPlan.google_product_id || '');

            const selections: FeatureSelection[] = availableFeatures.map((f: SubscriptionFeature) => {
                const existingFeature = editingPlan.features.find(pf => pf.id === f.id);
                return {
                    feature_id: f.id,
                    name: f.name,
                    key: f.key,
                    type: f.type,
                    enabled: existingFeature ? existingFeature.enabled : false,
                    limit_value: existingFeature ? existingFeature.limit_value : null,
                };
            });
            setFeatureSelections(selections);

            const planFeatureIds = new Set(availableFeatures.map(f => f.id));
            const extraFeatures = editingPlan.features
                .filter(pf => !planFeatureIds.has(pf.id))
                .map(pf => ({
                    id: `custom_${++customFeatureCounter}`,
                    name: pf.name,
                    limit_value: pf.limit_value,
                }));
            setCustomFeatures(extraFeatures);
        } else if (isAdding) {
            setName('');
            setDescription('');
            setPrice('');
            setCurrency('USD');
            setInterval('MONTHLY');
            setStatus('ACTIVE');
            setSortOrder('');
            setAppleProductId('');
            setGoogleProductId('');

            const selections: FeatureSelection[] = availableFeatures.map((f: SubscriptionFeature) => ({
                feature_id: f.id,
                name: f.name,
                key: f.key,
                type: f.type,
                enabled: false,
                limit_value: f.type === 'LIMIT' ? 0 : null,
            }));
            setFeatureSelections(selections);
            setCustomFeatures([]);
        }
    }, [editingPlan, isAdding, availableFeatures]);

    const handleFeatureToggle = (featureId: string, enabled: boolean) => {
        setFeatureSelections(prev =>
            prev.map(f =>
                f.feature_id === featureId
                    ? { ...f, enabled, limit_value: enabled && f.type === 'LIMIT' ? (f.limit_value || 0) : f.limit_value }
                    : f
            )
        );
    };

    const handleLimitValueChange = (featureId: string, value: string) => {
        const numValue = value === '' ? null : parseInt(value, 10);
        setFeatureSelections(prev =>
            prev.map(f =>
                f.feature_id === featureId
                    ? { ...f, limit_value: numValue }
                    : f
            )
        );
    };

    const handleAddCustomFeature = () => {
        const newFeature: CustomFeature = {
            id: `custom_${++customFeatureCounter}`,
            name: '',
            limit_value: null,
        };
        setCustomFeatures(prev => [...prev, newFeature]);
    };

    const handleCustomFeatureChange = (id: string, field: keyof CustomFeature, value: string | number | null) => {
        setCustomFeatures(prev =>
            prev.map(f =>
                f.id === id ? { ...f, [field]: value } : f
            )
        );
    };

    const handleRemoveCustomFeature = (id: string) => {
        setCustomFeatures(prev => prev.filter(f => f.id !== id));
    };

    const handleSave = async () => {
        if (!name.trim()) {
            toast.error('Plan name is required');
            return;
        }
        if (!isEditing && !price) {
            toast.error('Price is required');
            return;
        }

        setIsSubmitting(true);

        try {
            const featuresPayload = featureSelections
                .filter(f => f.enabled)
                .map(f => ({
                    feature_id: f.feature_id,
                    enabled: f.enabled,
                    ...(f.type === 'LIMIT' && f.limit_value !== null ? { limit_value: f.limit_value } : {}),
                }));

            const customFeaturesPayload = customFeatures
                .filter(f => f.name.trim())
                .map(f => ({
                    feature_name: f.name.trim(),
                    feature_type: 'LIMIT',
                    enabled: true,
                    ...(f.limit_value !== null ? { limit_value: f.limit_value } : {}),
                }));

            const allFeatures = [...featuresPayload, ...customFeaturesPayload];

            if (isEditing) {
                const payload: Record<string, unknown> = {
                    name: name.trim(),
                    slug: editingPlan.slug,
                    description: description.trim(),
                    currency,
                    status,
                    sort_order: sortOrder ? parseInt(sortOrder, 10) : 0,
                    ...(appleProductId ? { apple_product_id: appleProductId } : {}),
                    ...(googleProductId ? { google_product_id: googleProductId } : {}),
                    features: allFeatures,
                };

                await handleUpdatePlan(editingPlan.id, payload);
                handleCloseEdit();
                onSuccess('Subscription plan has been successfully updated!');
            } else {
                const payload: Record<string, unknown> = {
                    name: name.trim(),
                    description: description.trim(),
                    price: parseFloat(price),
                    currency,
                    interval,
                    status,
                    sort_order: sortOrder ? parseInt(sortOrder, 10) : 0,
                    features: allFeatures,
                };

                await handleCreatePlan(payload);
                handleCloseEdit();
                onSuccess('New subscription plan has been successfully created!');
            }
        } catch {
            // Error is already handled in the hook
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <Modal isOpen={isOpen} onClose={handleCloseEdit} size="xl" className="!px-0">
            <div className="flex flex-col gap-4 sm:gap-6 max-h-[80vh] sm:max-h-[85vh] overflow-y-auto -mx-6 px-4 sm:px-6">
                {/* Heading */}
                <div className="flex flex-col items-center gap-1 sm:gap-2 pt-2">
                    <h1 className="text-xl sm:text-2xl font-bold text-white text-center">
                        {isAdding ? 'Add New Plan' : `Edit ${editingPlan?.name}`}
                    </h1>
                    <p className="text-xs sm:text-sm font-medium text-white-secondary text-center">
                        {isAdding
                            ? 'Create a custom subscription plan for your members'
                            : 'Update your subscription plan details'}
                    </p>
                </div>

                {/* Form Fields - Row 1 */}
                <div className="flex flex-col sm:flex-row gap-3 sm:gap-6">
                    <div className="flex-1 min-w-0">
                        <FormInput
                            label="Plan Name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            placeholder="Enter plan name"
                        />
                    </div>
                    <div className="flex-1 min-w-0">
                        <FormInput
                            label="Sort Order"
                            type="number"
                            value={sortOrder}
                            onChange={(e) => setSortOrder(e.target.value)}
                            placeholder="Enter sort order"
                        />
                    </div>
                </div>

                {/* Form Fields - Row 2 */}
                <div className="flex flex-col sm:flex-row gap-3 sm:gap-6">
                    {!isEditing && (
                        <div className="flex-1 min-w-0">
                            <FormInput
                                label="Set Price"
                                type="number"
                                step="0.01"
                                value={price}
                                onChange={(e) => setPrice(e.target.value)}
                                placeholder="Enter price"
                            />
                        </div>
                    )}

                    {!isEditing && (
                        <div className="flex-1 min-w-0">
                            <FormDropdown
                                label="Interval"
                                options={['MONTHLY', 'YEARLY', 'WEEKLY']}
                                value={interval}
                                onChange={setInterval}
                            />
                        </div>
                    )}

                    <div className="flex-1 min-w-0">
                        <FormDropdown
                            label="Currency"
                            options={['USD', 'EUR', 'GBP', 'CAD', 'AUD']}
                            value={currency}
                            onChange={setCurrency}
                        />
                    </div>

                    <div className="flex-1 min-w-0">
                        <FormDropdown
                            label="Status"
                            options={['ACTIVE', 'INACTIVE']}
                            value={status}
                            onChange={setStatus}
                        />
                    </div>
                </div>

                {/* Description */}
                <FormInput
                    label="Description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="Enter description"
                    height="72px"
                />

                {/* Features from API */}
                {featureSelections.length > 0 && (
                    <div className="flex flex-col gap-2">
                        <label className="text-sm sm:text-base font-bold text-white">Features</label>
                        <div className="flex flex-col gap-2 sm:gap-3 max-h-[180px] sm:max-h-[250px] overflow-y-auto pr-1 sm:pr-2">
                            {featureSelections.map((feature) => (
                                <div
                                    key={feature.feature_id}
                                    className="flex flex-col sm:flex-row items-start sm:items-center gap-2 sm:gap-3 rounded border border-white/5 bg-white/8 px-3 sm:px-4 py-2 sm:py-3"
                                >
                                    <div className="flex items-center gap-3 w-full sm:flex-1">
                                        <input
                                            id={`feature-${feature.feature_id}`}
                                            type="checkbox"
                                            checked={feature.enabled}
                                            onChange={(e) => handleFeatureToggle(feature.feature_id, e.target.checked)}
                                            className="appearance-none w-4 h-4 min-w-[16px] rounded border border-white/30 bg-transparent checked:bg-[#00E676] checked:border-[#00E676] cursor-pointer"
                                        />
                                        <label
                                            htmlFor={`feature-${feature.feature_id}`}
                                            className="text-xs sm:text-sm text-white-secondary cursor-pointer flex-1"
                                        >
                                            {feature.name}
                                            {feature.type === 'LIMIT' && (
                                                <span className="ml-2 text-[10px] sm:text-xs text-white/40">(Limit type)</span>
                                            )}
                                        </label>
                                    </div>

                                    {feature.type === 'LIMIT' && feature.enabled && (
                                        <div className="flex items-center gap-2 w-full sm:w-auto pl-7 sm:pl-0">
                                            <label className="text-[10px] sm:text-xs text-white-secondary whitespace-nowrap">Limit:</label>
                                            <input
                                                type="number"
                                                min={0}
                                                value={feature.limit_value ?? ''}
                                                onChange={(e) => handleLimitValueChange(feature.feature_id, e.target.value)}
                                                placeholder="Unlimited"
                                                className="w-full sm:w-20 rounded border border-white/5 bg-white/8 px-3 py-1.5 sm:py-2 text-xs sm:text-sm text-white placeholder:text-white-secondary focus:outline-none focus:ring-1 focus:ring-green-success"
                                            />
                                        </div>
                                    )}
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {/* Custom Features */}
                {customFeatures.length > 0 && (
                    <div className="flex flex-col gap-2">
                        <label className="text-sm sm:text-base font-bold text-white">Custom Features</label>
                        <div className="flex flex-col gap-2 sm:gap-3 max-h-[150px] sm:max-h-[200px] overflow-y-auto pr-1 sm:pr-2">
                            {customFeatures.map((feature) => (
                                <div
                                    key={feature.id}
                                    className="flex flex-col sm:flex-row items-start sm:items-center gap-2 sm:gap-3 rounded border border-white/5 bg-white/8 px-3 sm:px-4 py-2 sm:py-3"
                                >
                                    <input
                                        type="text"
                                        value={feature.name}
                                        onChange={(e) => handleCustomFeatureChange(feature.id, 'name', e.target.value)}
                                        placeholder="Feature name"
                                        className="w-full sm:flex-1 rounded border border-white/5 bg-white/8 px-3 py-1.5 sm:py-2 text-xs sm:text-sm text-white placeholder:text-white-secondary focus:outline-none focus:ring-1 focus:ring-green-success"
                                    />

                                    <div className="flex items-center gap-2 w-full sm:w-auto">
                                        <span className="text-[10px] sm:text-xs text-white/60 rounded border border-white/5 bg-white/8 px-2 sm:px-3 py-1.5 sm:py-2 whitespace-nowrap">
                                            Limit type
                                        </span>

                                        <input
                                            type="number"
                                            min={0}
                                            value={feature.limit_value ?? ''}
                                            onChange={(e) => handleCustomFeatureChange(feature.id, 'limit_value', e.target.value ? parseInt(e.target.value, 10) : null)}
                                            placeholder="Limit"
                                            className="w-full sm:w-20 rounded border border-white/5 bg-white/8 px-3 py-1.5 sm:py-2 text-xs sm:text-sm text-white placeholder:text-white-secondary focus:outline-none focus:ring-1 focus:ring-green-success"
                                        />

                                        <button
                                            onClick={() => handleRemoveCustomFeature(feature.id)}
                                            className="rounded p-1 text-white-secondary hover:bg-red-500/20 hover:text-red-400 transition-colors shrink-0"
                                        >
                                            <TrashIcon />
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {/* Add Feature Button */}
                <button
                    type="button"
                    onClick={handleAddCustomFeature}
                    className="flex items-center justify-center gap-2 rounded-lg border border-dashed border-white/20 bg-white/5 px-4 py-2.5 sm:py-3 text-xs sm:text-sm text-white-secondary hover:bg-white/10 hover:text-white transition-colors"
                >
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="sm:w-4 sm:h-4">
                        <path d="M12 5v14M5 12h14" />
                    </svg>
                    Add More Features
                </button>

                {/* Buttons */}
                <div className="flex gap-3 sm:gap-4 pt-1 sm:pt-2 pb-2">
                    <Button
                        variant="secondary"
                        size="lg"
                        className="w-full text-white hover:bg-white/10 border-white/50 text-xs sm:text-sm py-3 sm:py-4"
                        onClick={handleCloseEdit}
                        disabled={isSubmitting}
                    >
                        Cancel
                    </Button>

                    <Button
                        variant="default"
                        size="lg"
                        className="w-full text-white hover:bg-green-success/80 text-xs sm:text-sm py-3 sm:py-4"
                        onClick={handleSave}
                        disabled={isSubmitting}
                    >
                        {isSubmitting ? 'Saving...' : isAdding ? 'Create Plan' : 'Save Changes'}
                    </Button>
                </div>
            </div>
        </Modal>
    );
};