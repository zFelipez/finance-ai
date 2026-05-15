"use server";

import { Prisma } from "@prisma/client";
import { db } from "@/_lib/prisma";
import { auth } from "@clerk/nextjs/server";
import { addTransactionSchema } from "./schema";
import { revalidatePath } from "next/cache";

export async function addTransaction(
  data: Omit<Prisma.TransactionCreateInput, "userID">,
) {
  addTransactionSchema.parse(data);

  const userLoggedIn = await auth();

  if (!userLoggedIn.userId) {
    throw new Error("User not authenticated");
  }

  await db.transaction.create({
    data: {
      ...data,
      userID: userLoggedIn.userId,
    },
  });

  revalidatePath("/transactions");
}
