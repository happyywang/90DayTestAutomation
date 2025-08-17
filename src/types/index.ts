export interface CourseDay {
  id: number;
  title: string;
  phase: number;
  phaseTitle: string;
  description: string;
  content: string;
  objectives: string[];
  exercises?: string[];
  resources?: string[];
  readingTime: number;
}

export interface CoursePhase {
  id: number;
  title: string;
  description: string;
  days: number[];
  duration: string;
}

export interface CourseProgress {
  completedDays: number[];
  currentDay: number;
}

export interface NavigationItem {
  id: number;
  title: string;
  href: string;
  isCompleted: boolean;
  isCurrent: boolean;
}