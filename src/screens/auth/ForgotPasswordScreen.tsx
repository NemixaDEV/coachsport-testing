import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';
import { useTheme } from '@/hooks/useTheme';
import { images } from '@/constants/images';

export default function ForgotPasswordScreen() {
  const navigate = useNavigate();
  const { isDarkMode } = useTheme();
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) {
      setError('Por favor ingresa tu email');
      return;
    }

    // Validar formato de email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setError('Por favor ingresa un email válido');
      return;
    }

    setLoading(true);
    setError('');

    try {
      // Simular envío de email de recuperación
      // En una aplicación real, aquí se haría una llamada a la API
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      setSuccess(true);
    } catch (err) {
      setError('Error al enviar el email de recuperación. Por favor intenta nuevamente.');
    } finally {
      setLoading(false);
    }
  };

  if (success) {
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
          </div>

          {/* Mensaje de éxito */}
          <div className="text-center mb-6">
            <div className="mb-4">
              <span className="text-5xl">📧</span>
            </div>
            <h2 className="text-2xl font-bold text-foreground mb-2">
              Email enviado
            </h2>
            <p className="text-muted-foreground mb-6">
              Hemos enviado un enlace de recuperación a <strong className="text-foreground">{email}</strong>. 
              Por favor revisa tu bandeja de entrada y sigue las instrucciones para restablecer tu contraseña.
            </p>
            <p className="text-sm text-muted-foreground mb-6">
              Si no recibes el email en unos minutos, revisa tu carpeta de spam.
            </p>
            <Button 
              onClick={() => navigate('/login')} 
              className="w-full mb-4"
            >
              Volver al inicio de sesión
            </Button>
          </div>
        </div>
      </div>
    );
  }

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
          <p className="text-muted-foreground">Recupera tu contraseña</p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="mb-6">
          <p className="text-muted-foreground text-sm mb-6">
            Ingresa tu email y te enviaremos un enlace para restablecer tu contraseña.
          </p>
          <Input
            label="Email"
            type="email"
            placeholder="tu@email.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          {error && (
            <p className="text-cinnabar text-sm mb-4">{error}</p>
          )}
          <Button type="submit" loading={loading} className="w-full mb-4">
            Enviar enlace de recuperación
          </Button>
        </form>

        <div className="text-center">
          <Link to="/login" className="text-cinnabar hover:underline text-sm">
            ← Volver al inicio de sesión
          </Link>
        </div>
      </div>
    </div>
  );
}
