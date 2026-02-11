import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card } from '@/components/ui/Card';
import { exercises } from '@/data/mockData';
import { Search, ChevronDown } from 'lucide-react';
import { Level } from '@/types';

export default function ExercisesScreen() {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedLevel, setSelectedLevel] = useState<Level | 'all'>('all');
  const [selectedMuscle, setSelectedMuscle] = useState<string>('all');
  const [isLevelExpanded, setIsLevelExpanded] = useState(false);
  const [isMuscleExpanded, setIsMuscleExpanded] = useState(false);

  const levels: (Level | 'all')[] = ['all', 'beginner', 'intermediate', 'advanced'];
  const muscleGroups = ['all', ...new Set(exercises.flatMap(e => e.muscleGroups))];

  const filteredExercises = exercises.filter(ex => {
    const matchesSearch = ex.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         ex.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesLevel = selectedLevel === 'all' || ex.level === selectedLevel;
    const matchesMuscle = selectedMuscle === 'all' || ex.muscleGroups.includes(selectedMuscle);
    return matchesSearch && matchesLevel && matchesMuscle;
  });

  const getLevelColor = (level: Level) => {
    switch (level) {
      case 'beginner': return 'bg-medium-jungle';
      case 'intermediate': return 'bg-cinnabar';
      case 'advanced': return 'bg-purple-600';
      default: return 'bg-cool-steel';
    }
  };

  const getLevelLabel = (level: Level) => {
    switch (level) {
      case 'beginner': return 'Principiante';
      case 'intermediate': return 'Intermedio';
      case 'advanced': return 'Avanzado';
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="bg-background pt-12 pb-4 px-6">
        <h1 className="text-foreground text-2xl font-bold mb-4">Biblioteca de Ejercicios</h1>
        
        <div className="border border-border rounded-lg px-4 py-3 flex items-center mb-4" style={{ backgroundColor: 'var(--input-background)' }}>
          <Search size={20} className="text-muted-foreground mr-2" />
          <input
            type="text"
            className="flex-1 bg-transparent text-foreground placeholder-muted-foreground outline-none"
            placeholder="Buscar ejercicios..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        <div className="space-y-3 mb-4">
          {/* Filtro por nivel */}
          <div>
            <button
              onClick={() => setIsLevelExpanded(!isLevelExpanded)}
              className="flex items-center justify-between w-full mb-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
            >
              <span>Filtrar por NIVEL</span>
              <ChevronDown
                size={18}
                className={`transition-transform duration-200 ${isLevelExpanded ? 'rotate-180' : ''}`}
              />
            </button>
            {isLevelExpanded && (
              <div className="flex flex-wrap gap-2">
                {levels.map(level => (
                  <button
                    key={level}
                    onClick={() => setSelectedLevel(level)}
                    className={`px-4 py-2 rounded-lg whitespace-nowrap transition-colors border ${
                      selectedLevel === level 
                        ? 'bg-secondary text-foreground border-secondary' 
                        : 'text-muted-foreground border-border hover:opacity-80 hover:text-foreground'
                    }`}
                    style={selectedLevel !== level ? { backgroundColor: 'var(--button-background)' } : {}}
                  >
                    <span className="text-sm font-medium">
                      {level === 'all' ? 'Todos' : getLevelLabel(level as Level)}
                    </span>
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Filtro por grupo muscular */}
          <div>
            <button
              onClick={() => setIsMuscleExpanded(!isMuscleExpanded)}
              className="flex items-center justify-between w-full mb-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
            >
              <span>Filtrar por GRUPO MUSCULAR</span>
              <ChevronDown
                size={18}
                className={`transition-transform duration-200 ${isMuscleExpanded ? 'rotate-180' : ''}`}
              />
            </button>
            {isMuscleExpanded && (
              <div className="flex flex-wrap gap-2">
                {muscleGroups.map(muscle => (
                  <button
                    key={muscle}
                    onClick={() => setSelectedMuscle(muscle)}
                    className={`px-4 py-2 rounded-lg whitespace-nowrap transition-colors border ${
                      selectedMuscle === muscle 
                        ? 'bg-secondary text-foreground border-secondary' 
                        : 'text-muted-foreground border-border hover:opacity-80 hover:text-foreground'
                    }`}
                    style={selectedMuscle !== muscle ? { backgroundColor: 'var(--button-background)' } : {}}
                  >
                    <span className="text-sm font-medium">
                      {muscle === 'all' ? 'Todos' : muscle}
                    </span>
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="px-6 pb-6">
        {filteredExercises.map(exercise => (
          <Card
            key={exercise.id}
            onClick={() => navigate(`/exercise/${exercise.id}`)}
            className="mb-4 cursor-pointer hover:opacity-80 transition-colors border border-border"
            style={{ backgroundColor: 'var(--card-background)' }}
          >
            <div className="flex items-center">
              <div className="flex-1">
                <div className="flex items-center mb-2">
                  <h3 className="text-foreground text-lg font-semibold mr-2">{exercise.name}</h3>
                  <span className={`px-2 py-1 rounded text-xs font-medium text-foreground ${getLevelColor(exercise.level)}`}>
                    {getLevelLabel(exercise.level)}
                  </span>
                </div>
                <p className="text-muted-foreground text-sm mb-2 line-clamp-2">
                  {exercise.description}
                </p>
                <div className="flex flex-wrap gap-2">
                  {exercise.muscleGroups.slice(0, 3).map(muscle => (
                    <span key={muscle} className="bg-background/50 px-2 py-1 rounded text-xs text-muted-foreground">
                      {muscle}
                    </span>
                  ))}
                </div>
              </div>
              <span className="ml-4 text-muted-foreground">›</span>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
