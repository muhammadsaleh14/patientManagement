import {
  createSlice,
  nanoid,
  createAsyncThunk,
  PayloadAction,
  AsyncThunk,
} from "@reduxjs/toolkit";
import { useDispatch } from "react-redux";
import { format, parse, sub } from "date-fns";
import axios from "axios";
import {
  Patient,
  Prescription,
  Visit,
} from "@/components/interfaces/databaseInterfaces";
import { error } from "console";
import { RootState, store } from "./store";
import { getPatientApi } from "../apiCalls";
import { formatDateString } from "../utilMethods";

interface PatientState {
  patient: Patient | undefined;
  currentVisitId: number | undefined;
  status: "idle" | "loading" | "succeeded" | "failed";
  error: undefined | string;
}

// const POSTS_URL = 'https://jsonplaceholder.typicode.com/posts';

const initialState: PatientState = {
  patient: undefined,
  currentVisitId: undefined,
  status: "idle",
  error: undefined,
};

export const setPatient = createAsyncThunk(
  "patient/setPatient",
  async (patientId: number) => {
    return await getPatientApi(patientId);
  }
);

// export const setVisit = createAsyncThunk(
//   "patient/setVisit",
//   async (visitDate: string, { getState, dispatch }) => {
//     const state = getState() as PatientState;
//     console.log(state.patient?.visits);
//     if (!state.patient) {
//       throw new Error("Patient is not defined");
//     }
//     const pId = state.patient.id;
//     console.log("state" + state.patient);
//     console.log("patientID:" + pId);
//     const response = await axios.post("/api/patients/" + pId + "/visits", {
//       visitDate,
//     });
//     const visit = response.data as Visit;
//     console.log("visit kamdkm" + visit);
//     dispatch(setVisitId(visit.id));
//     return response.data;
//   }
// );
export const setVisit = createAsyncThunk(
  "patient/setVisit",
  async (visitDate: string, { getState, dispatch }) => {
    const rootState = getState() as RootState;
    const state = rootState.patient as PatientState;
    // Logging state.patient and its properties
    // console.log("state.patient:", state.patient);
    if (!state.patient || !state.patient.id) {
      throw new Error("Patient is not defined");
    }
    const visit = state.patient?.visits.find(
      (value) => value.date === visitDate
    );
    state.patient.visits.map((visit) => {
      // console.log(visit.date);
    });
    // console.log("date" + visitDate);
    if (visit) {
      dispatch(setVisitId(visit.id));
      return "";
    } else {
      const pId = state.patient.id;
      // console.log("date:", visitDate);
      const response = await axios.post("/api/patients/" + pId + "/visits", {
        visitDate,
      });
      const visitResponse = response.data as Visit;
      // Logging the 'visitResponse' object and its properties
      // console.log("visitResponse:", visitResponse);
      dispatch(setVisitId(visitResponse.id));
      return response.data;
    }
  }
);

export const addPrescription = createAsyncThunk(
  "patient/addPrescription",
  async (prescriptionText: string, { getState }) => {
    const state = getState() as RootState;
    const response = await axios.post(
      "/api/patients/prescriptions/prescription",
      {
        visitId: state.patient.currentVisitId,
        prescription: prescriptionText,
      }
    );
    console.log("this prescription was added" + response.data);
    return response.data;
  }
);

export const deletePrescription = createAsyncThunk(
  "patient/deletePrescription",
  async (prescriptionId: number) => {
    const response = await axios.delete(
      "/api/patients/prescriptions/" + prescriptionId
    );
    return prescriptionId;
  }
);
// export const setPatientState = createAsyncThunk(
//   "patient/setPatientState",
//   async (
//     { patientId, date }: { patientId: number; date: string },
//     { getState }
//   ) => {
//     const state = getState() as RootState;
//     const response = await axios.post(
//       "/api/patients/prescriptions/prescription",
//       {
//         visitId: state.patient.currentVisitId,
//         prescription: prescriptionText,
//       }
//     );
//     console.log("this prescription was added" + response.data);
//     return response.data;
//   }
// );
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

