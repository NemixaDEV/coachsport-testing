import { useParams, useNavigate } from 'react-router-dom';
import { exercises } from '@/data/mockData';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { ArrowLeft, X, Play } from 'lucide-react';

export default function ExerciseDetailScreen() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const exercise = exercises.find(e => e.id === id);

  if (!exercise) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <p className="text-foreground">Ejercicio no encontrado</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="bg-background pt-12 pb-6 px-6">
        <button onClick={() => navigate(-1)} className="mb-4">
          <ArrowLeft size={24} className="text-foreground" />
        </button>
        <h1 className="text-foreground text-3xl font-bold mb-2">{exercise.name}</h1>
        <div className="flex items-center gap-4">
          <span className="bg-cinnabar px-3 py-1 rounded text-sm font-medium text-foreground capitalize">
            {exercise.level}
          </span>
          <span className="text-muted-foreground capitalize">{exercise.type}</span>
        </div>
      </div>

      <div className="h-64 bg-muted flex items-center justify-center mb-6">
        <div className="text-center">
          <div className="w-16 h-16 bg-background/50 rounded-full flex items-center justify-center mx-auto mb-2">
            <span className="text-4xl">🏋️</span>
          </div>
          <p className="text-muted-foreground">Imagen del ejercicio</p>
        </div>
      </div>

      <div className="px-6 mb-6">
        <Card>
          <h2 className="text-foreground text-lg font-semibold mb-3">Descripción</h2>
          <p className="text-muted-foreground leading-6">{exercise.description}</p>
        </Card>
      </div>

      <div className="px-6 mb-6">
        <h2 className="text-foreground text-lg font-semibold mb-3 px-6">Músculos Implicados</h2>
        <div className="flex flex-wrap gap-2 px-6">
          {exercise.muscleGroups.map(muscle => (
            <span key={muscle} className="bg-muted px-4 py-2 rounded-lg text-foreground text-sm">
              {muscle}
            </span>
          ))}
        </div>
      </div>

      <div className="px-6 mb-6">
        <h2 className="text-foreground text-lg font-semibold mb-3 px-6">Equipamiento</h2>
        <div className="flex flex-wrap gap-2 px-6">
          {exercise.equipment.map(eq => (
            <span key={eq} className="bg-muted px-4 py-2 rounded-lg text-foreground text-sm">
              {eq}
            </span>
          ))}
        </div>
      </div>

      {exercise.commonMistakes && exercise.commonMistakes.length > 0 && (
        <div className="px-6 mb-6">
          <Card>
            <h2 className="text-foreground text-lg font-semibold mb-3">Errores Comunes</h2>
            {exercise.commonMistakes.map((mistake, idx) => (
              <div key={idx} className="flex items-start mb-2">
                <X size={20} className="text-cinnabar mr-2 flex-shrink-0 mt-0.5" />
                <p className="text-muted-foreground flex-1">{mistake}</p>
              </div>
            ))}
          </Card>
        </div>
      )}

      {exercise.variations && exercise.variations.length > 0 && (
        <div className="px-6 mb-8">
          <Card>
            <h2 className="text-foreground text-lg font-semibold mb-3">Variaciones</h2>
            {exercise.variations.map(variation => (
              <div key={variation.id} className="mb-3 pb-3 border-b border-border last:border-0">
                <div className="flex items-center justify-between">
                  <span className="text-foreground font-medium">{variation.name}</span>
                  <span className={`px-2 py-1 rounded text-xs text-foreground ${
                    variation.difficulty === 'easier' ? 'bg-medium-jungle' : 'bg-cinnabar'
                  }`}>
                    {variation.difficulty === 'easier' ? 'Más fácil' : 'Más difícil'}
                  </span>
                </div>
              </div>
            ))}
          </Card>
        </div>
      )}

      <div className="px-6 mb-8">
        <Button className="w-full flex items-center justify-center">
          <Play size={20} className="mr-2" />
          Ver Video Demostrativo
        </Button>
      </div>
    </div>
  );
}
