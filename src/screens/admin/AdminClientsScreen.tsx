import { useNavigate } from 'react-router-dom';
import { allUsers } from '@/data/mockData';
import { Card } from '@/components/ui/Card';
import { ArrowLeft, MoreVertical } from 'lucide-react';

export default function AdminClientsScreen() {
  const navigate = useNavigate();
  const clients = allUsers.filter(u => u.role === 'client');

  return (
    <div className="min-h-screen bg-background">
      <div className="bg-background pt-12 pb-6 px-6">
        <button onClick={() => navigate(-1)} className="mb-4">
          <ArrowLeft size={24} className="text-foreground" />
        </button>
        <h1 className="text-foreground text-2xl font-bold mb-2">Gestionar Clientes</h1>
      </div>

      <div className="px-6 pb-6">
        {clients.map(client => (
          <Card key={client.id} className="mb-4">
            <div className="flex items-center">
              <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mr-4">
                <span className="text-foreground text-2xl font-bold">
                  {client.name.charAt(0).toUpperCase()}
                </span>
              </div>
              <div className="flex-1">
                <p className="text-foreground text-lg font-semibold mb-1">{client.name}</p>
                <p className="text-muted-foreground text-sm">{client.email}</p>
                {client.level && (
                  <p className="text-muted-foreground text-xs mt-1 capitalize">{client.level}</p>
                )}
              </div>
              <button>
                <MoreVertical size={24} className="text-muted-foreground" />
              </button>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
