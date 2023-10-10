"use client";
import { Autocomplete, Button, Chip, TextField } from "@mui/material";
import axios from "axios";
import { FormEvent, useCallback, useEffect, useState } from "react";
import { Prescription } from "../interfaces/databaseInterfaces";
import { useSelector } from "react-redux";
import DeleteIcon from "@mui/icons-material/Delete";
import {
  addPrescription,
  deletePrescription,
  getCurrentVisit,
  getPatient,
} from "@/app/GlobalRedux/store/patientSlice";
import { store } from "@/app/GlobalRedux/store/store";

// ... Import statements ...

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
    setDomMounted(true);
  }, [loadPrescriptions]);

  // const handlePrescriptionChange = (
  //   event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  // ) => {
  //   setPrescription(event.target.value);
  // };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!patient || !prescription) {
      return;
    }
    try {
      store.dispatch(addPrescription(prescription));

      setPrescription("");
    } catch (error) {
      console.error("Error adding prescription:", error);
    }
  };
  // const allPrescriptionProps = {
  // };
  const flatProps = {
    options: allPrescriptions || [],
  };
  return (
    domMounted && (
      <div>
        <div className="flex flex-row flex-grow">
          {/* Sidebar */}
          <div className="min-h-fit w-full">
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
                    <Chip
                      {...getTagProps({ index })}
                      key={option}
                      label={option}
                    />
                  ))
                }
              />

              <Button type="submit" onClick={handleSubmit} className="">
                Submit
              </Button>
            </form>
            {/* visit?.prescriptions.map((prescription) => prescription.prescription) */}
            {visit?.prescriptions ? (
              visit.prescriptions.map((value) => {
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
                      onClick={() =>
                        store.dispatch(deletePrescription(value.id))
                      }
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
        </div>
      </div>
    )
  );
}
