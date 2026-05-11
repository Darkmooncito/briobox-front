import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { authApi } from '../../api/auth.api';
import { validateEmail, validatePassword, validateName, validateAge } from '../../utils/validators';

export default function RegisterPage() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ name: '', lastName: '', age: '', email: '', password: '' });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [apiError, setApiError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));
    setErrors(prev => ({ ...prev, [e.target.name]: '' }));
    setApiError('');
  };

  const validate = () => {
    const newErrors: Record<string, string> = {};
    const nameErr = validateName(form.name, 'El nombre');
    const lastNameErr = validateName(form.lastName, 'El apellido');
    const ageErr = validateAge(form.age);
    const emailErr = validateEmail(form.email);
    const passErr = validatePassword(form.password);
    if (nameErr) newErrors.name = nameErr;
    if (lastNameErr) newErrors.lastName = lastNameErr;
    if (ageErr) newErrors.age = ageErr;
    if (emailErr) newErrors.email = emailErr;
    if (passErr) newErrors.password = passErr;
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    setLoading(true);
    try {
      await authApi.register({ name: form.name, lastName: form.lastName, age: Number(form.age), email: form.email, password: form.password });
      navigate('/login');
    } catch (err: unknown) {
      setApiError(err instanceof Error ? err.message : 'Error al registrarse.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h1>Crear cuenta</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Nombre</label>
          <input name="name" value={form.name} onChange={handleChange} placeholder="Juan" />
          {errors.name && <span>{errors.name}</span>}
        </div>
        <div>
          <label>Apellido</label>
          <input name="lastName" value={form.lastName} onChange={handleChange} placeholder="Pérez" />
          {errors.lastName && <span>{errors.lastName}</span>}
        </div>
        <div>
          <label>Edad</label>
          <input name="age" type="number" value={form.age} onChange={handleChange} placeholder="25" />
          {errors.age && <span>{errors.age}</span>}
        </div>
        <div>
          <label>Email</label>
          <input name="email" type="email" value={form.email} onChange={handleChange} placeholder="tu@email.com" />
          {errors.email && <span>{errors.email}</span>}
        </div>
        <div>
          <label>Contraseña</label>
          <input name="password" type="password" value={form.password} onChange={handleChange} placeholder="••••••••" />
          {errors.password && <span>{errors.password}</span>}
        </div>
        {apiError && <p>{apiError}</p>}
        <button type="submit" disabled={loading}>{loading ? 'Cargando...' : 'Registrarme'}</button>
      </form>
      <p>¿Ya tienes cuenta? <Link to="/login">Inicia sesión</Link></p>
    </div>
  );
}