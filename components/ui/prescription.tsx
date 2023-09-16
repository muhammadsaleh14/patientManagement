"use client";
import { Autocomplete, Button, Chip, TextField } from "@mui/material";
import axios from "axios";
import { FormEvent, useCallback, useEffect, useState } from "react";
import { Patient, Prescription } from "../interfaces/databaseInterfaces";
import { useSelector } from "react-redux";
import DeleteIcon from "@mui/icons-material/Delete";
import {
  addPrescription,
  deletePrescription,
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
  const [prescription, setPrescription] = useState<string>("");
  const [domMounted, setDomMounted] = useState(false);
  const [allPrescriptions, setAllPrescriptions] = useState<string[] | null>(
    null
  );
  // const [prescriptions, setPrescriptions] = useOptimistic(visit?.prescriptions);

  const loadPrescriptions = useCallback(async () => {
    // //console.log("running load prescriptions: " + patient);
    // Fetch other prescriptions here if needed
    try {
      const response = await axios.get("/api/patients/prescriptions");
      // //console.log(response.data);
      // //console.log("setting autocomplete prescriptions");
      setAllPrescriptions(response.data);
    } catch (error) {
      console.error("Error fetching prescriptions:", error);
    }
  }, [patient]);

  useEffect(() => {
    loadPrescriptions();
    setDomMounted(true);
  }, [loadPrescriptions]);

  const handlePrescriptionChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setPrescription(event.target.value);
    // //console.log(prescription);
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!patient || !prescription) {
      //console.log("returning");
      return;
    }
    try {
      //console.log("adding prescription");
      store.dispatch(addPrescription(prescription));

      setPrescription("");
    } catch (error) {
      console.error("Error adding prescription:", error);
    }
  };
  // const allPrescriptionProps = {
  const options = allPrescriptions || [];
  // };
  const flatProps = {
    options: allPrescriptions || [],
  };
  return (
    domMounted && (
      <div>
        <form className="flex align-baseline">
          <Autocomplete
            className="w-3/4"
            // {...allPrescriptionProps}
            {...flatProps}
            id="free-solo-demo"
            clearOnEscape
            freeSolo
            inputValue={prescription}
            onInputChange={(event, newInputValue) => {
              setPrescription(newInputValue);
            }}
            renderInput={(params) => (
              <TextField
                {...params}
                id="outlined-multiline-flexible"
                label="Add Prescription"
                required
                onChange={(e) => setPrescription(e.target.value)}
              />
            )}
            renderOption={(props, option) => (
              <li {...props} key={option}>
                {option}
              </li>
            )}
            renderTags={(tagValue, getTagProps) =>
              tagValue.map((option, index) => (
                <Chip {...getTagProps({ index })} key={option} label={option} />
              ))
            }
          />

          <Button type="submit" onClick={handleSubmit} className="">
            Submit
          </Button>
        </form>
        {/* visit?.prescriptions.map((prescription) => prescription.prescription) */}
        {visit?.prescriptions ? (
          visit.prescriptions.map((value, index) => {
            return (
              <div key={value.id} className="flex items-baseline">
                <TextField
                  id="outlined-multiline-flexible"
                  multiline
                  className="w-3/4"
                  required
                  margin="dense"
                  value={value.prescription}
                  onChange={() => {}}
                />
                <Button
                  onClick={() => store.dispatch(deletePrescription(value.id))}
                  variant="outlined"
                  color="warning"
                  className="m-auto ml-2"
                >
                  <DeleteIcon />
                </Button>
              </div>
            );
          })
        ) : (
          <h2>No Prescriptions yet</h2>
        )}
      </div>
    )
  );
}
