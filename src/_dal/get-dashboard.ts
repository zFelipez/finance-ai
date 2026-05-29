"server-only";

import { db } from "@/_lib/prisma";
import { CalculatePercentage } from "@/_lib/utils";
import { TransactionType } from "@prisma/client";
import { TotalExpensePerCategory, TransactionPercentagePerType } from "./types";

export async function getDashboardData({
  month,
  userID,
}: {
  month: string;
  userID: string;
}) {
  const dateWhere = {
    date: {
      gte: new Date(`2026-${month}-01`),
      lte: new Date(`2026-${month}-31`),
    },
  };

  const transactions = await db.transaction.findMany({
    where: {
      ...dateWhere,
      type: { in: ["DEPOSIT", "EXPENSE", "INVESTMENT"] },
      userID: userID,
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

  const typesPercentage: TransactionPercentagePerType = {
    [TransactionType.DEPOSIT]: CalculatePercentage(
      receipt,
      receipt + expense + invested,
    ),
    [TransactionType.EXPENSE]: CalculatePercentage(
      expense,
      receipt + expense + invested,
    ),
    [TransactionType.INVESTMENT]: CalculatePercentage(
      invested,
      receipt + expense + invested,
    ),
  };

  const totalExpensePerCategory: TotalExpensePerCategory[] = (
    await db.transaction.groupBy({
      by: ["category"],
      where: {
        ...dateWhere,
        type: TransactionType.EXPENSE,
        userID,
      },
      _sum: {
        amount: true,
      },
    })
  ).map((category) => ({
    category: category.category,
    totalAmount: category._sum.amount ?? 0,
    percentageTotal: CalculatePercentage(
      Number(category._sum.amount ?? 0),
      expense,
    ),
  }));

  const lastTransactions = await db.transaction.findMany({
    where: {
      ...dateWhere,
      userID,
    },
    orderBy: {
      date: "desc",
    },
    take: 30,
  });

  return {
    receipt,
    expense,
    invested,
    typesPercentage,
    totalExpensePerCategory,
    lastTransactions,
  };
}
