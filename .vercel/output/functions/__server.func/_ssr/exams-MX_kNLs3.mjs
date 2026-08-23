import { i as __toESM } from "../_runtime.mjs";
import { n as require_react } from "../_libs/@radix-ui/react-compose-refs+[...].mjs";
import { n as require_jsx_runtime } from "../_libs/radix-ui__react-context+react.mjs";
import { o as Plus, r as Trash2 } from "../_libs/lucide-react.mjs";
import { n as toast } from "../_libs/sonner.mjs";
import { E as formatJalaliLong, I as toFa, M as remainingLabel, O as formatTimeFa, S as cn, T as daysUntil, b as Textarea, c as DialogHeader, d as Input, l as DialogTitle, n as Button, o as Dialog, p as NativeSelect, r as COURSE_CHIP, s as DialogContent, t as AppShell, u as Field, w as courseName, z as usePlannerStore } from "./app-shell-BdQsOW1w.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/exams-MX_kNLs3.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function ExamBoard() {
	const exams = usePlannerStore((s) => s.exams);
	const courses = usePlannerStore((s) => s.courses);
	const addExam = usePlannerStore((s) => s.addExam);
	const deleteExam = usePlannerStore((s) => s.deleteExam);
	const [open, setOpen] = (0, import_react.useState)(false);
	const sorted = (0, import_react.useMemo)(() => exams.slice().sort((a, b) => a.date.localeCompare(b.date) || a.time.localeCompare(b.time)), [exams]);
	const upcoming = sorted.filter((e) => daysUntil(e.date) >= 0);
	const past = sorted.filter((e) => daysUntil(e.date) < 0);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "space-y-4",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex items-center justify-between",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "text-base font-semibold",
					children: "امتحانات و کوئیزها"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-xs text-muted",
					children: "شمارش معکوس تا برگه بعدی"
				})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
					size: "sm",
					onClick: () => setOpen(true),
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Plus, {}), "امتحان"]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "grid gap-3 md:grid-cols-3",
				children: [upcoming.slice(0, 3).map((exam, i) => {
					const d = daysUntil(exam.date);
					const course = courses.find((c) => c.id === exam.courseId);
					return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
						className: cn("overflow-hidden rounded-lg bg-paper shadow-sheet rise-in", i === 0 && "md:col-span-1"),
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: cn("px-4 py-2 text-center text-xs font-semibold", d <= 3 ? "bg-blush" : d <= 14 ? "bg-sand" : "bg-mint"),
							children: d === 0 ? "امروز" : d === 1 ? "فردا" : `${toFa(d)} روز مانده`
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "space-y-2 p-4",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
									className: "font-semibold leading-snug",
									children: exam.title
								}),
								course ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: cn("inline-flex rounded-sm px-2 py-0.5 text-xs", COURSE_CHIP[course.color]),
									children: course.name
								}) : null,
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
									className: "text-sm text-muted",
									children: [
										formatJalaliLong(exam.date),
										" · ",
										formatTimeFa(exam.time)
									]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "text-sm",
									children: exam.location
								}),
								exam.notes ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "text-xs text-muted",
									children: exam.notes
								}) : null
							]
						})]
					}, exam.id);
				}), upcoming.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "col-span-full py-8 text-center text-sm text-muted",
					children: "امتحان پیش‌رویی ثبت نشده"
				}) : null]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "overflow-hidden rounded-lg bg-paper shadow-sheet",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "bg-lilac px-4 py-2 text-sm font-semibold",
						children: "همه امتحانات"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "overflow-x-auto",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("table", {
							className: "sheet-table w-full min-w-[640px]",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("thead", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", { children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
									className: "bg-sky",
									children: "عنوان"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
									className: "bg-mint",
									children: "درس"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
									className: "bg-sand",
									children: "تاریخ"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
									className: "bg-peach",
									children: "ساعت"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
									className: "bg-blush",
									children: "محل"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
									className: "bg-lilac",
									children: "مانده"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", { className: "bg-sky" })
							] }) }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("tbody", { children: sorted.map((exam) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", { children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
									className: "text-right font-medium",
									children: exam.title
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", { children: courseName(courses, exam.courseId) }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", { children: formatJalaliLong(exam.date) }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", { children: formatTimeFa(exam.time) }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", { children: exam.location }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
									"data-tone": true,
									className: daysUntil(exam.date) < 0 ? "bg-line" : daysUntil(exam.date) <= 3 ? "bg-late" : "",
									children: remainingLabel(exam.date, false)
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
									type: "button",
									className: "mx-auto flex size-8 items-center justify-center rounded-md text-muted hover:bg-late hover:text-ink",
									onClick: () => {
										deleteExam(exam.id);
										toast.success("امتحان حذف شد");
									},
									"aria-label": "حذف",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trash2, { className: "size-3.5" })
								}) })
							] }, exam.id)) })]
						})
					}),
					past.length > 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "px-4 py-2 text-xs text-muted",
						children: [toFa(past.length), " مورد گذشته در فهرست هست"]
					}) : null
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ExamDialog, {
				open,
				onOpenChange: setOpen,
				onSave: (payload) => {
					addExam(payload);
					toast.success("امتحان ثبت شد");
					setOpen(false);
				}
			})
		]
	});
}
function ExamDialog({ open, onOpenChange, onSave }) {
	const courses = usePlannerStore((s) => s.courses);
	const [title, setTitle] = (0, import_react.useState)("");
	const [courseId, setCourseId] = (0, import_react.useState)(courses[0]?.id ?? "");
	const [date, setDate] = (0, import_react.useState)("");
	const [time, setTime] = (0, import_react.useState)("09:00");
	const [location, setLocation] = (0, import_react.useState)("");
	const [notes, setNotes] = (0, import_react.useState)("");
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Dialog, {
		open,
		onOpenChange,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogContent, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogHeader, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogTitle, { children: "امتحان جدید" }) }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
			className: "grid gap-3 sm:grid-cols-2",
			onSubmit: (e) => {
				e.preventDefault();
				if (!title.trim() || !date) {
					toast.error("عنوان و تاریخ لازم است");
					return;
				}
				onSave({
					title: title.trim(),
					courseId,
					date,
					time,
					location,
					notes,
					importance: 80
				});
				setTitle("");
				setNotes("");
				setLocation("");
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
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(NativeSelect, {
						value: courseId,
						onChange: (e) => setCourseId(e.target.value),
						children: courses.map((c) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
							value: c.id,
							children: c.name
						}, c.id))
					})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
					label: "محل",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
						value: location,
						onChange: (e) => setLocation(e.target.value)
					})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
					label: "تاریخ",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
						type: "date",
						value: date,
						onChange: (e) => setDate(e.target.value)
					})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
					label: "ساعت",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
						type: "time",
						value: time,
						onChange: (e) => setTime(e.target.value)
					})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
					label: "یادداشت",
					className: "sm:col-span-2",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Textarea, {
						value: notes,
						onChange: (e) => setNotes(e.target.value),
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
						children: "ثبت امتحان"
					})]
				})
			]
		})] })
	});
}
function ExamsPage() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AppShell, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ExamBoard, {}) });
}
//#endregion
export { ExamsPage as component };
