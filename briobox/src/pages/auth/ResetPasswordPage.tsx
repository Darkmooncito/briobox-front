import { useState } from 'react';
import { useNavigate, useSearchParams, Link } from 'react-router-dom';
import { authApi } from '../../api/auth.api';
import { validatePassword } from '../../utils/validators';

export default function ResetPasswordPage() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const token = searchParams.get('token') ?? '';
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [confirmError, setConfirmError] = useState('');
  const [apiError, setApiError] = useState('');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const err = validatePassword(newPassword);
    if (err) { setPasswordError(err); return; }
    if (newPassword !== confirmPassword) { setConfirmError('Las contraseñas no coinciden.'); return; }

    setLoading(true);
    try {
      await authApi.resetPassword({ token, newPassword });
      setSuccess(true);
      setTimeout(() => navigate('/login'), 3000);
    } catch (err: unknown) {
      setApiError(err instanceof Error ? err.message : 'Error al restablecer la contraseña.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#020202] flex items-center justify-center relative overflow-hidden">

      {/* Fondo */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_#1a0000_0%,_#050000_35%,_#000000_65%)]" />
      <div className="absolute w-[700px] h-[400px] rounded-full blur-[160px] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-red-950/20 pointer-events-none" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_transparent_20%,_rgba(0,0,0,0.7)_70%,_rgba(0,0,0,0.95)_100%)] pointer-events-none" />

      {/* Esquinas */}
      <div className="absolute top-0 left-0 w-64 h-64 bg-gradient-to-br from-black/80 to-transparent pointer-events-none" />
      <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-bl from-black/80 to-transparent pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-64 h-64 bg-gradient-to-tr from-black/80 to-transparent pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-64 h-64 bg-gradient-to-tl from-black/80 to-transparent pointer-events-none" />

      {/* Card */}
      <div className="relative z-10 bg-[#1a1a1a] border border-[#2a2a2a] rounded-2xl p-8 w-full max-w-sm shadow-2xl flex flex-col items-center gap-6">

        {/* Token inválido */}
        {!token ? (
          <div className="flex flex-col items-center gap-4 py-4">
            <div className="w-16 h-16 rounded-full border border-red-900/40 flex items-center justify-center drop-shadow-[0_0_15px_rgba(180,0,0,0.3)]">
              <svg className="w-8 h-8 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 9v2m0 4h.01M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z" />
              </svg>
            </div>
            <h1 className="text-white text-xl font-bold tracking-wide">Enlace inválido</h1>
            <p className="text-white/30 text-xs text-center tracking-wider leading-relaxed">
              El enlace de recuperación no es válido o ya expiró. Solicita uno nuevo.
            </p>
            <div className="w-full h-px bg-red-900/30" />
            <Link
              to="/forgot-password"
              className="text-red-600/80 hover:text-red-500 transition-colors text-xs tracking-widest uppercase"
            >
              Solicitar nuevo enlace →
            </Link>
          </div>

        ) : success ? (
          /* Éxito */
          <div className="flex flex-col items-center gap-4 py-4">
            <div className="w-16 h-16 rounded-full border border-red-900/40 flex items-center justify-center drop-shadow-[0_0_15px_rgba(180,0,0,0.3)]">
              <svg className="w-8 h-8 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h1 className="text-white text-xl font-bold tracking-wide">¡Contraseña actualizada!</h1>
            <p className="text-white/30 text-xs text-center tracking-wider leading-relaxed">
              Tu contraseña fue restablecida correctamente. Redirigiendo al login...
            </p>
            <div className="w-full h-px bg-red-900/30" />
            <div className="flex gap-1.5 items-center">
              <div className="w-1 h-1 rounded-full bg-red-500/80 animate-pulse" />
              <div className="w-8 h-px bg-red-500/40" />
              <div className="w-1 h-1 rounded-full bg-red-500/80 animate-pulse" />
            </div>
          </div>

        ) : (
          /* Formulario */
          <>
            <div className="flex flex-col items-center gap-2">
              <img
                src="/src/assets/brioboxlogo.png"
                alt="BrioBox"
                className="w-16 h-16 object-contain drop-shadow-[0_0_15px_rgba(180,0,0,0.4)]"
              />
              <h1 className="text-white text-2xl font-bold tracking-wide">Nueva contraseña</h1>
              <p className="text-white/30 text-xs text-center tracking-wider">
                Mínimo 8 caracteres, una mayúscula, un número y un carácter especial
              </p>
            </div>

            <div className="w-full h-px bg-red-900/30" />

            <form onSubmit={handleSubmit} className="w-full flex flex-col gap-4">
              <div className="flex flex-col gap-1">
                <label className="text-white/40 text-[10px] uppercase tracking-widest">Nueva contraseña</label>
                <input
                  type="password"
                  value={newPassword}
                  onChange={e => { setNewPassword(e.target.value); setPasswordError(''); setApiError(''); }}
                  placeholder="••••••••••••"
                  className="bg-[#111111] border border-[#2a2a2a] rounded-lg px-4 py-2.5 text-white text-sm placeholder-white/20 focus:outline-none focus:border-red-900/60 transition-colors"
                />
                {passwordError && <span className="text-red-500 text-[10px]">{passwordError}</span>}
              </div>

              <div className="flex flex-col gap-1">
                <label className="text-white/40 text-[10px] uppercase tracking-widest">Confirmar contraseña</label>
                <input
                  type="password"
                  value={confirmPassword}
                  onChange={e => { setConfirmPassword(e.target.value); setConfirmError(''); }}
                  placeholder="••••••••••••"
                  className="bg-[#111111] border border-[#2a2a2a] rounded-lg px-4 py-2.5 text-white text-sm placeholder-white/20 focus:outline-none focus:border-red-900/60 transition-colors"
                />
                {confirmError && <span className="text-red-500 text-[10px]">{confirmError}</span>}
              </div>

              {apiError && (
                <p className="text-red-500 text-xs text-center bg-red-950/20 border border-red-900/30 rounded-lg px-3 py-2">
                  {apiError}
                </p>
              )}

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-[#cc0000] hover:bg-red-700 disabled:opacity-40 text-white font-semibold py-2.5 rounded-lg transition-colors mt-1 tracking-widest text-sm uppercase shadow-lg shadow-red-950/30"
              >
                {loading ? 'Actualizando...' : 'Actualizar contraseña →'}
              </button>
            </form>

            <Link
              to="/login"
              className="text-white/25 text-xs hover:text-white/50 transition-colors tracking-wider"
            >
              ← Volver al inicio de sesión
            </Link>
          </>
        )}
      </div>
    </div>
  );
}