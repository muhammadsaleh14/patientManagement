import {
  createSlice,
  createAsyncThunk,
  PayloadAction,
  createSelector,
} from "@reduxjs/toolkit";
import axios from "axios";
import {
  Patient,
  PatientDetails,
  Prescription,
  Visit,
  VisitDetailTitle,
} from "@/components/interfaces/databaseInterfaces";
import { RootState, store } from "./store";
import { getPatientApi } from "../apiCalls";
import {
  formatDateString,
  setDetailsOrder,
  sortVisitsByDate,
} from "../utilMethods";
import { Detail, setNewDetailsOrder } from "./detailSlice";
import { setVisitDetailTitles } from "./visitDetailSlice";
import { VisitDetail } from "@prisma/client";

export interface simpleVisitDetail {
  id: number | undefined; // id of description
  title: string;
  description: string;
  titleId: number;
  visitId: number;
}
export interface PatientState {
  patient: Patient | undefined;
  visitDetails: simpleVisitDetail[] | undefined;
  currentVisitId: number | undefined;
  status: "idle" | "loading" | "succeeded" | "failed";
  error: undefined | string;
}

// const POSTS_URL = 'https://jsonplaceholder.typicode.com/posts';

const initialState: PatientState = {
  patient: undefined,
  visitDetails: undefined,
  currentVisitId: undefined,
  status: "idle",
  error: undefined,
};

export const setPatient = createAsyncThunk(
  "patient/setPatient",
  async (
    {
      patientId,
      date = undefined,
    }: { patientId: number; date: undefined | string },
    { getState, dispatch }
  ) => {
    dispatch(clearPatientState());
    const patient = await getPatientApi(patientId);
    dispatch(setPatientFromApi(patient));
    if (date) {
      await dispatch(setVisit(date));
      const state = getState() as RootState;
      dispatch(setVisitDetails(state.visitDetailTitles.visitDetailTitles));
      const sortedDetails = setDetailsOrder(state);
      dispatch(updateDetailsOrder(sortedDetails));
    }
    return patient;
  }
);

// export const setVisit = createAsyncThunk(
//   "patient/setVisit",
//   async (visitDate: string, { getState, dispatch }) => {
//     const state = getState() as PatientState;

//     if (!state.patient) {
//       throw new Error("Patient is not defined");
//     }
//     const pId = state.patient.id;

//     const response = await axios.post("/api/patients/" + pId + "/visits", {
//       visitDate,
//     });
//     const visit = response.data as Visit;

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

    if (!state.patient || !state.patient.id) {
      throw new Error("Patient is not defined");
    }
    const visit = state.patient?.visits.find(
      (value) => value.date === visitDate
    );
    // state.patient.visits.map((visit) => {

    // });

    if (visit) {
      dispatch(setVisitId(visit.id));
      return "";
    } else {
      const pId = state.patient.id;

      const response = await axios.post("/api/patients/" + pId + "/visits", {
        visitDate,
      });
      const visitResponse = response.data as Visit;

      dispatch(setVisitId(visitResponse.id));
      // dispatch(setVisitDetails(rootState.visitDetailTitles.visitDetailTitles));
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
    const state = getState() as RootState;
    const response = await axios.post("/api/patients/detail", {
      detailHeading,
      detail,
      visitId,
    });

    const patientDetail = response.data as PatientDetails;
    return patientDetail;
  }
);

export const updateDetail = createAsyncThunk(
  "patient/updateDetail",
  async ({
    detailId,
    detailHeading,
    detailText,
  }: {
    detailId: PatientDetails["id"];
    detailHeading: PatientDetails["detailHeading"];
    detailText: PatientDetails["details"];
  }) => {
    const response = await axios.put("/api/patients/detail", {
      detailId,
      detailHeading,
      detailText,
    });
    console.log("response", response.data);
    return response.data as PatientDetails;
  }
);
export const deleteDetail = createAsyncThunk(
  "patient/deleteDetail",
  async (detailID: number) => {
    const response = await axios.delete("/api/patients/detail/" + detailID);
    const { detailId } = response.data;
    return detailId;
  }
);

// export const getVisitDetails = createAsyncThunk(
//   "patient/getVisitDetails",
//   async ({}, { getState }) => {
//     const rootState = getState() as RootState;
//     const response = await axios.get(
//       "/api/patients/visitDetailDescription/" + rootState.patient.currentVisitId
//     );
//     // const  = response.data;
//     // return detailId;
//   }
// );

export const saveVisitDetails = createAsyncThunk(
  "patient/saveVisitDetails",
  async (visitDetails: simpleVisitDetail[], { getState, dispatch }) => {
    const response = await axios.put("/api/patients/visitDetailDescription/", {
      visitDetails,
    });
    const visitDetailTitles = response.data as VisitDetailTitle[];
    // console.error(visitDetailTitles);
    console.log(visitDetailTitles);
    dispatch(setVisitDetails(visitDetailTitles));
    // const  = response.data;
    // return detailId;
  }
);

