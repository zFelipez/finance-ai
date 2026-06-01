import { DataTable } from "@/_components/ui/datatable";
import { db } from "@/_lib/prisma";
import { transactionColumns, type TransactionTableData } from "./_columns";
import { AddTransactionButton } from "@/_components/add-transaction-button";
import Navbar from "@/_components/navbar";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { ScrollArea } from "@/_components/ui/scroll-area";
import { getCurrentMonthTransactions } from "@/_dal/get-current-month-transactions";
import { getUserPlan } from "@/_dal/get-user-plan";

export default async function TransactionsPage() {
  const userLoggedIn = await auth();

  if (!userLoggedIn.userId) {
    redirect("/login");
  }

  const transactions = await db.transaction.findMany({
    where: { userID: userLoggedIn.userId },
  });

  const currentMonthTransactions =
    await getCurrentMonthTransactions(userLoggedIn);

  const { hasPremiumPlan } = await getUserPlan(userLoggedIn.userId);

  const serializedTransactions: TransactionTableData[] = transactions.map(
    (transaction) => ({
      id: transaction.id,
      name: transaction.name,
      type: transaction.type,
      amount: Number(transaction.amount),
      category: transaction.category,
      paymentMethod: transaction.paymentMethod,
      date: transaction.date.toISOString(),
      createdAt: transaction.createdAt.toISOString(),
      updatedAt: transaction.updatedAt.toISOString(),
      userID: transaction.userID,
    }),
  );

  return (
    <>
      <Navbar />
      <div className="flex h-full flex-col gap-6 overflow-hidden p-6">
        {/* TÍTULO E BOTÃO */}
        <div className="flex w-full items-center justify-between">
          <h1 className="text-2xl font-bold text-white">Transações</h1>
          <AddTransactionButton
            canAddTransaction={hasPremiumPlan || currentMonthTransactions < 10}
          />
        </div>
        <ScrollArea>
          <DataTable
            columns={transactionColumns}
            data={serializedTransactions}
          />
        </ScrollArea>
      </div>
    </>
  );
}
