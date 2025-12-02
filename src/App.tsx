import React, { useEffect } from "react";

import LoginPage from "./pages/LoginPage";
import { useThemeStore } from "./store/themeStore";
import { useAuthStore } from "./store/authStore";
import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import DashboardView from "./features/Dashboard/DashboardView";

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
  const location = useLocation();

  return (
    <ThemeProvider>
      <Routes>
        <Route
          path="/login"
          element={
            isAuthenticated ? (
              <Navigate to="/dashboard" replace />
            ) : (
              <LoginPage />
            )
          }
        />
        <Route
          path="/dashboard"
          element={
            isAuthenticated ? (
              <div className="min-h-screen bg-background-light dark:bg-background-dark">
                <DashboardView />
              </div>
            ) : (
              <Navigate to="/login" replace state={{ from: location }} />
            )
          }
        />
        <Route
          path="*"
          element={
            <Navigate to={isAuthenticated ? "/dashboard" : "/login"} replace />
          }
        />
      </Routes>
    </ThemeProvider>
  );
}

export default App;
