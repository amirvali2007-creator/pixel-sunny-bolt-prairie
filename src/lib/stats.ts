import type { Course, Task, TaskType, Priority, TaskStatus } from "./types";
import { daysUntil, toISODate } from "./jalali";

export function isOverdue(task: Task, today = toISODate(new Date())) {
  return task.status !== "done" && task.dueDate < today;
}

export function computeStats(tasks: Task[]) {
  const today = toISODate(new Date());
  const total = tasks.length;
  const completed = tasks.filter((t) => t.status === "done").length;
  const incomplete = total - completed;
  const dueToday = tasks.filter((t) => t.dueDate === today && t.status !== "done").length;
  const overdue = tasks.filter((t) => isOverdue(t, today)).length;
  const graded = tasks.filter((t) => t.grade != null);
  const avgGrade =
    graded.length === 0
      ? null
      : graded.reduce((s, t) => s + (t.grade ?? 0), 0) / graded.length;
  const rate = total === 0 ? 0 : completed / total;

  const byType: Record<string, number> = {};
  const byPriority: Record<Priority, number> = { low: 0, medium: 0, high: 0 };
  const byStatus: Record<TaskStatus, number> = {
    not_started: 0,
    in_progress: 0,
    done: 0,
    postponed: 0,
  };
  const byCourse: Record<string, number> = {};

  for (const t of tasks) {
    byType[t.type] = (byType[t.type] ?? 0) + 1;
    byPriority[t.priority] += 1;
    byStatus[t.status] += 1;
    byCourse[t.courseId] = (byCourse[t.courseId] ?? 0) + 1;
  }

  return {
    total,
    completed,
    incomplete,
    dueToday,
    overdue,
    avgGrade,
    rate,
    byType: byType as Partial<Record<TaskType, number>>,
    byPriority,
    byStatus,
    byCourse,
  };
}

export function courseName(courses: Course[], id: string) {
  return courses.find((c) => c.id === id)?.name ?? "—";
}

export function courseOf(courses: Course[], id: string) {
  return courses.find((c) => c.id === id);
}
