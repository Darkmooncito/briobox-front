import { http } from './client';
import type { User, UpdateUserPayload, ApiResponse } from '../types';

export const userApi = {
  getProfile: () =>
    http.get<User>('/users/profile'),

  updateProfile: (payload: UpdateUserPayload) =>
    http.put<User>('/users/profile', payload),

  deleteAccount: () =>
    http.delete<ApiResponse>('/users/profile'),
};