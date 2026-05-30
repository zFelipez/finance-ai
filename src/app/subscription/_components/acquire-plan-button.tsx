"use client";

import { Button } from "@/_components/ui/button";
import { createStripeCheckout } from "../_actions/create-stripe-checkout";

import { loadStripe } from "@stripe/stripe-js";

export function AcquirePlanButton() {
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

  return (
    <Button
      onClick={handleAcquirePlanClick}
      className="w-full rounded-full bg-emerald-500 text-white hover:bg-emerald-600"
    >
      Get plan
    </Button>
  );
}
