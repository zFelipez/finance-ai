import { Button } from "./ui/button";
import {
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "./ui/dialog";
import { Dialog } from "./ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./ui/form";
import { Input } from "./ui/input";
import { MoneyInput } from "./money-input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import {
  TRANSACTION_CATEGORY_OPTIONS,
  TRANSACTION_PAYMENT_METHOD_OPTIONS,
  TRANSACTION_TYPE_OPTIONS,
} from "@/_constants/transactions";
import { DatePickerDemo } from "./ui/date-picker";
import { DialogClose } from "@radix-ui/react-dialog";
import {
  TransactionCategory,
  TransactionPaymentMethod,
  TransactionType,
} from "@prisma/client";
import z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { upsertTransaction } from "@/_actions/upsert-transaction";
import { TransactionTableData } from "@/app/transactions/_columns";
import { useEffect } from "react";

interface UpsertTransactionDialogProps {
  dialogOpen: boolean;
  setDialogOpen: (open: boolean) => void;
  transaction?: TransactionTableData;
  transactionId?: string;
  isEditMode?: boolean;
}

const formSchema = z.object({
  name: z.string().trim().min(1, {
    message: "O nome é obrigatório.",
  }),
  amount: z.number("O valor é obrigatório.").positive({
    message: "O valor deve ser positivo.",
  }),
  type: z.nativeEnum(TransactionType, "O tipo é obrigatório."),
  category: z.nativeEnum(TransactionCategory, "A categoria é obrigatória."),
  paymentMethod: z.nativeEnum(
    TransactionPaymentMethod,
    "O método de pagamento é obrigatório.",
  ),
  date: z.date("A data é obrigatória."),
});

export type formSchemaType = z.infer<typeof formSchema>;

function getDefaultValues(transaction?: TransactionTableData): formSchemaType {
  return {
    name: transaction?.name || "",
    amount: transaction?.amount || 50,
    category: transaction?.category || TransactionCategory.OTHER,
    paymentMethod: transaction?.paymentMethod || TransactionPaymentMethod.OTHER,
    type: transaction?.type || TransactionType.EXPENSE,
    date: transaction?.date ? new Date(transaction.date) : new Date(),
  };
}

export function UpsertTransactionDialog({
  dialogOpen,
  setDialogOpen,
  transaction,
  transactionId,
  isEditMode,
}: UpsertTransactionDialogProps) {
  const onSubmit = async (values: formSchemaType) => {
    try {
      await upsertTransaction({ ...values, id: transactionId });
      setDialogOpen(false);
      form.reset();
    } catch (error) {
      console.error("Error adding transaction:", error);
    }
  };

  const form = useForm<formSchemaType>({
    resolver: zodResolver(formSchema),
    defaultValues: getDefaultValues(transaction),
  });

  useEffect(() => {
    if (!dialogOpen) {
      return;
    }

    form.reset(getDefaultValues(transaction));
  }, [dialogOpen, form, transaction]);

  return (
    <Dialog
      onOpenChange={(open) => {
        if (!open) {
          form.reset();
        }
        setDialogOpen(open);
      }}
      open={dialogOpen}
    >
      <DialogContent className="border-slate-800 bg-slate-950 text-slate-100 shadow-2xl shadow-black/50">
        <DialogHeader>
          <DialogTitle className="text-slate-50">
            {isEditMode ? "Editar Transação" : "Adicionar Transação"}
          </DialogTitle>

          <DialogDescription className="text-slate-400">
            Preencha os detalhes da transação abaixo.
          </DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nome</FormLabel>
                  <FormControl>
                    <Input placeholder="Digite o nome..." {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="amount"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Valor</FormLabel>
                  <FormControl>
                    <MoneyInput
                      placeholder="Digite o valor..."
                      value={field.value}
                      onValueChange={({ floatValue }) =>
                        field.onChange(floatValue)
                      }
                      onBlur={field.onBlur}
                      disabled={field.disabled}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="type"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Tipo</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select a verified email to display" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {TRANSACTION_TYPE_OPTIONS.map((option) => (
                        <SelectItem key={option.value} value={option.value}>
                          {option.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="category"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Categoria</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Selecione uma categoria" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {TRANSACTION_CATEGORY_OPTIONS.map((option) => (
                        <SelectItem key={option.value} value={option.value}>
                          {option.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="paymentMethod"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Método de Pagamento</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Selecione um método de pagamento" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {TRANSACTION_PAYMENT_METHOD_OPTIONS.map((option) => (
                        <SelectItem key={option.value} value={option.value}>
                          {option.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="date"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Data</FormLabel>
                  <DatePickerDemo
                    value={field.value}
                    onChange={field.onChange}
                  />
                  <FormMessage />
                </FormItem>
              )}
            />

            <DialogFooter>
              <DialogClose asChild>
                <Button type="button">Cancelar</Button>
              </DialogClose>

              <Button type="submit">
                {isEditMode ? "Editar" : "Adicionar"} Transação
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
