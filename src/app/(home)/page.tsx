import Navbar from "@/_components/navbar";

import { auth } from "@clerk/nextjs/server";

import { redirect } from "next/dist/client/components/navigation";
import { SummaryCards } from "./_components/summary-cards";
import { TimeSelect } from "./_components/time-select";
import { isMatch } from "date-fns";
import { ChartPie } from "./_components/chart";
import { getDashboardData } from "@/_dal/get-dashboard";

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
  const { receipt, expense, invested, typesPercentage } =
    await getDashboardData({
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

      <div className="grid grid-cols-[2fr,1fr]">
        <SummaryCards
          receipt={receipt}
          expense={expense}
          invested={invested}
        ></SummaryCards>
      </div>
      <div className="grid grid-cols-[1fr,2fr] grid-rows-1 gap-6 px-6">
        <ChartPie
          invested={invested}
          receipt={receipt}
          expense={expense}
          typesPercentage={typesPercentage}
        ></ChartPie>
      </div>
    </div>
  );
}
