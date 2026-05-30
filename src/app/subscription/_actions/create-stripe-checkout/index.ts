"use server";

import { auth } from "@clerk/nextjs/server";

import Stripe from "stripe";

export async function createStripeCheckout() {
  const { userId } = await auth();

  if (!userId) {
    throw new Error("User not authenticated");
  }

  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
    apiVersion: "2024-10-28.acacia",
  });

  const session = await stripe.checkout.sessions.create({
    payment_method_types: ["card"],
    mode: "subscription",
    success_url: `${process.env.NEXT_APP_URL}`,
    cancel_url: `${process.env.NEXT_APP_URL}/subscription`,
    line_items: [
      {
        price: process.env.STRIPE_PREMIUM_PLAN_PRICE_ID!,
        quantity: 1,
      },
    ],
    subscription_data: {
      metadata: {
        clerk_user_id: userId,
      },
    },
  });

  return { sessionId: session.id };
}
