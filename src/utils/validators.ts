export const validateEmail = (email: string): string | null => {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!email) return 'El email es requerido.';
  if (!regex.test(email)) return 'Formato de email inválido.';
  return null;
};

export const validatePassword = (password: string): string | null => {
  if (!password) return 'La contraseña es requerida.';
  if (password.length < 8) return 'Mínimo 8 caracteres.';
  if (!/[A-Z]/.test(password)) return 'Debe tener al menos una mayúscula.';
  if (!/[0-9]/.test(password)) return 'Debe tener al menos un número.';
  if (!/[^A-Za-z0-9]/.test(password)) return 'Debe tener al menos un carácter especial.';
  return null;
};

export const validateName = (name: string, label = 'Este campo'): string | null => {
  if (!name?.trim()) return `${label} es requerido.`;
  return null;
};

export const validateAge = (age: number | string): string | null => {
  const num = Number(age);
  if (!age && age !== 0) return 'La edad es requerida.';
  if (isNaN(num) || num <= 0) return 'La edad debe ser un número válido.';
  return null;
};