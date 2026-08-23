import { i as __toESM } from "../_runtime.mjs";
import { n as require_react } from "../_libs/@radix-ui/react-compose-refs+[...].mjs";
import { n as require_jsx_runtime } from "../_libs/radix-ui__react-context+react.mjs";
import { a as RotateCcw } from "../_libs/lucide-react.mjs";
import { B as useTaskDialog, I as toFa, T as daysUntil, _ as STATUS_LABELS, d as Input, g as STATUSES, m as PRIORITY_LABELS, n as Button, p as NativeSelect, t as AppShell, u as Field, v as TASK_TYPES, y as TASK_TYPE_LABELS, z as usePlannerStore } from "./app-shell-BdQsOW1w.mjs";
import { n as TaskTable } from "./task-table-DEd5yE6X.mjs";
import { n as PriorityBars, r as StatusBars } from "./planner-charts-Cm69rwel.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/tasks-DGg4nMYj.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var EMPTY_FILTERS = {
	q: "",
	courseId: "",
	type: "",
	priority: "",
	status: "",
	remaining: "all",
	completed: "include",
	minImportance: 0,
	hasGrade: "all"
};
function filterTasks(tasks, f) {
	const q = f.q.trim();
	return tasks.filter((t) => {
		if (f.courseId && t.courseId !== f.courseId) return false;
		if (f.type && t.type !== f.type) return false;
		if (f.priority && t.priority !== f.priority) return false;
		if (f.status && t.status !== f.status) return false;
		if (f.completed === "hide" && t.status === "done") return false;
		if (f.completed === "only" && t.status !== "done") return false;
		if (t.importance < f.minImportance) return false;
		if (f.hasGrade === "yes" && t.grade == null) return false;
		if (f.hasGrade === "no" && t.grade != null) return false;
		if (q) {
			if (!`${t.title} ${t.description} ${t.notes}`.toLowerCase().includes(q.toLowerCase())) return false;
		}
		if (f.remaining !== "all") {
			const d = daysUntil(t.dueDate);
			if (f.remaining === "overdue" && !(d < 0 && t.status !== "done")) return false;
			if (f.remaining === "today" && d !== 0) return false;
			if (f.remaining === "3" && !(d >= 0 && d <= 3)) return false;
			if (f.remaining === "7" && !(d >= 0 && d <= 7)) return false;
			if (f.remaining === "14" && !(d >= 0 && d <= 14)) return false;
			if (f.remaining === "later" && d <= 14) return false;
		}
		return true;
	});
}
function filtersActive(f) {
	return f.q.trim() !== "" || f.courseId !== "" || f.type !== "" || f.priority !== "" || f.status !== "" || f.remaining !== "all" || f.completed !== "include" || f.minImportance > 0 || f.hasGrade !== "all";
}
function FilterPanel({ filters, onChange, resultCount }) {
	const courses = usePlannerStore((s) => s.courses);
	const active = filtersActive(filters);
	function patch(key, value) {
		onChange({
			...filters,
			[key]: value
		});
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
		className: "overflow-hidden rounded-lg bg-paper shadow-sheet",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex items-center justify-between bg-accent-soft px-4 py-2",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
				className: "text-sm font-semibold",
				children: "فیلترها"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex items-center gap-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
					className: "text-xs text-muted",
					children: [toFa(resultCount), " نتیجه"]
				}), active ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
					size: "sm",
					variant: "ghost",
					onClick: () => onChange(EMPTY_FILTERS),
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(RotateCcw, {}), "پاک کردن"]
				}) : null]
			})]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "grid gap-3 p-4 sm:grid-cols-2 lg:grid-cols-4",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
					label: "جستجو",
					className: "sm:col-span-2",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
						value: filters.q,
						onChange: (e) => patch("q", e.target.value),
						placeholder: "عنوان، توضیح یا یادداشت"
					})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
					label: "نام کلاس",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(NativeSelect, {
						value: filters.courseId,
						onChange: (e) => patch("courseId", e.target.value),
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
							value: "",
							children: "همه دروس"
						}), courses.map((c) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
							value: c.id,
							children: c.name
						}, c.id))]
					})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
					label: "نوع وظیفه",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(NativeSelect, {
						value: filters.type,
						onChange: (e) => patch("type", e.target.value),
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
							value: "",
							children: "همه"
						}), TASK_TYPES.map((t) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
							value: t,
							children: TASK_TYPE_LABELS[t]
						}, t))]
					})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
					label: "اولویت",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(NativeSelect, {
						value: filters.priority,
						onChange: (e) => patch("priority", e.target.value),
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
							value: "",
							children: "همه"
						}), [
							"high",
							"medium",
							"low"
						].map((p) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
							value: p,
							children: PRIORITY_LABELS[p]
						}, p))]
					})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
					label: "وضعیت",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(NativeSelect, {
						value: filters.status,
						onChange: (e) => patch("status", e.target.value),
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
							value: "",
							children: "همه"
						}), STATUSES.map((s) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
							value: s,
							children: STATUS_LABELS[s]
						}, s))]
					})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
					label: "روزهای باقی‌مانده",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(NativeSelect, {
						value: filters.remaining,
						onChange: (e) => patch("remaining", e.target.value),
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
								value: "all",
								children: "همه"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
								value: "overdue",
								children: "عقب‌افتاده"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
								value: "today",
								children: "امروز"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
								value: "3",
								children: "تا ۳ روز"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
								value: "7",
								children: "تا ۷ روز"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
								value: "14",
								children: "تا ۱۴ روز"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
								value: "later",
								children: "بعدتر"
							})
						]
					})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
					label: "وظایف تکمیل‌شده",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(NativeSelect, {
						value: filters.completed,
						onChange: (e) => patch("completed", e.target.value),
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
								value: "include",
								children: "نمایش همه"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
								value: "hide",
								children: "مخفی کردن تکمیل‌شده"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
								value: "only",
								children: "فقط تکمیل‌شده"
							})
						]
					})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
					label: "نمره",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(NativeSelect, {
						value: filters.hasGrade,
						onChange: (e) => patch("hasGrade", e.target.value),
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
								value: "all",
								children: "همه"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
								value: "yes",
								children: "دارای نمره"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
								value: "no",
								children: "بدون نمره"
							})
						]
					})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
					label: `اهمیت نسبی از ${filters.minImportance}٪`,
					className: "sm:col-span-2 lg:col-span-4",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
						type: "range",
						min: 0,
						max: 100,
						step: 5,
						value: filters.minImportance,
						onChange: (e) => patch("minImportance", Number(e.target.value)),
						className: "h-10 w-full accent-accent"
					})
				})
			]
		})]
	});
}
function TasksPage() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AppShell, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TasksView, {}) });
}
function TasksView() {
	const tasks = usePlannerStore((s) => s.tasks);
	const { openNew, openEdit } = useTaskDialog();
	const [filters, setFilters] = (0, import_react.useState)(EMPTY_FILTERS);
	const filtered = (0, import_react.useMemo)(() => filterTasks(tasks, filters), [tasks, filters]);
	const sorted = (0, import_react.useMemo)(() => filtered.slice().sort((a, b) => a.dueDate.localeCompare(b.dueDate)), [filtered]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "space-y-4",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
				className: "text-base font-semibold",
				children: "پلنر تکالیف"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-sm text-muted",
				children: "فیلتر کنید، اولویت بگذارید، نمره ثبت کنید و خروجی اکسل بگیرید."
			})] }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "grid gap-3 md:grid-cols-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("article", {
					className: "overflow-hidden rounded-lg bg-paper shadow-sheet",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PriorityBars, { tasks: filtered })
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("article", {
					className: "overflow-hidden rounded-lg bg-paper shadow-sheet",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatusBars, { tasks: filtered })
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FilterPanel, {
				filters,
				onChange: setFilters,
				resultCount: sorted.length
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TaskTable, {
				tasks: sorted,
				onEdit: openEdit,
				onAdd: () => openNew(),
				title: "تکالیف فیلترشده"
			})
		]
	});
}
//#endregion
export { TasksPage as component };
