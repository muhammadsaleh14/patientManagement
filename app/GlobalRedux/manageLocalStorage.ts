"use client";
import { Patient } from "@/components/interfaces/databaseInterfaces";

export function setToLocalStorage(
  patient: Patient | undefined = undefined,
  currentVisitId: number | undefined = undefined
) {
  if (typeof localStorage !== "undefined") {
    if (patient !== undefined) {
      localStorage.setItem("patient", JSON.stringify(patient));
    }
    if (currentVisitId !== undefined) {
      localStorage.setItem("currentVisitId", JSON.stringify(currentVisitId));
    }
  }
}

export function getFromLocalStorage() {
  if (typeof localStorage !== "undefined") {
    let patientString = localStorage.getItem("patient");
    let currentVisitIdString = localStorage.getItem("currentVisitId");
    let patient, currentVisitId;

    if (
      patientString !== null &&
      patientString !== undefined &&
      patientString !== "undefined"
    ) {
      patient = JSON.parse(patientString) as Patient;
    }

    if (
      currentVisitIdString !== null &&
      currentVisitIdString !== undefined &&
      currentVisitIdString !== "undefined"
    ) {
      currentVisitId = JSON.parse(currentVisitIdString) as number;
    }

    return { patient, currentVisitId };
  }

  // If localStorage is not supported, you may want to return some default values or handle the case accordingly.
  // For now, I'll return an empty object when localStorage is not available.
  return {};
}
