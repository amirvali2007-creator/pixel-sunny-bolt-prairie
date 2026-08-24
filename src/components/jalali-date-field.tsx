import { CalendarDays, ChevronLeft, ChevronRight } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  formatJalaliLong,
  formatJalaliNumeric,
  isoOffset,
  jalaliMonthGrid,
  JALALI_MONTHS,
  parseISODate,
  parseJalaliInput,
  QUICK_DATES,
  relativeDayLabel,
  shiftJalaliMonth,
  toFa,
  toISODate,
  toJalali,
  weekdays,
} from "@/lib/jalali";
import { usePlannerStore } from "@/lib/store";
import { cn } from "@/lib/utils";

export function QuickDateChips({
  value,
  onChange,
  className,
}: {
  value: string;
  onChange: (iso: string) => void;
  className?: string;
}) {
  return (
    <div className={cn("flex flex-wrap gap-1", className)}>
      {QUICK_DATES.map((q) => {
        const iso = isoOffset(q.days);
        const active = value === iso;
        return (
          <button
            key={q.label}
            type="button"
            onClick={() => onChange(iso)}
            className={cn(
              "h-9 rounded-md px-2.5 text-xs font-medium transition-colors",
              active ? "bg-accent text-accent-fg" : "bg-bg text-ink hover:bg-accent-soft",
            )}
          >
            {q.label}
          </button>
        );
      })}
    </div>
  );
}

export function JalaliDateField({
  value,
  onChange,
  showQuick = true,
}: {
  value: string;
  onChange: (iso: string) => void;
  showQuick?: boolean;
}) {
  const [open, setOpen] = useState(false);
  const [typed, setTyped] = useState("");
  const selected = value || toISODate(new Date());
  const rel = relativeDayLabel(selected);

  return (
    <div className="space-y-2">
      {showQuick ? <QuickDateChips value={selected} onChange={onChange} /> : null}
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        className="flex h-10 w-full items-center justify-between gap-2 rounded-md border border-line bg-paper px-3 text-right text-sm hover:bg-bg"
        aria-expanded={open}
      >
        <span className="flex min-w-0 items-center gap-2">
          <CalendarDays className="size-4 shrink-0 text-accent" />
          <span className="truncate font-medium">{formatJalaliLong(selected)}</span>
        </span>
        <span className="shrink-0 text-xs text-muted">
          {rel ?? formatJalaliNumeric(selected)}
        </span>
      </button>
      {open ? (
        <JalaliMiniCalendar
          value={selected}
          onChange={(iso) => {
            onChange(iso);
            setOpen(false);
            setTyped("");
          }}
        />
      ) : null}
      <div className="flex gap-2">
        <Input
          className="h-9"
          placeholder="۱۴۰۵/۶/۴ یا انتخاب از تقویم"
          value={typed}
          onChange={(e) => setTyped(e.target.value)}
          onKeyDown={(e) => {
            if (e.key !== "Enter") return;
            const parsed = parseJalaliInput(typed);
            if (parsed) {
              onChange(parsed);
              setTyped("");
              setOpen(false);
            }
          }}
        />
        <Button
          type="button"
          size="sm"
          variant="secondary"
          onClick={() => {
            const parsed = parseJalaliInput(typed);
            if (parsed) {
              onChange(parsed);
              setTyped("");
              setOpen(false);
            }
          }}
        >
          برو
        </Button>
      </div>
    </div>
  );
}

export function JalaliMiniCalendar({
  value,
  onChange,
}: {
  value: string;
  onChange: (iso: string) => void;
}) {
  const weekStart = usePlannerStore((s) => s.weekStart);
  const selected = value || toISODate(new Date());
  const selJ = toJalali(parseISODate(selected));
  const today = toISODate(new Date());
  const [cursor, setCursor] = useState({ jy: selJ.jy, jm: selJ.jm });

  useEffect(() => {
    setCursor({ jy: selJ.jy, jm: selJ.jm });
  }, [selJ.jy, selJ.jm]);

  const cells = useMemo(
    () => jalaliMonthGrid(cursor.jy, cursor.jm, weekStart),
    [cursor, weekStart],
  );
  const days = weekdays(weekStart);
  const nowJ = toJalali(new Date());
  const years = [nowJ.jy - 1, nowJ.jy, nowJ.jy + 1, nowJ.jy + 2];

  return (
    <div className="overflow-hidden rounded-md border border-line bg-paper">
      <div className="flex items-center gap-1 bg-lilac px-2 py-1.5">
        <Button
          type="button"
          size="icon"
          variant="ghost"
          className="size-9"
          aria-label="ماه قبل"
          onClick={() => setCursor(shiftJalaliMonth(cursor.jy, cursor.jm, -1))}
        >
          <ChevronRight className="size-4" />
        </Button>
        <select
          className="h-9 flex-1 rounded-md border border-line bg-paper px-1 text-xs"
          value={cursor.jm}
          onChange={(e) => setCursor({ ...cursor, jm: Number(e.target.value) })}
        >
          {JALALI_MONTHS.map((m, i) => (
            <option key={m} value={i + 1}>
              {m}
            </option>
          ))}
        </select>
        <select
          className="h-9 w-24 rounded-md border border-line bg-paper px-1 text-xs"
          value={cursor.jy}
          onChange={(e) => setCursor({ ...cursor, jy: Number(e.target.value) })}
        >
          {years.map((y) => (
            <option key={y} value={y}>
              {toFa(y)}
            </option>
          ))}
        </select>
        <Button
          type="button"
          size="icon"
          variant="ghost"
          className="size-9"
          aria-label="ماه بعد"
          onClick={() => setCursor(shiftJalaliMonth(cursor.jy, cursor.jm, 1))}
        >
          <ChevronLeft className="size-4" />
        </Button>
      </div>
      <div className="grid grid-cols-7 border-b border-line bg-bg text-center text-xs text-muted">
        {days.map((d) => (
          <div key={d} className="py-1.5">
            {d.slice(0, 1)}
          </div>
        ))}
      </div>
      <div className="grid grid-cols-7 p-1">
        {cells.map((cell) => {
          const isSel = cell.iso === selected;
          const isToday = cell.iso === today;
          return (
            <button
              key={cell.iso}
              type="button"
              onClick={() => onChange(cell.iso)}
              className={cn(
                "m-0.5 flex h-9 items-center justify-center rounded-md text-sm tabular-nums",
                !cell.inMonth && "text-subtle",
                isToday && !isSel && "ring-1 ring-accent",
                isSel ? "bg-accent text-accent-fg" : "hover:bg-accent-soft",
              )}
            >
              {toFa(cell.jDay)}
            </button>
          );
        })}
      </div>
    </div>
  );
}
