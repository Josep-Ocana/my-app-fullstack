import { useEffect, useState } from "react";
import { getUsers } from "../services/userService";
import type { User } from "../types/user";

const UsersPage = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<String>("");

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
      {users.length === 0 ? (
        <p>No hay usuarios disponibles</p>
      ) : (
        <ul>
          {users.map((user) => (
            <li key={user._id}>
              {user.name} - {user.email} - {user.phone}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default UsersPage;
