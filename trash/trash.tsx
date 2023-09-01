"use client";
import React, { createContext, useEffect, useState } from "react";
import { Patient, Visit } from "./interfaces/databaseInterfaces";
import axios from "axios";

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
    patient: patientContext["patient"],
    setPatient: patientContext["setPatient"],
  };
};

export function PatientContextProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  // console.log("patientContextProvider");
  const [patient, setPatient] = useState<Patient | undefined>(undefined);
  const initializePatient = () => {
    if (typeof window !== "undefined") {
      const storedState = localStorage.getItem("patient");
      // console.log(storedState);
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
      localStorage.setItem("patient", JSON.stringify(newPatient));
    }
  };
  const addVisit = async (patientId: number, visitDate: number) => {
    if (typeof window !== "undefined") {
      await axios.post("/api/patients/" + patientId + "/visits", { visitDate });
      setPatient((prevPatient) => {});
      localStorage.setItem("patient", JSON.stringify(newPatient));
    }
  };

  const contextValue = {
    patient,
    setPatient: updatePatient,
    addVisit,
  };

  return (
    <PatientContext.Provider value={contextValue}>
      {children}
    </PatientContext.Provider>
  );
}

("use client");
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
