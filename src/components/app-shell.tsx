import { Link, useMatchRoute } from "@tanstack/react-router";
import {
  CalendarClock,
  CalendarDays,
  Download,
  GraduationCap,
  LayoutDashboard,
  ListChecks,
  Plus,
  Settings2,
} from "lucide-react";
import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from "react";
import { Toaster, toast } from "sonner";
import { SettingsSheet } from "@/components/settings-sheet";
import { TaskFormDialog, type TaskDraft } from "@/components/task-form";
import { Button } from "@/components/ui/button";
import { copyForSheets, downloadExcel } from "@/lib/export-excel";
import { formatJalaliShort } from "@/lib/jalali";
import { migrateLegacyStorage, usePlannerStore } from "@/lib/store";
import type { Task } from "@/lib/types";
import { cn } from "@/lib/utils";

const NAV = [
  { to: "/", label: "داشبورد", icon: LayoutDashboard },
  { to: "/tasks", label: "تکالیف", icon: ListChecks },
  { to: "/calendar", label: "تقویم", icon: CalendarDays },
  { to: "/weekly", label: "هفته", icon: CalendarClock },
  { to: "/exams", label: "امتحان", icon: GraduationCap },
] as const;

interface DialogApi {
  openNew: (prefill?: Partial<TaskDraft>) => void;
  openEdit: (task: Task) => void;
}

const DialogCtx = createContext<DialogApi | null>(null);

export function useTaskDialog() {
  const ctx = useContext(DialogCtx);
  if (!ctx) throw new Error("useTaskDialog must be used inside AppShell");
  return ctx;
}

export function AppShell({ children }: { children: ReactNode }) {
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [formOpen, setFormOpen] = useState(false);
  const [editing, setEditing] = useState<Task | null>(null);
  const [prefill, setPrefill] = useState<Partial<TaskDraft> | undefined>();
  const matchRoute = useMatchRoute();
  const studentName = usePlannerStore((s) => s.studentName);
  const academicYear = usePlannerStore((s) => s.academicYear);

  useEffect(() => {
    migrateLegacyStorage();
    void Promise.resolve(usePlannerStore.persist.rehydrate()).then(() => {
      usePlannerStore.getState().markHydrated();
    });
  }, []);

  const api = useMemo<DialogApi>(
    () => ({
      openNew: (next) => {
        setEditing(null);
        setPrefill(next);
        setFormOpen(true);
      },
      openEdit: (task) => {
        setPrefill(undefined);
        setEditing(task);
        setFormOpen(true);
      },
    }),
    [],
  );

  async function onCopy() {
    try {
      const data = usePlannerStore.getState();
      await copyForSheets(data);
      toast.success("جدول تکالیف برای گوگل‌شیت کپی شد");
    } catch {
      toast.error("کپی انجام نشد");
    }
  }

  function onExcel() {
    downloadExcel(usePlannerStore.getState());
    toast.success("فایل اکسل دانلود شد");
  }

  return (
    <DialogCtx.Provider value={api}>
      <div className="paper-grain min-h-dvh text-ink">
        <div className="mx-auto max-w-[1400px] md:px-5 md:py-6">
          <div className="min-h-dvh overflow-hidden bg-paper shadow-sheet md:min-h-0 md:rounded-xl">
            <div className="h-1.5 bg-accent" />
            <header className="border-b border-line px-4 py-3 md:px-6">
              <div className="flex items-center gap-3">
                <div className="flex size-10 items-center justify-center rounded-md bg-accent text-xs font-bold tracking-wide text-accent-fg">
                  AVM
                </div>
                <div className="min-w-0 flex-1">
                  <div className="flex flex-wrap items-baseline gap-x-2">
                    <h1 className="text-lg font-semibold leading-tight md:text-xl">AVM PLANNER</h1>
                    <span className="text-xs text-muted">{academicYear}</span>
                  </div>
                  <p className="truncate text-xs text-muted">
                    {studentName} · {formatJalaliShort(new Date())} · پلنر تحصیلی
                  </p>
                </div>
                <div className="hidden items-center gap-2 sm:flex">
                  <Button size="sm" variant="secondary" onClick={onCopy}>
                    کپی شیت
                  </Button>
                  <Button size="sm" variant="secondary" onClick={onExcel}>
                    <Download />
                    اکسل
                  </Button>
                  <Button size="sm" onClick={() => api.openNew()}>
                    <Plus />
                    تکلیف
                  </Button>
                  <Button
                    size="icon"
                    variant="ghost"
                    aria-label="تنظیمات"
                    onClick={() => setSettingsOpen(true)}
                  >
                    <Settings2 />
                  </Button>
                </div>
                <Button
                  size="icon"
                  className="sm:hidden"
                  aria-label="تکلیف جدید"
                  onClick={() => api.openNew()}
                >
                  <Plus />
                </Button>
                <Button
                  size="icon"
                  variant="ghost"
                  className="sm:hidden"
                  aria-label="تنظیمات"
                  onClick={() => setSettingsOpen(true)}
                >
                  <Settings2 />
                </Button>
              </div>
              <nav className="mt-3 hidden gap-1 md:flex" aria-label="بخش‌ها">
                {NAV.map((item) => {
                  const active = Boolean(matchRoute({ to: item.to, fuzzy: item.to !== "/" }));
                  return (
                    <Link
                      key={item.to}
                      to={item.to}
                      className={cn(
                        "inline-flex h-10 items-center gap-2 rounded-md px-3 text-sm font-medium transition-colors",
                        active ? "bg-accent text-accent-fg" : "text-muted hover:bg-bg hover:text-ink",
                      )}
                    >
                      <item.icon className="size-4" />
                      {item.label}
                    </Link>
                  );
                })}
              </nav>
            </header>

            <main className="px-3 py-4 pb-24 md:px-6 md:py-5 md:pb-8">
              {children}
            </main>
          </div>
        </div>

        <nav
          className="fixed inset-x-0 bottom-0 z-40 border-t border-line bg-paper/95 backdrop-blur md:hidden"
          style={{ paddingBottom: "env(safe-area-inset-bottom)" }}
          aria-label="ناوبری"
        >
          <ul className="grid grid-cols-5">
            {NAV.map((item) => {
              const active = Boolean(matchRoute({ to: item.to, fuzzy: item.to !== "/" }));
              return (
                <li key={item.to}>
                  <Link
                    to={item.to}
                    className={cn(
                      "flex h-14 flex-col items-center justify-center gap-0.5 text-xs",
                      active ? "text-accent" : "text-muted",
                    )}
                  >
                    <item.icon className="size-5" />
                    {item.label}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>
      </div>

      <SettingsSheet open={settingsOpen} onOpenChange={setSettingsOpen} />
      <TaskFormDialog
        open={formOpen}
        onOpenChange={(o) => {
          setFormOpen(o);
          if (!o) {
            setEditing(null);
            setPrefill(undefined);
          }
        }}
        editing={editing}
        prefill={prefill}
      />
      <Toaster
        position="top-center"
        dir="rtl"
        toastOptions={{
          className: "font-sans",
          style: {
            background: "var(--color-paper)",
            color: "var(--color-ink)",
            border: "1px solid var(--color-line)",
          },
        }}
      />
    </DialogCtx.Provider>
  );
}
