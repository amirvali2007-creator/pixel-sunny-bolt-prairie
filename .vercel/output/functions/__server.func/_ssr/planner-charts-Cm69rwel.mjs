import { i as __toESM } from "../_runtime.mjs";
import { n as require_react } from "../_libs/@radix-ui/react-compose-refs+[...].mjs";
import { n as require_jsx_runtime } from "../_libs/radix-ui__react-context+react.mjs";
import { C as computeStats, I as toFa, _ as STATUS_LABELS, m as PRIORITY_LABELS, y as TASK_TYPE_LABELS } from "./app-shell-BdQsOW1w.mjs";
import { a as Bar, c as ResponsiveContainer, i as XAxis, l as Tooltip, n as BarChart, o as Pie, r as YAxis, s as Cell, t as PieChart } from "../_libs/recharts+[...].mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/planner-charts-Cm69rwel.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var TYPE_COLORS = {
	assignment: "var(--color-doing)",
	quiz: "var(--color-sand)",
	exam: "var(--color-high)",
	project: "var(--color-accent)",
	presentation: "var(--color-lilac)",
	study: "var(--color-mint)",
	lab: "var(--color-peach)",
	research: "var(--color-blush)",
	report: "var(--color-sky)"
};
function ClientChart({ children }) {
	const [on, setOn] = (0, import_react.useState)(false);
	(0, import_react.useEffect)(() => setOn(true), []);
	if (!on) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "min-h-40 flex-1" });
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_jsx_runtime.Fragment, { children });
}
function ChartTip({ active, payload, label }) {
	if (!active || !payload?.length) return null;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "rounded-md bg-paper px-3 py-2 text-xs text-ink shadow-border",
		children: [label ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "mb-1 font-medium",
			children: label
		}) : null, payload.map((p) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
			p.name,
			": ",
			toFa(p.value)
		] }, p.name))]
	});
}
function CompletionDonut({ tasks }) {
	const s = computeStats(tasks);
	const data = [{
		name: "تکمیل‌شده",
		value: s.completed,
		fill: "var(--color-low)"
	}, {
		name: "باقی‌مانده",
		value: s.incomplete,
		fill: "var(--color-line)"
	}];
	const pct = Math.round(s.rate * 100);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex h-full flex-col",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "bg-lilac px-3 py-1.5 text-center text-xs font-semibold",
			children: [
				"تکمیل‌شده‌ها: ",
				toFa(s.completed),
				" / ",
				toFa(s.total)
			]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "relative min-h-40 flex-1",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ClientChart, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ResponsiveContainer, {
				width: "100%",
				height: "100%",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(PieChart, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Pie, {
					data,
					dataKey: "value",
					innerRadius: "58%",
					outerRadius: "82%",
					paddingAngle: 2,
					stroke: "none",
					children: data.map((d) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Cell, { fill: d.fill }, d.name))
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Tooltip, { content: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChartTip, {}) })] })
			}) }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "pointer-events-none absolute inset-0 flex flex-col items-center justify-center",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
					className: "text-2xl font-semibold tabular-nums",
					children: [toFa(pct), "٪"]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "text-xs text-muted",
					children: "پیشرفت"
				})]
			})]
		})]
	});
}
function TypeBars({ tasks }) {
	const s = computeStats(tasks);
	const data = Object.entries(s.byType).map(([type, value]) => ({
		name: TASK_TYPE_LABELS[type] ?? type,
		value: value ?? 0,
		fill: TYPE_COLORS[type] ?? "var(--color-accent)"
	})).sort((a, b) => b.value - a.value);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex h-full flex-col",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "bg-sky px-3 py-1.5 text-center text-xs font-semibold",
			children: "توزیع وظایف"
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "min-h-40 flex-1 px-2 py-2",
			dir: "ltr",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ClientChart, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ResponsiveContainer, {
				width: "100%",
				height: "100%",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(BarChart, {
					data,
					layout: "vertical",
					margin: {
						top: 4,
						right: 8,
						left: 8,
						bottom: 0
					},
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(XAxis, {
							type: "number",
							hide: true
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(YAxis, {
							type: "category",
							dataKey: "name",
							width: 78,
							tick: {
								fontSize: 11,
								fill: "var(--color-ink)"
							},
							axisLine: false,
							tickLine: false
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Tooltip, { content: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChartTip, {}) }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Bar, {
							dataKey: "value",
							name: "تعداد",
							radius: [
								0,
								4,
								4,
								0
							],
							barSize: 12,
							children: data.map((d) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Cell, { fill: d.fill }, d.name))
						})
					]
				})
			}) })
		})]
	});
}
function PriorityBars({ tasks }) {
	const s = computeStats(tasks);
	const data = [
		{
			name: PRIORITY_LABELS.high,
			value: s.byPriority.high,
			fill: "var(--color-high)"
		},
		{
			name: PRIORITY_LABELS.medium,
			value: s.byPriority.medium,
			fill: "var(--color-mid)"
		},
		{
			name: PRIORITY_LABELS.low,
			value: s.byPriority.low,
			fill: "var(--color-low)"
		}
	];
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex h-full flex-col",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "bg-sand px-3 py-1.5 text-center text-xs font-semibold",
			children: "اولویت وظایف"
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "min-h-36 flex-1 px-2 py-2",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ClientChart, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ResponsiveContainer, {
				width: "100%",
				height: "100%",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(BarChart, {
					data,
					margin: {
						top: 8,
						right: 4,
						left: 4,
						bottom: 0
					},
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(XAxis, {
							dataKey: "name",
							tick: {
								fontSize: 11,
								fill: "var(--color-ink)"
							},
							axisLine: false,
							tickLine: false
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(YAxis, { hide: true }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Tooltip, { content: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChartTip, {}) }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Bar, {
							dataKey: "value",
							name: "تعداد",
							radius: [
								4,
								4,
								0,
								0
							],
							barSize: 28,
							children: data.map((d) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Cell, { fill: d.fill }, d.name))
						})
					]
				})
			}) })
		})]
	});
}
function StatusBars({ tasks }) {
	const s = computeStats(tasks);
	const data = Object.keys(STATUS_LABELS).map((k) => ({
		name: STATUS_LABELS[k],
		value: s.byStatus[k],
		fill: k === "done" ? "var(--color-done)" : k === "in_progress" ? "var(--color-doing)" : k === "postponed" ? "var(--color-wait)" : "var(--color-line)"
	}));
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex h-full flex-col",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "bg-mint px-3 py-1.5 text-center text-xs font-semibold",
			children: "وضعیت‌ها"
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "min-h-36 flex-1 px-2 py-2",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ClientChart, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ResponsiveContainer, {
				width: "100%",
				height: "100%",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(BarChart, {
					data,
					margin: {
						top: 8,
						right: 4,
						left: 4,
						bottom: 0
					},
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(XAxis, {
							dataKey: "name",
							tick: {
								fontSize: 10,
								fill: "var(--color-ink)"
							},
							axisLine: false,
							tickLine: false
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(YAxis, { hide: true }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Tooltip, { content: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChartTip, {}) }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Bar, {
							dataKey: "value",
							name: "تعداد",
							radius: [
								4,
								4,
								0,
								0
							],
							barSize: 22,
							children: data.map((d) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Cell, { fill: d.fill }, d.name))
						})
					]
				})
			}) })
		})]
	});
}
//#endregion
export { TypeBars as i, PriorityBars as n, StatusBars as r, CompletionDonut as t };
