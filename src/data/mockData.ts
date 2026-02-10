import { User, Exercise, Routine, Workout, Progress } from '@/types';

// Usuario administrador y entrenador (dueño del negocio)
export const adminUser: User = {
  id: '1',
  email: 'admin@coachsport.dev',
  name: 'Leo Segovia',
  role: 'admin',
  isTrainer: true,
  phone: '+34 600 123 456',
  avatar: 'https://i.pravatar.cc/150?img=12',
  createdAt: new Date('2024-01-01'),
};

// Entrenador (empleado)
export const trainerUser: User = {
  id: '2',
  email: 'trainer@coachsport.dev',
  name: 'Ana García',
  role: 'trainer',
  isTrainer: true,
  phone: '+34 600 234 567',
  avatar: 'https://i.pravatar.cc/150?img=47',
  bio: 'Especialista en calistenia avanzada y movilidad',
  certifications: ['Certificación Internacional de Calistenia', 'Entrenador Personal Nivel 3'],
  createdAt: new Date('2024-01-15'),
};

// Cliente 1
export const client1: User = {
  id: '3',
  email: 'cliente1@coachsport.dev',
  name: 'María López',
  role: 'client',
  phone: '+34 600 345 678',
  avatar: 'https://i.pravatar.cc/150?img=32',
  age: 28,
  weight: 65,
  height: 165,
  level: 'intermediate',
  objectives: ['ganar fuerza', 'mejorar movilidad'],
  preferences: {
    availableDays: ['lunes', 'miércoles', 'viernes'],
    availableEquipment: ['barra', 'anillas', 'paralelas'],
  },
  trainerId: '1',
  subscription: {
    planId: 'pro',
    startDate: new Date('2024-11-01'),
    endDate: new Date('2024-12-01'),
    isActive: true,
    autoRenew: true,
  },
  createdAt: new Date('2024-02-01'),
};

// Cliente 2
export const client2: User = {
  id: '4',
  email: 'cliente2@coachsport.dev',
  name: 'Juan Pérez',
  role: 'client',
  phone: '+34 600 456 789',
  avatar: 'https://i.pravatar.cc/150?img=15',
  age: 35,
  weight: 80,
  height: 178,
  level: 'beginner',
  objectives: ['perder grasa', 'ganar fuerza'],
  preferences: {
    availableDays: ['martes', 'jueves', 'sábado'],
    availableEquipment: ['barra', 'suelo'],
  },
  trainerId: '2',
  subscription: {
    planId: 'full',
    startDate: new Date('2024-10-15'),
    endDate: new Date('2024-11-15'),
    isActive: true,
    autoRenew: true,
  },
  createdAt: new Date('2024-02-10'),
};

// Cliente 3
export const client3: User = {
  id: '5',
  email: 'cliente3@coachsport.dev',
  name: 'Sofia Martínez',
  role: 'client',
  phone: '+34 600 567 890',
  avatar: 'https://i.pravatar.cc/150?img=45',
  age: 24,
  weight: 58,
  height: 160,
  level: 'advanced',
  objectives: ['mejorar movilidad', 'mantener forma'],
  preferences: {
    availableDays: ['lunes', 'martes', 'miércoles', 'jueves', 'viernes'],
    availableEquipment: ['barra', 'anillas', 'paralelas', 'suelo'],
  },
  trainerId: '1',
  subscription: {
    planId: 'basic',
    startDate: new Date('2024-11-10'),
    endDate: new Date('2024-12-10'),
    isActive: true,
    autoRenew: false,
  },
  createdAt: new Date('2024-01-20'),
};

export const allUsers = [adminUser, trainerUser, client1, client2, client3];

