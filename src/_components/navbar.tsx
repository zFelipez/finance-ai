"use client";

import { UserButton } from "@clerk/nextjs";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Navbar() {
  const navigation = usePathname();

  return (
    <nav className="flex w-full justify-between border-b border-solid px-8 py-4">
      <div className="flex items-center gap-10">
        <Image src="/finance-ai.svg" width={173} height={39} alt="finance ai" />

        <Link
          href="/"
          className={navigation === "/" ? "text-emerald-500" : "text-white"}
        >
          Home
        </Link>
        <Link
          href="/transactions"
          className={
            navigation === "/transactions" ? "text-emerald-500" : "text-white"
          }
        >
          Transactions
        </Link>
        <Link
          href="/subscription"
          className={
            navigation === "/subscription" ? "text-emerald-500" : "text-white"
          }
        >
          Subscriptions
        </Link>
      </div>

      <UserButton showName />
    </nav>
  );
}
