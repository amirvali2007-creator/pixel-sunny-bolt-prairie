import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import { addDays, parseISODate, toISODate } from "./jalali";
import { createEmptyData, createSampleData } from "./sample-data";
import type {
  Course,
  CourseColor,
  Exam,
  ImportantDate,
  PlannerData,
  StudyBlock,
  Task,
  WeekStart,
} from "./types";
import { COURSE_COLORS, DEFAULT_DAY_END, DEFAULT_DAY_START } from "./types";
import { uid } from "./utils";

interface PlannerStore extends PlannerData {
  hydrated: boolean;
  addTask: (task: Omit<Task, "id">) => string;
  updateTask: (id: string, patch: Partial<Task>) => void;
  deleteTask: (id: string) => void;
  toggleTaskDone: (id: string) => void;
  duplicateTask: (id: string) => string | null;
  addCourse: (course: Omit<Course, "id">) => string;
  updateCourse: (id: string, patch: Partial<Course>) => void;
  deleteCourse: (id: string) => void;
  ensureCourse: (name: string, teacher?: string) => string;
  addBlock: (block: Omit<StudyBlock, "id">) => string;
  updateBlock: (id: string, patch: Partial<StudyBlock>) => void;
  deleteBlock: (id: string) => void;
  copyWeekBlocks: (fromStartIso: string, weeksAhead?: number) => number;
  addExam: (exam: Omit<Exam, "id">) => string;
  updateExam: (id: string, patch: Partial<Exam>) => void;
  deleteExam: (id: string) => void;
  addImportantDate: (item: Omit<ImportantDate, "id">) => string;
  updateImportantDate: (id: string, patch: Partial<ImportantDate>) => void;
  deleteImportantDate: (id: string) => void;
  setStudentName: (name: string) => void;
  setAcademicYear: (year: string) => void;
  setWeekStart: (weekStart: WeekStart) => void;
  setDayHours: (dayStart: string, dayEnd: string) => void;
  importPlanner: (data: Partial<PlannerData>) => void;
  resetSample: () => void;
  resetEmpty: () => void;
  markHydrated: () => void;
}

const sample = createSampleData();

function nextColor(courses: Course[]): CourseColor {
  return COURSE_COLORS[courses.length % COURSE_COLORS.length] ?? "accent";
}

