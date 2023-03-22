import { toast, ToastPosition } from "react-toastify";

const toastStyle = {
  hideProgressBar: true,
  autoClose: 2000,
  position: 'bottom-right' as ToastPosition,
};

const showToast = (message: string, type: 'success' | 'error') => {
  toast(message, {
    ...toastStyle,
    type,
  });
};

export default showToast