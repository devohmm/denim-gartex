import { AuthProvider, useAuth } from '../context/AuthContext'
import Login from './Login.jsx'
import AdminDashboard from './AdminDashboard.jsx'

function AdminAppContent() {
  const { user, loading } = useAuth()

  // Show loading state while checking authentication
  if (loading) {
    return (
      <div style={{ 
        display: 'flex', 
        justifyContent: 'center', 
        alignItems: 'center', 
        height: '100vh',
        fontSize: '18px'
      }}>
        Loading...
      </div>
    )
  }

  // If user is logged in, show admin dashboard
  if (user) {
    return <AdminDashboard />
  }

  // Show login page for admin access
  return <Login />
}

export default function AdminApp() {
  return (
    <AuthProvider>
      <AdminAppContent />
    </AuthProvider>
  )
}

