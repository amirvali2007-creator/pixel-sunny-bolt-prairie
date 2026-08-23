import { createFileRoute } from "@tanstack/react-router";
import { AppShell } from "@/components/app-shell";
import { DashboardView } from "@/components/dashboard-view";

export const Route = createFileRoute("/")({ component: Home });

function Home() {
  return (
    <AppShell>
      <DashboardView />
    </AppShell>
  );
}
