import { useEffect } from "react";
import UserList from "../components/UserList";
import { useUsers } from "../hook/useUsers";

const UsersPage = () => {
  const { users, loading, error, fetchUsers } = useUsers();

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <div>
      <h1 className="bg-blue-950 text-center text-white p-3 text-3xl mb-5">
        Usuarios
      </h1>

      {loading && <p>Cargando Usuarios</p>}
      {error && <p className="text-red-500">{error}</p>}

      <UserList />
    </div>
  );
};

export default UsersPage;
