import { TransactionType } from "@prisma/client";

export type TransactionPercentagePerType = {
  [TransactionType.DEPOSIT]: number;
  [TransactionType.EXPENSE]: number;
  [TransactionType.INVESTMENT]: number;
};
