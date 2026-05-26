import Navbar from "@/_components/navbar";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

export default async function SubscriptionPage() {
  const userLoggedIn = await auth();

  if (!userLoggedIn.userId) {
    redirect("/login");
  }

  return (
    <div>
      <Navbar></Navbar>
      <h1>Subscription Page</h1>
      <p>Manage your subscription here.</p>
    </div>
  );
}
