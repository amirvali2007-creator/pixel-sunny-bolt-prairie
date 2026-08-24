import { createFileRoute } from "@tanstack/react-router";
import { AppShell } from "@/components/app-shell";
import { WeekPlanner } from "@/components/week-planner";

export const Route = createFileRoute("/weekly")({ component: WeeklyPage });

function WeeklyPage() {
  return (
    <AppShell>
      <p className="mb-4 text-sm text-muted">
        نوار روزها را بزنید تا به دیروز، فردا یا هر تاریخ دیگری بروید. روی خانهٔ ساعت کلیک کنید تا جلسه
        بگذارید. بازه ساعت از تنظیمات قابل تغییر است.
      </p>
      <WeekPlanner />
    </AppShell>
  );
}
