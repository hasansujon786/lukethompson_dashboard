"use client";

import { useState } from "react";
import Image from "next/image";
import { ArrowLeft, Search } from "lucide-react";
import { User } from "@/types";
import { Pagination } from "@/components/ui/Pagination";

interface ReviewDetailsViewProps {
    user: User;
    onBack: () => void;
}

const LOG_HEADERS = [
    "Location",
    "Arrival Time",
    "Dock In Time",
    "Complete Time",
    "Departure Time",
    "Detention Owned",
];

export const ReviewDetailsView = ({ user, onBack }: ReviewDetailsViewProps) => {
    const [searchQuery, setSearchQuery] = useState("");
    const [currentPage, setCurrentPage] = useState(1);

    // TODO: Add stop logs API integration
    const filteredLogs: any[] = [];
    const itemsPerPage = 7;
    const totalPages = 0;

    return (
        <div className="space-y-6 bg-form-bg rounded-2xl border border-border-light p-6">
            {/* Back Button & Header */}
            <div className="flex items-center gap-4">
                <button
                    onClick={onBack}
                    className="rounded-lg p-2 text-white-secondary hover:bg-white/10 hover:text-white transition-colors"
                >
                    <ArrowLeft size={20} />
                </button>
                <h1 className="text-2xl font-bold text-white font-liberation">
                    Driver Details
                </h1>
            </div>

            {/* User Profile */}
            <div className="flex items-center gap-4 px-6">
                <div className="relative h-16 w-16 overflow-hidden rounded-full">
                    <Image
                        src={user.avatar || "/Avatar.png"}
                        alt={user.name}
                        fill
                        className="object-cover"
                        sizes="64px"
                    />
                </div>
                <div>
                    <h2 className="text-lg font-semibold text-white">{user.name}</h2>
                    <p className="text-sm text-white-secondary">{user.email}</p>
                </div>
            </div>

            {/* Details Section */}
            <div className="rounded-xl border border-border-light p-6">
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    <div>
                        <label className="mb-1.5 block text-sm font-medium text-white-secondary">
                            Name
                        </label>
                        <div className="rounded-lg border border-border-light bg-white/5 px-3 py-2.5">
                            <span className="text-sm text-white">{user.name}</span>
                        </div>
                    </div>
                    <div>
                        <label className="mb-1.5 block text-sm font-medium text-white-secondary">
                            Email
                        </label>
                        <div className="rounded-lg border border-border-light bg-white/5 px-3 py-2.5">
                            <span className="text-sm text-white">{user.email}</span>
                        </div>
                    </div>
                    <div>
                        <label className="mb-1.5 block text-sm font-medium text-white-secondary">
                            Phone Number
                        </label>
                        <div className="rounded-lg border border-border-light bg-white/5 px-3 py-2.5">
                            <span className="text-sm text-white">{user.phone || "-"}</span>
                        </div>
                    </div>
                    <div>
                        <label className="mb-1.5 block text-sm font-medium text-white-secondary">
                            Join Date
                        </label>
                        <div className="rounded-lg border border-border-light bg-white/5 px-3 py-2.5">
                            <span className="text-sm text-white">
                                {user.joiningDate
                                    ? new Date(user.joiningDate).toLocaleDateString()
                                    : "-"}
                            </span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Log Summary Section */}
            <div className="rounded-2xl border border-border-light bg-form-bg p-6">
                <p className="text-center text-white-secondary">Stop logs coming soon</p>
            </div>
        </div>
    );
};
