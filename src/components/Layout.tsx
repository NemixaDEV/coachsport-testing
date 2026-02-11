import { ReactNode, useState, useEffect, useMemo, useRef } from 'react'
import { useAuth } from '../contexts/AuthContext'
import { useSubscription } from '../contexts/SubscriptionContext'
import { useNavigate, useLocation } from 'react-router-dom'
import {
  Home,
  Dumbbell,
  Calendar,
  TrendingUp,
  User,
  Users,
  Settings,
  FileEdit,
  MoreHorizontal,
  ChevronLeft
} from 'lucide-react'

interface LayoutProps {
  children: ReactNode
}

export default function Layout({ children }: LayoutProps) {
  const { user } = useAuth()
  const navigate = useNavigate()
  const location = useLocation()
  const [showMore, setShowMore] = useState(false)

  const isAdmin = user?.role === 'admin'
  const isTrainer = user?.role === 'trainer' || user?.isTrainer
  const isClient = user?.role === 'client'
  const { hasActiveSubscription, subscription } = useSubscription()

  // Debug: Log para verificar el estado de la suscripción
  useEffect(() => {
    if (isClient) {
      console.log('[Layout] Estado de suscripción actualizado:', {
        email: user?.email,
        hasActiveSubscription,
        subscription,
        isClient
      });
    }
  }, [isClient, hasActiveSubscription, subscription, user?.email]);

  // No mostrar navegación en pantallas de entrenamiento
  const showBottomNav = !location.pathname.includes('/workout/')

  // Items de navegación para clientes
  // Si el cliente no tiene suscripción activa, solo mostrar perfil
  // Solo clientes con suscripción FULL pueden ver Ejercicios y Progreso
  const clientNavItems = useMemo(() => {
    console.log('[Layout] Calculando clientNavItems:', {
      isClient,
      hasActiveSubscription,
      userEmail: user?.email,
      userRole: user?.role,
      subscription,
      planId: subscription?.planId
    });
    
    if (isClient && !hasActiveSubscription) {
      console.log('[Layout] Cliente sin suscripción activa, solo mostrando perfil');
      return [
        { path: '/profile', icon: User, label: 'Perfil' },
      ]
    }
    
    // Si tiene suscripción activa, mostrar items según el plan
    const isFullPlan = subscription?.planId === 'full';
    
    const baseItems = [
      { path: '/home', icon: Home, label: 'Inicio' },
      { path: '/routines', icon: Calendar, label: 'Rutinas' },
      { path: '/profile', icon: User, label: 'Perfil' },
    ];
    
    // Solo agregar Ejercicios y Progreso si tiene plan FULL
    if (isFullPlan) {
      baseItems.splice(1, 0, { path: '/exercises', icon: Dumbbell, label: 'Ejercicios' });
      baseItems.splice(3, 0, { path: '/progress', icon: TrendingUp, label: 'Progreso' });
    }
    
    console.log('[Layout] Cliente con suscripción activa, plan:', subscription?.planId, 'items:', baseItems.length);
    return baseItems;
  }, [isClient, hasActiveSubscription, user?.email, subscription])

  // Items de navegación para entrenadores
  const trainerNavItems = [
    { path: '/trainer', icon: Home, label: 'Inicio' },
    { path: '/trainer/clients', icon: Users, label: 'Clientes' },
    { path: '/trainer/routine-editor', icon: FileEdit, label: 'Rutinas' },
    { path: '/profile', icon: User, label: 'Perfil' },
    { path: '/settings', icon: Settings, label: 'Config' },
  ]

  // Items de navegación para administradores
  const adminNavItems = [
    { path: '/admin', icon: Home, label: 'Inicio' },
    { path: '/admin/trainers', icon: Users, label: 'Entrenadores' },
    { path: '/admin/clients', icon: Users, label: 'Clientes' },
    { path: '/admin/exercises', icon: Dumbbell, label: 'Ejercicios' },
    { path: '/profile', icon: User, label: 'Perfil' },
    { path: '/settings', icon: Settings, label: 'Config' },
  ]

  // Determinar qué items de navegación usar
  let navItems = clientNavItems
  if (isAdmin) {
    navItems = adminNavItems
  } else if (isTrainer) {
    navItems = trainerNavItems
  }

  // Función para verificar si una ruta está activa
  const isActive = (path: string) => {
    if (path === '/trainer' || path === '/admin') {
      return location.pathname === path
    }
    return location.pathname.startsWith(path)
  }

  // Dividir items en grupos de 4
  const maxVisible = 4
  const firstGroup = useMemo(() => navItems.slice(0, maxVisible), [navItems])
  const remainingItems = useMemo(() => navItems.slice(maxVisible), [navItems])
  const hasMore = remainingItems.length > 0

  // Resetear showMore solo cuando se navega a una ruta del primer grupo
  // Usamos useRef para rastrear la ruta anterior y evitar resetear cuando el usuario hace clic en "Más"
  const prevPathRef = useRef(location.pathname)
  
  useEffect(() => {
    // Solo resetear si la ruta cambió (navegación), no si solo cambió showMore
    if (prevPathRef.current !== location.pathname) {
      prevPathRef.current = location.pathname
      const activePath = location.pathname
      const isInFirstGroup = firstGroup.some(item => {
        if (item.path === '/trainer' || item.path === '/admin') {
          return activePath === item.path
        }
        return activePath.startsWith(item.path)
      })
      // Solo resetear si estamos en el primer grupo Y showMore está activo
      if (isInFirstGroup && showMore) {
        setShowMore(false)
      }
    }
  }, [location.pathname, firstGroup, showMore])

  const handleItemClick = (path: string) => {
    navigate(path)
  }

  return (
    <div className="h-screen bg-background flex flex-col" style={{ height: '100dvh' }}>
      <main className="flex-1 pb-20 overflow-y-auto">
        {children}
      </main>

      {showBottomNav && (
        <nav
          className="fixed bottom-0 left-0 right-0 border-t border-border h-20 z-50 shadow-2xl overflow-hidden"
          style={{
            backgroundColor: 'var(--navbar-background)',
            position: 'fixed',
            bottom: 0,
            left: 0,
            right: 0,
            zIndex: 50
          }}
        >
          <div
            className="flex h-full transition-transform duration-300 ease-in-out"
            style={{
              width: hasMore ? '200vw' : '100vw',
              transform: showMore ? 'translateX(-100vw)' : 'translateX(0)'
            }}
          >
            {/* Primera página de iconos */}
            <div className="flex justify-around items-center h-full flex-shrink-0" style={{ width: '100vw' }}>
              {firstGroup.map((item) => {
                const Icon = item.icon
                const active = isActive(item.path)
                return (
                  <button
                    key={item.path}
                    onClick={() => handleItemClick(item.path)}
                    className={`flex flex-col items-center justify-center px-4 py-2 transition-colors ${active ? 'text-cinnabar' : 'text-muted-foreground'
                      }`}
                  >
                    <Icon size={24} />
                    <span className="text-xs mt-1">{item.label}</span>
                  </button>
                )
              })}
              {hasMore && (
                <button
                  onClick={(e) => {
                    e.preventDefault()
                    e.stopPropagation()
                    setShowMore(true)
                  }}
                  className="flex flex-col items-center justify-center px-4 py-2 transition-colors text-muted-foreground hover:text-foreground cursor-pointer"
                >
                  <MoreHorizontal size={24} />
                  <span className="text-xs mt-1">Más</span>
                </button>
              )}
            </div>

            {/* Segunda página de iconos */}
            {hasMore && (
              <div className="flex justify-around items-center h-full flex-shrink-0" style={{ width: '100vw' }}>
                <button
                  onClick={(e) => {
                    e.preventDefault()
                    e.stopPropagation()
                    setShowMore(false)
                  }}
                  className="flex flex-col items-center justify-center px-4 py-2 transition-colors text-muted-foreground hover:text-foreground cursor-pointer"
                >
                  <ChevronLeft size={24} />
                  <span className="text-xs mt-1">Volver</span>
                </button>
                {remainingItems.map((item) => {
                  const Icon = item.icon
                  const active = isActive(item.path)
                  return (
                    <button
                      key={item.path}
                      onClick={() => handleItemClick(item.path)}
                      className={`flex flex-col items-center justify-center px-4 py-2 transition-colors ${active ? 'text-cinnabar' : 'text-muted-foreground'
                        }`}
                    >
                      <Icon size={24} />
                      <span className="text-xs mt-1">{item.label}</span>
                    </button>
                  )
                })}
              </div>
            )}
          </div>
        </nav>
      )}
    </div>
  )
}
