import { useRef, useState } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Field, Input, NativeSelect } from "@/components/ui/input";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { downloadBackup, downloadExcel, parseBackup } from "@/lib/export-excel";
import { formatTimeFa, parseMinutes } from "@/lib/jalali";
import { usePlannerStore } from "@/lib/store";
import type { CourseColor, WeekStart } from "@/lib/types";
import { COURSE_COLOR_LABELS, COURSE_DOT, HOUR_PRESETS } from "@/lib/types";
import { cn } from "@/lib/utils";

const COLORS = Object.keys(COURSE_COLOR_LABELS) as CourseColor[];

export function SettingsSheet({
  open,
  onOpenChange,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}) {
  const studentName = usePlannerStore((s) => s.studentName);
  const academicYear = usePlannerStore((s) => s.academicYear);
  const weekStart = usePlannerStore((s) => s.weekStart);
  const dayStart = usePlannerStore((s) => s.dayStart || "10:00");
  const dayEnd = usePlannerStore((s) => s.dayEnd || "22:00");
  const courses = usePlannerStore((s) => s.courses);
  const setStudentName = usePlannerStore((s) => s.setStudentName);
  const setAcademicYear = usePlannerStore((s) => s.setAcademicYear);
  const setWeekStart = usePlannerStore((s) => s.setWeekStart);
  const setDayHours = usePlannerStore((s) => s.setDayHours);
  const addCourse = usePlannerStore((s) => s.addCourse);
  const updateCourse = usePlannerStore((s) => s.updateCourse);
  const deleteCourse = usePlannerStore((s) => s.deleteCourse);
  const resetSample = usePlannerStore((s) => s.resetSample);
  const resetEmpty = usePlannerStore((s) => s.resetEmpty);
  const importPlanner = usePlannerStore((s) => s.importPlanner);
  const [newName, setNewName] = useState("");
  const [newTeacher, setNewTeacher] = useState("");
  const [pendingDelete, setPendingDelete] = useState<string | null>(null);
  const fileRef = useRef<HTMLInputElement>(null);

  function add() {
    if (!newName.trim()) return;
    addCourse({
      name: newName.trim(),
      teacher: newTeacher.trim() || "—",
      color: COLORS[courses.length % COLORS.length] ?? "accent",
    });
    setNewName("");
    setNewTeacher("");
    toast.success("درس اضافه شد");
  }

  function applyHours(start: string, end: string) {
    if (parseMinutes(end) <= parseMinutes(start)) {
      toast.error("ساعت پایان باید بعد از شروع باشد");
      return;
    }
    setDayHours(start, end);
    toast.success(`بازه روزانه: ${formatTimeFa(start)} تا ${formatTimeFa(end)}`);
  }

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>تنظیمات AVM PLANNER</SheetTitle>
        </SheetHeader>
        <div className="flex-1 space-y-5 overflow-y-auto px-5 py-4">
          <Field label="نام دانشجو">
            <Input value={studentName} onChange={(e) => setStudentName(e.target.value)} />
          </Field>
          <Field label="سال تحصیلی">
            <Input value={academicYear} onChange={(e) => setAcademicYear(e.target.value)} />
          </Field>
          <Field label="شروع هفته">
            <NativeSelect
              value={weekStart}
              onChange={(e) => setWeekStart(e.target.value as WeekStart)}
            >
              <option value="sat">شنبه (تقویم ایران)</option>
              <option value="mon">دوشنبه (تقویم بین‌المللی)</option>
            </NativeSelect>
          </Field>

          <div>
            <h3 className="mb-2 text-sm font-semibold">بازه ساعت برنامه روزانه</h3>
            <p className="mb-2 text-xs text-muted">
              پیش‌فرض ۱۰ صبح تا ۱۰ شب است. این بازه در پلنر هفتگی دیده می‌شود و هر وقت بخواهید عوض می‌شود.
            </p>
            <div className="mb-2 flex flex-wrap gap-1">
              {HOUR_PRESETS.map((p) => {
                const active = dayStart === p.start && dayEnd === p.end;
                return (
                  <button
                    key={p.label}
                    type="button"
                    onClick={() => applyHours(p.start, p.end)}
                    className={cn(
                      "h-9 rounded-md px-2.5 text-xs font-medium",
                      active ? "bg-accent text-accent-fg" : "bg-bg hover:bg-accent-soft",
                    )}
                  >
                    {p.label}
                  </button>
                );
              })}
            </div>
            <div className="grid grid-cols-2 gap-2">
              <Field label="از">
                <Input
                  type="time"
                  value={dayStart}
                  onChange={(e) => applyHours(e.target.value, dayEnd)}
                />
              </Field>
              <Field label="تا">
                <Input
                  type="time"
                  value={dayEnd}
                  onChange={(e) => applyHours(dayStart, e.target.value)}
                />
              </Field>
            </div>
          </div>

          <div>
            <h3 className="mb-2 text-sm font-semibold">دروس</h3>
            <ul className="space-y-2">
              {courses.map((c) => (
                <li key={c.id} className="rounded-md border border-line p-2">
                  <div className="mb-1 flex items-center gap-2">
                    <span className={cn("size-2.5 rounded-full", COURSE_DOT[c.color])} />
                    <Input
                      className="h-8"
                      value={c.name}
                      onChange={(e) => updateCourse(c.id, { name: e.target.value })}
                    />
                  </div>
                  <div className="flex gap-2">
                    <Input
                      className="h-8"
                      value={c.teacher}
                      onChange={(e) => updateCourse(c.id, { teacher: e.target.value })}
                      placeholder="استاد"
                    />
                    <NativeSelect
                      className="h-8 w-28"
                      value={c.color}
                      onChange={(e) =>
                        updateCourse(c.id, { color: e.target.value as CourseColor })
                      }
                    >
                      {COLORS.map((col) => (
                        <option key={col} value={col}>
                          {COURSE_COLOR_LABELS[col]}
                        </option>
                      ))}
                    </NativeSelect>
                    <Button
                      size="sm"
                      variant={pendingDelete === c.id ? "danger" : "ghost"}
                      onClick={() => {
                        if (pendingDelete === c.id) {
                          deleteCourse(c.id);
                          setPendingDelete(null);
                          toast.success("درس حذف شد");
                        } else {
                          setPendingDelete(c.id);
                        }
                      }}
                      type="button"
                    >
                      {pendingDelete === c.id ? "تأیید" : "حذف"}
                    </Button>
                  </div>
                </li>
              ))}
            </ul>
            <div className="mt-3 flex flex-col gap-2 sm:flex-row">
              <Input
                className="h-9"
                placeholder="درس جدید — حتی اگر در فهرست نباشد"
                value={newName}
                onChange={(e) => setNewName(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") add();
                }}
              />
              <Input
                className="h-9"
                placeholder="استاد"
                value={newTeacher}
                onChange={(e) => setNewTeacher(e.target.value)}
              />
              <Button size="sm" type="button" onClick={add}>
                افزودن
              </Button>
            </div>
          </div>

          <div className="space-y-2 rounded-md border border-line p-3">
            <h3 className="text-sm font-semibold">پشتیبان و خروجی</h3>
            <div className="flex flex-wrap gap-2">
              <Button
                size="sm"
                variant="secondary"
                type="button"
                onClick={() => {
                  downloadBackup(usePlannerStore.getState());
                  toast.success("فایل پشتیبان دانلود شد");
                }}
              >
                دانلود JSON
              </Button>
              <Button
                size="sm"
                variant="secondary"
                type="button"
                onClick={() => {
                  downloadExcel(usePlannerStore.getState());
                  toast.success("فایل اکسل دانلود شد");
                }}
              >
                اکسل
              </Button>
              <Button size="sm" variant="ghost" type="button" onClick={() => fileRef.current?.click()}>
                بارگذاری پشتیبان
              </Button>
              <input
                ref={fileRef}
                type="file"
                accept="application/json"
                className="hidden"
                onChange={async (e) => {
                  const file = e.target.files?.[0];
                  e.target.value = "";
                  if (!file) return;
                  try {
                    const text = await file.text();
                    const data = parseBackup(text);
                    if (!data) {
                      toast.error("فایل پشتیبان نامعتبر است");
                      return;
                    }
                    importPlanner(data);
                    toast.success("پشتیبان بازیابی شد");
                  } catch {
                    toast.error("خواندن فایل ممکن نشد");
                  }
                }}
              />
            </div>
          </div>

          <div className="rounded-md border border-line p-3">
            <p className="mb-2 text-xs text-muted">
              بازنشانی نمونه داده‌های نمایشی را برمی‌گرداند. پلنر خالی همه چیز را پاک می‌کند.
            </p>
            <div className="flex flex-wrap gap-2">
              <Button
                variant="secondary"
                size="sm"
                type="button"
                onClick={() => {
                  resetSample();
                  toast.success("پلنر به دادهٔ نمونه برگشت");
                }}
              >
                بازنشانی نمونه
              </Button>
              <Button
                variant="danger"
                size="sm"
                type="button"
                onClick={() => {
                  resetEmpty();
                  toast.success("پلنر خالی شد");
                }}
              >
                شروع از صفر
              </Button>
            </div>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}
