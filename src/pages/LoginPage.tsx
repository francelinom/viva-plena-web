import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import { useAuthStore } from "../store/authStore";
import ThemeToggle from "../common/atoms/ThemeToggle";

const LoginPage: React.FC = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const navigate = useNavigate();
  const authStore = useAuthStore();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    try {
      await authStore.mockLogin(username);
      navigate("/dashboard");
    } catch (err) {
      const message = err instanceof Error ? err.message : "Erro ao entrar";
      setError(message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center bg-background-light dark:bg-background-dark transition-colors px-4">
      <div className="absolute top-4 right-4">
        {/* Toggle de tema */}
        <ThemeToggle />
      </div>
      <div className="w-full max-w-sm p-6 bg-white dark:bg-slate-800 shadow-lg rounded-xl border border-slate-200 dark:border-slate-700">
        <h1 className="text-2xl font-bold text-primary mb-2 text-center">
          Bem-vindo
        </h1>
        <p className="text-center text-sm text-slate-600 dark:text-slate-300 mb-6">
          Acesse sua conta para continuar
        </p>

        {error && <p className="text-sm text-secondary mb-4">{error}</p>}

        <form className="space-y-4" onSubmit={handleSubmit}>
          <div>
            <label
              htmlFor="username"
              className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1"
            >
              Usuário
            </label>
            <input
              id="username"
              type="email"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="admin@viva.com"
              className="w-full rounded-md border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 px-3 py-2 text-sm text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-primary"
              required
            />
          </div>
          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1"
            >
              Senha
            </label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              className="w-full rounded-md border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 px-3 py-2 text-sm text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-primary"
              required
            />
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full inline-flex items-center justify-center rounded-md bg-primary hover:bg-emerald-700 disabled:bg-primary/70 text-white text-sm font-semibold px-3 py-2 transition-colors"
          >
            {isLoading ? "Entrando..." : "Entrar"}
          </button>
        </form>

        <p className="mt-4 text-center text-xs text-slate-600 dark:text-slate-300">
          Dica: use <span className="font-medium">admin@viva.com</span> ou{" "}
          <span className="font-medium">test@viva.com</span>
        </p>
      </div>
    </div>
  );
};

export default LoginPage;
