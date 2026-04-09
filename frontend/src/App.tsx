import { UserProvider } from "./context/UserContext";
import { AlertProvider, AlertContainer } from "./components/alerta";
import UsersPage from "./pages/UsersPage";

function App() {
  return (
    <AlertProvider>
      <UserProvider>
        <AlertContainer />
        <UsersPage />
      </UserProvider>
    </AlertProvider>
  );
}

export default App;
