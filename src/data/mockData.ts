import { User, Exercise, Routine, Workout, Progress, Message } from '@/types';

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

// Cliente 1 - Sin suscripción activa (expirada)
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
    planId: 'basic',
    startDate: new Date('2024-10-01'),
    endDate: new Date('2025-11-01'), // Suscripción expirada
    isActive: false, // No activa
    autoRenew: false,
  },
  createdAt: new Date('2024-02-01'),
};

// Cliente 2 - Con suscripción activa NO recurrente
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
    planId: 'pro',
    startDate: new Date('2025-01-01'), // Suscripción iniciada en enero 2025
    endDate: new Date('2026-12-31'), // Suscripción activa hasta diciembre 2026
    isActive: true,
    autoRenew: false, // NO recurrente
  },
  createdAt: new Date('2024-02-10'),
};

// Cliente 3 - Con suscripción activa recurrente
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
    planId: 'full',
    startDate: new Date('2025-01-01'), // Suscripción iniciada en enero 2025
    endDate: new Date('2026-12-31'), // Suscripción activa hasta diciembre 2026
    isActive: true,
    autoRenew: true, // Recurrente
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

// Mensajes entre entrenadores y clientes
export const messages: Message[] = [
  // Conversación entre Leo (admin/entrenador) y María (cliente1)
  {
    id: '1',
    fromId: '3', // María
    toId: '1', // Leo
    content: '¡Hola Leo! Tengo una duda sobre las dominadas. ¿Cuándo crees que podré hacer una completa sin ayuda?',
    timestamp: new Date('2024-02-10T10:30:00'),
    read: true,
  },
  {
    id: '2',
    fromId: '1', // Leo
    toId: '3', // María
    content: 'Hola María! Estás progresando muy bien. Con tu ritmo actual, calculo que en unas 3-4 semanas podrás hacer tu primera dominada completa. Sigue enfocándote en las dominadas asistidas y los ejercicios de fortalecimiento de espalda.',
    timestamp: new Date('2024-02-10T11:15:00'),
    read: true,
  },
  {
    id: '3',
    fromId: '3', // María
    toId: '1', // Leo
    content: 'Genial, eso me motiva mucho! ¿Debería aumentar las repeticiones o agregar más series?',
    timestamp: new Date('2024-02-10T11:45:00'),
    read: true,
  },
  {
    id: '4',
    fromId: '1', // Leo
    toId: '3', // María
    content: 'Por ahora mantén las series actuales pero enfócate en la calidad del movimiento. Cuando puedas hacer 3 series de 8 reps limpias, subiremos la intensidad 💪',
    timestamp: new Date('2024-02-10T14:20:00'),
    read: true,
  },
  {
    id: '5',
    fromId: '3', // María
    toId: '1', // Leo
    content: 'Perfecto, ¡muchas gracias por el consejo!',
    timestamp: new Date('2024-02-10T14:35:00'),
    read: true,
  },
  {
    id: '6',
    fromId: '3', // María
    toId: '1', // Leo
    content: 'Hey Leo, he notado que me duele un poco el hombro derecho después de hacer flexiones. ¿Es normal?',
    timestamp: new Date('2024-02-15T09:00:00'),
    read: true,
  },
  {
    id: '7',
    fromId: '1', // Leo
    toId: '3', // María
    content: 'María, el dolor no es normal. Puede ser un tema de técnica. ¿Puedes grabar un vídeo de tus flexiones en la próxima sesión? Así puedo ver tu forma y corregir si es necesario.',
    timestamp: new Date('2024-02-15T09:30:00'),
    read: true,
  },
  {
    id: '8',
    fromId: '3', // María
    toId: '1', // Leo
    content: 'Claro, lo haré mañana en mi entrenamiento. Por mientras, ¿debería evitar las flexiones?',
    timestamp: new Date('2024-02-15T10:00:00'),
    read: true,
  },
  {
    id: '9',
    fromId: '1', // Leo
    toId: '3', // María
    content: 'Sí, mejor descansa ese ejercicio hasta que veamos el vídeo. Puedes hacer plancha y trabajo de core mientras tanto. Y si el dolor persiste, consulta con un fisio.',
    timestamp: new Date('2024-02-15T10:15:00'),
    read: true,
  },
  {
    id: '10',
    fromId: '3', // María
    toId: '1', // Leo
    content: 'Vale, te envío el vídeo mañana. ¡Gracias!',
    timestamp: new Date('2024-02-15T10:20:00'),
    read: true,
  },
  {
    id: '11',
    fromId: '3', // María
    toId: '1', // Leo
    content: 'Leo, ya me siento mejor del hombro. Seguí tus recomendaciones y ha mejorado mucho. ¿Puedo volver a las flexiones?',
    timestamp: new Date('2024-02-19T16:00:00'),
    read: false,
  },

  // Conversación entre Ana (entrenador) y Juan (cliente2)
  {
    id: '12',
    fromId: '4', // Juan
    toId: '2', // Ana
    content: 'Hola Ana! Estoy muy contento con la rutina. Ya veo cambios después de solo 3 semanas 😊',
    timestamp: new Date('2024-02-12T18:30:00'),
    read: true,
  },
  {
    id: '13',
    fromId: '2', // Ana
    toId: '4', // Juan
    content: '¡Qué bueno Juan! Me alegra mucho escuchar eso. El esfuerzo que estás poniendo se nota. ¿Cómo te sientes con las sentadillas?',
    timestamp: new Date('2024-02-12T19:00:00'),
    read: true,
  },
  {
    id: '14',
    fromId: '4', // Juan
    toId: '2', // Ana
    content: 'Las sentadillas van bien, aunque a veces siento que pierdo el equilibrio al bajar. ¿Algún consejo?',
    timestamp: new Date('2024-02-12T19:30:00'),
    read: true,
  },
  {
    id: '15',
    fromId: '2', // Ana
    toId: '4', // Juan
    content: 'Es común al principio. Prueba esto: mantén la mirada al frente (no hacia abajo), y concéntrate en empujar con los talones al subir. También asegúrate de que tus rodillas vayan en la misma dirección que tus pies.',
    timestamp: new Date('2024-02-12T20:00:00'),
    read: true,
  },
  {
    id: '16',
    fromId: '4', // Juan
    toId: '2', // Ana
    content: 'Lo probaré en el próximo entrenamiento. Otra pregunta: ¿puedo hacer cardio los días que no entreno?',
    timestamp: new Date('2024-02-12T20:15:00'),
    read: true,
  },
  {
    id: '17',
    fromId: '2', // Ana
    toId: '4', // Juan
    content: 'Sí, claro! De hecho es muy recomendable. Puedes hacer 20-30 minutos de cardio ligero (caminar, bici) los días de descanso. Te ayudará con la recuperación y tu objetivo de perder grasa.',
    timestamp: new Date('2024-02-12T20:30:00'),
    read: true,
  },
  {
    id: '18',
    fromId: '4', // Juan
    toId: '2', // Ana
    content: '¡Perfecto! Empezaré a caminar en las mañanas entonces.',
    timestamp: new Date('2024-02-12T20:45:00'),
    read: true,
  },
  {
    id: '19',
    fromId: '4', // Juan
    toId: '2', // Ana
    content: 'Ana, una consulta: ¿cuándo crees que podré intentar hacer dominadas? Ahora mismo no puedo hacer ni una.',
    timestamp: new Date('2024-02-16T10:00:00'),
    read: true,
  },
  {
    id: '20',
    fromId: '2', // Ana
    toId: '4', // Juan
    content: 'Juan, las dominadas requieren bastante fuerza. Primero necesitamos fortalecer tu espalda y brazos con otros ejercicios. En unas 6-8 semanas podemos empezar con dominadas asistidas.',
    timestamp: new Date('2024-02-16T11:00:00'),
    read: true,
  },
  {
    id: '21',
    fromId: '4', // Juan
    toId: '2', // Ana
    content: 'Entendido, seré paciente. ¿Hay algún ejercicio específico que me ayude a prepararme?',
    timestamp: new Date('2024-02-16T11:30:00'),
    read: true,
  },
  {
    id: '22',
    fromId: '2', // Ana
    toId: '4', // Juan
    content: 'Sí! Vamos a agregar remo australiano y dead hangs (colgarse de la barra) a tu rutina. Esos te prepararán perfectamente para las dominadas.',
    timestamp: new Date('2024-02-16T12:00:00'),
    read: true,
  },
  {
    id: '23',
    fromId: '4', // Juan
    toId: '2', // Ana
    content: '¡Genial! Muchas gracias Ana, eres una excelente entrenadora 😊',
    timestamp: new Date('2024-02-16T12:15:00'),
    read: true,
  },
  {
    id: '24',
    fromId: '4', // Juan
    toId: '2', // Ana
    content: 'Hola Ana! Ya completé el entrenamiento de hoy. Las sentadillas mejoraron mucho siguiendo tus consejos sobre el equilibrio.',
    timestamp: new Date('2024-02-19T19:00:00'),
    read: false,
  },

  // Conversación entre Leo (admin/entrenador) y Sofía (cliente3)
  {
    id: '25',
    fromId: '5', // Sofía
    toId: '1', // Leo
    content: 'Leo, ¿podemos aumentar la dificultad de la rutina? Siento que ya no me cuesta tanto.',
    timestamp: new Date('2024-02-08T14:00:00'),
    read: true,
  },
  {
    id: '26',
    fromId: '1', // Leo
    toId: '5', // Sofía
    content: 'Claro Sofía! Estás lista para el siguiente nivel. Voy a modificar tu rutina para incluir ejercicios más avanzados. ¿Te interesa probar el front lever?',
    timestamp: new Date('2024-02-08T15:00:00'),
    read: true,
  },
  {
    id: '27',
    fromId: '5', // Sofía
    toId: '1', // Leo
    content: '¡Sí! He estado viendo videos y me encantaría aprenderlo. ¿Empezamos con las progresiones?',
    timestamp: new Date('2024-02-08T15:30:00'),
    read: true,
  },
  {
    id: '28',
    fromId: '1', // Leo
    toId: '5', // Sofía
    content: 'Perfecto. Empezaremos con tuck front lever. Es importante que domines cada progresión antes de avanzar. Te prepararé una rutina específica para mañana.',
    timestamp: new Date('2024-02-08T16:00:00'),
    read: true,
  },
  {
    id: '29',
    fromId: '5', // Sofía
    toId: '1', // Leo
    content: '¡Excelente! Estoy muy emocionada. ¿Necesito algún equipo adicional?',
    timestamp: new Date('2024-02-08T16:15:00'),
    read: true,
  },
  {
    id: '30',
    fromId: '1', // Leo
    toId: '5', // Sofía
    content: 'No, con la barra que ya tienes es suficiente. También sería útil tener magnesio para las manos, pero no es obligatorio.',
    timestamp: new Date('2024-02-08T16:30:00'),
    read: true,
  },
  {
    id: '31',
    fromId: '5', // Sofía
    toId: '1', // Leo
    content: 'Ok, conseguiré magnesio. ¡Gracias!',
    timestamp: new Date('2024-02-08T16:45:00'),
    read: true,
  },
  {
    id: '32',
    fromId: '5', // Sofía
    toId: '1', // Leo
    content: 'Leo, hice mi primer tuck front lever de 5 segundos hoy! 🎉',
    timestamp: new Date('2024-02-13T18:00:00'),
    read: true,
  },
  {
    id: '33',
    fromId: '1', // Leo
    toId: '5', // Sofía
    content: '¡Increíble Sofía! 🎉 Eso es un gran logro. Sigue así y pronto estarás haciendo el full front lever. Tu progreso es impresionante.',
    timestamp: new Date('2024-02-13T18:30:00'),
    read: true,
  },
  {
    id: '34',
    fromId: '5', // Sofía
    toId: '1', // Leo
    content: 'Muchas gracias por tu apoyo constante. Realmente me ayuda a mantenerme motivada.',
    timestamp: new Date('2024-02-13T19:00:00'),
    read: true,
  },
  {
    id: '35',
    fromId: '5', // Sofía
    toId: '1', // Leo
    content: 'Hey Leo! Tengo una competencia de calistenia en 2 meses. ¿Crees que debería adaptar mi entrenamiento?',
    timestamp: new Date('2024-02-17T10:00:00'),
    read: true,
  },
  {
    id: '36',
    fromId: '1', // Leo
    toId: '5', // Sofía
    content: 'Wow, eso es genial! Sí, definitivamente deberíamos ajustar tu entrenamiento para prepararte. ¿Qué categoría es?',
    timestamp: new Date('2024-02-17T10:30:00'),
    read: true,
  },
  {
    id: '37',
    fromId: '5', // Sofía
    toId: '1', // Leo
    content: 'Es categoría freestyle avanzado. Tengo que preparar una rutina de 2 minutos con skills estáticos y dinámicos.',
    timestamp: new Date('2024-02-17T11:00:00'),
    read: true,
  },
  {
    id: '38',
    fromId: '1', // Leo
    toId: '5', // Sofía
    content: 'Perfecto! Vamos a crear un plan específico de competición. Nos enfocaremos en pulir tus skills actuales y agregar algunos combos impresionantes. ¿Cuándo podemos hacer una sesión de planificación?',
    timestamp: new Date('2024-02-17T11:30:00'),
    read: true,
  },
  {
    id: '39',
    fromId: '5', // Sofía
    toId: '1', // Leo
    content: '¿Qué tal mañana a las 5pm? Tengo todo el tiempo del mundo.',
    timestamp: new Date('2024-02-17T12:00:00'),
    read: true,
  },
  {
    id: '40',
    fromId: '1', // Leo
    toId: '5', // Sofía
    content: 'Perfecto! Nos vemos mañana a las 5pm. Prepara una lista de los movimientos que quieres incluir en tu rutina.',
    timestamp: new Date('2024-02-17T12:15:00'),
    read: true,
  },
  {
    id: '41',
    fromId: '5', // Sofía
    toId: '1', // Leo
    content: 'Listo! Nos vemos mañana. Gracias por todo tu apoyo 😊',
    timestamp: new Date('2024-02-17T12:30:00'),
    read: true,
  },
  {
    id: '42',
    fromId: '5', // Sofía
    toId: '1', // Leo
    content: 'Leo, la sesión de ayer fue increíble. Ya tengo muchas ideas para mi rutina de competición. ¿Empezamos a practicar desde mañana?',
    timestamp: new Date('2024-02-19T09:00:00'),
    read: false,
  },

  // Conversación adicional de seguimiento general
  {
    id: '43',
    fromId: '2', // Ana
    toId: '1', // Leo (admin)
    content: 'Leo, Juan está progresando muy bien. ¿Has visto sus últimos entrenamientos? Creo que está listo para una rutina intermedia en un mes.',
    timestamp: new Date('2024-02-18T16:00:00'),
    read: true,
  },
  {
    id: '44',
    fromId: '1', // Leo
    toId: '2', // Ana
    content: 'Sí, lo he visto! Está haciendo un trabajo excepcional. Y tú también Ana, excelente seguimiento. Sigamos con el plan actual y en un mes evaluamos el cambio.',
    timestamp: new Date('2024-02-18T17:00:00'),
    read: true,
  },
  {
    id: '45',
    fromId: '2', // Ana
    toId: '1', // Leo
    content: 'Perfecto! También quería comentarte que María me preguntó si puedo darle algunas clases. ¿Tienes inconveniente?',
    timestamp: new Date('2024-02-18T17:30:00'),
    read: true,
  },
  {
    id: '46',
    fromId: '1', // Leo
    toId: '2', // Ana
    content: 'Claro que no! De hecho sería genial. María puede beneficiarse de tu experiencia en movilidad. Coordinen directamente.',
    timestamp: new Date('2024-02-18T18:00:00'),
    read: true,
  },
  {
    id: '47',
    fromId: '2', // Ana
    toId: '1', // Leo
    content: '¡Genial! Se lo confirmo entonces. Gracias Leo.',
    timestamp: new Date('2024-02-18T18:15:00'),
    read: true,
  },
];
