import { create } from "zustand";

interface UserData {
  name: string;
  level: number;
  activeTrail: string;
}

interface UserState {
  user: UserData | null;
  setUser: (userData: UserData) => void;
  clearUser: () => void;
  updateLevel: (newLevel: number) => void;
}

export const useUserStore = create<UserState>((set) => ({
  user: null,

  setUser: (userData) => set({ user: userData }),
  clearUser: () => set({ user: null }),
  updateLevel: (newLevel) =>
    set((state) => ({
      user: state.user ? { ...state.user, level: newLevel } : null,
    })),
}));
