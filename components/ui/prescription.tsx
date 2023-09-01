"use client";
import { Autocomplete, Button, TextField } from "@mui/material";
import axios from "axios";
import { FormEvent, useCallback, useEffect, useState } from "react";
import { Patient, Prescriptions } from "../interfaces/databaseInterfaces";
import { usePatientContext } from "../patientContextProvider";

// ... Import statements ...

const API_PATIENT_PRESCRIPTIONS = "/api/patients/prescriptions";
const API_ADD_PRESCRIPTION = "/api/patients/prescriptions/prescription";

export default function Prescription() {
  const { patient } = usePatientContext();
  const [prescription, setPrescription] = useState<string | null>("");
  const [visitId, setVisitId] = useState<number | undefined>(undefined);
  const [prescriptions, setPrescriptions] = useState<string[]>([]);
  const [allPrescriptions, setAllPrescriptions] = useState<string[] | null>(
    null
  );

  const loadPrescriptions = useCallback(async () => {
    console.log("running load prescriptions: " + patient);
    if (patient) {
      const visit = patient.visits.find((visit) => visit.id === visitId);
      if (visit) {
        setPrescriptions(
          visit.prescriptions.map((prescription) => prescription.prescription)
        );
      } else {
        setPrescriptions([]);
      }

      // Fetch other prescriptions here if needed
      try {
        const response = await axios.get("/api/patients/prescriptions");

        setAllPrescriptions(response.data);
      } catch (error) {
        console.error("Error fetching prescriptions:", error);
      }
    }
  }, [patient, visitId]);

  useEffect(() => {
    const temp = localStorage.getItem("visitId") ?? "";
    setVisitId(parseInt(temp));
    loadPrescriptions();
  }, [loadPrescriptions]);

  const handlePrescriptionChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setPrescription(event.target.value);
    // console.log(prescription);
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!patient) return;

    try {
      const response = await axios.post(
        "/api/patients/prescriptions/prescription",
        {
          visitId: visitId,
          prescription: prescription,
        }
      );
      console.log(response.data);
      loadPrescriptions();
    } catch (error) {
      console.error("Error adding prescription:", error);
    }
  };

  // const allPrescriptionProps = {
  const options = allPrescriptions || [];
  // };

  return (
    <div>
      <form className="flex align-baseline">
        <Autocomplete
          className="w-3/4"
          options={options}
          // {...allPrescriptionProps}
          id="free-solo-demo"
          clearOnEscape
          freeSolo
          value={prescription}
          renderInput={(params) => (
            <TextField
              {...params}
              id="outlined-multiline-flexible"
              label="Add Prescription"
              required
              onChange={(event) => handlePrescriptionChange(event)}
            />
          )}
        />

        <Button type="submit" onClick={handleSubmit} className="">
          Submit
        </Button>
      </form>
      {prescriptions.length > 0 ? (
        prescriptions.map((value, index) => (
          <div key={index}>
            <TextField
              id="outlined-multiline-flexible"
              multiline
              className="w-3/4"
              required
              margin="dense"
              value={value}
              onChange={() => {}}
            />
          </div>
        ))
      ) : (
        <h2>No Prescriptions yet</h2>
      )}
    </div>
  );
}
