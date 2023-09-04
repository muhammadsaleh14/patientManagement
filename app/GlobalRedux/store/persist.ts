// // redux-persist-config.js
// import storage from "redux-persist/lib/storage"; // Use the storage engine of your choice
// import {
//   persistStore,
//   FLUSH,
//   REHYDRATE,
//   PAUSE,
//   PERSIST,
//   PURGE,
//   REGISTER,
// } from "redux-persist";
// import { persistReducer } from "redux-persist";
// import patientReducer from "@/app/GlobalRedux/store/patientSlice";
// import { Middleware } from "@reduxjs/toolkit";

// const persistConfig = {
//   key: "root",
//   storage,
//   version: 1,

//   // An array of reducer keys to whitelist
//   // An array of reducer keys to blacklist
// };

// interface RootState {
//   patient: typeof patientReducer; // Replace 'any' with the actual type of your 'patient' state slice
// }

// export const customLocalStorageMiddleware: Middleware<{}, RootState> =
//   (store) => (next) => (action) => {
//     // Let the action pass through first
//     next(action);

//     // Define the portion of the state you want to save
//     const stateToSave = store.getState().patient; // Replace 'patient' with your specific state slice

//     // Save the state to local storage
//     localStorage.setItem("patientData", JSON.stringify(stateToSave));
//   };

// const persistedReducer = persistReducer(persistConfig, patientReducer);

// export default persistedReducer;
