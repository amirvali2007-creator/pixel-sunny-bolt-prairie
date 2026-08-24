import { Copy, Pencil, Plus, Trash2 } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { NativeSelect } from "@/components/ui/input";
import { daysUntil, formatJalaliShort, formatTimeFa, remainingLabel, toFa } from "@/lib/jalali";
import { courseName, isOverdue } from "@/lib/stats";
import { usePlannerStore } from "@/lib/store";
import type { Priority, Task, TaskStatus, TaskType } from "@/lib/types";
import {
  COURSE_CHIP,
  COURSE_DOT,
  PRIORITY_LABELS,
  STATUSES,
  STATUS_LABELS,
  TASK_TYPE_LABELS,
  TASK_TYPES,
} from "@/lib/types";
import { cn } from "@/lib/utils";

const HEADERS = [
  { key: "#", cls: "bg-lilac w-10" },
  { key: "✓", cls: "bg-mint w-10" },
  { key: "نام کلاس", cls: "bg-sky" },
  { key: "عنوان وظیفه", cls: "bg-blush" },
  { key: "نوع", cls: "bg-sand" },
  { key: "توضیحات", cls: "bg-peach" },
  { key: "اولویت", cls: "bg-lilac" },
  { key: "وضعیت", cls: "bg-mint" },
  { key: "مهلت انجام", cls: "bg-sky" },
  { key: "ددلاین", cls: "bg-sand" },
  { key: "باقی‌مانده", cls: "bg-blush" },
  { key: "نمره", cls: "bg-peach" },
  { key: "اهمیت", cls: "bg-lilac" },
  { key: "یادداشت", cls: "bg-mint" },
  { key: "", cls: "bg-sky w-24" },
] as const;

function priorityTone(p: Priority) {
  return p === "high" ? "bg-high" : p === "medium" ? "bg-mid" : "bg-low";
}

function statusTone(task: Task) {
  if (isOverdue(task)) return "bg-late";
  if (task.status === "done") return "bg-done";
  if (task.status === "in_progress") return "bg-doing";
  if (task.status === "postponed") return "bg-wait";
  return "";
}

function remainingTone(task: Task) {
  if (task.status === "done") return "bg-mint";
  const d = daysUntil(task.dueDate);
  if (d < 0) return "bg-late";
  if (d === 0) return "bg-peach";
  if (d <= 3) return "bg-sand";
  return "";
}

