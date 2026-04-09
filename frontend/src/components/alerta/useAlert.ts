import { useContext, useState, useCallback } from "react";
import { AlertContext } from "./AlertContext";

interface ConfirmOptions {
  title?: string;
  confirmText?: string;
  cancelText?: string;
  type?: "warning" | "error" | "info";
}

export const useAlert = () => {
  const context = useContext(AlertContext);
  const [confirm, setConfirm] = useState<{
    isOpen: boolean;
    title: string;
    message: string;
    onConfirm?: () => void;
    onCancel?: () => void;
    confirmText: string;
    cancelText: string;
    type: "warning" | "error" | "info";
  }>({
    isOpen: false,
    title: "",
    message: "",
    confirmText: "Confirmar",
    cancelText: "Cancelar",
    type: "warning",
  });

  if (!context) {
    throw new Error("useAlert debe usarse dentro de AlertProvider");
  }

  const showConfirm = useCallback(
    (
      message: string,
      options: ConfirmOptions = {}
    ): Promise<boolean> => {
      return new Promise((resolve) => {
        setConfirm({
          isOpen: true,
          title: options.title || "Confirmar",
          message,
          confirmText: options.confirmText || "Confirmar",
          cancelText: options.cancelText || "Cancelar",
          type: options.type || "warning",
          onConfirm: () => {
            setConfirm((prev) => ({ ...prev, isOpen: false }));
            resolve(true);
          },
          onCancel: () => {
            setConfirm((prev) => ({ ...prev, isOpen: false }));
            resolve(false);
          },
        });
      });
    },
    []
  );

  const closeConfirm = useCallback(() => {
    confirm.onCancel?.();
  }, [confirm]);

  return {
    ...context,
    showConfirm,
    confirm,
    closeConfirm,
  };
};
