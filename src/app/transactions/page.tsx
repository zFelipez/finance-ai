import { DataTable } from "@/_components/ui/datatable";
import { db } from "@/_lib/prisma";
import { transactionColumns, type TransactionTableData } from "./_columns";
import { AddTransactionButton } from "@/_components/add-transaction-button";
import Navbar from "@/_components/navbar";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

export default async function TransactionsPage() {
  const userLoggedIn = await auth();

  if (!userLoggedIn.userId) {
    redirect("/login");
  }

  const transactions = await db.transaction.findMany({
    where: { userID: userLoggedIn.userId },
  });
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
      <Navbar></Navbar>
      <div className="min-h-full space-y-6 bg-slate-950/30 p-6">
        <div className="flex w-full items-center justify-between">
          <h1 className="text-2xl font-bold text-slate-100">Transactions</h1>
          <AddTransactionButton />
        </div>

        <DataTable
          data={serializedTransactions}
          columns={transactionColumns}
        ></DataTable>
      </div>
    </>
  );
}
