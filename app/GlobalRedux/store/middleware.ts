"use client";
import patientReducer from "@/app/GlobalRedux/store/patientSlice";
import { Middleware } from "@reduxjs/toolkit";

// Define the shape of your state here
interface RootState {
  patient: typeof patientReducer; // Replace 'any' with the actual type of your 'patient' state slice
}

export const customLocalStorageMiddleware: Middleware<{}, RootState> =
  (store) => (next) => (action) => {
    // Let the action pass through first
    next(action);
    console.log("action.payload" + action.payload);
    const patientState = store.getState().patient; // Get the entire 'patient' state

    // Save the state to local storage
    if (typeof localStorage !== "undefined") {
      localStorage.setItem("patientData", JSON.stringify(patientState));
    }
  };

export default customLocalStorageMiddleware;
