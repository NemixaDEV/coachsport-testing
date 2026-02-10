import { useNavigate } from 'react-router-dom';
import { exercises } from '@/data/mockData';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { ArrowLeft, Plus, MoreVertical } from 'lucide-react';

export default function AdminExercisesScreen() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background">
      <div className="bg-background pt-12 pb-6 px-6">
        <button onClick={() => navigate(-1)} className="mb-4">
          <ArrowLeft size={24} className="text-foreground" />
        </button>
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-foreground text-2xl font-bold">Biblioteca de Ejercicios</h1>
            <p className="text-muted-foreground mt-2">{exercises.length} ejercicios</p>
          </div>
          <Button size="sm" onClick={() => {}}>
            <Plus size={20} />
          </Button>
        </div>
      </div>

      <div className="px-6 pb-6">
        {exercises.map(exercise => (
          <Card key={exercise.id} className="mb-4">
            <div className="flex items-center justify-between">
              <div className="flex-1">
                <p className="text-foreground text-lg font-semibold mb-1">{exercise.name}</p>
                <p className="text-muted-foreground text-sm mb-2">{exercise.description}</p>
                <div className="flex gap-2">
                  <span className="bg-background/50 px-2 py-1 rounded text-xs text-muted-foreground capitalize">
                    {exercise.level}
                  </span>
                  {exercise.muscleGroups.slice(0, 2).map(muscle => (
                    <span key={muscle} className="bg-background/50 px-2 py-1 rounded text-xs text-muted-foreground">
                      {muscle}
                    </span>
                  ))}
                </div>
              </div>
              <button className="ml-4">
                <MoreVertical size={24} className="text-muted-foreground" />
              </button>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
