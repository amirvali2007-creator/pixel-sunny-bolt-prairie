import { Plus } from "lucide-react";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { CoursePicker } from "@/components/course-picker";
import { JalaliDateField } from "@/components/jalali-date-field";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Field, Input } from "@/components/ui/input";
import { addMinutesToTime, toISODate } from "@/lib/jalali";
import { usePlannerStore } from "@/lib/store";
import type { StudyBlock } from "@/lib/types";

export type BlockPayload = Omit<StudyBlock, "id">;

export function BlockDialog({
  open,
  onOpenChange,
  date,
  start,
  editingId,
  onSave,
  onDelete,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  date?: string;
  start?: string;
  editingId: string | null;
  onSave: (payload: BlockPayload) => void;
  onDelete: () => void;
}) {
  const blocks = usePlannerStore((s) => s.blocks);
  const dayStart = usePlannerStore((s) => s.dayStart);
  const editing = editingId ? blocks.find((b) => b.id === editingId) : undefined;
  const [title, setTitle] = useState("");
  const [courseId, setCourseId] = useState("");
  const [startTime, setStartTime] = useState(dayStart || "10:00");
  const [endTime, setEndTime] = useState("11:00");
  const [notes, setNotes] = useState("");
  const [day, setDay] = useState(toISODate(new Date()));

  useEffect(() => {
    if (!open) return;
    const current = editingId
      ? usePlannerStore.getState().blocks.find((b) => b.id === editingId)
      : undefined;
    const hours = usePlannerStore.getState().dayStart || "10:00";
    if (current) {
      setTitle(current.title);
      setCourseId(current.courseId ?? "");
      setStartTime(current.start);
      setEndTime(current.end);
      setNotes(current.notes);
      setDay(current.date);
      return;
    }
    setTitle("");
    setCourseId(usePlannerStore.getState().courses[0]?.id ?? "");
    const s = start ?? hours;
    setStartTime(s);
    setEndTime(addMinutesToTime(s, 60));
    setNotes("");
    setDay(date ?? toISODate(new Date()));
  }, [open, editingId, start, date]);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{editing ? "ویرایش جلسه" : "جلسه جدید"}</DialogTitle>
        </DialogHeader>
        <form
          className="grid gap-3 sm:grid-cols-2"
          onSubmit={(e) => {
            e.preventDefault();
            if (!title.trim()) {
              toast.error("عنوان جلسه را بنویسید");
              return;
            }
            onSave({
              date: day,
              start: startTime,
              end: endTime,
              title: title.trim(),
              courseId: courseId || null,
              notes,
            });
          }}
        >
          <Field label="عنوان" className="sm:col-span-2">
            <Input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="مثلاً مرور فصل ۲"
              autoFocus
            />
          </Field>
          <Field label="درس" className="sm:col-span-2">
            <CoursePicker value={courseId} onChange={setCourseId} allowEmpty />
          </Field>
          <Field label="تاریخ" className="sm:col-span-2">
            <JalaliDateField value={day} onChange={setDay} />
          </Field>
          <Field label="از">
            <Input type="time" value={startTime} onChange={(e) => setStartTime(e.target.value)} />
          </Field>
          <Field label="تا">
            <Input type="time" value={endTime} onChange={(e) => setEndTime(e.target.value)} />
          </Field>
          <Field label="یادداشت" className="sm:col-span-2">
            <Input value={notes} onChange={(e) => setNotes(e.target.value)} />
          </Field>
          <div className="flex justify-between gap-2 sm:col-span-2">
            {editing ? (
              <Button type="button" variant="danger" onClick={onDelete}>
                حذف
              </Button>
            ) : (
              <span />
            )}
            <div className="flex gap-2">
              <Button type="button" variant="secondary" onClick={() => onOpenChange(false)}>
                انصراف
              </Button>
              <Button type="submit">
                <Plus />
                ذخیره
              </Button>
            </div>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
