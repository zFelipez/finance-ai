import { Button } from "@/_components/ui/button";
import { CardContent, CardHeader, CardTitle } from "@/_components/ui/card";
import { ScrollArea } from "@/_components/ui/scroll-area";
import { formatCurrency } from "@/_lib/utils";

import { Transaction } from "@prisma/client";
import Image from "next/image";
import Link from "next/link";

export function LastTransactions({
  lastTransactions,
}: {
  lastTransactions: Transaction[];
}) {
  function getAmountColor(transaction: Transaction) {
    if (transaction.type === "DEPOSIT") {
      return "text-green-500";
    } else if (transaction.type === "EXPENSE") {
      return "text-red-500";
    } else if (transaction.type === "INVESTMENT") {
      return "text-white";
    }
  }

  function getAmountPrefix(transaction: Transaction) {
    if (transaction.type === "DEPOSIT") {
      return "+";
    } else {
      return "-";
    }
  }

  return (
    <ScrollArea className="flex-1 overflow-auto rounded-md border border-slate-500 bg-gray-800">
      <CardHeader className="flex-row items-center justify-between border-b border-slate-500">
        <CardTitle className="font-bold text-white">
          {" "}
          Last Transactions
        </CardTitle>
        <Button
          className="rounded-full border border-gray-500 text-emerald-500 hover:bg-emerald-500/10"
          asChild
        >
          <Link href="/transactions">See More</Link>
        </Button>
      </CardHeader>

      <CardContent className="space-y-6 p-6">
        {lastTransactions.map((transaction) => (
          <div
            key={transaction.id}
            className="flex items-center justify-between"
          >
            <div className="flex items-center gap-2">
              <div className="rounded-sm bg-white bg-opacity-[3%] p-2">
                <Image
                  src={`/${transaction.type}-icon.svg`}
                  alt="Transaction Icon"
                  width={20}
                  height={20}
                />
              </div>
              <div className="flex flex-col">
                <span className="text-white">{transaction.name}</span>
                <span className="text-sm text-gray-400">
                  {" "}
                  {new Date(transaction.date).toLocaleDateString()}
                </span>
              </div>
            </div>

            <span className={`${getAmountColor(transaction)} font-bold`}>
              {getAmountPrefix(transaction)}
              {formatCurrency(Number(transaction.amount))}
            </span>
          </div>
        ))}
      </CardContent>
    </ScrollArea>
  );
}
