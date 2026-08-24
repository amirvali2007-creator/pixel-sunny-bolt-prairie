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

export function isoOffset(days: number, from = new Date()): string {
  return toISODate(addDays(from, days));
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

export function weekdayShort(name: string): string {
  return name.slice(0, 1);
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
  if (n === 2) return "پس‌فردا";
  return `${toFa(n)} روز`;
}

export function relativeDayLabel(iso: string): string | null {
  const n = daysUntil(iso);
  if (n === -1) return "دیروز";
  if (n === 0) return "امروز";
  if (n === 1) return "فردا";
  if (n === 2) return "پس‌فردا";
  return null;
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

export function parseMinutes(hhmm: string): number {
  const [hRaw, mRaw] = (hhmm || "00:00").split(":").map(Number);
  const h = Number.isFinite(hRaw) ? hRaw! : 0;
  const m = Number.isFinite(mRaw) ? mRaw! : 0;
  return h * 60 + m;
}

export function formatMinutes(total: number): string {
  const wrapped = ((total % (24 * 60)) + 24 * 60) % (24 * 60);
  const h = Math.floor(wrapped / 60);
  const m = wrapped % 60;
  return `${String(h).padStart(2, "0")}:${String(m).padStart(2, "0")}`;
}

export function addMinutesToTime(hhmm: string, minutes: number): string {
  return formatMinutes(parseMinutes(hhmm) + minutes);
}

export function buildSlots(dayStart: string, dayEnd: string, stepMin = 30): string[] {
  const a = parseMinutes(dayStart);
  let b = parseMinutes(dayEnd);
  if (b <= a) b = a + 60;
  const out: string[] = [];
  for (let t = a; t < b; t += stepMin) {
    out.push(formatMinutes(t));
  }
  return out.length > 0 ? out : [dayStart];
}

export function expandHours(dayStart: string, dayEnd: string, times: string[]) {
  let a = parseMinutes(dayStart);
  let b = parseMinutes(dayEnd);
  for (const t of times) {
    if (!t) continue;
    const m = parseMinutes(t);
    a = Math.min(a, m);
    b = Math.max(b, m);
  }
  a = Math.max(0, Math.floor(a / 30) * 30);
  b = Math.min(24 * 60, Math.ceil(b / 30) * 30);
  if (b <= a) b = a + 60;
  return { start: formatMinutes(a), end: formatMinutes(b) };
}

export const SLOTS: string[] = buildSlots("10:00", "22:00");

export function timeToSlotIndex(hhmm: string, slots: string[]): number {
  if (slots.length === 0) return 0;
  const mins = parseMinutes(hhmm);
  const origin = parseMinutes(slots[0] ?? "00:00");
  const step =
    slots.length > 1 ? Math.max(15, parseMinutes(slots[1] ?? "00:30") - origin) : 30;
  const idx = Math.round((mins - origin) / step);
  return Math.max(0, Math.min(slots.length, idx));
}

export function slotSpan(
  start: string,
  end: string,
  slots: string[] = SLOTS,
): { start: number; span: number } {
  const s = timeToSlotIndex(start, slots);
  const e = Math.max(s + 1, timeToSlotIndex(end, slots));
  return { start: s, span: e - s };
}

export function parseJalaliInput(raw: string): string | null {
  const trimmed = raw.trim().replace(/[۰-۹]/g, (d) => String(FA_DIGITS.indexOf(d)));
  const m = trimmed.match(/^(\d{3,4})[\/\-.](\d{1,2})[\/\-.](\d{1,2})$/);
  if (!m) return null;
  const jy = Number(m[1]);
  const jm = Number(m[2]);
  const jd = Number(m[3]);
  if (jy < 1300 || jy > 1500 || jm < 1 || jm > 12 || jd < 1 || jd > 31) return null;
  try {
    return jalaliToISO(jy, jm, jd);
  } catch {
    return null;
  }
}

export const QUICK_DATES = [
  { label: "دیروز", days: -1 },
  { label: "امروز", days: 0 },
  { label: "فردا", days: 1 },
  { label: "پس‌فردا", days: 2 },
  { label: "۳ روز بعد", days: 3 },
  { label: "هفته بعد", days: 7 },
] as const;
