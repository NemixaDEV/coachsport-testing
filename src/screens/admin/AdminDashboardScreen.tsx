import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import { allUsers, routines } from '@/data/mockData';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { User } from 'lucide-react';

export default function AdminDashboardScreen() {
  const navigate = useNavigate();
  const { user } = useAuth();
  
  const trainers = allUsers.filter(u => u.role === 'trainer' || u.isTrainer);
  const clients = allUsers.filter(u => u.role === 'client');
  const allRoutines = routines;

  return (
    <div className="min-h-screen bg-background">
      <div className="bg-background pt-12 pb-6 px-6">
        <div className="flex justify-between items-center mb-4">
          <div>
            <p className="text-muted-foreground text-sm">Panel de Administración</p>
            <h1 className="text-foreground text-2xl font-bold">{user?.name}</h1>
          </div>
          <button onClick={() => navigate('/profile')} className="w-12 h-12 border border-border rounded-full flex items-center justify-center hover:opacity-80 transition-colors" style={{ backgroundColor: 'var(--button-background)' }}>
            <User size={24} className="text-foreground" />
          </button>
        </div>
      </div>

      <div className="px-6 mb-6">
        <div className="grid grid-cols-2 gap-4">
          <Card>
            <p className="text-muted-foreground text-xs mb-1">Total Usuarios</p>
            <p className="text-foreground text-3xl font-bold">{allUsers.length}</p>
          </Card>
          <Card>
            <p className="text-muted-foreground text-xs mb-1">Entrenadores</p>
            <p className="text-foreground text-3xl font-bold">{trainers.length}</p>
          </Card>
          <Card>
            <p className="text-muted-foreground text-xs mb-1">Clientes</p>
            <p className="text-foreground text-3xl font-bold">{clients.length}</p>
          </Card>
          <Card>
            <p className="text-muted-foreground text-xs mb-1">Rutinas</p>
            <p className="text-foreground text-3xl font-bold">{allRoutines.length}</p>
          </Card>
        </div>
      </div>

      <div className="px-6 mb-6">
        <Button
          onClick={() => navigate('/admin/trainers')}
          className="w-full mb-3"
        >
          Gestionar Entrenadores
        </Button>
        <Button
          variant="secondary"
          onClick={() => navigate('/admin/clients')}
          className="w-full mb-3"
        >
          Gestionar Clientes
        </Button>
        <Button
          variant="outline"
          onClick={() => navigate('/admin/exercises')}
          className="w-full"
        >
          Gestionar Ejercicios
        </Button>
      </div>
    </div>
  );
}
