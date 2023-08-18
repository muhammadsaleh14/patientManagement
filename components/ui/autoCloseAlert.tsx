import React, { useState, useEffect } from "react";
import { Alert, AlertTitle } from "@mui/material";
interface Props {
  title: String;
  severity: "error" | "warning" | "info" | "success";
  message: String;
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
