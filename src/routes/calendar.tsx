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
          روز را از نوار بالا یا خود تقویم انتخاب کنید، بعد تکلیف، جلسه مطالعه، امتحان یا رویداد همان
          تاریخ را اضافه کنید.
        </p>
      </div>
      <MonthCalendar />
    </AppShell>
  );
}
