import Snackbar from "../ui-component/common/Snackbar";
import { createContext, useContext, useState } from "react";

const NotificationContext = createContext();

export function NotificationProvider({ children }) {
  const [notification, setNotification] = useState({
    open: false,
    message: "",
  });

  const showNotification = (message) => {
    setNotification({
      open: true,
      message,
    });
  };

  const handleClose = () => {
    setNotification((prev) => ({
      ...prev,
      open: false,
    }));
  };

  return (
    <NotificationContext.Provider value={{ showNotification }}>
      {children}
      
      <Snackbar
        open={notification.open}
        message={notification.message}
        onClose={handleClose}
      />
    </NotificationContext.Provider>
  );
}

export const useNotification = () => useContext(NotificationContext);
