import axios from "axios";

import { useAuthStore } from "../../store/authStore";
import { useUserStore } from "../../store/userStore";

export const handleLogin = async (credentials: unknown) => {
  try {
    const response = await axios.post("/api/login", credentials);
    const { token, userProfile } = response.data;

    useAuthStore.getState().login(token);

    useUserStore.getState().setUser(userProfile);
  } catch (error: unknown) {
    console.error("Login failed:", error);
    throw error;
  }
};
