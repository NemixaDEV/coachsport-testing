import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { routines, exercises } from '@/data/mockData';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { ArrowLeft, Play, Pause, RotateCcw } from 'lucide-react';
import { DayOfWeek } from '@/types';

export default function WorkoutScreen() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const routine = routines.find(r => r.id === id);
  const [currentExerciseIndex, setCurrentExerciseIndex] = useState(0);
  const [timer, setTimer] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [completedExercises, setCompletedExercises] = useState<number[]>([]);

  useEffect(() => {
    let interval: ReturnType<typeof setInterval>;
    if (isRunning) {
      interval = setInterval(() => {
        setTimer(prev => prev + 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isRunning]);

  if (!routine) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <p className="text-foreground">Rutina no encontrada</p>
      </div>
    );
  }

  const getTodayDay = () => {
    const days: DayOfWeek[] = ['domingo', 'lunes', 'martes', 'miércoles', 'jueves', 'viernes', 'sábado'];
    return days[new Date().getDay()];
  };

  const todayDay = getTodayDay();
  const todayExercises = routine.days.find(d => d.day === todayDay);

  if (!todayExercises) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center px-6">
        <div className="text-center">
          <p className="text-foreground text-xl mb-4">No hay entrenamiento programado para hoy</p>
          <Button onClick={() => navigate(-1)}>Volver</Button>
        </div>
      </div>
    );
  }

  const currentExercise = todayExercises.exercises[currentExerciseIndex];
  const exercise = exercises.find(e => e.id === currentExercise.exerciseId);
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const handleComplete = () => {
    setCompletedExercises([...completedExercises, currentExerciseIndex]);
    if (currentExerciseIndex < todayExercises.exercises.length - 1) {
      setCurrentExerciseIndex(currentExerciseIndex + 1);
      setTimer(0);
      setIsRunning(false);
    } else {
      navigate(`/workout/${id}/complete`);
    }
  };

  const handleNext = () => {
    if (currentExerciseIndex < todayExercises.exercises.length - 1) {
      setCurrentExerciseIndex(currentExerciseIndex + 1);
      setTimer(0);
      setIsRunning(false);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="bg-background pt-12 pb-4 px-6">
        <button onClick={() => navigate(-1)} className="mb-4">
          <ArrowLeft size={24} className="text-foreground" />
        </button>
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-foreground text-2xl font-bold">{exercise?.name}</h1>
            <p className="text-muted-foreground text-sm">
              Ejercicio {currentExerciseIndex + 1} de {todayExercises.exercises.length}
            </p>
          </div>
        </div>
      </div>

      <div className="px-6 mt-4 mb-6">
        <Card className="text-center py-8">
          <p className="text-muted-foreground text-sm mb-2">Tiempo</p>
          <p className="text-foreground text-5xl font-bold mb-4">{formatTime(timer)}</p>
          <div className="flex gap-4 justify-center">
            <button
              onClick={() => setIsRunning(!isRunning)}
              className="bg-cinnabar px-6 py-3 rounded-lg hover:bg-[#E1322A] transition-colors"
            >
              {isRunning ? <Pause size={24} className="text-foreground" /> : <Play size={24} className="text-foreground" />}
            </button>
            <button
              onClick={() => {
                setTimer(0);
                setIsRunning(false);
              }}
              className="border border-border px-6 py-3 rounded-lg hover:opacity-80 transition-colors"
              style={{ backgroundColor: 'var(--button-background)' }}
            >
              <RotateCcw size={24} className="text-foreground" />
            </button>
          </div>
        </Card>
      </div>

      <div className="px-6 mb-6">
        <Card>
          <h2 className="text-foreground text-lg font-semibold mb-4">Series y Repeticiones</h2>
          <div className="bg-background/50 rounded-lg p-4 mb-4">
            <p className="text-cinnabar text-3xl font-bold mb-2">
              {currentExercise.sets} series
            </p>
            {currentExercise.reps && (
              <p className="text-foreground text-2xl font-semibold">
                {currentExercise.reps} repeticiones
              </p>
            )}
            {currentExercise.duration && (
              <p className="text-foreground text-2xl font-semibold">
                {currentExercise.duration} segundos
              </p>
            )}
            <p className="text-muted-foreground text-sm mt-2">
              Descanso: {currentExercise.rest}s entre series
            </p>
          </div>
          <p className="text-muted-foreground text-sm leading-6">
            {exercise?.description}
          </p>
        </Card>
      </div>

      <div className="px-6 mb-6">
        <p className="text-foreground text-base font-semibold mb-3">Progreso</p>
        <div className="flex gap-2">
          {todayExercises.exercises.map((_, idx) => (
            <div
              key={idx}
              className={`flex-1 h-2 rounded ${
                completedExercises.includes(idx)
                  ? 'bg-medium-jungle'
                  : idx === currentExerciseIndex
                  ? 'bg-cinnabar'
                  : 'border border-border'
              }`}
              style={!completedExercises.includes(idx) && idx !== currentExerciseIndex ? { backgroundColor: 'var(--card-background)' } : {}}
            />
          ))}
        </div>
      </div>

      <div className="px-6 mb-8">
        <Button onClick={handleComplete} className="w-full mb-4">
          Marcar como Completado
        </Button>
        {currentExerciseIndex < todayExercises.exercises.length - 1 && (
          <Button variant="secondary" onClick={handleNext} className="w-full">
            Siguiente Ejercicio
          </Button>
        )}
      </div>
    </div>
  );
}
