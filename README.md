# CONTEXT.md — my-app-fullstack

> Este archivo resume el estado del proyecto para retomar el trabajo en nuevas sesiones con Claude. No se sube a Git.

## 1. Descripción general

CRUD de usuarios full-stack, con formulario a la izquierda (crear/editar) y listado a la derecha (leer/borrar). Proyecto de práctica, estructurado en dos carpetas independientes (`backend` y `frontend`) dentro del mismo repo.

- Repo: https://github.com/Josep-Ocana/my-app-fullstack
- Sin despliegue todavía (no hay README raíz ni deploy en Vercel/Render).

## 2. Stack tecnológico

**Backend** (`/backend`)
- Node.js + Express 5
- TypeScript + ts-node + nodemon (dev), `tsc` (build)
- MongoDB + Mongoose 9
- Zod (validación de esquemas)
- bcrypt (hash de contraseña)
- cors, dotenv

**Frontend** (`/frontend`)
- React 19 + TypeScript + Vite 7 (plugin `@vitejs/plugin-react-swc`)
- Tailwind CSS v4 (`@tailwindcss/vite`)
- React Hook Form (validación de formularios)
- Axios (llamadas HTTP)
- lucide-react (iconos)
- Gestión de estado: `useReducer` + Context API (mismo patrón que en Mi Gestor de Tareas, sin Zustand/Redux)

## 3. Estructura del proyecto

```
backend/
  src/
    index.ts              # servidor Express, middlewares, conexión BD
    db/connection.ts       # conexión a MongoDB con mongoose
    models/User.ts         # esquema Mongoose + esquema Zod (UserSchema) + hash de password (pre-save)
    controllers/userController.ts  # createUser, getAllUsers, getUserById, updateUser, deleteUser
    routes/userRoutes.ts   # define las rutas /api/users
  users.http               # peticiones de prueba (REST Client)

frontend/
  src/
    App.tsx                # compone AlertProvider + UserProvider + UsersPage
    context/UserContext.tsx     # Provider: fetchUsers, addUser, deleteUser, updateUser, selectUserToEdit, cancelEdit
    reducers/userReducer.ts     # estado: users, loading, error, editingUser + acciones START/SUCCESS/ERROR
    hook/useUsers.ts            # hook para consumir ambos contexts (state + actions)
    services/userService.ts     # instancia axios + getUsers/addUserService/deleteUserService/updateUserService
    types/user.ts                # User, NewUser, UsersContextType, UsersActionsType
    pages/UsersPage.tsx           # layout: grid con UserForm (col 1) y UserList (col 2)
    components/
      UserForm.tsx          # formulario (crear/editar) con react-hook-form, cambia modo si hay editingUser
      UserList.tsx           # lista de UserItem, mensaje si no hay usuarios
      UserItem.tsx            # fila de usuario con acciones Editar/Eliminar + confirm de borrado
      alerta/                 # sistema propio de alertas y confirmaciones (Alert, AlertContainer, AlertContext, ConfirmAlert, useAlert, useUserAlerts)
```

## 4. Modelo de datos (User)

Campos: `name` (min 3), `password` (min 6, hasheada con bcrypt antes de guardar, `select: false` para no devolverla), `email` (único, válido), `phone` (único, min 9 dígitos).

Doble validación: Zod (`UserSchema`, y `UserSchema.partial()` para el update) en el controller, y Mongoose schema con sus propios `required`/`minlength`/`unique` a nivel de BD.

## 5. Endpoints API (`/api/users`)

| Método | Ruta         | Función             |
|--------|--------------|----------------------|
| GET    | `/`          | getAllUsers          |
| GET    | `/:id`       | getUserById          |
| POST   | `/`          | createUser           |
| PUT    | `/:id`       | updateUser (acepta parcial) |
| DELETE | `/:id`       | deleteUser           |

Manejo de errores: Zod errors → 400 con array de mensajes; duplicados de Mongo (código 11000, email/phone) → 400 con mensaje específico del campo.

## 6. Flujo de datos en frontend

1. `UsersPage` monta y dispara `fetchUsers` desde el Context.
2. `UserForm` crea o edita según si `editingUser` está seteado (mismo formulario, cambia título/botón/lógica de submit).
3. Tras crear/actualizar/eliminar, el reducer actualiza el array `users` en memoria (sin volver a pedir todo el listado al backend).
4. Feedback al usuario vía sistema de alertas propio (`alerta/`) — éxito, error, warning, info — y `showConfirm` para confirmar el borrado.

## 7. Estado actual (CRUD completo)

- ✅ Crear usuario (con validaciones de Zod + react-hook-form)
- ✅ Listar usuarios
- ✅ Editar usuario (reutiliza el mismo formulario, precarga con `reset(editingUser)`)
- ✅ Eliminar usuario (con modal de confirmación)
- ✅ Sistema de alertas visuales propio con Tailwind
- ✅ Manejo de errores tipado con Axios (`AxiosError<ApiError>`)

## 8. Convenciones de trabajo

- Commits convencionales con scope: `feat(frontend):`, `feat(backend):`, `chore(backend):`, `refactor(frontend):`, siempre en inglés.
- Un único branch `main`, sin feature branches por ahora.
- Desarrollo backend-first: primero se construyó toda la API (modelo, rutas, controller, conexión BD) y después el frontend consumiendo esa API.

## 9. Pendiente / posibles siguientes pasos

- No hay despliegue (backend ni frontend).
- No hay autenticación/login real (el modelo tiene password hasheada pero no hay endpoint de login ni JWT).
- No hay tests.
- Posible mejora: paginación o búsqueda en la lista de usuarios.
- Posible mejora: variables de entorno documentadas (`.env.example`) — no está en el repo.
