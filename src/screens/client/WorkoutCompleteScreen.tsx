import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { CheckCircle } from 'lucide-react';

export default function WorkoutCompleteScreen() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-medium-jungle to-[#2e7d32] flex items-center justify-center p-6">
      <div className="text-center max-w-md w-full">
        <div className="w-24 h-24 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-6">
          <CheckCircle size={64} className="text-foreground" />
        </div>
        
        <h1 className="text-foreground text-4xl font-bold mb-4">¡Entrenamiento Completado!</h1>
        <p className="text-foreground/80 text-center text-lg mb-8">
          Has terminado tu rutina del día. ¡Excelente trabajo!
        </p>

        <Card className="w-full mb-6">
          <div className="flex justify-between items-center mb-4">
            <span className="text-muted-foreground">Tiempo total</span>
            <span className="text-foreground text-xl font-bold">45:30</span>
          </div>
          <div className="flex justify-between items-center mb-4">
            <span className="text-muted-foreground">Ejercicios completados</span>
            <span className="text-foreground text-xl font-bold">3/3</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-muted-foreground">Calorías estimadas</span>
            <span className="text-foreground text-xl font-bold">320</span>
          </div>
        </Card>

        <div className="w-full space-y-4">
          <Button
            onClick={() => navigate('/home')}
            variant="positive"
            className="w-full"
          >
            Volver al Inicio
          </Button>
          <Button
            variant="secondary"
            onClick={() => navigate('/progress')}
            className="w-full"
          >
            Ver Progreso
          </Button>
        </div>
      </div>
    </div>
  );
}
