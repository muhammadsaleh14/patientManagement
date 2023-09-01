"use client";
import { Autocomplete, Button, TextField } from "@mui/material";
import axios from "axios";
import { FormEvent, useCallback, useEffect, useState } from "react";
import { Patient, Prescription } from "../interfaces/databaseInterfaces";
import { useSelector } from "react-redux";
import {
  addPrescription,
  getCurrentVisit,
  getPatient,
  getPatientState,
} from "@/app/GlobalRedux/store/patientSlice";
import { store } from "@/app/GlobalRedux/store/store";

// ... Import statements ...

const API_PATIENT_PRESCRIPTIONS = "/api/patients/prescriptions";
const API_ADD_PRESCRIPTION = "/api/patients/prescriptions/prescription";

export default function Prescription() {
  const patient = useSelector(getPatient);
  const visit = useSelector(getCurrentVisit);
  const [prescription, setPrescription] = useState<string | null>("");
  const [allPrescriptions, setAllPrescriptions] = useState<string[] | null>(
    null
  );

  const loadPrescriptions = useCallback(async () => {
    console.log("running load prescriptions: " + patient);
    // if (patient) {
    //   if (visit) {
    //     setPrescriptions(
    //       visit?.prescriptions.map((prescription) => prescription.prescription)
    //     );
    //   } else {
    //     setPrescriptions([]);
    //   }
    // Fetch other prescriptions here if needed
    try {
      const response = await axios.get("/api/patients/prescriptions");
      setAllPrescriptions(response.data);
    } catch (error) {
      console.error("Error fetching prescriptions:", error);
    }
  }, [patient]);

  useEffect(() => {
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
    if (!patient || !prescription) return;
    try {
      store.dispatch(addPrescription(prescription));
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
      {/* visit?.prescriptions.map((prescription) => prescription.prescription) */}
      {visit?.prescriptions ? (
        visit.prescriptions.map((value, index) => (
          <div key={value.id}>
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
