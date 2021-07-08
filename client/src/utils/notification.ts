import { store } from "react-notifications-component";

export const showNotification = (
  type: "success" | "danger" | "info" | "default" | "warning" | undefined,
  title: string,
  message: string
) =>
  store.addNotification({
    title,
    message,
    type,
    insert: "top",
    container: "top-right",
    animationIn: ["animate__animated", "animate__fadeIn"],
    animationOut: ["animate__animated", "animate__fadeOut"],
    dismiss: {
      duration: 5000,
      onScreen: true,
    },
  });

export const showWarningNotification = (message: string) =>
  showNotification("warning", "Warning", message);

export const showErrorNotification = (message: string) =>
  showNotification("danger", "Error", message);
