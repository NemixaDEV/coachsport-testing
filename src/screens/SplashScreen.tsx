import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { useSubscription } from '@/contexts/SubscriptionContext';
import { images } from '@/constants/images';

export default function SplashScreen() {
  const navigate = useNavigate();
  const { isAuthenticated, loading, user } = useAuth();
  const { hasActiveSubscription } = useSubscription();

  useEffect(() => {
    if (!loading) {
      const timer = setTimeout(() => {
        if (isAuthenticated && user) {
          // Redirigir según el rol
          if (user.role === 'admin') {
            navigate('/admin');
          } else if (user.role === 'trainer' || user.isTrainer) {
            navigate('/trainer');
          } else {
            // Si es cliente, verificar si tiene suscripción activa
            if (hasActiveSubscription) {
              navigate('/home');
            } else {
              // Cliente sin suscripción activa, redirigir a perfil
              navigate('/profile');
            }
          }
        } else {
          navigate('/login');
        }
      }, 2000);

      return () => clearTimeout(timer);
    }
  }, [loading, isAuthenticated, user, navigate]);

  return (
    <div className="flex-1 bg-background flex items-center justify-center min-h-screen relative overflow-hidden">
      {/* Capa base con degradado principal - azul oscuro a más oscuro */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#002b36] via-[#003d4a] to-[#001a20]" />

      {/* Capa de acento con degradado radial del color secundario (rojo) */}
      <div
        className="absolute inset-0 opacity-60"
        style={{
          background: 'radial-gradient(circle at 30% 50%, rgba(255, 59, 48, 0.25) 0%, rgba(255, 59, 48, 0.1) 40%, transparent 70%)'
        }}
      />

      {/* Capa superior con degradado diagonal que combina ambos colores */}
      <div className="absolute inset-0 bg-gradient-to-br from-transparent via-[#002b36]/50 to-[#ff3b30]/15" />

      {/* Efecto de brillo sutil en la esquina superior derecha con el color secundario */}
      <div
        className="absolute top-0 right-0 w-96 h-96 blur-3xl opacity-30"
        style={{
          background: 'radial-gradient(circle, rgba(255, 59, 48, 0.2) 0%, transparent 70%)'
        }}
      />

      {/* Contenido */}
      <div className="relative z-10 flex flex-col items-center text-center">
        <img
          src={images.logoLetrasRojasFondoTransp}
          alt="CoachSport Logo"
          className="mb-6 mx-auto max-w-xs drop-shadow-2xl"
        />
        <p className="text-white text-base drop-shadow-lg">Tu entrenador personal</p>

        {/* Loading profesional mientras se carga la app */}
        <div className="mt-10 flex flex-col items-center gap-3 w-full max-w-xs px-4">
          <p className="text-sm text-white/80 mb-2">Cargando...</p>
          {/* Barra de carga horizontal */}
          <div className="w-full h-2 bg-white/10 rounded-full overflow-hidden relative">
            {/* Efecto tipo spinner horizontal - onda que se mueve continuamente */}
            <div className="absolute inset-y-0 left-0 w-1/3 bg-gradient-to-r from-[#ff3b30] via-[#ff5a4f] to-[#ff6b5f] rounded-full loading-bar" />
          </div>
        </div>
      </div>
    </div>
  );
}
