import { n as require_jsx_runtime } from "../_libs/radix-ui__react-context+react.mjs";
import { B as useTaskDialog, C as computeStats, E as formatJalaliLong, I as toFa, S as cn, T as daysUntil, t as AppShell, z as usePlannerStore } from "./app-shell-BdQsOW1w.mjs";
import { n as TaskTable } from "./task-table-DEd5yE6X.mjs";
import { i as TypeBars, t as CompletionDonut } from "./planner-charts-Cm69rwel.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/routes-Bp8FPeVi.js
var import_jsx_runtime = require_jsx_runtime();
function DashboardView() {
	const tasks = usePlannerStore((s) => s.tasks);
	const exams = usePlannerStore((s) => s.exams);
	const { openNew, openEdit } = useTaskDialog();
	const stats = computeStats(tasks);
	const nextExam = exams.slice().filter((e) => daysUntil(e.date) >= 0).sort((a, b) => a.date.localeCompare(b.date))[0];
	const cards = [
		{
			label: "تاریخ امروز",
			cls: "bg-accent-soft",
			value: formatJalaliLong(/* @__PURE__ */ new Date()),
			sub: "تقویم جلالی"
		},
		{
			label: "کل تکالیف",
			cls: "bg-sand",
			value: toFa(stats.total),
			sub: `${toFa(stats.incomplete)} باز`
		},
		{
			label: "تکمیل‌شده‌ها",
			cls: "bg-mint",
			value: toFa(stats.completed),
			sub: `${toFa(Math.round(stats.rate * 100))}٪ پیشرفت`
		},
		{
			label: "تکمیل‌نشده‌ها",
			cls: "bg-blush",
			value: toFa(stats.incomplete),
			sub: stats.overdue ? `${toFa(stats.overdue)} عقب‌افتاده` : "بدون تأخیر جدی"
		},
		{
			label: "مهلت تا امروز",
			cls: "bg-peach",
			value: toFa(stats.dueToday),
			sub: "باید امروز بسته شود"
		}
	];
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "space-y-4",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "grid grid-cols-2 gap-3 md:grid-cols-3 xl:grid-cols-6",
				children: [cards.map((c) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
					className: "overflow-hidden rounded-lg bg-paper shadow-sheet rise-in",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: cn("px-3 py-1.5 text-center text-xs font-semibold", c.cls),
						children: c.label
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "px-3 py-3 text-center",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "text-lg font-semibold leading-snug tabular-nums md:text-xl",
							children: c.value
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "mt-1 text-xs text-muted",
							children: c.sub
						})]
					})]
				}, c.label)), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
					className: "overflow-hidden rounded-lg bg-paper shadow-sheet rise-in",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "bg-lilac px-3 py-1.5 text-center text-xs font-semibold",
						children: "امتحان بعدی"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "px-3 py-3 text-center",
						children: nextExam ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "line-clamp-2 text-sm font-semibold leading-snug",
							children: nextExam.title
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "mt-1 text-xl font-semibold tabular-nums text-accent",
							children: [toFa(daysUntil(nextExam.date)), " روز"]
						})] }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-sm text-muted",
							children: "امتحانی در راه نیست"
						})
					})]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "grid gap-3 lg:grid-cols-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("article", {
					className: "overflow-hidden rounded-lg bg-paper shadow-sheet",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CompletionDonut, { tasks })
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("article", {
					className: "overflow-hidden rounded-lg bg-paper shadow-sheet",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TypeBars, { tasks })
				})]
			}),
			stats.avgGrade != null ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
				className: "text-xs text-muted",
				children: [
					"میانگین نمرات ثبت‌شده: ",
					toFa(stats.avgGrade.toFixed(1)),
					" از ۲۰"
				]
			}) : null,
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TaskTable, {
				tasks: tasks.slice().sort((a, b) => a.dueDate.localeCompare(b.dueDate)),
				onEdit: openEdit,
				onAdd: () => openNew()
			})
		]
	});
}
function Home() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AppShell, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DashboardView, {}) });
}
//#endregion
export { Home as component };
