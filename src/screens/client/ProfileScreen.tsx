import { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Settings, HelpCircle, MessageSquare, LogOut, Camera } from 'lucide-react';

export default function ProfileScreen() {
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [avatarPreview, setAvatarPreview] = useState<string | null>(null);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const handleImageClick = () => {
    fileInputRef.current?.click();
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // Validar que sea una imagen
      if (!file.type.startsWith('image/')) {
        alert('Por favor, selecciona un archivo de imagen válido');
        return;
      }

      // Validar tamaño (máximo 5MB)
      if (file.size > 5 * 1024 * 1024) {
        alert('La imagen no debe superar los 5MB');
        return;
      }

      // Crear preview
      const reader = new FileReader();
      reader.onloadend = () => {
        setAvatarPreview(reader.result as string);
        // TODO: Aquí se subiría la imagen al servidor
        // Por ahora solo mostramos el preview
        console.log('Imagen seleccionada:', file.name);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="bg-background pt-12 pb-6 px-6">
        <h1 className="text-foreground text-2xl font-bold mb-2">Mi Perfil</h1>
      </div>

      <div className="px-6 mb-6">
        <Card>
          <div className="text-center mb-6">
            <div className="relative inline-block mb-4">
              <div className="w-24 h-24 border border-border rounded-full flex items-center justify-center mx-auto overflow-hidden" style={{ backgroundColor: 'var(--card-background)' }}>
                {avatarPreview || user?.avatar ? (
                  <img src={avatarPreview || user?.avatar} alt={user?.name} className="w-full h-full rounded-full object-cover" />
                ) : (
                  <span className="text-foreground text-3xl font-bold">
                    {user?.name.charAt(0).toUpperCase()}
                  </span>
                )}
              </div>
              <button
                onClick={handleImageClick}
                className="absolute bottom-0 right-0 w-8 h-8 bg-cinnabar rounded-full flex items-center justify-center border-2 border-background hover:bg-[#E1322A] transition-colors shadow-lg"
                title="Cambiar foto de perfil"
              >
                <Camera size={16} className="text-foreground" />
              </button>
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className="hidden"
              />
            </div>
            <h2 className="text-foreground text-2xl font-bold mb-1">{user?.name}</h2>
            <p className="text-muted-foreground">{user?.email}</p>
          </div>

          {user?.age && (
            <div className="mb-4 pb-4 border-b border-border">
              <p className="text-muted-foreground text-sm mb-2">Información Personal</p>
              <div className="flex justify-between">
                <span className="text-foreground">Edad</span>
                <span className="text-foreground font-semibold">{user.age} años</span>
              </div>
              {user.weight && (
                <div className="flex justify-between mt-2">
                  <span className="text-foreground">Peso</span>
                  <span className="text-foreground font-semibold">{user.weight} kg</span>
                </div>
              )}
              {user.height && (
                <div className="flex justify-between mt-2">
                  <span className="text-foreground">Altura</span>
                  <span className="text-foreground font-semibold">{user.height} cm</span>
                </div>
              )}
            </div>
          )}

          {user?.objectives && user.objectives.length > 0 && (
            <div className="mb-4">
              <p className="text-muted-foreground text-sm mb-2">Objetivos</p>
              <div className="flex flex-wrap gap-2">
                {user.objectives.map((obj, idx) => (
                  <span key={idx} className="bg-medium-jungle/20 px-3 py-1 rounded text-medium-jungle text-sm">
                    {obj}
                  </span>
                ))}
              </div>
            </div>
          )}

          {user?.level && (
            <div>
              <p className="text-muted-foreground text-sm mb-2">Nivel</p>
              <span className="bg-cinnabar/20 px-3 py-2 rounded text-foreground font-semibold capitalize">
                {user.level}
              </span>
            </div>
          )}
        </Card>
      </div>

      <div className="px-6 mb-6">
        <button
          onClick={() => navigate('/settings')}
          className="w-full border border-border rounded-lg p-4 flex items-center justify-between mb-3 hover:opacity-80 transition-colors"
          style={{ backgroundColor: 'var(--button-background)' }}
        >
          <div className="flex items-center">
            <Settings size={24} className="text-muted-foreground mr-4" />
            <span className="text-foreground">Configuración</span>
          </div>
          <span className="text-muted-foreground">›</span>
        </button>

        <button
          onClick={() => navigate('/help')}
          className="w-full border border-border rounded-lg p-4 flex items-center justify-between mb-3 hover:opacity-80 transition-colors"
          style={{ backgroundColor: 'var(--button-background)' }}
        >
          <div className="flex items-center">
            <HelpCircle size={24} className="text-muted-foreground mr-4" />
            <span className="text-foreground">Ayuda y Soporte</span>
          </div>
          <span className="text-muted-foreground">›</span>
        </button>

        <button
          onClick={() => navigate('/messages')}
          className="w-full bg-muted rounded-lg p-4 flex items-center justify-between hover:bg-muted/80 transition-colors"
        >
          <div className="flex items-center">
            <MessageSquare size={24} className="text-muted-foreground mr-4" />
            <span className="text-foreground">Mensajes</span>
          </div>
          <span className="text-muted-foreground">›</span>
        </button>
      </div>

      <div className="px-6 mb-8">
        <Button variant="outline" onClick={handleLogout} className="w-full flex items-center justify-center">
          <LogOut size={20} className="mr-2" />
          Cerrar Sesión
        </Button>
      </div>
    </div>
  );
}
