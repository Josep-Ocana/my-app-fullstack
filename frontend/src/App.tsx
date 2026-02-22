import { useEffect } from "react";
import { getUsers } from "./services/userService";

function App() {
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const users = await getUsers();
        console.log(users);
      } catch (error) {
        console.error("Error obteniendo usuarios", error);
      }
    };
    fetchUsers();
  }, []);
  return (
    <>
      <h1 className="text-2xl">Probando conexión...</h1>
    </>
  );
}

export default App;
