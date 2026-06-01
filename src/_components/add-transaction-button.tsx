"use client";

import React from "react";
import { UpsertTransactionDialog } from "./upsert-transaction-dialog";
import { Button } from "./ui/button";
import { ArrowDownUpIcon } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "./ui/tooltip";

type AddTransactionButtonProps = {
  canAddTransaction: boolean;
};

export function AddTransactionButton({
  canAddTransaction,
}: AddTransactionButtonProps) {
  const [dialogOpen, setDialogOpen] = React.useState(false);

  return (
    <>
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              disabled={!canAddTransaction}
              onClick={() => setDialogOpen(true)}
              className="rounded-full text-emerald-500 hover:bg-emerald-500/10"
            >
              <ArrowDownUpIcon className="mr-2" />
              Adicionar transação
            </Button>
          </TooltipTrigger>

          <TooltipContent>
            {!canAddTransaction && (
              <p>
                Você atingiu o limite de 10 transações para este mês. Adquira o
                plano premium para adicionar mais transações.
              </p>
            )}
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
      <UpsertTransactionDialog
        dialogOpen={dialogOpen}
        setDialogOpen={setDialogOpen}
      ></UpsertTransactionDialog>
    </>
  );
}
