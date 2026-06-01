import {
  PiggyBankIcon,
  TrendingDownIcon,
  TrendingUpIcon,
  WalletIcon,
} from "lucide-react";
import { SummaryCard } from "./summary-card";

import { auth } from "@clerk/nextjs/server";
import { getUserPlan } from "@/_dal/get-user-plan";
import { getCurrentMonthTransactions } from "@/_dal/get-current-month-transactions";

type SummaryCardsProps = {
  receipt: number;
  expense: number;
  invested: number;
};
export async function SummaryCards({
  receipt,
  expense,
  invested,
}: SummaryCardsProps) {
  const userLoggedIn = await auth();

  if (!userLoggedIn.userId) {
    throw new Error("User not authenticated");
  }

  const currentMonthTransactions =
    await getCurrentMonthTransactions(userLoggedIn);

  const { hasPremiumPlan } = await getUserPlan(userLoggedIn.userId);

  return (
    <div className="space-y-6">
      <SummaryCard
        size="large"
        icon={<WalletIcon size={16} color="white" />}
        title={"Saldo Atual"}
        amount={receipt - invested - expense}
        canAddTransaction={hasPremiumPlan || currentMonthTransactions < 10}
      ></SummaryCard>

      <div className="grid grid-cols-3 gap-6">
        <SummaryCard
          icon={<PiggyBankIcon size={16} color="white" />}
          title="Investido"
          amount={invested}
        />

        <SummaryCard
          icon={<TrendingUpIcon size={16} className="text-green-500" />}
          title="Receita"
          amount={receipt}
        />

        <SummaryCard
          icon={<TrendingDownIcon size={16} className="text-red-500" />}
          title="Despesa"
          amount={expense}
        />
      </div>
    </div>
  );
}
