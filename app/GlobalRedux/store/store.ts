import { configureStore, Middleware } from "@reduxjs/toolkit";
import patientReducer from "@/app/GlobalRedux/store/patientSlice";
import { customLocalStorageMiddleware } from "@/app/GlobalRedux/store/middleware"; // Replace with the actual path to your customLocalStorageMiddleware

let storedPatientData;
if (typeof localStorage !== "undefined") {
  storedPatientData = localStorage.getItem("patientData");
}
const initialState = {
  // Initialize the 'patient' state with data from local storage, or null if not found
  patient: storedPatientData ? JSON.parse(storedPatientData) : {},
};

// Create your custom middleware
const middleware: Middleware[] = [customLocalStorageMiddleware];

export const store = configureStore({
  reducer: {
    patient: patientReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(middleware),
  // Use the middleware property to specify middleware
  preloadedState: initialState, // Set the preloadedState outside of the reducer property
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
