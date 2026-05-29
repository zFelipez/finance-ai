import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function CalculatePercentage(partialValue: number, totalValue: number) {
  if (totalValue === 0) {
    return 0; // Avoid division by zero
  }
  return Math.round((partialValue / totalValue) * 100);
}

const currencyFormatter = new Intl.NumberFormat("pt-BR", {
  style: "currency",
  currency: "BRL",
});

export function formatCurrency(value: number) {
  return currencyFormatter.format(value);
}
