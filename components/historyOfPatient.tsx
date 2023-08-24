import { usePatientContext } from "@/app/patients/page";
import Button from "@mui/material/Button";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

function HistoryOfPatient() {
  const { patient: patientContext } = usePatientContext();
  const [patient, setPatient] = useState(patientContext);
  const [uniqueDates, setUniqueDates] = useState<string[]>([]);
  const router = useRouter();
  //   console.log(patient);
  useEffect(() => {
    async function fetchPatient() {
      let url = "/api/patients/" + patient.id;
      console.log(url);
      let response = await axios.get(url);
      setPatient(response.data);
    }
    function setDates() {
      setUniqueDates(
        patient.details
          ? patient.details.reduce((dates, detail) => {
              if (detail.date && !dates.includes(detail.date)) {
                return [...dates, detail.date];
              }
              return dates;
            }, [] as string[])
          : []
      );
    }
    async function fetchData() {
      await fetchPatient();
      setDates();
    }
    fetchData();
  }, []);
  return (
    <div className="w-full h-full">
      <h1>History of Patient: {patient.name}</h1>
      <ul>
        {uniqueDates.map((date, index) => (
          <li key={index}>
            <Button
              onClick={() =>
                router.push(`/patients/${patient.id}?add=false&date=` + date)
              }
            >
              {date}
            </Button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default HistoryOfPatient;
