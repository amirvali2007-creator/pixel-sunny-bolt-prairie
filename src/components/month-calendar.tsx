import { Plus } from "lucide-react";
import { useMemo, useState } from "react";
import { toast } from "sonner";
import { useTaskDialog } from "@/components/app-shell";
import { BlockDialog } from "@/components/block-dialog";
import { PlannerDateNav } from "@/components/date-strip";
import { ExamFormDialog } from "@/components/exam-board";
import { TaskChip } from "@/components/task-table";
import { Button } from "@/components/ui/button";
import { Input, NativeSelect } from "@/components/ui/input";
import {
  formatJalaliLong,
  formatJalaliShort,
  jalaliMonthGrid,
  jalaliMonthLength,
  jalaliToISO,
  JALALI_MONTHS,
  parseISODate,
  remainingLabel,
  shiftJalaliMonth,
  toFa,
  toISODate,
  toJalali,
  weekdays,
} from "@/lib/jalali";
import type { DateKind } from "@/lib/types";
import { DATE_KIND_LABELS } from "@/lib/types";
import { usePlannerStore } from "@/lib/store";
import { cn } from "@/lib/utils";

export function MonthCalendar() {
  const today = toISODate(new Date());
  const [selected, setSelected] = useState(today);
  const selectedJ = toJalali(parseISODate(selected));
  const cursor = { jy: selectedJ.jy, jm: selectedJ.jm };
  const weekStart = usePlannerStore((s) => s.weekStart);
  const tasks = usePlannerStore((s) => s.tasks);
  const exams = usePlannerStore((s) => s.exams);
  const blocks = usePlannerStore((s) => s.blocks);
  const dates = usePlannerStore((s) => s.importantDates);
  const addImportantDate = usePlannerStore((s) => s.addImportantDate);
  const deleteImportantDate = usePlannerStore((s) => s.deleteImportantDate);
  const addBlock = usePlannerStore((s) => s.addBlock);
  const updateBlock = usePlannerStore((s) => s.updateBlock);
  const deleteBlock = usePlannerStore((s) => s.deleteBlock);
  const dayStart = usePlannerStore((s) => s.dayStart || "10:00");
  const { openNew, openEdit } = useTaskDialog();
  const [dateTitle, setDateTitle] = useState("");
  const [dateKind, setDateKind] = useState<DateKind>("event");
  const [blockOpen, setBlockOpen] = useState(false);
  const [editingBlock, setEditingBlock] = useState<string | null>(null);
  const [examOpen, setExamOpen] = useState(false);
  const [showPastDates, setShowPastDates] = useState(false);

  const cells = useMemo(
    () => jalaliMonthGrid(cursor.jy, cursor.jm, weekStart),
    [cursor.jy, cursor.jm, weekStart],
  );
  const days = weekdays(weekStart);
  const next = shiftJalaliMonth(cursor.jy, cursor.jm, 1);

  const tasksByDay = useMemo(() => {
    const map: Record<string, typeof tasks> = {};
    for (const t of tasks) (map[t.dueDate] ??= []).push(t);
    return map;
  }, [tasks]);

  const examsByDay = useMemo(() => {
    const map: Record<string, typeof exams> = {};
    for (const e of exams) (map[e.date] ??= []).push(e);
    return map;
  }, [exams]);

  const blocksByDay = useMemo(() => {
    const map: Record<string, typeof blocks> = {};
    for (const b of blocks) (map[b.date] ??= []).push(b);
    return map;
  }, [blocks]);

  const selectedTasks = (tasksByDay[selected] ?? [])
    .slice()
    .sort((a, b) => a.dueTime.localeCompare(b.dueTime));
  const selectedExams = examsByDay[selected] ?? [];
  const selectedBlocks = blocksByDay[selected] ?? [];
  const upcoming = dates
    .slice()
    .sort((a, b) => a.date.localeCompare(b.date))
    .filter((d) => (showPastDates ? true : d.date >= today));

  const nextCells = jalaliMonthGrid(next.jy, next.jm, weekStart);

  function addDate() {
    if (!dateTitle.trim()) {
      toast.error("عنوان رویداد را بنویسید");
      return;
    }
    addImportantDate({ date: selected, title: dateTitle.trim(), kind: dateKind });
    setDateTitle("");
    toast.success("تاریخ مهم ثبت شد");
  }

  function goMonth(dir: -1 | 1) {
    const n = shiftJalaliMonth(cursor.jy, cursor.jm, dir);
    const day = Math.min(selectedJ.jd, jalaliMonthLength(n.jy, n.jm));
    setSelected(jalaliToISO(n.jy, n.jm, day));
  }

  return (
    <div className="space-y-4">
      <PlannerDateNav
        selected={selected}
        onSelect={setSelected}
        onShift={goMonth}
        shiftUnit="ماه"
      />

      <div className="grid gap-4 xl:grid-cols-[16rem_minmax(0,1fr)_18rem]">
        <aside className="overflow-hidden rounded-lg bg-paper shadow-sheet">
          <div className="flex items-center justify-between bg-blush px-3 py-2">
            <div className="text-xs font-semibold">تاریخ‌های مهم</div>
            <button
              type="button"
              className="h-8 text-xs text-muted hover:text-ink"
              onClick={() => setShowPastDates((v) => !v)}
            >
              {showPastDates ? "فقط آینده" : "نمایش گذشته"}
            </button>
          </div>
          <ul className="divide-y divide-line">
            {upcoming.length === 0 ? (
              <li className="px-3 py-4 text-center text-xs text-muted">موردی نیست</li>
            ) : (
              upcoming.map((d) => (
                <li key={d.id} className="flex items-start justify-between gap-2 px-3 py-2">
                  <button type="button" className="text-right" onClick={() => setSelected(d.date)}>
                    <div className="text-xs font-medium">{d.title}</div>
                    <div className="text-xs text-muted">
                      {formatJalaliShort(d.date)} · {DATE_KIND_LABELS[d.kind]}
                    </div>
                  </button>
                  <button
                    type="button"
                    className="h-8 text-xs text-muted hover:text-ink"
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
          <div className="bg-lilac px-3 py-2 text-center text-sm font-semibold">
            {JALALI_MONTHS[cursor.jm - 1]} {toFa(cursor.jy)}
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
              const dayBlocks = blocksByDay[cell.iso] ?? [];
              const isToday = cell.iso === today;
              const isSel = cell.iso === selected;
              return (
                <button
                  key={cell.iso}
                  type="button"
                  onClick={() => setSelected(cell.iso)}
                  onDoubleClick={() => openNew({ dueDate: cell.iso })}
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
                    {dayExams.length > 0 ? <span className="size-1.5 rounded-full bg-high" /> : null}
                  </div>
                  <div className="mt-1 hidden space-y-0.5 md:block">
                    {dayTasks.slice(0, 2).map((t) => (
                      <TaskChip key={t.id} task={t} />
                    ))}
                    {dayBlocks.slice(0, 1).map((b) => (
                      <div key={b.id} className="truncate text-xs text-muted">
                        {b.title}
                      </div>
                    ))}
                    {dayTasks.length > 2 ? (
                      <div className="text-xs text-muted">+{toFa(dayTasks.length - 2)}</div>
                    ) : null}
                  </div>
                  {dayTasks.length + dayBlocks.length > 0 ? (
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
              {selectedBlocks.map((b) => (
                <button
                  key={b.id}
                  type="button"
                  className="block w-full rounded-md border border-line px-3 py-2 text-right"
                  onClick={() => {
                    setEditingBlock(b.id);
                    setBlockOpen(true);
                  }}
                >
                  <div className="text-sm font-medium">{b.title}</div>
                  <div className="text-xs text-muted">
                    {b.start}–{b.end}
                  </div>
                </button>
              ))}
              {selectedTasks.length === 0 &&
              selectedExams.length === 0 &&
              selectedBlocks.length === 0 ? (
                <p className="text-center text-xs text-muted">برای این روز هنوز کاری ثبت نشده</p>
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

              <div className="grid grid-cols-2 gap-2">
                <Button size="sm" onClick={() => openNew({ dueDate: selected })}>
                  <Plus />
                  تکلیف
                </Button>
                <Button
                  size="sm"
                  variant="secondary"
                  onClick={() => {
                    setEditingBlock(null);
                    setBlockOpen(true);
                  }}
                >
                  <Plus />
                  جلسه
                </Button>
                <Button size="sm" variant="secondary" onClick={() => setExamOpen(true)}>
                  <Plus />
                  امتحان
                </Button>
                <Button size="sm" variant="ghost" onClick={addDate}>
                  <Plus />
                  رویداد
                </Button>
              </div>
              <div className="flex gap-2">
                <Input
                  className="h-9"
                  placeholder="عنوان تاریخ مهم"
                  value={dateTitle}
                  onChange={(e) => setDateTitle(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") addDate();
                  }}
                />
                <NativeSelect
                  className="h-9 w-28"
                  value={dateKind}
                  onChange={(e) => setDateKind(e.target.value as DateKind)}
                >
                  {(Object.keys(DATE_KIND_LABELS) as DateKind[]).map((k) => (
                    <option key={k} value={k}>
                      {DATE_KIND_LABELS[k]}
                    </option>
                  ))}
                </NativeSelect>
              </div>
            </div>
          </div>

          <div className="overflow-hidden rounded-lg bg-paper shadow-sheet">
            <div className="bg-sand px-3 py-2 text-center text-xs font-semibold">
              {JALALI_MONTHS[next.jm - 1]} {toFa(next.jy)}
            </div>
            <div className="month-grid text-center text-xs text-muted">
              {weekdays(weekStart).map((d) => (
                <div key={d} className="py-1">
                  {d[0]}
                </div>
              ))}
              {nextCells.map((c) => (
                <button
                  key={c.iso}
                  type="button"
                  onClick={() => setSelected(c.iso)}
                  className={cn(
                    "min-h-8 py-1 tabular-nums",
                    !c.inMonth && "opacity-30",
                    c.iso === today && "font-semibold text-accent",
                    c.iso === selected && "rounded-sm bg-accent-soft",
                  )}
                >
                  {toFa(c.jDay)}
                </button>
              ))}
            </div>
            <p className="px-3 py-2 text-center text-xs text-subtle">
              {toFa(jalaliMonthLength(cursor.jy, cursor.jm))} روز
            </p>
          </div>
        </aside>
      </div>

      <BlockDialog
        open={blockOpen}
        onOpenChange={(o) => {
          setBlockOpen(o);
          if (!o) setEditingBlock(null);
        }}
        date={selected}
        start={dayStart}
        editingId={editingBlock}
        onSave={(payload) => {
          if (editingBlock) {
            updateBlock(editingBlock, payload);
            toast.success("جلسه به‌روز شد");
          } else {
            addBlock(payload);
            toast.success("جلسه ثبت شد");
            setSelected(payload.date);
          }
          setBlockOpen(false);
          setEditingBlock(null);
        }}
        onDelete={() => {
          if (editingBlock) {
            deleteBlock(editingBlock);
            toast.success("جلسه حذف شد");
          }
          setBlockOpen(false);
          setEditingBlock(null);
        }}
      />
      <ExamFormDialog open={examOpen} onOpenChange={setExamOpen} prefillDate={selected} />
    </div>
  );
}
