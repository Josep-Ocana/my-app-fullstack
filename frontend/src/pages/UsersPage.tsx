import { useEffect } from "react";
import UserForm from "../components/UserForm";
import UserList from "../components/UserList";
import { useUsers } from "../hook/useUsers";

const UsersPage = () => {
  const { loading, error, fetchUsers } = useUsers();

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <div className="max-w-4xl mx-auto p-4">
      <h1 className="bg-blue-950 text-center text-white p-3 text-3xl mb-10 rounded-lg shadow-lg">
        Panel de Gestión
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="md:col-span-1">
          <h2 className="text-xl font-semibold mb-4 border-b">Nuevo Usuario</h2>
          <UserForm />
        </div>

        <div className="md:col-span-2">
          <h2 className="text-xl font-semibold mb-4 border-b">
            Lista de Usuarios
          </h2>
          {loading && <p>Cargando Usuarios</p>}
          {error && <p className="text-red-500">{error}</p>}
          <UserList />
        </div>
      </div>
    </div>
  );
};

export default UsersPage;
