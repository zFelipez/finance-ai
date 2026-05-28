"use client";

import { Pie, PieChart } from "recharts";

import { Card, CardContent } from "@/_components/ui/card";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@/_components/ui/chart";
import { TransactionType } from "@prisma/client";
import { TransactionPercentagePerType } from "@/_dal/types";
import { PiggyBankIcon, TrendingDownIcon, TrendingUpIcon } from "lucide-react";
import { PercentageItem } from "./percentage-item";

const chartConfig = {
  [TransactionType.DEPOSIT]: {
    label: "Receipt",
    color: "#55802E",
  },
  [TransactionType.EXPENSE]: {
    label: "Expense",
    color: "#E93030",
  },
  [TransactionType.INVESTMENT]: {
    label: "Invested",
    color: "#FFFFFF",
  },
} satisfies ChartConfig;

type ChartPieProps = {
  invested: number;
  receipt: number;
  expense: number;
  typesPercentage: TransactionPercentagePerType;
};

export function ChartPie({
  invested,
  receipt,
  expense,
  typesPercentage,
}: ChartPieProps) {
  const chartData = [
    {
      type: TransactionType.DEPOSIT,
      amount: receipt,
      fill: "#55802E",
    },
    {
      type: TransactionType.EXPENSE,
      amount: expense,
      fill: "#E93030",
    },
    {
      type: TransactionType.INVESTMENT,
      amount: invested,
      fill: "#FFFFFF",
    },
  ];

  return (
    <Card className="flex flex-col border-slate-500 bg-gray-800 p-12">
      <CardContent className="flex-1 pb-0">
        <ChartContainer
          config={chartConfig}
          className="mx-auto aspect-square max-h-[250px]"
        >
          <PieChart>
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Pie
              data={chartData}
              dataKey="amount"
              nameKey="type"
              innerRadius={60}
            />
          </PieChart>
        </ChartContainer>

        <div className="space-y-2">
          <PercentageItem
            title="Receipt"
            percentage={typesPercentage[TransactionType.DEPOSIT]}
            icon={<TrendingUpIcon size={16} className="text-green-500" />}
          />
          <PercentageItem
            title="Expense"
            percentage={typesPercentage[TransactionType.EXPENSE]}
            icon={<TrendingDownIcon size={16} className="text-red-500" />}
          />
          <PercentageItem
            title="Invested"
            percentage={typesPercentage[TransactionType.INVESTMENT]}
            icon={<PiggyBankIcon size={16} className="text-white" />}
          />
        </div>
      </CardContent>
    </Card>
  );
}
