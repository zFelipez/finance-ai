import { Badge } from "@/_components/ui/badge";
import { TransactionType } from "@prisma/client/wasm";
import { CircleIcon } from "lucide-react";

export function TrancationTypeBadge({ type }: { type: TransactionType }) {
  if (type === TransactionType.DEPOSIT) {
    return (
      <Badge variant="outline" className="bg-muted">
        <CircleIcon className="mr-2 fill-primary" size={10}>
          {" "}
        </CircleIcon>
        Deposito
      </Badge>
    );
  }
  if (type === TransactionType.EXPENSE) {
    return (
      <Badge variant="outline">
        <CircleIcon className="mr-2 fill-rose-400" size={10}>
          {" "}
        </CircleIcon>
        Despesa
      </Badge>
    );
  }

  return (
    <Badge variant="outline">
      <CircleIcon className="mr-2 fill-sky-400" size={10}>
        {" "}
      </CircleIcon>
      Investimento
    </Badge>
  );
}
