import { ReactNode, useState, useEffect, useMemo } from 'react'
import { useAuth } from '../hooks/useAuth'
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

  // No mostrar navegación en pantallas de entrenamiento
  const showBottomNav = !location.pathname.includes('/workout/')

  // Items de navegación para clientes
  const clientNavItems = [
    { path: '/home', icon: Home, label: 'Inicio' },
    { path: '/exercises', icon: Dumbbell, label: 'Ejercicios' },
    { path: '/routines', icon: Calendar, label: 'Rutinas' },
    { path: '/progress', icon: TrendingUp, label: 'Progreso' },
    { path: '/profile', icon: User, label: 'Perfil' },
  ]

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

  // Resetear showMore si la ruta activa está en el primer grupo (solo cuando navega, no cuando hace clic en "Más")
  useEffect(() => {
    const activePath = location.pathname
    const isInFirstGroup = firstGroup.some(item => {
      if (item.path === '/trainer' || item.path === '/admin') {
        return activePath === item.path
      }
      return activePath.startsWith(item.path)
    })
    // Solo resetear si estamos en el primer grupo Y showMore está activo
    // Esto permite que el usuario navegue manualmente con el botón "Más"
    if (isInFirstGroup && showMore) {
      // Pequeño delay para evitar conflictos con el clic
      const timer = setTimeout(() => {
        setShowMore(false)
      }, 100)
      return () => clearTimeout(timer)
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
              transform: showMore ? 'translateX(-50%)' : 'translateX(0)'
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
