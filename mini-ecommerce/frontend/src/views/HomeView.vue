<template>
  <div class="dashboard">
    <header class="header">
      <div class="header-brand">Mini Commerce</div>
      <div class="header-right">
        <span class="user-email">{{ authStore.user?.email }}</span>
        <button class="btn-logout" @click="handleLogout">Cerrar sesión</button>
      </div>
    </header>

    <main class="main">
      <div class="welcome">
        <h1>Bienvenido, <em>{{ authStore.user?.email }}</em></h1>
        <p>Panel de control — Aquí irán tus productos, pedidos y estadísticas.</p>
      </div>

      <div class="cards">
        <div class="card">
          <div class="card-icon">📦</div>
          <div class="card-label">Productos</div>
          <div class="card-value">0</div>
        </div>
        <div class="card">
          <div class="card-icon">🛒</div>
          <div class="card-label">Pedidos</div>
          <div class="card-value">0</div>
        </div>
        <div class="card">
          <div class="card-icon">👤</div>
          <div class="card-label">Rol</div>
          <div class="card-value">{{ authStore.user?.role }}</div>
        </div>
      </div>
    </main>
  </div>
</template>

<script setup>
import { useRouter } from "vue-router";
import { useAuthStore } from "../stores/auth.js";

const router = useRouter();
const authStore = useAuthStore();

function handleLogout() {
  authStore.logout();
  router.push("/login");
}
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;1,400&family=DM+Mono:wght@300;400&display=swap');

.dashboard { min-height: 100vh; background: #f5f0e8; font-family: 'DM Mono', monospace; }

.header { display: flex; justify-content: space-between; align-items: center; padding: 1.25rem 2.5rem; background: #1a1410; color: #f5f0e8; }
.header-brand { font-family: 'Playfair Display', serif; font-size: 1.1rem; letter-spacing: 0.1em; }
.header-right { display: flex; align-items: center; gap: 1.5rem; }
.user-email { font-size: 0.72rem; color: #7a6e60; letter-spacing: 0.05em; }
.btn-logout { font-family: 'DM Mono', monospace; font-size: 0.68rem; letter-spacing: 0.15em; text-transform: uppercase; background: none; border: 1px solid #7a6e60; color: #c8bfaa; padding: 0.4rem 0.9rem; cursor: pointer; transition: border-color 0.2s, color 0.2s; }
.btn-logout:hover { border-color: #b8490a; color: #b8490a; }

.main { padding: 3rem 2.5rem; max-width: 900px; margin: 0 auto; }

.welcome { margin-bottom: 3rem; }
.welcome h1 { font-family: 'Playfair Display', serif; font-size: 2.5rem; font-weight: 400; color: #1a1410; }
.welcome h1 em { color: #b8490a; font-style: italic; }
.welcome p { margin-top: 0.75rem; font-size: 0.78rem; color: #7a6e60; letter-spacing: 0.05em; }

.cards { display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 1.5rem; }
.card { background: white; border: 1px solid #c8bfaa; padding: 2rem 1.5rem; border-left: 3px solid #b8490a; }
.card-icon { font-size: 1.5rem; margin-bottom: 0.75rem; }
.card-label { font-size: 0.65rem; letter-spacing: 0.2em; text-transform: uppercase; color: #7a6e60; margin-bottom: 0.4rem; }
.card-value { font-family: 'Playfair Display', serif; font-size: 2rem; color: #1a1410; }
</style>
