import { ChevronLeft, ChevronRight, Plus } from "lucide-react";
import { useMemo, useState } from "react";
import { toast } from "sonner";
import { useTaskDialog } from "@/components/app-shell";
import { TaskChip } from "@/components/task-table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  addDays,
  formatJalaliLong,
  formatJalaliShort,
  jalaliMonthGrid,
  jalaliMonthLength,
  JALALI_MONTHS,
  remainingLabel,
  shiftJalaliMonth,
  toFa,
  toISODate,
  toJalali,
  weekdays,
} from "@/lib/jalali";
import { DATE_KIND_LABELS } from "@/lib/types";
import { usePlannerStore } from "@/lib/store";
import { cn } from "@/lib/utils";

export function MonthCalendar() {
  const today = toISODate(new Date());
  const nowJ = toJalali(new Date());
  const [cursor, setCursor] = useState({ jy: nowJ.jy, jm: nowJ.jm });
  const [selected, setSelected] = useState(today);
  const weekStart = usePlannerStore((s) => s.weekStart);
  const tasks = usePlannerStore((s) => s.tasks);
  const exams = usePlannerStore((s) => s.exams);
  const dates = usePlannerStore((s) => s.importantDates);
  const addImportantDate = usePlannerStore((s) => s.addImportantDate);
  const deleteImportantDate = usePlannerStore((s) => s.deleteImportantDate);
  const { openNew, openEdit } = useTaskDialog();
  const [dateTitle, setDateTitle] = useState("");

  const cells = useMemo(
    () => jalaliMonthGrid(cursor.jy, cursor.jm, weekStart),
    [cursor, weekStart],
  );
  const days = weekdays(weekStart);
  const next = shiftJalaliMonth(cursor.jy, cursor.jm, 1);

  const tasksByDay = useMemo(() => {
    const map: Record<string, typeof tasks> = {};
    for (const t of tasks) {
      (map[t.dueDate] ??= []).push(t);
    }
    return map;
  }, [tasks]);

  const examsByDay = useMemo(() => {
    const map: Record<string, typeof exams> = {};
    for (const e of exams) {
      (map[e.date] ??= []).push(e);
    }
    return map;
  }, [exams]);

  const selectedTasks = (tasksByDay[selected] ?? []).slice().sort((a, b) => a.dueTime.localeCompare(b.dueTime));
  const selectedExams = examsByDay[selected] ?? [];
  const upcoming = dates
    .slice()
    .sort((a, b) => a.date.localeCompare(b.date))
    .filter((d) => d.date >= today)
    .slice(0, 8);

  const nextCells = jalaliMonthGrid(next.jy, next.jm, weekStart);

  function addDate() {
    if (!dateTitle.trim()) return;
    addImportantDate({ date: selected, title: dateTitle.trim(), kind: "event" });
    setDateTitle("");
    toast.success("تاریخ مهم ثبت شد");
  }

  return (
    <div className="grid gap-4 xl:grid-cols-[16rem_minmax(0,1fr)_18rem]">
      <aside className="overflow-hidden rounded-lg bg-paper shadow-sheet">
        <div className="bg-blush px-3 py-2 text-center text-xs font-semibold">تاریخ‌های مهم</div>
        <ul className="divide-y divide-line">
          {upcoming.length === 0 ? (
            <li className="px-3 py-4 text-center text-xs text-muted">موردی نیست</li>
          ) : (
            upcoming.map((d) => (
              <li key={d.id} className="flex items-start justify-between gap-2 px-3 py-2">
                <button type="button" className="text-right" onClick={() => setSelected(d.date)}>
                  <div className="text-xs font-medium">{d.title}</div>
                  <div className="text-[0.65rem] text-muted">
                    {formatJalaliShort(d.date)} · {DATE_KIND_LABELS[d.kind]}
                  </div>
                </button>
                <button
                  type="button"
                  className="text-[0.65rem] text-muted hover:text-ink"
                  onClick={() => deleteImportantDate(d.id)}
                >
                  حذف
                </button>
              </li>
            ))
          )}
        </ul>
      </aside>

      <section className="overflow-hidden rounded-lg bg-paper shadow-sheet">
        <div className="flex items-center justify-between bg-lilac px-3 py-2">
          <Button
            size="icon"
            variant="ghost"
            aria-label="ماه قبل"
            onClick={() => setCursor(shiftJalaliMonth(cursor.jy, cursor.jm, -1))}
          >
            <ChevronRight />
          </Button>
          <h2 className="text-sm font-semibold">
            {JALALI_MONTHS[cursor.jm - 1]} {toFa(cursor.jy)}
          </h2>
          <Button
            size="icon"
            variant="ghost"
            aria-label="ماه بعد"
            onClick={() => setCursor(shiftJalaliMonth(cursor.jy, cursor.jm, 1))}
          >
            <ChevronLeft />
          </Button>
        </div>
        <div className="month-grid border-b border-line bg-bg text-center text-xs font-medium text-muted">
          {days.map((d) => (
            <div key={d} className="py-2">
              {d}
            </div>
          ))}
        </div>
        <div className="month-grid">
          {cells.map((cell) => {
            const dayTasks = tasksByDay[cell.iso] ?? [];
            const dayExams = examsByDay[cell.iso] ?? [];
            const isToday = cell.iso === today;
            const isSel = cell.iso === selected;
            return (
              <button
                key={cell.iso}
                type="button"
                onClick={() => setSelected(cell.iso)}
                className={cn(
                  "min-h-20 border-line border-e border-b p-1.5 text-right transition-colors md:min-h-24",
                  cell.inMonth ? "bg-paper" : "bg-bg/60 text-subtle",
                  isSel && "ring-2 ring-accent ring-inset",
                  isToday && "bg-accent-soft",
                  dayExams.length > 0 && cell.inMonth && "bg-blush/70",
                )}
              >
                <div className="flex items-center justify-between">
                  <span className={cn("text-sm tabular-nums", isToday && "font-semibold text-accent")}>
                    {toFa(cell.jDay)}
                  </span>
                  {dayExams.length > 0 ? (
                    <span className="size-1.5 rounded-full bg-high" />
                  ) : null}
                </div>
                <div className="mt-1 hidden space-y-0.5 md:block">
                  {dayTasks.slice(0, 2).map((t) => (
                    <TaskChip key={t.id} task={t} />
                  ))}
                  {dayTasks.length > 2 ? (
                    <div className="text-[0.65rem] text-muted">+{toFa(dayTasks.length - 2)}</div>
                  ) : null}
                </div>
                {dayTasks.length > 0 ? (
                  <div className="mt-1 flex gap-0.5 md:hidden">
                    {dayTasks.slice(0, 3).map((t) => (
                      <span key={t.id} className="size-1.5 rounded-full bg-accent" />
                    ))}
                  </div>
                ) : null}
              </button>
            );
          })}
        </div>
      </section>

      <aside className="space-y-4">
        <div className="overflow-hidden rounded-lg bg-paper shadow-sheet">
          <div className="bg-mint px-3 py-2 text-center text-xs font-semibold">
            {formatJalaliLong(selected)}
          </div>
          <div className="space-y-3 p-3">
            {selectedExams.map((e) => (
              <div key={e.id} className="rounded-md bg-blush px-3 py-2 text-sm">
                <div className="font-medium">{e.title}</div>
                <div className="text-xs text-muted">
                  {e.time} · {e.location}
                </div>
              </div>
            ))}
            {selectedTasks.length === 0 && selectedExams.length === 0 ? (
              <p className="text-center text-xs text-muted">برای این روز تکلیفی نیست</p>
            ) : (
              selectedTasks.map((t) => (
                <button
                  key={t.id}
                  type="button"
                  className="block w-full rounded-md border border-line px-3 py-2 text-right"
                  onClick={() => openEdit(t)}
                >
                  <div className="text-sm font-medium">{t.title}</div>
                  <div className="text-xs text-muted">
                    {remainingLabel(t.dueDate, t.status === "done")}
                  </div>
                </button>
              ))
            )}
            <Button
              size="sm"
              className="w-full"
              onClick={() => openNew({ dueDate: selected })}
            >
              <Plus />
              تکلیف برای این روز
            </Button>
            <div className="flex gap-2">
              <Input
                className="h-9"
                placeholder="تاریخ مهم"
                value={dateTitle}
                onChange={(e) => setDateTitle(e.target.value)}
              />
              <Button size="sm" variant="secondary" onClick={addDate}>
                ثبت
              </Button>
            </div>
          </div>
        </div>

        <div className="overflow-hidden rounded-lg bg-paper shadow-sheet">
          <div className="bg-sand px-3 py-2 text-center text-xs font-semibold">
            {JALALI_MONTHS[next.jm - 1]} {toFa(next.jy)}
          </div>
          <div className="month-grid text-center text-[0.65rem] text-muted">
            {weekdays(weekStart).map((d) => (
              <div key={d} className="py-1">
                {d[0]}
              </div>
            ))}
            {nextCells.map((c) => (
              <button
                key={c.iso}
                type="button"
                onClick={() => {
                  setCursor({ jy: next.jy, jm: next.jm });
                  setSelected(c.iso);
                }}
                className={cn(
                  "py-1 tabular-nums",
                  !c.inMonth && "opacity-30",
                  c.iso === today && "font-semibold text-accent",
                )}
              >
                {toFa(c.jDay)}
              </button>
            ))}
          </div>
          <p className="px-3 py-2 text-center text-[0.65rem] text-subtle">
            {toFa(jalaliMonthLength(cursor.jy, cursor.jm))} روز · امروز{" "}
            {formatJalaliShort(addDays(new Date(), 0))}
          </p>
        </div>
      </aside>
    </div>
  );
}

