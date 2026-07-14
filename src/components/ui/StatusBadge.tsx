import { cn } from "@/lib/utils";
import { UserStatus } from "@/types";

interface StatusBadgeProps {
  status: UserStatus;
  className?: string;
}

const statusStyles: Record<string, string> = {
  APPROVED: "bg-green-success text-black",
  PENDING: "bg-[#FF8A3D]",
  BANNED: "bg-error-red",
  Active: "bg-green-success text-black",
  Inactive: "bg-[#FF8A3D]",
  Banned: "bg-error-red",
};

export const StatusBadge = ({ status, className }: StatusBadgeProps) => {
  return (
    <span
      className={cn(
        "inline-flex items-center justify-center rounded-2xl px-3 py-1 text-xs font-medium text-white",
        statusStyles[status],
        className,
      )}
    >
      {status}
    </span>
  );
};
