import Button from "@mui/material/Button";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { usePatientContext } from "./patientContextProvider";

function HistoryOfPatient() {
  const { patient } = usePatientContext();
  // const [patient, setPatient] = useState(patientContext);
  // console.count("HistoryOfPatient");
  const router = useRouter();
  // console.log(patient);

  // useEffect(() => {}, [patient]);
  return (
    <div className="w-full h-full">
      <h1>History of Patient: {patient?.name}</h1>
      <ul>
        {patient ? (
          patient.visits.length > 0 ? (
            patient.visits.map((visit) => (
              <li key={visit.id}>
                <Button
                  onClick={() =>
                    router.push(
                      `/patients/${patient?.id}?visitDate=` + visit.date
                    )
                  }
                >
                  {visit.date}
                </Button>
              </li>
            ))
          ) : (
            <div>No history available</div>
          )
        ) : (
          ""
        )}
      </ul>
    </div>
  );
}

export default HistoryOfPatient;
