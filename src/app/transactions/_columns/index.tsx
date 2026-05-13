"use client";

import { ColumnDef } from "@tanstack/react-table";

import { TrancationTypeBadge } from "../_components/type-badge";
import { Transaction } from "@prisma/client";
import { PencilIcon, TrashIcon } from "lucide-react";
import { Button } from "@/_components/ui/button";

const categoryLabelMap: Record<Transaction["category"], string> = {
  HOUSING: "Moradia",
  FOOD: "Alimentacao",
  TRANSPORTATION: "Transporte",
  ENTERTAINMENT: "Lazer",
  UTILITY: "Contas",
  HEALTH: "Saude",
  SALARY: "Salario",
  EDUCATION: "Educacao",
  OTHER: "Outros",
};

const paymentMethodLabelMap: Record<Transaction["paymentMethod"], string> = {
  CASH: "Dinheiro",
  CREDIT_CARD: "Cartao de credito",
  DEBIT_CARD: "Cartao de debito",
  BANK_TRANSFER: "Transferencia",
  MOBILE_PAYMENT: "Pagamento movel",
  OTHER: "Outro",
};

export const transactionColumns: ColumnDef<Transaction>[] = [
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
        {categoryLabelMap[transaction.category]}
      </span>
    ),
  },
  {
    accessorKey: "paymentMethod",
    header: "Método de Pagamento",
    cell: ({ row }) => (
      <span className="text-slate-300">
        {paymentMethodLabelMap[row.original.paymentMethod]}
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
    cell: () => {
      return (
        <div className="space-x-1">
          <Button variant="ghost" size="icon" className="hover:bg-slate-800">
            <PencilIcon></PencilIcon>
          </Button>

          <Button variant="ghost" size="icon" className="hover:bg-slate-800">
            <TrashIcon></TrashIcon>
          </Button>
        </div>
      );
    },
  },
];
