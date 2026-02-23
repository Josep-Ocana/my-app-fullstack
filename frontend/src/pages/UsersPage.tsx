import { useEffect, useState } from "react";
import UserList from "../components/UserList";
import { getUsers } from "../services/userService";
import type { User } from "../types/user";

const UsersPage = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const data = await getUsers();
        setUsers(data);
      } catch (error) {
        setError("Error al obtener los usuarios");
      } finally {
        setLoading(false);
      }
    };
    fetchUsers();
  }, []);

  if (loading) return <p>Cargando usuarios...</p>;
  if (error) return <p>{error}</p>;
  return (
    <div>
      <h1>Usurios</h1>
      <UserList users={users} />
    </div>
  );
};

export default UsersPage;
