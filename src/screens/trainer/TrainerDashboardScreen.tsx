import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { allUsers, routines } from '@/data/mockData';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { User, Plus } from 'lucide-react';

export default function TrainerDashboardScreen() {
  const navigate = useNavigate();
  const { user } = useAuth();
  
  const clients = allUsers.filter(u => u.role === 'client');
  const activeClients = clients.filter(c => c.trainerId === user?.id);
  const activeRoutines = routines.filter(r => r.trainerId === user?.id && r.isActive);

  return (
    <div className="min-h-screen bg-background">
      <div className="bg-background pt-12 pb-6 px-6">
        <div className="flex justify-between items-center mb-4">
          <div>
            <p className="text-muted-foreground text-sm">Panel del Entrenador</p>
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
            <p className="text-muted-foreground text-xs mb-1">Clientes Activos</p>
            <p className="text-foreground text-3xl font-bold">{activeClients.length}</p>
          </Card>
          <Card>
            <p className="text-muted-foreground text-xs mb-1">Rutinas Activas</p>
            <p className="text-foreground text-3xl font-bold">{activeRoutines.length}</p>
          </Card>
        </div>
      </div>

      <div className="px-6 mb-6">
        <Button
          onClick={() => navigate('/trainer/routine-editor')}
          className="w-full mb-4"
        >
          <Plus size={20} className="mr-2 inline" />
          Crear Nueva Rutina
        </Button>
        <Button
          variant="secondary"
          onClick={() => navigate('/trainer/clients')}
          className="w-full"
        >
          Ver Todos los Clientes
        </Button>
      </div>

      <div className="px-6 mb-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-foreground text-lg font-semibold">Mis Clientes</h2>
          <button onClick={() => navigate('/trainer/clients')} className="text-cinnabar text-sm hover:underline">
            Ver todos
          </button>
        </div>
        {activeClients.slice(0, 3).map(client => (
          <Card
            key={client.id}
            onClick={() => navigate(`/trainer/client/${client.id}`)}
            className="mb-3 cursor-pointer hover:opacity-80 transition-colors border border-border"
            style={{ backgroundColor: 'var(--card-background)' }}
          >
            <div className="flex items-center">
              <div className="w-12 h-12 bg-background border border-border rounded-full flex items-center justify-center mr-4">
                <span className="text-foreground text-lg font-bold">
                  {client.name.charAt(0).toUpperCase()}
                </span>
              </div>
              <div className="flex-1">
                <p className="text-foreground font-semibold mb-1">{client.name}</p>
                <p className="text-muted-foreground text-xs">
                  {client.level || 'Sin nivel asignado'}
                </p>
              </div>
              <span className="text-muted-foreground">›</span>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
