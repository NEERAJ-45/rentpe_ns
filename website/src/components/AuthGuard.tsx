import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '@/features/auth/useAuth';
import LoadingSpinner from '@/components/LoadingSpinner';

interface AuthGuardProps {
  roles?: Array<'user' | 'vendor' | 'admin'>;
  redirectTo?: string;
}

const AuthGuard = ({ roles, redirectTo = '/auth' }: AuthGuardProps) => {
  const { user, isAuthenticated, status } = useAuth();

  if (status === 'loading') return <LoadingSpinner />;
  if (!isAuthenticated) return <Navigate to={redirectTo} replace />;
  if (roles && user?.role && !roles.includes(user.role)) {
    return <Navigate to="/vendor" replace />;
  }

  return <Outlet />;
};

export default AuthGuard;