export interface SubscriptionFeature {
    id: string;
    key: string;
    name: string;
    description: string;
    type: 'BOOLEAN' | 'LIMIT';
    unit: string | null;
    reset_period: 'MONTHLY' | 'NEVER';
    is_active: boolean;
    sort_order: number;
    created_at: string;
    updated_at: string;
}

export interface PlanFeatureMapping {
    id: string;
    key: string;
    name: string;
    description: string;
    type: 'BOOLEAN' | 'LIMIT';
    unit: string | null;
    limit_value: number | null;
    enabled: boolean;
}

export interface SubscriptionPlan {
    id: string;
    name: string;
    slug: string;
    description: string;
    price: number;
    currency: string;
    interval: 'MONTHLY' | 'YEARLY' | 'WEEKLY';
    status: 'ACTIVE' | 'INACTIVE';
    sort_order: number;
    product_id: string | null;
    price_id: string | null;
    apple_product_id: string | null;
    google_product_id: string | null;
    created_at: string;
    updated_at: string;
    features: PlanFeatureMapping[];
}

export interface CreatePlanPayload {
    name: string;
    slug: string;
    description: string;
    price: number;
    currency: string;
    interval: string;
    status: string;
    sort_order: number;
    apple_product_id?: string;
    google_product_id?: string;
    features: {
        feature_id: string;
        enabled: boolean;
        limit_value?: number | null;
    }[];
}

export interface UpdatePlanPayload {
    name?: string;
    slug?: string;
    description?: string;
    price?: number;
    currency?: string;
    interval?: string;
    status?: string;
    sort_order?: number;
    apple_product_id?: string;
    google_product_id?: string;
    features?: {
        feature_id: string;
        enabled: boolean;
        limit_value?: number | null;
    }[];
}

export interface SubscriptionStats {
    totalSubscribers: number;
    activePlans: number;
    monthlyRevenue: number;
    conversionRate: number;
}