import { Zap, Target, Flame, HeartHandshake } from "lucide-react";
import React from "react";
import { useNavigate } from "react-router-dom";

import ProgressCircle from "../../common/atoms/ProgressCircle";
import ThemeToggle from "../../common/atoms/ThemeToggle";
import { useAuthStore } from "../../store/authStore";
import { useDashboardData } from "./useDashboardData";

const DashboardView: React.FC = () => {
  const { stats } = useDashboardData();
  const logout = useAuthStore((s) => s.logout);
  const navigate = useNavigate();

  if (!stats) return <div className="text-white">Carregando Dados...</div>;

  // Theme toggle and icon are handled in Header to avoid duplication

  return (
    <div className="p-6 md:p-10 w-full min-h-screen bg-background-light dark:bg-background-dark text-gray-800 dark:text-white transition-colors duration-500">
      <div className="flex justify-between items-start mb-10">
        <div>
          <h1 className="text-3xl font-extrabold tracking-tight text-primary">
            Bem-vindo(a), {stats.userName}!
          </h1>
          <p className="text-xl dark:text-slate-300 mt-1">
            Sua jornada de Plenitude continua.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <ThemeToggle />
          <button
            onClick={() => {
              logout();
              navigate("/login", { replace: true });
            }}
            className="px-4 py-2 rounded-md bg-secondary hover:bg-secondary/90 text-white text-sm font-semibold"
          >
            Sair
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-10">
        <div className="lg:col-span-2 p-6 rounded-2xl shadow-2xl dark:bg-slate-700 bg-white border border-primary dark:border-primary/50 flex items-center justify-between transition-shadow">
          <div className="flex items-center">
            <Zap className="w-12 h-12 text-primary" strokeWidth={2.5} />
            <div className="ml-5">
              <p className="text-sm font-semibold uppercase dark:text-slate-400">
                NÍVEL DE PLENITUDE
              </p>
              <h2 className="text-4xl font-bold text-primary mt-1">
                {stats.level} — {stats.levelName}
              </h2>
            </div>
          </div>
          <div className="text-right">
            <p className="text-sm dark:text-slate-400">Objetivo Semanal</p>
            <span className="text-2xl font-bold text-secondary">
              {stats.weeklyGoalCompletion}% Concluído
            </span>
          </div>
        </div>

        <div className="p-6 rounded-2xl shadow-xl dark:bg-slate-700 bg-white flex flex-col justify-center items-center dark:hover:bg-slate-600 transition-colors">
          <Flame className="w-10 h-10 text-secondary mb-2" />
          <p className="text-xs uppercase dark:text-slate-400">
            Sequência Ativa
          </p>
          <span className="text-4xl font-extrabold text-secondary">
            {stats.streak}
          </span>
          <p className="text-sm dark:text-slate-400">dias consistentes</p>
        </div>
      </div>

      <h3 className="text-2xl font-bold mb-6 dark:text-white border-b border-primary/30 pb-2">
        Progresso nos 4 Pilares
      </h3>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        {stats.pillars.map((pillar) => (
          <div
            key={pillar.name}
            className="p-4 rounded-xl dark:bg-slate-700 bg-white shadow-lg dark:hover:bg-slate-600 transition-colors flex flex-col items-center"
          >
            <ProgressCircle progress={pillar.progress} color={pillar.color} />
            <h4
              className="mt-3 text-lg font-semibold text-center"
              style={{ color: pillar.color }}
            >
              {pillar.name.split("(")[0]}
            </h4>
            <p className="text-xs dark:text-slate-400 mt-1">
              {pillar.name.split("(")[1].replace(")", "")}
            </p>
          </div>
        ))}
      </div>

      <div className="mt-12">
        <h3 className="text-2xl font-bold mb-4 dark:text-white">
          Ações Rápidas
        </h3>
        <div className="flex flex-wrap gap-4">
          <button className="flex items-center bg-primary hover:bg-primary/90 text-white font-semibold py-3 px-6 rounded-full shadow-lg transition-all transform hover:scale-[1.02]">
            <Target className="w-5 h-5 mr-2" /> Registrar Treino
          </button>
          <button className="flex items-center bg-secondary hover:bg-secondary/90 text-white font-semibold py-3 px-6 rounded-full shadow-lg transition-all transform hover:scale-[1.02]">
            <HeartHandshake className="w-5 h-5 mr-2" /> Check-in Mental
          </button>
          <button className="flex items-center dark:bg-slate-600 bg-gray-100 dark:text-white text-gray-800 font-semibold py-3 px-6 rounded-full transition-all transform hover:scale-[1.02]">
            <Flame className="w-5 h-5 mr-2" /> Ver Minha Trilha
          </button>
        </div>
      </div>
    </div>
  );
};

export default DashboardView;
