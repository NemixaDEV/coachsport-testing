import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { ChevronDown, ChevronUp } from 'lucide-react';
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';
import { useAuth } from '@/contexts/AuthContext';
import { useTheme } from '@/hooks/useTheme';
import { images } from '@/constants/images';

export default function LoginScreen() {
  const navigate = useNavigate();
  const { login } = useAuth();
  const { isDarkMode } = useTheme();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [showDemoCredentials, setShowDemoCredentials] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) {
      setError('Por favor completa todos los campos');
      return;
    }

    setLoading(true);
    setError('');

    try {
      const user = await login(email, password);
      if (user) {
        // El usuario ya se guarda en localStorage dentro de AuthContext.login
        // Para clientes, verificar suscripción directamente del usuario
        // Redirigir según el rol
        if (user.role === 'admin') {
          navigate('/admin');
        } else if (user.role === 'trainer' || user.isTrainer) {
          navigate('/trainer');
        } else {
          // Si es cliente, verificar si tiene suscripción activa
          const hasSub = user.subscription &&
            user.subscription.isActive &&
            new Date() >= new Date(user.subscription.startDate) &&
            new Date() <= new Date(user.subscription.endDate);

          if (hasSub) {
            navigate('/home');
          } else {
            // Cliente sin suscripción activa, redirigir a perfil
            navigate('/profile');
          }
        }
      } else {
        setError('Credenciales incorrectas');
      }
    } catch (err) {
      setError('Error al iniciar sesión');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-6">
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="text-center mb-12">
          <img
            src={isDarkMode ? images.logoLetrasRojasFondoTransp : images.logoLetrasDegradadoFondoTransp}
            alt="CoachSport Logo"
            className="mb-4 mx-auto max-w-xs"
          />
          <p className="text-muted-foreground">Inicia sesión en tu cuenta</p>
        </div>

        {/* Form */}
        <form onSubmit={handleLogin} className="mb-6">
          <Input
            label="Email"
            type="email"
            placeholder="tu@email.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <Input
            label="Contraseña"
            type="password"
            placeholder="••••••••"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <div className="text-right mb-4">
            <Link to="/forgot-password" className="text-sm text-cinnabar hover:underline">
              ¿Olvidaste tu contraseña?
            </Link>
          </div>
          {error && (
            <p className="text-cinnabar text-sm mb-4">{error}</p>
          )}
          <Button type="submit" loading={loading} className="w-full mb-4">
            Iniciar Sesión
          </Button>
        </form>

        <div className="text-center">
          <p className="text-muted-foreground">
            ¿No tienes cuenta?{' '}
            <Link to="/register" className="text-cinnabar hover:underline">
              Regístrate
            </Link>
          </p>
        </div>

        {/* Demo credentials */}
        <div className="mt-8 bg-muted rounded-lg border border-border overflow-hidden">
          <button
            onClick={() => setShowDemoCredentials(!showDemoCredentials)}
            className="w-full p-4 flex items-center justify-between hover:bg-muted/80 transition-colors"
          >
            <div className="flex items-center gap-3">
              <span className="text-2xl">🚨</span>
              <p className="text-foreground text-sm font-semibold">Datos de Cuentas de Prueba</p>
            </div>
            {showDemoCredentials ? (
              <ChevronUp size={20} className="text-muted-foreground" />
            ) : (
              <ChevronDown size={20} className="text-muted-foreground" />
            )}
          </button>

          {showDemoCredentials && (
            <div className="px-4 pb-4">
              <div className="space-y-1 mb-1">
                <div>
                  <p className="text-foreground text-xs font-medium">👤 Administrador</p>
                  <p className="text-foreground text-sm font-mono bg-background/50 px-2 py-1 rounded">admin@coachsport.dev</p>
                </div>
                <div>
                  <p className="text-foreground text-xs font-medium">🏋️ Entrenador</p>
                  <p className="text-foreground text-sm font-mono bg-background/50 px-2 py-1 rounded">trainer@coachsport.dev</p>
                </div>
                <div>
                  <p className="text-foreground text-xs font-medium">1️⃣ Cliente - Sin suscripción</p>
                  <p className="text-foreground text-sm font-mono bg-background/50 px-2 py-1 rounded">cliente1@coachsport.dev</p>
                </div>
                <div>
                  <p className="text-foreground text-xs font-medium">2️⃣ Cliente - Plan PRO</p>
                  <p className="text-foreground text-sm font-mono bg-background/50 px-2 py-1 rounded">cliente2@coachsport.dev</p>
                </div>
                <div>
                  <p className="text-foreground text-xs font-medium">3️⃣ Cliente - Plan FULL</p>
                  <p className="text-foreground text-sm font-mono bg-background/50 px-2 py-1 rounded">cliente3@coachsport.dev</p>
                </div>
              </div>
              <div className="pt-3 border-t border-border">
                <p className="text-muted-foreground text-xs">
                  <span className="font-medium text-foreground">🔐 Contraseña:</span> Cualquiera funciona (ej: "1234")
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Contact button */}
        <div className="mt-8 text-center">
          <Link to="/contact">
            <Button variant="outline" className="w-full">
              Contáctanos
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
