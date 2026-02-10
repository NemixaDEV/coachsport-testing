import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';
import { Level } from '@/types';

export default function ProfileSetupScreen() {
  const navigate = useNavigate();
  const [age, setAge] = useState('');
  const [weight, setWeight] = useState('');
  const [height, setHeight] = useState('');
  const [selectedLevel, setSelectedLevel] = useState<Level | null>(null);
  const [selectedObjectives, setSelectedObjectives] = useState<string[]>([]);

  const objectives = [
    'ganar fuerza',
    'perder grasa',
    'mejorar movilidad',
    'mantener forma',
  ];

  const toggleObjective = (obj: string) => {
    if (selectedObjectives.includes(obj)) {
      setSelectedObjectives(selectedObjectives.filter(o => o !== obj));
    } else {
      setSelectedObjectives([...selectedObjectives, obj]);
    }
  };

  const handleContinue = () => {
    // Guardar datos del perfil (simulado)
    navigate('/home');
  };

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-2xl mx-auto py-8">
        <div className="mb-8">
          <h1 className="text-foreground text-3xl font-bold mb-2">Completa tu Perfil</h1>
          <p className="text-muted-foreground">Ayúdanos a personalizar tu experiencia</p>
        </div>

        <div className="mb-6">
          <Input
            label="Edad"
            type="number"
            placeholder="28"
            value={age}
            onChange={(e) => setAge(e.target.value)}
          />
          <Input
            label="Peso (kg)"
            type="number"
            placeholder="70"
            value={weight}
            onChange={(e) => setWeight(e.target.value)}
          />
          <Input
            label="Altura (cm)"
            type="number"
            placeholder="175"
            value={height}
            onChange={(e) => setHeight(e.target.value)}
          />
        </div>

        <div className="mb-6">
          <p className="text-foreground text-base font-semibold mb-3">Nivel</p>
          <div className="flex flex-wrap gap-3">
            {(['beginner', 'intermediate', 'advanced'] as Level[]).map((level) => (
              <button
                key={level}
                onClick={() => setSelectedLevel(level)}
                className={`px-6 py-3 rounded-lg border-2 transition-colors ${
                  selectedLevel === level
                    ? 'border-cinnabar bg-cinnabar/20 text-foreground'
                    : 'border-border bg-transparent text-muted-foreground'
                }`}
              >
                <span className="font-medium">
                  {level === 'beginner' ? 'Principiante' : level === 'intermediate' ? 'Intermedio' : 'Avanzado'}
                </span>
              </button>
            ))}
          </div>
        </div>

        <div className="mb-6">
          <p className="text-foreground text-base font-semibold mb-3">Objetivos</p>
          <div className="flex flex-wrap gap-3">
            {objectives.map((obj) => (
              <button
                key={obj}
                onClick={() => toggleObjective(obj)}
                className={`px-4 py-2 rounded-lg border transition-colors ${
                  selectedObjectives.includes(obj)
                    ? 'border-medium-jungle bg-medium-jungle/20 text-foreground'
                    : 'border-border bg-transparent text-muted-foreground'
                }`}
              >
                <span className="text-sm">{obj}</span>
              </button>
            ))}
          </div>
        </div>

        <Button onClick={handleContinue} className="w-full mb-6">
          Continuar
        </Button>
      </div>
    </div>
  );
}
