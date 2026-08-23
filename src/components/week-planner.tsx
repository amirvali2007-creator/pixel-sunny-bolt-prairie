import { ChevronLeft, ChevronRight, Plus } from "lucide-react";
import { Fragment, useEffect, useMemo, useState } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Field, Input, NativeSelect } from "@/components/ui/input";
import {
  addDays,
  formatJalaliLong,
  formatJalaliShort,
  formatTimeFa,
  SLOTS,
  slotSpan,
  startOfWeek,
  toISODate,
  weekdays,
} from "@/lib/jalali";
import { usePlannerStore } from "@/lib/store";
import { COURSE_CHIP } from "@/lib/types";
import { cn } from "@/lib/utils";

export function WeekPlanner() {
  const weekStartPref = usePlannerStore((s) => s.weekStart);
  const [anchor, setAnchor] = useState(() => startOfWeek(new Date(), weekStartPref));
  const [mobileDay, setMobileDay] = useState(0);
  const [dialog, setDialog] = useState<{ date: string; start: string } | null>(null);
  const [editingId, setEditingId] = useState<string | null>(null);
  const courses = usePlannerStore((s) => s.courses);
  const blocks = usePlannerStore((s) => s.blocks);
  const addBlock = usePlannerStore((s) => s.addBlock);
  const updateBlock = usePlannerStore((s) => s.updateBlock);
  const deleteBlock = usePlannerStore((s) => s.deleteBlock);
  const days = weekdays(weekStartPref);
  const start = startOfWeek(anchor, weekStartPref);
  const dates = Array.from({ length: 7 }, (_, i) => toISODate(addDays(start, i)));
  const today = toISODate(new Date());

  const weekBlocks = useMemo(
    () => blocks.filter((b) => dates.includes(b.date)),
    [blocks, dates],
  );

  function shift(delta: number) {
    setAnchor(addDays(start, delta * 7));
  }

  function openNew(date: string, startTime: string) {
    setEditingId(null);
    setDialog({ date, start: startTime });
  }

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h2 className="text-base font-semibold">برنامه هفتگی</h2>
          <p className="text-xs text-muted">
            {formatJalaliShort(dates[0] ?? today)} تا {formatJalaliShort(dates[6] ?? today)}
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button size="icon" variant="secondary" aria-label="هفته قبل" onClick={() => shift(-1)}>
            <ChevronRight />
          </Button>
          <Button size="sm" variant="ghost" onClick={() => setAnchor(new Date())}>
            این هفته
          </Button>
          <Button size="icon" variant="secondary" aria-label="هفته بعد" onClick={() => shift(1)}>
            <ChevronLeft />
          </Button>
        </div>
      </div>

      <div className="flex gap-1 overflow-x-auto md:hidden">
        {dates.map((iso, i) => (
          <button
            key={iso}
            type="button"
            onClick={() => setMobileDay(i)}
            className={cn(
              "min-w-14 rounded-md px-2 py-2 text-center text-xs",
              mobileDay === i ? "bg-accent text-accent-fg" : "bg-paper shadow-border",
              iso === today && mobileDay !== i && "ring-1 ring-accent",
            )}
          >
            <div>{days[i]}</div>
            <div className="tabular-nums">{formatJalaliShort(iso).split(" ")[0]}</div>
          </button>
        ))}
      </div>

      <div className="overflow-hidden rounded-lg bg-paper shadow-sheet md:hidden">
        <div className="bg-sky px-3 py-2 text-xs font-semibold">
          {days[mobileDay]} · {formatJalaliLong(dates[mobileDay] ?? today)}
        </div>
        <DayTimeline
          blocks={weekBlocks.filter((b) => b.date === dates[mobileDay])}
          onAdd={(startTime) => openNew(dates[mobileDay] ?? today, startTime)}
          onEdit={(id) => {
            setDialog(null);
            setEditingId(id);
          }}
        />
      </div>

      <div className="hidden overflow-x-auto rounded-lg bg-paper shadow-sheet md:block">
        <div className="week-grid min-w-[720px] border-b border-line bg-lilac text-center text-xs font-semibold">
          <div className="border-e border-line py-2">ساعت</div>
          {dates.map((iso, i) => (
            <div
              key={iso}
              className={cn("border-e border-line py-2 last:border-e-0", iso === today && "bg-accent-soft")}
            >
              <div>{days[i]}</div>
              <div className="font-normal text-muted">{formatJalaliShort(iso)}</div>
            </div>
          ))}
        </div>
        <div className="week-grid week-grid-body relative min-w-[720px]">
          {SLOTS.map((slot) => (
            <Fragment key={slot}>
              <div className="border-e border-b border-line px-1 py-1 text-center text-[0.65rem] text-muted">
                {formatTimeFa(slot)}
              </div>
              {dates.map((iso) => (
                <button
                  key={`${iso}-${slot}`}
                  type="button"
                  className="border-e border-b border-line last:border-e-0 hover:bg-bg"
                  onClick={() => openNew(iso, slot)}
                  aria-label={`افزودن جلسه ${slot}`}
                />
              ))}
            </Fragment>
          ))}
          {weekBlocks.map((b) => {
            const day = dates.indexOf(b.date);
            if (day < 0) return null;
            const { start: s, span } = slotSpan(b.start, b.end);
            const course = courses.find((c) => c.id === b.courseId);
            return (
              <button
                key={b.id}
                type="button"
                onClick={() => {
                  setDialog(null);
                  setEditingId(b.id);
                }}
                className={cn(
                  "z-10 m-0.5 overflow-hidden rounded-sm px-1.5 py-1 text-right text-[0.7rem] leading-tight",
                  course ? COURSE_CHIP[course.color] : "bg-accent-soft text-ink",
                )}
                style={{
                  gridColumn: day + 2,
                  gridRow: `${s + 1} / span ${Math.max(span, 1)}`,
                }}
              >
                <div className="font-medium">{b.title}</div>
                <div className="opacity-80">
                  {formatTimeFa(b.start)}–{formatTimeFa(b.end)}
                </div>
              </button>
            );
          })}
        </div>
      </div>

      <BlockDialog
        open={Boolean(dialog) || Boolean(editingId)}
        onOpenChange={(o) => {
          if (!o) {
            setDialog(null);
            setEditingId(null);
          }
        }}
        date={dialog?.date}
        start={dialog?.start}
        editingId={editingId}
        onSave={(payload) => {
          if (editingId) {
            updateBlock(editingId, payload);
            toast.success("جلسه به‌روز شد");
          } else {
            addBlock(payload);
            toast.success("جلسه به برنامه اضافه شد");
          }
          setDialog(null);
          setEditingId(null);
        }}
        onDelete={() => {
          if (editingId) {
            deleteBlock(editingId);
            toast.success("جلسه حذف شد");
          }
          setDialog(null);
          setEditingId(null);
        }}
      />
    </div>
  );
}

