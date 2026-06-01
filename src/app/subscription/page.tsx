import Navbar from "@/_components/navbar";
import { Card, CardContent, CardHeader } from "@/_components/ui/card";
import { auth } from "@clerk/nextjs/server";
import { CheckIcon, XIcon } from "lucide-react";
import { redirect } from "next/navigation";
import { AcquirePlanButton } from "./_components/acquire-plan-button";
import { getCurrentMonthTransactions } from "@/_dal/get-current-month-transactions";
import { getUserPlan } from "@/_dal/get-user-plan";

export default async function SubscriptionPage() {
  const userLoggedIn = await auth();

  if (!userLoggedIn.userId) {
    redirect("/login");
  }

  const currentMonthTransactions =
    await getCurrentMonthTransactions(userLoggedIn);

  const { hasPremiumPlan } = await getUserPlan(userLoggedIn.userId);

  return (
    <div>
      <Navbar></Navbar>
      <div className="space-y-6 p-6">
        <h1 className="text-2xl font-bold text-white">Subscription</h1>

        <div className="flex gap-6">
          <Card className="w-[450px] border-gray-500 bg-gray-800">
            <CardHeader className="relative border-b border-solid py-8">
              <h2 className="text-center text-2xl font-semibold text-white">
                Basic Plan
              </h2>
              <div className="flex items-center justify-center gap-3">
                <span className="text-4xl font-bold text-white">R$</span>

                <span className="text-6xl font-semibold text-white">0</span>

                <div className="text-2xl text-gray-500">/month</div>
              </div>
            </CardHeader>

            <CardContent className="space-y-6 py-8">
              <div className="flex items-center gap-2">
                <CheckIcon className="h-6 w-6 text-green-500" />
                <p className="text-white">
                  {" "}
                  Only 10 transactions per month ({currentMonthTransactions}/10)
                </p>
              </div>

              <div className="flex items-center gap-2">
                <XIcon className="h-6 w-6 text-red-500" />
                <p className="text-white">Relatório de IA</p>
              </div>
            </CardContent>
          </Card>

          <Card className="w-[450px] border-gray-500 bg-gray-800">
            <CardHeader className="relative border-b border-solid py-8">
              {hasPremiumPlan && (
                <div className="absolute left-0 top-0 m-2 rounded-full bg-emerald-500 bg-opacity-10 p-1 px-2 text-sm text-white">
                  Ativo
                </div>
              )}

              <h2 className="text-center text-2xl font-semibold text-white">
                Premium Plan
              </h2>
              <div className="flex items-center justify-center gap-3">
                <span className="text-4xl font-bold text-white">R$</span>

                <span className="text-6xl font-semibold text-white">0</span>

                <div className="text-2xl text-gray-500">/month</div>
              </div>
            </CardHeader>

            <CardContent className="space-y-6 py-8">
              <div className="flex items-center gap-2">
                <CheckIcon className="h-6 w-6 text-green-500" />
                <p className="text-white"> Unlimited transactions</p>
              </div>
              <div className="flex items-center gap-2">
                <CheckIcon className="h-6 w-6 text-green-500" />
                <p className="text-white"> IA Report</p>
              </div>
              <AcquirePlanButton />
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
