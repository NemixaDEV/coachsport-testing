export type UserRole = 'admin' | 'trainer' | 'client';
export type Level = 'beginner' | 'intermediate' | 'advanced';
export type ExerciseType = 'fuerza' | 'cardio' | 'flexibilidad' | 'movilidad';
export type DayOfWeek = 'lunes' | 'martes' | 'miércoles' | 'jueves' | 'viernes' | 'sábado' | 'domingo';

export interface User {
  id: string;
  email: string;
  name: string;
  role: UserRole;
  isTrainer?: boolean;
  phone?: string;
  avatar?: string;
  bio?: string;
  certifications?: string[];
  age?: number;
  weight?: number;
  height?: number;
  level?: Level;
  objectives?: string[];
  preferences?: {
    availableDays?: DayOfWeek[];
    availableEquipment?: string[];
  };
  trainerId?: string;
  createdAt: Date;
}

export interface Exercise {
  id: string;
  name: string;
  description: string;
  muscleGroups: string[];
  level: Level;
  equipment: string[];
  type: ExerciseType;
  videoUrl?: string;
  imageUrl?: string;
  commonMistakes?: string[];
  variations?: {
    id: string;
    name: string;
    difficulty: 'easier' | 'harder';
  }[];
}

export interface RoutineExercise {
  exerciseId: string;
  sets: number;
  reps?: number;
  duration?: number; // en segundos
  rest: number; // en segundos
}

export interface RoutineDay {
  day: DayOfWeek;
  exercises: RoutineExercise[];
}

export interface Routine {
  id: string;
  name: string;
  description: string;
  clientId: string;
  trainerId: string;
  days: RoutineDay[];
  createdAt: Date;
  isActive: boolean;
}

export interface WorkoutExercise {
  exerciseId: string;
  sets: number;
  reps?: number[];
  durations?: number[];
  completed: boolean;
}

export interface Workout {
  id: string;
  routineId: string;
  clientId: string;
  date: Date;
  exercises: WorkoutExercise[];
  notes?: string;
  completed: boolean;
}

export interface Progress {
  id: string;
  clientId: string;
  exerciseId: string;
  date: Date;
  reps?: number;
  sets?: number;
  duration?: number;
  weight?: number;
}

export interface Message {
  id: string;
  fromId: string;
  toId: string;
  content: string;
  timestamp: Date;
  read: boolean;
}
