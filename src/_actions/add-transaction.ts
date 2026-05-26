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

  await db.transaction.upsert({
    where: {
      id: data.id,
    },
    update: {
      ...data,
      userID: userLoggedIn.userId,
    },
    create: {
      ...data,
      userID: userLoggedIn.userId,
    },
  });

  revalidatePath("/transactions");
}