// Biblioteca de ejercicios
export const exercises: Exercise[] = [
  {
    id: '1',
    name: 'Flexiones',
    description: 'Ejercicio fundamental para el tren superior. Mantén el cuerpo recto y baja hasta casi tocar el suelo.',
    muscleGroups: ['pectorales', 'tríceps', 'deltoides'],
    level: 'beginner',
    equipment: ['suelo'],
    type: 'fuerza',
    videoUrl: 'https://coachsport.dev/videos/flexiones.mp4',
    imageUrl: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400',
    commonMistakes: [
      'Arquear la espalda',
      'No bajar lo suficiente',
      'Separar demasiado los codos',
    ],
    variations: [
      { id: '1-1', name: 'Flexiones inclinadas', difficulty: 'easier' },
      { id: '1-2', name: 'Flexiones declinadas', difficulty: 'harder' },
      { id: '1-3', name: 'Flexiones con palmada', difficulty: 'harder' },
    ],
  },
  {
    id: '2',
    name: 'Dominadas',
    description: 'Ejercicio rey para la espalda. Agarra la barra con las palmas hacia adelante y tira hasta que la barbilla pase la barra.',
    muscleGroups: ['dorsales', 'bíceps', 'deltoides'],
    level: 'intermediate',
    equipment: ['barra'],
    type: 'fuerza',
    videoUrl: 'https://coachsport.dev/videos/dominadas.mp4',
    imageUrl: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=400',
    commonMistakes: [
      'Balancearse demasiado',
      'No subir completamente',
      'Abrir demasiado los codos',
    ],
    variations: [
      { id: '2-1', name: 'Dominadas asistidas', difficulty: 'easier' },
      { id: '2-2', name: 'Dominadas con peso', difficulty: 'harder' },
      { id: '2-3', name: 'Muscle-up', difficulty: 'harder' },
    ],
  },
  {
    id: '3',
    name: 'Plancha',
    description: 'Mantén el cuerpo recto y rígido como una tabla. Fortalece el core completo.',
    muscleGroups: ['core', 'abdominales', 'deltoides'],
    level: 'beginner',
    equipment: ['suelo'],
    type: 'fuerza',
    videoUrl: 'https://coachsport.dev/videos/plancha.mp4',
    imageUrl: 'https://images.unsplash.com/photo-1518611012118-696072aa579a?w=400',
    commonMistakes: [
      'Arquear la espalda',
      'Bajar las caderas',
      'Mirar hacia arriba',
    ],
    variations: [
      { id: '3-1', name: 'Plancha con rodillas', difficulty: 'easier' },
      { id: '3-2', name: 'Plancha lateral', difficulty: 'harder' },
      { id: '3-3', name: 'Plancha con elevación de pierna', difficulty: 'harder' },
    ],
  },
  {
    id: '4',
    name: 'Fondos en paralelas',
    description: 'Ejercicio excelente para tríceps y deltoides. Baja controladamente hasta que los codos formen 90 grados.',
    muscleGroups: ['tríceps', 'deltoides', 'pectorales'],
    level: 'intermediate',
    equipment: ['paralelas'],
    type: 'fuerza',
    videoUrl: 'https://coachsport.dev/videos/fondos.mp4',
    imageUrl: 'https://images.unsplash.com/photo-1517836357463-d25dfeac3438?w=400',
    commonMistakes: [
      'Balancearse',
      'No bajar lo suficiente',
      'Separar demasiado los codos',
    ],
    variations: [
      { id: '4-1', name: 'Fondos asistidos', difficulty: 'easier' },
      { id: '4-2', name: 'Fondos con peso', difficulty: 'harder' },
    ],
  },
  {
    id: '5',
    name: 'Sentadillas',
    description: 'Ejercicio fundamental para piernas. Baja hasta que los muslos queden paralelos al suelo.',
    muscleGroups: ['cuádriceps', 'glúteos', 'isquiotibiales'],
    level: 'beginner',
    equipment: ['suelo'],
    type: 'fuerza',
    videoUrl: 'https://coachsport.dev/videos/sentadillas.mp4',
    imageUrl: 'https://images.unsplash.com/photo-1549060279-7e168fcee0c2?w=400',
    commonMistakes: [
      'Rodillas hacia adentro',
      'No bajar lo suficiente',
      'Inclinar el torso demasiado',
    ],
    variations: [
      { id: '5-1', name: 'Sentadillas asistidas', difficulty: 'easier' },
      { id: '5-2', name: 'Sentadillas con salto', difficulty: 'harder' },
      { id: '5-3', name: 'Sentadillas pistol', difficulty: 'harder' },
    ],
  },
  {
    id: '6',
    name: 'Muscle-up',
    description: 'Movimiento avanzado que combina dominada y fondo. Requiere mucha fuerza y técnica.',
    muscleGroups: ['dorsales', 'tríceps', 'deltoides', 'core'],
    level: 'advanced',
    equipment: ['barra', 'anillas'],
    type: 'fuerza',
    videoUrl: 'https://coachsport.dev/videos/muscle-up.mp4',
    imageUrl: 'https://images.unsplash.com/photo-1518611012118-696072aa579a?w=400',
    commonMistakes: [
      'Falta de impulso',
      'No completar la transición',
      'Balancearse',
    ],
    variations: [
      { id: '6-1', name: 'Muscle-up asistido', difficulty: 'easier' },
      { id: '6-2', name: 'Muscle-up con peso', difficulty: 'harder' },
    ],
  },
  {
    id: '7',
    name: 'Front Lever',
    description: 'Isometría avanzada. Mantén el cuerpo horizontal con los brazos extendidos.',
    muscleGroups: ['dorsales', 'core', 'deltoides'],
    level: 'advanced',
    equipment: ['barra'],
    type: 'fuerza',
    videoUrl: 'https://coachsport.dev/videos/front-lever.mp4',
    imageUrl: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400',
    commonMistakes: [
      'Arquear la espalda',
      'Flexionar los brazos',
      'Bajar las piernas',
    ],
    variations: [
      { id: '7-1', name: 'Front lever tuck', difficulty: 'easier' },
      { id: '7-2', name: 'Front lever avanzado', difficulty: 'harder' },
    ],
  },
  {
    id: '8',
    name: 'Handstand',
    description: 'Parada de manos. Desarrolla fuerza en hombros y equilibrio.',
    muscleGroups: ['deltoides', 'tríceps', 'core'],
    level: 'intermediate',
    equipment: ['suelo', 'pared'],
    type: 'fuerza',
    videoUrl: 'https://coachsport.dev/videos/handstand.mp4',
    imageUrl: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=400',
    commonMistakes: [
      'Arquear demasiado la espalda',
      'No alinear el cuerpo',
      'Miedo a caer',
    ],
    variations: [
      { id: '8-1', name: 'Handstand contra la pared', difficulty: 'easier' },
      { id: '8-2', name: 'Handstand push-up', difficulty: 'harder' },
    ],
  },
];

