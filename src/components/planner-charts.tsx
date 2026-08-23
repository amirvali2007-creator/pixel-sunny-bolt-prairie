import { useEffect, useState, type ReactNode } from "react";
import {
  Bar,
  BarChart,
  Cell,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { computeStats } from "@/lib/stats";
import { toFa } from "@/lib/jalali";
import type { Task } from "@/lib/types";
import { PRIORITY_LABELS, STATUS_LABELS, TASK_TYPE_LABELS } from "@/lib/types";

const TYPE_COLORS: Record<string, string> = {
  assignment: "var(--color-doing)",
  quiz: "var(--color-sand)",
  exam: "var(--color-high)",
  project: "var(--color-accent)",
  presentation: "var(--color-lilac)",
  study: "var(--color-mint)",
  lab: "var(--color-peach)",
  research: "var(--color-blush)",
  report: "var(--color-sky)",
};

function ClientChart({ children }: { children: ReactNode }) {
  const [on, setOn] = useState(false);
  useEffect(() => setOn(true), []);
  if (!on) return <div className="min-h-40 flex-1" />;
  return <>{children}</>;
}

function ChartTip({
  active,
  payload,
  label,
}: {
  active?: boolean;
  payload?: Array<{ value: number; name: string }>;
  label?: string;
}) {
  if (!active || !payload?.length) return null;
  return (
    <div className="rounded-md bg-paper px-3 py-2 text-xs text-ink shadow-border">
      {label ? <div className="mb-1 font-medium">{label}</div> : null}
      {payload.map((p) => (
        <div key={p.name}>
          {p.name}: {toFa(p.value)}
        </div>
      ))}
    </div>
  );
}

export function CompletionDonut({ tasks }: { tasks: Task[] }) {
  const s = computeStats(tasks);
  const data = [
    { name: "تکمیل‌شده", value: s.completed, fill: "var(--color-low)" },
    { name: "باقی‌مانده", value: s.incomplete, fill: "var(--color-line)" },
  ];
  const pct = Math.round(s.rate * 100);
  return (
    <div className="flex h-full flex-col">
      <div className="bg-lilac px-3 py-1.5 text-center text-xs font-semibold">
        تکمیل‌شده‌ها: {toFa(s.completed)} / {toFa(s.total)}
      </div>
      <div className="relative min-h-40 flex-1">
        <ClientChart>
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              dataKey="value"
              innerRadius="58%"
              outerRadius="82%"
              paddingAngle={2}
              stroke="none"
            >
              {data.map((d) => (
                <Cell key={d.name} fill={d.fill} />
              ))}
            </Pie>
            <Tooltip content={<ChartTip />} />
          </PieChart>
        </ResponsiveContainer>
        </ClientChart>
        <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center">
          <span className="text-2xl font-semibold tabular-nums">{toFa(pct)}٪</span>
          <span className="text-xs text-muted">پیشرفت</span>
        </div>
      </div>
    </div>
  );
}

export function TypeBars({ tasks }: { tasks: Task[] }) {
  const s = computeStats(tasks);
  const data = Object.entries(s.byType)
    .map(([type, value]) => ({
      name: TASK_TYPE_LABELS[type as keyof typeof TASK_TYPE_LABELS] ?? type,
      value: value ?? 0,
      fill: TYPE_COLORS[type] ?? "var(--color-accent)",
    }))
    .sort((a, b) => b.value - a.value);
  return (
    <div className="flex h-full flex-col">
      <div className="bg-sky px-3 py-1.5 text-center text-xs font-semibold">توزیع وظایف</div>
      <div className="min-h-40 flex-1 px-2 py-2" dir="ltr">
        <ClientChart>
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} layout="vertical" margin={{ top: 4, right: 8, left: 8, bottom: 0 }}>
            <XAxis type="number" hide />
            <YAxis
              type="category"
              dataKey="name"
              width={78}
              tick={{ fontSize: 11, fill: "var(--color-ink)" }}
              axisLine={false}
              tickLine={false}
            />
            <Tooltip content={<ChartTip />} />
            <Bar dataKey="value" name="تعداد" radius={[0, 4, 4, 0]} barSize={12}>
              {data.map((d) => (
                <Cell key={d.name} fill={d.fill} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
        </ClientChart>
      </div>
    </div>
  );
}

export function PriorityBars({ tasks }: { tasks: Task[] }) {
  const s = computeStats(tasks);
  const data = [
    { name: PRIORITY_LABELS.high, value: s.byPriority.high, fill: "var(--color-high)" },
    { name: PRIORITY_LABELS.medium, value: s.byPriority.medium, fill: "var(--color-mid)" },
    { name: PRIORITY_LABELS.low, value: s.byPriority.low, fill: "var(--color-low)" },
  ];
  return (
    <div className="flex h-full flex-col">
      <div className="bg-sand px-3 py-1.5 text-center text-xs font-semibold">اولویت وظایف</div>
      <div className="min-h-36 flex-1 px-2 py-2">
        <ClientChart>
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} margin={{ top: 8, right: 4, left: 4, bottom: 0 }}>
            <XAxis dataKey="name" tick={{ fontSize: 11, fill: "var(--color-ink)" }} axisLine={false} tickLine={false} />
            <YAxis hide />
            <Tooltip content={<ChartTip />} />
            <Bar dataKey="value" name="تعداد" radius={[4, 4, 0, 0]} barSize={28}>
              {data.map((d) => (
                <Cell key={d.name} fill={d.fill} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
        </ClientChart>
      </div>
    </div>
  );
}

export function StatusBars({ tasks }: { tasks: Task[] }) {
  const s = computeStats(tasks);
  const data = (Object.keys(STATUS_LABELS) as Array<keyof typeof STATUS_LABELS>).map((k) => ({
    name: STATUS_LABELS[k],
    value: s.byStatus[k],
    fill:
      k === "done"
        ? "var(--color-done)"
        : k === "in_progress"
          ? "var(--color-doing)"
          : k === "postponed"
            ? "var(--color-wait)"
            : "var(--color-line)",
  }));
  return (
    <div className="flex h-full flex-col">
      <div className="bg-mint px-3 py-1.5 text-center text-xs font-semibold">وضعیت‌ها</div>
      <div className="min-h-36 flex-1 px-2 py-2">
        <ClientChart>
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} margin={{ top: 8, right: 4, left: 4, bottom: 0 }}>
            <XAxis dataKey="name" tick={{ fontSize: 10, fill: "var(--color-ink)" }} axisLine={false} tickLine={false} />
            <YAxis hide />
            <Tooltip content={<ChartTip />} />
            <Bar dataKey="value" name="تعداد" radius={[4, 4, 0, 0]} barSize={22}>
              {data.map((d) => (
                <Cell key={d.name} fill={d.fill} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
        </ClientChart>
      </div>
    </div>
  );
}
