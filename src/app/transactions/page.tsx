import { DataTable } from "@/_components/ui/datatable";
import { db } from "@/_lib/prisma";
import { transactionColumns, type TransactionTableData } from "./_columns";
import { AddTransactionButton } from "@/_components/add-transaction-button";
import Navbar from "@/_components/navbar";

export default async function TransactionsPage() {
  const transactions = await db.transaction.findMany({});
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
          <h1 className="text-2xl text-slate-100">Transactions</h1>
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
