import { create } from "zustand";

import { useUserStore } from "./userStore";

interface AuthState {
  token: string | null;
  isAuthenticated: boolean;
  login: (token: string) => void;
  logout: () => void;
  mockLogin: (username: string) => Promise<void>;
}

const MOCKED_USER = {
  name: "Joao Silva",
  level: 1,
  activeTrail: "Iniciante em Corrida",
  points: 150,
  achievements: ["Primeira Corrida", "5K Concluídos"],
};

export const useAuthStore = create<AuthState>((set) => ({
  token: localStorage.getItem("authToken") || null,
  isAuthenticated: !!localStorage.getItem("authToken"),

  login: (token) => {
    localStorage.setItem("authToken", token);
    set({ token, isAuthenticated: true });
  },

  logout: () => {
    localStorage.removeItem("authToken");
    set({ token: null, isAuthenticated: false });
  },
  mockLogin: (username: string) => {
    return new Promise<void>((resolve, reject) => {
      setTimeout(() => {
        if (username === "admin@viva.com" || username === "test@viva.com") {
          const mockToken = `mock-token-${Math.random().toString(36).substring(2)}`;

          localStorage.setItem("authToken", mockToken);
          set({ token: mockToken, isAuthenticated: true });

          useUserStore.getState().setUser(MOCKED_USER);

          resolve();
        } else {
          reject(new Error('Credenciais inválidas. Tente "admin@viva.com".'));
        }
      }, 2000);
    });
  },
}));
