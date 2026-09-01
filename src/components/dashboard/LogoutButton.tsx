"use client";

import { LogoutIcon } from "@/components/ui/icons/index";
import { useAuth } from "@/hooks/useAuth";

export const LogoutButton = () => {
  const { logout } = useAuth();

  return (
    <button
      onClick={logout}
      className="flex w-full cursor-pointer items-center gap-2 rounded-lg bg-error-red px-4 py-3 transition-colors hover:bg-error-red/90"
    >
      <LogoutIcon className="h-6 w-6 text-white" />
      <span className="text-sm  font-medium text-white">LOGOUT</span>
    </button>
  );
};
