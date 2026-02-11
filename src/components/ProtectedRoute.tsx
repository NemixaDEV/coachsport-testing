import { ReactNode } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { useSubscription } from '@/contexts/SubscriptionContext';

interface ProtectedRouteProps {
  children: ReactNode;
  requireSubscription?: boolean;
}

/**
 * Componente que protege rutas basándose en la suscripción del usuario
 * Si requireSubscription es true y el usuario no tiene suscripción activa,
 * redirige a /profile
 * Las rutas /exercises y /progress solo son accesibles para suscripción FULL
 */
export default function ProtectedRoute({ 
  children, 
  requireSubscription = true 
}: ProtectedRouteProps) {
  const { user, loading } = useAuth();
  const { hasActiveSubscription, subscription } = useSubscription();
  const location = useLocation();

  // Esperar a que termine de cargar
  if (loading) {
    return null;
  }

  // Si no requiere suscripción, permitir acceso
  if (!requireSubscription) {
    return <>{children}</>;
  }

  // Si el usuario no es cliente, permitir acceso (admin y trainer siempre tienen acceso)
  if (!user || user.role !== 'client') {
    return <>{children}</>;
  }

  // Si el cliente no tiene suscripción activa, redirigir a perfil
  if (!hasActiveSubscription) {
    return <Navigate to="/profile" replace />;
  }

  // Rutas que requieren suscripción FULL
  const fullPlanOnlyRoutes = ['/exercises', '/progress', '/exercise'];
  const isFullPlanOnlyRoute = fullPlanOnlyRoutes.some(route => 
    location.pathname.startsWith(route)
  );

  // Si la ruta requiere plan FULL y el usuario no lo tiene, redirigir a home
  if (isFullPlanOnlyRoute && subscription?.planId !== 'full') {
    return <Navigate to="/home" replace />;
  }

  // Si tiene suscripción activa, permitir acceso
  return <>{children}</>;
}
