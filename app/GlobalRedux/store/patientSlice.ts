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
  PatientDetails,
  Prescription,
  Visit,
} from "@/components/interfaces/databaseInterfaces";
import { error } from "console";
import { RootState, store } from "./store";
import { getPatientApi } from "../apiCalls";
import { formatDateString, setDetailsOrder } from "../utilMethods";
import { Detail, setNewDetailsOrder } from "./detailSlice";

export interface PatientState {
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
    console.log("running setPatient AsyncThunk");
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
    console.log("running setVisit");
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
    console.log("runnning add prescription");
    const state = getState() as RootState;
    const response = await axios.post(
      "/api/patients/prescriptions/prescription",
      {
        visitId: state.patient.currentVisitId,
        prescription: prescriptionText,
      }
    );
    // console.log("this prescription was added" + response.data);
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

export const addDetailToPatient = createAsyncThunk(
  "patient/addDetailToPatient",
  async (
    {
      detailHeading,
      detail,
      visitId,
    }: {
      detailHeading: string;
      detail: string;
      visitId: number;
    },
    { getState }
  ) => {
    // console.log("in async thunk addPAtientDetail");
    const state = getState() as RootState;
    const response = await axios.post(
      "/api/patients/" + state.patient.patient?.id + "/visits/details",
      { detailHeading, detail, visitId }
    );
    // console.log("response:" + response.data);
    const patientDetail = response.data as PatientDetails;
    return patientDetail;
  }
);

export const updateDetailsOrder = createAsyncThunk(
  "patient/updateDetailsOrder",
  async (_, { getState, dispatch }) => {
    console.log("updating details order");
    const state = getState() as RootState;
    const currentLayout = state.detailsLayout.detailsInfo;
    const visit = getCurrentVisit(state);

    if (!currentLayout || !visit) {
      throw new Error(
        "detail layout template or current details is not defined"
      );
    }

    const orderedDetails = setDetailsOrder(currentLayout, visit.patientDetails);
    // Dispatch an action to update the order of details in Redux state
    dispatch(updateDetailsOrderAsync(orderedDetails));

    return orderedDetails;
  }
);

const patientSlice = createSlice({
  name: "patient",
  initialState,
  reducers: {
    setVisitId: (state, action: PayloadAction<number>) => {
      state.currentVisitId = action.payload;
      // setToLocalStorage(state.patient, state.currentVisitId);
    },
    updateDetailsOrderAsync: (
      state,
      action: PayloadAction<PatientDetails[]>
    ) => {
      // Update the order of details in the Redux state using the action
      const updatedVisits = (state.patient?.visits ?? []).map((visit) => {
        if (visit.id === state.currentVisitId) {
          // Clone the visit object and update its patientDetails property
          return {
            ...visit,
            patientDetails: action.payload,
          };
        }
        // For other visits, return them as they are (no changes)
        return visit;
      });
      // Update the state with the new array of visits
      if (state.patient) {
        state.patient.visits = updatedVisits;
      }
      // console.log(JSON.stringify(updatedVisits));
      // Update the state with the new array of visits
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
        // console.log("action Payload" + action.payload);
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

      //? For deletePrescription
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
      })

      //? For addDetailToPatient
      .addCase(addDetailToPatient.pending, (state) => {
        state.status = "loading";
      })
      .addCase(
        addDetailToPatient.fulfilled,
        (state, action: PayloadAction<PatientDetails>) => {
          if (state.patient) {
            state.patient.visits.forEach((visit) => {
              if (visit.id === state.currentVisitId) {
                visit.patientDetails = visit.patientDetails.concat(
                  action.payload
                );
              }
            });
            state.status = "succeeded";
          } else {
            throw new Error("Patient is not defined");
          }
        }
      )
      .addCase(addDetailToPatient.rejected, (state, action) => {
        state.error = action.error.message;
        state.status = "failed";
        console.log(state.error);
      });

    //? updateDetailsOrder
  },
});

// export const getPatientDetails = (state:RootState) => state.patient.patient?.visits
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

export const { setVisitId, updateDetailsOrderAsync } = patientSlice.actions;

export default patientSlice.reducer;
