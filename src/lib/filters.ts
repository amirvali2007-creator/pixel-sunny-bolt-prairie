import type { Priority, Task, TaskStatus, TaskType } from "./types";
import { daysUntil } from "./jalali";

export interface TaskFilters {
  q: string;
  courseId: string;
  type: "" | TaskType;
  priority: "" | Priority;
  status: "" | TaskStatus;
  remaining: "all" | "overdue" | "today" | "3" | "7" | "14" | "later";
  completed: "include" | "hide" | "only";
  minImportance: number;
  hasGrade: "all" | "yes" | "no";
}

export const EMPTY_FILTERS: TaskFilters = {
  q: "",
  courseId: "",
  type: "",
  priority: "",
  status: "",
  remaining: "all",
  completed: "include",
  minImportance: 0,
  hasGrade: "all",
};

export function filterTasks(tasks: Task[], f: TaskFilters): Task[] {
  const q = f.q.trim();
  return tasks.filter((t) => {
    if (f.courseId && t.courseId !== f.courseId) return false;
    if (f.type && t.type !== f.type) return false;
    if (f.priority && t.priority !== f.priority) return false;
    if (f.status && t.status !== f.status) return false;
    if (f.completed === "hide" && t.status === "done") return false;
    if (f.completed === "only" && t.status !== "done") return false;
    if (t.importance < f.minImportance) return false;
    if (f.hasGrade === "yes" && t.grade == null) return false;
    if (f.hasGrade === "no" && t.grade != null) return false;
    if (q) {
      const blob = `${t.title} ${t.description} ${t.notes}`.toLowerCase();
      if (!blob.includes(q.toLowerCase())) return false;
    }
    if (f.remaining !== "all") {
      const d = daysUntil(t.dueDate);
      if (f.remaining === "overdue" && !(d < 0 && t.status !== "done")) return false;
      if (f.remaining === "today" && d !== 0) return false;
      if (f.remaining === "3" && !(d >= 0 && d <= 3)) return false;
      if (f.remaining === "7" && !(d >= 0 && d <= 7)) return false;
      if (f.remaining === "14" && !(d >= 0 && d <= 14)) return false;
      if (f.remaining === "later" && d <= 14) return false;
    }
    return true;
  });
}

export function filtersActive(f: TaskFilters) {
  return (
    f.q.trim() !== "" ||
    f.courseId !== "" ||
    f.type !== "" ||
    f.priority !== "" ||
    f.status !== "" ||
    f.remaining !== "all" ||
    f.completed !== "include" ||
    f.minImportance > 0 ||
    f.hasGrade !== "all"
  );
}
