import { createContext, useCallback, useState } from "react";
import type { AlertMessage, AlertType } from "./Alert";

interface AlertContextType {
  alerts: AlertMessage[];
  showAlert: (message: string, type: AlertType, duration?: number) => string;
  removeAlert: (id: string) => void;
  clearAlerts: () => void;
}

export const AlertContext = createContext<AlertContextType | undefined>(
  undefined,
);

interface AlertProviderProps {
  children: React.ReactNode;
}

export const AlertProvider = ({ children }: AlertProviderProps) => {
  const [alerts, setAlerts] = useState<AlertMessage[]>([]);

  const showAlert = useCallback(
    (message: string, type: AlertType, duration: number = 4000) => {
      const id = Date.now().toString();
      const newAlert: AlertMessage = { id, message, type, duration };

      setAlerts((prev) => [...prev, newAlert]);
      return id;
    },
    [],
  );

  const removeAlert = useCallback((id: string) => {
    setAlerts((prev) => prev.filter((alert) => alert.id !== id));
  }, []);

  const clearAlerts = useCallback(() => {
    setAlerts([]);
  }, []);

  const value: AlertContextType = {
    alerts,
    showAlert,
    removeAlert,
    clearAlerts,
  };

  return (
    <AlertContext.Provider value={value}>{children}</AlertContext.Provider>
  );
};
