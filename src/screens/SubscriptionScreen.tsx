import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Modal } from '@/components/ui/Modal';
import { ArrowLeft, CreditCard, Check, Crown, Zap, Star, Calendar } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { images } from '@/constants/images';

interface SubscriptionPlan {
  id: string;
  name: string;
  price: number;
  description: string;
  features: string[];
  icon: React.ReactNode;
  popular?: boolean;
}

export default function SubscriptionScreen() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [selectedPlan, setSelectedPlan] = useState<string | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [modalPlan, setModalPlan] = useState<SubscriptionPlan | null>(null);
  const [autoRenew, setAutoRenew] = useState(user?.subscription?.autoRenew ?? false);

  const plans: SubscriptionPlan[] = [
    {
      id: 'basic',
      name: 'Basic',
      price: 20000,
      description: 'Plan ideal para comenzar tu entrenamiento',
      features: [
        'Acceso a rutinas básicas',
        'Seguimiento de progreso',
        'Soporte por email'
      ],
      icon: <Star size={24} className="text-foreground" />
    },
    {
      id: 'pro',
      name: 'Pro',
      price: 30000,
      description: 'Para quienes buscan resultados profesionales',
      features: [
        'Todo lo del plan Basic',
        'Rutinas personalizadas',
        'Chat directo con entrenador',
        'Análisis detallado de progreso'
      ],
      icon: <Zap size={24} className="text-foreground" />,
      popular: true
    },
    {
      id: 'full',
      name: 'Full',
      price: 50000,
      description: 'Experiencia completa y premium',
      features: [
        'Todo lo del plan Pro',
        'Entrenador personal dedicado',
        'Plan nutricional incluido',
        'Video llamadas ilimitadas',
        'Prioridad en soporte'
      ],
      icon: <Crown size={24} className="text-foreground" />
    }
  ];

  const handleSubscribeClick = (planId: string) => {
    const plan = plans.find(p => p.id === planId);
    if (plan) {
      setModalPlan(plan);
      setShowModal(true);
    }
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setModalPlan(null);
  };

  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat('es-AR', {
      day: '2-digit',
      month: 'long',
      year: 'numeric'
    }).format(new Date(date));
  };

  const getCurrentPlan = () => {
    if (!user?.subscription || !user.subscription.isActive) {
      return null;
    }
    return plans.find(p => p.id === user.subscription!.planId);
  };

  const currentPlan = getCurrentPlan();
  const subscription = user?.subscription;

  // Sincronizar el estado de autoRenew con el usuario
  useEffect(() => {
    setAutoRenew(user?.subscription?.autoRenew ?? false);
  }, [user?.subscription?.autoRenew]);

  return (
    <div className="min-h-screen bg-background">
      <div className="bg-background pt-12 pb-6 px-6">
        <button onClick={() => navigate(-1)} className="mb-4">
          <ArrowLeft size={24} className="text-foreground" />
        </button>
        <h1 className="text-foreground text-2xl font-bold">Gestionar Suscripciones</h1>
      </div>

      <div className="px-6 pb-6">
        {/* Card 1: Plan de Suscripción Actual */}
        <Card className="mb-4">
          <div className="mb-4">
            <div className="flex items-center mb-2">
              <CreditCard size={20} className="text-foreground mr-2" />
              <h2 className="text-foreground text-xl font-bold">Plan de Suscripción</h2>
            </div>
            <p className="text-muted-foreground text-sm">Gestiona tu plan actual y configura la renovación</p>
          </div>

          {/* Estado Actual de la Suscripción */}
          {subscription && subscription.isActive && currentPlan ? (
            <>
              <div className="mb-4 p-4 rounded-lg border-2 border-medium-jungle bg-medium-jungle/10">
                <div className="flex items-center mb-3">
                  <div className="mr-3">{currentPlan.icon}</div>
                  <div className="flex-1">
                    <h3 className="text-foreground font-bold text-lg">Plan Actual: {currentPlan.name}</h3>
                    <p className="text-muted-foreground text-sm">{currentPlan.description}</p>
                  </div>
                </div>
                <div className="flex items-center mt-3 pt-3 border-t border-border">
                  <Calendar size={16} className="text-foreground mr-2" />
                  <div className="flex-1">
                    <p className="text-muted-foreground text-xs mb-1">Período de suscripción</p>
                    <p className="text-foreground text-sm font-semibold">
                      Desde: {formatDate(subscription.startDate)}
                    </p>
                    <p className="text-foreground text-sm font-semibold">
                      Hasta: {formatDate(subscription.endDate)}
                    </p>
                  </div>
                </div>
              </div>
              
              {/* Switch de Renovación Automática */}
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <p className="text-foreground font-semibold mb-1">Renovación Automática</p>
                  <p className="text-muted-foreground text-sm">
                    {autoRenew 
                      ? 'Tu suscripción se renovará automáticamente cada mes' 
                      : 'Tu suscripción no se renovará automáticamente'}
                  </p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={autoRenew}
                    onChange={(e) => {
                      setAutoRenew(e.target.checked);
                      // Aquí se actualizaría la suscripción en el backend
                      // Por ahora solo actualizamos el estado local
                    }}
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 border border-border peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-medium-jungle" style={{ backgroundColor: 'var(--muted)' }}></div>
                </label>
              </div>
            </>
          ) : (
            <div className="p-4 rounded-lg border-2 border-border bg-muted/30">
              <div className="flex items-center">
                <CreditCard size={20} className="text-muted-foreground mr-3" />
                <div>
                  <p className="text-foreground font-semibold">No tienes un plan activo</p>
                  <p className="text-muted-foreground text-sm">Selecciona un plan para comenzar</p>
                </div>
              </div>
            </div>
          )}
        </Card>

        {/* Card 2: Cambiar de Plan / Planes Disponibles */}
        <Card className="mb-4">
          <div className="mb-4">
            <div className="flex items-center mb-2">
              <CreditCard size={20} className="text-foreground mr-2" />
              <h2 className="text-foreground text-xl font-bold">
                {subscription && subscription.isActive ? 'Cambiar de Plan' : 'Planes Disponibles'}
              </h2>
            </div>
            <p className="text-muted-foreground text-sm">
              {subscription && subscription.isActive 
                ? 'Elige un nuevo plan o renueva el actual' 
                : 'Selecciona el plan que mejor se adapte a tus necesidades'}
            </p>
          </div>

          <div className="space-y-4">
            {plans.map((plan) => (
              <div
                key={plan.id}
                className={`border-2 rounded-lg p-4 transition-all ${
                  selectedPlan === plan.id
                    ? 'border-cinnabar bg-cinnabar/10'
                    : plan.popular
                    ? 'border-medium-jungle bg-medium-jungle/10'
                    : 'border-border'
                }`}
              >
                {plan.popular && (
                  <div className="flex items-center justify-center mb-2">
                    <span className="bg-medium-jungle text-foreground text-xs font-semibold px-3 py-1 rounded-full">
                      Más Popular
                    </span>
                  </div>
                )}
                
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center">
                    <div className="mr-3">{plan.icon}</div>
                    <div>
                      <h3 className="text-foreground font-bold text-lg">{plan.name}</h3>
                      <p className="text-muted-foreground text-sm">{plan.description}</p>
                    </div>
                  </div>
                </div>

                <div className="mb-3">
                  <div className="flex items-baseline mb-2">
                    <span className="text-foreground text-2xl font-bold">${plan.price.toLocaleString('es-AR')}</span>
                    <span className="text-muted-foreground text-sm ml-1">ARS/mes</span>
                  </div>
                </div>

                <ul className="mb-4 space-y-2">
                  {plan.features.map((feature, idx) => (
                    <li key={idx} className="flex items-start">
                      <Check size={16} className="text-medium-jungle mr-2 mt-0.5 flex-shrink-0" />
                      <span className="text-foreground text-sm">{feature}</span>
                    </li>
                  ))}
                </ul>

                <Button
                  variant={plan.popular ? 'positive' : 'primary'}
                  className="w-full"
                  onClick={() => {
                    setSelectedPlan(plan.id);
                    handleSubscribeClick(plan.id);
                  }}
                >
                  {subscription && subscription.isActive && subscription.planId === plan.id
                    ? 'Renovar Plan'
                    : subscription && subscription.isActive
                    ? 'Cambiar a este Plan'
                    : 'Suscribirse'}
                </Button>
              </div>
            ))}
          </div>

          <div className="mt-4 pt-4 border-t border-border">
            <p className="text-muted-foreground text-xs text-center">
              Los pagos se procesan de forma segura a través de MercadoPago
            </p>
          </div>
        </Card>
      </div>

      {/* Modal de Confirmación de MercadoPago */}
      <Modal isOpen={showModal} onClose={handleCloseModal}>
        <div className="text-center">
          <div className="mb-6 flex justify-center">
            {/* Logo de MercadoPago */}
            <img
              src={images.mercadoPagoLogo}
              alt="Mercado Pago"
              className="max-w-[200px] h-auto"
            />
          </div>
          
          <h3 className="text-foreground text-lg font-bold mb-3">
            {modalPlan ? `Plan ${modalPlan.name}` : 'Confirmar Suscripción'}
          </h3>
          
          <p className="text-muted-foreground text-sm mb-4">
            Al continuar, estarás saliendo de la aplicación y serás redirigido a la plataforma de pago de MercadoPago para completar tu suscripción.
          </p>

          {modalPlan && (
            <div className="mb-4 p-3 rounded-lg border border-border" style={{ backgroundColor: 'var(--muted)' }}>
              <p className="text-foreground text-sm mb-1">
                <span className="font-semibold">Plan:</span> {modalPlan.name}
              </p>
              <p className="text-foreground text-sm">
                <span className="font-semibold">Precio:</span> ${modalPlan.price.toLocaleString('es-AR')} ARS/mes
              </p>
            </div>
          )}

          <Button
            variant="primary"
            className="w-full"
            onClick={(e) => {
              e.preventDefault();
              // El botón no funciona por el momento
            }}
          >
            Continuar a MercadoPago
          </Button>

          <button
            onClick={handleCloseModal}
            className="mt-3 text-muted-foreground text-sm hover:text-foreground transition-colors"
          >
            Cancelar
          </button>
        </div>
      </Modal>
    </div>
  );
}
