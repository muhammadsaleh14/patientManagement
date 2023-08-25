"use client";
import { createContext, useContext, useEffect, useState } from "react";

const PatientDateContext = createContext<
  | ""
  | {
      patientDate: string;
      setPatientDate: (newDate: string) => void;
    }
>("");

export function DateContextProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [patientDate, setPatientDate] = useState(() => {
    // Retrieve state from localStorage during initialization
    if (typeof window !== "undefined") {
      const storedPatientDate = localStorage.getItem("patientDate");
      return storedPatientDate ? JSON.parse(storedPatientDate) : undefined;
      // Perform localStorage action
    }
  });

  useEffect(() => {
    // Save state to localStorage whenever it changes
    localStorage.setItem("patientDate", JSON.stringify(patientDate));
  }, [patientDate]);

  const updatePatientDate = (newDate: string) => {
    setPatientDate(newDate);
  };

  const contextValue = {
    patientDate,
    setPatientDate: updatePatientDate,
  };

  return (
    <PatientDateContext.Provider value={contextValue}>
      {children}
    </PatientDateContext.Provider>
  );
}

export function usePatientDateContext() {
  const context = useContext(PatientDateContext);
  if (context === "") {
    throw new Error("Date Context is undefined");
  }
  return {
    patientDate: context.patientDate,
    setPatientDate: context.setPatientDate,
  };
}
