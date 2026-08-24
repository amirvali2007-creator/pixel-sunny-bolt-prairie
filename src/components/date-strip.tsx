import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { JalaliDateField } from "@/components/jalali-date-field";
import {
  addDays,
  formatJalaliShort,
  isoOffset,
  parseISODate,
  relativeDayLabel,
  toFa,
  toISODate,
  toJalali,
  weekdayIndex,
  weekdays,
} from "@/lib/jalali";
import { usePlannerStore } from "@/lib/store";
import { cn } from "@/lib/utils";

export function DateStrip({
  selected,
  onSelect,
  fromOffset = -3,
  count = 14,
}: {
  selected: string;
  onSelect: (iso: string) => void;
  fromOffset?: number;
  count?: number;
}) {
  const weekStart = usePlannerStore((s) => s.weekStart);
  const names = weekdays(weekStart);
  const today = toISODate(new Date());
  const days = Array.from({ length: count }, (_, i) => isoOffset(fromOffset + i));
  if (selected && !days.includes(selected)) {
    days.unshift(selected);
  }

  return (
    <div className="flex gap-1 overflow-x-auto pb-1">
      {days.map((iso) => {
        const date = parseISODate(iso);
        const j = toJalali(date);
        const wd = names[weekdayIndex(date, weekStart)] ?? "";
        const isSel = iso === selected;
        const isToday = iso === today;
        const rel = relativeDayLabel(iso);
        return (
          <button
            key={`${iso}-${isSel ? "s" : ""}`}
            type="button"
            onClick={() => onSelect(iso)}
            className={cn(
              "flex min-h-16 min-w-14 shrink-0 flex-col items-center justify-center rounded-md px-2 py-1.5 text-center transition-colors",
              isSel ? "bg-accent text-accent-fg" : "bg-paper shadow-border hover:bg-accent-soft",
              isToday && !isSel && "ring-1 ring-accent",
            )}
          >
            <span className="text-xs opacity-80">{rel ?? wd}</span>
            <span className="text-base font-semibold tabular-nums leading-tight">{toFa(j.jd)}</span>
            <span className="text-xs opacity-80">{formatJalaliShort(iso).split(" ")[1]}</span>
          </button>
        );
      })}
    </div>
  );
}

export function PlannerDateNav({
  selected,
  onSelect,
  onShift,
  shiftUnit,
}: {
  selected: string;
  onSelect: (iso: string) => void;
  onShift: (dir: -1 | 1) => void;
  shiftUnit: "هفته" | "ماه";
}) {
  return (
    <div className="space-y-3">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <div className="flex items-center gap-1">
          <Button
            size="icon"
            variant="secondary"
            aria-label={`${shiftUnit} قبل`}
            onClick={() => onShift(-1)}
          >
            <ChevronRight />
          </Button>
          <Button size="sm" variant="ghost" onClick={() => onSelect(toISODate(new Date()))}>
            امروز
          </Button>
          <Button size="sm" variant="ghost" onClick={() => onSelect(isoOffset(1))}>
            فردا
          </Button>
          <Button
            size="icon"
            variant="secondary"
            aria-label={`${shiftUnit} بعد`}
            onClick={() => onShift(1)}
          >
            <ChevronLeft />
          </Button>
        </div>
        <p className="text-xs text-muted">
          نوار روزها را بکشید؛ فردا، دیروز یا هر تاریخ دیگری یک ضربه فاصله دارد.
        </p>
      </div>
      <DateStrip selected={selected} onSelect={onSelect} />
      <details className="rounded-md border border-line bg-paper px-3 py-2">
        <summary className="cursor-pointer text-sm font-medium">رفتن به تاریخ دلخواه</summary>
        <div className="mt-3">
          <JalaliDateField value={selected} onChange={onSelect} showQuick />
        </div>
      </details>
    </div>
  );
}

export function shiftSelected(iso: string, days: number): string {
  return toISODate(addDays(parseISODate(iso), days));
}
