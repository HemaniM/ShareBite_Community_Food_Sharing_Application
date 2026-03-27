import React from "react";
import { toast } from "react-toastify";
import ThemedToast from "../components/ui/ThemedToast";

const getToastOptions = (options = {}) => ({
  icon: false,
  ...options,
});

export const showSuccessToast = (message, options = {}) =>
  toast.success(<ThemedToast type="success" message={message} />, {
    ...getToastOptions(options),
  });

export const showErrorToast = (message, options = {}) =>
  toast.error(<ThemedToast type="error" message={message} />, {
    ...getToastOptions(options),
  });

export const showInfoToast = (message, options = {}) =>
  toast.info(<ThemedToast type="info" message={message} />, {
    ...getToastOptions(options),
  });
