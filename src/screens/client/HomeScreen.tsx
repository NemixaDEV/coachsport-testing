import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { useSubscription } from '@/contexts/SubscriptionContext';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { routines, workouts } from '@/data/mockData';
import { Bell, Dumbbell, TrendingUp } from 'lucide-react';
import { format } from 'date-fns';

export default function HomeScreen() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { subscription } = useSubscription();
  const [showAllExercises, setShowAllExercises] = useState(false);
  
  const isFullPlan = subscription?.planId === 'full';

  const activeRoutine = routines.find(r => r.clientId === user?.id && r.isActive);
  const todayWorkout = workouts.find(w =>
    w.clientId === user?.id &&
    format(w.date, 'yyyy-MM-dd') === format(new Date(), 'yyyy-MM-dd')
  );

  const getTodayDay = () => {
    const days = ['domingo', 'lunes', 'martes', 'miércoles', 'jueves', 'viernes', 'sábado'];
    return days[new Date().getDay()];
  };

  const todayDay = getTodayDay();
  const todayExercises = activeRoutine?.days.find(d => d.day === todayDay);

  return (
    <div className="min-h-screen bg-background">
      <div className="bg-background pt-12 pb-6 px-6">
        <div className="flex justify-between items-center mb-4">
          <div>
            <p className="text-muted-foreground text-sm">Bienvenido de vuelta</p>
            <h1 className="text-foreground text-2xl font-bold">{user?.name}</h1>
          </div>
          <button onClick={() => navigate('/messages')} className="w-12 h-12 border border-border rounded-full flex items-center justify-center hover:opacity-80 transition-colors" style={{ backgroundColor: 'var(--button-background)' }}>
            <Bell size={24} className="text-foreground" />
          </button>
        </div>
      </div>

      <div className="px-6 pb-6">
        {activeRoutine && todayExercises && (
          <Card className="mb-6">
            <div className="flex justify-between items-center mb-4">
              <div>
                <p className="text-muted-foreground text-sm mb-1">Rutina del día</p>
                <h2 className="text-foreground text-xl font-bold">{activeRoutine.name}</h2>
                <p className="text-muted-foreground text-xs mt-1">
                  {todayExercises.exercises.length} ejercicios
                </p>
              </div>
              <div className="w-16 h-16 bg-cinnabar/20 rounded-full flex items-center justify-center">
                <Dumbbell size={32} className="text-cinnabar" />
              </div>
            </div>

            {!todayWorkout ? (
              <Button
                onClick={() => navigate(`/workout/${activeRoutine.id}`)}
                className="w-full"
              >
                Iniciar Entrenamiento
              </Button>
            ) : (
              <div>
                <p className="text-medium-jungle text-sm mb-2">
                  ✓ Entrenamiento completado hoy
                </p>
                <Button
                  variant="secondary"
                  onClick={() => navigate(`/workout/${activeRoutine.id}`)}
                  className="w-full"
                >
                  Ver Detalles
                </Button>
              </div>
            )}
          </Card>
        )}

        <div className="mb-6">
          <h2 className="text-foreground text-lg font-semibold mb-4">Esta Semana</h2>
          <div className="grid grid-cols-2 gap-4">
            <Card>
              <p className="text-muted-foreground text-xs mb-1">Entrenamientos</p>
              <p className="text-foreground text-2xl font-bold">3</p>
            </Card>
            <Card>
              <p className="text-muted-foreground text-xs mb-1">Tiempo total</p>
              <p className="text-foreground text-2xl font-bold">2.5h</p>
            </Card>
          </div>
        </div>

        <div className="mb-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-foreground text-lg font-semibold">Ejercicios Recientes</h2>
            {isFullPlan && (
              <button onClick={() => navigate('/exercises')} className="text-cinnabar text-sm hover:underline">
                Ver todos
              </button>
            )}
          </div>
          {todayExercises && todayExercises.exercises && todayExercises.exercises.length > 0 ? (
            <>
              <div className={`flex gap-4 ${showAllExercises ? 'flex-wrap' : ''}`}>
                {(showAllExercises ? todayExercises.exercises : todayExercises.exercises.slice(0, 2)).map((ex, idx) => (
                  <Card key={idx} className={showAllExercises ? 'flex-1 min-w-[12rem]' : 'flex-1'}>
                    <p className="text-foreground font-semibold mb-1">Ejercicio {idx + 1}</p>
                    <p className="text-muted-foreground text-xs">
                      {ex.sets} series × {ex.reps || `${ex.duration}s`}
                    </p>
                  </Card>
                ))}
              </div>
              {todayExercises.exercises.length > 2 && (
                <Button
                  variant="secondary"
                  onClick={() => setShowAllExercises(!showAllExercises)}
                  className="w-full mt-4"
                >
                  {showAllExercises ? 'Mostrar menos' : 'Mostrar el resto'}
                </Button>
              )}
            </>
          ) : (
            <p className="text-muted-foreground text-sm">No hay ejercicios disponibles</p>
          )}
        </div>

        {isFullPlan && (
          <div className="mb-8">
            <h2 className="text-foreground text-lg font-semibold mb-4">Accesos Rápidos</h2>
            <div className="grid grid-cols-2 gap-3">
              <button
                onClick={() => navigate('/exercises')}
                className="border border-border rounded-lg p-4 text-left hover:opacity-80 transition-colors"
                style={{ backgroundColor: 'var(--button-background)' }}
              >
                <Dumbbell size={24} className="text-cinnabar mb-2" />
                <p className="text-foreground font-semibold">Biblioteca</p>
                <p className="text-muted-foreground text-xs">Explora ejercicios</p>
              </button>
              <button
                onClick={() => navigate('/progress')}
                className="border border-border rounded-lg p-4 text-left hover:opacity-80 transition-colors"
                style={{ backgroundColor: 'var(--button-background)' }}
              >
                <TrendingUp size={24} className="text-medium-jungle mb-2" />
                <p className="text-foreground font-semibold">Progreso</p>
                <p className="text-muted-foreground text-xs">Ver estadísticas</p>
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
