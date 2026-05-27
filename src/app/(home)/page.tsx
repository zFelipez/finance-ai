import Navbar from "@/_components/navbar";

import { auth } from "@clerk/nextjs/server";

import { redirect } from "next/dist/client/components/navigation";
import { SummaryCards } from "./_components/summary-cards";
import { TimeSelect } from "./_components/time-select";
import { isMatch } from "date-fns";

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

  return (
    <div className="min-h-full bg-slate-950/30">
      <Navbar></Navbar>

      <div className="flex items-center justify-between p-6">
        <h1 className="text-2xl font-bold text-white">Dashboard</h1>
        <TimeSelect month={month}></TimeSelect>
      </div>
      <SummaryCards month={month}></SummaryCards>
    </div>
  );
}
