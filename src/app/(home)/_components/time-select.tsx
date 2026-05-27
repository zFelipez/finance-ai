"use client";

import {
  Select,
  SelectContent,
  SelectTrigger,
  SelectItem,
  SelectValue,
} from "@/_components/ui/select";

import { useRouter } from "next/navigation";

const MONTH_OPTIONS = [
  { value: "1", label: "Janeiro" },
  { value: "2", label: "Fevereiro" },
  { value: "3", label: "Março" },
  { value: "4", label: "Abril" },
  { value: "5", label: "Maio" },
  { value: "6", label: "Junho" },
  { value: "7", label: "Julho" },
  { value: "8", label: "Agosto" },
  { value: "9", label: "Setembro" },
  { value: "10", label: "Outubro" },
  { value: "11", label: "Novembro" },
  { value: "12", label: "Dezembro" },
];

type TimeSelectProps = {
  month: string;
};

export function TimeSelect({ month }: TimeSelectProps) {
  const { push } = useRouter();

  function handleTimeChange(month: string) {
    push(`/?month=${month}`);
  }

  return (
    <div>
      <Select value={month} onValueChange={(month) => handleTimeChange(month)}>
        <SelectTrigger className="w-[150px] rounded-full border-slate-500 bg-gray-800 text-white">
          <SelectValue placeholder="Selecione o mês" />
        </SelectTrigger>
        <SelectContent>
          {MONTH_OPTIONS.map((option) => (
            <SelectItem key={option.value} value={option.value}>
              {option.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}
