import api from './api';
import { Task } from '../types';

export const taskService = {
  getTasks: async (filters?: { status?: string; priority?: string }): Promise<Task[]> => {
    let query = '';
    if (filters) {
      const params = new URLSearchParams();
      if (filters.status) params.append('status', filters.status);
      if (filters.priority) params.append('priority', filters.priority);
      if (params.toString()) query = `?${params.toString()}`;
    }
    const response = await api.get(`/tasks${query}`);
    return response.data;
  },

  getTaskById: async (id: string): Promise<Task> => {
    const response = await api.get(`/tasks/${id}`);
    return response.data;
  },

  createTask: async (data: Partial<Task>): Promise<Task> => {
    const response = await api.post('/tasks', data);
    return response.data;
  },

  updateTask: async (id: string, data: Partial<Task>): Promise<Task> => {
    const response = await api.put(`/tasks/${id}`, data);
    return response.data;
  },

  deleteTask: async (id: string): Promise<{ id: string; message: string }> => {
    const response = await api.delete(`/tasks/${id}`);
    return response.data;
  },
};
