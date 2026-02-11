import { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { progressData, exercises, workouts } from '@/data/mockData';
import { Card } from '@/components/ui/Card';
import { Tab } from '@/components/ui/Tab';
import { Trophy, Lock, CheckCircle } from 'lucide-react';

export default function ProgressScreen() {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState<'stats' | 'history' | 'achievements'>('stats');

  const userProgress = progressData.filter(p => p.clientId === user?.id);
  const userWorkouts = workouts.filter(w => w.clientId === user?.id);

  const totalWorkouts = userWorkouts.length;
  const thisWeekWorkouts = userWorkouts.filter(w => {
    const weekAgo = new Date();
    weekAgo.setDate(weekAgo.getDate() - 7);
    return w.date >= weekAgo;
  }).length;

  return (
    <div className="min-h-screen bg-background">
      <div className="bg-background pt-12 pb-4 px-6">
        <h1 className="text-foreground text-2xl font-bold mb-4">Mi Progreso</h1>
        
        <div className="flex border-b border-border">
          <Tab
            label="Estadísticas"
            active={activeTab === 'stats'}
            onPress={() => setActiveTab('stats')}
          />
          <Tab
            label="Historial"
            active={activeTab === 'history'}
            onPress={() => setActiveTab('history')}
          />
          <Tab
            label="Logros"
            active={activeTab === 'achievements'}
            onPress={() => setActiveTab('achievements')}
          />
        </div>
      </div>

      <div className="px-6 pb-6">
        {activeTab === 'stats' && (
          <>
            <div className="grid grid-cols-2 gap-4 mt-6 mb-6">
              <Card>
                <p className="text-muted-foreground text-xs mb-1">Esta Semana</p>
                <p className="text-foreground text-3xl font-bold">{thisWeekWorkouts}</p>
                <p className="text-muted-foreground text-xs mt-1">entrenamientos</p>
              </Card>
              <Card>
                <p className="text-muted-foreground text-xs mb-1">Total</p>
                <p className="text-foreground text-3xl font-bold">{totalWorkouts}</p>
                <p className="text-muted-foreground text-xs mt-1">completados</p>
              </Card>
            </div>

            <div className="mb-6">
              <h2 className="text-foreground text-lg font-semibold mb-4">Evolución de Fuerza</h2>
              {userProgress.slice(0, 3).map(progress => {
                const exercise = exercises.find(e => e.id === progress.exerciseId);
                const progressPoints = userProgress.filter(p => p.exerciseId === progress.exerciseId);
                return (
                  <Card key={progress.id} className="mb-4">
                    <p className="text-foreground font-semibold mb-2">{exercise?.name}</p>
                    <div className="flex items-end gap-2 mb-2">
                      {progressPoints.map((p) => (
                        <div key={p.id} className="flex-1 text-center">
                          <div
                            className="bg-cinnabar rounded-t w-full mx-auto"
                            style={{ height: `${(p.reps || 0) * 8}px`, minHeight: '4px' }}
                          />
                          <p className="text-muted-foreground text-xs mt-1">
                            {p.reps || 0}
                          </p>
                        </div>
                      ))}
                    </div>
                  </Card>
                );
              })}
            </div>
          </>
        )}

        {activeTab === 'history' && (
          <div className="mt-6">
            {userWorkouts.map(workout => (
              <Card key={workout.id} className="mb-4">
                <div className="flex justify-between items-start mb-3">
                  <div>
                    <p className="text-foreground font-semibold mb-1">
                      {new Date(workout.date).toLocaleDateString('es-ES', {
                        weekday: 'long',
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric',
                      })}
                    </p>
                    <p className="text-muted-foreground text-sm">
                      {workout.exercises.length} ejercicios completados
                    </p>
                  </div>
                  <CheckCircle size={24} className="text-medium-jungle" />
                </div>
                {workout.notes && (
                  <p className="text-muted-foreground text-sm mt-2">{workout.notes}</p>
                )}
              </Card>
            ))}
          </div>
        )}

        {activeTab === 'achievements' && (
          <div className="mt-6">
            <Card className="mb-4">
              <div className="flex items-center mb-3">
                <div className="w-12 h-12 bg-medium-jungle rounded-full flex items-center justify-center mr-4">
                  <Trophy size={24} className="text-foreground" />
                </div>
                <div className="flex-1">
                  <p className="text-foreground font-semibold">Primera Semana</p>
                  <p className="text-muted-foreground text-sm">Completa 3 entrenamientos</p>
                </div>
                <CheckCircle size={24} className="text-medium-jungle" />
              </div>
            </Card>
            <Card className="mb-4">
              <div className="flex items-center mb-3">
                <div className="w-12 h-12 bg-cinnabar rounded-full flex items-center justify-center mr-4">
                  <span className="text-2xl">🔥</span>
                </div>
                <div className="flex-1">
                  <p className="text-foreground font-semibold">Racha de 7 días</p>
                  <p className="text-muted-foreground text-sm">Entrena 7 días seguidos</p>
                </div>
                <Lock size={24} className="text-muted-foreground" />
              </div>
            </Card>
          </div>
        )}
      </div>
    </div>
  );
}
