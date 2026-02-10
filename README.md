# CoachSport - Aplicación Web para Testing

Aplicación web responsive para gestión de entrenamientos de calistenia, construida con React, TypeScript, Vite y TailwindCSS.

## 🚀 Características

- **Autenticación completa**: Login, registro y configuración de perfil
- **Biblioteca de ejercicios**: Catálogo completo con videos, descripciones y variaciones
- **Rutinas personalizadas**: Creación y seguimiento de rutinas de entrenamiento
- **Seguimiento de progreso**: Estadísticas, gráficas e historial de entrenamientos
- **Panel del entrenador**: Gestión de clientes y creación de rutinas
- **Panel de administración**: Gestión completa de usuarios, entrenadores y ejercicios
- **Diseño responsive**: Optimizado para móvil, tablet y desktop

## 📱 Pantallas Implementadas

### Cliente
- ✅ Splash Screen
- ✅ Login / Registro
- ✅ Configuración de perfil
- ✅ Inicio (Home)
- ✅ Biblioteca de ejercicios
- ✅ Detalle de ejercicio
- ✅ Rutinas
- ✅ Detalle de rutina
- ✅ Entrenamiento activo
- ✅ Completado de entrenamiento
- ✅ Progreso y estadísticas
- ✅ Perfil
- ✅ Configuración
- ✅ Ayuda y soporte
- ✅ Mensajes

### Entrenador
- ✅ Dashboard del entrenador
- ✅ Lista de clientes
- ✅ Detalle de cliente
- ✅ Editor de rutinas

### Administrador
- ✅ Dashboard de administración
- ✅ Gestión de entrenadores
- ✅ Gestión de clientes
- ✅ Gestión de ejercicios

## 🛠️ Stack Tecnológico

- **React 18** con **TypeScript**
- **Vite** como bundler y herramienta de desarrollo
- **React Router DOM** para navegación
- **TailwindCSS** para estilos y diseño responsive
- **Lucide React** para iconos
- **date-fns** para manejo de fechas
- **clsx** y **tailwind-merge** para gestión de clases CSS

## 📦 Instalación

1. Instalar dependencias:
```bash
npm install
```

2. Iniciar servidor de desarrollo:
```bash
npm run dev
```

3. Construir para producción:
```bash
npm run build
```

4. Preview de producción:
```bash
npm run preview
```

## 🎨 Diseño

La aplicación sigue la guía de diseño de CoachSport:
- **Colores**: 
  - Azul petróleo (#002B36) - Color primario
  - Rojo energía (#FF3B30) - Color secundario
  - Verde progreso (#4CAF50) - Acento positivo
  - Gris grafito (#2E2E2E) - Neutral oscuro
  - Gris titanio (#A7B0B5) - Neutral claro
- **Tipografía**: Inter (Regular, Medium, SemiBold, Bold)
- **Temas**: Modo oscuro por defecto, con soporte para modo claro
- **Responsive**: Mobile-first design
- **Path Aliases**: Se utiliza `@/` para importaciones desde `src/`

## 👥 Usuarios de Prueba

### Administrador / Entrenador
- Email: `admin@coachsport.dev`
- Password: (cualquiera)

### Entrenador
- Email: `trainer@coachsport.dev`
- Password: (cualquiera)

### Clientes
- Email: `cliente1@coachsport.dev`
- Email: `cliente2@coachsport.dev`
- Email: `cliente3@coachsport.dev`
- Password: (cualquiera)

## 📂 Estructura del Proyecto

```
src/
  components/
    ui/              # Componentes reutilizables (Button, Card, Input, Tab)
    Layout.tsx       # Layout principal con navegación
  screens/
    auth/            # Pantallas de autenticación
    client/          # Pantallas del cliente
    trainer/         # Pantallas del entrenador
    admin/           # Pantallas del administrador
  data/
    mockData.ts      # Datos mock para simulación
  types/
    index.ts         # Definiciones de tipos TypeScript
  hooks/
    useAuth.ts       # Hook de autenticación
    useTheme.ts      # Hook para gestión de temas (claro/oscuro)
  lib/
    utils.ts         # Utilidades (cn para clases CSS)
  constants/
    images.ts        # Exportación de imágenes de la aplicación
  assets/
    images/          # Imágenes estáticas
```

## 🎯 Funcionalidades Mock

Todas las funcionalidades están implementadas con datos mock:
- Usuarios predefinidos (admin, entrenadores, clientes)
- Biblioteca de ejercicios completa
- Rutinas de ejemplo
- Historial de entrenamientos
- Progreso simulado

## 📝 Notas

- Esta es una aplicación de UI/UX sin backend real
- Todos los datos son mock y se guardan en localStorage
- La navegación está completamente funcional
- Los componentes siguen el sistema de diseño de CoachSport
- Diseño responsive para todos los dispositivos
- El tema (claro/oscuro) se persiste en localStorage
- Se utiliza TypeScript con configuración estricta
- Path aliases configurados (`@/` apunta a `src/`)

## 🚧 Próximos Pasos

Para convertir esto en una aplicación funcional:
1. Integrar backend real (API REST o GraphQL)
2. Implementar almacenamiento persistente (localStorage mejorado o base de datos)
3. Añadir autenticación real (Firebase, Auth0, etc.)
4. Integrar sistema de notificaciones
5. Añadir reproducción de videos reales
6. Implementar sistema de mensajería en tiempo real

## 🌐 Desarrollo

La aplicación está optimizada para:
- **Móvil**: Navegación inferior, diseño touch-friendly
- **Tablet**: Layout adaptativo
- **Desktop**: Experiencia completa con más espacio

## 🔧 Scripts Disponibles

- `npm run dev` - Inicia el servidor de desarrollo
- `npm run build` - Construye la aplicación para producción
- `npm run preview` - Previsualiza el build de producción
- `npm run lint` - Ejecuta el linter de ESLint

## 📄 Licencia

Este proyecto es privado.
