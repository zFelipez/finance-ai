import { Button } from "@/_components/ui/button";
import { DataTable } from "@/_components/ui/datatable";
import { db } from "@/_lib/prisma";
import { ArrowDownUpIcon } from "lucide-react";
import { transactionColumns } from "./_columns";

export default async function TransactionsPage() {
  const transactions = await db.transaction.findMany({});

  return (
    <div className="min-h-full space-y-6 bg-slate-950/30 p-6">
      <div className="flex w-full items-center justify-between">
        <h1 className="text-2xl text-slate-100">Transactions</h1>
        <Button className="bg-emerald-400/12 rounded-full border border-emerald-400/20 text-emerald-100 hover:bg-emerald-400/20">
          Add Transaction
          <ArrowDownUpIcon />
        </Button>
      </div>

      <DataTable data={transactions} columns={transactionColumns}></DataTable>
    </div>
  );
}