const patientSlice = createSlice({
  name: "patient",
  initialState,
  reducers: {
    clearPatientState: (state) => {
      state.patient = undefined;
    },
    setPatientFromApi: (state, action: PayloadAction<Patient>) => {
      state.patient = action.payload;
    },
    setVisitId: (state, action: PayloadAction<number>) => {
      state.currentVisitId = action.payload;
    },
    setVisitDetails: (
      state,
      action: PayloadAction<VisitDetailTitle[] | undefined>
    ) => {
      if (!state.currentVisitId) {
        console.log("current visit id is undefined");
        return;
      }
      if (!action.payload) {
        console.log("action payload is undefined");
        return;
      }
      console.log();
      const result: simpleVisitDetail[] = [];

      for (const visitDetailTitle of action.payload) {
        const detail = visitDetailTitle.visitDetails.find(
          (detail) => detail.visitId === state.currentVisitId
        );

        const description = detail?.description ?? "";
        const visitId = state.currentVisitId ?? 0;
        const toPush = {
          id: detail?.id,
          title: visitDetailTitle.title,
          description: description,
          // If description is empty, set it to an empty string
          titleId: visitDetailTitle.id,
          visitId: visitId,
        };
        result.push(toPush);
      }
      console.log(result);
      state.visitDetails = result;
    },
    updateDetailsOrder: (state, action: PayloadAction<PatientDetails[]>) => {
      const updatedVisits = (state.patient?.visits ?? []).map((visit) => {
        if (visit.id === state.currentVisitId) {
          return {
            ...visit,
            patientDetails: action.payload,
          };
        }
        return visit;
      });
      if (state.patient) {
        state.patient.visits = updatedVisits;
      }
    },
  },
  extraReducers(builder) {
    // builder;
    //? For Initialize state
    //? updateDetail
    builder
      //? For setPatient
      .addCase(setPatient.pending, (state) => {
        state.status = "loading";
      })
      .addCase(
        setPatient.fulfilled,
        (state, action: PayloadAction<Patient>) => {
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
        console.error(action.error.message);
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
                prescriptions: [...(visit.prescriptions ?? []), action.payload],
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
        console.error(action.error.message);
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
        console.error(action.error.message);
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
      })
      .addCase(updateDetail.pending, (state) => {
        state.status = "loading";
      })
      .addCase(
        updateDetail.fulfilled,
        (state, action: PayloadAction<PatientDetails>) => {
          if (state && state.patient) {
            const visits = state?.patient?.visits.map((visit) => {
              if (visit.id === state.currentVisitId) {
                // console.log("visitID", visit.id);
                visit.patientDetails = visit.patientDetails.map((detail) => {
                  if (detail.id === action.payload.id) {
                    console.log("action.payload", action.payload);
                    return action.payload;
                  }
                  return detail;
                });
              }
              return visit;
            });
            console.log("updated visits", visits);
            state.patient.visits = visits;
          }
        }
      )
      .addCase(updateDetail.rejected, (state, action) => {
        state.error = action.error.message;
        state.status = "failed";
        console.error(action.error.message);
      })
      .addCase(deleteDetail.pending, (state) => {
        state.status = "loading";
      })
      .addCase(
        deleteDetail.fulfilled,
        (state, action: PayloadAction<PatientDetails["id"]>) => {
          if (state && state.patient) {
            const visits = state?.patient?.visits.map((visit) => {
              if (visit.id === state.currentVisitId) {
                visit.patientDetails = visit.patientDetails.filter(
                  (detail) => detail.id !== action.payload
                );
              }
              return visit;
            });
            state.patient.visits = visits;
          }
        }
      )
      .addCase(deleteDetail.rejected, (state, action) => {
        state.error = action.error.message;
        state.status = "failed";
        console.error(action.error.message);
      })
      .addCase(saveVisitDetails.pending, (state) => {
        state.status = "loading";
      })
      .addCase(
        saveVisitDetails.fulfilled,
        (state, action: PayloadAction<void>) => {
          state.status = "succeeded";
        }
      )
      .addCase(saveVisitDetails.rejected, (state, action) => {
        state.error = action.error.message;
        state.status = "failed";
        console.error(action.error.message);
      });
  },
});

export default patientSlice;
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

// export const getPatientStateWithSortedVisitDates = createSelector(
//   (state) => state.patient, // Input selector 1
//   (state) => state.visits, // Input selector 2
//   (patients, visits) => {
//     // Your selector logic here
//     // You can access patients and visits here to compute the result
//     // Make sure this function returns a new reference only when necessary
//     return computedResult;
//   }
// );
export const getPatientStateWithSortedVisitDates = (state: RootState) => {
  const patient = sortVisitsByDate(state?.patient.patient);
  return { ...state.patient, patient };
};

export const getCurrentVisitWithPatientState = (
  state: PatientState
): Visit | undefined => {
  // Use the find method to search for the visit with the matching ID
  return state.patient?.visits.find(
    (visit) => visit.id === state.currentVisitId
  );
};

export const getVisitDetailsFromStore = (state: RootState) => {
  return state.patient.visitDetails;
};

// export const getVisitDetailTitlesFromStore = (state: RootState) => {
//   const visit = getCurrentVisit(state);
//   return visit?.visitDetails;
// };

export const {
  setVisitId,
  updateDetailsOrder,
  setPatientFromApi,
  clearPatientState,
  setVisitDetails,
} = patientSlice.actions;
