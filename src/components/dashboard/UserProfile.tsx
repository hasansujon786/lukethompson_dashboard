"use client";

import Image from "next/image";
import { useAppSelector } from "@/lib/redux/hooks";

export const UserProfile = () => {
  const { user } = useAppSelector((state) => state.auth);

  console.log("UserProfile render - user:", user);

  return (
    <div className="flex items-center gap-3">
      <div className="relative h-10 w-10 overflow-hidden rounded-full border border-border-light">
        <Image
          src={user?.avatar || "/Avatar.png"}
          alt="Profile"
          fill
          sizes="30px"
          className="object-cover"
          unoptimized
        />
      </div>
      <div className="text-left">
        <p className="text-sm font-medium text-white">
          {user?.name || "Kristin Rodriguez"}
        </p>
        <p className="text-xs text-white-secondary capitalize">
          {user?.role || "admin"}
        </p>
      </div>
    </div>
  );
};