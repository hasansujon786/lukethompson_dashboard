"use client";

import { DonutChart } from "./DonutChart";
import { PlanBreakdownItem } from "./PlanBreakdownItem";
import { PlanBreakdown as PlanBreakdownType } from "@/types";

interface PlanBreakdownProps {
  data: PlanBreakdownType[];
  totalSubscribers: number;
}

export const PlanBreakdown = ({
  data,
  totalSubscribers,
}: PlanBreakdownProps) => {
  return (
    <div className="flex h-full flex-col rounded-2xl bg-form-bg border border-border-light">
      {/* Header */}
      <div className="border-b border-border-light px-6 py-4">
        <h3 className="text-base font-bold text-white">Plan Breakdown</h3>
        <p className="text-sm font-normal text-white-secondary">
          Active subscribers
        </p>
      </div>

      {/* Donut Chart */}
      <div className="px-6 pt-4">
        <DonutChart data={data} totalSubscribers={totalSubscribers} />
      </div>

      {/* Breakdown Items */}
      <div className="flex-1 space-y-3 px-6 pb-6">
        {data.map((item) => (
          <PlanBreakdownItem
            key={item.name}
            name={item.name}
            subscribers={item.subscribers}
            color={item.color}
            percentage={item.value}
            total={totalSubscribers}
          />
        ))}
      </div>
    </div>
  );
};
