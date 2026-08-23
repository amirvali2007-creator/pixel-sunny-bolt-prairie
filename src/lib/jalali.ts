import { jalaaliMonthLength as jMonthLength, toGregorian, toJalaali as toJalaaliParts } from "jalaali-js";
import type { WeekStart } from "./types";

const FA_DIGITS = "۰۱۲۳۴۵۶۷۸۹";

export const JALALI_MONTHS = [
  "فروردین",
  "اردیبهشت",
  "خرداد",
  "تیر",
  "مرداد",
  "شهریور",
  "مهر",
  "آبان",
  "آذر",
  "دی",
  "بهمن",
  "اسفند",
] as const;

const WEEKDAYS_SAT = [
  "شنبه",
  "یکشنبه",
  "دوشنبه",
  "سه‌شنبه",
  "چهارشنبه",
  "پنجشنبه",
  "جمعه",
] as const;

const WEEKDAYS_MON = [
  "دوشنبه",
  "سه‌شنبه",
  "چهارشنبه",
  "پنجشنبه",
  "جمعه",
  "شنبه",
  "یکشنبه",
] as const;

export function toFa(value: number | string): string {
  return String(value).replace(/\d/g, (d) => FA_DIGITS[Number(d)] ?? d);
}

export function parseISODate(iso: string): Date {
  const [y, m, d] = iso.split("-").map(Number);
  return new Date(y, (m ?? 1) - 1, d ?? 1, 12, 0, 0, 0);
}

export function toISODate(date: Date): string {
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, "0");
  const d = String(date.getDate()).padStart(2, "0");
  return `${y}-${m}-${d}`;
}

export function addDays(date: Date, n: number): Date {
  const next = new Date(date);
  next.setDate(next.getDate() + n);
  return next;
}

export function startOfDay(date: Date): Date {
  return new Date(date.getFullYear(), date.getMonth(), date.getDate(), 12);
}

export function weekdayIndex(date: Date, weekStart: WeekStart): number {
  const js = date.getDay();
  return weekStart === "sat" ? (js + 1) % 7 : (js + 6) % 7;
}

export function weekdays(weekStart: WeekStart): readonly string[] {
  return weekStart === "sat" ? WEEKDAYS_SAT : WEEKDAYS_MON;
}

export function startOfWeek(date: Date, weekStart: WeekStart): Date {
  const d = startOfDay(date);
  d.setDate(d.getDate() - weekdayIndex(d, weekStart));
  return d;
}

export function toJalali(date: Date) {
  return toJalaaliParts(date.getFullYear(), date.getMonth() + 1, date.getDate());
}

export function jalaliToISO(jy: number, jm: number, jd: number): string {
  const g = toGregorian(jy, jm, jd);
  const m = String(g.gm).padStart(2, "0");
  const d = String(g.gd).padStart(2, "0");
  return `${g.gy}-${m}-${d}`;
}

export function jalaliMonthLength(jy: number, jm: number): number {
  return jMonthLength(jy, jm);
}

export function formatJalaliLong(date: Date | string): string {
  const d = typeof date === "string" ? parseISODate(date) : date;
  const j = toJalali(d);
  const wd = WEEKDAYS_SAT[(d.getDay() + 1) % 7];
  return `${wd} ${toFa(j.jd)} ${JALALI_MONTHS[j.jm - 1]} ${toFa(j.jy)}`;
}

export function formatJalaliMedium(date: Date | string): string {
  const d = typeof date === "string" ? parseISODate(date) : date;
  const j = toJalali(d);
  return `${toFa(j.jd)} ${JALALI_MONTHS[j.jm - 1]} ${toFa(j.jy)}`;
}

export function formatJalaliShort(date: Date | string): string {
  const d = typeof date === "string" ? parseISODate(date) : date;
  const j = toJalali(d);
  return `${toFa(j.jd)} ${JALALI_MONTHS[j.jm - 1]}`;
}

export function formatJalaliNumeric(date: Date | string): string {
  const d = typeof date === "string" ? parseISODate(date) : date;
  const j = toJalali(d);
  return `${toFa(j.jy)}/${toFa(String(j.jm).padStart(2, "0"))}/${toFa(String(j.jd).padStart(2, "0"))}`;
}

export function daysUntil(iso: string, from = new Date()): number {
  const a = parseISODate(iso);
  const b = startOfDay(from);
  return Math.round((a.getTime() - b.getTime()) / 86_400_000);
}

export function remainingLabel(iso: string, done: boolean): string {
  if (done) return "انجام شد";
  const n = daysUntil(iso);
  if (n < 0) return `${toFa(Math.abs(n))} روز گذشته`;
  if (n === 0) return "امروز";
  if (n === 1) return "فردا";
  return `${toFa(n)} روز`;
}

export function formatTimeFa(hhmm: string): string {
  if (!hhmm) return "—";
  const [h, m] = hhmm.split(":");
  return toFa(`${h}:${m}`);
}

export interface MonthCell {
  iso: string;
  date: Date;
  inMonth: boolean;
  jDay: number;
  jMonth: number;
  jYear: number;
}

export function jalaliMonthGrid(
  jy: number,
  jm: number,
  weekStart: WeekStart,
): MonthCell[] {
  const firstIso = jalaliToISO(jy, jm, 1);
  const first = parseISODate(firstIso);
  const start = startOfWeek(first, weekStart);
  const cells: MonthCell[] = [];
  for (let i = 0; i < 42; i += 1) {
    const date = addDays(start, i);
    const j = toJalali(date);
    cells.push({
      iso: toISODate(date),
      date,
      inMonth: j.jy === jy && j.jm === jm,
      jDay: j.jd,
      jMonth: j.jm,
      jYear: j.jy,
    });
  }
  const lastRowEmpty = cells.slice(35).every((c) => !c.inMonth);
  return lastRowEmpty ? cells.slice(0, 35) : cells;
}

export function shiftJalaliMonth(jy: number, jm: number, delta: number) {
  let month = jm + delta;
  let year = jy;
  while (month > 12) {
    month -= 12;
    year += 1;
  }
  while (month < 1) {
    month += 12;
    year -= 1;
  }
  return { jy: year, jm: month };
}

export const SLOTS: string[] = Array.from({ length: 26 }, (_, i) => {
  const h = 8 + Math.floor(i / 2);
  const m = i % 2 === 0 ? "00" : "30";
  return `${String(h).padStart(2, "0")}:${m}`;
});

export function timeToSlot(hhmm: string): number {
  const [hRaw, mRaw] = hhmm.split(":").map(Number);
  const h = hRaw ?? 8;
  const m = mRaw ?? 0;
  const minutes = h * 60 + m - 8 * 60;
  return Math.max(0, Math.min(SLOTS.length, Math.round(minutes / 30)));
}

export function slotSpan(start: string, end: string): { start: number; span: number } {
  const s = timeToSlot(start);
  const e = Math.max(s + 1, timeToSlot(end));
  return { start: s, span: e - s };
}
