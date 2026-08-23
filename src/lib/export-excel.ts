import * as XLSX from "xlsx";
import type { PlannerData } from "./types";
import {
  DATE_KIND_LABELS,
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

  XLSX.writeFile(wb, "planer-tahsili.xlsx");
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
