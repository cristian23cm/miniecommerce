<template>
  <div class="page">
    <!-- LEFT PANEL -->
    <div class="left">
      <div class="grid-lines"></div>
      <div class="left-content">
        <div class="brand">Mini Commerce</div>
      </div>
      <div class="hero-text">
        <h1>Tu tienda,<em>en línea.</em></h1>
        <p>Gestiona productos, pedidos y clientes desde un solo lugar. Simple, rápido y tuyo.</p>
      </div>
      <div class="left-footer">
        <div class="dot"></div>
        <span class="tagline">Node · Vue · MongoDB</span>
      </div>
    </div>

    <!-- RIGHT PANEL -->
    <div class="right">
      <div class="form-container">
        <div class="form-header">
          <div class="eyebrow">{{ activeTab === 'login' ? 'Bienvenido de vuelta' : 'Crea tu cuenta' }}</div>
          <h2>{{ activeTab === 'login' ? 'Accede a tu cuenta' : 'Regístrate gratis' }}</h2>
        </div>

        <!-- TABS -->
        <div class="tabs">
          <button class="tab" :class="{ active: activeTab === 'login' }" @click="switchTab('login')">
            Iniciar sesión
          </button>
          <button class="tab" :class="{ active: activeTab === 'register' }" @click="switchTab('register')">
            Registrarse
          </button>
        </div>

        <!-- ALERT -->
        <div v-if="alert.msg" class="alert" :class="alert.type">
          {{ alert.msg }}
        </div>

        <!-- FORM -->
        <form @submit.prevent="handleSubmit">
          <div class="field">
            <label for="email">Correo electrónico</label>
            <input id="email" v-model="form.email" type="email" placeholder="tu@correo.com" autocomplete="email" required />
          </div>
          <div class="field">
            <label for="password">Contraseña</label>
            <input id="password" v-model="form.password" type="password" placeholder="••••••••" autocomplete="current-password" required />
          </div>

          <button class="btn-primary" type="submit" :disabled="authStore.loading">
            <span v-if="authStore.loading" class="spinner"></span>
            <span v-else>{{ activeTab === 'login' ? 'Entrar →' : 'Crear cuenta →' }}</span>
          </button>
        </form>

        <!-- TOKEN SUCCESS -->
        <div v-if="tokenPreview" class="token-box">
          <div class="token-success">✓ Sesión iniciada — redirigiendo...</div>
          <div class="token-label">JWT Token</div>
          <div class="token-value">{{ tokenPreview }}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive } from "vue";
import { useRouter } from "vue-router";
import { useAuthStore } from "../stores/auth.js";

const router = useRouter();
const authStore = useAuthStore();

const activeTab = ref("login");
const tokenPreview = ref("");

const form = reactive({ email: "", password: "" });
const alert = reactive({ msg: "", type: "" });

function switchTab(tab) {
  activeTab.value = tab;
  alert.msg = "";
  tokenPreview.value = "";
  form.email = "";
  form.password = "";
}

async function handleSubmit() {
  alert.msg = "";
  tokenPreview.value = "";

  if (activeTab.value === "login") {
    const ok = await authStore.login(form.email, form.password);
    if (ok) {
      tokenPreview.value = authStore.token;
      setTimeout(() => router.push("/home"), 1500);
    } else {
      alert.msg = authStore.error;
      alert.type = "error";
    }
  } else {
    const ok = await authStore.register(form.email, form.password);
    if (ok) {
      alert.msg = "✓ Cuenta creada. Ahora puedes iniciar sesión.";
      alert.type = "success";
      form.email = "";
      form.password = "";
      setTimeout(() => switchTab("login"), 1800);
    } else {
      alert.msg = authStore.error;
      alert.type = "error";
    }
  }
}
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,700;1,400&family=DM+Mono:wght@300;400&display=swap');

.page {
  display: grid;
  grid-template-columns: 1fr 1fr;
  min-height: 100vh;
  overflow: hidden;
}

