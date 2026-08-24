import { Copy, Plus } from "lucide-react";
import { Fragment, useMemo, useState } from "react";
import { toast } from "sonner";
import { BlockDialog } from "@/components/block-dialog";
import { PlannerDateNav } from "@/components/date-strip";
import { Button } from "@/components/ui/button";
import {
  addDays,
  buildSlots,
  expandHours,
  formatJalaliLong,
  formatJalaliShort,
  formatTimeFa,
  parseISODate,
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
  const dayStart = usePlannerStore((s) => s.dayStart || "10:00");
  const dayEnd = usePlannerStore((s) => s.dayEnd || "22:00");
  const [selected, setSelected] = useState(() => toISODate(new Date()));
  const [dialog, setDialog] = useState<{ date: string; start: string } | null>(null);
  const [editingId, setEditingId] = useState<string | null>(null);
  const courses = usePlannerStore((s) => s.courses);
  const blocks = usePlannerStore((s) => s.blocks);
  const addBlock = usePlannerStore((s) => s.addBlock);
  const updateBlock = usePlannerStore((s) => s.updateBlock);
  const deleteBlock = usePlannerStore((s) => s.deleteBlock);
  const copyWeekBlocks = usePlannerStore((s) => s.copyWeekBlocks);
  const days = weekdays(weekStartPref);
  const start = startOfWeek(parseISODate(selected), weekStartPref);
  const dates = Array.from({ length: 7 }, (_, i) => toISODate(addDays(start, i)));
  const today = toISODate(new Date());
  const mobileDay = Math.max(0, dates.indexOf(selected));

  const weekBlocks = useMemo(
    () => blocks.filter((b) => dates.includes(b.date)),
    [blocks, dates],
  );

  const slots = useMemo(() => {
    const times = weekBlocks.flatMap((b) => [b.start, b.end]);
    const range = expandHours(dayStart, dayEnd, times);
    return buildSlots(range.start, range.end);
  }, [dayStart, dayEnd, weekBlocks]);

  function selectDay(iso: string) {
    setSelected(iso);
  }

  function shift(delta: number) {
    setSelected(toISODate(addDays(start, delta * 7)));
  }

  function openNew(date: string, startTime: string) {
    setEditingId(null);
    setDialog({ date, start: startTime });
  }

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <h2 className="text-base font-semibold">برنامه هفتگی</h2>
          <p className="text-xs text-muted">
            {formatJalaliShort(dates[0] ?? today)} تا {formatJalaliShort(dates[6] ?? today)} · از{" "}
            {formatTimeFa(dayStart)} تا {formatTimeFa(dayEnd)}
          </p>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <Button
            size="sm"
            variant="secondary"
            onClick={() => {
              const n = copyWeekBlocks(dates[0] ?? today, 1);
              if (n === 0) toast.error("این هفته جلسه‌ای برای کپی ندارد");
              else {
                toast.success(`${n} جلسه به هفته بعد کپی شد`);
                shift(1);
              }
            }}
          >
            <Copy />
            کپی به هفته بعد
          </Button>
          <Button size="sm" onClick={() => openNew(selected, dayStart)}>
            <Plus />
            جلسه جدید
          </Button>
        </div>
      </div>

      <PlannerDateNav
        selected={selected}
        onSelect={selectDay}
        onShift={shift}
        shiftUnit="هفته"
      />

      <div className="overflow-hidden rounded-lg bg-paper shadow-sheet md:hidden">
        <div className="flex items-center justify-between bg-sky px-3 py-2">
          <div className="text-xs font-semibold">
            {days[mobileDay]} · {formatJalaliLong(dates[mobileDay] ?? today)}
          </div>
          <Button size="sm" variant="ghost" onClick={() => openNew(dates[mobileDay] ?? today, dayStart)}>
            <Plus />
            افزودن
          </Button>
        </div>
        <DayTimeline
          slots={slots}
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
              className={cn(
                "border-e border-line py-2 last:border-e-0",
                iso === today && "bg-accent-soft",
                iso === selected && "ring-2 ring-inset ring-accent",
              )}
            >
              <button type="button" className="w-full" onClick={() => selectDay(iso)}>
                <div>{days[i]}</div>
                <div className="font-normal text-muted">{formatJalaliShort(iso)}</div>
              </button>
              <button
                type="button"
                className="mt-1 inline-flex h-8 items-center gap-1 rounded-md px-2 text-xs font-medium text-accent hover:bg-paper"
                onClick={() => openNew(iso, dayStart)}
              >
                <Plus className="size-3.5" />
                افزودن
              </button>
            </div>
          ))}
        </div>
        <div className="week-grid week-grid-body relative min-w-[720px]">
          {slots.map((slot) => (
            <Fragment key={slot}>
              <div className="border-e border-b border-line px-1 py-1 text-center text-xs text-muted">
                {formatTimeFa(slot)}
              </div>
              {dates.map((iso) => (
                <button
                  key={`${iso}-${slot}`}
                  type="button"
                  className={cn(
                    "border-e border-b border-line last:border-e-0 hover:bg-bg",
                    iso === selected && "bg-accent-soft/40",
                  )}
                  onClick={() => openNew(iso, slot)}
                  aria-label={`افزودن جلسه ${slot}`}
                />
              ))}
            </Fragment>
          ))}
          {weekBlocks.map((b) => {
            const day = dates.indexOf(b.date);
            if (day < 0) return null;
            const { start: s, span } = slotSpan(b.start, b.end, slots);
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
                  "z-10 m-0.5 overflow-hidden rounded-sm px-1.5 py-1 text-right text-xs leading-tight",
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
        key={editingId ?? `${dialog?.date ?? ""}-${dialog?.start ?? ""}`}
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
            setSelected(payload.date);
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
  slots,
  blocks,
  onAdd,
  onEdit,
}: {
  slots: string[];
  blocks: ReturnType<typeof usePlannerStore.getState>["blocks"];
  onAdd: (start: string) => void;
  onEdit: (id: string) => void;
}) {
  const courses = usePlannerStore((s) => s.courses);
  const hourSlots = slots.filter((_, i) => i % 2 === 0);
  return (
    <div>
      {hourSlots.map((slot) => {
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
