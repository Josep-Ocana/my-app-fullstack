import { UserProvider } from "./context/UserContext";
import UsersPage from "./pages/UsersPage";

function App() {
  return (
    <UserProvider>
      <UsersPage />
    </UserProvider>
  );
}

export default App;
