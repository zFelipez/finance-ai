import {
  PiggyBankIcon,
  TrendingDownIcon,
  TrendingUpIcon,
  WalletIcon,
} from "lucide-react";
import { SummaryCard } from "./summary-card";

import { auth } from "@clerk/nextjs/server";

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

  return (
    <div className="space-y-6">
      <SummaryCard
        size="large"
        icon={<WalletIcon size={16} color="white" />}
        title={"Saldo Atual"}
        amount={receipt - invested - expense}
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
