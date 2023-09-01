import { configureStore } from "@reduxjs/toolkit";
import patientReducer from "@/app/GlobalRedux/store/patientSlice";

export const store = configureStore({
  reducer: {
    patient: patientReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
