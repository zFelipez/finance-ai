'use client";';
import { Button } from "@/_components/ui/button";
import { TransactionTableData } from "../_columns";
import { TrashIcon } from "lucide-react";
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTrigger,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogCancel,
  AlertDialogAction,
} from "@/_components/ui/alert-dialog";
import { deleteTransaction } from "../_actions/delete-transaction";

export function DeleteTransactionButton({
  transaction,
}: {
  transaction: TransactionTableData;
}) {
  async function handleDeleteClick() {
    try {
      await deleteTransaction(transaction.id);
    } catch (error) {
      console.error("Error deleting transaction:", error);
    }
  }
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button variant="ghost" size="icon" className="hover:bg-slate-800">
          <TrashIcon></TrashIcon>
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent className="border-slate-800 bg-slate-950 text-slate-100 shadow-2xl shadow-black/50">
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete the
            transaction <strong>{transaction.name}</strong>.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction asChild>
            <Button
              onClick={handleDeleteClick}
              className="bg-red-600 hover:bg-red-700"
            >
              Delete
            </Button>
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
