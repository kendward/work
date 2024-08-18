import { useMemo } from "react";
import { toast, ToastOptions } from "react-toastify";

export interface ToastConfig {
  position?: ToastOptions["position"];
  autoClose?: ToastOptions["autoClose"];
  hideProgressBar?: ToastOptions["hideProgressBar"];
  closeOnClick?: ToastOptions["closeOnClick"];
  pauseOnHover?: ToastOptions["pauseOnHover"];
  draggable?: ToastOptions["draggable"];
  theme?: ToastOptions["theme"];
}

interface UseToastReturn {
  showSuccess: (message: string, options?: ToastOptions) => void;
  showError: (message: string, options?: ToastOptions) => void;
  showInfo: (message: string, options?: ToastOptions) => void;
  showWarning: (message: string, options?: ToastOptions) => void;
  showDefault: (message: string, options?: ToastOptions) => void;
}

const defaultConfig: ToastConfig = {
  position: "top-right",
  autoClose: 3000,
  hideProgressBar: false,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: true,
  theme: "colored",
};

const useToaster = (config: ToastConfig = {}): UseToastReturn => {
  const mergedConfig = useMemo(() => {
    return { ...defaultConfig, ...config };
  }, [config]);

  const showSuccess = useMemo(
    () => (message: string, options?: ToastOptions) => {
      toast.success(message, { ...mergedConfig, ...options });
    },
    [mergedConfig]
  );

  const showError = useMemo(
    () => (message: string, options?: ToastOptions) => {
      toast.error(message, { ...mergedConfig, ...options });
    },
    [mergedConfig]
  );

  const showInfo = useMemo(
    () => (message: string, options?: ToastOptions) => {
      toast.info(message, { ...mergedConfig, ...options });
    },
    [mergedConfig]
  );

  const showWarning = useMemo(
    () => (message: string, options?: ToastOptions) => {
      toast.warning(message, { ...mergedConfig, ...options });
    },
    [mergedConfig]
  );

  const showDefault = useMemo(
    () => (message: string, options?: ToastOptions) => {
      toast(message, { ...mergedConfig, ...options });
    },
    [mergedConfig]
  );

  return {
    showSuccess,
    showError,
    showInfo,
    showWarning,
    showDefault,
  };
};

export default useToaster;
