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
      await authApi.register({
        name: form.name,
        lastName: form.lastName,
        age: Number(form.age),
        email: form.email,
        password: form.password,
      });
      navigate('/login');
    } catch (err: unknown) {
      setApiError(err instanceof Error ? err.message : 'Error al registrarse.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#020202] flex items-center justify-center relative overflow-hidden">

      {/* Fondo */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_#1a0000_0%,_#050000_35%,_#000000_65%)]" />
      <div className="absolute w-[700px] h-[400px] rounded-full blur-[160px] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-red-950/20 pointer-events-none" />

      {/* Esquinas oscuras */}
      <div className="absolute top-0 left-0 w-64 h-64 bg-gradient-to-br from-black/80 to-transparent pointer-events-none" />
      <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-bl from-black/80 to-transparent pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-64 h-64 bg-gradient-to-tr from-black/80 to-transparent pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-64 h-64 bg-gradient-to-tl from-black/80 to-transparent pointer-events-none" />

      {/* Card */}
      <div className="relative z-10 bg-[#0f0f0f]/90 border border-white/5 rounded-2xl p-8 w-full max-w-md shadow-2xl flex flex-col items-center gap-6 backdrop-blur-sm">

        {/* Logo */}
        <div className="flex flex-col items-center gap-2">
          <img src="/src/assets/brioboxlogo.png" alt="BrioBox" className="w-16 h-16 object-contain drop-shadow-[0_0_15px_rgba(180,0,0,0.4)]" />
          <h1 className="text-white text-2xl font-bold tracking-wide">Crear cuenta</h1>
          <p className="text-white/30 text-xs text-center tracking-widest uppercase">Completa tus datos para registrarte</p>
        </div>

        {/* Separador */}
        <div className="w-16 h-px bg-red-900/40 w-full" />

        {/* Form */}
        <form onSubmit={handleSubmit} className="w-full flex flex-col gap-4">

          {/* Nombre y Apellido en fila */}
          <div className="grid grid-cols-2 gap-3">
            <div className="flex flex-col gap-1">
              <label className="text-white/40 text-[10px] uppercase tracking-widest">Nombre</label>
              <input
                name="name"
                value={form.name}
                onChange={handleChange}
                placeholder="Juan"
                className="bg-[#0a0a0a] border border-white/5 rounded-lg px-3 py-2.5 text-white text-sm placeholder-white/20 focus:outline-none focus:border-red-900/60 transition-colors"
              />
              {errors.name && <span className="text-red-500 text-[10px]">{errors.name}</span>}
            </div>
            <div className="flex flex-col gap-1">
              <label className="text-white/40 text-[10px] uppercase tracking-widest">Apellido</label>
              <input
                name="lastName"
                value={form.lastName}
                onChange={handleChange}
                placeholder="Pérez"
                className="bg-[#0a0a0a] border border-white/5 rounded-lg px-3 py-2.5 text-white text-sm placeholder-white/20 focus:outline-none focus:border-red-900/60 transition-colors"
              />
              {errors.lastName && <span className="text-red-500 text-[10px]">{errors.lastName}</span>}
            </div>
          </div>

          {/* Edad */}
          <div className="flex flex-col gap-1">
            <label className="text-white/40 text-[10px] uppercase tracking-widest">Edad</label>
            <input
              name="age"
              type="number"
              value={form.age}
              onChange={handleChange}
              placeholder="25"
              className="bg-[#0a0a0a] border border-white/5 rounded-lg px-3 py-2.5 text-white text-sm placeholder-white/20 focus:outline-none focus:border-red-900/60 transition-colors"
            />
            {errors.age && <span className="text-red-500 text-[10px]">{errors.age}</span>}
          </div>

          {/* Email */}
          <div className="flex flex-col gap-1">
            <label className="text-white/40 text-[10px] uppercase tracking-widest">Email</label>
            <input
              name="email"
              type="email"
              value={form.email}
              onChange={handleChange}
              placeholder="tu@email.com"
              className="bg-[#0a0a0a] border border-white/5 rounded-lg px-3 py-2.5 text-white text-sm placeholder-white/20 focus:outline-none focus:border-red-900/60 transition-colors"
            />
            {errors.email && <span className="text-red-500 text-[10px]">{errors.email}</span>}
          </div>

          {/* Contraseña */}
          <div className="flex flex-col gap-1">
            <label className="text-white/40 text-[10px] uppercase tracking-widest">Contraseña</label>
            <input
              name="password"
              type="password"
              value={form.password}
              onChange={handleChange}
              placeholder="••••••••••••"
              className="bg-[#0a0a0a] border border-white/5 rounded-lg px-3 py-2.5 text-white text-sm placeholder-white/20 focus:outline-none focus:border-red-900/60 transition-colors"
            />
            {errors.password && <span className="text-red-500 text-[10px]">{errors.password}</span>}
          </div>

          {apiError && (
            <p className="text-red-500 text-xs text-center bg-red-950/20 border border-red-900/30 rounded-lg px-3 py-2">
              {apiError}
            </p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-red-700/90 hover:bg-red-600 disabled:opacity-40 text-white font-semibold py-2.5 rounded-lg transition-all mt-1 tracking-widest text-sm uppercase shadow-lg shadow-red-950/30"
          >
            {loading ? 'Creando cuenta...' : 'Registrarme →'}
          </button>
        </form>

        <p className="text-white/25 text-xs">
          ¿Ya tienes cuenta?{' '}
          <Link to="/login" className="text-red-600/80 hover:text-red-500 transition-colors">
            Inicia sesión
          </Link>
        </p>
      </div>
    </div>
  );
}