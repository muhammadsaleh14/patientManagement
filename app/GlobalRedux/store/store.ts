import { configureStore, Middleware, Reducer } from "@reduxjs/toolkit";
import patientSlice, { setPatient } from "@/app/GlobalRedux/store/patientSlice";
import { PatientState } from "@/app/GlobalRedux/store/patientSlice";
import visitDetailTitlesReducer, {
  VisitDetailTitlesSlice,
} from "@/app/GlobalRedux/store/visitDetailSlice";
import detailsLayoutReducer, {
  Detail,
  DetailsLayoutSlice,
} from "@/app/GlobalRedux/store/detailSlice";
import { customLocalStorageMiddleware } from "@/app/GlobalRedux/store/middleware"; // Replace with the actual path to your customLocalStorageMiddleware
import { Patient } from "@/components/interfaces/databaseInterfaces";
import { getVisitDetailTitlesState } from "./visitDetailSlice";

let storedPatientData;
let detailSort;
let uniqueDetails;
let visitDetailTitles;
if (typeof localStorage !== "undefined") {
  storedPatientData = localStorage.getItem("patientData");
  detailSort = localStorage.getItem("detailData");
  visitDetailTitles = localStorage.getItem("visitDetailTitles");

  const detailsInfo = detailSort
    ? (JSON.parse(detailSort) as DetailsLayoutSlice["detailsInfo"])
    : [];
  if (detailsInfo) {
    uniqueDetails = detailsInfo.reduce((acc, current) => {
      if (
        !acc.find((detail) => detail.detailHeading === current.detailHeading)
      ) {
        acc.push(current);
      }
      return acc;
    }, [] as Array<Detail>);
  }
}

type InitialState = {
  patient: PatientState; // Replace with the actual type for 'patient'
  detailsLayout: DetailsLayoutSlice;
  visitDetailTitles: VisitDetailTitlesSlice;
};

const initialPatient = storedPatientData ? JSON.parse(storedPatientData) : {};
const initialVisitDetailTitles = visitDetailTitles
  ? JSON.parse(visitDetailTitles)
  : {};
const initialState: InitialState = {
  // Initialize the 'patient' state with data from local storage, or null if not found
  patient: initialPatient,
  detailsLayout: {
    detailsInfo: uniqueDetails || [],
    status: "idle",
    error: undefined,
  },
  visitDetailTitles: initialVisitDetailTitles,
};

// Create your custom middleware
const middleware: Middleware[] = [customLocalStorageMiddleware];
// const middleware: Middleware = customLocalStorageMiddleware;

export const store = configureStore({
  reducer: {
    visitDetailTitles: visitDetailTitlesReducer,
    detailsLayout: detailsLayoutReducer,
    patient: patientSlice.reducer as Reducer<PatientState>,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(middleware),
  preloadedState: initialState, // Set the preloadedState outside of the reducer property
  // Use the middleware property to specify middleware
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
