import { Trash2 } from 'lucide-react';
import Image from 'next/image';
import { ShipperRating } from '@/types';

interface ReviewTableColumnsConfig {
    onDelete: (rating: ShipperRating) => void;
    onView?: (rating: ShipperRating) => void;
}

export const getPayerStatus = (rate: number) => {
    if (rate >= 4.0) {
        return "Good Payer (80%+ pay rate)";
    } else if (rate >= 2.5) {
        return "Mixed Payer (50-70%+ pay rate)";
    } else {
        return "Poor Payer (Under 70%+ pay rate)";
    }
};

export const createReviewColumns = ({ onDelete, onView }: ReviewTableColumnsConfig) => [
    {
        key: 'driver',
        header: "Driver Name",
        render: (rating: ShipperRating) => (
            <div className="flex items-center gap-3">
                <div className="relative h-12 w-12 overflow-hidden rounded-lg">
                    <Image
                        src={rating.user?.avatar || '/Avatar.png'}
                        alt={rating.user?.name || 'Driver'}
                        fill
                        className="object-cover"
                        sizes="48px"
                    />
                </div>
                <span className="text-sm font-normal text-white">{rating.user?.name || 'N/A'}</span>
            </div>
        ),
        className: 'min-w-[200px]',
    },
    {
        key: 'email',
        header: 'Email',
        render: (rating: ShipperRating) => (
            <span className="text-sm text-white-secondary">{rating.user?.email || 'N/A'}</span>
        ),
    },
    {
        key: 'facility',
        header: 'Facility Name',
        render: (rating: ShipperRating) => (
            <span className="text-sm text-white-secondary">{rating.shipper_facility_name || 'N/A'}</span>
        ),
    },
    {
        key: 'review',
        header: 'Review',
        render: (rating: ShipperRating) => (
            <span className="text-sm text-white-secondary">{getPayerStatus(rating.rate)}</span>
        ),
    },
    {
        key: 'actions',
        header: 'Action',
        render: (rating: ShipperRating) => (
            <div className="flex items-center gap-2">
                <button
                    onClick={() => onDelete(rating)}
                    className="rounded p-2 text-[#8DA2B8] hover:bg-error-red/10 hover:text-error-red transition-colors"
                >
                    <Trash2 size={20} />
                </button>
            </div>
        ),
        className: 'text-center w-[80px]',
    },
];