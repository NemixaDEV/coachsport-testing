import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { allUsers } from '@/data/mockData';
import { Card } from '@/components/ui/Card';
import { ArrowLeft } from 'lucide-react';

export default function TrainerClientsScreen() {
  const navigate = useNavigate();
  const { user } = useAuth();
  
  const clients = allUsers
    .filter(u => u.role === 'client' && u.trainerId === user?.id)
    .sort((a, b) => (a.name > b.name ? 1 : -1));

  return (
    <div className="min-h-screen bg-background">
      <div className="bg-background pt-12 pb-6 px-6">
        <button onClick={() => navigate(-1)} className="mb-4">
          <ArrowLeft size={24} className="text-foreground" />
        </button>
        <h1 className="text-foreground text-2xl font-bold mb-2">Mis Clientes</h1>
        <p className="text-muted-foreground">{clients.length} clientes activos</p>
      </div>

      <div className="px-6 pb-6">
        {clients.map(client => (
          <Card
            key={client.id}
            onClick={() => navigate(`/trainer/client/${client.id}`)}
            className="mb-4 cursor-pointer hover:bg-muted/80 transition-colors"
          >
            <div className="flex items-center">
              <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mr-4">
                <span className="text-foreground text-2xl font-bold">
                  {client.name.charAt(0).toUpperCase()}
                </span>
              </div>
              <div className="flex-1">
                <p className="text-foreground text-lg font-semibold mb-1">{client.name}</p>
                <p className="text-muted-foreground text-sm mb-1">{client.email}</p>
                {client.level && (
                  <div className="flex items-center">
                    <span className="bg-cinnabar/20 px-2 py-1 rounded mr-2 text-cinnabar text-xs capitalize">
                      {client.level}
                    </span>
                    {client.objectives && client.objectives.length > 0 && (
                      <span className="text-muted-foreground text-xs">
                        {client.objectives[0]}
                      </span>
                    )}
                  </div>
                )}
              </div>
              <span className="text-muted-foreground ml-4">›</span>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
