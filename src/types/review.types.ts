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