// export const initializeState = createAsyncThunk(
//   "patient/initializeState",
//   async () => {
//     // console.log("running initialise state");
//     if (typeof window !== "undefined") {
//       const { patient, currentVisitId } = getFromLocalStorage();
//       const patientId = patient?.id;
//       const updatedPatient = patientId
//         ? await getPatientApi(patientId)
//         : console.log("patientId undefined");
//       const visitId = currentVisitId;
//       // console.log("updated patient" + updatedPatient);
//       if (updatedPatient && visitId) {
//         return { updatedPatient, visitId };
//       }
//     }
//   }
// );
const patientSlice = createSlice({
  name: "patient",
  initialState,
  reducers: {
    setVisitId: (state, action: PayloadAction<number>) => {
      state.currentVisitId = action.payload;
      // setToLocalStorage(state.patient, state.currentVisitId);
    },
  },
  extraReducers(builder) {
    builder;
    //? For Initialize state
    builder
      // .addCase(initializeState.pending, (state) => {
      //   state.status = "loading";
      //   console.log("initializeState loading");
      // })
      // .addCase(initializeState.fulfilled, (state, action) => {
      //   state.status = "succeeded";
      //   // console.log(
      //   //   "initializeState fulfiulled: " + action.payload.updatedPatient
      //   // );
      //   if (action.payload) {
      //     if (action.payload.updatedPatient) {
      //       state.patient = action.payload.updatedPatient;
      //       state.currentVisitId = action.payload.visitId;
      //     } else {
      //       console.log("patient is not defined to initialise");
      //     }
      //   }
      // })
      // .addCase(initializeState.rejected, (state, action) => {
      //   state.status = "failed";
      //   state.error = action.error.message;
      //   console.log(state.error);
      // })

      //? For setPatient
      .addCase(setPatient.pending, (state) => {
        state.status = "loading";
      })
      .addCase(
        setPatient.fulfilled,
        (state, action: PayloadAction<Patient>) => {
          state.patient = action.payload;
          // setToLocalStorage(state.patient, state.currentVisitId);
          state.status = "succeeded";
        }
      )
      .addCase(setPatient.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })

      //? For setVisit
      .addCase(setVisit.pending, (state) => {
        state.status = "loading";
      })
      .addCase(setVisit.fulfilled, (state, action: PayloadAction<Visit>) => {
        if (!state.patient?.visits) {
          const message = "Patient is not defined, visit added";
          state.error = message;
          throw new Error(message);
        }
        console.log("action Payload" + action.payload);
        if (action.payload) {
          let visit = action.payload;
          visit.date = formatDateString(visit.date);
          state.patient.visits = state.patient?.visits.concat(visit);
        }
        // setToLocalStorage(state.patient, state.currentVisitId);
        state.status = "succeeded";
      })
      .addCase(setVisit.rejected, (state, action) => {
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
          console.log("updating visits");
          state.patient.visits = state.patient?.visits.map((visit) => {
            if (visit.id === visitId) {
              // Use concat to create a new array with the updated prescriptions
              return {
                ...visit,
                prescriptions: [...visit.prescriptions, action.payload],
              };
            }
            return visit;
          });

          // setToLocalStorage(state.patient, state.currentVisitId);
          state.status = "succeeded";
        }
      )
      .addCase(addPrescription.rejected, (state, action) => {
        state.error = action.error.message;
        state.status = "failed";
      })
      .addCase(deletePrescription.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(
        deletePrescription.fulfilled,
        (state, action: PayloadAction<Prescription["id"]>) => {
          if (state.patient) {
            state.patient.visits.forEach((visit) => {
              // Use filter to remove the prescription with the specified id
              visit.prescriptions = visit.prescriptions.filter(
                (prescription) => prescription.id !== action.payload
              );
            });
            state.status = "succeeded";
          } else {
            throw new Error("patient is not defined");
          }
        }
      )
      .addCase(deletePrescription.rejected, (state, action) => {
        state.error = action.error.message;
        state.status = "failed";
      });
  },
});

export const getPatientState = (state: RootState) => state?.patient;
export const getPatient = (state: RootState) => state?.patient?.patient;
export const getPatientError = (state: RootState) => state?.patient?.error;
export const getVisitById = (state: RootState, visitId: number) =>
  state?.patient?.patient?.visits.find((visit) => visit.id === visitId);
export const getCurrentVisit = (state: RootState): Visit | undefined => {
  // Use the find method to search for the visit with the matching ID
  return state.patient.patient?.visits.find(
    (visit) => visit.id === state.patient.currentVisitId
  );
};

export const { setVisitId } = patientSlice.actions;

export default patientSlice.reducer;
