import Navbar from "@/_components/navbar";

import { auth } from "@clerk/nextjs/server";

import { redirect } from "next/dist/client/components/navigation";
import { SummaryCards } from "./_components/summary-cards";
import { TimeSelect } from "./_components/time-select";
import { isMatch } from "date-fns";
import { ChartPie } from "./_components/chart";
import { getDashboardData } from "@/_dal/get-dashboard";
import { ExpensesPerCategory } from "./_components/expenses-per-category";
import { LastTransactions } from "./_components/last-transactions";

export default async function Home({
  searchParams: { month },
}: {
  searchParams: { month: string };
}) {
  const { userId } = await auth();
  if (!userId) {
    redirect("/login");
  }

  const monthisInvalid = !month || !isMatch(month, "MM");

  if (monthisInvalid) {
    {
      redirect("?month=1");
    }
  }
  const {
    receipt,
    expense,
    invested,
    typesPercentage,
    totalExpensePerCategory,
    lastTransactions,
  } = await getDashboardData({
    month,
    userID: userId,
  });

  return (
    <div className="min-h-full bg-slate-950/30">
      <Navbar></Navbar>

      <div className="flex items-center justify-between p-6">
        <h1 className="text-2xl font-bold text-white">Dashboard</h1>
        <TimeSelect month={month}></TimeSelect>
      </div>

      <div className="grid grid-cols-[2fr,1fr] gap-6 p-6">
        <div>
          <SummaryCards
            receipt={receipt}
            expense={expense}
            invested={invested}
          ></SummaryCards>
          <div className="grid grid-cols-2 gap-6 py-6">
            <ChartPie
              invested={invested}
              receipt={receipt}
              expense={expense}
              typesPercentage={typesPercentage}
            ></ChartPie>
            <ExpensesPerCategory
              totalExpensePerCategory={totalExpensePerCategory}
            ></ExpensesPerCategory>
          </div>
        </div>

        <div className="h-full min-h-0 overflow-hidden pb-6">
          <LastTransactions
            lastTransactions={lastTransactions}
          ></LastTransactions>
        </div>
      </div>
    </div>
  );
}
