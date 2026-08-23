import { Plus, Trash2 } from "lucide-react";
import { useMemo, useState } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Field, Input, NativeSelect, Textarea } from "@/components/ui/input";
import { daysUntil, formatJalaliLong, formatTimeFa, remainingLabel, toFa } from "@/lib/jalali";
import { courseName } from "@/lib/stats";
import { usePlannerStore } from "@/lib/store";
import { COURSE_CHIP } from "@/lib/types";
import { cn } from "@/lib/utils";

export function ExamBoard() {
  const exams = usePlannerStore((s) => s.exams);
  const courses = usePlannerStore((s) => s.courses);
  const addExam = usePlannerStore((s) => s.addExam);
  const deleteExam = usePlannerStore((s) => s.deleteExam);
  const [open, setOpen] = useState(false);

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
        <Button size="sm" onClick={() => setOpen(true)}>
          <Plus />
          امتحان
        </Button>
      </div>

      <div className="grid gap-3 md:grid-cols-3">
        {upcoming.slice(0, 3).map((exam, i) => {
          const d = daysUntil(exam.date);
          const course = courses.find((c) => c.id === exam.courseId);
          return (
            <article
              key={exam.id}
              className={cn(
                "overflow-hidden rounded-lg bg-paper shadow-sheet rise-in",
                i === 0 && "md:col-span-1",
              )}
            >
              <div
                className={cn(
                  "px-4 py-2 text-center text-xs font-semibold",
                  d <= 3 ? "bg-blush" : d <= 14 ? "bg-sand" : "bg-mint",
                )}
              >
                {d === 0 ? "امروز" : d === 1 ? "فردا" : `${toFa(d)} روز مانده`}
              </div>
              <div className="space-y-2 p-4">
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
              </div>
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
                  <td data-tone className={daysUntil(exam.date) < 0 ? "bg-line" : daysUntil(exam.date) <= 3 ? "bg-late" : ""}>
                    {remainingLabel(exam.date, false)}
                  </td>
                  <td>
                    <button
                      type="button"
                      className="mx-auto flex size-8 items-center justify-center rounded-md text-muted hover:bg-late hover:text-ink"
                      onClick={() => {
                        deleteExam(exam.id);
                        toast.success("امتحان حذف شد");
                      }}
                      aria-label="حذف"
                    >
                      <Trash2 className="size-3.5" />
                    </button>
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

      <ExamDialog open={open} onOpenChange={setOpen} onSave={(payload) => {
        addExam(payload);
        toast.success("امتحان ثبت شد");
        setOpen(false);
      }} />
    </div>
  );
}

function ExamDialog({
  open,
  onOpenChange,
  onSave,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSave: (payload: {
    title: string;
    courseId: string;
    date: string;
    time: string;
    location: string;
    notes: string;
    importance: number;
  }) => void;
}) {
  const courses = usePlannerStore((s) => s.courses);
  const [title, setTitle] = useState("");
  const [courseId, setCourseId] = useState(courses[0]?.id ?? "");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("09:00");
  const [location, setLocation] = useState("");
  const [notes, setNotes] = useState("");

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>امتحان جدید</DialogTitle>
        </DialogHeader>
        <form
          className="grid gap-3 sm:grid-cols-2"
          onSubmit={(e) => {
            e.preventDefault();
            if (!title.trim() || !date) {
              toast.error("عنوان و تاریخ لازم است");
              return;
            }
            onSave({
              title: title.trim(),
              courseId,
              date,
              time,
              location,
              notes,
              importance: 80,
            });
            setTitle("");
            setNotes("");
            setLocation("");
          }}
        >
          <Field label="عنوان" className="sm:col-span-2">
            <Input value={title} onChange={(e) => setTitle(e.target.value)} />
          </Field>
          <Field label="درس">
            <NativeSelect value={courseId} onChange={(e) => setCourseId(e.target.value)}>
              {courses.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.name}
                </option>
              ))}
            </NativeSelect>
          </Field>
          <Field label="محل">
            <Input value={location} onChange={(e) => setLocation(e.target.value)} />
          </Field>
          <Field label="تاریخ">
            <Input type="date" value={date} onChange={(e) => setDate(e.target.value)} />
          </Field>
          <Field label="ساعت">
            <Input type="time" value={time} onChange={(e) => setTime(e.target.value)} />
          </Field>
          <Field label="یادداشت" className="sm:col-span-2">
            <Textarea value={notes} onChange={(e) => setNotes(e.target.value)} rows={2} />
          </Field>
          <div className="flex justify-end gap-2 sm:col-span-2">
            <Button type="button" variant="secondary" onClick={() => onOpenChange(false)}>
              انصراف
            </Button>
            <Button type="submit">ثبت امتحان</Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
