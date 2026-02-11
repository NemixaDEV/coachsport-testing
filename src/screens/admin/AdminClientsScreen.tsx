import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { allUsers } from '@/data/mockData';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Modal } from '@/components/ui/Modal';
import { ConfirmModal } from '@/components/ui/ConfirmModal';
import { DropdownMenu } from '@/components/ui/DropdownMenu';
import { ArrowLeft, Plus, X } from 'lucide-react';
import { User, Level, DayOfWeek } from '@/types';

const DAYS_OF_WEEK: DayOfWeek[] = ['lunes', 'martes', 'miércoles', 'jueves', 'viernes', 'sábado', 'domingo'];
const EQUIPMENT_OPTIONS = ['barra', 'anillas', 'paralelas', 'suelo', 'pesas', 'mancuernas', 'kettlebell'];

export default function AdminClientsScreen() {
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingClientId, setEditingClientId] = useState<string | null>(null);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [clientToDelete, setClientToDelete] = useState<User | null>(null);
  const [clients, setClients] = useState(allUsers.filter(u => u.role === 'client'));
  const trainers = allUsers.filter(u => u.role === 'trainer' || u.isTrainer);

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    age: '',
    weight: '',
    height: '',
    level: '' as Level | '',
    trainerId: '',
    objectives: [] as string[],
    availableDays: [] as DayOfWeek[],
    availableEquipment: [] as string[],
  });

  const [objectiveInput, setObjectiveInput] = useState('');
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.name.trim()) {
      newErrors.name = 'El nombre es requerido';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'El email es requerido';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'El email no es válido';
    }

    if (clients.some(c => c.email === formData.email && c.id !== editingClientId)) {
      newErrors.email = 'Este email ya está registrado';
    }

    if (formData.age && (isNaN(Number(formData.age)) || Number(formData.age) < 1 || Number(formData.age) > 120)) {
      newErrors.age = 'La edad debe ser un número entre 1 y 120';
    }

    if (formData.weight && (isNaN(Number(formData.weight)) || Number(formData.weight) < 1)) {
      newErrors.weight = 'El peso debe ser un número válido';
    }

    if (formData.height && (isNaN(Number(formData.height)) || Number(formData.height) < 1)) {
      newErrors.height = 'La altura debe ser un número válido';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleAddObjective = () => {
    if (objectiveInput.trim() && !formData.objectives.includes(objectiveInput.trim())) {
      setFormData({
        ...formData,
        objectives: [...formData.objectives, objectiveInput.trim()],
      });
      setObjectiveInput('');
    }
  };

  const handleRemoveObjective = (index: number) => {
    setFormData({
      ...formData,
      objectives: formData.objectives.filter((_, i) => i !== index),
    });
  };

  const handleToggleDay = (day: DayOfWeek) => {
    setFormData({
      ...formData,
      availableDays: formData.availableDays.includes(day)
        ? formData.availableDays.filter(d => d !== day)
        : [...formData.availableDays, day],
    });
  };

  const handleToggleEquipment = (equipment: string) => {
    setFormData({
      ...formData,
      availableEquipment: formData.availableEquipment.includes(equipment)
        ? formData.availableEquipment.filter(e => e !== equipment)
        : [...formData.availableEquipment, equipment],
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    if (editingClientId) {
      // Actualizar cliente existente
      setClients(clients.map(client =>
        client.id === editingClientId
          ? {
            ...client,
            name: formData.name.trim(),
            email: formData.email.trim(),
            phone: formData.phone.trim() || undefined,
            age: formData.age ? Number(formData.age) : undefined,
            weight: formData.weight ? Number(formData.weight) : undefined,
            height: formData.height ? Number(formData.height) : undefined,
            level: formData.level || undefined,
            trainerId: formData.trainerId || undefined,
            objectives: formData.objectives.length > 0 ? formData.objectives : undefined,
            preferences: {
              availableDays: formData.availableDays.length > 0 ? formData.availableDays : undefined,
              availableEquipment: formData.availableEquipment.length > 0 ? formData.availableEquipment : undefined,
            },
          }
          : client
      ));
    } else {
      // Crear nuevo cliente
      const newClient: User = {
        id: `client-${Date.now()}`,
        name: formData.name.trim(),
        email: formData.email.trim(),
        role: 'client',
        phone: formData.phone.trim() || undefined,
        age: formData.age ? Number(formData.age) : undefined,
        weight: formData.weight ? Number(formData.weight) : undefined,
        height: formData.height ? Number(formData.height) : undefined,
        level: formData.level || undefined,
        trainerId: formData.trainerId || undefined,
        objectives: formData.objectives.length > 0 ? formData.objectives : undefined,
        preferences: {
          availableDays: formData.availableDays.length > 0 ? formData.availableDays : undefined,
          availableEquipment: formData.availableEquipment.length > 0 ? formData.availableEquipment : undefined,
        },
        createdAt: new Date(),
      };

      setClients([...clients, newClient]);
    }

    // Reset form
    setFormData({
      name: '',
      email: '',
      phone: '',
      age: '',
      weight: '',
      height: '',
      level: '',
      trainerId: '',
      objectives: [],
      availableDays: [],
      availableEquipment: [],
    });
    setObjectiveInput('');
    setErrors({});
    setEditingClientId(null);
    setIsModalOpen(false);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditingClientId(null);
    setFormData({
      name: '',
      email: '',
      phone: '',
      age: '',
      weight: '',
      height: '',
      level: '',
      trainerId: '',
      objectives: [],
      availableDays: [],
      availableEquipment: [],
    });
    setObjectiveInput('');
    setErrors({});
  };

  const handleEditClient = (client: User) => {
    setEditingClientId(client.id);
    setFormData({
      name: client.name,
      email: client.email,
      phone: client.phone || '',
      age: client.age ? String(client.age) : '',
      weight: client.weight ? String(client.weight) : '',
      height: client.height ? String(client.height) : '',
      level: client.level || '',
      trainerId: client.trainerId || '',
      objectives: client.objectives || [],
      availableDays: client.preferences?.availableDays || [],
      availableEquipment: client.preferences?.availableEquipment || [],
    });
    setObjectiveInput('');
    setErrors({});
    setIsModalOpen(true);
  };

  const handleDuplicateClient = (client: User) => {
    // Encontrar el número de copia más alto existente
    const copyPattern = /^(.+?)\s*\(Copia(\d+)\)$/;
    const baseName = client.name;
    let maxCopyNumber = 0;

    clients.forEach(c => {
      // Si es el nombre original exacto, no cuenta
      if (c.name === baseName) {
        return;
      }

      // Si tiene el patrón (CopiaX), extraer el número
      const match = c.name.match(copyPattern);
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
    const duplicatedClient: User = {
      ...client,
      id: `client-${Date.now()}`,
      name: `${client.name} (Copia${newCopyNumber})`,
      email: `copy${newCopyNumber}-${client.email}`,
      createdAt: new Date(),
    };

    setClients([...clients, duplicatedClient]);
  };

  const handleDeleteClient = (client: User) => {
    setClientToDelete(client);
    setIsDeleteModalOpen(true);
  };

  const confirmDeleteClient = () => {
    if (clientToDelete) {
      setClients(clients.filter(c => c.id !== clientToDelete.id));
      setClientToDelete(null);
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
            <h1 className="text-foreground text-2xl font-bold">Gestionar Clientes</h1>
            <p className="text-muted-foreground mt-2">{clients.length} clientes</p>
          </div>
          <Button size="sm" onClick={() => setIsModalOpen(true)}>
            <Plus size={20} />
          </Button>
        </div>
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
              <DropdownMenu
                onEdit={() => handleEditClient(client)}
                onDelete={() => handleDeleteClient(client)}
                onDuplicate={() => handleDuplicateClient(client)}
              />
            </div>
          </Card>
        ))}
      </div>

      <Modal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        title={editingClientId ? "Editar Cliente" : "Agregar Nuevo Cliente"}
      >
        <form onSubmit={handleSubmit} className="max-h-[80vh] overflow-y-auto">
          <Input
            label="Nombre completo *"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            error={errors.name}
            placeholder="Ej: María López"
            required
          />

          <Input
            label="Email *"
            type="email"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            error={errors.email}
            placeholder="Ej: maria@example.com"
            required
          />

          <Input
            label="Teléfono"
            type="tel"
            value={formData.phone}
            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
            placeholder="Ej: +34 600 123 456"
          />

          <div className="grid grid-cols-3 gap-3 mb-4">
            <Input
              label="Edad"
              type="number"
              value={formData.age}
              onChange={(e) => setFormData({ ...formData, age: e.target.value })}
              error={errors.age}
              placeholder="Ej: 28"
              min="1"
              max="120"
            />
            <Input
              label="Peso (kg)"
              type="number"
              value={formData.weight}
              onChange={(e) => setFormData({ ...formData, weight: e.target.value })}
              error={errors.weight}
              placeholder="Ej: 65"
              min="1"
              step="0.1"
            />
            <Input
              label="Altura (cm)"
              type="number"
              value={formData.height}
              onChange={(e) => setFormData({ ...formData, height: e.target.value })}
              error={errors.height}
              placeholder="Ej: 165"
              min="1"
            />
          </div>

          <div className="mb-4">
            <label className="block text-foreground text-sm font-medium mb-2">
              Nivel
            </label>
            <select
              value={formData.level}
              onChange={(e) => setFormData({ ...formData, level: e.target.value as Level | '' })}
              className="w-full border border-border rounded-lg px-4 py-3 text-foreground focus:outline-none focus:border-cinnabar focus:ring-2 focus:ring-cinnabar/20"
              style={{ backgroundColor: 'var(--input-background)' }}
            >
              <option value="">Seleccionar nivel</option>
              <option value="beginner">Principiante</option>
              <option value="intermediate">Intermedio</option>
              <option value="advanced">Avanzado</option>
            </select>
          </div>

          <div className="mb-4">
            <label className="block text-foreground text-sm font-medium mb-2">
              Entrenador asignado
            </label>
            <select
              value={formData.trainerId}
              onChange={(e) => setFormData({ ...formData, trainerId: e.target.value })}
              className="w-full border border-border rounded-lg px-4 py-3 text-foreground focus:outline-none focus:border-cinnabar focus:ring-2 focus:ring-cinnabar/20"
              style={{ backgroundColor: 'var(--input-background)' }}
            >
              <option value="">Sin asignar</option>
              {trainers.map(trainer => (
                <option key={trainer.id} value={trainer.id}>
                  {trainer.name}
                </option>
              ))}
            </select>
          </div>

          <div className="mb-4">
            <label className="block text-foreground text-sm font-medium mb-2">
              Objetivos
            </label>
            <div className="flex gap-2 mb-2">
              <input
                type="text"
                value={objectiveInput}
                onChange={(e) => setObjectiveInput(e.target.value)}
                onKeyPress={(e) => {
                  if (e.key === 'Enter') {
                    e.preventDefault();
                    handleAddObjective();
                  }
                }}
                placeholder="Ej: ganar fuerza, perder grasa"
                className="flex-1 border border-border rounded-lg px-4 py-2 text-foreground placeholder-muted-foreground focus:outline-none focus:border-cinnabar focus:ring-2 focus:ring-cinnabar/20"
                style={{ backgroundColor: 'var(--input-background)' }}
              />
              <Button
                type="button"
                size="sm"
                variant="secondary"
                onClick={handleAddObjective}
              >
                <Plus size={16} />
              </Button>
            </div>
            {formData.objectives.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {formData.objectives.map((objective, index) => (
                  <span
                    key={index}
                    className="inline-flex items-center gap-2 bg-background/50 px-3 py-1 rounded-full text-sm text-foreground"
                  >
                    {objective}
                    <button
                      type="button"
                      onClick={() => handleRemoveObjective(index)}
                      className="text-muted-foreground hover:text-cinnabar transition-colors"
                    >
                      <X size={14} />
                    </button>
                  </span>
                ))}
              </div>
            )}
          </div>

          <div className="mb-4">
            <label className="block text-foreground text-sm font-medium mb-2">
              Días disponibles
            </label>
            <div className="flex flex-wrap gap-2">
              {DAYS_OF_WEEK.map(day => (
                <button
                  key={day}
                  type="button"
                  onClick={() => handleToggleDay(day)}
                  className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${formData.availableDays.includes(day)
                    ? 'bg-cinnabar text-foreground'
                    : 'bg-background/50 text-muted-foreground hover:bg-muted/50'
                    }`}
                >
                  {day.charAt(0).toUpperCase() + day.slice(1)}
                </button>
              ))}
            </div>
          </div>

          <div className="mb-4">
            <label className="block text-foreground text-sm font-medium mb-2">
              Equipamiento disponible
            </label>
            <div className="flex flex-wrap gap-2">
              {EQUIPMENT_OPTIONS.map(equipment => (
                <button
                  key={equipment}
                  type="button"
                  onClick={() => handleToggleEquipment(equipment)}
                  className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${formData.availableEquipment.includes(equipment)
                    ? 'bg-cinnabar text-foreground'
                    : 'bg-background/50 text-muted-foreground hover:bg-muted/50'
                    }`}
                >
                  {equipment.charAt(0).toUpperCase() + equipment.slice(1)}
                </button>
              ))}
            </div>
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
              {editingClientId ? "Editar" : "Agregar"}
            </Button>
          </div>
        </form>
      </Modal>

      <ConfirmModal
        isOpen={isDeleteModalOpen}
        onClose={() => {
          setIsDeleteModalOpen(false);
          setClientToDelete(null);
        }}
        onConfirm={confirmDeleteClient}
        title="Eliminar Cliente"
        message={`¿Estás seguro de que deseas eliminar a "${clientToDelete?.name}"?`}
        confirmText="Eliminar"
        cancelText="Cancelar"
      />
    </div>
  );
}
