import { i as __toESM } from "../_runtime.mjs";
import { n as require_react } from "../_libs/@radix-ui/react-compose-refs+[...].mjs";
import { p as useMatchRoute, v as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { n as require_jsx_runtime } from "../_libs/radix-ui__react-context+react.mjs";
import { c as ListChecks, d as Download, g as CalendarClock, h as CalendarDays, i as Settings2, l as LayoutDashboard, o as Plus, t as X, u as GraduationCap } from "../_libs/lucide-react.mjs";
import { a as DialogOverlay$1, c as Slot, i as DialogDescription$1, n as DialogClose, o as DialogPortal, r as DialogContent$1, s as DialogTitle$1, t as Dialog$1 } from "../_libs/@radix-ui/react-dialog+[...].mjs";
import { n as toast, t as Toaster } from "../_libs/sonner.mjs";
import { n as clsx, t as cva } from "../_libs/class-variance-authority+clsx.mjs";
import { t as twMerge } from "../_libs/tailwind-merge.mjs";
import { n as persist, r as create, t as createJSONStorage } from "../_libs/zustand.mjs";
import { n as toGregorian, r as toJalaali, t as jalaaliMonthLength } from "../_libs/jalaali-js.mjs";
import { n as writeFileSync, t as utils } from "../_libs/xlsx.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/app-shell-BdQsOW1w.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function cn(...inputs) {
	return twMerge(clsx(inputs));
}
function uid() {
	return crypto.randomUUID();
}
var buttonVariants = cva("inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-[background-color,color,box-shadow,transform,opacity] duration-150 ease-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/40 disabled:pointer-events-none disabled:opacity-50 [&_svg]:size-4 [&_svg]:shrink-0 active:not-disabled:scale-[0.96]", {
	variants: {
		variant: {
			default: "bg-accent text-accent-fg hover:bg-accent/90",
			secondary: "bg-paper text-ink shadow-border hover:bg-bg",
			ghost: "text-ink hover:bg-bg",
			blush: "bg-blush text-ink hover:bg-blush/80",
			danger: "bg-late text-ink hover:bg-high"
		},
		size: {
			default: "h-10 px-4",
			sm: "h-9 px-3 text-xs",
			lg: "h-11 px-5",
			icon: "size-10"
		}
	},
	defaultVariants: {
		variant: "default",
		size: "default"
	}
});
function Button({ className, variant, size, asChild = false, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(asChild ? Slot : "button", {
		className: cn(buttonVariants({
			variant,
			size,
			className
		})),
		...props
	});
}
function Input({ className, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
		className: cn("h-10 w-full rounded-md border border-line bg-paper px-3 text-sm text-ink", "placeholder:text-subtle", "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/35", "disabled:opacity-50", className),
		...props
	});
}
function Textarea({ className, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("textarea", {
		className: cn("min-h-24 w-full rounded-md border border-line bg-paper px-3 py-2 text-sm text-ink", "placeholder:text-subtle", "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/35", className),
		...props
	});
}
function NativeSelect({ className, children, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("select", {
		className: cn("h-10 w-full rounded-md border border-line bg-paper px-2 text-sm text-ink", "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/35", className),
		...props,
		children
	});
}
function Label({ className, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
		className: cn("mb-1 block text-xs font-medium text-muted", className),
		...props
	});
}
function Field({ label, children, className }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className,
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, { children: label }), children]
	});
}
var Sheet = Dialog$1;
function SheetContent({ className, children, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogPortal, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogOverlay$1, { className: "fixed inset-0 z-50 bg-ink/35" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogContent$1, {
		className: cn("fixed inset-y-0 start-0 z-50 flex w-[min(100%,22rem)] flex-col bg-paper text-ink shadow-sheet", className),
		...props,
		children: [children, /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogClose, {
			className: "absolute top-3 left-3 flex size-10 items-center justify-center rounded-md text-muted hover:bg-bg hover:text-ink",
			"aria-label": "بستن",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { className: "size-4" })
		})]
	})] });
}
function SheetHeader({ className, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: cn("border-b border-line px-5 py-4 pe-12", className),
		...props
	});
}
function SheetTitle({ className, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogTitle$1, {
		className: cn("text-base font-semibold", className),
		...props
	});
}
var FA_DIGITS = "۰۱۲۳۴۵۶۷۸۹";
var JALALI_MONTHS = [
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
	"اسفند"
];
var WEEKDAYS_SAT = [
	"شنبه",
	"یکشنبه",
	"دوشنبه",
	"سه‌شنبه",
	"چهارشنبه",
	"پنجشنبه",
	"جمعه"
];
var WEEKDAYS_MON = [
	"دوشنبه",
	"سه‌شنبه",
	"چهارشنبه",
	"پنجشنبه",
	"جمعه",
	"شنبه",
	"یکشنبه"
];
function toFa(value) {
	return String(value).replace(/\d/g, (d) => FA_DIGITS[Number(d)] ?? d);
}
function parseISODate(iso) {
	const [y, m, d] = iso.split("-").map(Number);
	return new Date(y, (m ?? 1) - 1, d ?? 1, 12, 0, 0, 0);
}
function toISODate(date) {
	return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}-${String(date.getDate()).padStart(2, "0")}`;
}
function addDays(date, n) {
	const next = new Date(date);
	next.setDate(next.getDate() + n);
	return next;
}
function startOfDay(date) {
	return new Date(date.getFullYear(), date.getMonth(), date.getDate(), 12);
}
function weekdayIndex(date, weekStart) {
	const js = date.getDay();
	return weekStart === "sat" ? (js + 1) % 7 : (js + 6) % 7;
}
function weekdays(weekStart) {
	return weekStart === "sat" ? WEEKDAYS_SAT : WEEKDAYS_MON;
}
function startOfWeek(date, weekStart) {
	const d = startOfDay(date);
	d.setDate(d.getDate() - weekdayIndex(d, weekStart));
	return d;
}
function toJalali(date) {
	return toJalaali(date.getFullYear(), date.getMonth() + 1, date.getDate());
}
function jalaliToISO(jy, jm, jd) {
	const g = toGregorian(jy, jm, jd);
	const m = String(g.gm).padStart(2, "0");
	const d = String(g.gd).padStart(2, "0");
	return `${g.gy}-${m}-${d}`;
}
function jalaliMonthLength(jy, jm) {
	return jalaaliMonthLength(jy, jm);
}
function formatJalaliLong(date) {
	const d = typeof date === "string" ? parseISODate(date) : date;
	const j = toJalali(d);
	return `${WEEKDAYS_SAT[(d.getDay() + 1) % 7]} ${toFa(j.jd)} ${JALALI_MONTHS[j.jm - 1]} ${toFa(j.jy)}`;
}
function formatJalaliMedium(date) {
	const j = toJalali(typeof date === "string" ? parseISODate(date) : date);
	return `${toFa(j.jd)} ${JALALI_MONTHS[j.jm - 1]} ${toFa(j.jy)}`;
}
function formatJalaliShort(date) {
	const j = toJalali(typeof date === "string" ? parseISODate(date) : date);
	return `${toFa(j.jd)} ${JALALI_MONTHS[j.jm - 1]}`;
}
function daysUntil(iso, from = /* @__PURE__ */ new Date()) {
	const a = parseISODate(iso);
	const b = startOfDay(from);
	return Math.round((a.getTime() - b.getTime()) / 864e5);
}
function remainingLabel(iso, done) {
	if (done) return "انجام شد";
	const n = daysUntil(iso);
	if (n < 0) return `${toFa(Math.abs(n))} روز گذشته`;
	if (n === 0) return "امروز";
	if (n === 1) return "فردا";
	return `${toFa(n)} روز`;
}
function formatTimeFa(hhmm) {
	if (!hhmm) return "—";
	const [h, m] = hhmm.split(":");
	return toFa(`${h}:${m}`);
}
function jalaliMonthGrid(jy, jm, weekStart) {
	const start = startOfWeek(parseISODate(jalaliToISO(jy, jm, 1)), weekStart);
	const cells = [];
	for (let i = 0; i < 42; i += 1) {
		const date = addDays(start, i);
		const j = toJalali(date);
		cells.push({
			iso: toISODate(date),
			date,
			inMonth: j.jy === jy && j.jm === jm,
			jDay: j.jd,
			jMonth: j.jm,
			jYear: j.jy
		});
	}
	return cells.slice(35).every((c) => !c.inMonth) ? cells.slice(0, 35) : cells;
}
function shiftJalaliMonth(jy, jm, delta) {
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
	return {
		jy: year,
		jm: month
	};
}
var SLOTS = Array.from({ length: 26 }, (_, i) => {
	const h = 8 + Math.floor(i / 2);
	const m = i % 2 === 0 ? "00" : "30";
	return `${String(h).padStart(2, "0")}:${m}`;
});
function timeToSlot(hhmm) {
	const [hRaw, mRaw] = hhmm.split(":").map(Number);
	const h = hRaw ?? 8;
	const m = mRaw ?? 0;
	const minutes = h * 60 + m - 480;
	return Math.max(0, Math.min(SLOTS.length, Math.round(minutes / 30)));
}
function slotSpan(start, end) {
	const s = timeToSlot(start);
	return {
		start: s,
		span: Math.max(s + 1, timeToSlot(end)) - s
	};
}
function isoOffset(days) {
	return toISODate(addDays(/* @__PURE__ */ new Date(), days));
}
function weekIso(offsetFromStart, weekStart = "sat") {
	return toISODate(addDays(startOfWeek(/* @__PURE__ */ new Date(), weekStart), offsetFromStart));
}
function createSampleData() {
	const courses = [
		{
			id: "c1",
			name: "ریاضی عمومی ۲",
			teacher: "دکتر احمدی",
			color: "accent"
		},
		{
			id: "c2",
			name: "فیزیک ۱",
			teacher: "دکتر رضایی",
			color: "sky"
		},
		{
			id: "c3",
			name: "برنامه‌نویسی پیشرفته",
			teacher: "دکتر کریمی",
			color: "ink"
		},
		{
			id: "c4",
			name: "مدارهای منطقی",
			teacher: "دکتر نوری",
			color: "mint"
		},
		{
			id: "c5",
			name: "آمار و احتمال",
			teacher: "دکتر حسینی",
			color: "sand"
		},
		{
			id: "c6",
			name: "زبان تخصصی",
			teacher: "استاد محمدی",
			color: "lilac"
		},
		{
			id: "c7",
			name: "ادبیات فارسی",
			teacher: "دکتر علوی",
			color: "blush"
		},
		{
			id: "c8",
			name: "آزمایشگاه فیزیک",
			teacher: "مهندس صادقی",
			color: "peach"
		}
	];
	const tasks = [
		{
			id: "t1",
			title: "تمرین‌های فصل ۳ تا ۵",
			courseId: "c1",
			type: "assignment",
			description: "مسائل زوج کتاب آدامز؛ تحویل دست‌نویس در کلاس",
			priority: "high",
			status: "in_progress",
			dueDate: isoOffset(2),
			dueTime: "12:00",
			grade: null,
			importance: 80,
			notes: "تمرکز روی انتگرال دوگانه و کاربردها"
		},
		{
			id: "t2",
			title: "گزارش آزمایش شماره ۴",
			courseId: "c8",
			type: "report",
			description: "اندازه‌گیری شتاب گرانش با آونگ ساده",
			priority: "medium",
			status: "not_started",
			dueDate: isoOffset(5),
			dueTime: "17:00",
			grade: null,
			importance: 55,
			notes: "حداکثر ۱۲۰۰ کلمه + جدول داده‌ها"
		},
		{
			id: "t3",
			title: "پروژه سامانه کتابخانه",
			courseId: "c3",
			type: "project",
			description: "پیاده‌سازی امانت، رزرو و گزارش‌گیری با React",
			priority: "high",
			status: "in_progress",
			dueDate: isoOffset(21),
			dueTime: "23:59",
			grade: null,
			importance: 95,
			notes: "گیت‌هاب را تا جمعه به‌روز کنید"
		},
		{
			id: "t4",
			title: "کوئیز مدارهای ترکیبی",
			courseId: "c4",
			type: "quiz",
			description: "فصل ۱ تا ۳: گیت، کارنو، جمع‌کننده",
			priority: "high",
			status: "not_started",
			dueDate: isoOffset(3),
			dueTime: "10:00",
			grade: null,
			importance: 70,
			notes: "۲۰ دقیقه — پرسش و پاسخ کوتاه"
		},
		{
			id: "t5",
			title: "مقاله خلاصه مقاله علمی",
			courseId: "c6",
			type: "assignment",
			description: "یک مقاله IEEE را در ۲۰۰ کلمه خلاصه کنید",
			priority: "low",
			status: "done",
			dueDate: isoOffset(-4),
			dueTime: "23:59",
			grade: 18,
			importance: 30,
			notes: "نمره از ۲۰"
		},
		{
			id: "t6",
			title: "ارائه رگرسیون خطی",
			courseId: "c5",
			type: "presentation",
			description: "اسلاید ۱۵ دقیقه‌ای + یک مثال با داده واقعی",
			priority: "medium",
			status: "in_progress",
			dueDate: isoOffset(8),
			dueTime: "14:00",
			grade: null,
			importance: 60,
			notes: "مثال: نمرات میان‌ترم"
		},
		{
			id: "t7",
			title: "مطالعه میان‌ترم فیزیک",
			courseId: "c2",
			type: "study",
			description: "فصل سینماتیک، دینامیک و انرژی",
			priority: "high",
			status: "not_started",
			dueDate: isoOffset(14),
			dueTime: "08:00",
			grade: null,
			importance: 85,
			notes: "روزانه ۴۵ دقیقه مرور"
		},
		{
			id: "t8",
			title: "برگه تمرین ۴ — سری‌ها",
			courseId: "c1",
			type: "assignment",
			description: "همگرایی سری‌های توانی",
			priority: "medium",
			status: "not_started",
			dueDate: isoOffset(-2),
			dueTime: "12:00",
			grade: null,
			importance: 50,
			notes: "عقب افتاده — فردا حتماً تحویل"
		},
		{
			id: "t9",
			title: "تحقیق نیما یوشیج",
			courseId: "c7",
			type: "research",
			description: "تأثیر شعر نو بر ادبیات معاصر",
			priority: "low",
			status: "postponed",
			dueDate: isoOffset(18),
			dueTime: "23:59",
			grade: null,
			importance: 25,
			notes: "منابع: کتاب تاریخ ادبیات"
		},
		{
			id: "t10",
			title: "تمرین درخت دودویی",
			courseId: "c3",
			type: "assignment",
			description: "پیاده‌سازی BST و پیمایش‌ها",
			priority: "medium",
			status: "done",
			dueDate: isoOffset(-6),
			dueTime: "23:59",
			grade: 19,
			importance: 40,
			notes: "کد در ریپو exercises"
		},
		{
			id: "t11",
			title: "آزمایش اندازه‌گیری شتاب",
			courseId: "c8",
			type: "lab",
			description: "حضور در آزمایشگاه و ثبت داده",
			priority: "medium",
			status: "in_progress",
			dueDate: isoOffset(0),
			dueTime: "15:00",
			grade: null,
			importance: 45,
			notes: "روپوش و ماشین‌حساب همراه باشد"
		},
		{
			id: "t12",
			title: "پروژه گروهی ALU چهار بیتی",
			courseId: "c4",
			type: "project",
			description: "طراحی جمع/تفریق و شبیه‌سازی در Logisim",
			priority: "high",
			status: "in_progress",
			dueDate: isoOffset(25),
			dueTime: "23:59",
			grade: null,
			importance: 90,
			notes: "تقسیم کار با همگروهی تا چهارشنبه"
		},
		{
			id: "t13",
			title: "تکلیف آمار سری ۳",
			courseId: "c5",
			type: "assignment",
			description: "توزیع نرمال و فاصله اطمینان",
			priority: "low",
			status: "not_started",
			dueDate: isoOffset(6),
			dueTime: "23:59",
			grade: null,
			importance: 35,
			notes: ""
		},
		{
			id: "t14",
			title: "امتحانک واژگان تخصصی",
			courseId: "c6",
			type: "quiz",
			description: "واژگان فصل ۲ و ۳",
			priority: "medium",
			status: "not_started",
			dueDate: isoOffset(1),
			dueTime: "08:30",
			grade: null,
			importance: 40,
			notes: "فلش‌کارت‌ها را امشب مرور کن"
		},
		{
			id: "t15",
			title: "خلاصه‌نویسی فصل ۲ فیزیک",
			courseId: "c2",
			type: "study",
			description: "قوانین نیوتن و نمودار نیروی آزاد",
			priority: "low",
			status: "done",
			dueDate: isoOffset(-8),
			dueTime: "22:00",
			grade: 17,
			importance: 20,
			notes: ""
		},
		{
			id: "t16",
			title: "ارائه شعر مشروطه",
			courseId: "c7",
			type: "presentation",
			description: "ده دقیقه ارائه کلاسی",
			priority: "medium",
			status: "not_started",
			dueDate: isoOffset(12),
			dueTime: "10:00",
			grade: null,
			importance: 50,
			notes: "اشعار بهار و عارف"
		},
		{
			id: "t17",
			title: "برگه انتگرال معین",
			courseId: "c1",
			type: "assignment",
			description: "۱۰ مسئله از انتگرال معین و کاربرد مساحت",
			priority: "high",
			status: "in_progress",
			dueDate: isoOffset(4),
			dueTime: "12:00",
			grade: null,
			importance: 75,
			notes: "مسئله ۷ و ۹ سخت‌ترند"
		},
		{
			id: "t18",
			title: "گزارش میان‌پروژه",
			courseId: "c3",
			type: "report",
			description: "وضعیت اسپرینت و اسکرین‌شات از صفحات",
			priority: "high",
			status: "not_started",
			dueDate: isoOffset(9),
			dueTime: "23:59",
			grade: null,
			importance: 65,
			notes: "قالب PDF در LMS"
		},
		{
			id: "t19",
			title: "امتحان میان‌ترم ریاضی",
			courseId: "c1",
			type: "exam",
			description: "فصل ۱ تا ۴ — بدون ماشین‌حساب مهندسی",
			priority: "high",
			status: "not_started",
			dueDate: isoOffset(28),
			dueTime: "09:00",
			grade: null,
			importance: 100,
			notes: "آزمون در آمفی‌تئاتر مرکزی"
		},
		{
			id: "t20",
			title: "کوئیز کوتاه فیزیک",
			courseId: "c2",
			type: "quiz",
			description: "حرکت پرتابی",
			priority: "medium",
			status: "done",
			dueDate: isoOffset(-10),
			dueTime: "08:00",
			grade: 16,
			importance: 30,
			notes: ""
		}
	];
	const blocks = [
		{
			id: "b1",
			date: weekIso(0),
			start: "09:00",
			end: "11:00",
			title: "حل تمرین ریاضی",
			courseId: "c1",
			notes: ""
		},
		{
			id: "b2",
			date: weekIso(0),
			start: "14:00",
			end: "16:00",
			title: "کدنویسی پروژه",
			courseId: "c3",
			notes: ""
		},
		{
			id: "b3",
			date: weekIso(1),
			start: "10:00",
			end: "12:00",
			title: "مرور فیزیک",
			courseId: "c2",
			notes: ""
		},
		{
			id: "b4",
			date: weekIso(2),
			start: "08:00",
			end: "10:00",
			title: "مدار منطقی",
			courseId: "c4",
			notes: ""
		},
		{
			id: "b5",
			date: weekIso(2),
			start: "16:00",
			end: "18:00",
			title: "آمار — رگرسیون",
			courseId: "c5",
			notes: ""
		},
		{
			id: "b6",
			date: weekIso(3),
			start: "09:00",
			end: "12:00",
			title: "اسپرینت پروژه",
			courseId: "c3",
			notes: ""
		},
		{
			id: "b7",
			date: weekIso(4),
			start: "10:00",
			end: "11:30",
			title: "زبان تخصصی",
			courseId: "c6",
			notes: ""
		},
		{
			id: "b8",
			date: weekIso(5),
			start: "08:00",
			end: "10:00",
			title: "ریاضی — انتگرال",
			courseId: "c1",
			notes: ""
		},
		{
			id: "b9",
			date: weekIso(5),
			start: "15:00",
			end: "17:00",
			title: "آزمایشگاه فیزیک",
			courseId: "c8",
			notes: ""
		}
	];
	const exams = [
		{
			id: "e1",
			title: "میان‌ترم ریاضی عمومی ۲",
			courseId: "c1",
			date: isoOffset(28),
			time: "09:00",
			location: "آمفی‌تئاتر مرکزی",
			notes: "فصل ۱ تا ۴",
			importance: 100
		},
		{
			id: "e2",
			title: "کوئیز مدارهای منطقی",
			courseId: "c4",
			date: isoOffset(3),
			time: "10:00",
			location: "کلاس ۲۰۴",
			notes: "گیت و کارنو",
			importance: 70
		},
		{
			id: "e3",
			title: "میان‌ترم فیزیک ۱",
			courseId: "c2",
			date: isoOffset(40),
			time: "08:30",
			location: "سالن امتحانات",
			notes: "سینماتیک تا انرژی",
			importance: 90
		},
		{
			id: "e4",
			title: "امتحانک زبان تخصصی",
			courseId: "c6",
			date: isoOffset(1),
			time: "08:30",
			location: "کلاس زبان",
			notes: "واژگان",
			importance: 40
		},
		{
			id: "e5",
			title: "پایان‌پروژه برنامه‌نویسی",
			courseId: "c3",
			date: isoOffset(55),
			time: "16:00",
			location: "دفاع در آزمایشگاه کامپیوتر",
			notes: "ارائه ۱۵ دقیقه‌ای",
			importance: 95
		}
	];
	const todayJ = toJalali(/* @__PURE__ */ new Date());
	return {
		studentName: "دانشجو",
		academicYear: "۱۴۰۵–۱۴۰۶",
		weekStart: "sat",
		courses,
		tasks,
		blocks,
		exams,
		importantDates: [
			{
				id: "d1",
				date: isoOffset(0),
				title: "شروع برنامه‌ریزی ترم",
				kind: "event"
			},
			{
				id: "d2",
				date: jalaliToISO(todayJ.jy, 7, 1),
				title: "آغاز سال تحصیلی",
				kind: "event"
			},
			{
				id: "d3",
				date: isoOffset(3),
				title: "کوئیز مدارهای منطقی",
				kind: "exam"
			},
			{
				id: "d4",
				date: isoOffset(21),
				title: "تحویل پروژه کتابخانه",
				kind: "deadline"
			},
			{
				id: "d5",
				date: isoOffset(28),
				title: "میان‌ترم ریاضی",
				kind: "exam"
			},
			{
				id: "d6",
				date: jalaliToISO(todayJ.jy, 9, 13),
				title: "تاسوعا",
				kind: "holiday"
			}
		]
	};
}
var sample = createSampleData();
var usePlannerStore = create()(persist((set, get) => ({
	...sample,
	addTask: (task) => {
		const id = uid();
		set({ tasks: [...get().tasks, {
			...task,
			id
		}] });
		return id;
	},
	updateTask: (id, patch) => {
		set({ tasks: get().tasks.map((t) => t.id === id ? {
			...t,
			...patch
		} : t) });
	},
	deleteTask: (id) => {
		set({ tasks: get().tasks.filter((t) => t.id !== id) });
	},
	toggleTaskDone: (id) => {
		set({ tasks: get().tasks.map((t) => t.id === id ? {
			...t,
			status: t.status === "done" ? "in_progress" : "done"
		} : t) });
	},
	addCourse: (course) => {
		const id = uid();
		set({ courses: [...get().courses, {
			...course,
			id
		}] });
		return id;
	},
	updateCourse: (id, patch) => {
		set({ courses: get().courses.map((c) => c.id === id ? {
			...c,
			...patch
		} : c) });
	},
	deleteCourse: (id) => {
		set({ courses: get().courses.filter((c) => c.id !== id) });
	},
	addBlock: (block) => {
		const id = uid();
		set({ blocks: [...get().blocks, {
			...block,
			id
		}] });
		return id;
	},
	updateBlock: (id, patch) => {
		set({ blocks: get().blocks.map((b) => b.id === id ? {
			...b,
			...patch
		} : b) });
	},
	deleteBlock: (id) => {
		set({ blocks: get().blocks.filter((b) => b.id !== id) });
	},
	addExam: (exam) => {
		const id = uid();
		set({ exams: [...get().exams, {
			...exam,
			id
		}] });
		return id;
	},
	updateExam: (id, patch) => {
		set({ exams: get().exams.map((e) => e.id === id ? {
			...e,
			...patch
		} : e) });
	},
	deleteExam: (id) => {
		set({ exams: get().exams.filter((e) => e.id !== id) });
	},
	addImportantDate: (item) => {
		const id = uid();
		set({ importantDates: [...get().importantDates, {
			...item,
			id
		}] });
		return id;
	},
	deleteImportantDate: (id) => {
		set({ importantDates: get().importantDates.filter((d) => d.id !== id) });
	},
	setStudentName: (studentName) => set({ studentName }),
	setAcademicYear: (academicYear) => set({ academicYear }),
	setWeekStart: (weekStart) => set({ weekStart }),
	resetSample: () => set(createSampleData())
}), {
	name: "planer-tahsili-v1",
	storage: createJSONStorage(() => localStorage),
	skipHydration: true,
	partialize: (s) => ({
		studentName: s.studentName,
		academicYear: s.academicYear,
		weekStart: s.weekStart,
		courses: s.courses,
		tasks: s.tasks,
		blocks: s.blocks,
		exams: s.exams,
		importantDates: s.importantDates
	})
}));
var TASK_TYPE_LABELS = {
	assignment: "تکلیف",
	quiz: "کوئیز",
	exam: "امتحان",
	project: "پروژه",
	presentation: "ارائه",
	study: "مطالعه",
	lab: "آزمایش",
	research: "تحقیق",
	report: "گزارش"
};
var PRIORITY_LABELS = {
	low: "کم",
	medium: "متوسط",
	high: "زیاد"
};
var STATUS_LABELS = {
	not_started: "شروع نشده",
	in_progress: "در حال انجام",
	done: "تکمیل شده",
	postponed: "تعویق شده"
};
var DATE_KIND_LABELS = {
	exam: "امتحان",
	deadline: "مهلت",
	event: "رویداد",
	holiday: "تعطیل"
};
var COURSE_COLOR_LABELS = {
	accent: "سبزآبی",
	blush: "صورتی",
	lilac: "یاسی",
	mint: "نعنایی",
	sky: "آسمانی",
	sand: "نخودی",
	peach: "هلویی",
	ink: "مرکب"
};
var COURSE_CHIP = {
	accent: "bg-accent-soft text-accent",
	blush: "bg-blush text-ink",
	lilac: "bg-lilac text-ink",
	mint: "bg-mint text-ink",
	sky: "bg-sky text-ink",
	sand: "bg-sand text-ink",
	peach: "bg-peach text-ink",
	ink: "bg-ink text-paper"
};
var COURSE_DOT = {
	accent: "bg-accent",
	blush: "bg-high",
	lilac: "bg-lilac",
	mint: "bg-low",
	sky: "bg-doing",
	sand: "bg-mid",
	peach: "bg-peach",
	ink: "bg-ink"
};
var TASK_TYPES = Object.keys(TASK_TYPE_LABELS);
Object.keys(PRIORITY_LABELS);
var STATUSES = Object.keys(STATUS_LABELS);
var COLORS = Object.keys(COURSE_COLOR_LABELS);
function SettingsSheet({ open, onOpenChange }) {
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
	const [newName, setNewName] = (0, import_react.useState)("");
	const [newTeacher, setNewTeacher] = (0, import_react.useState)("");
	function add() {
		if (!newName.trim()) return;
		addCourse({
			name: newName.trim(),
			teacher: newTeacher.trim() || "—",
			color: COLORS[courses.length % COLORS.length] ?? "accent"
		});
		setNewName("");
		setNewTeacher("");
		toast.success("درس اضافه شد");
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Sheet, {
		open,
		onOpenChange,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SheetContent, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SheetHeader, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SheetTitle, { children: "تنظیمات پلنر" }) }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex-1 space-y-5 overflow-y-auto px-5 py-4",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
					label: "نام دانشجو",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
						value: studentName,
						onChange: (e) => setStudentName(e.target.value)
					})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
					label: "سال تحصیلی",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
						value: academicYear,
						onChange: (e) => setAcademicYear(e.target.value)
					})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
					label: "شروع هفته",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(NativeSelect, {
						value: weekStart,
						onChange: (e) => setWeekStart(e.target.value),
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
							value: "sat",
							children: "شنبه (تقویم ایران)"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
							value: "mon",
							children: "دوشنبه (تقویم بین‌المللی)"
						})]
					})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
						className: "mb-2 text-sm font-semibold",
						children: "دروس"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
						className: "space-y-2",
						children: courses.map((c) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
							className: "rounded-md border border-line p-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "mb-1 flex items-center gap-2",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: cn("size-2.5 rounded-full", COURSE_DOT[c.color]) }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
									className: "h-8",
									value: c.name,
									onChange: (e) => updateCourse(c.id, { name: e.target.value })
								})]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex gap-2",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
										className: "h-8",
										value: c.teacher,
										onChange: (e) => updateCourse(c.id, { teacher: e.target.value }),
										placeholder: "استاد"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(NativeSelect, {
										className: "h-8 w-28",
										value: c.color,
										onChange: (e) => updateCourse(c.id, { color: e.target.value }),
										children: COLORS.map((col) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
											value: col,
											children: COURSE_COLOR_LABELS[col]
										}, col))
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
										size: "sm",
										variant: "ghost",
										onClick: () => deleteCourse(c.id),
										type: "button",
										children: "حذف"
									})
								]
							})]
						}, c.id))
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mt-3 flex gap-2",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
								className: "h-9",
								placeholder: "درس جدید",
								value: newName,
								onChange: (e) => setNewName(e.target.value)
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
								className: "h-9",
								placeholder: "استاد",
								value: newTeacher,
								onChange: (e) => setNewTeacher(e.target.value)
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
								size: "sm",
								type: "button",
								onClick: add,
								children: "افزودن"
							})
						]
					})
				] }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "rounded-md border border-line p-3",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mb-2 text-xs text-muted",
						children: "داده‌های نمونه را برمی‌گرداند و تغییرات ذخیره‌شده پاک می‌شود."
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						variant: "danger",
						size: "sm",
						type: "button",
						onClick: () => {
							resetSample();
							toast.success("پلنر به دادهٔ نمونه برگشت");
						},
						children: "بازنشانی نمونه"
					})]
				})
			]
		})] })
	});
}
var Dialog = Dialog$1;
function DialogOverlay({ className, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogOverlay$1, {
		className: cn("fixed inset-0 z-50 bg-ink/35", className),
		...props
	});
}
function DialogContent({ className, children, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogPortal, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogOverlay, {}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogContent$1, {
		className: cn("fixed top-1/2 left-1/2 z-50 w-[min(100%-1.5rem,40rem)] max-h-[min(90dvh,44rem)]", "-translate-x-1/2 -translate-y-1/2 overflow-y-auto rounded-xl bg-paper p-5 text-ink shadow-sheet", "focus:outline-none", className),
		...props,
		children: [children, /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogClose, {
			className: "absolute top-3 left-3 flex size-10 items-center justify-center rounded-md text-muted hover:bg-bg hover:text-ink",
			"aria-label": "بستن",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { className: "size-4" })
		})]
	})] });
}
function DialogHeader({ className, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: cn("mb-4 space-y-1 pe-8", className),
		...props
	});
}
function DialogTitle({ className, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogTitle$1, {
		className: cn("text-lg font-semibold leading-snug", className),
		...props
	});
}
function DialogDescription({ className, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogDescription$1, {
		className: cn("text-sm text-muted", className),
		...props
	});
}
var emptyDraft = (prefill) => ({
	title: "",
	courseId: "",
	type: "assignment",
	description: "",
	priority: "medium",
	status: "not_started",
	dueDate: toISODate(/* @__PURE__ */ new Date()),
	dueTime: "23:59",
	grade: null,
	importance: 50,
	notes: "",
	...prefill
});
function TaskFormDialog({ open, onOpenChange, editing, prefill }) {
	const courses = usePlannerStore((s) => s.courses);
	const addTask = usePlannerStore((s) => s.addTask);
	const updateTask = usePlannerStore((s) => s.updateTask);
	const [draft, setDraft] = (0, import_react.useState)(() => emptyDraft(prefill));
	(0, import_react.useEffect)(() => {
		if (!open) return;
		if (editing) {
			const { id: _, ...rest } = editing;
			setDraft(rest);
		} else setDraft(emptyDraft({
			courseId: courses[0]?.id,
			...prefill
		}));
	}, [
		open,
		editing,
		prefill,
		courses
	]);
	function patch(key, value) {
		setDraft((d) => ({
			...d,
			[key]: value
		}));
	}
	function submit(e) {
		e.preventDefault();
		if (!draft.title.trim()) {
			toast.error("عنوان تکلیف را بنویسید");
			return;
		}
		if (!draft.courseId) {
			toast.error("درس را انتخاب کنید");
			return;
		}
		if (editing) {
			updateTask(editing.id, draft);
			toast.success("تکلیف به‌روز شد");
		} else {
			addTask(draft);
			toast.success("تکلیف جدید ثبت شد");
		}
		onOpenChange(false);
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Dialog, {
		open,
		onOpenChange,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogContent, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogHeader, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogTitle, { children: editing ? "ویرایش تکلیف" : "تکلیف جدید" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogDescription, { children: "مهلت، اولویت و نوع را مشخص کنید تا در تقویم و نمودارها دیده شود." })] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
			onSubmit: submit,
			className: "grid gap-3 sm:grid-cols-2",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
					label: "عنوان",
					className: "sm:col-span-2",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
						value: draft.title,
						onChange: (e) => patch("title", e.target.value),
						placeholder: "مثلاً تمرین‌های فصل ۳",
						autoFocus: true
					})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
					label: "درس",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(NativeSelect, {
						value: draft.courseId,
						onChange: (e) => patch("courseId", e.target.value),
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
							value: "",
							children: "انتخاب درس"
						}), courses.map((c) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
							value: c.id,
							children: c.name
						}, c.id))]
					})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
					label: "نوع",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(NativeSelect, {
						value: draft.type,
						onChange: (e) => patch("type", e.target.value),
						children: TASK_TYPES.map((t) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
							value: t,
							children: TASK_TYPE_LABELS[t]
						}, t))
					})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
					label: "اولویت",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(NativeSelect, {
						value: draft.priority,
						onChange: (e) => patch("priority", e.target.value),
						children: [
							"high",
							"medium",
							"low"
						].map((p) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
							value: p,
							children: PRIORITY_LABELS[p]
						}, p))
					})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
					label: "وضعیت",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(NativeSelect, {
						value: draft.status,
						onChange: (e) => patch("status", e.target.value),
						children: STATUSES.map((s) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
							value: s,
							children: STATUS_LABELS[s]
						}, s))
					})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
					label: "مهلت انجام",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
						type: "date",
						value: draft.dueDate,
						onChange: (e) => patch("dueDate", e.target.value)
					})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
					label: "ساعت ددلاین",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
						type: "time",
						value: draft.dueTime,
						onChange: (e) => patch("dueTime", e.target.value)
					})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
					label: `اهمیت نسبی (${draft.importance}٪)`,
					className: "sm:col-span-2",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
						type: "range",
						min: 0,
						max: 100,
						step: 5,
						value: draft.importance,
						onChange: (e) => patch("importance", Number(e.target.value)),
						className: "h-10 w-full accent-accent"
					})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
					label: "نمره (از ۲۰)",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
						type: "number",
						min: 0,
						max: 20,
						step: .25,
						value: draft.grade ?? "",
						onChange: (e) => patch("grade", e.target.value === "" ? null : Number(e.target.value)),
						placeholder: "خالی = بدون نمره"
					})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
					label: "توضیحات",
					className: "sm:col-span-2",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Textarea, {
						value: draft.description,
						onChange: (e) => patch("description", e.target.value),
						rows: 2
					})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
					label: "یادداشت",
					className: "sm:col-span-2",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Textarea, {
						value: draft.notes,
						onChange: (e) => patch("notes", e.target.value),
						rows: 2
					})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex justify-end gap-2 sm:col-span-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						type: "button",
						variant: "secondary",
						onClick: () => onOpenChange(false),
						children: "انصراف"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						type: "submit",
						children: editing ? "ذخیره" : "افزودن تکلیف"
					})]
				})
			]
		})] })
	});
}
function isOverdue(task, today = toISODate(/* @__PURE__ */ new Date())) {
	return task.status !== "done" && task.dueDate < today;
}
function computeStats(tasks) {
	const today = toISODate(/* @__PURE__ */ new Date());
	const total = tasks.length;
	const completed = tasks.filter((t) => t.status === "done").length;
	const incomplete = total - completed;
	const dueToday = tasks.filter((t) => t.dueDate === today && t.status !== "done").length;
	const overdue = tasks.filter((t) => isOverdue(t, today)).length;
	const graded = tasks.filter((t) => t.grade != null);
	const avgGrade = graded.length === 0 ? null : graded.reduce((s, t) => s + (t.grade ?? 0), 0) / graded.length;
	const rate = total === 0 ? 0 : completed / total;
	const byType = {};
	const byPriority = {
		low: 0,
		medium: 0,
		high: 0
	};
	const byStatus = {
		not_started: 0,
		in_progress: 0,
		done: 0,
		postponed: 0
	};
	const byCourse = {};
	for (const t of tasks) {
		byType[t.type] = (byType[t.type] ?? 0) + 1;
		byPriority[t.priority] += 1;
		byStatus[t.status] += 1;
		byCourse[t.courseId] = (byCourse[t.courseId] ?? 0) + 1;
	}
	return {
		total,
		completed,
		incomplete,
		dueToday,
		overdue,
		avgGrade,
		rate,
		byType,
		byPriority,
		byStatus,
		byCourse
	};
}
function courseName(courses, id) {
	return courses.find((c) => c.id === id)?.name ?? "—";
}
function taskRows(data) {
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
		"یادداشت": t.notes
	}));
}
function downloadExcel(data) {
	const wb = utils.book_new();
	const summary = [
		{
			شاخص: "نام دانشجو",
			مقدار: data.studentName
		},
		{
			شاخص: "سال تحصیلی",
			مقدار: data.academicYear
		},
		{
			شاخص: "تعداد تکالیف",
			مقدار: data.tasks.length
		},
		{
			شاخص: "تکمیل‌شده",
			مقدار: data.tasks.filter((t) => t.status === "done").length
		},
		{
			شاخص: "تعداد دروس",
			مقدار: data.courses.length
		},
		{
			شاخص: "تعداد امتحانات",
			مقدار: data.exams.length
		}
	];
	utils.book_append_sheet(wb, utils.json_to_sheet(summary), "خلاصه");
	utils.book_append_sheet(wb, utils.json_to_sheet(taskRows(data)), "تکالیف");
	const courses = data.courses.map((c) => ({
		"نام درس": c.name,
		"استاد": c.teacher
	}));
	utils.book_append_sheet(wb, utils.json_to_sheet(courses), "دروس");
	const exams = data.exams.map((e) => ({
		"عنوان": e.title,
		"درس": courseName(data.courses, e.courseId),
		"تاریخ": formatJalaliMedium(e.date),
		"ساعت": formatTimeFa(e.time),
		"محل": e.location,
		"یادداشت": e.notes
	}));
	utils.book_append_sheet(wb, utils.json_to_sheet(exams), "امتحانات");
	const week = data.blocks.map((b) => ({
		"تاریخ": formatJalaliMedium(b.date),
		"از": b.start,
		"تا": b.end,
		"عنوان": b.title,
		"درس": b.courseId ? courseName(data.courses, b.courseId) : "",
		"یادداشت": b.notes
	}));
	utils.book_append_sheet(wb, utils.json_to_sheet(week), "برنامه هفتگی");
	const dates = data.importantDates.map((d) => ({
		"تاریخ": formatJalaliMedium(d.date),
		"عنوان": d.title,
		"نوع": DATE_KIND_LABELS[d.kind]
	}));
	utils.book_append_sheet(wb, utils.json_to_sheet(dates), "تاریخ‌های مهم");
	writeFileSync(wb, "planer-tahsili.xlsx");
}
async function copyForSheets(data) {
	const rows = taskRows(data);
	const keys = Object.keys(rows[0] ?? { عنوان: "" });
	const lines = [keys.join("	"), ...rows.map((r) => keys.map((k) => String(r[k] ?? "")).join("	"))];
	await navigator.clipboard.writeText(lines.join("\n"));
}
var NAV = [
	{
		to: "/",
		label: "داشبورد",
		icon: LayoutDashboard
	},
	{
		to: "/tasks",
		label: "تکالیف",
		icon: ListChecks
	},
	{
		to: "/calendar",
		label: "تقویم",
		icon: CalendarDays
	},
	{
		to: "/weekly",
		label: "هفته",
		icon: CalendarClock
	},
	{
		to: "/exams",
		label: "امتحان",
		icon: GraduationCap
	}
];
var DialogCtx = (0, import_react.createContext)(null);
function useTaskDialog() {
	const ctx = (0, import_react.useContext)(DialogCtx);
	if (!ctx) throw new Error("useTaskDialog must be used inside AppShell");
	return ctx;
}
function AppShell({ children }) {
	const [settingsOpen, setSettingsOpen] = (0, import_react.useState)(false);
	const [formOpen, setFormOpen] = (0, import_react.useState)(false);
	const [editing, setEditing] = (0, import_react.useState)(null);
	const [prefill, setPrefill] = (0, import_react.useState)();
	const matchRoute = useMatchRoute();
	const studentName = usePlannerStore((s) => s.studentName);
	const academicYear = usePlannerStore((s) => s.academicYear);
	(0, import_react.useEffect)(() => {
		usePlannerStore.persist.rehydrate();
	}, []);
	const api = (0, import_react.useMemo)(() => ({
		openNew: (next) => {
			setEditing(null);
			setPrefill(next);
			setFormOpen(true);
		},
		openEdit: (task) => {
			setPrefill(void 0);
			setEditing(task);
			setFormOpen(true);
		}
	}), []);
	async function onCopy() {
		try {
			await copyForSheets(usePlannerStore.getState());
			toast.success("جدول تکالیف برای گوگل‌شیت کپی شد");
		} catch {
			toast.error("کپی انجام نشد");
		}
	}
	function onExcel() {
		downloadExcel(usePlannerStore.getState());
		toast.success("فایل اکسل دانلود شد");
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogCtx.Provider, {
		value: api,
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "paper-grain min-h-dvh text-ink",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mx-auto max-w-[1400px] md:px-5 md:py-6",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "min-h-dvh overflow-hidden bg-paper shadow-sheet md:min-h-0 md:rounded-xl",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "h-1.5 bg-accent" }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
								className: "border-b border-line px-4 py-3 md:px-6",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex items-center gap-3",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
											className: "flex size-10 items-center justify-center rounded-md bg-accent-soft",
											children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
												className: "grid grid-cols-2 gap-0.5",
												children: [
													/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "size-2 rounded-[2px] bg-accent" }),
													/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "size-2 rounded-[2px] bg-blush" }),
													/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "size-2 rounded-[2px] bg-sand" }),
													/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "size-2 rounded-[2px] bg-mint" })
												]
											})
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "min-w-0 flex-1",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
												className: "flex flex-wrap items-baseline gap-x-2",
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
													className: "text-lg font-semibold leading-tight md:text-xl",
													children: "پلنر تحصیلی"
												}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
													className: "text-xs text-muted",
													children: academicYear
												})]
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
												className: "truncate text-xs text-muted",
												children: [
													studentName,
													" · ",
													formatJalaliShort(/* @__PURE__ */ new Date())
												]
											})]
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "hidden items-center gap-2 sm:flex",
											children: [
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
													size: "sm",
													variant: "secondary",
													onClick: onCopy,
													children: "کپی شیت"
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
													size: "sm",
													variant: "secondary",
													onClick: onExcel,
													children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Download, {}), "اکسل"]
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
													size: "sm",
													onClick: () => api.openNew(),
													children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Plus, {}), "تکلیف"]
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
													size: "icon",
													variant: "ghost",
													"aria-label": "تنظیمات",
													onClick: () => setSettingsOpen(true),
													children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Settings2, {})
												})
											]
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
											size: "icon",
											className: "sm:hidden",
											"aria-label": "تکلیف جدید",
											onClick: () => api.openNew(),
											children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Plus, {})
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
											size: "icon",
											variant: "ghost",
											className: "sm:hidden",
											"aria-label": "تنظیمات",
											onClick: () => setSettingsOpen(true),
											children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Settings2, {})
										})
									]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("nav", {
									className: "mt-3 hidden gap-1 md:flex",
									"aria-label": "بخش‌ها",
									children: NAV.map((item) => {
										const active = Boolean(matchRoute({
											to: item.to,
											fuzzy: item.to !== "/"
										}));
										return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
											to: item.to,
											className: cn("inline-flex h-10 items-center gap-2 rounded-md px-3 text-sm font-medium transition-colors", active ? "bg-accent text-accent-fg" : "text-muted hover:bg-bg hover:text-ink"),
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(item.icon, { className: "size-4" }), item.label]
										}, item.to);
									})
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("main", {
								className: "px-3 py-4 pb-24 md:px-6 md:py-5 md:pb-8",
								children
							})
						]
					})
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("nav", {
					className: "fixed inset-x-0 bottom-0 z-40 border-t border-line bg-paper/95 backdrop-blur md:hidden",
					style: { paddingBottom: "env(safe-area-inset-bottom)" },
					"aria-label": "ناوبری",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
						className: "grid grid-cols-5",
						children: NAV.map((item) => {
							const active = Boolean(matchRoute({
								to: item.to,
								fuzzy: item.to !== "/"
							}));
							return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
								to: item.to,
								className: cn("flex h-14 flex-col items-center justify-center gap-0.5 text-xs", active ? "text-accent" : "text-muted"),
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(item.icon, { className: "size-5" }), item.label]
							}) }, item.to);
						})
					})
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SettingsSheet, {
				open: settingsOpen,
				onOpenChange: setSettingsOpen
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TaskFormDialog, {
				open: formOpen,
				onOpenChange: (o) => {
					setFormOpen(o);
					if (!o) {
						setEditing(null);
						setPrefill(void 0);
					}
				},
				editing,
				prefill
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Toaster, {
				position: "top-center",
				dir: "rtl",
				toastOptions: {
					className: "font-sans",
					style: {
						background: "var(--color-paper)",
						color: "var(--color-ink)",
						border: "1px solid var(--color-line)"
					}
				}
			})
		]
	});
}
//#endregion
export { jalaliMonthGrid as A, useTaskDialog as B, computeStats as C, formatJalaliShort as D, formatJalaliLong as E, startOfWeek as F, toFa as I, toISODate as L, remainingLabel as M, shiftJalaliMonth as N, formatTimeFa as O, slotSpan as P, toJalali as R, cn as S, daysUntil as T, weekdays as V, STATUS_LABELS as _, DATE_KIND_LABELS as a, Textarea as b, DialogHeader as c, Input as d, JALALI_MONTHS as f, STATUSES as g, SLOTS as h, COURSE_DOT as i, jalaliMonthLength as j, isOverdue as k, DialogTitle as l, PRIORITY_LABELS as m, Button as n, Dialog as o, NativeSelect as p, COURSE_CHIP as r, DialogContent as s, AppShell as t, Field as u, TASK_TYPES as v, courseName as w, addDays as x, TASK_TYPE_LABELS as y, usePlannerStore as z };
