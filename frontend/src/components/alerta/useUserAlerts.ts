import { useEffect } from "react";
import { useUsers } from "../../hook/useUsers";
import { useAlert } from "./useAlert";

/**
 * Hook que integra los errores del contexto de usuarios con el sistema de alertas
 * Muestra automáticamente alertas cuando hay errores del backend
 */
export const useUserAlerts = () => {
  const { showAlert } = useAlert();
  const { error } = useUsers();

  // Mostrar alerta cuando hay un error del backend
  useEffect(() => {
    if (error) {
      showAlert(error, "error", 4000);
    }
  }, [error, showAlert]);

  return { showAlert };
};
