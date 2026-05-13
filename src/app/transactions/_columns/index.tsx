"use client";

import { ColumnDef } from "@tanstack/react-table";

import { TrancationTypeBadge } from "../_components/type-badge";
import { Transaction } from "@prisma/client";

const currencyFormatter = new Intl.NumberFormat("pt-BR", {
  style: "currency",
  currency: "BRL",
});

const dateFormatter = new Intl.DateTimeFormat("pt-BR", {
  day: "2-digit",
  month: "short",
  year: "numeric",
});

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
    cell: ({ row }) => (
      <span className="text-slate-300">
        {categoryLabelMap[row.original.category]}
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
    cell: ({ row }) => {
      const date = new Date(row.original.date);

      return (
        <span className="text-slate-300">{dateFormatter.format(date)}</span>
      );
    },
  },
  {
    accessorKey: "amount",
    header: "Valor",
    cell: ({ row }) => {
      const amount = Number(row.original.amount);
      const isExpense = row.original.type === "EXPENSE";

      return (
        <span
          className={`font-semibold ${isExpense ? "text-rose-300" : "text-emerald-300"}`}
        >
          {currencyFormatter.format(amount)}
        </span>
      );
    },
  },
  {
    id: "actions",
  },
];
