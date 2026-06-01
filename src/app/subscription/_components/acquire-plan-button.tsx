"use client";

import { Button } from "@/_components/ui/button";
import { createStripeCheckout } from "../_actions/create-stripe-checkout";

import { loadStripe } from "@stripe/stripe-js";
import { useUser } from "@clerk/nextjs";
import Link from "next/link";

export function AcquirePlanButton() {
  const { user } = useUser();

  const handleAcquirePlanClick = async () => {
    const { sessionId } = await createStripeCheckout();

    if (!process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY) {
      throw new Error("Stripe publishable key not found");
    }

    const stripe = await loadStripe(
      process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!,
    );

    if (!stripe) {
      throw new Error("Stripe failed to initialize");
    }

    await stripe.redirectToCheckout({ sessionId });
  };

  const hasPremiumPlan = user?.publicMetadata.subscriptionPlan === "premium";

  if (hasPremiumPlan) {
    return (
      <Button
        variant="link"
        className="w-full rounded-full bg-emerald-500 text-white hover:bg-emerald-600"
      >
        <Link
          href={`${process.env.NEXT_PUBLIC_STRIPE_CUSTOMER_PORTAL_URL as string}?prefilled_email=${user?.emailAddresses[0]?.emailAddress}`}
        >
          Manage Subscription
        </Link>
      </Button>
    );
  }
  return (
    <Button
      onClick={handleAcquirePlanClick}
      className="w-full rounded-full bg-emerald-500 text-white hover:bg-emerald-600"
    >
      Acquire Premium Plan
    </Button>
  );
}
