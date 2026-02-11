import { Routes, Route, Navigate } from 'react-router-dom'
import { useAuth } from './contexts/AuthContext'
import ProtectedRoute from './components/ProtectedRoute'
import SplashScreen from './screens/SplashScreen'
import LoginScreen from './screens/auth/LoginScreen'
import RegisterScreen from './screens/auth/RegisterScreen'
import ProfileSetupScreen from './screens/auth/ProfileSetupScreen'
import ForgotPasswordScreen from './screens/auth/ForgotPasswordScreen'
import ContactScreen from './screens/auth/ContactScreen'
import HomeScreen from './screens/client/HomeScreen'
import ExercisesScreen from './screens/client/ExercisesScreen'
import ExerciseDetailScreen from './screens/client/ExerciseDetailScreen'
import RoutinesScreen from './screens/client/RoutinesScreen'
import RoutineDetailScreen from './screens/client/RoutineDetailScreen'
import WorkoutScreen from './screens/client/WorkoutScreen'
import WorkoutCompleteScreen from './screens/client/WorkoutCompleteScreen'
import ProgressScreen from './screens/client/ProgressScreen'
import ProfileScreen from './screens/client/ProfileScreen'
import SettingsScreen from './screens/SettingsScreen'
import SubscriptionScreen from './screens/SubscriptionScreen'
import HelpScreen from './screens/HelpScreen'
import MessagesScreen from './screens/MessagesScreen'
import ConversationScreen from './screens/ConversationScreen'
import PrivacyScreen from './screens/PrivacyScreen'
import AboutScreen from './screens/AboutScreen'
import TrainerDashboardScreen from './screens/trainer/TrainerDashboardScreen'
import TrainerClientsScreen from './screens/trainer/TrainerClientsScreen'
import TrainerClientDetailScreen from './screens/trainer/TrainerClientDetailScreen'
import RoutineEditorScreen from './screens/trainer/RoutineEditorScreen'
import AdminDashboardScreen from './screens/admin/AdminDashboardScreen'
import AdminTrainersScreen from './screens/admin/AdminTrainersScreen'
import AdminClientsScreen from './screens/admin/AdminClientsScreen'
import AdminExercisesScreen from './screens/admin/AdminExercisesScreen'
import Layout from './components/Layout'

function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<SplashScreen />} />
      <Route path="/login" element={<LoginScreen />} />
      <Route path="/register" element={<RegisterScreen />} />
      <Route path="/forgot-password" element={<ForgotPasswordScreen />} />
      <Route path="/contact" element={<ContactScreen />} />
      <Route path="/profile-setup" element={<ProfileSetupScreen />} />
      
      {/* Client Routes */}
      {/* Rutas protegidas que requieren suscripción activa */}
      <Route path="/home" element={<Layout><ProtectedRoute><HomeScreen /></ProtectedRoute></Layout>} />
      <Route path="/exercises" element={<Layout><ProtectedRoute><ExercisesScreen /></ProtectedRoute></Layout>} />
      <Route path="/exercise/:id" element={<Layout><ProtectedRoute><ExerciseDetailScreen /></ProtectedRoute></Layout>} />
      <Route path="/routines" element={<Layout><ProtectedRoute><RoutinesScreen /></ProtectedRoute></Layout>} />
      <Route path="/routine/:id" element={<Layout><ProtectedRoute><RoutineDetailScreen /></ProtectedRoute></Layout>} />
      <Route path="/workout/:id" element={<Layout><ProtectedRoute><WorkoutScreen /></ProtectedRoute></Layout>} />
      <Route path="/workout/:id/complete" element={<Layout><ProtectedRoute><WorkoutCompleteScreen /></ProtectedRoute></Layout>} />
      <Route path="/progress" element={<Layout><ProtectedRoute><ProgressScreen /></ProtectedRoute></Layout>} />
      <Route path="/messages" element={<Layout><ProtectedRoute><MessagesScreen /></ProtectedRoute></Layout>} />
      <Route path="/conversation/:userId" element={<Layout><ProtectedRoute><ConversationScreen /></ProtectedRoute></Layout>} />
      
      {/* Rutas accesibles sin suscripción activa */}
      <Route path="/profile" element={<Layout><ProtectedRoute requireSubscription={false}><ProfileScreen /></ProtectedRoute></Layout>} />
      <Route path="/subscriptions" element={<Layout><ProtectedRoute requireSubscription={false}><SubscriptionScreen /></ProtectedRoute></Layout>} />
      <Route path="/settings" element={<Layout><ProtectedRoute requireSubscription={false}><SettingsScreen /></ProtectedRoute></Layout>} />
      <Route path="/help" element={<Layout><ProtectedRoute requireSubscription={false}><HelpScreen /></ProtectedRoute></Layout>} />
      <Route path="/privacy" element={<Layout><ProtectedRoute requireSubscription={false}><PrivacyScreen /></ProtectedRoute></Layout>} />
      <Route path="/about" element={<Layout><ProtectedRoute requireSubscription={false}><AboutScreen /></ProtectedRoute></Layout>} />
      
      {/* Trainer Routes */}
      <Route path="/trainer" element={<Layout><TrainerDashboardScreen /></Layout>} />
      <Route path="/trainer/clients" element={<Layout><TrainerClientsScreen /></Layout>} />
      <Route path="/trainer/client/:id" element={<Layout><TrainerClientDetailScreen /></Layout>} />
      <Route path="/trainer/routine-editor" element={<Layout><RoutineEditorScreen /></Layout>} />
      
      {/* Admin Routes */}
      <Route path="/admin" element={<Layout><AdminDashboardScreen /></Layout>} />
      <Route path="/admin/trainers" element={<Layout><AdminTrainersScreen /></Layout>} />
      <Route path="/admin/clients" element={<Layout><AdminClientsScreen /></Layout>} />
      <Route path="/admin/exercises" element={<Layout><AdminExercisesScreen /></Layout>} />
      
      <Route path="*" element={<Navigate to="/home" replace />} />
    </Routes>
  )
}

function App() {
  const { loading } = useAuth()

  if (loading) {
    return <SplashScreen />
  }

  return <AppRoutes />
}

export default App
