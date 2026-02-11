import { createContext, useContext, useMemo, ReactNode } from 'react';
import { User } from '@/types';
import { useAuth } from './AuthContext';

interface SubscriptionContextType {
  hasActiveSubscription: boolean;
  subscription: User['subscription'] | null;
  isRecurring: boolean;
}

const SubscriptionContext = createContext<SubscriptionContextType | undefined>(undefined);

export const useSubscription = () => {
  const context = useContext(SubscriptionContext);
  if (!context) {
    throw new Error('useSubscription debe usarse dentro de SubscriptionProvider');
  }
  return context;
};

/**
 * Convierte una fecha a objeto Date, manejando tanto Date como string
 */
function toDate(date: Date | string | any): Date {
  if (date instanceof Date) {
    if (isNaN(date.getTime())) {
      return new Date();
    }
    return date;
  }
  if (typeof date === 'string') {
    const parsed = new Date(date);
    if (isNaN(parsed.getTime())) {
      return new Date();
    }
    return parsed;
  }
  if (date && typeof date === 'object') {
    const parsed = new Date(date);
    if (isNaN(parsed.getTime())) {
      return new Date();
    }
    return parsed;
  }
  return new Date(date);
}

/**
 * Verifica si un usuario cliente tiene una suscripción activa
 */
function checkActiveSubscription(user: User | null): boolean {
  // Si no es un cliente, siempre tiene acceso
  if (!user || user.role !== 'client') {
    return true;
  }

  // Si no tiene suscripción, no tiene acceso
  if (!user.subscription) {
    console.log('[checkActiveSubscription] Usuario sin suscripción:', user.email);
    return false;
  }

  // Verificar que la suscripción esté activa
  if (!user.subscription.isActive) {
    console.log('[checkActiveSubscription] Suscripción inactiva:', user.email);
    return false;
  }

  // Verificar que la fecha actual esté entre startDate y endDate
  const now = new Date();
  let startDate: Date;
  let endDate: Date;

  try {
    // Convertir fechas usando la función helper
    startDate = toDate(user.subscription.startDate);
    endDate = toDate(user.subscription.endDate);

    // Verificar que las fechas sean válidas
    if (isNaN(startDate.getTime()) || isNaN(endDate.getTime())) {
      console.log('[checkActiveSubscription] Fechas inválidas:', {
        email: user.email,
        startDate: user.subscription.startDate,
        endDate: user.subscription.endDate,
        startDateType: typeof user.subscription.startDate,
        endDateType: typeof user.subscription.endDate
      });
      return false;
    }

    // Convertir fechas a timestamps para comparación
    const nowTime = now.getTime();
    const startTime = startDate.getTime();
    const endTime = endDate.getTime();

    const isActive = nowTime >= startTime && nowTime <= endTime;

    console.log('[checkActiveSubscription] Verificación:', {
      email: user.email,
      now: now.toISOString(),
      startDate: startDate.toISOString(),
      endDate: endDate.toISOString(),
      nowTime,
      startTime,
      endTime,
      isActive,
      isActiveFlag: user.subscription.isActive
    });

    // La suscripción está activa si la fecha actual está entre startDate y endDate
    return isActive;
  } catch (error) {
    console.error('[checkActiveSubscription] Error:', error, user);
    return false;
  }
}

interface SubscriptionProviderProps {
  children: ReactNode;
}

export const SubscriptionProvider = ({ children }: SubscriptionProviderProps) => {
  const { user } = useAuth();

  // Crear una clave única para forzar recálculo cuando cambie el usuario o su suscripción
  // Usar JSON.stringify para las fechas para que detecte cambios incluso si son el mismo objeto Date
  const subscriptionKey = user 
    ? `${user.id}-${user.subscription?.isActive}-${user.subscription?.startDate ? (user.subscription.startDate instanceof Date ? user.subscription.startDate.toISOString() : String(user.subscription.startDate)) : 'no-start'}-${user.subscription?.endDate ? (user.subscription.endDate instanceof Date ? user.subscription.endDate.toISOString() : String(user.subscription.endDate)) : 'no-end'}`
    : 'no-user';

  const subscriptionData = useMemo(() => {
    console.log('[SubscriptionProvider] Recalculando suscripción para:', user?.email);
    
    // Asegurar que las fechas del usuario estén convertidas a Date si vienen de localStorage
    let userWithDates = user;
    if (user && user.subscription) {
      const startDate = user.subscription.startDate instanceof Date 
        ? user.subscription.startDate 
        : new Date(user.subscription.startDate);
      const endDate = user.subscription.endDate instanceof Date 
        ? user.subscription.endDate 
        : new Date(user.subscription.endDate);
      
      userWithDates = {
        ...user,
        subscription: {
          ...user.subscription,
          startDate,
          endDate,
        }
      };
      
      console.log('[SubscriptionProvider] Fechas convertidas:', {
        email: user.email,
        originalStartDate: user.subscription.startDate,
        convertedStartDate: startDate.toISOString(),
        originalEndDate: user.subscription.endDate,
        convertedEndDate: endDate.toISOString(),
        isActive: user.subscription.isActive
      });
    }

    const hasActive = checkActiveSubscription(userWithDates);
    const subscription = userWithDates?.subscription || null;
    const isRecurring = subscription?.autoRenew || false;

    console.log('[SubscriptionProvider] Resultado final:', {
      email: user?.email,
      hasActive,
      subscription,
      isRecurring
    });

    return {
      hasActiveSubscription: hasActive,
      subscription,
      isRecurring,
    };
  }, [user, subscriptionKey]);

  return (
    <SubscriptionContext.Provider value={subscriptionData}>
      {children}
    </SubscriptionContext.Provider>
  );
};
