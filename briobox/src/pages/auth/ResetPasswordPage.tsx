import { useState } from 'react';
import { useNavigate, useSearchParams, Link } from 'react-router-dom';
import { authApi } from '../../api/auth.api';
import { validatePassword } from '../../utils/validators';

export default function ResetPasswordPage() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const token = searchParams.get('token') ?? '';
  const [newPassword, setNewPassword] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [apiError, setApiError] = useState('');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  if (!token) return (
    <div>
      <h1>Enlace inválido</h1>
      <p>El enlace ya expiró o no es válido.</p>
      <Link to="/forgot-password">Solicitar otro enlace</Link>
    </div>
  );

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const err = validatePassword(newPassword);
    if (err) { setPasswordError(err); return; }
    setLoading(true);
    try {
      await authApi.resetPassword({ token, newPassword });
      setSuccess(true);
      setTimeout(() => navigate('/login'), 2500);
    } catch (err: unknown) {
      setApiError(err instanceof Error ? err.message : 'Error al restablecer la contraseña.');
    } finally {
      setLoading(false);
    }
  };

  if (success) return (
    <div>
      <h1>¡Contraseña actualizada!</h1>
      <p>Redirigiendo al login...</p>
    </div>
  );

  return (
    <div>
      <h1>Nueva contraseña</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Nueva contraseña</label>
          <input type="password" value={newPassword} onChange={e => { setNewPassword(e.target.value); setPasswordError(''); setApiError(''); }} placeholder="••••••••" />
          {passwordError && <span>{passwordError}</span>}
        </div>
        {apiError && <p>{apiError}</p>}
        <button type="submit" disabled={loading}>{loading ? 'Actualizando...' : 'Actualizar contraseña'}</button>
      </form>
    </div>
  );
}