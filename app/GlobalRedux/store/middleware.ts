// "use client";
import { Middleware } from "@reduxjs/toolkit";
import { RootState } from "./store";
import { getCurrentVisit, updateDetailsOrder } from "./patientSlice";
import {
  areArraysOfPatientDetailsEqual,
  setDetailsOrder,
} from "../utilMethods";
import axios from "axios";
// import { revalidatePath } from "next/cache";
// Define the shape of your state here
// interface RootState {
//   patient: typeof patientReducer; // Replace 'any' with the actual type of your 'patient' state slice
//   detailsLayout: typeof detailsLayoutReducer;
// }
// export const customLocalStorageMiddleware: Middleware<{}, RootState> //! before
export const customLocalStorageMiddleware: Middleware<object, RootState> =
  (store) => (next) => (action) => {
    // revalidatePath("/");
    const prevState = store.getState(); // Get the previous state before the action is dispatched
    const oldVisit = getCurrentVisit(prevState);
    // Let the action pass through first
    next(action);
    const newState = store.getState(); // Get the new state after the action has been processed

    const currentVisit = getCurrentVisit(newState);

    // Check if the 'patient' state has changed
    if (prevState.patient !== newState.patient) {
      const patientState = newState.patient; // Get the updated 'patient' state
      if (currentVisit && oldVisit) {
        if (
          !oldVisit ||
          !areArraysOfPatientDetailsEqual(
            currentVisit?.patientDetails,
            oldVisit?.patientDetails
          )
        ) {
          const orderedDetails = setDetailsOrder(newState);
          store.dispatch(updateDetailsOrder(orderedDetails));
        }
      }
      // Save the 'patient' state to local storage
      if (typeof localStorage !== "undefined") {
        localStorage.setItem("patientData", JSON.stringify(patientState));
      }
    }
    // Check if the 'detail' state has changed
    if (
      prevState.detailsLayout.detailsInfo !== newState.detailsLayout.detailsInfo
    ) {
      const detailInfo = newState.detailsLayout.detailsInfo; // Get the updated 'detail' state
      // Save the 'detail' state to local storage
      axios.post("/api/patients/detailsLayout", {
        detailsLayoutString: JSON.stringify(detailInfo),
      });
      // if (typeof localStorage !== "undefined") {
      //   localStorage.setItem("detailData", JSON.stringify(detailInfo));
      // }
    }
  };

export default customLocalStorageMiddleware;
