import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";

export default defineConfig({
  plugins: [vue()],
  server: {
    port: 5173,
    proxy: {
      // Redirige /api/* al backend para evitar problemas de CORS en desarrollo
      "/api": {
        target: "http://localhost:3000",
        changeOrigin: true,
      },
    },
  },
});
