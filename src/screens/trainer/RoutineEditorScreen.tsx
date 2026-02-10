import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { exercises } from '@/data/mockData';
import { Card } from '@/components/ui/Card';
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';
import { ArrowLeft, CheckCircle } from 'lucide-react';

export default function RoutineEditorScreen() {
  const navigate = useNavigate();
  const [routineName, setRoutineName] = useState('');
  const [description, setDescription] = useState('');
  const [selectedExercises, setSelectedExercises] = useState<string[]>([]);

  const toggleExercise = (exerciseId: string) => {
    if (selectedExercises.includes(exerciseId)) {
      setSelectedExercises(selectedExercises.filter(id => id !== exerciseId));
    } else {
      setSelectedExercises([...selectedExercises, exerciseId]);
    }
  };

  const handleSave = () => {
    // Simular guardado
    navigate(-1);
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="bg-background pt-12 pb-6 px-6">
        <button onClick={() => navigate(-1)} className="mb-4">
          <ArrowLeft size={24} className="text-foreground" />
        </button>
        <h1 className="text-foreground text-2xl font-bold mb-2">Crear Nueva Rutina</h1>
      </div>

      <div className="px-6 mb-6">
        <Input
          label="Nombre de la rutina"
          placeholder="Rutina Semanal - Principiante"
          value={routineName}
          onChange={(e) => setRoutineName(e.target.value)}
        />
        <Input
          label="Descripción"
          placeholder="Rutina diseñada para..."
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
      </div>

      <div className="px-6 mb-6">
        <h2 className="text-foreground text-lg font-semibold mb-4">Seleccionar Ejercicios</h2>
        {exercises.map(exercise => (
          <Card
            key={exercise.id}
            onClick={() => toggleExercise(exercise.id)}
            className={`mb-3 cursor-pointer transition-colors ${
              selectedExercises.includes(exercise.id) ? 'border-2 border-cinnabar' : ''
            }`}
          >
            <div className="flex items-center justify-between">
              <div className="flex-1">
                <p className="text-foreground font-semibold mb-1">{exercise.name}</p>
                <p className="text-muted-foreground text-sm">{exercise.description}</p>
              </div>
              {selectedExercises.includes(exercise.id) && (
                <CheckCircle size={24} className="text-cinnabar" />
              )}
            </div>
          </Card>
        ))}
      </div>

      <div className="px-6 mb-8">
        <Button
          onClick={handleSave}
          disabled={!routineName || selectedExercises.length === 0}
          className="w-full"
        >
          Guardar Rutina
        </Button>
      </div>
    </div>
  );
}
