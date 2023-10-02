"use client";
import { Middleware } from "@reduxjs/toolkit";
import detailsLayoutReducer from "@/app/GlobalRedux/store/detailSlice";
import { RootState } from "./store";
import { getCurrentVisit, updateDetailsOrder } from "./patientSlice";
import {
  areArraysOfPatientDetailsEqual,
  arePatientDetailsEqual,
  setDetailsOrder,
} from "../utilMethods";
import axios from "axios";
// Define the shape of your state here
// interface RootState {
//   patient: typeof patientReducer; // Replace 'any' with the actual type of your 'patient' state slice
//   detailsLayout: typeof detailsLayoutReducer;
// }

export const customLocalStorageMiddleware: Middleware<{}, RootState> =
  (store) => (next) => (action) => {
    const prevState = store.getState(); // Get the previous state before the action is dispatched
    const oldVisit = getCurrentVisit(prevState);
    // Let the action pass through first
    next(action);
    const newState = store.getState(); // Get the new state after the action has been processed

    const currentVisit = getCurrentVisit(newState);
    // console.log("current visit in middleware", currentVisit);
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
