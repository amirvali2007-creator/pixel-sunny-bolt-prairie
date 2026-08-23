import { i as __toESM } from "../_runtime.mjs";
import { n as require_react } from "../_libs/@radix-ui/react-compose-refs+[...].mjs";
import { n as require_jsx_runtime } from "../_libs/radix-ui__react-context+react.mjs";
import { f as ChevronRight, o as Plus, p as ChevronLeft } from "../_libs/lucide-react.mjs";
import { n as toast } from "../_libs/sonner.mjs";
import { A as jalaliMonthGrid, B as useTaskDialog, D as formatJalaliShort, E as formatJalaliLong, I as toFa, L as toISODate, M as remainingLabel, N as shiftJalaliMonth, R as toJalali, S as cn, V as weekdays, a as DATE_KIND_LABELS, d as Input, f as JALALI_MONTHS, j as jalaliMonthLength, n as Button, t as AppShell, x as addDays, z as usePlannerStore } from "./app-shell-BdQsOW1w.mjs";
import { t as TaskChip } from "./task-table-DEd5yE6X.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/calendar-MY9byycD.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function MonthCalendar() {
	const today = toISODate(/* @__PURE__ */ new Date());
	const nowJ = toJalali(/* @__PURE__ */ new Date());
	const [cursor, setCursor] = (0, import_react.useState)({
		jy: nowJ.jy,
		jm: nowJ.jm
	});
	const [selected, setSelected] = (0, import_react.useState)(today);
	const weekStart = usePlannerStore((s) => s.weekStart);
	const tasks = usePlannerStore((s) => s.tasks);
	const exams = usePlannerStore((s) => s.exams);
	const dates = usePlannerStore((s) => s.importantDates);
	const addImportantDate = usePlannerStore((s) => s.addImportantDate);
	const deleteImportantDate = usePlannerStore((s) => s.deleteImportantDate);
	const { openNew, openEdit } = useTaskDialog();
	const [dateTitle, setDateTitle] = (0, import_react.useState)("");
	const cells = (0, import_react.useMemo)(() => jalaliMonthGrid(cursor.jy, cursor.jm, weekStart), [cursor, weekStart]);
	const days = weekdays(weekStart);
	const next = shiftJalaliMonth(cursor.jy, cursor.jm, 1);
	const tasksByDay = (0, import_react.useMemo)(() => {
		const map = {};
		for (const t of tasks) (map[t.dueDate] ??= []).push(t);
		return map;
	}, [tasks]);
	const examsByDay = (0, import_react.useMemo)(() => {
		const map = {};
		for (const e of exams) (map[e.date] ??= []).push(e);
		return map;
	}, [exams]);
	const selectedTasks = (tasksByDay[selected] ?? []).slice().sort((a, b) => a.dueTime.localeCompare(b.dueTime));
	const selectedExams = examsByDay[selected] ?? [];
	const upcoming = dates.slice().sort((a, b) => a.date.localeCompare(b.date)).filter((d) => d.date >= today).slice(0, 8);
	const nextCells = jalaliMonthGrid(next.jy, next.jm, weekStart);
	function addDate() {
		if (!dateTitle.trim()) return;
		addImportantDate({
			date: selected,
			title: dateTitle.trim(),
			kind: "event"
		});
		setDateTitle("");
		toast.success("تاریخ مهم ثبت شد");
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "grid gap-4 xl:grid-cols-[16rem_minmax(0,1fr)_18rem]",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("aside", {
				className: "overflow-hidden rounded-lg bg-paper shadow-sheet",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "bg-blush px-3 py-2 text-center text-xs font-semibold",
					children: "تاریخ‌های مهم"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
					className: "divide-y divide-line",
					children: upcoming.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", {
						className: "px-3 py-4 text-center text-xs text-muted",
						children: "موردی نیست"
					}) : upcoming.map((d) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
						className: "flex items-start justify-between gap-2 px-3 py-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
							type: "button",
							className: "text-right",
							onClick: () => setSelected(d.date),
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "text-xs font-medium",
								children: d.title
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "text-[0.65rem] text-muted",
								children: [
									formatJalaliShort(d.date),
									" · ",
									DATE_KIND_LABELS[d.kind]
								]
							})]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							type: "button",
							className: "text-[0.65rem] text-muted hover:text-ink",
							onClick: () => deleteImportantDate(d.id),
							children: "حذف"
						})]
					}, d.id))
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "overflow-hidden rounded-lg bg-paper shadow-sheet",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center justify-between bg-lilac px-3 py-2",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
								size: "icon",
								variant: "ghost",
								"aria-label": "ماه قبل",
								onClick: () => setCursor(shiftJalaliMonth(cursor.jy, cursor.jm, -1)),
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronRight, {})
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h2", {
								className: "text-sm font-semibold",
								children: [
									JALALI_MONTHS[cursor.jm - 1],
									" ",
									toFa(cursor.jy)
								]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
								size: "icon",
								variant: "ghost",
								"aria-label": "ماه بعد",
								onClick: () => setCursor(shiftJalaliMonth(cursor.jy, cursor.jm, 1)),
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronLeft, {})
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "month-grid border-b border-line bg-bg text-center text-xs font-medium text-muted",
						children: days.map((d) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "py-2",
							children: d
						}, d))
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "month-grid",
						children: cells.map((cell) => {
							const dayTasks = tasksByDay[cell.iso] ?? [];
							const dayExams = examsByDay[cell.iso] ?? [];
							const isToday = cell.iso === today;
							const isSel = cell.iso === selected;
							return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
								type: "button",
								onClick: () => setSelected(cell.iso),
								className: cn("min-h-20 border-line border-e border-b p-1.5 text-right transition-colors md:min-h-24", cell.inMonth ? "bg-paper" : "bg-bg/60 text-subtle", isSel && "ring-2 ring-accent ring-inset", isToday && "bg-accent-soft", dayExams.length > 0 && cell.inMonth && "bg-blush/70"),
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "flex items-center justify-between",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: cn("text-sm tabular-nums", isToday && "font-semibold text-accent"),
											children: toFa(cell.jDay)
										}), dayExams.length > 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "size-1.5 rounded-full bg-high" }) : null]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "mt-1 hidden space-y-0.5 md:block",
										children: [dayTasks.slice(0, 2).map((t) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TaskChip, { task: t }, t.id)), dayTasks.length > 2 ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "text-[0.65rem] text-muted",
											children: ["+", toFa(dayTasks.length - 2)]
										}) : null]
									}),
									dayTasks.length > 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "mt-1 flex gap-0.5 md:hidden",
										children: dayTasks.slice(0, 3).map((t) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "size-1.5 rounded-full bg-accent" }, t.id))
									}) : null
								]
							}, cell.iso);
						})
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("aside", {
				className: "space-y-4",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "overflow-hidden rounded-lg bg-paper shadow-sheet",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "bg-mint px-3 py-2 text-center text-xs font-semibold",
						children: formatJalaliLong(selected)
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "space-y-3 p-3",
						children: [
							selectedExams.map((e) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "rounded-md bg-blush px-3 py-2 text-sm",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "font-medium",
									children: e.title
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "text-xs text-muted",
									children: [
										e.time,
										" · ",
										e.location
									]
								})]
							}, e.id)),
							selectedTasks.length === 0 && selectedExams.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-center text-xs text-muted",
								children: "برای این روز تکلیفی نیست"
							}) : selectedTasks.map((t) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
								type: "button",
								className: "block w-full rounded-md border border-line px-3 py-2 text-right",
								onClick: () => openEdit(t),
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "text-sm font-medium",
									children: t.title
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "text-xs text-muted",
									children: remainingLabel(t.dueDate, t.status === "done")
								})]
							}, t.id)),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
								size: "sm",
								className: "w-full",
								onClick: () => openNew({ dueDate: selected }),
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Plus, {}), "تکلیف برای این روز"]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex gap-2",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
									className: "h-9",
									placeholder: "تاریخ مهم",
									value: dateTitle,
									onChange: (e) => setDateTitle(e.target.value)
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
									size: "sm",
									variant: "secondary",
									onClick: addDate,
									children: "ثبت"
								})]
							})
						]
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "overflow-hidden rounded-lg bg-paper shadow-sheet",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "bg-sand px-3 py-2 text-center text-xs font-semibold",
							children: [
								JALALI_MONTHS[next.jm - 1],
								" ",
								toFa(next.jy)
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "month-grid text-center text-[0.65rem] text-muted",
							children: [weekdays(weekStart).map((d) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "py-1",
								children: d[0]
							}, d)), nextCells.map((c) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								type: "button",
								onClick: () => {
									setCursor({
										jy: next.jy,
										jm: next.jm
									});
									setSelected(c.iso);
								},
								className: cn("py-1 tabular-nums", !c.inMonth && "opacity-30", c.iso === today && "font-semibold text-accent"),
								children: toFa(c.jDay)
							}, c.iso))]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "px-3 py-2 text-center text-[0.65rem] text-subtle",
							children: [
								toFa(jalaliMonthLength(cursor.jy, cursor.jm)),
								" روز · امروز",
								" ",
								formatJalaliShort(addDays(/* @__PURE__ */ new Date(), 0))
							]
						})
					]
				})]
			})
		]
	});
}
function CalendarPage() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AppShell, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "mb-4",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
			className: "text-base font-semibold",
			children: "تقویم ماهانه"
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "text-sm text-muted",
			children: "تکالیف روی روزها می‌نشینند؛ روز را بزنید تا برنامه همان تاریخ را ببینید."
		})]
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(MonthCalendar, {})] });
}
//#endregion
export { CalendarPage as component };
