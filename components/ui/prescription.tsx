"use client";
import { Button, TextField } from "@mui/material";
import axios from "axios";
import { FormEvent, useEffect, useState } from "react";
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
  const [prescriptions, setPrescriptions] = useState<Prescriptions[]>([]);

  async function loadPrescriptions() {
    let response = await axios.get(
      `/api/patients/prescriptions/prescription?id=${patient?.id}&date=${date}`
    );
    console.log("response of prescriptions" + response.data);
    setPrescriptions(response.data);
  }
  function handlePrescription(event: React.ChangeEvent<HTMLInputElement>) {
    setPrescription(event.target.value);
  }
  async function handleSubmit(e: FormEvent) {
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
    loadPrescriptions();
  }, []);

  return (
    <div>
      <form className="flex align-baseline">
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
      {prescriptions.map((value) => {
        return (
          <>
            <TextField
              id="outlined-multiline-flexible"
              multiline
              className="w-3/4"
              required
              onInput={handlePrescription}
              value={value.prescription}
            />
            ;
          </>
        );
      })}
    </div>
  );
}
