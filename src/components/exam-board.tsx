import { Pencil, Plus, Trash2 } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { toast } from "sonner";
import { CoursePicker } from "@/components/course-picker";
import { JalaliDateField } from "@/components/jalali-date-field";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Field, Input, Textarea } from "@/components/ui/input";
import { daysUntil, formatJalaliLong, formatTimeFa, remainingLabel, toFa, toISODate } from "@/lib/jalali";
import { courseName } from "@/lib/stats";
import { usePlannerStore } from "@/lib/store";
import type { Exam } from "@/lib/types";
import { COURSE_CHIP } from "@/lib/types";
import { cn } from "@/lib/utils";

export function ExamBoard() {
  const exams = usePlannerStore((s) => s.exams);
  const courses = usePlannerStore((s) => s.courses);
  const deleteExam = usePlannerStore((s) => s.deleteExam);
  const [open, setOpen] = useState(false);
  const [editing, setEditing] = useState<Exam | null>(null);

  const sorted = useMemo(
    () => exams.slice().sort((a, b) => a.date.localeCompare(b.date) || a.time.localeCompare(b.time)),
    [exams],
  );
  const upcoming = sorted.filter((e) => daysUntil(e.date) >= 0);
  const past = sorted.filter((e) => daysUntil(e.date) < 0);

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-base font-semibold">امتحانات و کوئیزها</h2>
          <p className="text-xs text-muted">شمارش معکوس تا برگه بعدی</p>
        </div>
        <Button
          size="sm"
          onClick={() => {
            setEditing(null);
            setOpen(true);
          }}
        >
          <Plus />
          امتحان
        </Button>
      </div>

      <div className="grid gap-3 md:grid-cols-3">
        {upcoming.slice(0, 3).map((exam) => {
          const d = daysUntil(exam.date);
          const course = courses.find((c) => c.id === exam.courseId);
          return (
            <article key={exam.id} className="overflow-hidden rounded-lg bg-paper shadow-sheet rise-in">
              <div
                className={cn(
                  "px-4 py-2 text-center text-xs font-semibold",
                  d <= 3 ? "bg-blush" : d <= 14 ? "bg-sand" : "bg-mint",
                )}
              >
                {d === 0 ? "امروز" : d === 1 ? "فردا" : `${toFa(d)} روز مانده`}
              </div>
              <button
                type="button"
                className="w-full space-y-2 p-4 text-right"
                onClick={() => {
                  setEditing(exam);
                  setOpen(true);
                }}
              >
                <h3 className="font-semibold leading-snug">{exam.title}</h3>
                {course ? (
                  <span className={cn("inline-flex rounded-sm px-2 py-0.5 text-xs", COURSE_CHIP[course.color])}>
                    {course.name}
                  </span>
                ) : null}
                <p className="text-sm text-muted">
                  {formatJalaliLong(exam.date)} · {formatTimeFa(exam.time)}
                </p>
                <p className="text-sm">{exam.location}</p>
                {exam.notes ? <p className="text-xs text-muted">{exam.notes}</p> : null}
              </button>
            </article>
          );
        })}
        {upcoming.length === 0 ? (
          <p className="col-span-full py-8 text-center text-sm text-muted">امتحان پیش‌رویی ثبت نشده</p>
        ) : null}
      </div>

      <div className="overflow-hidden rounded-lg bg-paper shadow-sheet">
        <div className="bg-lilac px-4 py-2 text-sm font-semibold">همه امتحانات</div>
        <div className="overflow-x-auto">
          <table className="sheet-table w-full min-w-[640px]">
            <thead>
              <tr>
                <th className="bg-sky">عنوان</th>
                <th className="bg-mint">درس</th>
                <th className="bg-sand">تاریخ</th>
                <th className="bg-peach">ساعت</th>
                <th className="bg-blush">محل</th>
                <th className="bg-lilac">مانده</th>
                <th className="bg-sky" />
              </tr>
            </thead>
            <tbody>
              {sorted.map((exam) => (
                <tr key={exam.id}>
                  <td className="text-right font-medium">{exam.title}</td>
                  <td>{courseName(courses, exam.courseId)}</td>
                  <td>{formatJalaliLong(exam.date)}</td>
                  <td>{formatTimeFa(exam.time)}</td>
                  <td>{exam.location}</td>
                  <td
                    data-tone
                    className={
                      daysUntil(exam.date) < 0 ? "bg-line" : daysUntil(exam.date) <= 3 ? "bg-late" : ""
                    }
                  >
                    {remainingLabel(exam.date, false)}
                  </td>
                  <td>
                    <div className="flex justify-center gap-1">
                      <button
                        type="button"
                        className="flex size-8 items-center justify-center rounded-md text-muted hover:bg-bg hover:text-ink"
                        onClick={() => {
                          setEditing(exam);
                          setOpen(true);
                        }}
                        aria-label="ویرایش"
                      >
                        <Pencil className="size-3.5" />
                      </button>
                      <button
                        type="button"
                        className="flex size-8 items-center justify-center rounded-md text-muted hover:bg-late hover:text-ink"
                        onClick={() => {
                          deleteExam(exam.id);
                          toast.success("امتحان حذف شد");
                        }}
                        aria-label="حذف"
                      >
                        <Trash2 className="size-3.5" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {past.length > 0 ? (
          <p className="px-4 py-2 text-xs text-muted">{toFa(past.length)} مورد گذشته در فهرست هست</p>
        ) : null}
      </div>

      <ExamFormDialog
        open={open}
        onOpenChange={(o) => {
          setOpen(o);
          if (!o) setEditing(null);
        }}
        editing={editing}
      />
    </div>
  );
}

export function ExamFormDialog({
  open,
  onOpenChange,
  editing,
  prefillDate,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  editing?: Exam | null;
  prefillDate?: string;
}) {
  const addExam = usePlannerStore((s) => s.addExam);
  const updateExam = usePlannerStore((s) => s.updateExam);
  const [title, setTitle] = useState("");
  const [courseId, setCourseId] = useState("");
  const [date, setDate] = useState(toISODate(new Date()));
  const [time, setTime] = useState("09:00");
  const [location, setLocation] = useState("");
  const [notes, setNotes] = useState("");

  useEffect(() => {
    if (!open) return;
    if (editing) {
      setTitle(editing.title);
      setCourseId(editing.courseId);
      setDate(editing.date);
      setTime(editing.time);
      setLocation(editing.location);
      setNotes(editing.notes);
      return;
    }
    setTitle("");
    setCourseId(usePlannerStore.getState().courses[0]?.id ?? "");
    setDate(prefillDate || toISODate(new Date()));
    setTime("09:00");
    setLocation("");
    setNotes("");
  }, [open, editing, prefillDate]);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{editing ? "ویرایش امتحان" : "امتحان جدید"}</DialogTitle>
        </DialogHeader>
        <form
          className="grid gap-3 sm:grid-cols-2"
          onSubmit={(e) => {
            e.preventDefault();
            if (!title.trim() || !date) {
              toast.error("عنوان و تاریخ لازم است");
              return;
            }
            if (!courseId) {
              toast.error("درس را انتخاب کنید یا درس جدید بسازید");
              return;
            }
            const payload = {
              title: title.trim(),
              courseId,
              date,
              time,
              location,
              notes,
              importance: editing?.importance ?? 80,
            };
            if (editing) {
              updateExam(editing.id, payload);
              toast.success("امتحان به‌روز شد");
            } else {
              addExam(payload);
              toast.success("امتحان ثبت شد");
            }
            onOpenChange(false);
          }}
        >
          <Field label="عنوان" className="sm:col-span-2">
            <Input value={title} onChange={(e) => setTitle(e.target.value)} autoFocus />
          </Field>
          <Field label="درس" className="sm:col-span-2">
            <CoursePicker value={courseId} onChange={setCourseId} />
          </Field>
          <Field label="محل">
            <Input value={location} onChange={(e) => setLocation(e.target.value)} />
          </Field>
          <Field label="ساعت">
            <Input type="time" value={time} onChange={(e) => setTime(e.target.value)} />
          </Field>
          <Field label="تاریخ" className="sm:col-span-2">
            <JalaliDateField value={date} onChange={setDate} />
          </Field>
          <Field label="یادداشت" className="sm:col-span-2">
            <Textarea value={notes} onChange={(e) => setNotes(e.target.value)} rows={2} />
          </Field>
          <div className="flex justify-end gap-2 sm:col-span-2">
            <Button type="button" variant="secondary" onClick={() => onOpenChange(false)}>
              انصراف
            </Button>
            <Button type="submit">{editing ? "ذخیره" : "ثبت امتحان"}</Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
