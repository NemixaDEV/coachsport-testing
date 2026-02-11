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
import { User } from '@/types';

export default function AdminTrainersScreen() {
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingTrainerId, setEditingTrainerId] = useState<string | null>(null);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [trainerToDelete, setTrainerToDelete] = useState<User | null>(null);
  const [trainers, setTrainers] = useState(allUsers.filter(u => u.role === 'trainer' || u.isTrainer));

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    bio: '',
    certifications: [] as string[],
  });

  const [certificationInput, setCertificationInput] = useState('');
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

    if (trainers.some(t => t.email === formData.email && t.id !== editingTrainerId)) {
      newErrors.email = 'Este email ya está registrado';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleAddCertification = () => {
    if (certificationInput.trim() && !formData.certifications.includes(certificationInput.trim())) {
      setFormData({
        ...formData,
        certifications: [...formData.certifications, certificationInput.trim()],
      });
      setCertificationInput('');
    }
  };

  const handleRemoveCertification = (index: number) => {
    setFormData({
      ...formData,
      certifications: formData.certifications.filter((_, i) => i !== index),
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    if (editingTrainerId) {
      // Actualizar entrenador existente
      setTrainers(trainers.map(trainer =>
        trainer.id === editingTrainerId
          ? {
            ...trainer,
            name: formData.name.trim(),
            email: formData.email.trim(),
            phone: formData.phone.trim() || undefined,
            bio: formData.bio.trim() || undefined,
            certifications: formData.certifications.length > 0 ? formData.certifications : undefined,
          }
          : trainer
      ));
    } else {
      // Crear nuevo entrenador
      const newTrainer: User = {
        id: `trainer-${Date.now()}`,
        name: formData.name.trim(),
        email: formData.email.trim(),
        role: 'trainer',
        isTrainer: true,
        phone: formData.phone.trim() || undefined,
        bio: formData.bio.trim() || undefined,
        certifications: formData.certifications.length > 0 ? formData.certifications : undefined,
        createdAt: new Date(),
      };

      setTrainers([...trainers, newTrainer]);
    }

    // Reset form
    setFormData({
      name: '',
      email: '',
      phone: '',
      bio: '',
      certifications: [],
    });
    setCertificationInput('');
    setErrors({});
    setEditingTrainerId(null);
    setIsModalOpen(false);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditingTrainerId(null);
    setFormData({
      name: '',
      email: '',
      phone: '',
      bio: '',
      certifications: [],
    });
    setCertificationInput('');
    setErrors({});
  };

  const handleEditTrainer = (trainer: User) => {
    setEditingTrainerId(trainer.id);
    setFormData({
      name: trainer.name,
      email: trainer.email,
      phone: trainer.phone || '',
      bio: trainer.bio || '',
      certifications: trainer.certifications || [],
    });
    setCertificationInput('');
    setErrors({});
    setIsModalOpen(true);
  };

  const handleDuplicateTrainer = (trainer: User) => {
    // Encontrar el número de copia más alto existente
    const copyPattern = /^(.+?)\s*\(Copia(\d+)\)$/;
    const baseName = trainer.name;
    let maxCopyNumber = 0;

    trainers.forEach(t => {
      // Si es el nombre original exacto, no cuenta
      if (t.name === baseName) {
        return;
      }

      // Si tiene el patrón (CopiaX), extraer el número
      const match = t.name.match(copyPattern);
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
    const duplicatedTrainer: User = {
      ...trainer,
      id: `trainer-${Date.now()}`,
      name: `${trainer.name} (Copia${newCopyNumber})`,
      email: `copy${newCopyNumber}-${trainer.email}`,
      createdAt: new Date(),
    };

    setTrainers([...trainers, duplicatedTrainer]);
  };

  const handleDeleteTrainer = (trainer: User) => {
    setTrainerToDelete(trainer);
    setIsDeleteModalOpen(true);
  };

  const confirmDeleteTrainer = () => {
    if (trainerToDelete) {
      setTrainers(trainers.filter(t => t.id !== trainerToDelete.id));
      setTrainerToDelete(null);
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
            <h1 className="text-foreground text-2xl font-bold">Gestionar Entrenadores</h1>
            <p className="text-muted-foreground mt-2">{trainers.length} entrenadores</p>
          </div>
          <Button size="sm" onClick={() => setIsModalOpen(true)}>
            <Plus size={20} />
          </Button>
        </div>
      </div>

      <div className="px-6 pb-6">
        {trainers.map(trainer => (
          <Card key={trainer.id} className="mb-4">
            <div className="flex items-center">
              <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mr-4">
                <span className="text-foreground text-2xl font-bold">
                  {trainer.name.charAt(0).toUpperCase()}
                </span>
              </div>
              <div className="flex-1">
                <p className="text-foreground text-lg font-semibold mb-1">{trainer.name}</p>
                <p className="text-muted-foreground text-sm">{trainer.email}</p>
                {trainer.bio && (
                  <p className="text-muted-foreground text-xs mt-1">{trainer.bio}</p>
                )}
              </div>
              <DropdownMenu
                onEdit={() => handleEditTrainer(trainer)}
                onDelete={() => handleDeleteTrainer(trainer)}
                onDuplicate={() => handleDuplicateTrainer(trainer)}
              />
            </div>
          </Card>
        ))}
      </div>

      <Modal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        title={editingTrainerId ? "Editar Entrenador" : "Agregar Nuevo Entrenador"}
      >
        <form onSubmit={handleSubmit}>
          <Input
            label="Nombre completo *"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            error={errors.name}
            placeholder="Ej: Juan Pérez"
            required
          />

          <Input
            label="Email *"
            type="email"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            error={errors.email}
            placeholder="Ej: juan@example.com"
            required
          />

          <Input
            label="Teléfono"
            type="tel"
            value={formData.phone}
            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
            placeholder="Ej: +34 600 123 456"
          />

          <div className="mb-4">
            <label className="block text-foreground text-sm font-medium mb-2">
              Biografía
            </label>
            <textarea
              value={formData.bio}
              onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
              placeholder="Descripción del entrenador, especialidades, experiencia..."
              rows={4}
              className="w-full border border-border rounded-lg px-4 py-3 text-foreground placeholder-muted-foreground focus:outline-none focus:border-cinnabar focus:ring-2 focus:ring-cinnabar/20 resize-none"
              style={{ backgroundColor: 'var(--input-background)' }}
            />
          </div>

          <div className="mb-4">
            <label className="block text-foreground text-sm font-medium mb-2">
              Certificaciones
            </label>
            <div className="flex gap-2 mb-2">
              <input
                type="text"
                value={certificationInput}
                onChange={(e) => setCertificationInput(e.target.value)}
                onKeyPress={(e) => {
                  if (e.key === 'Enter') {
                    e.preventDefault();
                    handleAddCertification();
                  }
                }}
                placeholder="Ej: Certificación Internacional de Calistenia"
                className="flex-1 border border-border rounded-lg px-4 py-2 text-foreground placeholder-muted-foreground focus:outline-none focus:border-cinnabar focus:ring-2 focus:ring-cinnabar/20"
                style={{ backgroundColor: 'var(--input-background)' }}
              />
              <Button
                type="button"
                size="sm"
                variant="secondary"
                onClick={handleAddCertification}
              >
                <Plus size={16} />
              </Button>
            </div>
            {formData.certifications.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {formData.certifications.map((cert, index) => (
                  <span
                    key={index}
                    className="inline-flex items-center gap-2 bg-background/50 px-3 py-1 rounded-full text-sm text-foreground"
                  >
                    {cert}
                    <button
                      type="button"
                      onClick={() => handleRemoveCertification(index)}
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
              {editingTrainerId ? "Editar" : "Agregar"}
            </Button>
          </div>
        </form>
      </Modal>

      <ConfirmModal
        isOpen={isDeleteModalOpen}
        onClose={() => {
          setIsDeleteModalOpen(false);
          setTrainerToDelete(null);
        }}
        onConfirm={confirmDeleteTrainer}
        title="Eliminar Entrenador"
        message={`¿Estás seguro de que deseas eliminar a "${trainerToDelete?.name}"?`}
        confirmText="Eliminar"
        cancelText="Cancelar"
      />
    </div>
  );
}
