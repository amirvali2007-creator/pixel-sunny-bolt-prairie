export type TaskType =
  | "assignment"
  | "quiz"
  | "exam"
  | "project"
  | "presentation"
  | "study"
  | "lab"
  | "research"
  | "report";

export type Priority = "low" | "medium" | "high";

export type TaskStatus = "not_started" | "in_progress" | "done" | "postponed";

export type CourseColor =
  | "accent"
  | "blush"
  | "lilac"
  | "mint"
  | "sky"
  | "sand"
  | "peach"
  | "ink";

export type WeekStart = "sat" | "mon";

export type DateKind = "exam" | "deadline" | "event" | "holiday";

export interface Course {
  id: string;
  name: string;
  teacher: string;
  color: CourseColor;
}

export interface Task {
  id: string;
  title: string;
  courseId: string;
  type: TaskType;
  description: string;
  priority: Priority;
  status: TaskStatus;
  dueDate: string;
  dueTime: string;
  grade: number | null;
  importance: number;
  notes: string;
}

export interface StudyBlock {
  id: string;
  date: string;
  start: string;
  end: string;
  title: string;
  courseId: string | null;
  notes: string;
}

export interface Exam {
  id: string;
  title: string;
  courseId: string;
  date: string;
  time: string;
  location: string;
  notes: string;
  importance: number;
}

export interface ImportantDate {
  id: string;
  date: string;
  title: string;
  kind: DateKind;
}

export interface PlannerData {
  studentName: string;
  academicYear: string;
  weekStart: WeekStart;
  dayStart: string;
  dayEnd: string;
  courses: Course[];
  tasks: Task[];
  blocks: StudyBlock[];
  exams: Exam[];
  importantDates: ImportantDate[];
}

export const TASK_TYPE_LABELS: Record<TaskType, string> = {
  assignment: "تکلیف",
  quiz: "کوئیز",
  exam: "امتحان",
  project: "پروژه",
  presentation: "ارائه",
  study: "مطالعه",
  lab: "آزمایش",
  research: "تحقیق",
  report: "گزارش",
};

export const PRIORITY_LABELS: Record<Priority, string> = {
  low: "کم",
  medium: "متوسط",
  high: "زیاد",
};

export const STATUS_LABELS: Record<TaskStatus, string> = {
  not_started: "شروع نشده",
  in_progress: "در حال انجام",
  done: "تکمیل شده",
  postponed: "تعویق شده",
};

export const DATE_KIND_LABELS: Record<DateKind, string> = {
  exam: "امتحان",
  deadline: "مهلت",
  event: "رویداد",
  holiday: "تعطیل",
};

export const COURSE_COLOR_LABELS: Record<CourseColor, string> = {
  accent: "سبزآبی",
  blush: "صورتی",
  lilac: "یاسی",
  mint: "نعنایی",
  sky: "آسمانی",
  sand: "نخودی",
  peach: "هلویی",
  ink: "مرکب",
};

export const COURSE_CHIP: Record<CourseColor, string> = {
  accent: "bg-accent-soft text-accent",
  blush: "bg-blush text-ink",
  lilac: "bg-lilac text-ink",
  mint: "bg-mint text-ink",
  sky: "bg-sky text-ink",
  sand: "bg-sand text-ink",
  peach: "bg-peach text-ink",
  ink: "bg-ink text-paper",
};

export const COURSE_DOT: Record<CourseColor, string> = {
  accent: "bg-accent",
  blush: "bg-high",
  lilac: "bg-lilac",
  mint: "bg-low",
  sky: "bg-doing",
  sand: "bg-mid",
  peach: "bg-peach",
  ink: "bg-ink",
};

export const TASK_TYPES = Object.keys(TASK_TYPE_LABELS) as TaskType[];
export const PRIORITIES = Object.keys(PRIORITY_LABELS) as Priority[];
export const STATUSES = Object.keys(STATUS_LABELS) as TaskStatus[];
export const COURSE_COLORS = Object.keys(COURSE_COLOR_LABELS) as CourseColor[];

export const HOUR_PRESETS = [
  { label: "۱۰ تا ۲۲", start: "10:00", end: "22:00" },
  { label: "۸ تا ۱۶", start: "08:00", end: "16:00" },
  { label: "۸ تا ۲۰", start: "08:00", end: "20:00" },
  { label: "۷ تا ۲۳", start: "07:00", end: "23:00" },
  { label: "۹ تا ۲۱", start: "09:00", end: "21:00" },
] as const;

export const DEFAULT_DAY_START = "10:00";
export const DEFAULT_DAY_END = "22:00";
