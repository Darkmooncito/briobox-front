import { useState } from 'react';
import { Link } from 'react-router-dom';
import { authApi } from '../../api/auth.api';
import { validateEmail } from '../../utils/validators';

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState('');
  const [emailError, setEmailError] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const err = validateEmail(email);
    if (err) { setEmailError(err); return; }
    setLoading(true);
    try {
      await authApi.forgotPassword({ email });
    } catch { /* El backend no revela si el email existe */ } 
    finally {
      setLoading(false);
      setSubmitted(true);
    }
  };

  if (submitted) return (
    <div>
      <h1>Revisa tu correo</h1>
      <p>Si el email existe, recibirás un enlace para restablecer tu contraseña.</p>
      <Link to="/login">Volver al login</Link>
    </div>
  );

  return (
    <div>
      <h1>Recuperar contraseña</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Email</label>
          <input type="email" value={email} onChange={e => { setEmail(e.target.value); setEmailError(''); }} placeholder="tu@email.com" />
          {emailError && <span>{emailError}</span>}
        </div>
        <button type="submit" disabled={loading}>{loading ? 'Enviando...' : 'Enviar enlace'}</button>
      </form>
      <Link to="/login">Volver al login</Link>
    </div>
  );
}