import { clerkClient } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import Stripe from "stripe";

const getStripeId = (value: string | { id: string } | null) => {
  if (!value) {
    return null;
  }

  return typeof value === "string" ? value : value.id;
};

const errorResponse = (message: string, status = 400) =>
  NextResponse.json({ error: message }, { status });

const updateClerkUserPlan = async ({
  clerkUserId,
  customer,
  subscription,
  subscriptionPlan,
}: {
  clerkUserId: string;
  customer: string | { id: string } | null;
  subscription: string | { id: string } | null;
  subscriptionPlan: "premium" | null;
}) => {
  const clerk = await clerkClient();

  await clerk.users.updateUser(clerkUserId, {
    privateMetadata: {
      stripeCustomerId: getStripeId(customer),
      stripeSubscriptionId: getStripeId(subscription),
    },
    publicMetadata: {
      subscriptionPlan,
    },
  });
};

export const POST = async (request: Request) => {
  if (!process.env.STRIPE_SECRET_KEY || !process.env.STRIPE_WEBHOOK_SECRET) {
    return errorResponse("Stripe environment variables not configured", 500);
  }
  const signature = request.headers.get("stripe-signature");
  if (!signature) {
    return errorResponse("Missing stripe-signature header");
  }
  const text = await request.text();
  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
    apiVersion: "2024-10-28.acacia",
  });
  const event = stripe.webhooks.constructEvent(
    text,
    signature,
    process.env.STRIPE_WEBHOOK_SECRET,
  );

  console.log("[stripe-webhook] event received", {
    type: event.type,
    id: event.id,
  });

  switch (event.type) {
    case "invoice.paid": {
      const { customer, subscription, subscription_details } =
        event.data.object;
      let clerkUserId = subscription_details?.metadata?.clerk_user_id;

      console.log("[stripe-webhook] invoice.paid payload", {
        customer,
        subscription,
        subscriptionMetadata: subscription_details?.metadata ?? null,
      });

      if (!clerkUserId) {
        const subscriptionId = getStripeId(subscription);

        if (subscriptionId) {
          const stripeSubscription =
            await stripe.subscriptions.retrieve(subscriptionId);

          clerkUserId = stripeSubscription.metadata.clerk_user_id;

          console.log("[stripe-webhook] invoice.paid subscription fallback", {
            subscriptionId,
            subscriptionMetadata: stripeSubscription.metadata,
            clerkUserId: clerkUserId ?? null,
          });
        }
      }

      if (!clerkUserId) {
        console.error("[stripe-webhook] clerk user id not found", {
          eventId: event.id,
        });
        break;
      }

      console.log("[stripe-webhook] updating clerk user", {
        clerkUserId,
        customerId: getStripeId(customer),
        subscriptionId: getStripeId(subscription),
      });

      await updateClerkUserPlan({
        clerkUserId,
        customer,
        subscription,
        subscriptionPlan: "premium",
      });
      break;
    }
    case "checkout.session.completed": {
      const { customer, subscription, metadata } = event.data.object;

      console.log("[stripe-webhook] checkout.session.completed payload", {
        customer,
        subscription,
        metadata: metadata ?? null,
      });

      break;
    }
    case "customer.subscription.created":
    case "customer.subscription.updated": {
      const { customer, id, metadata, status } = event.data.object;
      const clerkUserId = metadata.clerk_user_id;

      console.log("[stripe-webhook] subscription event payload", {
        type: event.type,
        customer,
        subscriptionId: id,
        status,
        metadata,
      });

      if (!clerkUserId) {
        return errorResponse(`Clerk user ID not found for ${event.type}`);
      }

      await updateClerkUserPlan({
        clerkUserId,
        customer,
        subscription: id,
        subscriptionPlan: "premium",
      });

      break;
    }
    case "customer.subscription.deleted": {
      const subscription = await stripe.subscriptions.retrieve(
        event.data.object.id,
      );

      const { customer } = subscription;
      const clerkUserId = subscription.metadata.clerk_user_id;

      if (!clerkUserId) {
        return NextResponse.error();
      }

      await updateClerkUserPlan({
        clerkUserId,
        customer,
        subscription: null,
        subscriptionPlan: null,
      });

      break;
    }
  }
  return NextResponse.json({ received: true });
};
