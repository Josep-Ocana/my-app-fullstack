import { createContext, useCallback, useRef, useState } from "react";
import type { AlertMessage, AlertType } from "./Alert";

export type ConfirmType = "warning" | "error" | "info";

export interface ConfirmState {
  isOpen: boolean;
  title: string;
  message: string;
  onConfirm: () => void;
  onCancel: () => void;
  confirmText: string;
  cancelText: string;
  type: ConfirmType;
}

interface AlertContextType {
  alerts: AlertMessage[];
  showAlert: (message: string, type: AlertType, duration?: number) => string;
  removeAlert: (id: string) => void;
  clearAlerts: () => void;
  confirm: ConfirmState;
  showConfirm: (
    message: string,
    options?: { title?: string; confirmText?: string; cancelText?: string; type?: ConfirmType }
  ) => Promise<boolean>;
  closeConfirm: () => void;
}

export const AlertContext = createContext<AlertContextType | undefined>(
  undefined,
);

interface AlertProviderProps {
  children: React.ReactNode;
}

const defaultConfirm: ConfirmState = {
  isOpen: false,
  title: "",
  message: "",
  onConfirm: () => {},
  onCancel: () => {},
  confirmText: "Confirmar",
  cancelText: "Cancelar",
  type: "warning",
};

export const AlertProvider = ({ children }: AlertProviderProps) => {
  const [alerts, setAlerts] = useState<AlertMessage[]>([]);
  const [confirm, setConfirm] = useState<ConfirmState>(defaultConfirm);
  const resolveRef = useRef<((value: boolean) => void) | null>(null);

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

  const showConfirm = useCallback(
    (
      message: string,
      options: { title?: string; confirmText?: string; cancelText?: string; type?: ConfirmType } = {}
    ): Promise<boolean> => {
      return new Promise((resolve) => {
        resolveRef.current = resolve;
        setConfirm({
          isOpen: true,
          title: options.title || "Confirmar",
          message,
          confirmText: options.confirmText || "Confirmar",
          cancelText: options.cancelText || "Cancelar",
          type: options.type || "warning",
          onConfirm: () => {
            setConfirm((prev) => ({ ...prev, isOpen: false }));
            resolveRef.current?.(true);
            resolveRef.current = null;
          },
          onCancel: () => {
            setConfirm((prev) => ({ ...prev, isOpen: false }));
            resolveRef.current?.(false);
            resolveRef.current = null;
          },
        });
      });
    },
    [],
  );

  const closeConfirm = useCallback(() => {
    setConfirm((prev) => ({ ...prev, isOpen: false }));
    resolveRef.current?.(false);
    resolveRef.current = null;
  }, []);

  const value: AlertContextType = {
    alerts,
    showAlert,
    removeAlert,
    clearAlerts,
    confirm,
    showConfirm,
    closeConfirm,
  };

  return (
    <AlertContext.Provider value={value}>{children}</AlertContext.Provider>
  );
};
