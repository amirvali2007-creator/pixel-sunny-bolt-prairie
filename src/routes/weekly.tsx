import { createFileRoute } from "@tanstack/react-router";
import { AppShell } from "@/components/app-shell";
import { WeekPlanner } from "@/components/week-planner";

export const Route = createFileRoute("/weekly")({ component: WeeklyPage });

function WeeklyPage() {
  return (
    <AppShell>
      <p className="mb-4 text-sm text-muted">
        روی خانهٔ ساعت بزنید و جلسه مطالعه بگذارید — مثل پلنر ساعتی اکسل، با تقویم جلالی.
      </p>
      <WeekPlanner />
    </AppShell>
  );
}
