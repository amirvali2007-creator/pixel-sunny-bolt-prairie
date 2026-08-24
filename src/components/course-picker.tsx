import { useEffect, useState } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input, NativeSelect } from "@/components/ui/input";
import { usePlannerStore } from "@/lib/store";
import { cn } from "@/lib/utils";

export const NEW_COURSE = "__new__";

export function commitCourse(courseId: string, newName: string, newTeacher = ""): string | null {
  if (courseId === NEW_COURSE) {
    if (!newName.trim()) return null;
    return usePlannerStore.getState().ensureCourse(newName.trim(), newTeacher);
  }
  return courseId;
}

export function CoursePicker({
  value,
  onChange,
  allowEmpty = false,
  emptyLabel = "بدون درس",
  className,
}: {
  value: string;
  onChange: (courseId: string) => void;
  allowEmpty?: boolean;
  emptyLabel?: string;
  className?: string;
}) {
  const courses = usePlannerStore((s) => s.courses);
  const ensureCourse = usePlannerStore((s) => s.ensureCourse);
  const [adding, setAdding] = useState(false);
  const [name, setName] = useState("");
  const [teacher, setTeacher] = useState("");

  useEffect(() => {
    if (courses.length === 0 && !value) setAdding(true);
  }, [courses.length, value]);

  function create() {
    if (!name.trim()) {
      toast.error("نام درس را بنویسید");
      return;
    }
    const id = ensureCourse(name.trim(), teacher);
    onChange(id);
    setAdding(false);
    setName("");
    setTeacher("");
    toast.success("درس به فهرست اضافه شد");
  }

  return (
    <div className={cn("space-y-2", className)}>
      <NativeSelect
        value={adding ? NEW_COURSE : value}
        onChange={(e) => {
          if (e.target.value === NEW_COURSE) {
            setAdding(true);
            return;
          }
          setAdding(false);
          onChange(e.target.value);
        }}
      >
        {allowEmpty ? <option value="">{emptyLabel}</option> : null}
        {courses.length === 0 && !allowEmpty ? (
          <option value="" disabled>
            درسی ثبت نشده
          </option>
        ) : null}
        {courses.map((c) => (
          <option key={c.id} value={c.id}>
            {c.name}
          </option>
        ))}
        <option value={NEW_COURSE}>+ درس دیگر (افزودن درس جدید)</option>
      </NativeSelect>
      {adding ? (
        <div className="rounded-md border border-line bg-bg/60 p-2">
          <p className="mb-2 text-xs text-muted">درسی که در فهرست نیست را همین‌جا بسازید.</p>
          <div className="flex flex-col gap-2 sm:flex-row">
            <Input
              className="h-9"
              placeholder="نام درس، مثلاً شیمی آلی"
              value={name}
              onChange={(e) => setName(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  e.preventDefault();
                  create();
                }
              }}
              autoFocus
            />
            <Input
              className="h-9 sm:w-36"
              placeholder="استاد (اختیاری)"
              value={teacher}
              onChange={(e) => setTeacher(e.target.value)}
            />
            <Button type="button" size="sm" onClick={create}>
              ثبت درس
            </Button>
          </div>
        </div>
      ) : null}
    </div>
  );
}
