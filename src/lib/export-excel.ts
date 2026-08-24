import * as XLSX from "xlsx";
import type { PlannerData } from "./types";
import {
  DATE_KIND_LABELS,
  DEFAULT_DAY_END,
  DEFAULT_DAY_START,
  PRIORITY_LABELS,
  STATUS_LABELS,
  TASK_TYPE_LABELS,
} from "./types";
import { courseName } from "./stats";
import { daysUntil, formatJalaliMedium, formatTimeFa } from "./jalali";

function taskRows(data: PlannerData) {
  return data.tasks.map((t, i) => ({
    "#": i + 1,
    "عنوان وظیفه": t.title,
    "نام کلاس": courseName(data.courses, t.courseId),
    "نوع وظیفه": TASK_TYPE_LABELS[t.type],
    "توضیحات": t.description,
    "اولویت": PRIORITY_LABELS[t.priority],
    "وضعیت": STATUS_LABELS[t.status],
    "مهلت انجام": formatJalaliMedium(t.dueDate),
    "تاریخ میلادی": t.dueDate,
    "ددلاین": t.dueTime,
    "روزهای باقی‌مانده": daysUntil(t.dueDate),
    "نمره": t.grade ?? "",
    "اهمیت نسبی": `${t.importance}%`,
    "یادداشت": t.notes,
  }));
}

export function downloadExcel(data: PlannerData) {
  const wb = XLSX.utils.book_new();

  const summary = [
    { شاخص: "نام دانشجو", مقدار: data.studentName },
    { شاخص: "سال تحصیلی", مقدار: data.academicYear },
    { شاخص: "بازه روزانه", مقدار: `${data.dayStart ?? DEFAULT_DAY_START}–${data.dayEnd ?? DEFAULT_DAY_END}` },
    { شاخص: "تعداد تکالیف", مقدار: data.tasks.length },
    { شاخص: "تکمیل‌شده", مقدار: data.tasks.filter((t) => t.status === "done").length },
    { شاخص: "تعداد دروس", مقدار: data.courses.length },
    { شاخص: "تعداد امتحانات", مقدار: data.exams.length },
  ];
  XLSX.utils.book_append_sheet(wb, XLSX.utils.json_to_sheet(summary), "خلاصه");
  XLSX.utils.book_append_sheet(wb, XLSX.utils.json_to_sheet(taskRows(data)), "تکالیف");

  const courses = data.courses.map((c) => ({
    "نام درس": c.name,
    "استاد": c.teacher,
  }));
  XLSX.utils.book_append_sheet(wb, XLSX.utils.json_to_sheet(courses), "دروس");

  const exams = data.exams.map((e) => ({
    "عنوان": e.title,
    "درس": courseName(data.courses, e.courseId),
    "تاریخ": formatJalaliMedium(e.date),
    "ساعت": formatTimeFa(e.time),
    "محل": e.location,
    "یادداشت": e.notes,
  }));
  XLSX.utils.book_append_sheet(wb, XLSX.utils.json_to_sheet(exams), "امتحانات");

  const week = data.blocks.map((b) => ({
    "تاریخ": formatJalaliMedium(b.date),
    "از": b.start,
    "تا": b.end,
    "عنوان": b.title,
    "درس": b.courseId ? courseName(data.courses, b.courseId) : "",
    "یادداشت": b.notes,
  }));
  XLSX.utils.book_append_sheet(wb, XLSX.utils.json_to_sheet(week), "برنامه هفتگی");

  const dates = data.importantDates.map((d) => ({
    "تاریخ": formatJalaliMedium(d.date),
    "عنوان": d.title,
    "نوع": DATE_KIND_LABELS[d.kind],
  }));
  XLSX.utils.book_append_sheet(wb, XLSX.utils.json_to_sheet(dates), "تاریخ‌های مهم");

  XLSX.writeFile(wb, "avm-planner.xlsx");
}

export async function copyForSheets(data: PlannerData) {
  const rows = taskRows(data);
  const keys = Object.keys(rows[0] ?? { عنوان: "" });
  const lines = [
    keys.join("\t"),
    ...rows.map((r) => keys.map((k) => String((r as Record<string, unknown>)[k] ?? "")).join("\t")),
  ];
  await navigator.clipboard.writeText(lines.join("\n"));
}

export function downloadBackup(data: PlannerData) {
  const payload = {
    studentName: data.studentName,
    academicYear: data.academicYear,
    weekStart: data.weekStart,
    dayStart: data.dayStart,
    dayEnd: data.dayEnd,
    courses: data.courses,
    tasks: data.tasks,
    blocks: data.blocks,
    exams: data.exams,
    importantDates: data.importantDates,
  };
  const blob = new Blob([JSON.stringify(payload, null, 2)], { type: "application/json" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = "avm-planner-backup.json";
  a.click();
  URL.revokeObjectURL(url);
}

export function parseBackup(text: string): Partial<PlannerData> | null {
  try {
    const data = JSON.parse(text) as Partial<PlannerData>;
    if (!data || typeof data !== "object") return null;
    if (!Array.isArray(data.tasks) && !Array.isArray(data.courses)) return null;
    return data;
  } catch {
    return null;
  }
}
