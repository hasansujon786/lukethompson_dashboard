"use client";

import { DashboardLayout } from "@/components/dashboard/DashboardLayout";
import { useAppSelector } from "@/lib/redux/hooks";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { ROUTES } from "@/constants";
import { LoadingSpinner } from "@/components/shared/LoadingSpinner";
import { LoadingPage } from "@/components/shared/LoadingPage";

export default function Layout({ children }: { children: React.ReactNode }) {
  const { isAuthenticated, isLoading } = useAppSelector((state) => state.auth);
  const router = useRouter();

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      router.push(ROUTES.LOGIN);
    }
  }, [isAuthenticated, isLoading, router]);

  // if (isLoading || !isAuthenticated) {
  //   return <LoadingPage />;
  // }

  return <DashboardLayout>{children}</DashboardLayout>;
}