// Rutinas
export const routines: Routine[] = [
  {
    id: '1',
    name: 'Rutina Semanal - Principiante',
    description: 'Rutina diseñada para iniciarse en la calistenia',
    clientId: '4',
    trainerId: '2',
    days: [
      {
        day: 'lunes',
        exercises: [
          { exerciseId: '1', sets: 3, reps: 10, rest: 60 },
          { exerciseId: '3', sets: 3, duration: 30, rest: 60 },
          { exerciseId: '5', sets: 3, reps: 12, rest: 60 },
        ],
      },
      {
        day: 'miércoles',
        exercises: [
          { exerciseId: '1', sets: 3, reps: 12, rest: 60 },
          { exerciseId: '3', sets: 3, duration: 40, rest: 60 },
          { exerciseId: '5', sets: 3, reps: 15, rest: 60 },
        ],
      },
      {
        day: 'viernes',
        exercises: [
          { exerciseId: '1', sets: 3, reps: 15, rest: 60 },
          { exerciseId: '3', sets: 3, duration: 45, rest: 60 },
          { exerciseId: '5', sets: 3, reps: 18, rest: 60 },
        ],
      },
    ],
    createdAt: new Date('2024-02-15'),
    isActive: true,
  },
  {
    id: '2',
    name: 'Rutina Avanzada - Fuerza',
    description: 'Rutina intensa para atletas avanzados',
    clientId: '5',
    trainerId: '1',
    days: [
      {
        day: 'lunes',
        exercises: [
          { exerciseId: '2', sets: 4, reps: 8, rest: 90 },
          { exerciseId: '4', sets: 4, reps: 10, rest: 90 },
          { exerciseId: '6', sets: 3, reps: 3, rest: 120 },
        ],
      },
      {
        day: 'miércoles',
        exercises: [
          { exerciseId: '7', sets: 4, duration: 20, rest: 120 },
          { exerciseId: '8', sets: 3, duration: 30, rest: 90 },
          { exerciseId: '2', sets: 4, reps: 10, rest: 90 },
        ],
      },
      {
        day: 'viernes',
        exercises: [
          { exerciseId: '6', sets: 4, reps: 5, rest: 120 },
          { exerciseId: '4', sets: 4, reps: 12, rest: 90 },
          { exerciseId: '7', sets: 4, duration: 25, rest: 120 },
        ],
      },
    ],
    createdAt: new Date('2024-01-25'),
    isActive: true,
  },
  {
    id: '3',
    name: 'Rutina Intermedia - María',
    description: 'Rutina personalizada para nivel intermedio',
    clientId: '3',
    trainerId: '1',
    days: [
      {
        day: 'lunes',
        exercises: [
          { exerciseId: '2', sets: 3, reps: 6, rest: 90 },
          { exerciseId: '1', sets: 3, reps: 15, rest: 60 },
          { exerciseId: '4', sets: 3, reps: 8, rest: 90 },
        ],
      },
      {
        day: 'miércoles',
        exercises: [
          { exerciseId: '8', sets: 3, duration: 20, rest: 90 },
          { exerciseId: '3', sets: 3, duration: 60, rest: 60 },
          { exerciseId: '2', sets: 3, reps: 8, rest: 90 },
        ],
      },
      {
        day: 'viernes',
        exercises: [
          { exerciseId: '4', sets: 3, reps: 10, rest: 90 },
          { exerciseId: '1', sets: 3, reps: 18, rest: 60 },
          { exerciseId: '5', sets: 3, reps: 20, rest: 60 },
        ],
      },
    ],
    createdAt: new Date('2024-02-05'),
    isActive: true,
  },
];

