import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { userApi } from '../../api/user.api';
import { useAuth } from '../../hooks/useAuth';
import { validateName, validateAge, validateEmail } from '../../utils/validators';

export default function ProfilePage() {
  const { user, refreshUser, logout } = useAuth();
  const navigate = useNavigate();
  const [editing, setEditing] = useState(false);
  const [form, setForm] = useState({ name: user?.name ?? '', lastName: user?.lastName ?? '', age: String(user?.age ?? ''), email: user?.email ?? '' });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [apiError, setApiError] = useState('');
  const [loading, setLoading] = useState(false);
  const [confirmDelete, setConfirmDelete] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));
    setErrors(prev => ({ ...prev, [e.target.name]: '' }));
  };

  const validate = () => {
    const newErrors: Record<string, string> = {};
    const nameErr = validateName(form.name, 'El nombre');
    const lastNameErr = validateName(form.lastName, 'El apellido');
    const ageErr = validateAge(form.age);
    const emailErr = validateEmail(form.email);
    if (nameErr) newErrors.name = nameErr;
    if (lastNameErr) newErrors.lastName = lastNameErr;
    if (ageErr) newErrors.age = ageErr;
    if (emailErr) newErrors.email = emailErr;
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    setLoading(true);
    try {
      await userApi.updateProfile({ name: form.name, lastName: form.lastName, age: Number(form.age), email: form.email });
      await refreshUser();
      setEditing(false);
    } catch (err: unknown) {
      setApiError(err instanceof Error ? err.message : 'Error al actualizar.');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    setLoading(true);
    try {
      await userApi.deleteAccount();
      await logout();
      navigate('/login');
    } catch (err: unknown) {
      setApiError(err instanceof Error ? err.message : 'Error al eliminar la cuenta.');
      setLoading(false);
    }
  };

  if (!user) return <p>Cargando perfil...</p>;

  return (
    <div>
      <h1>Mi perfil</h1>
      {!editing ? (
        <div>
          <p><strong>Nombre:</strong> {user.name} {user.lastName}</p>
          <p><strong>Edad:</strong> {user.age}</p>
          <p><strong>Email:</strong> {user.email}</p>
          <button onClick={() => setEditing(true)}>Editar perfil</button>
        </div>
      ) : (
        <form onSubmit={handleSave}>
          <div>
            <label>Nombre</label>
            <input name="name" value={form.name} onChange={handleChange} />
            {errors.name && <span>{errors.name}</span>}
          </div>
          <div>
            <label>Apellido</label>
            <input name="lastName" value={form.lastName} onChange={handleChange} />
            {errors.lastName && <span>{errors.lastName}</span>}
          </div>
          <div>
            <label>Edad</label>
            <input name="age" type="number" value={form.age} onChange={handleChange} />
            {errors.age && <span>{errors.age}</span>}
          </div>
          <div>
            <label>Email</label>
            <input name="email" type="email" value={form.email} onChange={handleChange} />
            {errors.email && <span>{errors.email}</span>}
          </div>
          {apiError && <p>{apiError}</p>}
          <button type="submit" disabled={loading}>{loading ? 'Guardando...' : 'Guardar cambios'}</button>
          <button type="button" onClick={() => setEditing(false)}>Cancelar</button>
        </form>
      )}

      <hr />
      {!confirmDelete ? (
        <button onClick={() => setConfirmDelete(true)}>Eliminar cuenta</button>
      ) : (
        <div>
          <p>¿Estás seguro? Esta acción no se puede deshacer.</p>
          <button onClick={handleDelete} disabled={loading}>{loading ? 'Eliminando...' : 'Sí, eliminar'}</button>
          <button onClick={() => setConfirmDelete(false)}>Cancelar</button>
        </div>
      )}
    </div>
  );
}