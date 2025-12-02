import React from "react";
import { useNavigate } from "react-router-dom";

import ThemeToggle from "../atoms/ThemeToggle";
import { useAuthStore } from "../../store/authStore";

const Header: React.FC = () => {
  const logout = useAuthStore((s) => s.logout);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login", { replace: true });
  };

  return (
    <header className="w-full flex items-center justify-end gap-3 p-4">
      <ThemeToggle />
      <button
        onClick={handleLogout}
        className="px-4 py-2 rounded-md bg-secondary hover:bg-secondary/90 text-white text-sm font-semibold"
      >
        Sair
      </button>
    </header>
  );
};

export default Header;
