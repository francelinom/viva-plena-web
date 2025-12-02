import { create } from "zustand";

export interface PillarStat {
  name: string;
  progress: number;
  color: string;
}

export interface DashboardStats {
  userName: string;
  level: number;
  levelName: string;
  streak: number;
  weeklyGoalCompletion: number;
  pillars: PillarStat[];
}

const MOCK_STATS: DashboardStats = {
  userName: "Alex Silva",
  level: 5,
  levelName: "Energia em Ascensão",
  streak: 7,
  weeklyGoalCompletion: 75,
  pillars: [
    { name: "Corpo (Treino)", progress: 85, color: "#00A38C" },
    { name: "Combustível (Nutrição)", progress: 60, color: "#FF8A65" },
    { name: "Mente (Mentalidade)", progress: 95, color: "#3B82F6" },
    { name: "Comunidade (Conexão)", progress: 40, color: "#A855F7" },
  ],
};

export const useDashboardData = create(() => ({
  stats: MOCK_STATS,
  isLoading: false,
  fetchStats: () => console.log("Dados mockados carregados."),
}));
