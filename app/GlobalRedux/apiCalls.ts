import { Patient } from "@/components/interfaces/databaseInterfaces";
import axios from "axios";
import { formatDateString } from "./utilMethods";

export const getPatientApi = async (patientId: number) => {
  // //console.log("running set patient");
  console.log("patient Id", patientId);
  const response = await axios.get("/api/patients/" + patientId);
  const patient = response.data as Patient;
  // console.log(patient);
  // //console.log("patient" + patient.name);

  patient.visits.map((visit) => {
    visit.date = formatDateString(visit.date);
  });
  // //console.log("setting patient" + patient);
  return patient;
};
