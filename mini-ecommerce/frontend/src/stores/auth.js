import { defineStore } from "pinia";
import api from "../api.js";

export const useAuthStore = defineStore("auth", {
  state: () => ({
    token: localStorage.getItem("token") || null,
    user: JSON.parse(localStorage.getItem("user") || "null"),
    loading: false,
    error: null,
  }),

  getters: {
    isLoggedIn: (state) => !!state.token,
    isAdmin: (state) => state.user?.role === "admin",
  },

  actions: {
    async login(email, password) {
      this.loading = true;
      this.error = null;
      try {
        const { data } = await api.post("/auth/login", { email, password });
        this.token = data.token;
        this.user = data.user;
        localStorage.setItem("token", data.token);
        localStorage.setItem("user", JSON.stringify(data.user));
        return true;
      } catch (err) {
        this.error = err.response?.data?.msg || "Error al iniciar sesión";
        return false;
      } finally {
        this.loading = false;
      }
    },

    async register(email, password) {
      this.loading = true;
      this.error = null;
      try {
        await api.post("/auth/register", { email, password });
        return true;
      } catch (err) {
        this.error = err.response?.data?.msg || "Error al registrarse";
        return false;
      } finally {
        this.loading = false;
      }
    },

    logout() {
      this.token = null;
      this.user = null;
      localStorage.removeItem("token");
      localStorage.removeItem("user");
    },
  },
});
