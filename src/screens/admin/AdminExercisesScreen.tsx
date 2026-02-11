import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { exercises } from '@/data/mockData';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Modal } from '@/components/ui/Modal';
import { ConfirmModal } from '@/components/ui/ConfirmModal';
import { DropdownMenu } from '@/components/ui/DropdownMenu';
import { ArrowLeft, Plus, X } from 'lucide-react';
import { Exercise, Level, ExerciseType } from '@/types';

const MUSCLE_GROUPS_OPTIONS = [
  'pectorales', 'tríceps', 'deltoides', 'dorsales', 'bíceps',
  'core', 'abdominales', 'cuádriceps', 'isquiotibiales',
  'glúteos', 'gemelos', 'trapecio', 'hombros'
];

const EQUIPMENT_OPTIONS = ['barra', 'anillas', 'paralelas', 'suelo', 'pesas', 'mancuernas', 'kettlebell', 'cuerda', 'ninguno'];

export default function AdminExercisesScreen() {
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingExerciseId, setEditingExerciseId] = useState<string | null>(null);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [exerciseToDelete, setExerciseToDelete] = useState<Exercise | null>(null);
  const [exercisesList, setExercisesList] = useState(exercises);

  const [formData, setFormData] = useState({
    name: '',
    description: '',
    level: '' as Level | '',
    type: '' as ExerciseType | '',
    videoUrl: '',
    imageUrl: '',
    muscleGroups: [] as string[],
    equipment: [] as string[],
    commonMistakes: [] as string[],
  });

  const [mistakeInput, setMistakeInput] = useState('');
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.name.trim()) {
      newErrors.name = 'El nombre es requerido';
    }

    if (!formData.description.trim()) {
      newErrors.description = 'La descripción es requerida';
    }

    if (!formData.level) {
      newErrors.level = 'El nivel es requerido';
    }

    if (!formData.type) {
      newErrors.type = 'El tipo de ejercicio es requerido';
    }

    if (formData.muscleGroups.length === 0) {
      newErrors.muscleGroups = 'Debe seleccionar al menos un grupo muscular';
    }

    if (formData.equipment.length === 0) {
      newErrors.equipment = 'Debe seleccionar al menos un equipo';
    }

    if (exercisesList.some(e => e.name.toLowerCase() === formData.name.trim().toLowerCase() && e.id !== editingExerciseId)) {
      newErrors.name = 'Ya existe un ejercicio con este nombre';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleToggleMuscleGroup = (muscle: string) => {
    setFormData({
      ...formData,
      muscleGroups: formData.muscleGroups.includes(muscle)
        ? formData.muscleGroups.filter(m => m !== muscle)
        : [...formData.muscleGroups, muscle],
    });
  };

  const handleToggleEquipment = (equip: string) => {
    setFormData({
      ...formData,
      equipment: formData.equipment.includes(equip)
        ? formData.equipment.filter(e => e !== equip)
        : [...formData.equipment, equip],
    });
  };

  const handleAddMistake = () => {
    if (mistakeInput.trim() && !formData.commonMistakes.includes(mistakeInput.trim())) {
      setFormData({
        ...formData,
        commonMistakes: [...formData.commonMistakes, mistakeInput.trim()],
      });
      setMistakeInput('');
    }
  };

  const handleRemoveMistake = (index: number) => {
    setFormData({
      ...formData,
      commonMistakes: formData.commonMistakes.filter((_, i) => i !== index),
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    if (editingExerciseId) {
      // Actualizar ejercicio existente
      setExercisesList(exercisesList.map(exercise =>
        exercise.id === editingExerciseId
          ? {
            ...exercise,
            name: formData.name.trim(),
            description: formData.description.trim(),
            level: formData.level as Level,
            type: formData.type as ExerciseType,
            muscleGroups: formData.muscleGroups,
            equipment: formData.equipment,
            videoUrl: formData.videoUrl.trim() || undefined,
            imageUrl: formData.imageUrl.trim() || undefined,
            commonMistakes: formData.commonMistakes.length > 0 ? formData.commonMistakes : undefined,
          }
          : exercise
      ));
    } else {
      // Crear nuevo ejercicio
      const newExercise: Exercise = {
        id: `exercise-${Date.now()}`,
        name: formData.name.trim(),
        description: formData.description.trim(),
        level: formData.level as Level,
        type: formData.type as ExerciseType,
        muscleGroups: formData.muscleGroups,
        equipment: formData.equipment,
        videoUrl: formData.videoUrl.trim() || undefined,
        imageUrl: formData.imageUrl.trim() || undefined,
        commonMistakes: formData.commonMistakes.length > 0 ? formData.commonMistakes : undefined,
      };

      setExercisesList([...exercisesList, newExercise]);
    }

    // Reset form
    setFormData({
      name: '',
      description: '',
      level: '' as Level | '',
      type: '' as ExerciseType | '',
      videoUrl: '',
      imageUrl: '',
      muscleGroups: [],
      equipment: [],
      commonMistakes: [],
    });
    setMistakeInput('');
    setErrors({});
    setEditingExerciseId(null);
    setIsModalOpen(false);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditingExerciseId(null);
    setFormData({
      name: '',
      description: '',
      level: '' as Level | '',
      type: '' as ExerciseType | '',
      videoUrl: '',
      imageUrl: '',
      muscleGroups: [],
      equipment: [],
      commonMistakes: [],
    });
    setMistakeInput('');
    setErrors({});
  };

  const handleEditExercise = (exercise: Exercise) => {
    setEditingExerciseId(exercise.id);
    setFormData({
      name: exercise.name,
      description: exercise.description,
      level: exercise.level,
      type: exercise.type,
      videoUrl: exercise.videoUrl || '',
      imageUrl: exercise.imageUrl || '',
      muscleGroups: exercise.muscleGroups,
      equipment: exercise.equipment,
      commonMistakes: exercise.commonMistakes || [],
    });
    setMistakeInput('');
    setErrors({});
    setIsModalOpen(true);
  };

  const handleDuplicateExercise = (exercise: Exercise) => {
    // Encontrar el número de copia más alto existente
    const copyPattern = /^(.+?)\s*\(Copia(\d+)\)$/;
    const baseName = exercise.name;
    let maxCopyNumber = 0;

    exercisesList.forEach(e => {
      // Si es el nombre original exacto, no cuenta
      if (e.name === baseName) {
        return;
      }

      // Si tiene el patrón (CopiaX), extraer el número
      const match = e.name.match(copyPattern);
      if (match) {
        const nameWithoutCopy = match[1].trim();
        if (nameWithoutCopy === baseName) {
          const copyNum = parseInt(match[2], 10);
          if (copyNum > maxCopyNumber) {
            maxCopyNumber = copyNum;
          }
        }
      }
    });

    const newCopyNumber = maxCopyNumber + 1;
    const duplicatedExercise: Exercise = {
      ...exercise,
      id: `exercise-${Date.now()}`,
      name: `${exercise.name} (Copia${newCopyNumber})`,
    };

    setExercisesList([...exercisesList, duplicatedExercise]);
  };

  const handleDeleteExercise = (exercise: Exercise) => {
    setExerciseToDelete(exercise);
    setIsDeleteModalOpen(true);
  };

  const confirmDeleteExercise = () => {
    if (exerciseToDelete) {
      setExercisesList(exercisesList.filter(e => e.id !== exerciseToDelete.id));
      setExerciseToDelete(null);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="bg-background pt-12 pb-6 px-6">
        <button onClick={() => navigate(-1)} className="mb-4">
          <ArrowLeft size={24} className="text-foreground" />
        </button>
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-foreground text-2xl font-bold">Biblioteca de Ejercicios</h1>
            <p className="text-muted-foreground mt-2">{exercisesList.length} ejercicios</p>
          </div>
          <Button size="sm" onClick={() => setIsModalOpen(true)}>
            <Plus size={20} />
          </Button>
        </div>
      </div>

      <div className="px-6 pb-6">
        {exercisesList.map(exercise => (
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
              <div className="ml-4">
                <DropdownMenu
                  onEdit={() => handleEditExercise(exercise)}
                  onDelete={() => handleDeleteExercise(exercise)}
                  onDuplicate={() => handleDuplicateExercise(exercise)}
                />
              </div>
            </div>
          </Card>
        ))}
      </div>

      <Modal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        title={editingExerciseId ? "Editar Ejercicio" : "Agregar Nuevo Ejercicio"}
      >
        <form onSubmit={handleSubmit} className="max-h-[80vh] overflow-y-auto">
          <Input
            label="Nombre del ejercicio *"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            error={errors.name}
            placeholder="Ej: Flexiones"
            required
          />

          <div className="mb-4">
            <label className="block text-foreground text-sm font-medium mb-2">
              Descripción *
            </label>
            <textarea
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              placeholder="Describe cómo realizar el ejercicio, técnica, etc."
              rows={4}
              className="w-full border border-border rounded-lg px-4 py-3 text-foreground placeholder-muted-foreground focus:outline-none focus:border-cinnabar focus:ring-2 focus:ring-cinnabar/20 resize-none"
              style={{ backgroundColor: 'var(--input-background)' }}
              required
            />
            {errors.description && (
              <p className="text-cinnabar text-xs mt-1">{errors.description}</p>
            )}
          </div>

          <div className="grid grid-cols-2 gap-3 mb-4">
            <div>
              <label className="block text-foreground text-sm font-medium mb-2">
                Nivel *
              </label>
              <select
                value={formData.level}
                onChange={(e) => setFormData({ ...formData, level: e.target.value as Level | '' })}
                className="w-full border border-border rounded-lg px-4 py-3 text-foreground focus:outline-none focus:border-cinnabar focus:ring-2 focus:ring-cinnabar/20"
                style={{ backgroundColor: 'var(--input-background)' }}
                required
              >
                <option value="">Seleccionar</option>
                <option value="beginner">Principiante</option>
                <option value="intermediate">Intermedio</option>
                <option value="advanced">Avanzado</option>
              </select>
              {errors.level && (
                <p className="text-cinnabar text-xs mt-1">{errors.level}</p>
              )}
            </div>

            <div>
              <label className="block text-foreground text-sm font-medium mb-2">
                Tipo *
              </label>
              <select
                value={formData.type}
                onChange={(e) => setFormData({ ...formData, type: e.target.value as ExerciseType | '' })}
                className="w-full border border-border rounded-lg px-4 py-3 text-foreground focus:outline-none focus:border-cinnabar focus:ring-2 focus:ring-cinnabar/20"
                style={{ backgroundColor: 'var(--input-background)' }}
                required
              >
                <option value="">Seleccionar</option>
                <option value="fuerza">Fuerza</option>
                <option value="cardio">Cardio</option>
                <option value="flexibilidad">Flexibilidad</option>
                <option value="movilidad">Movilidad</option>
              </select>
              {errors.type && (
                <p className="text-cinnabar text-xs mt-1">{errors.type}</p>
              )}
            </div>
          </div>

          <div className="mb-4">
            <label className="block text-foreground text-sm font-medium mb-2">
              Grupos musculares * <span className="text-muted-foreground text-xs">({formData.muscleGroups.length} seleccionados)</span>
            </label>
            <div className="flex flex-wrap gap-2">
              {MUSCLE_GROUPS_OPTIONS.map(muscle => (
                <button
                  key={muscle}
                  type="button"
                  onClick={() => handleToggleMuscleGroup(muscle)}
                  className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${formData.muscleGroups.includes(muscle)
                    ? 'bg-cinnabar text-foreground'
                    : 'bg-background/50 text-muted-foreground hover:bg-muted/50'
                    }`}
                >
                  {muscle.charAt(0).toUpperCase() + muscle.slice(1)}
                </button>
              ))}
            </div>
            {errors.muscleGroups && (
              <p className="text-cinnabar text-xs mt-1">{errors.muscleGroups}</p>
            )}
          </div>

          <div className="mb-4">
            <label className="block text-foreground text-sm font-medium mb-2">
              Equipamiento * <span className="text-muted-foreground text-xs">({formData.equipment.length} seleccionados)</span>
            </label>
            <div className="flex flex-wrap gap-2">
              {EQUIPMENT_OPTIONS.map(equip => (
                <button
                  key={equip}
                  type="button"
                  onClick={() => handleToggleEquipment(equip)}
                  className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${formData.equipment.includes(equip)
                    ? 'bg-cinnabar text-foreground'
                    : 'bg-background/50 text-muted-foreground hover:bg-muted/50'
                    }`}
                >
                  {equip.charAt(0).toUpperCase() + equip.slice(1)}
                </button>
              ))}
            </div>
            {errors.equipment && (
              <p className="text-cinnabar text-xs mt-1">{errors.equipment}</p>
            )}
          </div>

          <Input
            label="URL del video (opcional)"
            type="url"
            value={formData.videoUrl}
            onChange={(e) => setFormData({ ...formData, videoUrl: e.target.value })}
            placeholder="https://example.com/video.mp4"
          />

          <Input
            label="URL de la imagen (opcional)"
            type="url"
            value={formData.imageUrl}
            onChange={(e) => setFormData({ ...formData, imageUrl: e.target.value })}
            placeholder="https://example.com/image.jpg"
          />

          <div className="mb-4">
            <label className="block text-foreground text-sm font-medium mb-2">
              Errores comunes
            </label>
            <div className="flex gap-2 mb-2">
              <input
                type="text"
                value={mistakeInput}
                onChange={(e) => setMistakeInput(e.target.value)}
                onKeyPress={(e) => {
                  if (e.key === 'Enter') {
                    e.preventDefault();
                    handleAddMistake();
                  }
                }}
                placeholder="Ej: Arquear la espalda"
                className="flex-1 border border-border rounded-lg px-4 py-2 text-foreground placeholder-muted-foreground focus:outline-none focus:border-cinnabar focus:ring-2 focus:ring-cinnabar/20"
                style={{ backgroundColor: 'var(--input-background)' }}
              />
              <Button
                type="button"
                size="sm"
                variant="secondary"
                onClick={handleAddMistake}
              >
                <Plus size={16} />
              </Button>
            </div>
            {formData.commonMistakes.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {formData.commonMistakes.map((mistake, index) => (
                  <span
                    key={index}
                    className="inline-flex items-center gap-2 bg-background/50 px-3 py-1 rounded-full text-sm text-foreground"
                  >
                    {mistake}
                    <button
                      type="button"
                      onClick={() => handleRemoveMistake(index)}
                      className="text-muted-foreground hover:text-cinnabar transition-colors"
                    >
                      <X size={14} />
                    </button>
                  </span>
                ))}
              </div>
            )}
          </div>

          <div className="flex gap-3 mt-6">
            <Button
              type="button"
              variant="outline"
              className="flex-1"
              onClick={handleCloseModal}
            >
              Cancelar
            </Button>
            <Button type="submit" className="flex-1">
              {editingExerciseId ? "Editar" : "Agregar"}
            </Button>
          </div>
        </form>
      </Modal>

      <ConfirmModal
        isOpen={isDeleteModalOpen}
        onClose={() => {
          setIsDeleteModalOpen(false);
          setExerciseToDelete(null);
        }}
        onConfirm={confirmDeleteExercise}
        title="Eliminar Ejercicio"
        message={`¿Estás seguro de que deseas eliminar el ejercicio "${exerciseToDelete?.name}"?`}
        confirmText="Eliminar"
        cancelText="Cancelar"
      />
    </div>
  );
}
