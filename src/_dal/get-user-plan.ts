"server-only";

import { clerkClient } from "@clerk/nextjs/server";

export async function getUserPlan(userId: string) {
  const user = await clerkClient().users.getUser(userId);
  const hasPremiumPlan = user.publicMetadata.subscriptionPlan === "premium";

  return { hasPremiumPlan: hasPremiumPlan };
}
