import { RotateCcw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Field, Input, NativeSelect } from "@/components/ui/input";
import { EMPTY_FILTERS, filtersActive, type TaskFilters } from "@/lib/filters";
import { usePlannerStore } from "@/lib/store";
import {
  PRIORITY_LABELS,
  STATUSES,
  STATUS_LABELS,
  TASK_TYPE_LABELS,
  TASK_TYPES,
  type Priority,
} from "@/lib/types";
import { toFa } from "@/lib/jalali";

export function FilterPanel({
  filters,
  onChange,
  resultCount,
}: {
  filters: TaskFilters;
  onChange: (next: TaskFilters) => void;
  resultCount: number;
}) {
  const courses = usePlannerStore((s) => s.courses);
  const active = filtersActive(filters);

  function patch<K extends keyof TaskFilters>(key: K, value: TaskFilters[K]) {
    onChange({ ...filters, [key]: value });
  }

  return (
    <section className="overflow-hidden rounded-lg bg-paper shadow-sheet">
      <div className="flex items-center justify-between bg-accent-soft px-4 py-2">
        <h2 className="text-sm font-semibold">فیلترها</h2>
        <div className="flex items-center gap-2">
          <span className="text-xs text-muted">{toFa(resultCount)} نتیجه</span>
          {active ? (
            <Button size="sm" variant="ghost" onClick={() => onChange(EMPTY_FILTERS)}>
              <RotateCcw />
              پاک کردن
            </Button>
          ) : null}
        </div>
      </div>
      <div className="grid gap-3 p-4 sm:grid-cols-2 lg:grid-cols-4">
        <Field label="جستجو" className="sm:col-span-2">
          <Input
            value={filters.q}
            onChange={(e) => patch("q", e.target.value)}
            placeholder="عنوان، توضیح یا یادداشت"
          />
        </Field>
        <Field label="نام کلاس">
          <NativeSelect
            value={filters.courseId}
            onChange={(e) => patch("courseId", e.target.value)}
          >
            <option value="">همه دروس</option>
            {courses.map((c) => (
              <option key={c.id} value={c.id}>
                {c.name}
              </option>
            ))}
          </NativeSelect>
        </Field>
        <Field label="نوع وظیفه">
          <NativeSelect
            value={filters.type}
            onChange={(e) => patch("type", e.target.value as TaskFilters["type"])}
          >
            <option value="">همه</option>
            {TASK_TYPES.map((t) => (
              <option key={t} value={t}>
                {TASK_TYPE_LABELS[t]}
              </option>
            ))}
          </NativeSelect>
        </Field>
        <Field label="اولویت">
          <NativeSelect
            value={filters.priority}
            onChange={(e) => patch("priority", e.target.value as TaskFilters["priority"])}
          >
            <option value="">همه</option>
            {(["high", "medium", "low"] as Priority[]).map((p) => (
              <option key={p} value={p}>
                {PRIORITY_LABELS[p]}
              </option>
            ))}
          </NativeSelect>
        </Field>
        <Field label="وضعیت">
          <NativeSelect
            value={filters.status}
            onChange={(e) => patch("status", e.target.value as TaskFilters["status"])}
          >
            <option value="">همه</option>
            {STATUSES.map((s) => (
              <option key={s} value={s}>
                {STATUS_LABELS[s]}
              </option>
            ))}
          </NativeSelect>
        </Field>
        <Field label="روزهای باقی‌مانده">
          <NativeSelect
            value={filters.remaining}
            onChange={(e) => patch("remaining", e.target.value as TaskFilters["remaining"])}
          >
            <option value="all">همه</option>
            <option value="overdue">عقب‌افتاده</option>
            <option value="today">امروز</option>
            <option value="3">تا ۳ روز</option>
            <option value="7">تا ۷ روز</option>
            <option value="14">تا ۱۴ روز</option>
            <option value="later">بعدتر</option>
          </NativeSelect>
        </Field>
        <Field label="وظایف تکمیل‌شده">
          <NativeSelect
            value={filters.completed}
            onChange={(e) => patch("completed", e.target.value as TaskFilters["completed"])}
          >
            <option value="include">نمایش همه</option>
            <option value="hide">مخفی کردن تکمیل‌شده</option>
            <option value="only">فقط تکمیل‌شده</option>
          </NativeSelect>
        </Field>
        <Field label="نمره">
          <NativeSelect
            value={filters.hasGrade}
            onChange={(e) => patch("hasGrade", e.target.value as TaskFilters["hasGrade"])}
          >
            <option value="all">همه</option>
            <option value="yes">دارای نمره</option>
            <option value="no">بدون نمره</option>
          </NativeSelect>
        </Field>
        <Field
          label={`اهمیت نسبی از ${filters.minImportance}٪`}
          className="sm:col-span-2 lg:col-span-4"
        >
          <input
            type="range"
            min={0}
            max={100}
            step={5}
            value={filters.minImportance}
            onChange={(e) => patch("minImportance", Number(e.target.value))}
            className="h-10 w-full accent-accent"
          />
        </Field>
      </div>
    </section>
  );
}
