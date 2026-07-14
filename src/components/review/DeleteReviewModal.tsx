"use client";

import { ShipperRating } from "@/types";

interface DeleteReviewModalProps {
    review: ShipperRating | null;
    isOpen: boolean;
    onClose: () => void;
    onConfirm: (review: ShipperRating) => void;
}

export const DeleteReviewModal = ({ review, isOpen, onClose, onConfirm }: DeleteReviewModalProps) => {
    if (!isOpen || !review) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            {/* Overlay */}
            <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={onClose} />

            {/* Modal */}
            <div className="relative flex w-full max-w-[452px] flex-col items-center gap-6 rounded-xl border border-border-light bg-form-bg px-6 pb-6 pt-8">
                {/* Top Section - SVG Image */}
                <div className="flex flex-col items-center gap-4">
                    <img
                        src="/delete-plan-modal.png"
                        alt="Delete review confirmation"
                        className="w-full"
                    />
                </div>

                {/* Buttons */}
                <div className="flex w-full gap-3">
                    <button
                        onClick={() => onConfirm(review)}
                        className="flex-1 rounded-[32px] bg-[#FF5C6C] px-4 py-2 text-sm text-white hover:bg-[#FF5C6C]/90 transition-colors"
                    >
                        Delete
                    </button>
                    <button
                        onClick={onClose}
                        className="flex-1 rounded-[32px] border border-white px-4 py-2 text-sm text-white hover:bg-white/5 transition-colors"
                    >
                        Cancel
                    </button>
                </div>
            </div>
        </div>
    );
};