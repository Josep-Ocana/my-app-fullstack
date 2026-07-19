# my-app-fullstack

CRUD de usuarios full-stack: formulario de alta/edición a la izquierda, listado a la derecha. Permite crear, listar, actualizar y eliminar usuarios.

🔗 **Demo en vivo:** https://my-app-fullstack.vercel.app/
🔗 **API (backend):** https://my-app-fullstack.onrender.com

> ⚠️ El backend está en el free tier de Render: si lleva un rato sin recibir peticiones, "duerme" y la primera petición puede tardar 30-50 segundos en responder.

## Stack

**Backend**
- Node.js + Express 5 + TypeScript
- MongoDB + Mongoose
- Zod (validación de esquemas)
- bcrypt (hash de contraseñas)

**Frontend**
- React 19 + TypeScript + Vite
- Tailwind CSS
- React Hook Form
- Axios

## Estructura

```
backend/    API REST (Express + MongoDB)
frontend/   SPA (React + Vite)
```

## Instalación en local

Requiere Node.js y una base de datos MongoDB (local o Atlas).

### Backend

```bash
cd backend
npm install
cp .env.example .env   # rellena MONGODB_URI y FRONTEND_URL
npm run dev
```

### Frontend

```bash
cd frontend
npm install
cp .env.example .env   # rellena VITE_API_URL
npm run dev
```

## Endpoints principales (`/api/users`)

| Método | Ruta   | Descripción              |
|--------|--------|---------------------------|
| GET    | `/`    | Listar usuarios           |
| GET    | `/:id` | Obtener un usuario         |
| POST   | `/`    | Crear usuario              |
| PUT    | `/:id` | Actualizar usuario (parcial)|
| DELETE | `/:id` | Eliminar usuario           |

## Despliegue

- Backend: [Render](https://render.com)
- Frontend: [Vercel](https://vercel.com)
- Base de datos: [MongoDB Atlas](https://www.mongodb.com/atlas)
