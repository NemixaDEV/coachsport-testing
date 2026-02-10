import { useParams, useNavigate } from 'react-router-dom';
import { routines, exercises } from '@/data/mockData';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { ArrowLeft } from 'lucide-react';
import { DayOfWeek } from '@/types';

export default function RoutineDetailScreen() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const routine = routines.find(r => r.id === id);

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

  const getDayLabel = (day: DayOfWeek) => {
    const labels: Record<DayOfWeek, string> = {
      lunes: 'Lunes',
      martes: 'Martes',
      miércoles: 'Miércoles',
      jueves: 'Jueves',
      viernes: 'Viernes',
      sábado: 'Sábado',
      domingo: 'Domingo',
    };
    return labels[day];
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="bg-background pt-12 pb-6 px-6">
        <button onClick={() => navigate(-1)} className="mb-4">
          <ArrowLeft size={24} className="text-foreground" />
        </button>
        <h1 className="text-foreground text-3xl font-bold mb-2">{routine.name}</h1>
        <p className="text-muted-foreground">{routine.description}</p>
      </div>

      {todayExercises && (
        <div className="px-6 mb-6">
          <Card className="bg-cinnabar/20 border-2 border-cinnabar">
            <p className="text-muted-foreground text-xs mb-1">Entrenamiento de Hoy</p>
            <h2 className="text-foreground text-xl font-bold mb-4">{getDayLabel(todayDay)}</h2>
            <Button
              onClick={() => navigate(`/workout/${routine.id}`)}
              className="w-full"
            >
              Iniciar Entrenamiento
            </Button>
          </Card>
        </div>
      )}

      <div className="px-6 mb-6">
        <h2 className="text-foreground text-lg font-semibold mb-4">Programa Semanal</h2>
        {routine.days.map((day, idx) => (
          <Card key={idx} className="mb-4">
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-foreground text-lg font-semibold">{getDayLabel(day.day)}</h3>
              {day.day === todayDay && (
                <span className="bg-cinnabar px-2 py-1 rounded text-xs text-foreground">Hoy</span>
              )}
            </div>
            <div className="space-y-2">
              {day.exercises.map((ex, exIdx) => {
                const exercise = exercises.find(e => e.id === ex.exerciseId);
                return (
                  <div key={exIdx} className="bg-background/50 rounded-lg p-3">
                    <p className="text-foreground font-medium mb-1">
                      {exercise?.name || 'Ejercicio'}
                    </p>
                    <div className="flex items-center gap-4">
                      <span className="text-muted-foreground text-sm">
                        {ex.sets} series
                      </span>
                      {ex.reps && (
                        <span className="text-cinnabar text-sm font-semibold">
                          {ex.reps} repeticiones
                        </span>
                      )}
                      {ex.duration && (
                        <span className="text-cinnabar text-sm font-semibold">
                          {ex.duration}s
                        </span>
                      )}
                      <span className="text-muted-foreground text-xs">
                        Descanso: {ex.rest}s
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
