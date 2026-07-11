export interface Review {
    id: string;
    driverName: string;
    driverAvatar?: string;
    email: string;
    facilityName: string;
    rating: number;
    comment: string;
    review: string;
    date: string;
    status: "Pending" | "Approved" | "Rejected";
}

export interface ShipperRating {
    id: string;
    shipper_facility_id: string;
    shipper_facility_name: string;
    rate: number;
    review: string;
    created_at: string;
    user: {
        id: string;
        name: string;
        email: string;
        avatar?: string;
    };
}

export interface ShipperStats {
    total_users: number;
    total_reviews: number;
    total_facilities: number;
}

export interface ShipperStatsResponse {
    success: boolean;
    message: string;
    data: ShipperStats;
}

