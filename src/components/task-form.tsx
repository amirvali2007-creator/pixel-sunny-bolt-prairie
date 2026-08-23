import { useEffect, useState, type FormEvent } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Field, Input, NativeSelect, Textarea } from "@/components/ui/input";
import { toISODate } from "@/lib/jalali";
import { usePlannerStore } from "@/lib/store";
import type { Priority, Task, TaskStatus, TaskType } from "@/lib/types";
import { PRIORITY_LABELS, STATUSES, STATUS_LABELS, TASK_TYPE_LABELS, TASK_TYPES } from "@/lib/types";

export type TaskDraft = Omit<Task, "id">;

const emptyDraft = (prefill?: Partial<TaskDraft>): TaskDraft => ({
  title: "",
  courseId: "",
  type: "assignment",
  description: "",
  priority: "medium",
  status: "not_started",
  dueDate: toISODate(new Date()),
  dueTime: "23:59",
  grade: null,
  importance: 50,
  notes: "",
  ...prefill,
});

export function TaskFormDialog({
  open,
  onOpenChange,
  editing,
  prefill,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  editing?: Task | null;
  prefill?: Partial<TaskDraft>;
}) {
  const courses = usePlannerStore((s) => s.courses);
  const addTask = usePlannerStore((s) => s.addTask);
  const updateTask = usePlannerStore((s) => s.updateTask);
  const [draft, setDraft] = useState<TaskDraft>(() => emptyDraft(prefill));

  useEffect(() => {
    if (!open) return;
    if (editing) {
      const { id: _, ...rest } = editing;
      setDraft(rest);
    } else {
      setDraft(emptyDraft({ courseId: courses[0]?.id, ...prefill }));
    }
  }, [open, editing, prefill, courses]);

  function patch<K extends keyof TaskDraft>(key: K, value: TaskDraft[K]) {
    setDraft((d) => ({ ...d, [key]: value }));
  }

  function submit(e: FormEvent) {
    e.preventDefault();
    if (!draft.title.trim()) {
      toast.error("عنوان تکلیف را بنویسید");
      return;
    }
    if (!draft.courseId) {
      toast.error("درس را انتخاب کنید");
      return;
    }
    if (editing) {
      updateTask(editing.id, draft);
      toast.success("تکلیف به‌روز شد");
    } else {
      addTask(draft);
      toast.success("تکلیف جدید ثبت شد");
    }
    onOpenChange(false);
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{editing ? "ویرایش تکلیف" : "تکلیف جدید"}</DialogTitle>
          <DialogDescription>
            مهلت، اولویت و نوع را مشخص کنید تا در تقویم و نمودارها دیده شود.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={submit} className="grid gap-3 sm:grid-cols-2">
          <Field label="عنوان" className="sm:col-span-2">
            <Input
              value={draft.title}
              onChange={(e) => patch("title", e.target.value)}
              placeholder="مثلاً تمرین‌های فصل ۳"
              autoFocus
            />
          </Field>
          <Field label="درس">
            <NativeSelect
              value={draft.courseId}
              onChange={(e) => patch("courseId", e.target.value)}
            >
              <option value="">انتخاب درس</option>
              {courses.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.name}
                </option>
              ))}
            </NativeSelect>
          </Field>
          <Field label="نوع">
            <NativeSelect
              value={draft.type}
              onChange={(e) => patch("type", e.target.value as TaskType)}
            >
              {TASK_TYPES.map((t) => (
                <option key={t} value={t}>
                  {TASK_TYPE_LABELS[t]}
                </option>
              ))}
            </NativeSelect>
          </Field>
          <Field label="اولویت">
            <NativeSelect
              value={draft.priority}
              onChange={(e) => patch("priority", e.target.value as Priority)}
            >
              {(["high", "medium", "low"] as Priority[]).map((p) => (
                <option key={p} value={p}>
                  {PRIORITY_LABELS[p]}
                </option>
              ))}
            </NativeSelect>
          </Field>
          <Field label="وضعیت">
            <NativeSelect
              value={draft.status}
              onChange={(e) => patch("status", e.target.value as TaskStatus)}
            >
              {STATUSES.map((s) => (
                <option key={s} value={s}>
                  {STATUS_LABELS[s]}
                </option>
              ))}
            </NativeSelect>
          </Field>
          <Field label="مهلت انجام">
            <Input
              type="date"
              value={draft.dueDate}
              onChange={(e) => patch("dueDate", e.target.value)}
            />
          </Field>
          <Field label="ساعت ددلاین">
            <Input
              type="time"
              value={draft.dueTime}
              onChange={(e) => patch("dueTime", e.target.value)}
            />
          </Field>
          <Field label={`اهمیت نسبی (${draft.importance}٪)`} className="sm:col-span-2">
            <input
              type="range"
              min={0}
              max={100}
              step={5}
              value={draft.importance}
              onChange={(e) => patch("importance", Number(e.target.value))}
              className="h-10 w-full accent-accent"
            />
          </Field>
          <Field label="نمره (از ۲۰)">
            <Input
              type="number"
              min={0}
              max={20}
              step={0.25}
              value={draft.grade ?? ""}
              onChange={(e) =>
                patch("grade", e.target.value === "" ? null : Number(e.target.value))
              }
              placeholder="خالی = بدون نمره"
            />
          </Field>
          <Field label="توضیحات" className="sm:col-span-2">
            <Textarea
              value={draft.description}
              onChange={(e) => patch("description", e.target.value)}
              rows={2}
            />
          </Field>
          <Field label="یادداشت" className="sm:col-span-2">
            <Textarea
              value={draft.notes}
              onChange={(e) => patch("notes", e.target.value)}
              rows={2}
            />
          </Field>
          <div className="flex justify-end gap-2 sm:col-span-2">
            <Button type="button" variant="secondary" onClick={() => onOpenChange(false)}>
              انصراف
            </Button>
            <Button type="submit">{editing ? "ذخیره" : "افزودن تکلیف"}</Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
