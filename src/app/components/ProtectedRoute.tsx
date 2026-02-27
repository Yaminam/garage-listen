import { Navigate, useLocation } from 'react-router';
import { useAuth } from '../context/AuthContext';

export function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { isAuthenticated, onboardingCompleted } = useAuth();
  const { pathname } = useLocation();

  if (!isAuthenticated) {
    return <Navigate to="/auth/login" replace />;
  }

  // If onboarding is done and user somehow hits /onboarding, send to dashboard
  if (onboardingCompleted && pathname.startsWith('/onboarding')) {
    return <Navigate to="/dashboard" replace />;
  }

  // If dashboard requested but onboarding not done, redirect to onboarding
  if (!onboardingCompleted && pathname.startsWith('/dashboard')) {
    return <Navigate to="/onboarding" replace />;
  }

  return children;
}
