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
      redirect(`/?month=${new Date().getMonth() + 1}`);
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
    <>
      <Navbar />
      <div className="flex h-full flex-col space-y-6 overflow-hidden p-6">
        <div className="flex justify-between">
          <h1 className="text-2xl font-bold text-white">Dashboard</h1>
          <TimeSelect month={month} />
        </div>
        <div className="grid h-full grid-cols-[2fr,1fr] gap-6 overflow-hidden">
          <div className="flex flex-col gap-6 overflow-hidden">
            <SummaryCards
              receipt={receipt}
              expense={expense}
              invested={invested}
            />
            <div className="grid h-full grid-cols-[1fr,2fr] grid-rows-1 gap-6 overflow-hidden">
              <ChartPie
                invested={invested}
                receipt={receipt}
                expense={expense}
                typesPercentage={typesPercentage}
              />
              <ExpensesPerCategory
                totalExpensePerCategory={totalExpensePerCategory}
              />
            </div>
          </div>
          <LastTransactions lastTransactions={lastTransactions} />
        </div>
      </div>
    </>
  );
}
