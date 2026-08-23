import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import { createSampleData } from "./sample-data";
import type {
  Course,
  Exam,
  ImportantDate,
  PlannerData,
  StudyBlock,
  Task,
  WeekStart,
} from "./types";
import { uid } from "./utils";

interface PlannerStore extends PlannerData {
  addTask: (task: Omit<Task, "id">) => string;
  updateTask: (id: string, patch: Partial<Task>) => void;
  deleteTask: (id: string) => void;
  toggleTaskDone: (id: string) => void;
  addCourse: (course: Omit<Course, "id">) => string;
  updateCourse: (id: string, patch: Partial<Course>) => void;
  deleteCourse: (id: string) => void;
  addBlock: (block: Omit<StudyBlock, "id">) => string;
  updateBlock: (id: string, patch: Partial<StudyBlock>) => void;
  deleteBlock: (id: string) => void;
  addExam: (exam: Omit<Exam, "id">) => string;
  updateExam: (id: string, patch: Partial<Exam>) => void;
  deleteExam: (id: string) => void;
  addImportantDate: (item: Omit<ImportantDate, "id">) => string;
  deleteImportantDate: (id: string) => void;
  setStudentName: (name: string) => void;
  setAcademicYear: (year: string) => void;
  setWeekStart: (weekStart: WeekStart) => void;
  resetSample: () => void;
}

const sample = createSampleData();

export const usePlannerStore = create<PlannerStore>()(
  persist(
    (set, get) => ({
      ...sample,
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
      deleteImportantDate: (id) => {
        set({ importantDates: get().importantDates.filter((d) => d.id !== id) });
      },
      setStudentName: (studentName) => set({ studentName }),
      setAcademicYear: (academicYear) => set({ academicYear }),
      setWeekStart: (weekStart) => set({ weekStart }),
      resetSample: () => set(createSampleData()),
    }),
    {
      name: "planer-tahsili-v1",
      storage: createJSONStorage(() => localStorage),
      skipHydration: true,
      partialize: (s) => ({
        studentName: s.studentName,
        academicYear: s.academicYear,
        weekStart: s.weekStart,
        courses: s.courses,
        tasks: s.tasks,
        blocks: s.blocks,
        exams: s.exams,
        importantDates: s.importantDates,
      }),
    },
  ),
);
