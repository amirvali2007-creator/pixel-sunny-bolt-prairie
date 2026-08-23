import { i as __toESM } from "../_runtime.mjs";
import { n as require_react } from "../_libs/@radix-ui/react-compose-refs+[...].mjs";
import { n as require_jsx_runtime } from "../_libs/radix-ui__react-context+react.mjs";
import { f as ChevronRight, o as Plus, p as ChevronLeft } from "../_libs/lucide-react.mjs";
import { n as toast } from "../_libs/sonner.mjs";
import { D as formatJalaliShort, E as formatJalaliLong, F as startOfWeek, L as toISODate, O as formatTimeFa, P as slotSpan, S as cn, V as weekdays, c as DialogHeader, d as Input, h as SLOTS, l as DialogTitle, n as Button, o as Dialog, p as NativeSelect, r as COURSE_CHIP, s as DialogContent, t as AppShell, u as Field, x as addDays, z as usePlannerStore } from "./app-shell-BdQsOW1w.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/weekly-Ddk-2Ubq.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function WeekPlanner() {
	const weekStartPref = usePlannerStore((s) => s.weekStart);
	const [anchor, setAnchor] = (0, import_react.useState)(() => startOfWeek(/* @__PURE__ */ new Date(), weekStartPref));
	const [mobileDay, setMobileDay] = (0, import_react.useState)(0);
	const [dialog, setDialog] = (0, import_react.useState)(null);
	const [editingId, setEditingId] = (0, import_react.useState)(null);
	const courses = usePlannerStore((s) => s.courses);
	const blocks = usePlannerStore((s) => s.blocks);
	const addBlock = usePlannerStore((s) => s.addBlock);
	const updateBlock = usePlannerStore((s) => s.updateBlock);
	const deleteBlock = usePlannerStore((s) => s.deleteBlock);
	const days = weekdays(weekStartPref);
	const start = startOfWeek(anchor, weekStartPref);
	const dates = Array.from({ length: 7 }, (_, i) => toISODate(addDays(start, i)));
	const today = toISODate(/* @__PURE__ */ new Date());
	const weekBlocks = (0, import_react.useMemo)(() => blocks.filter((b) => dates.includes(b.date)), [blocks, dates]);
	function shift(delta) {
		setAnchor(addDays(start, delta * 7));
	}
	function openNew(date, startTime) {
		setEditingId(null);
		setDialog({
			date,
			start: startTime
		});
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "space-y-4",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex flex-wrap items-center justify-between gap-3",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "text-base font-semibold",
					children: "برنامه هفتگی"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "text-xs text-muted",
					children: [
						formatJalaliShort(dates[0] ?? today),
						" تا ",
						formatJalaliShort(dates[6] ?? today)
					]
				})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center gap-2",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							size: "icon",
							variant: "secondary",
							"aria-label": "هفته قبل",
							onClick: () => shift(-1),
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronRight, {})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							size: "sm",
							variant: "ghost",
							onClick: () => setAnchor(/* @__PURE__ */ new Date()),
							children: "این هفته"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							size: "icon",
							variant: "secondary",
							"aria-label": "هفته بعد",
							onClick: () => shift(1),
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronLeft, {})
						})
					]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "flex gap-1 overflow-x-auto md:hidden",
				children: dates.map((iso, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
					type: "button",
					onClick: () => setMobileDay(i),
					className: cn("min-w-14 rounded-md px-2 py-2 text-center text-xs", mobileDay === i ? "bg-accent text-accent-fg" : "bg-paper shadow-border", iso === today && mobileDay !== i && "ring-1 ring-accent"),
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { children: days[i] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "tabular-nums",
						children: formatJalaliShort(iso).split(" ")[0]
					})]
				}, iso))
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "overflow-hidden rounded-lg bg-paper shadow-sheet md:hidden",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "bg-sky px-3 py-2 text-xs font-semibold",
					children: [
						days[mobileDay],
						" · ",
						formatJalaliLong(dates[mobileDay] ?? today)
					]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DayTimeline, {
					blocks: weekBlocks.filter((b) => b.date === dates[mobileDay]),
					onAdd: (startTime) => openNew(dates[mobileDay] ?? today, startTime),
					onEdit: (id) => {
						setDialog(null);
						setEditingId(id);
					}
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "hidden overflow-x-auto rounded-lg bg-paper shadow-sheet md:block",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "week-grid min-w-[720px] border-b border-line bg-lilac text-center text-xs font-semibold",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "border-e border-line py-2",
						children: "ساعت"
					}), dates.map((iso, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: cn("border-e border-line py-2 last:border-e-0", iso === today && "bg-accent-soft"),
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { children: days[i] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "font-normal text-muted",
							children: formatJalaliShort(iso)
						})]
					}, iso))]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "week-grid week-grid-body relative min-w-[720px]",
					children: [SLOTS.map((slot) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_react.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "border-e border-b border-line px-1 py-1 text-center text-[0.65rem] text-muted",
						children: formatTimeFa(slot)
					}), dates.map((iso) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						className: "border-e border-b border-line last:border-e-0 hover:bg-bg",
						onClick: () => openNew(iso, slot),
						"aria-label": `افزودن جلسه ${slot}`
					}, `${iso}-${slot}`))] }, slot)), weekBlocks.map((b) => {
						const day = dates.indexOf(b.date);
						if (day < 0) return null;
						const { start: s, span } = slotSpan(b.start, b.end);
						const course = courses.find((c) => c.id === b.courseId);
						return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
							type: "button",
							onClick: () => {
								setDialog(null);
								setEditingId(b.id);
							},
							className: cn("z-10 m-0.5 overflow-hidden rounded-sm px-1.5 py-1 text-right text-[0.7rem] leading-tight", course ? COURSE_CHIP[course.color] : "bg-accent-soft text-ink"),
							style: {
								gridColumn: day + 2,
								gridRow: `${s + 1} / span ${Math.max(span, 1)}`
							},
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "font-medium",
								children: b.title
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "opacity-80",
								children: [
									formatTimeFa(b.start),
									"–",
									formatTimeFa(b.end)
								]
							})]
						}, b.id);
					})]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(BlockDialog, {
				open: Boolean(dialog) || Boolean(editingId),
				onOpenChange: (o) => {
					if (!o) {
						setDialog(null);
						setEditingId(null);
					}
				},
				date: dialog?.date,
				start: dialog?.start,
				editingId,
				onSave: (payload) => {
					if (editingId) {
						updateBlock(editingId, payload);
						toast.success("جلسه به‌روز شد");
					} else {
						addBlock(payload);
						toast.success("جلسه به برنامه اضافه شد");
					}
					setDialog(null);
					setEditingId(null);
				},
				onDelete: () => {
					if (editingId) {
						deleteBlock(editingId);
						toast.success("جلسه حذف شد");
					}
					setDialog(null);
					setEditingId(null);
				}
			})
		]
	});
}
function DayTimeline({ blocks, onAdd, onEdit }) {
	const courses = usePlannerStore((s) => s.courses);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { children: SLOTS.filter((_, i) => i % 2 === 0).map((slot) => {
		const here = blocks.filter((b) => b.start <= slot && b.end > slot);
		return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex min-h-12 border-b border-line",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "w-14 shrink-0 px-2 py-2 text-xs text-muted",
				children: formatTimeFa(slot)
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "flex-1 p-1",
				children: here.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					type: "button",
					className: "h-full min-h-10 w-full rounded-sm text-xs text-subtle hover:bg-bg",
					onClick: () => onAdd(slot),
					children: "افزودن"
				}) : here.map((b) => {
					const course = courses.find((c) => c.id === b.courseId);
					return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						onClick: () => onEdit(b.id),
						className: cn("mb-1 w-full rounded-sm px-2 py-1 text-right text-xs", course ? COURSE_CHIP[course.color] : "bg-accent-soft"),
						children: b.title
					}, b.id);
				})
			})]
		}, slot);
	}) });
}
function BlockDialog({ open, onOpenChange, date, start, editingId, onSave, onDelete }) {
	const courses = usePlannerStore((s) => s.courses);
	const blocks = usePlannerStore((s) => s.blocks);
	const editing = editingId ? blocks.find((b) => b.id === editingId) : void 0;
	const [title, setTitle] = (0, import_react.useState)("");
	const [courseId, setCourseId] = (0, import_react.useState)("");
	const [startTime, setStartTime] = (0, import_react.useState)("09:00");
	const [endTime, setEndTime] = (0, import_react.useState)("10:00");
	const [notes, setNotes] = (0, import_react.useState)("");
	const [day, setDay] = (0, import_react.useState)(toISODate(/* @__PURE__ */ new Date()));
	(0, import_react.useEffect)(() => {
		if (!open) return;
		const current = editingId ? usePlannerStore.getState().blocks.find((b) => b.id === editingId) : void 0;
		if (current) {
			setTitle(current.title);
			setCourseId(current.courseId ?? "");
			setStartTime(current.start);
			setEndTime(current.end);
			setNotes(current.notes);
			setDay(current.date);
			return;
		}
		setTitle("");
		setCourseId(usePlannerStore.getState().courses[0]?.id ?? "");
		const s = start ?? "09:00";
		setStartTime(s);
		const [h, m] = s.split(":").map(Number);
		const endH = (h ?? 9) + 1;
		setEndTime(`${String(endH).padStart(2, "0")}:${String(m ?? 0).padStart(2, "0")}`);
		setNotes("");
		setDay(date ?? toISODate(/* @__PURE__ */ new Date()));
	}, [
		open,
		editingId,
		start,
		date
	]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Dialog, {
		open,
		onOpenChange,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogContent, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogHeader, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogTitle, { children: editing ? "ویرایش جلسه مطالعه" : "جلسه مطالعه جدید" }) }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
			className: "grid gap-3 sm:grid-cols-2",
			onSubmit: (e) => {
				e.preventDefault();
				if (!title.trim()) {
					toast.error("عنوان جلسه را بنویسید");
					return;
				}
				onSave({
					date: day,
					start: startTime,
					end: endTime,
					title: title.trim(),
					courseId: courseId || null,
					notes
				});
			},
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
					label: "عنوان",
					className: "sm:col-span-2",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
						value: title,
						onChange: (e) => setTitle(e.target.value)
					})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
					label: "درس",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(NativeSelect, {
						value: courseId,
						onChange: (e) => setCourseId(e.target.value),
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
							value: "",
							children: "بدون درس"
						}), courses.map((c) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
							value: c.id,
							children: c.name
						}, c.id))]
					})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
					label: "تاریخ",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
						type: "date",
						value: day,
						onChange: (e) => setDay(e.target.value)
					})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
					label: "از",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
						type: "time",
						value: startTime,
						onChange: (e) => setStartTime(e.target.value)
					})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
					label: "تا",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
						type: "time",
						value: endTime,
						onChange: (e) => setEndTime(e.target.value)
					})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
					label: "یادداشت",
					className: "sm:col-span-2",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
						value: notes,
						onChange: (e) => setNotes(e.target.value)
					})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex justify-between gap-2 sm:col-span-2",
					children: [editing ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						type: "button",
						variant: "danger",
						onClick: onDelete,
						children: "حذف"
					}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex gap-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							type: "button",
							variant: "secondary",
							onClick: () => onOpenChange(false),
							children: "انصراف"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
							type: "submit",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Plus, {}), "ذخیره"]
						})]
					})]
				})
			]
		})] })
	});
}
function WeeklyPage() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AppShell, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
		className: "mb-4 text-sm text-muted",
		children: "روی خانهٔ ساعت بزنید و جلسه مطالعه بگذارید — مثل پلنر ساعتی اکسل، با تقویم جلالی."
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(WeekPlanner, {})] });
}
//#endregion
export { WeeklyPage as component };