export function TaskTable({
  tasks,
  onEdit,
  onAdd,
  title = "تکالیف",
}: {
  tasks: Task[];
  onEdit: (task: Task) => void;
  onAdd: () => void;
  title?: string;
}) {
  const courses = usePlannerStore((s) => s.courses);
  const updateTask = usePlannerStore((s) => s.updateTask);
  const deleteTask = usePlannerStore((s) => s.deleteTask);
  const toggleTaskDone = usePlannerStore((s) => s.toggleTaskDone);
  const duplicateTask = usePlannerStore((s) => s.duplicateTask);
  const [selected, setSelected] = useState<Record<string, boolean>>({});

  const selectedIds = tasks.filter((t) => selected[t.id]).map((t) => t.id);

  function toggleAll(on: boolean) {
    const next: Record<string, boolean> = {};
    if (on) for (const t of tasks) next[t.id] = true;
    setSelected(next);
  }

  function remove(id: string) {
    deleteTask(id);
    toast.success("تکلیف حذف شد");
  }

  function bulkDone() {
    selectedIds.forEach((id) => updateTask(id, { status: "done" }));
    setSelected({});
    toast.success("موارد انتخاب‌شده تکمیل شد");
  }

  function bulkDelete() {
    selectedIds.forEach((id) => deleteTask(id));
    setSelected({});
    toast.success("موارد انتخاب‌شده حذف شد");
  }

  return (
    <div className="overflow-hidden rounded-lg bg-paper shadow-sheet">
      <div className="flex items-center justify-between gap-3 bg-blush px-4 py-2">
        <h2 className="text-sm font-semibold">{title}</h2>
        <div className="flex items-center gap-2">
          {selectedIds.length > 0 ? (
            <>
              <span className="text-xs text-muted">{toFa(selectedIds.length)} مورد</span>
              <Button size="sm" variant="secondary" onClick={bulkDone}>
                تکمیل
              </Button>
              <Button size="sm" variant="danger" onClick={bulkDelete}>
                حذف
              </Button>
            </>
          ) : null}
          <Button size="sm" onClick={onAdd}>
            <Plus />
            افزودن
          </Button>
        </div>
      </div>

      <div className="divide-y divide-line md:hidden">
        {tasks.length === 0 ? (
          <EmptyRow onAdd={onAdd} />
        ) : (
          tasks.map((task) => {
            const course = courses.find((c) => c.id === task.courseId);
            return (
              <article key={task.id} className="flex gap-3 px-4 py-3">
                <Checkbox
                  checked={task.status === "done"}
                  onCheckedChange={() => toggleTaskDone(task.id)}
                  aria-label="تکمیل"
                  className="mt-1"
                />
                <button
                  type="button"
                  className="min-w-0 flex-1 text-right"
                  onClick={() => onEdit(task)}
                >
                  <div className="flex items-center gap-2">
                    {course ? (
                      <span className={cn("size-2 rounded-full", COURSE_DOT[course.color])} />
                    ) : null}
                    <span className="truncate text-sm font-medium">{task.title}</span>
                  </div>
                  <div className="mt-1 flex flex-wrap items-center gap-1.5 text-xs text-muted">
                    <span>{course?.name ?? "بدون درس"}</span>
                    <span>·</span>
                    <span>{TASK_TYPE_LABELS[task.type]}</span>
                    <span>·</span>
                    <span>{remainingLabel(task.dueDate, task.status === "done")}</span>
                  </div>
                </button>
                <span
                  className={cn(
                    "h-fit rounded-sm px-2 py-0.5 text-xs",
                    priorityTone(task.priority),
                  )}
                >
                  {PRIORITY_LABELS[task.priority]}
                </span>
              </article>
            );
          })
        )}
      </div>

      <div className="hidden overflow-x-auto md:block">
        <table className="sheet-table w-full min-w-[1080px]">
          <thead>
            <tr>
              {HEADERS.map((h) => (
                <th key={h.key} className={h.cls}>
                  {h.key === "✓" ? (
                    <Checkbox
                      checked={tasks.length > 0 && selectedIds.length === tasks.length}
                      onCheckedChange={(v) => toggleAll(Boolean(v))}
                      aria-label="انتخاب همه"
                    />
                  ) : (
                    h.key
                  )}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {tasks.length === 0 ? (
              <tr>
                <td colSpan={HEADERS.length} className="py-10">
                  <EmptyRow onAdd={onAdd} />
                </td>
              </tr>
            ) : (
              tasks.map((task, i) => {
                const overdue = isOverdue(task);
                return (
                  <tr key={task.id}>
                    <td>{toFa(i + 1)}</td>
                    <td>
                      <div className="flex justify-center">
                        <Checkbox
                          checked={Boolean(selected[task.id])}
                          onCheckedChange={(v) =>
                            setSelected((s) => ({ ...s, [task.id]: Boolean(v) }))
                          }
                          aria-label="انتخاب"
                        />
                      </div>
                    </td>
                    <td>
                      <NativeSelect
                        className="h-8 border-0 bg-transparent text-xs shadow-none"
                        value={task.courseId}
                        onChange={(e) => updateTask(task.id, { courseId: e.target.value })}
                      >
                        {courses.map((c) => (
                          <option key={c.id} value={c.id}>
                            {c.name}
                          </option>
                        ))}
                      </NativeSelect>
                    </td>
                    <td className="max-w-48">
                      <button
                        type="button"
                        className="w-full truncate text-right font-medium hover:text-accent"
                        onClick={() => onEdit(task)}
                      >
                        {task.title}
                      </button>
                    </td>
                    <td>
                      <NativeSelect
                        className="h-8 border-0 bg-transparent text-xs shadow-none"
                        value={task.type}
                        onChange={(e) =>
                          updateTask(task.id, { type: e.target.value as TaskType })
                        }
                      >
                        {TASK_TYPES.map((t) => (
                          <option key={t} value={t}>
                            {TASK_TYPE_LABELS[t]}
                          </option>
                        ))}
                      </NativeSelect>
                    </td>
                    <td className="max-w-56 text-right text-muted">
                      <span className="line-clamp-2">{task.description || "—"}</span>
                    </td>
                    <td data-tone className={priorityTone(task.priority)}>
                      <NativeSelect
                        className="h-8 border-0 bg-transparent text-xs shadow-none"
                        value={task.priority}
                        onChange={(e) =>
                          updateTask(task.id, { priority: e.target.value as Priority })
                        }
                      >
                        {(["high", "medium", "low"] as Priority[]).map((p) => (
                          <option key={p} value={p}>
                            {PRIORITY_LABELS[p]}
                          </option>
                        ))}
                      </NativeSelect>
                    </td>
                    <td data-tone className={statusTone(task)}>
                      <NativeSelect
                        className="h-8 border-0 bg-transparent text-xs shadow-none"
                        value={task.status}
                        onChange={(e) =>
                          updateTask(task.id, { status: e.target.value as TaskStatus })
                        }
                      >
                        {STATUSES.map((s) => (
                          <option key={s} value={s}>
                            {STATUS_LABELS[s]}
                          </option>
                        ))}
                      </NativeSelect>
                      {overdue ? (
                        <div className="text-xs font-medium">عقب‌افتاده</div>
                      ) : null}
                    </td>
                    <td>
                      <div>{formatJalaliShort(task.dueDate)}</div>
                    </td>
                    <td>{formatTimeFa(task.dueTime)}</td>
                    <td data-tone className={remainingTone(task)}>
                      {remainingLabel(task.dueDate, task.status === "done")}
                    </td>
                    <td>{task.grade != null ? toFa(task.grade) : "—"}</td>
                    <td>
                      <div className="mx-auto h-1.5 w-16 overflow-hidden rounded-full bg-line">
                        <div
                          className="h-full bg-accent"
                          style={{ width: `${task.importance}%` }}
                        />
                      </div>
                      <div className="mt-0.5 text-xs text-muted">{toFa(task.importance)}٪</div>
                    </td>
                    <td className="max-w-40 text-right text-muted">
                      <span className="line-clamp-2">{task.notes || "—"}</span>
                    </td>
                    <td>
                      <div className="flex justify-center gap-1">
                        <button
                          type="button"
                          className="flex size-8 items-center justify-center rounded-md text-muted hover:bg-bg hover:text-ink"
                          onClick={() => onEdit(task)}
                          aria-label="ویرایش"
                        >
                          <Pencil className="size-3.5" />
                        </button>
                        <button
                          type="button"
                          className="flex size-8 items-center justify-center rounded-md text-muted hover:bg-bg hover:text-ink"
                          onClick={() => {
                            duplicateTask(task.id);
                            toast.success("کپی تکلیف ساخته شد");
                          }}
                          aria-label="کپی"
                        >
                          <Copy className="size-3.5" />
                        </button>
                        <button
                          type="button"
                          className="flex size-8 items-center justify-center rounded-md text-muted hover:bg-late hover:text-ink"
                          onClick={() => remove(task.id)}
                          aria-label="حذف"
                        >
                          <Trash2 className="size-3.5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function EmptyRow({ onAdd }: { onAdd: () => void }) {
  return (
    <div className="flex flex-col items-center gap-2 py-6 text-sm text-muted">
      <p>تکلیفی با این فیلتر پیدا نشد.</p>
      <Button size="sm" variant="secondary" onClick={onAdd}>
        <Plus />
        افزودن تکلیف
      </Button>
    </div>
  );
}

export function TaskChip({ task }: { task: Task }) {
  const courses = usePlannerStore((s) => s.courses);
  const course = courses.find((c) => c.id === task.courseId);
  return (
    <span
      className={cn(
        "inline-flex max-w-full items-center gap-1 truncate rounded-sm px-1.5 py-0.5 text-xs",
        course ? COURSE_CHIP[course.color] : "bg-bg",
      )}
    >
      {task.title}
    </span>
  );
}

export { courseName };
