import { Trash2 } from 'lucide-react';
import Image from 'next/image';
import { Review } from '@/types';

interface ReviewTableColumnsConfig {
    onDelete: (review: Review) => void;
    onView?: (review: Review) => void;
}

export const createReviewColumns = ({ onDelete, onView }: ReviewTableColumnsConfig) => [
    {
        key: 'driver',
        header: "Driver's Name",
        render: (review: Review) => (
            <div className="flex items-center gap-3">
                <div className="relative h-12 w-12 overflow-hidden rounded-lg">
                    <Image
                        src={review.driverAvatar || '/Avatar.png'}
                        alt={review.driverName}
                        fill
                        className="object-cover"
                        sizes="48px"
                    />
                </div>
                <span className="text-sm font-normal text-white">{review.driverName}</span>
            </div>
        ),
        className: 'min-w-[200px]',
    },
    {
        key: 'email',
        header: 'Email',
        render: (review: Review) => (
            <span className="text-sm text-white-secondary">{review.email}</span>
        ),
    },
    {
        key: 'facility',
        header: 'Facility Name',
        render: (review: Review) => (
            <span className="text-sm text-white-secondary">{review.facilityName}</span>
        ),
    },
    {
        key: 'review',
        header: 'Review',
        render: (review: Review) => (
            <span className="text-sm text-white-secondary">{review.review}</span>
        ),
    },
    {
        key: 'actions',
        header: 'Action',
        render: (review: Review) => (
            <div className="flex items-center gap-2">
                <button
                    onClick={() => onDelete(review)}
                    className="rounded p-2 text-[#8DA2B8] hover:bg-error-red/10 hover:text-error-red transition-colors"
                >
                    <Trash2 size={20} />
                </button>
            </div>
        ),
        className: 'text-center w-[80px]',
    },
];