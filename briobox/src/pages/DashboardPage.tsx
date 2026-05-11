import { useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';

export default function DashboardPage() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate('/login');
  };

  return (
    <div>
      <h1>Bienvenido, {user?.name}!</h1>
      <button onClick={() => navigate('/profile')}>Ver perfil</button>
      <button onClick={handleLogout}>Cerrar sesión</button>
    </div>
  );
}