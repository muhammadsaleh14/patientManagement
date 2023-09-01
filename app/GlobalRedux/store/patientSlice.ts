import {
  createSlice,
  nanoid,
  createAsyncThunk,
  PayloadAction,
} from "@reduxjs/toolkit";
import { useDispatch } from "react-redux";
import { sub } from "date-fns";
import axios from "axios";
import {
  Patient,
  Prescription,
  Visit,
} from "@/components/interfaces/databaseInterfaces";
import { error } from "console";
import { RootState } from "./store";
import { getFromLocalStorage, setToLocalStorage } from "../manageLocalStorage";

interface PatientState {
  patient: Patient | undefined;
  currentVisitId: number | undefined;
  status: "idle" | "loading" | "succeeded" | "failed";
  error: undefined | string;
}

const { patient: patientLS, currentVisitId: currentVisitIdLS } =
  getFromLocalStorage();
// const POSTS_URL = 'https://jsonplaceholder.typicode.com/posts';

const initialState: PatientState = {
  patient: patientLS,
  currentVisitId: currentVisitIdLS,
  status: "idle",
  error: undefined,
};

export const setPatient = createAsyncThunk(
  "patient/setPatient",
  async (patientId: number) => {
    console.log("running set patient");
    const response = await axios.get("/api/patients/" + patientId);
    return response.data;
  }
);
export const addVisit = createAsyncThunk(
  "patient/addVisit",
  async (visitDate: string, { getState, dispatch }) => {
    const state = getState() as PatientState;
    if (!state.patient) {
      throw new Error("Patient is not defined");
    }
    const pId = state.patient.id;
    const response = await axios.post("/api/patients/" + pId + "/visits", {
      visitDate,
    });
    dispatch(setVisitId);
    return response.data;
  }
);
export const addPrescription = createAsyncThunk(
  "patient/addPrescription",
  async (prescriptionText: string, { getState }) => {
    const state = getState() as PatientState;
    const response = await axios.post(
      "/api/patients/prescriptions/prescription",
      {
        visitId: state.currentVisitId,
        prescription: prescriptionText,
      }
    );
    return response.data;
  }
);
// export const deletePatient = createAsyncThunk(
//   "patient/deletePatient",
//   async (patientId, { getState }) => {
//     const state = getState() as PatientState;
//     const response = await axios.post(
//       "/api/patients/prescriptions/prescription",
//       {
//         visitId: state.currentVisitId,
//         prescription: prescriptionText,
//       }
//     );
//     return response.data;
//   }
// );
// const deletePatient = (patientId: number) => {
//   axios
//     .delete("/api/patients/" + patientId)
//     .then((response) => {
//       setPatients((prevPatients) =>
//         prevPatients.filter((p) => p.id !== patientId)
//       );
//       setAlert({
//         title: "Patient deleted",
//         severity: "success",
//         message: "",
//       });
//     })
//     .catch(() => {
//       console.log("delete patient failed");
//       setAlert({
//         title: "Deleting patient failed",
//         severity: "error",
//         message: "",
//       });
//     });
// };

// addPrescription: (
//     state,
//     action: PayloadAction<{ prescription: Prescription }>
//   ) => {
//     if (state.visit) {
//       state.visit.prescriptions = [
//         ...state.visit.prescriptions,
//         action.payload.prescription,
//       ];
//     } else {
//       throw new Error("Cannot add prescription: Visit not availible");
//     }
//   },
const patientSlice = createSlice({
  name: "patient",
  initialState,
  reducers: {
    setVisitId: (state, action: PayloadAction<number>) => {
      state.currentVisitId = action.payload;
      setToLocalStorage(state.patient, state.currentVisitId);
    },
  },
  extraReducers(builder) {
    builder
      //? For setPatient
      .addCase(setPatient.pending, (state) => {
        state.status = "loading";
      })
      .addCase(
        setPatient.fulfilled,
        (state, action: PayloadAction<Patient>) => {
          state.patient = action.payload;
          setToLocalStorage(state.patient, state.currentVisitId);
          state.status = "succeeded";
        }
      )
      .addCase(setPatient.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      //? For setVisit
      .addCase(addVisit.pending, (state) => {
        state.status = "loading";
      })
      .addCase(addVisit.fulfilled, (state, action: PayloadAction<Visit>) => {
        if (!state.patient?.visits) {
          const message = "Patient is not defined, visit added";
          state.error = message;
          throw new Error(message);
        }
        state.patient.visits = state.patient?.visits.concat(action.payload);
        setToLocalStorage(state.patient, state.currentVisitId);
        state.status = "succeeded";
      })
      .addCase(addVisit.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })

      //? For addPrescription
      .addCase(addPrescription.pending, (state) => {
        state.status = "loading";
      })

      .addCase(
        addPrescription.fulfilled,
        (state, action: PayloadAction<Prescription>) => {
          const visitId = state.currentVisitId;
          if (!state.patient?.visits) {
            throw new Error(`Visit with ID ${visitId} not found.`);
          }
          state.patient.visits = state.patient?.visits.map((visit) => {
            if (visit.id === visitId) {
              // Use concat to create a new array with the updated prescriptions
              return {
                ...visit,
                prescriptions: visit.prescriptions.concat(action.payload),
              };
            }
            return visit;
          });
          setToLocalStorage(state.patient, state.currentVisitId);
          state.status = "succeeded";
        }
      )
      .addCase(addPrescription.rejected, (state, action) => {
        state.error = action.error.message;
        state.status = "failed";
      });
  },
});

export const getPatientState = (state: RootState) => state.patient;
export const getPatient = (state: RootState) => state.patient.patient;
export const getPatientError = (state: RootState) => state.patient.error;
export const getVisitById = (state: RootState, visitId: number) =>
  state.patient.patient?.visits.find((visit) => visit.id === visitId);
export const getCurrentVisit = (state: RootState): Visit | undefined => {
  // Use the find method to search for the visit with the matching ID
  return state.patient.patient?.visits.find(
    (visit) => visit.id === state.patient.currentVisitId
  );
};

export const { setVisitId } = patientSlice.actions;

export default patientSlice.reducer;
