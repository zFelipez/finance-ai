"use server";

import { db } from "@/_lib/prisma";
import { auth } from "@clerk/nextjs/server";
import { revalidatePath } from "next/cache";

export async function deleteTransaction(transactionId: string) {
  const { userId } = await auth();

  if (!transactionId) {
    throw new Error("Transaction ID is required");
  }

  if (!userId) {
    throw new Error("User ID is required");
  }

  const deletedTransaction = await db.transaction.delete({
    where: {
      userID: userId,
      id: transactionId,
    },
  });

  if (!deletedTransaction) {
    throw new Error("Transaction not found or not authorized to delete");
  }

  revalidatePath("/transactions");
}
