export interface User {
  id: string;
  name: string;
  lastName: string;
  age: number;
  email: string;
  isDeleted: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface RegisterPayload {
  name: string;
  lastName: string;
  age: number;
  email: string;
  password: string;
}

export interface LoginPayload {
  email: string;
  password: string;
}

export interface ForgotPasswordPayload {
  email: string;
}

export interface ResetPasswordPayload {
  token: string;
  newPassword: string;
}

export interface UpdateUserPayload {
  name?: string;
  lastName?: string;
  age?: number;
  email?: string;
}

export interface ApiResponse<T = unknown> {
  success: boolean;
  message?: string;
  data?: T;
}

export interface RegisterResponse {
  userId: string;
}

export interface VerifyAuthResponse {
  success: boolean;
  user: { id: string };
}

export interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (payload: LoginPayload) => Promise<void>;
  logout: () => Promise<void>;
  refreshUser: () => Promise<void>;
}