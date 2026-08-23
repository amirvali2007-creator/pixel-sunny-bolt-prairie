import { useState } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Field, Input, NativeSelect } from "@/components/ui/input";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { usePlannerStore } from "@/lib/store";
import type { CourseColor, WeekStart } from "@/lib/types";
import { COURSE_COLOR_LABELS, COURSE_DOT } from "@/lib/types";
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
  const courses = usePlannerStore((s) => s.courses);
  const setStudentName = usePlannerStore((s) => s.setStudentName);
  const setAcademicYear = usePlannerStore((s) => s.setAcademicYear);
  const setWeekStart = usePlannerStore((s) => s.setWeekStart);
  const addCourse = usePlannerStore((s) => s.addCourse);
  const updateCourse = usePlannerStore((s) => s.updateCourse);
  const deleteCourse = usePlannerStore((s) => s.deleteCourse);
  const resetSample = usePlannerStore((s) => s.resetSample);
  const [newName, setNewName] = useState("");
  const [newTeacher, setNewTeacher] = useState("");

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

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>تنظیمات پلنر</SheetTitle>
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
                      variant="ghost"
                      onClick={() => deleteCourse(c.id)}
                      type="button"
                    >
                      حذف
                    </Button>
                  </div>
                </li>
              ))}
            </ul>
            <div className="mt-3 flex gap-2">
              <Input
                className="h-9"
                placeholder="درس جدید"
                value={newName}
                onChange={(e) => setNewName(e.target.value)}
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

          <div className="rounded-md border border-line p-3">
            <p className="mb-2 text-xs text-muted">
              داده‌های نمونه را برمی‌گرداند و تغییرات ذخیره‌شده پاک می‌شود.
            </p>
            <Button
              variant="danger"
              size="sm"
              type="button"
              onClick={() => {
                resetSample();
                toast.success("پلنر به دادهٔ نمونه برگشت");
              }}
            >
              بازنشانی نمونه
            </Button>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}
