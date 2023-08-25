"use client";
import React, { createContext, useEffect, useState } from "react";
import { Patient } from "./interfaces/databaseInterfaces";

export const PatientContext = createContext<
  | {
      patient: Patient | undefined;
      setPatient: (newPatient: Patient) => void;
    }
  | undefined
>(undefined);

export const usePatientContext = () => {
  const patientContext = React.useContext(PatientContext);
  if (patientContext?.setPatient === undefined) {
    throw new Error("setPatient is undefined");
  }
  return {
    patient: patientContext?.patient,
    setPatient: patientContext.setPatient,
  };
};

export function PatientContextProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [patient, setPatient] = useState<Patient | undefined>(() => {
    // Retrieve state from localStorage during initialization
    if (typeof window !== "undefined") {
      // Perform localStorage action
      const storedState = localStorage.getItem("patient");
      return storedState
        ? JSON.parse(storedState)
        : { defaultValue: undefined };
    }
  });

  useEffect(() => {
    // Save state to localStorage whenever it changes
    localStorage.setItem("patient", JSON.stringify(patient));
  }, [patient]);

  const updatePatient = (newPatient: Patient) => {
    setPatient(newPatient);
  };

  const contextValue = {
    patient,
    setPatient: updatePatient,
  };

  return (
    <PatientContext.Provider value={contextValue}>
      {children}
    </PatientContext.Provider>
  );
}
