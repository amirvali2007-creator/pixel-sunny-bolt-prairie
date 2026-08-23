import { createFileRoute } from "@tanstack/react-router";
import { AppShell } from "@/components/app-shell";
import { MonthCalendar } from "@/components/month-calendar";

export const Route = createFileRoute("/calendar")({ component: CalendarPage });

function CalendarPage() {
  return (
    <AppShell>
      <div className="mb-4">
        <h2 className="text-base font-semibold">تقویم ماهانه</h2>
        <p className="text-sm text-muted">
          تکالیف روی روزها می‌نشینند؛ روز را بزنید تا برنامه همان تاریخ را ببینید.
        </p>
      </div>
      <MonthCalendar />
    </AppShell>
  );
}
