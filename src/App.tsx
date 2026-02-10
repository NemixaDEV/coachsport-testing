import { Routes, Route, Navigate } from 'react-router-dom'
import { useAuth } from './hooks/useAuth'
import SplashScreen from './screens/SplashScreen'
import LoginScreen from './screens/auth/LoginScreen'
import RegisterScreen from './screens/auth/RegisterScreen'
import ProfileSetupScreen from './screens/auth/ProfileSetupScreen'
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
import HelpScreen from './screens/HelpScreen'
import MessagesScreen from './screens/MessagesScreen'
import TrainerDashboardScreen from './screens/trainer/TrainerDashboardScreen'
import TrainerClientsScreen from './screens/trainer/TrainerClientsScreen'
import TrainerClientDetailScreen from './screens/trainer/TrainerClientDetailScreen'
import RoutineEditorScreen from './screens/trainer/RoutineEditorScreen'
import AdminDashboardScreen from './screens/admin/AdminDashboardScreen'
import AdminTrainersScreen from './screens/admin/AdminTrainersScreen'
import AdminClientsScreen from './screens/admin/AdminClientsScreen'
import AdminExercisesScreen from './screens/admin/AdminExercisesScreen'
import Layout from './components/Layout'

function App() {
  const { loading } = useAuth()

  if (loading) {
    return <SplashScreen />
  }

  return (
    <Routes>
      <Route path="/" element={<SplashScreen />} />
      <Route path="/login" element={<LoginScreen />} />
      <Route path="/register" element={<RegisterScreen />} />
      <Route path="/profile-setup" element={<ProfileSetupScreen />} />
      
      {/* Client Routes */}
      <Route path="/home" element={<Layout><HomeScreen /></Layout>} />
      <Route path="/exercises" element={<Layout><ExercisesScreen /></Layout>} />
      <Route path="/exercise/:id" element={<Layout><ExerciseDetailScreen /></Layout>} />
      <Route path="/routines" element={<Layout><RoutinesScreen /></Layout>} />
      <Route path="/routine/:id" element={<Layout><RoutineDetailScreen /></Layout>} />
      <Route path="/workout/:id" element={<Layout><WorkoutScreen /></Layout>} />
      <Route path="/workout/:id/complete" element={<Layout><WorkoutCompleteScreen /></Layout>} />
      <Route path="/progress" element={<Layout><ProgressScreen /></Layout>} />
      <Route path="/profile" element={<Layout><ProfileScreen /></Layout>} />
      <Route path="/settings" element={<Layout><SettingsScreen /></Layout>} />
      <Route path="/help" element={<Layout><HelpScreen /></Layout>} />
      <Route path="/messages" element={<Layout><MessagesScreen /></Layout>} />
      
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

export default App
