"use client";
import React, { useEffect, useState } from "react";
import { Box, InputAdornment, TextField } from "@mui/material";

import Prescription from "@/components/ui/prescription";
import { useSearchParams } from "next/navigation";
import {
  getPatientState,
  // initializeState,
  setPatient,
} from "@/app/GlobalRedux/store/patientSlice";
import { useSelector } from "react-redux";
import Sidebar from "@/components/ui/sidebar";
import SidebarContainer from "@/components/ui/sidebarContainer";
import LoadingState from "@/components/ui/loadingState";
import MiniSidebarContent from "@/components/miniSidebarContent";
import { store } from "@/app/GlobalRedux/store/store";
// { params }: { params: { id: string } }
const Page = ({ params }: { params: { id: string } }) => {
  const { patient } = useSelector(getPatientState);
  const searchParams = useSearchParams();

  // const [domLoaded, setDomLoaded] = useState(false);
  const [loading, setLoading] = useState(true);
  const date = searchParams.get("visitDate") as string;

  useEffect(() => {
    // store.dispatch(initializeState());

    const initialiseState = async () => {
      const pId = params.id;
      await store.dispatch(setPatient({ patientId: pId, date }));
      // store.dispatch(setVisit());
      setLoading(false);
    };
    initialiseState();
  }, [params.id, date]);

  // useEffect(() => {
  //   setDomLoaded(true);
  // }, []);
  return (
    (loading && <LoadingState />) || (
      // direction="row" spacing={0}
      <div className="h-full flex flex-row">
        {/* Sidebar */}
        <SidebarContainer itemInLS="sidebarWidth">
          <Box
            className="bg-gray-300 overflow-y-auto h-full flex-grow w-full"
            // style={{ minWidth: "200px", maxWidth: "200px" }}
          >
            {/* Sidebar content */}

            <Sidebar />
          </Box>
        </SidebarContainer>
        {/* Main content */}
        <Box className="h-full w-full flex flex-col overflow-y-scroll">
          {/* spacing={2} */}
          {/* {Box here} */}
          <Box className=" p-2 bg-orange-700 flex justify-center ">
            {/* Patient details */}
            {patient && (
              <>
                <TextField
                  id="name"
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">Name:</InputAdornment>
                    ),
                  }}
                  value={patient?.name}
                />
                <TextField
                  className="w-24"
                  id="age"
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">age:</InputAdornment>
                    ),
                  }}
                  value={patient?.age}
                />
                <TextField
                  className="w-36"
                  id="gender"
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">gender:</InputAdornment>
                    ),
                  }}
                  value={patient?.gender}
                />
                <TextField
                  id="date"
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">Date:</InputAdornment>
                    ),
                  }}
                  value={date ? date : "Not available"}
                />
              </>
            )}
          </Box>
          <div className="flex flex-row flex-grow">
            {/* small sidebar */}
            <SidebarContainer itemInLS="miniSidebarWidth">
              {/* <Box
                
                // style={{ minWidth: "200px", maxWidth: "200px" }}
              > */}
              <MiniSidebarContent />
              {/* </Box> */}
            </SidebarContainer>
            <Box className="bg-slate-400 p-7 w-full h-full flex flex-col">
              <Prescription />
              {/* id={patient?.id}  */}
            </Box>
          </div>
        </Box>
      </div>
    )
  );
};

export default Page;
