import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { AppShell, useTaskDialog } from "@/components/app-shell";
import { FilterPanel } from "@/components/filter-panel";
import { PriorityBars, StatusBars } from "@/components/planner-charts";
import { TaskTable } from "@/components/task-table";
import { EMPTY_FILTERS, filterTasks } from "@/lib/filters";
import { usePlannerStore } from "@/lib/store";

export const Route = createFileRoute("/tasks")({ component: TasksPage });

function TasksPage() {
  return (
    <AppShell>
      <TasksView />
    </AppShell>
  );
}

function TasksView() {
  const tasks = usePlannerStore((s) => s.tasks);
  const { openNew, openEdit } = useTaskDialog();
  const [filters, setFilters] = useState(EMPTY_FILTERS);
  const filtered = useMemo(() => filterTasks(tasks, filters), [tasks, filters]);
  const sorted = useMemo(
    () => filtered.slice().sort((a, b) => a.dueDate.localeCompare(b.dueDate)),
    [filtered],
  );

  return (
    <div className="space-y-4">
      <div>
        <h2 className="text-base font-semibold">پلنر تکالیف</h2>
        <p className="text-sm text-muted">
          فیلتر کنید، اولویت بگذارید، نمره ثبت کنید و خروجی اکسل بگیرید.
        </p>
      </div>
      <div className="grid gap-3 md:grid-cols-2">
        <article className="overflow-hidden rounded-lg bg-paper shadow-sheet">
          <PriorityBars tasks={filtered} />
        </article>
        <article className="overflow-hidden rounded-lg bg-paper shadow-sheet">
          <StatusBars tasks={filtered} />
        </article>
      </div>
      <FilterPanel filters={filters} onChange={setFilters} resultCount={sorted.length} />
      <TaskTable
        tasks={sorted}
        onEdit={openEdit}
        onAdd={() => openNew()}
        title="تکالیف فیلترشده"
      />
    </div>
  );
}
