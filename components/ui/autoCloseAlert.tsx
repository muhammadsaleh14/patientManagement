import React, { useEffect } from "react";
import { Alert, AlertTitle } from "@mui/material";
interface Props {
  title: string;
  severity: "error" | "warning" | "info" | "success";
  message: string;
  onClose: () => void;
}

function AutoCloseAlert({ title, severity, message, onClose }: Props) {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, 4000); // Adjust the time (in milliseconds) as needed

    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <div className="fixed top-0 left-1/2 transform -translate-x-1/2">
      <Alert severity={severity}>
        <AlertTitle>{title}</AlertTitle>
        {message}
      </Alert>
    </div>
  );
}

export default AutoCloseAlert;
