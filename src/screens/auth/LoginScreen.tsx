import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';
import { useAuth } from '@/hooks/useAuth';
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
        localStorage.setItem('user', JSON.stringify(user));
        // Redirigir según el rol
        if (user.role === 'admin') {
          navigate('/admin');
        } else if (user.role === 'trainer' || user.isTrainer) {
          navigate('/trainer');
        } else {
          navigate('/home');
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
        <div className="mt-8 p-4 bg-muted rounded-lg border border-border">
          <div className="flex items-start gap-3">
            <span className="text-2xl">ℹ️</span>
            <div className="flex-1">
              <p className="text-foreground text-sm font-semibold mb-2">Credenciales de prueba</p>
              <div className="space-y-1 mb-3">
                <p className="text-foreground text-xs">Admin: admin@coachsport.dev</p>
                <p className="text-foreground text-xs">Entrenador: trainer@coachsport.dev</p>
                <p className="text-foreground text-xs">Cliente: cliente1@coachsport.dev</p>
                <p className="text-foreground text-xs">Cliente: cliente2@coachsport.dev</p>
                <p className="text-foreground text-xs">Cliente: cliente3@coachsport.dev</p>
              </div>
              <p className="text-muted-foreground text-xs">
                <span className="font-medium">Contraseña:</span> Cualquier contraseña funcionará
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
