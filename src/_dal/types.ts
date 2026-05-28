import { TransactionCategory, TransactionType } from "@prisma/client";
import { Decimal } from "@prisma/client/runtime/library";

export type TransactionPercentagePerType = {
  [TransactionType.DEPOSIT]: number;
  [TransactionType.EXPENSE]: number;
  [TransactionType.INVESTMENT]: number;
};

export type TotalExpensePerCategory = {
  category: TransactionCategory;
  totalAmount: number | Decimal;
  percentageTotal: number;
};
