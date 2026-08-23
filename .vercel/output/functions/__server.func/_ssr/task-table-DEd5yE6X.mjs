import { i as __toESM } from "../_runtime.mjs";
import { n as require_react } from "../_libs/@radix-ui/react-compose-refs+[...].mjs";
import { n as require_jsx_runtime } from "../_libs/radix-ui__react-context+react.mjs";
import { m as Check, o as Plus, r as Trash2, s as Pencil } from "../_libs/lucide-react.mjs";
import { n as toast } from "../_libs/sonner.mjs";
import { D as formatJalaliShort, I as toFa, M as remainingLabel, O as formatTimeFa, S as cn, T as daysUntil, _ as STATUS_LABELS, g as STATUSES, i as COURSE_DOT, k as isOverdue, m as PRIORITY_LABELS, n as Button, p as NativeSelect, r as COURSE_CHIP, v as TASK_TYPES, y as TASK_TYPE_LABELS, z as usePlannerStore } from "./app-shell-BdQsOW1w.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/task-table-DEd5yE6X.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function Checkbox({ checked = false, onCheckedChange, className, "aria-label": ariaLabel }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
		type: "button",
		role: "checkbox",
		"aria-checked": checked,
		"aria-label": ariaLabel,
		className: cn("relative inline-flex size-4 shrink-0 items-center justify-center rounded-sm border border-ink/30 bg-paper", "after:absolute after:top-1/2 after:left-1/2 after:size-10 after:-translate-x-1/2 after:-translate-y-1/2", checked && "border-accent bg-accent text-accent-fg", className),
		onClick: () => onCheckedChange?.(!checked),
		children: checked ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Check, {
			className: "size-3",
			strokeWidth: 3
		}) : null
	});
}
var HEADERS = [
	{
		key: "#",
		cls: "bg-lilac w-10"
	},
	{
		key: "✓",
		cls: "bg-mint w-10"
	},
	{
		key: "نام کلاس",
		cls: "bg-sky"
	},
	{
		key: "عنوان وظیفه",
		cls: "bg-blush"
	},
	{
		key: "نوع",
		cls: "bg-sand"
	},
	{
		key: "توضیحات",
		cls: "bg-peach"
	},
	{
		key: "اولویت",
		cls: "bg-lilac"
	},
	{
		key: "وضعیت",
		cls: "bg-mint"
	},
	{
		key: "مهلت انجام",
		cls: "bg-sky"
	},
	{
		key: "ددلاین",
		cls: "bg-sand"
	},
	{
		key: "باقی‌مانده",
		cls: "bg-blush"
	},
	{
		key: "نمره",
		cls: "bg-peach"
	},
	{
		key: "اهمیت",
		cls: "bg-lilac"
	},
	{
		key: "یادداشت",
		cls: "bg-mint"
	},
	{
		key: "",
		cls: "bg-sky w-16"
	}
];
function priorityTone(p) {
	return p === "high" ? "bg-high" : p === "medium" ? "bg-mid" : "bg-low";
}
function statusTone(task) {
	if (isOverdue(task)) return "bg-late";
	if (task.status === "done") return "bg-done";
	if (task.status === "in_progress") return "bg-doing";
	if (task.status === "postponed") return "bg-wait";
	return "";
}
function remainingTone(task) {
	if (task.status === "done") return "bg-mint";
	const d = daysUntil(task.dueDate);
	if (d < 0) return "bg-late";
	if (d === 0) return "bg-peach";
	if (d <= 3) return "bg-sand";
	return "";
}
function TaskTable({ tasks, onEdit, onAdd, title = "تکالیف" }) {
	const courses = usePlannerStore((s) => s.courses);
	const updateTask = usePlannerStore((s) => s.updateTask);
	const deleteTask = usePlannerStore((s) => s.deleteTask);
	const toggleTaskDone = usePlannerStore((s) => s.toggleTaskDone);
	const [selected, setSelected] = (0, import_react.useState)({});
	const selectedIds = tasks.filter((t) => selected[t.id]).map((t) => t.id);
	function toggleAll(on) {
		const next = {};
		if (on) for (const t of tasks) next[t.id] = true;
		setSelected(next);
	}
	function remove(id) {
		deleteTask(id);
		toast.success("تکلیف حذف شد");
	}
	function bulkDone() {
		selectedIds.forEach((id) => updateTask(id, { status: "done" }));
		setSelected({});
		toast.success("موارد انتخاب‌شده تکمیل شد");
	}
	function bulkDelete() {
		selectedIds.forEach((id) => deleteTask(id));
		setSelected({});
		toast.success("موارد انتخاب‌شده حذف شد");
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "overflow-hidden rounded-lg bg-paper shadow-sheet",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex items-center justify-between gap-3 bg-blush px-4 py-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "text-sm font-semibold",
					children: title
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center gap-2",
					children: [selectedIds.length > 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
							className: "text-xs text-muted",
							children: [toFa(selectedIds.length), " مورد"]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							size: "sm",
							variant: "secondary",
							onClick: bulkDone,
							children: "تکمیل"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							size: "sm",
							variant: "danger",
							onClick: bulkDelete,
							children: "حذف"
						})
					] }) : null, /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
						size: "sm",
						onClick: onAdd,
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Plus, {}), "افزودن"]
					})]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "md:hidden divide-y divide-line",
				children: tasks.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EmptyRow, { onAdd }) : tasks.map((task) => {
					const course = courses.find((c) => c.id === task.courseId);
					return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
						className: "flex gap-3 px-4 py-3",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Checkbox, {
								checked: task.status === "done",
								onCheckedChange: () => toggleTaskDone(task.id),
								"aria-label": "تکمیل",
								className: "mt-1"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
								type: "button",
								className: "min-w-0 flex-1 text-right",
								onClick: () => onEdit(task),
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex items-center gap-2",
									children: [course ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: cn("size-2 rounded-full", COURSE_DOT[course.color]) }) : null, /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "truncate text-sm font-medium",
										children: task.title
									})]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "mt-1 flex flex-wrap items-center gap-1.5 text-xs text-muted",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: course?.name }),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "·" }),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: TASK_TYPE_LABELS[task.type] }),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "·" }),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: remainingLabel(task.dueDate, task.status === "done") })
									]
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: cn("h-fit rounded-sm px-2 py-0.5 text-xs", priorityTone(task.priority)),
								children: PRIORITY_LABELS[task.priority]
							})
						]
					}, task.id);
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "hidden overflow-x-auto md:block",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("table", {
					className: "sheet-table w-full min-w-[1080px]",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("thead", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("tr", { children: HEADERS.map((h) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
						className: h.cls,
						children: h.key === "✓" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Checkbox, {
							checked: tasks.length > 0 && selectedIds.length === tasks.length,
							onCheckedChange: (v) => toggleAll(Boolean(v)),
							"aria-label": "انتخاب همه"
						}) : h.key
					}, h.key)) }) }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("tbody", { children: tasks.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("tr", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
						colSpan: HEADERS.length,
						className: "py-10",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EmptyRow, { onAdd })
					}) }) : tasks.map((task, i) => {
						courses.find((c) => c.id === task.courseId);
						const overdue = isOverdue(task);
						return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", { children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", { children: toFa(i + 1) }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "flex justify-center",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Checkbox, {
									checked: Boolean(selected[task.id]),
									onCheckedChange: (v) => setSelected((s) => ({
										...s,
										[task.id]: Boolean(v)
									})),
									"aria-label": "انتخاب"
								})
							}) }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(NativeSelect, {
								className: "h-8 border-0 bg-transparent text-xs shadow-none",
								value: task.courseId,
								onChange: (e) => updateTask(task.id, { courseId: e.target.value }),
								children: courses.map((c) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
									value: c.id,
									children: c.name
								}, c.id))
							}) }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
								className: "max-w-48",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
									type: "button",
									className: "w-full truncate text-right font-medium hover:text-accent",
									onClick: () => onEdit(task),
									children: task.title
								})
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(NativeSelect, {
								className: "h-8 border-0 bg-transparent text-xs shadow-none",
								value: task.type,
								onChange: (e) => updateTask(task.id, { type: e.target.value }),
								children: TASK_TYPES.map((t) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
									value: t,
									children: TASK_TYPE_LABELS[t]
								}, t))
							}) }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
								className: "max-w-56 text-right text-muted",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "line-clamp-2",
									children: task.description || "—"
								})
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
								"data-tone": true,
								className: priorityTone(task.priority),
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(NativeSelect, {
									className: "h-8 border-0 bg-transparent text-xs shadow-none",
									value: task.priority,
									onChange: (e) => updateTask(task.id, { priority: e.target.value }),
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
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("td", {
								"data-tone": true,
								className: statusTone(task),
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(NativeSelect, {
									className: "h-8 border-0 bg-transparent text-xs shadow-none",
									value: task.status,
									onChange: (e) => updateTask(task.id, { status: e.target.value }),
									children: STATUSES.map((s) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
										value: s,
										children: STATUS_LABELS[s]
									}, s))
								}), overdue ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "text-[0.65rem] font-medium",
									children: "عقب‌افتاده"
								}) : null]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { children: formatJalaliShort(task.dueDate) }) }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", { children: formatTimeFa(task.dueTime) }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
								"data-tone": true,
								className: remainingTone(task),
								children: remainingLabel(task.dueDate, task.status === "done")
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", { children: task.grade != null ? toFa(task.grade) : "—" }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("td", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "mx-auto h-1.5 w-16 overflow-hidden rounded-full bg-line",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "h-full bg-accent",
									style: { width: `${task.importance}%` }
								})
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "mt-0.5 text-[0.65rem] text-muted",
								children: [toFa(task.importance), "٪"]
							})] }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
								className: "max-w-40 text-right text-muted",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "line-clamp-2",
									children: task.notes || "—"
								})
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex justify-center gap-1",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
									type: "button",
									className: "flex size-8 items-center justify-center rounded-md text-muted hover:bg-bg hover:text-ink",
									onClick: () => onEdit(task),
									"aria-label": "ویرایش",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Pencil, { className: "size-3.5" })
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
									type: "button",
									className: "flex size-8 items-center justify-center rounded-md text-muted hover:bg-late hover:text-ink",
									onClick: () => remove(task.id),
									"aria-label": "حذف",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trash2, { className: "size-3.5" })
								})]
							}) })
						] }, task.id);
					}) })]
				})
			})
		]
	});
}
function EmptyRow({ onAdd }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex flex-col items-center gap-2 py-6 text-sm text-muted",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "تکلیفی با این فیلتر پیدا نشد." }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
			size: "sm",
			variant: "secondary",
			onClick: onAdd,
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Plus, {}), "افزودن تکلیف"]
		})]
	});
}
function TaskChip({ task }) {
	const course = usePlannerStore((s) => s.courses).find((c) => c.id === task.courseId);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
		className: cn("inline-flex max-w-full items-center gap-1 truncate rounded-sm px-1.5 py-0.5 text-[0.65rem]", course ? COURSE_CHIP[course.color] : "bg-bg"),
		children: task.title
	});
}
//#endregion
export { TaskTable as n, TaskChip as t };
