"use client";
import { PatientContext } from "@/app/patients/page";

export function PatientContextProvider(children) {
  return (
    <>
      <PatientContext.Provider value={undefined}>
        {children}
      </PatientContext.Provider>
    </>
  );
}
