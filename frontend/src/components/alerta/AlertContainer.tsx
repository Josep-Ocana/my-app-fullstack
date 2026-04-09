import Alert from "./Alert";
import ConfirmAlert from "./ConfirmAlert";
import { useAlert } from "./useAlert";

const AlertContainer = () => {
  const { alerts, removeAlert, confirm, closeConfirm } = useAlert();

  return (
    <>
      <div className="fixed top-4 right-4 z-50 flex flex-col gap-3 max-w-md">
        {alerts.map((alert) => (
          <Alert
            key={alert.id}
            {...alert}
            onClose={() => removeAlert(alert.id)}
          />
        ))}
      </div>

      {confirm.isOpen && (
        <ConfirmAlert
          title={confirm.title}
          message={confirm.message}
          confirmText={confirm.confirmText}
          cancelText={confirm.cancelText}
          type={confirm.type}
          onConfirm={() => confirm.onConfirm?.()}
          onCancel={closeConfirm}
        />
      )}
    </>
  );
};

export default AlertContainer;
