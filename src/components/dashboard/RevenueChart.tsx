"use client";

import { useState } from "react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { SelectDropdown } from "@/components/ui/SelectDropdown";
import { RevenueData } from "@/types";

interface RevenueChartProps {
  data: RevenueData[];
}

const TIME_OPTIONS = ["Last 6 months", "Last 12 months", "Last 30 days"];

export const RevenueChart = ({ data }: RevenueChartProps) => {
  const [timeRange, setTimeRange] = useState("Last 6 months");

  return (
    <div className="flex h-full flex-col rounded-2xl bg-form-bg p-6 border border-border-light">
      {/* Header */}
      <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h3 className="text-base font-bold text-white">Revenue Analytics</h3>
          <p className="text-sm font-normal text-white-secondary">
            Monthly earnings trend 2026
          </p>
        </div>

        <SelectDropdown
          options={TIME_OPTIONS}
          value={timeRange}
          onChange={setTimeRange}
          width="180px"
        />
      </div>

      {/* Chart */}
      <div className="flex-1 min-h-[250px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart
            data={data}
            margin={{ top: 10, right: 10, left: 0, bottom: 0 }}
          >
            <defs>
              <linearGradient id="revenueGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#33D17A" stopOpacity={0.3} />
                <stop offset="100%" stopColor="#33D17A" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid
              strokeDasharray="3 3"
              stroke="rgba(254, 254, 254, 0.10)"
              vertical={false}
            />
            <XAxis
              dataKey="month"
              tick={{ fill: "#8DA2B8", fontSize: 12 }}
              axisLine={{ stroke: "rgba(254, 254, 254, 0.10)" }}
              tickLine={false}
            />
            <YAxis
              tick={{ fill: "#8DA2B8", fontSize: 12 }}
              axisLine={{ stroke: "rgba(254, 254, 254, 0.10)" }}
              tickLine={false}
              tickFormatter={(value) => `$${value}`}
              domain={[0, 5000]}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: "#111926",
                border: "1px solid rgba(254, 254, 254, 0.10)",
                borderRadius: "8px",
                color: "#fff",
              }}
              cursor={{
                stroke: "#33D17A",
                strokeWidth: 1.5,
                strokeDasharray: "4 4",
              }}
              formatter={(value: unknown) => {
                if (typeof value === "number") {
                  return [`$${value}`, "Revenue"];
                }
                return [String(value), "Revenue"];
              }}
            />
            <Area
              type="monotone"
              dataKey="revenue"
              stroke="#33D17A"
              strokeWidth={2}
              fill="url(#revenueGradient)"
              activeDot={{
                r: 6,
                fill: "#33D17A",
                stroke: "#fff",
                strokeWidth: 2,
              }}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};
