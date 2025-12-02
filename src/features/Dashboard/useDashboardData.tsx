import { create } from "zustand";

import api from "../../api/axios";

interface DashboardState {
  stats: string | null;
  isLoading: boolean;
  fetchStats: () => Promise<void>;
}

export const useDashboardData = create<DashboardState>((set) => ({
  stats: null,
  isLoading: false,

  fetchStats: async () => {
    set({ isLoading: true });
    try {
      const response = await api.get("/dashboard/stats");

      set({ stats: response.data, isLoading: false });
    } catch (error) {
      console.error("Falha ao buscar dados do dashboard:", error);
      set({ isLoading: false });
    }
  },
}));
