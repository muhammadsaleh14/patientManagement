"use client";
import { Autocomplete, Button, TextField } from "@mui/material";
import axios from "axios";
import { FormEvent, useCallback, useEffect, useState } from "react";
import { Patient, Prescriptions } from "../interfaces/databaseInterfaces";
import { usePatientContext } from "../patientContextProvider";
// {
//   id,
//   date,
// }: {
//   id: number | undefined;
//   date: string;
// }
export default function Prescription({ date }: { date: string }) {
  // const patientString = localStorage.getItem("patient");
  // = patientString
  //  (JSON.parse(patientString) as Patient)
  //   : undefined;
  const { patient } = usePatientContext();
  const [prescription, setPrescription] = useState<null | string>(null);
  const [prescriptions, setPrescriptions] = useState<
    Prescriptions["prescription"][]
  >([]);
  const [allPrescriptions, setAllPrescriptions] = useState<string[] | null>(
    null
  );
  const getAllPrescriptions = useCallback(async () => {
    if (patient) {
      let response = await axios.get("/api/patients/prescriptions");
      // console.log("response of prescriptions" + response.data);
      setAllPrescriptions(response.data);
    }
  }, [patient]);

  async function loadPrescriptions() {
    if (patient) {
      let response = await axios.get(
        `/api/patients/prescriptions/prescription?id=${patient?.id}&date=${date}`
      );
      // console.log("response of prescriptions" + response.data);
      //get all prescriptions from
      setPrescriptions(response.data);
    }
  }
  function handlePrescription(event: React.ChangeEvent<HTMLInputElement>) {
    setPrescription(event.target.value);
  }
  async function handleSubmit(e: FormEvent) {
    console.log(patient?.id);
    e.preventDefault();
    // Here you can use the 'prescription' state to submit the value
    const response = await axios.post(
      "/api/patients/prescriptions/prescription",
      {
        patientId: patient?.id,
        date: date,
        prescription: prescription,
      }
    );
    console.log(response.data);
    loadPrescriptions();
  }
  useEffect(() => {
    setPrescriptions(() => {
      console.log(patient);
      if (patient && patient.prescriptions) {
        const prescriptionStrings = patient?.prescriptions.map(
          (prescription) => prescription.prescription
        );
        return prescriptionStrings || [];
      }
      return [];
    });
    getAllPrescriptions();
    // getAllPrescriptions();
  }, [patient, getAllPrescriptions]);
  const AllPrescriptionProps = {
    options: allPrescriptions ? allPrescriptions : [],
  };
  return (
    <div>
      <form className="flex align-baseline">
        <Autocomplete
          {...AllPrescriptionProps}
          id="clear-on-escape"
          clearOnEscape
          renderInput={(params) => (
            <TextField {...params} label="clearOnEscape" variant="standard" />
          )}
        />
        <TextField
          id="outlined-multiline-flexible"
          label="Add Prescription"
          placeholder="Add prescription"
          multiline
          className="w-3/4"
          required
          onInput={handlePrescription}
        />
        <Button type="submit" onClick={handleSubmit} className="">
          Submit
        </Button>
      </form>
      {prescriptions ? (
        prescriptions.map((value) => {
          return (
            <div key={value}>
              <TextField
                id="outlined-multiline-flexible"
                multiline
                className="w-3/4"
                required
                margin="dense"
                onInput={handlePrescription}
                value={value}
              />
            </div>
          );
        })
      ) : (
        <h2>No Prescriptions yet</h2>
      )}
    </div>
  );
}
