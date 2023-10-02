"use client";
import React, { useEffect } from "react";
import { store } from "./store";
import { Provider } from "react-redux";
import { persistStore } from "redux-persist";
import { PersistGate } from "redux-persist/integration/react";
import { getPatientState, updateDetailsOrder } from "./patientSlice";
import { useSelector } from "react-redux";
import { setDetailsOrder } from "../utilMethods";
import { initialiseDetailsLayout } from "./detailSlice";

function UseStore() {
  const rootState = store.getState();
  // console.log("loading use Store");
  useEffect(() => {
    // console.log("in use effect");
    // const sortedDetails = setDetailsOrder(rootState);
    // store.dispatch(updateDetailsOrder(sortedDetails));
    store.dispatch(initialiseDetailsLayout());
  }, []);
  return <></>;
}

export default function StoreProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  // const persistor = persistStore(store);
  // useEffect(() => {
  //   console.log("in use effect");
  //   store.dispatch(initialiseDetailsLayout);
  // }, []);
  return (
    <Provider store={store}>
      <UseStore />
      {/* <PersistGate loading={null} persistor={persistor}> */}
      {children}
      {/* </PersistGate> */}
    </Provider>
  );
}
