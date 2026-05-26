"use client";

import React from "react";
import { UpsertTransactionDialog } from "@/_components/upsert-transaction-dialog";
import { Button } from "@/_components/ui/button";
import { PencilIcon } from "lucide-react";
import { TransactionTableData } from "../_columns";

export function EditTransactionButton({
  transaction,
}: {
  transaction: TransactionTableData;
}) {
  const [dialogOpen, setDialogOpen] = React.useState(false);

  return (
    <>
      <Button
        variant="ghost"
        size="icon"
        className="hover:bg-slate-800"
        onClick={() => {
          setDialogOpen(true);
        }}
      >
        <PencilIcon></PencilIcon>
      </Button>
      <UpsertTransactionDialog
        dialogOpen={dialogOpen}
        setDialogOpen={setDialogOpen}
        transaction={transaction}
        transactionId={transaction.id}
        isEditMode={true}
      ></UpsertTransactionDialog>
    </>
  );
}
