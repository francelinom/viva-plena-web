import React, { useEffect } from "react";

import LoginPage from "./pages/LoginPage";
import { useThemeStore } from "./store/themeStore";
import { useAuthStore } from "./store/authStore";
import ThemeToggle from "./common/atoms/ThemeToggle";

const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const theme = useThemeStore((state) => state.theme);

  useEffect(() => {
    const root = globalThis.document?.documentElement;

    if (root) {
      root.classList.remove("light", "dark");
      root.classList.add(theme);
    }
  }, [theme]);

  return <>{children}</>;
};

function App() {
  const isAuthenticated = useAuthStore((s) => s.isAuthenticated);

  return (
    <ThemeProvider>
      {isAuthenticated ? (
        <div className="min-h-screen bg-background-light dark:bg-background-dark p-6">
          <div className="flex justify-end mb-4">
            <ThemeToggle />
          </div>
          <h1 className="text-2xl font-semibold text-gray-900 dark:text-gray-100 mb-4">
            Bem-vindo à aplicação Viva Plena
          </h1>
          <p className="text-gray-700 dark:text-gray-300">
            Você está autenticado com credenciais mockadas.
          </p>
        </div>
      ) : (
        <LoginPage />
      )}
    </ThemeProvider>
  );
}

export default App;
