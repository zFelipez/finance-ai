import {
  PiggyBankIcon,
  TrendingDownIcon,
  TrendingUpIcon,
  WalletIcon,
} from "lucide-react";
import { SummaryCard } from "./summary-card";
import { db } from "@/_lib/prisma";
import { auth } from "@clerk/nextjs/server";

type SummaryCardsProps = {
  month: string;
};

export async function SummaryCards({ month }: SummaryCardsProps) {
  const userLoggedIn = await auth();

  if (!userLoggedIn.userId) {
    throw new Error("User not authenticated");
  }

  const dateWhere = {
    date: {
      gte: new Date(`2026-${month}-01`),
      lte: new Date(`2026-${month}-31`),
    },
  };

  const transactions = await db.transaction.findMany({
    where: {
      ...dateWhere,
      type: { in: ["DEPOSIT", "EXPENSE", "EXPENSE"] },
      userID: userLoggedIn.userId,
    },
  });

  const receipt = transactions.reduce((acc, transaction) => {
    if (transaction.type === "DEPOSIT") {
      return acc + Number(transaction.amount);
    }
    return acc;
  }, 0);

  const expense = transactions.reduce((acc, transaction) => {
    if (transaction.type == "EXPENSE") {
      return acc + Number(transaction.amount);
    }
    return acc;
  }, 0);

  const invested = transactions.reduce((acc, transaction) => {
    if (transaction.type == "INVESTMENT") {
      return acc + Number(transaction.amount);
    }
    return acc;
  }, 0);

  return (
    <div className="space-y-6 p-6">
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
