import { CardContent, CardHeader, CardTitle } from "@/_components/ui/card";
import { Progress } from "@/_components/ui/progress";

import { ScrollArea } from "@/_components/ui/scroll-area";
import { TotalExpensePerCategory } from "@/_dal/types";

type ExpensesPerCategoryProps = {
  totalExpensePerCategory: TotalExpensePerCategory[];
};

export function ExpensesPerCategory({
  totalExpensePerCategory,
}: ExpensesPerCategoryProps) {
  return (
    <ScrollArea className="col-span-1 h-full rounded-md border border-slate-500 bg-gray-800 pb-6">
      <CardHeader>
        <CardTitle className="font-bold text-white">
          Despesas por categoria
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {totalExpensePerCategory.map((category) => (
          <div key={category.category} className="space-y-2">
            <div className="flex w-full justify-between">
              <p className="font-bold text-white">{category.category}</p>
              <p className="font-bold text-white">
                {category.percentageTotal}%
              </p>
            </div>
            <Progress
              value={category.percentageTotal}
              className="h-3 rounded-full bg-emerald-600"
            />
          </div>
        ))}
      </CardContent>
    </ScrollArea>
  );
}
