import { AddTransactionButton } from "@/_components/add-transaction-button";
import { Card, CardContent, CardHeader } from "@/_components/ui/card";

type SummaryCardProps = {
  icon: React.ReactNode;
  title: string;
  amount: number;
  size?: "small" | "large";
  canAddTransaction?: boolean;
};

export function SummaryCard({
  icon,
  title,
  amount,
  size = "small",
  canAddTransaction = false,
}: SummaryCardProps) {
  return (
    <Card className="border-slate-500 bg-gray-800">
      <CardHeader className="flex-row items-center space-x-2">
        {icon}
        <p
          className={size === "large" ? "text-white opacity-70" : "text-white"}
        >
          {title}
        </p>
      </CardHeader>

      <CardContent className="flex items-center justify-between">
        <p
          className={
            size === "large"
              ? "text-4xl font-bold text-white"
              : "text-2xl font-bold text-white"
          }
        >
          {Intl.NumberFormat("pt-BR", {
            style: "currency",
            currency: "BRL",
          }).format(amount)}
        </p>

        {size === "large" && (
          <AddTransactionButton canAddTransaction={canAddTransaction} />
        )}
      </CardContent>
    </Card>
  );
}
