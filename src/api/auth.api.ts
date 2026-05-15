import { http } from './client';
import type {
  RegisterPayload, LoginPayload, ForgotPasswordPayload,
  ResetPasswordPayload, RegisterResponse, VerifyAuthResponse, ApiResponse,
} from '../types';

export const authApi = {
  register: (payload: RegisterPayload) =>
    http.post<RegisterResponse>('/auth/register', payload),

  login: (payload: LoginPayload) =>
    http.post<ApiResponse>('/auth/login', payload),

  logout: () =>
    http.post<ApiResponse>('/auth/logout'),

  forgotPassword: (payload: ForgotPasswordPayload) =>
    http.post<ApiResponse>('/auth/forgot-password', payload),

  resetPassword: (payload: ResetPasswordPayload) =>
    http.post<ApiResponse>('/auth/reset-password', payload),

  verifyAuth: () =>
    http.get<VerifyAuthResponse>('/auth/verify-auth'),
};