// Historial de entrenamientos
export const workouts: Workout[] = [
  {
    id: '1',
    routineId: '1',
    clientId: '4',
    date: new Date('2024-02-19'),
    exercises: [
      { exerciseId: '1', sets: 3, reps: [10, 10, 9], completed: true },
      { exerciseId: '3', sets: 3, durations: [30, 28, 25], completed: true },
      { exerciseId: '5', sets: 3, reps: [12, 12, 11], completed: true },
    ],
    notes: 'Buen progreso en sentadillas',
    completed: true,
  },
  {
    id: '2',
    routineId: '2',
    clientId: '5',
    date: new Date('2024-02-18'),
    exercises: [
      { exerciseId: '2', sets: 4, reps: [8, 8, 7, 6], completed: true },
      { exerciseId: '4', sets: 4, reps: [10, 9, 9, 8], completed: true },
      { exerciseId: '6', sets: 3, reps: [3, 2, 2], completed: true },
    ],
    notes: 'Muscle-up mejorando',
    completed: true,
  },
  {
    id: '3',
    routineId: '3',
    clientId: '3',
    date: new Date('2024-02-17'),
    exercises: [
      { exerciseId: '2', sets: 3, reps: [6, 6, 5], completed: true },
      { exerciseId: '1', sets: 3, reps: [15, 14, 13], completed: true },
      { exerciseId: '4', sets: 3, reps: [8, 8, 7], completed: true },
    ],
    notes: '',
    completed: true,
  },
];

// Progreso de clientes
export const progressData: Progress[] = [
  {
    id: '1',
    clientId: '4',
    exerciseId: '1',
    date: new Date('2024-02-01'),
    reps: 8,
    sets: 3,
  },
  {
    id: '2',
    clientId: '4',
    exerciseId: '1',
    date: new Date('2024-02-08'),
    reps: 9,
    sets: 3,
  },
  {
    id: '3',
    clientId: '4',
    exerciseId: '1',
    date: new Date('2024-02-15'),
    reps: 10,
    sets: 3,
  },
  {
    id: '4',
    clientId: '5',
    exerciseId: '2',
    date: new Date('2024-01-20'),
    reps: 5,
    sets: 4,
  },
  {
    id: '5',
    clientId: '5',
    exerciseId: '2',
    date: new Date('2024-02-01'),
    reps: 6,
    sets: 4,
  },
  {
    id: '6',
    clientId: '5',
    exerciseId: '2',
    date: new Date('2024-02-15'),
    reps: 8,
    sets: 4,
  },
];
