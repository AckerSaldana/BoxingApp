import { create } from 'zustand';
import { persist } from 'zustand/middleware';

const useAuthStore = create(
  persist(
    (set) => ({
      user: null,
      isAuthenticated: false,
      isLoading: false,
      isTransitioning: false,
      error: null,

      login: async (credentials) => {
        set({ isLoading: true, error: null });
        try {
          // Mock API call
          await new Promise(resolve => setTimeout(resolve, 1500));
          
          if (credentials.email === 'demo@boxing.com' && credentials.password === 'password123') {
            const user = {
              id: '1',
              email: credentials.email,
              name: 'Boxing Fan',
              favoriteBoxers: ['Canelo Alvarez', 'Tyson Fury'],
              predictionAccuracy: 72.5,
              totalPredictions: 156,
              joinedDate: new Date().toISOString(),
            };
            set({ user, isAuthenticated: true, isLoading: false });
            return { success: true };
          } else {
            throw new Error('Invalid email or password');
          }
        } catch (error) {
          set({ error: error.message, isLoading: false });
          return { success: false, error: error.message };
        }
      },

      register: async (userData) => {
        set({ isLoading: true, error: null });
        try {
          // Mock API call
          await new Promise(resolve => setTimeout(resolve, 1500));
          
          const user = {
            id: Date.now().toString(),
            email: userData.email,
            name: userData.name,
            favoriteBoxers: userData.favoriteBoxers || [],
            predictionAccuracy: 0,
            totalPredictions: 0,
            joinedDate: new Date().toISOString(),
          };
          
          set({ user, isAuthenticated: true, isLoading: false });
          return { success: true };
        } catch (error) {
          set({ error: error.message, isLoading: false });
          return { success: false, error: error.message };
        }
      },

      logout: () => {
        set({ user: null, isAuthenticated: false, error: null, isTransitioning: false });
      },

      setTransitioning: (value) => set({ isTransitioning: value }),

      clearError: () => set({ error: null }),
    }),
    {
      name: 'auth-storage',
    }
  )
);

export default useAuthStore;