"use server";

import { getUserPlan } from "@/_dal/get-user-plan";
import { db } from "@/_lib/prisma";
import OpenAI from "openai";
import { generateReportSchema, GenerateReportSchema } from "./schema";

export async function generateAiReport({
  month,
  userId,
}: {
  month: GenerateReportSchema["month"];
  userId: string;
}) {
  generateReportSchema.parse({ month });
  if (!userId) {
    throw new Error("Unauthorized");
  }

  const hasPremiumPlan = await getUserPlan(userId);

  if (!hasPremiumPlan) {
    throw new Error("User does not have access to this feature");
  }

  const openai = new OpenAI({
    apiKey: process.env.OPEN_AI_API_KEY,
  });

  if (!openai) {
    throw new Error("OpenAI client not initialized");
  }
  const transactions = await db.transaction.findMany({
    where: {
      userID: userId,
      date: {
        gte: new Date(`2026-${month}-01`),
        lt: new Date(`2026-${month}-31`),
      },
    },
  });

  const content = `Gere um relatório com insights sobre as minhas finanças, com dicas e orientações de como melhorar minha vida financeira. As transações estão divididas por ponto e vírgula. A estrutura de cada uma é {DATA}-{VALUE}-{TIPO}-{CATEGORIA}. São elas:
  ${transactions
    .map(
      (transaction) =>
        `${transaction.date.toLocaleDateString("pt-BR")}-R$${transaction.amount}-${transaction.type}-${transaction.category}`,
    )
    .join(";")}`;

  const completions = await openai.chat.completions.create({
    model: "gpt-4o-mini",
    messages: [
      {
        role: "system",
        content:
          "Você é um assistente financeiro pessoal que ajuda os usuários a entenderem suas finanças e oferece conselhos personalizados com base em seus hábitos de gasto. Analise as transações fornecidas e gere um relatório detalhado com insights sobre as finanças do usuário, incluindo dicas práticas para economizar dinheiro, investir melhor e alcançar seus objetivos financeiros.",
      },
      {
        role: "user",
        content: content,
      },
    ],
  });

  return completions.choices[0].message.content;
}
