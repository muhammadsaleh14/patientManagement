// src/store/counterSlice.ts
import {
  Patient,
  Prescriptions,
  Visit,
} from "@/components/interfaces/databaseInterfaces";
import { createSlice, PayloadAction, ThunkAction } from "@reduxjs/toolkit";

interface PatientState {
  value: {
    patient: Patient | undefined;
    visit: Visit | undefined;
  };
}

const initialState: PatientState = {
  value: { patient: undefined, visit: undefined },
};

const PatientSlice = createSlice({
  name: "patient",
  initialState,
  reducers: {
    setPatient: (state, action: PayloadAction<Patient>) => {
      state.value.patient = action.payload;
    },
    setVisit: (state, action: PayloadAction<Visit>) => {
      state.value.visit = action.payload;
    },
    addPrescription: (
      state,
      action: PayloadAction<{ prescription: Prescriptions }>
    ) => {
      if (state.value.visit) {
        state.value.visit.prescriptions = [
          ...state.value.visit.prescriptions,
          action.payload.prescription,
        ];
      } else {
        throw new Error("Cannot add prescription: Visit not availible");
      }
    },
  },
});
export const asyncSetPatient =
  (patient: Patient): ThunkAction =>
  async (dispatch) => {
    dispatch(setLoading(true));
    setTimeout(() => {
      dispatch(incrementByAmount(amount));
      dispatch(setLoading(false));
    }, 1000); // Simulate async operation
  };

export const { increment, decrement } = counterSlice.actions;
export default counterSlice.reducer;
