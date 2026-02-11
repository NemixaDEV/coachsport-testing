import { useNavigate } from 'react-router-dom';
import { Card } from '@/components/ui/Card';
import { Modal } from '@/components/ui/Modal';
import { Button } from '@/components/ui/Button';
import { ArrowLeft, CreditCard, Trash2, AlertTriangle } from 'lucide-react';
import { useState } from 'react';
import { useTheme } from '@/hooks/useTheme';
import { useAuth } from '@/contexts/AuthContext';

export default function SettingsScreen() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [notifications, setNotifications] = useState(true);
  const { isDarkMode, setDarkMode } = useTheme();
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  
  const isTrainer = user?.role === 'trainer' || user?.isTrainer;

  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat('es-AR', {
      day: '2-digit',
      month: 'long',
      year: 'numeric'
    }).format(new Date(date));
  };

  const subscription = user?.subscription;

  const handleDeleteAccount = async () => {
    setIsDeleting(true);
    try {
      // Aquí se enviaría la solicitud al backend para eliminar la cuenta
      // El backend enviaría un correo de confirmación
      // Por ahora simulamos la acción
      await new Promise(resolve => setTimeout(resolve, 1500));

      // Simulación: mostrar mensaje de éxito
      alert('Se ha enviado un correo electrónico a tu cuenta para confirmar la eliminación. Por favor, revisa tu bandeja de entrada.');
      setShowDeleteModal(false);
    } catch (error) {
      console.error('Error al solicitar eliminación de cuenta:', error);
      alert('Hubo un error al procesar tu solicitud. Por favor, intenta nuevamente.');
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="bg-background pt-12 pb-6 px-6">
        <button onClick={() => navigate(-1)} className="mb-4">
          <ArrowLeft size={24} className="text-foreground" />
        </button>
        <h1 className="text-foreground text-2xl font-bold">Configuración</h1>
      </div>

      <div className="px-6 pb-6">
        <Card className="mb-4">
          <div className="flex items-center justify-between mb-4">
            <div className="flex-1">
              <p className="text-foreground font-semibold mb-1">Notificaciones</p>
              <p className="text-muted-foreground text-sm">Recibir notificaciones de entrenamientos</p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={notifications}
                onChange={(e) => setNotifications(e.target.checked)}
                className="sr-only peer"
              />
              <div className="w-11 h-6 border border-border peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-secondary" style={{ backgroundColor: 'var(--muted)' }}></div>
            </label>
          </div>
        </Card>

        <Card className="mb-4">
          <div className="flex items-center justify-between">
            <div className="flex-1">
              <p className="text-foreground font-semibold mb-1">Modo Oscuro</p>
              <p className="text-muted-foreground text-sm">
                {isDarkMode ? 'Tema oscuro activado' : 'Tema claro activado'}
              </p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={isDarkMode}
                onChange={(e) => setDarkMode(e.target.checked)}
                className="sr-only peer"
              />
              <div className="w-11 h-6 border border-border peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-secondary" style={{ backgroundColor: 'var(--muted)' }}></div>
            </label>
          </div>
        </Card>

        {/* Botón de Gestionar Suscripciones - Solo para clientes, no para entrenadores */}
        {!isTrainer && (
          <button
            onClick={() => navigate('/subscriptions')}
            className="w-full border border-border rounded-lg p-4 mb-4 hover:opacity-80 transition-colors flex items-center justify-between"
            style={{ backgroundColor: 'var(--button-background)' }}
          >
            <div className="flex items-center">
              <CreditCard size={24} className="text-muted-foreground mr-4" />
              <div className="flex-1 text-left">
                <span className="text-foreground font-semibold block">Gestionar Suscripciones</span>
                {subscription && subscription.isActive ? (
                  <span className="text-muted-foreground text-xs">
                    Plan {subscription.planId.charAt(0).toUpperCase() + subscription.planId.slice(1)} activo hasta {formatDate(subscription.endDate)}
                  </span>
                ) : (
                  <span className="text-muted-foreground text-xs">No tienes un plan activo</span>
                )}
              </div>
            </div>
            <span className="text-muted-foreground">›</span>
          </button>
        )}

        <button
          onClick={() => navigate('/privacy')}
          className="w-full border border-border rounded-lg p-4 mb-4 hover:opacity-80 transition-colors"
          style={{ backgroundColor: 'var(--button-background)' }}
        >
          <span className="text-foreground font-semibold">Privacidad</span>
        </button>

        <button
          onClick={() => navigate('/about')}
          className="w-full border border-border rounded-lg p-4 mb-4 hover:opacity-80 transition-colors"
          style={{ backgroundColor: 'var(--button-background)' }}
        >
          <span className="text-foreground font-semibold">Acerca de</span>
        </button>

        {/* Sección de Eliminar Cuenta */}
        <div className="mt-8 pt-6 border-t border-border">
          <button
            onClick={() => setShowDeleteModal(true)}
            className="w-full border-2 border-red-500/50 rounded-lg p-4 hover:bg-red-500/10 transition-colors flex items-center justify-center"
            style={{ backgroundColor: 'transparent' }}
          >
            <Trash2 size={20} className="text-red-500 mr-2" />
            <span className="text-red-500 font-semibold">Eliminar Cuenta</span>
          </button>
        </div>
      </div>

      {/* Modal de Confirmación de Eliminación */}
      <Modal
        isOpen={showDeleteModal}
        onClose={() => !isDeleting && setShowDeleteModal(false)}
        title="Eliminar Cuenta"
      >
        <div className="space-y-4">
          <div className="flex items-start space-x-3">
            <AlertTriangle size={24} className="text-red-500 flex-shrink-0 mt-0.5" />
            <div className="flex-1">
              <p className="text-foreground font-semibold mb-2">¿Estás seguro de que deseas eliminar tu cuenta?</p>
              <p className="text-muted-foreground text-sm mb-2">
                Esta acción es <strong className="text-foreground">irreversible</strong>. Al confirmar, se enviará un correo electrónico a <strong className="text-foreground">{user?.email}</strong> para que puedas terminar de confirmar o desistir de la eliminación.
              </p>
              <p className="text-muted-foreground text-sm">
                Si confirmas la eliminación, perderás acceso permanente a todos tus datos, rutinas, progreso y configuraciones.
              </p>
            </div>
          </div>

          <div className="flex space-x-3 pt-4">
            <Button
              variant="outline"
              onClick={() => setShowDeleteModal(false)}
              disabled={isDeleting}
              className="flex-1"
            >
              Cancelar
            </Button>
            <Button
              variant="primary"
              onClick={handleDeleteAccount}
              disabled={isDeleting}
              loading={isDeleting}
              className="flex-1 bg-red-500 hover:bg-red-600 active:bg-red-700"
            >
              {isDeleting ? 'Enviando...' : 'Confirmar'}
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
}
