"use server";

import { db } from "@/_lib/prisma";
import { auth } from "@clerk/nextjs/server";
import { upsertTransactionSchema } from "./schema";
import { revalidatePath } from "next/cache";
import {
  TransactionCategory,
  TransactionPaymentMethod,
  TransactionType,
} from "@prisma/client";
import { endOfMonth, startOfMonth } from "date-fns";
import { getUserPlan } from "@/_dal/get-user-plan";

type UpsertTransactionProps = {
  id?: string;
  name: string;
  amount: number;
  type: TransactionType;
  category: TransactionCategory;
  paymentMethod: TransactionPaymentMethod;
  date: Date;
};

export async function upsertTransaction(data: UpsertTransactionProps) {
  upsertTransactionSchema.parse(data);

  const userLoggedIn = await auth();

  if (!userLoggedIn.userId) {
    throw new Error("User not authenticated");
  }

  const { hasPremiumPlan } = await getUserPlan(userLoggedIn.userId);

  if (!hasPremiumPlan) {
    const transactionsCount = await db.transaction.count({
      where: {
        userID: userLoggedIn.userId,
        createdAt: {
          gte: startOfMonth(new Date()),
          lte: endOfMonth(new Date()),
        },
      },
    });

    if (transactionsCount >= 10) {
      throw new Error("MAX_TRANSACTIONS_REACHED");
    }
  }

  await db.transaction.upsert({
    update: {
      ...data,
      userID: userLoggedIn.userId,
    },
    create: {
      ...data,
      userID: userLoggedIn.userId,
    },
    where: {
      id: data?.id || "",
    },
  });

  revalidatePath("/transactions");
}
