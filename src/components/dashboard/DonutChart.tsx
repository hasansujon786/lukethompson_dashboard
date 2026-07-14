"use client";

import { useRef } from "react";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import { PlanBreakdown } from "@/types";

interface DonutChartProps {
  data: PlanBreakdown[];
  totalSubscribers: number;
}

export const DonutChart = ({ data, totalSubscribers }: DonutChartProps) => {
  const chartComponentRef = useRef<HighchartsReact.RefObject>(null);

  const chartOptions: Highcharts.Options = {
    chart: {
      type: "pie",
      backgroundColor: "transparent",
      height: 200,
      width: null,
      margin: [0, 0, 0, 0],
      spacing: [0, 0, 0, 0],
    },
    title: {
      text: undefined,
    },
    tooltip: {
      pointFormat: "{point.name}: <b>{point.percentage:.0f}%</b>",
      backgroundColor: "#111926",
      borderColor: "rgba(254, 254, 254, 0.10)",
      borderRadius: 8,
      style: {
        color: "#fff",
        fontSize: "12px",
      },
    },
    plotOptions: {
      pie: {
        allowPointSelect: true,
        cursor: "pointer",
        borderRadius: 8,
        borderWidth: 0,
        center: ["50%", "50%"],
        size: "100%",
        dataLabels: {
          enabled: false, // Remove all data labels
        },
        states: {
          inactive: {
            enabled: false,
          },
          hover: {
            brightness: 0.1,
          },
        },
        slicedOffset: 4,
        innerSize: "75%",
      },
    },
    series: [
      {
        type: "pie",
        name: "Subscribers",
        data: data.map((item) => ({
          name: item.name,
          y: item.value,
          color: item.color,
          sliced: true,
        })),
      },
    ],
    credits: {
      enabled: false,
    },
    legend: {
      enabled: false,
    },
  };

  return (
    <div className="relative flex h-[200px] w-full items-center justify-center">
      <div className="h-[200px] w-[200px]">
        <HighchartsReact
          highcharts={Highcharts}
          options={chartOptions}
          ref={chartComponentRef}
        />
      </div>

      {/* Perfectly Centered Text Overlay */}
      <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center">
        <span className="text-[28px] font-bold leading-none text-white">
          {totalSubscribers}
        </span>
        <span className="mt-1 text-xs font-normal text-white-secondary">
          Subscribers
        </span>
      </div>
    </div>
  );
};
