import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import { allUsers } from '@/data/mockData';
import { Card } from '@/components/ui/Card';
import { ArrowLeft } from 'lucide-react';

export default function MessagesScreen() {
  const navigate = useNavigate();
  const { user } = useAuth();
  
  const trainer = user?.trainerId 
    ? allUsers.find(u => u.id === user.trainerId)
    : allUsers.find(u => u.role === 'trainer' || u.isTrainer);

  return (
    <div className="min-h-screen bg-background">
      <div className="bg-background pt-12 pb-6 px-6">
        <button onClick={() => navigate(-1)} className="mb-4">
          <ArrowLeft size={24} className="text-foreground" />
        </button>
        <h1 className="text-foreground text-2xl font-bold">Mensajes</h1>
      </div>

      <div className="px-6 pb-6">
        {trainer ? (
          <Card className="mb-4 cursor-pointer hover:bg-muted/80 transition-colors">
            <div className="flex items-center">
              <div className="w-12 h-12 bg-muted rounded-full flex items-center justify-center mr-4">
                <span className="text-foreground text-lg font-bold">
                  {trainer.name.charAt(0).toUpperCase()}
                </span>
              </div>
              <div className="flex-1">
                <p className="text-foreground font-semibold mb-1">{trainer.name}</p>
                <p className="text-muted-foreground text-sm">Tu entrenador</p>
              </div>
              <span className="text-muted-foreground">›</span>
            </div>
          </Card>
        ) : (
          <Card>
            <p className="text-muted-foreground text-center">No tienes mensajes</p>
          </Card>
        )}
      </div>
    </div>
  );
}