/* LEFT */
.left {
  position: relative;
  background: #1a1410;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 3rem;
  overflow: hidden;
}
.left::before {
  content: '';
  position: absolute;
  inset: 0;
  background:
    radial-gradient(ellipse 60% 80% at 20% 80%, rgba(184,73,10,0.35) 0%, transparent 70%),
    radial-gradient(ellipse 40% 50% at 80% 20%, rgba(184,73,10,0.15) 0%, transparent 60%);
}
.grid-lines {
  position: absolute;
  inset: 0;
  background-image:
    linear-gradient(rgba(255,255,255,0.04) 1px, transparent 1px),
    linear-gradient(90deg, rgba(255,255,255,0.04) 1px, transparent 1px);
  background-size: 40px 40px;
}
.left-content, .hero-text, .left-footer { position: relative; z-index: 1; }
.brand { font-family: 'Playfair Display', serif; font-size: 1rem; color: #e8dfc8; letter-spacing: 0.3em; text-transform: uppercase; opacity: 0.7; }
.hero-text h1 { font-family: 'Playfair Display', serif; font-size: clamp(3rem, 5vw, 5.5rem); line-height: 0.95; color: #f5f0e8; font-weight: 400; }
.hero-text h1 em { color: #b8490a; font-style: italic; display: block; }
.hero-text p { margin-top: 1.5rem; color: #7a6e60; font-size: 0.75rem; letter-spacing: 0.08em; line-height: 1.8; max-width: 28ch; }
.left-footer { display: flex; align-items: center; gap: 1.5rem; }
.dot { width: 6px; height: 6px; border-radius: 50%; background: #b8490a; }
.tagline { font-size: 0.65rem; letter-spacing: 0.15em; color: #7a6e60; text-transform: uppercase; }

/* RIGHT */
.right {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 3rem;
  position: relative;
}
.right::after {
  content: '';
  position: absolute;
  top: 2rem; right: 2rem; bottom: 2rem; left: 2rem;
  border: 1px solid #c8bfaa;
  pointer-events: none;
  border-radius: 2px;
}
.form-container { width: 100%; max-width: 380px; animation: fadeUp 0.5s ease both; }
@keyframes fadeUp { from { opacity: 0; transform: translateY(16px); } to { opacity: 1; transform: translateY(0); } }

.form-header { margin-bottom: 2.5rem; }
.eyebrow { font-size: 0.65rem; letter-spacing: 0.25em; text-transform: uppercase; color: #b8490a; margin-bottom: 0.75rem; }
.form-header h2 { font-family: 'Playfair Display', serif; font-size: 2.2rem; font-weight: 400; line-height: 1.1; }

/* TABS */
.tabs { display: flex; border-bottom: 1px solid #c8bfaa; margin-bottom: 2rem; }
.tab { padding: 0.6rem 1.2rem; font-family: 'DM Mono', monospace; font-size: 0.7rem; letter-spacing: 0.12em; text-transform: uppercase; background: none; border: none; cursor: pointer; color: #7a6e60; position: relative; transition: color 0.2s; }
.tab::after { content: ''; position: absolute; bottom: -1px; left: 0; right: 0; height: 2px; background: #b8490a; transform: scaleX(0); transition: transform 0.25s ease; }
.tab.active { color: #1a1410; }
.tab.active::after { transform: scaleX(1); }

/* ALERT */
.alert { padding: 0.75rem 1rem; font-size: 0.72rem; letter-spacing: 0.05em; margin-bottom: 1rem; border-left: 3px solid; }
.alert.error { border-color: #c0392b; background: #fdf0f0; color: #c0392b; }
.alert.success { border-color: #27ae60; background: #f0fdf4; color: #27ae60; }

/* FORM */
.field { margin-bottom: 1.25rem; }
label { display: block; font-size: 0.65rem; letter-spacing: 0.18em; text-transform: uppercase; color: #7a6e60; margin-bottom: 0.4rem; }
input { width: 100%; padding: 0.8rem 1rem; font-family: 'DM Mono', monospace; font-size: 0.85rem; background: white; border: 1px solid #c8bfaa; color: #1a1410; outline: none; transition: border-color 0.2s, box-shadow 0.2s; border-radius: 1px; }
input:focus { border-color: #b8490a; box-shadow: 0 0 0 3px rgba(184,73,10,0.08); }
input::placeholder { color: #c8bfaa; }

/* BUTTON */
.btn-primary { width: 100%; padding: 0.95rem; background: #1a1410; color: #f5f0e8; font-family: 'DM Mono', monospace; font-size: 0.75rem; letter-spacing: 0.2em; text-transform: uppercase; border: 2px solid #1a1410; cursor: pointer; margin-top: 0.5rem; transition: background 0.25s, color 0.25s; display: flex; align-items: center; justify-content: center; gap: 0.5rem; }
.btn-primary:hover:not(:disabled) { background: #b8490a; border-color: #b8490a; }
.btn-primary:disabled { opacity: 0.5; cursor: not-allowed; }

/* SPINNER */
.spinner { width: 14px; height: 14px; border: 2px solid rgba(255,255,255,0.3); border-top-color: white; border-radius: 50%; animation: spin 0.6s linear infinite; }
@keyframes spin { to { transform: rotate(360deg); } }

/* TOKEN */
.token-box { margin-top: 1.5rem; padding: 1rem; background: #f8f5f0; border: 1px solid #c8bfaa; border-left: 3px solid #b8490a; }
.token-success { font-size: 0.7rem; color: #27ae60; margin-bottom: 0.5rem; }
.token-label { font-size: 0.6rem; letter-spacing: 0.2em; text-transform: uppercase; color: #7a6e60; margin-bottom: 0.4rem; }
.token-value { font-size: 0.62rem; color: #1a1410; word-break: break-all; line-height: 1.5; opacity: 0.6; }

@media (max-width: 700px) {
  .page { grid-template-columns: 1fr; }
  .left { display: none; }
}
</style>
