import { createFileRoute } from "@tanstack/react-router";
import { AppShell } from "@/components/app-shell";
import { ExamBoard } from "@/components/exam-board";

export const Route = createFileRoute("/exams")({ component: ExamsPage });

function ExamsPage() {
  return (
    <AppShell>
      <ExamBoard />
    </AppShell>
  );
}
