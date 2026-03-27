# Mini E-commerce

Proyecto fullstack con:
- **Backend**: Node.js + Express + MongoDB + JWT
- **Frontend**: Vue 3 + Pinia + Vue Router + Vite
- **Auth**: Registro e inicio de sesión con JWT

## Estructura del proyecto

```
mini-ecommerce/
├── backend/
│   ├── src/
│   │   ├── app.js                     # Entrada, CORS, conexión DB
│   │   ├── routes/
│   │   │   └── auth.routes.js
│   │   ├── controllers/
│   │   │   └── auth.controller.js
│   │   ├── models/
│   │   │   └── User.js
│   │   └── middleware/
│   │       └── auth.middleware.js     # Verificación JWT
│   ├── .env                           # Variables de entorno (no subir a git)
│   ├── .env.example
│   └── package.json
│
└── frontend/
    ├── src/
    │   ├── main.js
    │   ├── App.vue
    │   ├── api.js                     # Axios con interceptors
    │   ├── style.css
    │   ├── views/
    │   │   ├── LoginView.vue
    │   │   └── HomeView.vue
    │   ├── stores/
    │   │   ├── auth.js                # Pinia: login, register, logout
    │   │   └── cart.js                # Pinia: carrito
    │   └── router/
    │       └── index.js               # Rutas con guard de autenticación
    ├── index.html
    ├── vite.config.js                 # Proxy /api → localhost:3000
    └── package.json
```

## Instalación

### 1. Backend

```bash
cd backend
npm install
```

Crea el archivo `.env` (ya incluido, revisa los valores):
```env
MONGO_URI=mongodb://localhost:27017/ecommerce
JWT_SECRET=secret123
PORT=3000
```

> ⚠️ Necesitas MongoDB corriendo localmente, o usa [MongoDB Atlas](https://www.mongodb.com/atlas) (gratuito).

```bash
npm run dev
```

Verás: `✅ Base de datos conectada` y `🚀 Servidor en http://localhost:3000`

### 2. Frontend

```bash
cd frontend
npm install
npm run dev
```

Abre: [http://localhost:5173](http://localhost:5173)

## Endpoints del backend

| Método | Ruta | Descripción |
|--------|------|-------------|
| POST | `/api/auth/register` | Registrar usuario |
| POST | `/api/auth/login` | Iniciar sesión → devuelve JWT |
| GET | `/api/health` | Verificar que el servidor está activo |

## Notas importantes

- El frontend usa un **proxy de Vite** (`vite.config.js`) para redirigir `/api/*` al backend, evitando errores de CORS en desarrollo.
- El token JWT se guarda en `localStorage` y se envía automáticamente en cada petición via `api.js`.
- El router tiene un **guard de autenticación**: si no hay token, redirige a `/login`.
