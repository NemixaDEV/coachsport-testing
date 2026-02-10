import { useParams, useNavigate } from 'react-router-dom';
import { allUsers, routines, workouts } from '@/data/mockData';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { ArrowLeft, CheckCircle } from 'lucide-react';

export default function TrainerClientDetailScreen() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const client = allUsers.find(u => u.id === id);
  const clientRoutines = routines.filter(r => r.clientId === id);
  const clientWorkouts = workouts.filter(w => w.clientId === id);

  if (!client) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <p className="text-foreground">Cliente no encontrado</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="bg-background pt-12 pb-6 px-6">
        <button onClick={() => navigate(-1)} className="mb-4">
          <ArrowLeft size={24} className="text-foreground" />
        </button>
        <div className="flex items-center mb-4">
          <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mr-4">
            <span className="text-foreground text-2xl font-bold">
              {client.name.charAt(0).toUpperCase()}
            </span>
          </div>
          <div className="flex-1">
            <h1 className="text-foreground text-2xl font-bold">{client.name}</h1>
            <p className="text-muted-foreground">{client.email}</p>
          </div>
        </div>
      </div>

      <div className="px-6 mb-6">
        <Card>
          <h2 className="text-foreground text-lg font-semibold mb-4">Información del Cliente</h2>
          {client.age && (
            <div className="flex justify-between mb-2">
              <span className="text-muted-foreground">Edad</span>
              <span className="text-foreground">{client.age} años</span>
            </div>
          )}
          {client.weight && (
            <div className="flex justify-between mb-2">
              <span className="text-muted-foreground">Peso</span>
              <span className="text-foreground">{client.weight} kg</span>
            </div>
          )}
          {client.height && (
            <div className="flex justify-between mb-2">
              <span className="text-muted-foreground">Altura</span>
              <span className="text-foreground">{client.height} cm</span>
            </div>
          )}
          {client.level && (
            <div className="flex justify-between">
              <span className="text-muted-foreground">Nivel</span>
              <span className="text-foreground capitalize">{client.level}</span>
            </div>
          )}
        </Card>
      </div>

      <div className="px-6 mb-6">
        <Button
          onClick={() => navigate('/trainer/routine-editor')}
          className="w-full mb-3"
        >
          Crear Nueva Rutina
        </Button>
        <Button variant="secondary" onClick={() => {}} className="w-full">
          Enviar Mensaje
        </Button>
      </div>

      <div className="px-6 mb-6">
        <h2 className="text-foreground text-lg font-semibold mb-4">Rutinas Activas</h2>
        {clientRoutines.filter(r => r.isActive).map(routine => (
          <Card key={routine.id} className="mb-3">
            <p className="text-foreground font-semibold mb-1">{routine.name}</p>
            <p className="text-muted-foreground text-sm">{routine.description}</p>
          </Card>
        ))}
      </div>

      <div className="px-6 mb-6">
        <h2 className="text-foreground text-lg font-semibold mb-4">Entrenamientos Recientes</h2>
        {clientWorkouts.slice(0, 5).map(workout => (
          <Card key={workout.id} className="mb-3">
            <div className="flex justify-between items-center">
              <div>
                <p className="text-foreground font-semibold">
                  {new Date(workout.date).toLocaleDateString('es-ES')}
                </p>
                <p className="text-muted-foreground text-sm">
                  {workout.exercises.length} ejercicios
                </p>
              </div>
              <CheckCircle size={24} className="text-medium-jungle" />
            </div>
          </Card>
        ))}
      </div>

      <div className="px-6 mb-8">
        <h2 className="text-foreground text-lg font-semibold mb-4">Progreso</h2>
        <Card>
          <p className="text-muted-foreground text-sm mb-2">Total de entrenamientos</p>
          <p className="text-foreground text-2xl font-bold">{clientWorkouts.length}</p>
        </Card>
      </div>
    </div>
  );
}
