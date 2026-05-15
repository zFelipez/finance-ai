"use client";

import * as React from "react";
import { ChevronLeftIcon, ChevronRightIcon } from "lucide-react";
import { DayPicker } from "react-day-picker";

import { cn } from "@/_lib/utils";
import { buttonVariants } from "@/_components/ui/button";

function Calendar({
  className,
  classNames,
  showOutsideDays = true,
  ...props
}: React.ComponentProps<typeof DayPicker>) {
  return (
    <DayPicker
      showOutsideDays={showOutsideDays}
      className={cn("bg-background p-3", className)}
      classNames={{
        months: "flex flex-col space-y-4 sm:flex-row sm:space-x-4 sm:space-y-0",
        month: "space-y-4",
        caption: "relative flex items-center justify-center pt-1",
        caption_label: "text-sm font-medium text-slate-100",
        nav: "flex items-center space-x-1",
        nav_button: cn(
          buttonVariants({ variant: "ghost" }),
          "h-7 w-7 bg-transparent p-0 text-slate-400 opacity-70 hover:bg-slate-800 hover:text-slate-100 hover:opacity-100",
        ),
        nav_button_previous: "absolute left-1",
        nav_button_next: "absolute right-1",
        table: "w-full border-collapse space-y-1",
        head_row: "flex",
        head_cell: "w-9 rounded-md text-[0.8rem] font-normal text-slate-500",
        row: "mt-2 flex w-full",
        cell: "relative h-9 w-9 p-0 text-center text-sm focus-within:relative focus-within:z-20 [&:has([aria-selected])]:bg-slate-800/60 first:[&:has([aria-selected])]:rounded-l-md last:[&:has([aria-selected])]:rounded-r-md",
        day: cn(
          buttonVariants({ variant: "ghost" }),
          "h-9 w-9 p-0 font-normal text-slate-100 aria-selected:opacity-100 hover:bg-slate-800 hover:text-slate-50",
        ),
        day_selected:
          "bg-emerald-500 text-slate-950 hover:bg-emerald-400 hover:text-slate-950 focus:bg-emerald-500 focus:text-slate-950",
        day_today:
          "border border-emerald-400/40 bg-emerald-400/10 text-emerald-200",
        day_outside:
          "text-slate-600 aria-selected:bg-slate-800/50 aria-selected:text-slate-500",
        day_disabled: "text-slate-700 opacity-50",
        day_range_middle:
          "aria-selected:bg-slate-800 aria-selected:text-slate-100",
        day_hidden: "invisible",
        ...classNames,
      }}
      components={{
        IconLeft: ({ ...props }) => (
          <ChevronLeftIcon className="h-4 w-4" {...props} />
        ),
        IconRight: ({ ...props }) => (
          <ChevronRightIcon className="h-4 w-4" {...props} />
        ),
      }}
      {...props}
    />
  );
}

export { Calendar };
