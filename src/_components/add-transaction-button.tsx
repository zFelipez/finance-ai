"use client";

import React from "react";
import { UpsertTransactionDialog } from "./upsert-transaction-dialog";
import { Button } from "./ui/button";
import { ArrowDownUpIcon } from "lucide-react";

export function AddTransactionButton() {
  const [dialogOpen, setDialogOpen] = React.useState(false);

  return (
    <>
      <Button
        onClick={() => setDialogOpen(true)}
        className="rounded-full text-emerald-500 hover:bg-emerald-500/10"
      >
        <ArrowDownUpIcon className="mr-2" />
        Adicionar transação
      </Button>
      <UpsertTransactionDialog
        dialogOpen={dialogOpen}
        setDialogOpen={setDialogOpen}
      ></UpsertTransactionDialog>
    </>
  );
}
