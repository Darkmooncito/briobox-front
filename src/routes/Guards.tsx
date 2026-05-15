import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';

export function PublicRoute() {
  const { isAuthenticated, isLoading } = useAuth();
  if (isLoading) return <div>Cargando...</div>;
  return isAuthenticated ? <Navigate to="/dashboard" replace /> : <Outlet />;
}

// TEMPORAL PARA TESTING - eliminar cuando el backend esté listo
export function PrivateRoute() {
  return <Outlet />;
}

/*import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';

export function PublicRoute() {
  const { isAuthenticated, isLoading } = useAuth();
  if (isLoading) return <div>Cargando...</div>;
  return isAuthenticated ? <Navigate to="/dashboard" replace /> : <Outlet />;
}

export function PrivateRoute() {
  const { isAuthenticated, isLoading } = useAuth();
  if (isLoading) return <div>Cargando...</div>;
  return isAuthenticated ? <Outlet /> : <Navigate to="/login" replace />;
}

*/