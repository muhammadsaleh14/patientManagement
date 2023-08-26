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
  if (!patientContext) {
    throw new Error(
      "usePatientContext must be used within a PatientContextProvider"
    );
  }
  return {
    patient: patientContext.patient,
    setPatient: patientContext.setPatient,
  };
};

export function PatientContextProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [patient, setPatient] = useState<Patient | undefined>(undefined);

  const initializePatient = () => {
    if (typeof localStorage !== "undefined") {
      const storedState = localStorage.getItem("patient");
      console.log(storedState);
      return storedState ? JSON.parse(storedState) : undefined;
    }
    return undefined;
  };

  useEffect(() => {
    setPatient(initializePatient());
  }, []); // Run only on the client side after the initial render

  const updatePatient = (newPatient: Patient) => {
    if (typeof window !== "undefined") {
      setPatient(newPatient);
    }
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
