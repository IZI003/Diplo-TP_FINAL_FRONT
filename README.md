🎰 Bingo – Frontend

Frontend del sistema Bingo, desarrollado con React + Vite, orientado a una experiencia moderna, rápida y en tiempo real, con comunicación vía Socket.IO y una interfaz responsive construida con Tailwind CSS.

🚀 Tecnologías utilizadas
⚛️ Framework y herramientas base

React 19 – Biblioteca principal para la construcción de la interfaz.

Vite – Bundler y entorno de desarrollo rápido.

JavaScript (ES Modules) – Proyecto configurado con "type": "module".

🎨 Estilos y UI

Tailwind CSS 4 – Framework de estilos utility-first.

PostCSS – Procesamiento de estilos.

Autoprefixer – Compatibilidad entre navegadores.

Framer Motion / Motion – Animaciones y transiciones.

React Spinners – Indicadores de carga.

🔀 Navegación

React Router DOM v7 – Manejo de rutas y navegación en la aplicación.

🔐 Autenticación y estado

JWT Decode – Decodificación de tokens JWT.

Context API – Manejo de estado global (Auth, Usuario, Socket, etc.).

🌐 Comunicación con Backend

Axios – Cliente HTTP para consumir la API REST.

Socket.IO Client – Comunicación en tiempo real con el backend.

🔔 Notificaciones y alertas

SweetAlert2 – Alertas modales.

@sweetalert2/ngx-sweetalert2 – Integración avanzada.

React Toastify – Notificaciones tipo toast.

🧹 Calidad de código

ESLint – Análisis estático de código.

eslint-plugin-react-hooks

eslint-plugin-react-refresh

📦 Scripts disponibles
# Desarrollo
npm run dev

# Build de producción
npm run build

# Preview del build
npm run preview

# Linter
npm run lint

⚙️ Variables de entorno

El frontend utiliza variables de entorno definidas en archivos .env compatibles con Vite:

VITE_API_URL=http://localhost:4000/api
VITE_SOCKET_URL=http://localhost:4000


⚠️ En producción, estas variables deben estar embebidas al momento del build.

📁 Estructura general

src/
├── Context/        # Contextos globales (Auth, Socket, User, etc.)
├── socket/         # Configuración de Socket.IO
├── components/     # Componentes reutilizables
├── pages/          # Vistas principales
├── App.jsx
└── main.jsx

🧩 Funcionalidades principales

Autenticación con JWT

Comunicación en tiempo real con Socket.IO

Navegación SPA

UI responsive

Manejo global de estado

Animaciones fluidas

Alertas y notificaciones

📌 Estado del proyecto

🟢 En desarrollo / producción activa
