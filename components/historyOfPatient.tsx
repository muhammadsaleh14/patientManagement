import {
  getPatientState,
  getPatientStateWithSortedVisitDates,
} from "@/app/GlobalRedux/store/patientSlice";
import Button from "@mui/material/Button";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

function HistoryOfPatient() {
  // const [patient, setPatient] = useState(patientContext);
  // console.count("HistoryOfPatient");
  const { patient, status } = useSelector(getPatientStateWithSortedVisitDates);
  const router = useRouter();

  useEffect(() => {}, [patient]);
  return (
    <>
      {status === "loading" ? (
        // Display loading content
        <div>Loading...</div>
      ) : status === "succeeded" ? (
        // Display success content
        <div className="m-auto items-center max-h-80">
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
      ) : (
        <></>
      )}
    </>
  );
}

export default HistoryOfPatient;
