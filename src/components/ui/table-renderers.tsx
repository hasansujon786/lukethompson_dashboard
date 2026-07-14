import { MoreHorizontal, Eye } from "lucide-react";
import { StatusBadge } from "./StatusBadge";
import { CustomDropdown } from "./CustomDropdown";
import { User } from "@/types";
import { cn } from "@/lib/utils";

// User info renderer (avatar + name + email)
export const renderUserInfo = (user: User) => {
  const avatarUrl = user.avatar && typeof user.avatar === "string" && user.avatar.startsWith("http")
    ? user.avatar
    : "/Avatar.png";

  return (
    <div className="flex items-center gap-3">
      <div className="relative h-10 w-10 flex-shrink-0 overflow-hidden rounded-full">
        <img
          src={avatarUrl}
          alt={user.name}
          className="h-full w-full object-cover"
          onError={(e) => {
            (e.target as HTMLImageElement).src = "/Avatar.png";
          }}
        />
      </div>
      <div className="flex flex-col">
        <span className="text-sm font-medium text-white">{user.name}</span>
        <span className="text-xs text-white-secondary">{user.email}</span>
      </div>
    </div>
  );
};

// Plan renderer with color
export const renderPlan = (plan: string) => {
  const getPlanColor = (p: string) => {
    if (p === "Pro Monthly") return "text-green-success";
    if (p === "Pro Annualy") return "text-white";
    return "text-white-secondary";
  };

  return (
    <span className={cn("text-sm font-medium", getPlanColor(plan))}>
      {plan}
    </span>
  );
};

// Date renderer
export const renderDate = (date: string) => (
  <span className="text-sm text-white-secondary">
    {new Date(date).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    })}
  </span>
);

// Stops renderer
export const renderStops = (stops: number) => (
  <span className="text-sm text-white">{stops}</span>
);

// Actions renderer
export const renderActions = (
  user: User,
  options: {
    showEye?: boolean;
    onView?: (user: User) => void;
    onBan?: (user: User) => void;
    onDelete?: (user: User) => void;
  },
) => {
  const dropdownOptions = [
    ...(options.showEye
      ? [
        {
          label: "View Details",
          value: "view",
          icon: <Eye size={16} />,
          onClick: () => options.onView?.(user),
        },
      ]
      : []),
    {
      label: user.status === "BANNED" ? "Unban User" : "Ban User",
      value: "ban",
      className:
        user.status === "BANNED"
          ? "text-white hover:bg-white/10"
          : "bg-error-red text-white hover:bg-error-red/80",
      onClick: () => options.onBan?.(user),
    },
    {
      label: "Delete User",
      value: "delete",
      className: "hover:bg-red-500/10 hover:text-white",
      onClick: () => options.onDelete?.(user),
    },
  ];

  return (
    <CustomDropdown
      options={dropdownOptions}
      trigger={
        <button className="rounded p-1 text-white-secondary hover:bg-white/10 hover:text-white">
          <MoreHorizontal className="cursor-pointer" size={18} />
        </button>
      }
    />
  );
};
