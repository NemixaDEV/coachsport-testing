import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { routines } from '@/data/mockData';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Calendar, Check } from 'lucide-react';
import { format } from 'date-fns';

export default function RoutinesScreen() {
  const navigate = useNavigate();
  const { user } = useAuth();
  
  const userRoutines = routines.filter(r => r.clientId === user?.id);

  return (
    <div className="min-h-screen bg-background">
      <div className="bg-background pt-12 pb-6 px-6">
        <h1 className="text-foreground text-2xl font-bold mb-2">Mis Rutinas</h1>
        <p className="text-muted-foreground">Gestiona tus entrenamientos</p>
      </div>

      {userRoutines.find(r => r.isActive) && (
        <div className="px-6 mb-6">
          <Card className="bg-cinnabar/20 border-2 border-cinnabar">
            <div className="flex items-center justify-between mb-4">
              <div className="flex-1">
                <p className="text-muted-foreground text-xs mb-1">Rutina Activa</p>
                <h2 className="text-foreground text-xl font-bold">
                  {userRoutines.find(r => r.isActive)?.name}
                </h2>
              </div>
              <div className="w-12 h-12 bg-cinnabar rounded-full flex items-center justify-center">
                <Check size={24} className="text-foreground" />
              </div>
            </div>
            <Button
              variant="primary"
              onClick={() => navigate(`/routine/${userRoutines.find(r => r.isActive)?.id}`)}
              className="w-full"
            >
              Ver Detalles
            </Button>
          </Card>
        </div>
      )}

      <div className="px-6 mb-6">
        <h2 className="text-foreground text-lg font-semibold mb-4">Todas las Rutinas</h2>
        {userRoutines.map(routine => (
          <Card
            key={routine.id}
            onClick={() => navigate(`/routine/${routine.id}`)}
            className="mb-4 cursor-pointer hover:opacity-80 transition-colors border border-border"
            style={{ backgroundColor: 'var(--card-background)' }}
          >
            <div className="flex justify-between items-start">
              <div className="flex-1">
                <div className="flex items-center mb-2">
                  <h3 className="text-foreground text-lg font-semibold mr-2">{routine.name}</h3>
                  {routine.isActive && (
                    <span className="bg-medium-jungle px-2 py-1 rounded text-xs text-foreground">
                      Activa
                    </span>
                  )}
                </div>
                <p className="text-muted-foreground text-sm mb-3">{routine.description}</p>
                <div className="flex items-center">
                  <Calendar size={16} className="text-muted-foreground mr-1" />
                  <span className="text-muted-foreground text-xs">
                    {routine.days.length} días por semana
                  </span>
                </div>
                <p className="text-muted-foreground text-xs mt-1">
                  Creada el {format(routine.createdAt, 'dd/MM/yyyy')}
                </p>
              </div>
              <span className="text-muted-foreground ml-4">›</span>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
