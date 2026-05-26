"server-only";

import { db } from "@/_lib/prisma";

export function getTransactionData() {
  return db.transaction.findMany({});
}
