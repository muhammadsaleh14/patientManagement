import { Patient } from "@/components/interfaces/databaseInterfaces";
import axios from "axios";
import { formatDateString } from "./utilMethods";
export const getPatientApi = async (patientId: string) => {
  const url = process.env.API_URL;
  const response = await axios.get(url + "/api/patients/" + patientId);
  const patient = response.data as Patient;

  patient.visits.map((visit) => {
    visit.date = formatDateString(visit.date);
  });

  return patient;
};
