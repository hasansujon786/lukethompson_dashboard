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
