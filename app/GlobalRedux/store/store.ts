import { configureStore, Middleware } from "@reduxjs/toolkit";
import patientReducer, {
  PatientState,
} from "@/app/GlobalRedux/store/patientSlice";
import detailsLayoutReducer, {
  Detail,
  DetailsLayoutSlice,
} from "@/app/GlobalRedux/store/detailSlice";
import { customLocalStorageMiddleware } from "@/app/GlobalRedux/store/middleware"; // Replace with the actual path to your customLocalStorageMiddleware

let storedPatientData;
let detailSort;
let uniqueDetails;
if (typeof localStorage !== "undefined") {
  storedPatientData = localStorage.getItem("patientData");

  detailSort = localStorage.getItem("detailData");
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
};

const initialState: InitialState = {
  // Initialize the 'patient' state with data from local storage, or null if not found
  patient: storedPatientData ? JSON.parse(storedPatientData) : {},

  detailsLayout: {
    detailsInfo: uniqueDetails || [],
    status: "idle",
    error: undefined,
  },
};

// Create your custom middleware
const middleware: Middleware[] = [customLocalStorageMiddleware];
// const middleware: Middleware = customLocalStorageMiddleware;

export const store = configureStore({
  reducer: {
    patient: patientReducer,
    detailsLayout: detailsLayoutReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(middleware),
  // Use the middleware property to specify middleware
  preloadedState: initialState, // Set the preloadedState outside of the reducer property
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
