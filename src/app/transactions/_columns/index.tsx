"use client";

import { ColumnDef } from "@tanstack/react-table";
import { TrashIcon } from "lucide-react";
import { Button } from "@/_components/ui/button";
import { TrancationTypeBadge } from "../_components/type-badge";

import {
  TRANSACTION_CATEGORY_LABELS,
  TRANSACTION_PAYMENT_METHOD_LABELS,
} from "@/_constants/transactions";
import { Transaction } from "@prisma/client";
import { EditTransactionButton } from "../_components/edit-transaction-button";

export type TransactionTableData = Omit<
  Transaction,
  "amount" | "date" | "createdAt" | "updatedAt"
> & {
  amount: number;
  date: string;
  createdAt: string;
  updatedAt: string;
};

export const transactionColumns: ColumnDef<TransactionTableData>[] = [
  {
    accessorKey: "name",
    header: "Nome",
    cell: ({ row }) => {
      const transaction = row.original;

      return (
        <div className="space-y-1">
          <p className="font-medium text-slate-50">{transaction.name}</p>
        </div>
      );
    },
  },
  {
    accessorKey: "type",
    header: "Tipo",
    cell: ({ row: { original: transaction } }) => {
      return <TrancationTypeBadge type={transaction.type} />;
    },
  },
  {
    accessorKey: "category",
    header: "Categoria",
    cell: ({ row: { original: transaction } }) => (
      <span className="text-slate-300">
        {TRANSACTION_CATEGORY_LABELS[transaction.category]}
      </span>
    ),
  },
  {
    accessorKey: "paymentMethod",
    header: "Método de Pagamento",
    cell: ({ row: { original: transaction } }) => (
      <span className="text-slate-300">
        {TRANSACTION_PAYMENT_METHOD_LABELS[transaction.paymentMethod]}
      </span>
    ),
  },
  {
    accessorKey: "date",
    header: "Data",
    cell: ({ row: { original: transaction } }) => {
      const date = new Date(transaction.date).toLocaleDateString("pt-BR", {
        day: "2-digit",
        month: "long",
        year: "numeric",
      });

      return <span className="text-slate-300">{date}</span>;
    },
  },
  {
    accessorKey: "amount",
    header: "Valor",
    cell: ({ row: { original: transaction } }) => {
      return new Intl.NumberFormat("pt-BR", {
        style: "currency",
        currency: "BRL",
      }).format(Number(transaction.amount));
    },
  },
  {
    id: "actions",
    header: "Ações",
    cell: ({ row: { original: transaction } }) => {
      return (
        <div className="space-x-1">
          <EditTransactionButton
            transaction={transaction}
          ></EditTransactionButton>

          <Button variant="ghost" size="icon" className="hover:bg-slate-800">
            <TrashIcon></TrashIcon>
          </Button>
        </div>
      );
    },
  },
];
