import { useTaskDialog } from "@/components/app-shell";
import { CompletionDonut, TypeBars } from "@/components/planner-charts";
import { TaskTable } from "@/components/task-table";
import { daysUntil, formatJalaliLong, toFa } from "@/lib/jalali";
import { computeStats } from "@/lib/stats";
import { usePlannerStore } from "@/lib/store";
import { cn } from "@/lib/utils";

export function DashboardView() {
  const tasks = usePlannerStore((s) => s.tasks);
  const exams = usePlannerStore((s) => s.exams);
  const { openNew, openEdit } = useTaskDialog();
  const stats = computeStats(tasks);
  const nextExam = exams
    .slice()
    .filter((e) => daysUntil(e.date) >= 0)
    .sort((a, b) => a.date.localeCompare(b.date))[0];

  const cards = [
    {
      label: "تاریخ امروز",
      cls: "bg-accent-soft",
      value: formatJalaliLong(new Date()),
      sub: "تقویم جلالی",
    },
    {
      label: "کل تکالیف",
      cls: "bg-sand",
      value: toFa(stats.total),
      sub: `${toFa(stats.incomplete)} باز`,
    },
    {
      label: "تکمیل‌شده‌ها",
      cls: "bg-mint",
      value: toFa(stats.completed),
      sub: `${toFa(Math.round(stats.rate * 100))}٪ پیشرفت`,
    },
    {
      label: "تکمیل‌نشده‌ها",
      cls: "bg-blush",
      value: toFa(stats.incomplete),
      sub: stats.overdue ? `${toFa(stats.overdue)} عقب‌افتاده` : "بدون تأخیر جدی",
    },
    {
      label: "مهلت تا امروز",
      cls: "bg-peach",
      value: toFa(stats.dueToday),
      sub: "باید امروز بسته شود",
    },
  ];

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 gap-3 md:grid-cols-3 xl:grid-cols-6">
        {cards.map((c) => (
          <article key={c.label} className="overflow-hidden rounded-lg bg-paper shadow-sheet rise-in">
            <div className={cn("px-3 py-1.5 text-center text-xs font-semibold", c.cls)}>
              {c.label}
            </div>
            <div className="px-3 py-3 text-center">
              <div className="text-lg font-semibold leading-snug tabular-nums md:text-xl">
                {c.value}
              </div>
              <div className="mt-1 text-xs text-muted">{c.sub}</div>
            </div>
          </article>
        ))}
        <article className="overflow-hidden rounded-lg bg-paper shadow-sheet rise-in">
          <div className="bg-lilac px-3 py-1.5 text-center text-xs font-semibold">امتحان بعدی</div>
          <div className="px-3 py-3 text-center">
            {nextExam ? (
              <>
                <div className="line-clamp-2 text-sm font-semibold leading-snug">{nextExam.title}</div>
                <div className="mt-1 text-xl font-semibold tabular-nums text-accent">
                  {toFa(daysUntil(nextExam.date))} روز
                </div>
              </>
            ) : (
              <p className="text-sm text-muted">امتحانی در راه نیست</p>
            )}
          </div>
        </article>
      </div>

      <div className="grid gap-3 lg:grid-cols-2">
        <article className="overflow-hidden rounded-lg bg-paper shadow-sheet">
          <CompletionDonut tasks={tasks} />
        </article>
        <article className="overflow-hidden rounded-lg bg-paper shadow-sheet">
          <TypeBars tasks={tasks} />
        </article>
      </div>

      {stats.avgGrade != null ? (
        <p className="text-xs text-muted">
          میانگین نمرات ثبت‌شده: {toFa(stats.avgGrade.toFixed(1))} از ۲۰
        </p>
      ) : null}

      <TaskTable
        tasks={tasks.slice().sort((a, b) => a.dueDate.localeCompare(b.dueDate))}
        onEdit={openEdit}
        onAdd={() => openNew()}
      />
    </div>
  );
}
