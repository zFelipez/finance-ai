"use client";

import { Button } from "@/_components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/_components/ui/dialog";

import { BotIcon, Loader2Icon } from "lucide-react";
import { generateAiReport } from "../_actions/generate-ai-report";
import React from "react";
import { ScrollArea } from "@/_components/ui/scroll-area";
import Markdown from "react-markdown";

export function AiReportButton({
  month,
  userId,
}: {
  month: string;
  userId: string;
}) {
  const [report, setReport] = React.useState<string | null>(null);
  const [reportLoading, setReportLoading] = React.useState(false);
  async function handleGenerateReport() {
    try {
      setReportLoading(true);
      const aiReport = await generateAiReport({ month, userId });
      setReport(aiReport);
    } catch (error) {
      console.error("Error generating AI report:", error);
    } finally {
      setReportLoading(false);
    }
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="rounded-full font-bold text-emerald-500 hover:bg-emerald-500/10 hover:text-emerald-400">
          AI Report
          <BotIcon />
        </Button>
      </DialogTrigger>

      <DialogContent className="max-w-[600px] border border-gray-700 bg-gray-900 text-white">
        <DialogHeader>
          <DialogTitle className="w-full justify-center font-bold text-white">
            Ai Report
          </DialogTitle>

          <DialogDescription>
            Use artificial intelligence to generate a report.
          </DialogDescription>
        </DialogHeader>

        <ScrollArea className="prose max-h-[450px] rounded-md p-4 prose-h3:text-white prose-h4:text-white prose-p:text-emerald-300 prose-strong:text-white prose-li:text-emerald-300">
          <Markdown>{report}</Markdown>
        </ScrollArea>

        <DialogFooter>
          <DialogClose asChild>
            <Button className="bg-gray-700 text-white hover:bg-gray-600">
              Cancel
            </Button>
          </DialogClose>

          <Button
            onClick={handleGenerateReport}
            disabled={reportLoading}
            className="bg-emerald-500 text-white hover:bg-emerald-400"
          >
            {reportLoading ? (
              <Loader2Icon className="animate-spin" />
            ) : (
              "Generate Report"
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
