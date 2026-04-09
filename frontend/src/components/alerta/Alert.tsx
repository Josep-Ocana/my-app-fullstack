import { AlertCircle, CheckCircle, Info, X } from "lucide-react";
import { useEffect } from "react";

export type AlertType = "success" | "error" | "warning" | "info";

export interface AlertMessage {
  id: string;
  type: AlertType;
  message: string;
  duration?: number;
}

interface AlertProps extends AlertMessage {
  onClose: () => void;
}

const Alert = ({ id, type, message, duration = 4000, onClose }: AlertProps) => {
  useEffect(() => {
    if (duration > 0) {
      const timer = setTimeout(onClose, duration);
      return () => clearTimeout(timer);
    }
  }, [duration, onClose]);

  const getStyles = () => {
    const baseStyles =
      "flex items-center gap-3 p-4 rounded-lg shadow-lg animate-slide-in";
    const typeStyles = {
      success: "bg-green-50 border border-green-200 text-green-800",
      error: "bg-red-50 border border-red-200 text-red-800",
      warning: "bg-yellow-50 border border-yellow-200 text-yellow-800",
      info: "bg-blue-50 border border-blue-200 text-blue-800",
    };

    return `${baseStyles} ${typeStyles[type]}`;
  };

  const getIcon = () => {
    const iconProps = "w-5 h-5 flex-shrink-0";
    switch (type) {
      case "success":
        return <CheckCircle className={`${iconProps} text-green-600`} />;
      case "error":
        return <AlertCircle className={`${iconProps} text-red-600`} />;
      case "warning":
        return <AlertCircle className={`${iconProps} text-yellow-600`} />;
      case "info":
        return <Info className={`${iconProps} text-blue-600`} />;
    }
  };

  return (
    <div key={id} className={getStyles()}>
      {getIcon()}
      <p className="flex-1 text-sm font-medium">{message}</p>
      <button
        onClick={onClose}
        className="text-gray-400 hover:text-gray-600 transition-colors"
      >
        <X className="w-5 h-5" />
      </button>
    </div>
  );
};

export default Alert;