function DayTimeline({
  blocks,
  onAdd,
  onEdit,
}: {
  blocks: ReturnType<typeof usePlannerStore.getState>["blocks"];
  onAdd: (start: string) => void;
  onEdit: (id: string) => void;
}) {
  const courses = usePlannerStore((s) => s.courses);
  return (
    <div>
      {SLOTS.filter((_, i) => i % 2 === 0).map((slot) => {
        const here = blocks.filter((b) => b.start <= slot && b.end > slot);
        return (
          <div key={slot} className="flex min-h-12 border-b border-line">
            <div className="w-14 shrink-0 px-2 py-2 text-xs text-muted">{formatTimeFa(slot)}</div>
            <div className="flex-1 p-1">
              {here.length === 0 ? (
                <button
                  type="button"
                  className="h-full min-h-10 w-full rounded-sm text-xs text-subtle hover:bg-bg"
                  onClick={() => onAdd(slot)}
                >
                  افزودن
                </button>
              ) : (
                here.map((b) => {
                  const course = courses.find((c) => c.id === b.courseId);
                  return (
                    <button
                      key={b.id}
                      type="button"
                      onClick={() => onEdit(b.id)}
                      className={cn(
                        "mb-1 w-full rounded-sm px-2 py-1 text-right text-xs",
                        course ? COURSE_CHIP[course.color] : "bg-accent-soft",
                      )}
                    >
                      {b.title}
                    </button>
                  );
                })
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}

function BlockDialog({
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
  onSave: (payload: {
    date: string;
    start: string;
    end: string;
    title: string;
    courseId: string | null;
    notes: string;
  }) => void;
  onDelete: () => void;
}) {
  const courses = usePlannerStore((s) => s.courses);
  const blocks = usePlannerStore((s) => s.blocks);
  const editing = editingId ? blocks.find((b) => b.id === editingId) : undefined;
  const [title, setTitle] = useState("");
  const [courseId, setCourseId] = useState("");
  const [startTime, setStartTime] = useState("09:00");
  const [endTime, setEndTime] = useState("10:00");
  const [notes, setNotes] = useState("");
  const [day, setDay] = useState(toISODate(new Date()));

  useEffect(() => {
    if (!open) return;
    const current = editingId
      ? usePlannerStore.getState().blocks.find((b) => b.id === editingId)
      : undefined;
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
    const s = start ?? "09:00";
    setStartTime(s);
    const [h, m] = s.split(":").map(Number);
    const endH = (h ?? 9) + 1;
    setEndTime(`${String(endH).padStart(2, "0")}:${String(m ?? 0).padStart(2, "0")}`);
    setNotes("");
    setDay(date ?? toISODate(new Date()));
  }, [open, editingId, start, date]);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{editing ? "ویرایش جلسه مطالعه" : "جلسه مطالعه جدید"}</DialogTitle>
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
            <Input value={title} onChange={(e) => setTitle(e.target.value)} />
          </Field>
          <Field label="درس">
            <NativeSelect value={courseId} onChange={(e) => setCourseId(e.target.value)}>
              <option value="">بدون درس</option>
              {courses.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.name}
                </option>
              ))}
            </NativeSelect>
          </Field>
          <Field label="تاریخ">
            <Input type="date" value={day} onChange={(e) => setDay(e.target.value)} />
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
