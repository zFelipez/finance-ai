"server-only";

import { db } from "@/_lib/prisma";
import { endOfMonth, startOfMonth } from "date-fns";

export async function getCurrentMonthTransactions(userLoggedIn: {
  userId: string;
}) {
  const currentMonthTransactions = await db.transaction.count({
    where: {
      userID: userLoggedIn.userId,
      createdAt: {
        gte: startOfMonth(new Date()),
        lte: endOfMonth(new Date()),
      },
    },
  });
  return currentMonthTransactions;
}
