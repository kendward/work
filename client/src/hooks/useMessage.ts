import { useState, useCallback } from "react";

const useMessage = () => {
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const setErrorMessage = useCallback((message: string) => {
    setError(message);
    setSuccess(null);
  }, []);

  const setSuccessMessage = useCallback((message: string) => {
    setSuccess(message);
    setError(null);
  }, []);

  const clearMessages = useCallback(() => {
    setError(null);
    setSuccess(null);
  }, []);

  return {
    error,
    success,
    setErrorMessage,
    setSuccessMessage,
    clearMessages,
  };
};

export default useMessage;
