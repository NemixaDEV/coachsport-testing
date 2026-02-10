import { useNavigate } from 'react-router-dom';
import { Card } from '@/components/ui/Card';
import { ArrowLeft } from 'lucide-react';
import { useState } from 'react';
import { useTheme } from '@/hooks/useTheme';

export default function SettingsScreen() {
  const navigate = useNavigate();
  const [notifications, setNotifications] = useState(true);
  const { isDarkMode, setDarkMode } = useTheme();

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
              <div className="w-11 h-6 border border-border peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-secondary" style={{ backgroundColor: 'var(--button-background)' }}></div>
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
              <div className="w-11 h-6 border border-border peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-secondary" style={{ backgroundColor: 'var(--button-background)' }}></div>
            </label>
          </div>
        </Card>

        <button className="w-full border border-border rounded-lg p-4 mb-4 hover:opacity-80 transition-colors" style={{ backgroundColor: 'var(--button-background)' }}>
          <span className="text-foreground font-semibold">Privacidad</span>
        </button>

        <button className="w-full border border-border rounded-lg p-4 mb-4 hover:opacity-80 transition-colors" style={{ backgroundColor: 'var(--button-background)' }}>
          <span className="text-foreground font-semibold">Idioma</span>
        </button>
      </div>
    </div>
  );
}