export const usePlannerStore = create<PlannerStore>()(
  persist(
    (set, get) => ({
      ...sample,
      hydrated: false,
      markHydrated: () => set({ hydrated: true }),
      addTask: (task) => {
        const id = uid();
        set({ tasks: [...get().tasks, { ...task, id }] });
        return id;
      },
      updateTask: (id, patch) => {
        set({
          tasks: get().tasks.map((t) => (t.id === id ? { ...t, ...patch } : t)),
        });
      },
      deleteTask: (id) => {
        set({ tasks: get().tasks.filter((t) => t.id !== id) });
      },
      toggleTaskDone: (id) => {
        set({
          tasks: get().tasks.map((t) =>
            t.id === id
              ? { ...t, status: t.status === "done" ? "in_progress" : "done" }
              : t,
          ),
        });
      },
      duplicateTask: (id) => {
        const task = get().tasks.find((t) => t.id === id);
        if (!task) return null;
        const { id: _id, ...rest } = task;
        return get().addTask({
          ...rest,
          title: `${rest.title} (کپی)`,
          status: "not_started",
          grade: null,
        });
      },
      addCourse: (course) => {
        const id = uid();
        set({ courses: [...get().courses, { ...course, id }] });
        return id;
      },
      updateCourse: (id, patch) => {
        set({
          courses: get().courses.map((c) => (c.id === id ? { ...c, ...patch } : c)),
        });
      },
      deleteCourse: (id) => {
        set({ courses: get().courses.filter((c) => c.id !== id) });
      },
      ensureCourse: (name, teacher = "—") => {
        const trimmed = name.trim();
        if (!trimmed) return "";
        const found = get().courses.find((c) => c.name.trim() === trimmed);
        if (found) return found.id;
        return get().addCourse({
          name: trimmed,
          teacher: teacher.trim() || "—",
          color: nextColor(get().courses),
        });
      },
      addBlock: (block) => {
        const id = uid();
        set({ blocks: [...get().blocks, { ...block, id }] });
        return id;
      },
      updateBlock: (id, patch) => {
        set({
          blocks: get().blocks.map((b) => (b.id === id ? { ...b, ...patch } : b)),
        });
      },
      deleteBlock: (id) => {
        set({ blocks: get().blocks.filter((b) => b.id !== id) });
      },
      copyWeekBlocks: (fromStartIso, weeksAhead = 1) => {
        const from = parseISODate(fromStartIso);
        const fromDates = Array.from({ length: 7 }, (_, i) => toISODate(addDays(from, i)));
        const copies = get()
          .blocks.filter((b) => fromDates.includes(b.date))
          .map((b) => {
            const idx = fromDates.indexOf(b.date);
            return {
              ...b,
              id: uid(),
              date: toISODate(addDays(from, idx + weeksAhead * 7)),
            };
          });
        if (copies.length === 0) return 0;
        set({ blocks: [...get().blocks, ...copies] });
        return copies.length;
      },
      addExam: (exam) => {
        const id = uid();
        set({ exams: [...get().exams, { ...exam, id }] });
        return id;
      },
      updateExam: (id, patch) => {
        set({
          exams: get().exams.map((e) => (e.id === id ? { ...e, ...patch } : e)),
        });
      },
      deleteExam: (id) => {
        set({ exams: get().exams.filter((e) => e.id !== id) });
      },
      addImportantDate: (item) => {
        const id = uid();
        set({ importantDates: [...get().importantDates, { ...item, id }] });
        return id;
      },
      updateImportantDate: (id, patch) => {
        set({
          importantDates: get().importantDates.map((d) =>
            d.id === id ? { ...d, ...patch } : d,
          ),
        });
      },
      deleteImportantDate: (id) => {
        set({ importantDates: get().importantDates.filter((d) => d.id !== id) });
      },
      setStudentName: (studentName) => set({ studentName }),
      setAcademicYear: (academicYear) => set({ academicYear }),
      setWeekStart: (weekStart) => set({ weekStart }),
      setDayHours: (dayStart, dayEnd) => set({ dayStart, dayEnd }),
      importPlanner: (data) => {
        set({
          studentName: data.studentName ?? get().studentName,
          academicYear: data.academicYear ?? get().academicYear,
          weekStart: data.weekStart ?? get().weekStart,
          dayStart: data.dayStart ?? get().dayStart ?? DEFAULT_DAY_START,
          dayEnd: data.dayEnd ?? get().dayEnd ?? DEFAULT_DAY_END,
          courses: data.courses ?? get().courses,
          tasks: data.tasks ?? get().tasks,
          blocks: data.blocks ?? get().blocks,
          exams: data.exams ?? get().exams,
          importantDates: data.importantDates ?? get().importantDates,
        });
      },
      resetSample: () => set({ ...createSampleData(), hydrated: true }),
      resetEmpty: () => set({ ...createEmptyData(), hydrated: true }),
    }),
    {
      name: "avm-planner-v1",
      storage: createJSONStorage(() => localStorage),
      skipHydration: true,
      partialize: (s) => ({
        studentName: s.studentName,
        academicYear: s.academicYear,
        weekStart: s.weekStart,
        dayStart: s.dayStart,
        dayEnd: s.dayEnd,
        courses: s.courses,
        tasks: s.tasks,
        blocks: s.blocks,
        exams: s.exams,
        importantDates: s.importantDates,
      }),
      merge: (persisted, current) => {
        const p = (persisted ?? {}) as Partial<PlannerData>;
        return {
          ...current,
          ...p,
          dayStart: p.dayStart || DEFAULT_DAY_START,
          dayEnd: p.dayEnd || DEFAULT_DAY_END,
        };
      },
    },
  ),
);

export function migrateLegacyStorage() {
  if (typeof localStorage === "undefined") return;
  const next = localStorage.getItem("avm-planner-v1");
  if (next) return;
  const prev = localStorage.getItem("planer-tahsili-v1");
  if (prev) localStorage.setItem("avm-planner-v1", prev);
}
