"use client";
import React, { createContext, useContext, useEffect, useState } from "react";
import {
  SortableList,
  SortableItemProps,
  ItemRenderProps,
  SortableItem,
} from "@thaddeusjiang/react-sortable-list";
import {
  Box,
  Button,
  Divider,
  Drawer,
  InputAdornment,
  Paper,
  Stack,
  TextField,
  Toolbar,
  Typography,
} from "@mui/material";

import { useRouter } from "next/router";
import { DragHandler } from "@/components/ui/DragHandler";
import axios from "axios";
import PersistantDrawerRight from "@/components/ui/simpleDrawer";
import Prescription from "@/components/ui/prescription";
import { useSearchParams } from "next/navigation";
import format from "date-fns/format";
import { Patient, Visit } from "@/components/interfaces/databaseInterfaces";
import {
  getPatientState,
  // initializeState,
  setPatient,
  setVisit,
  setVisitId,
} from "@/app/GlobalRedux/store/patientSlice";
import { useSelector } from "react-redux";
import { AppDispatch, store } from "@/app/GlobalRedux/store/store";
import { useDispatch } from "react-redux";
import DndKitWrapper from "@/components/ui/dndKitWrapper";
// { params }: { params: { id: string } }
const Page = ({ params }: { params: { id: string } }) => {
  const { patient, currentVisitId } = useSelector(getPatientState);
  const searchParams = useSearchParams();
  console.log("id" + params.id);
  const [domLoaded, setDomLoaded] = useState(false);
  const date = searchParams.get("visitDate") as string;

  useEffect(() => {
    // store.dispatch(initializeState());
    // console.log("initialising state");
    const initialiseState = async () => {
      const pId = parseInt(params.id);
      await store.dispatch(setPatient(pId));
      store.dispatch(setVisit(date));
    };
    initialiseState();
  }, [params.id, date]);

  useEffect(() => {
    setDomLoaded(true);
  }, []);
  return (
    domLoaded && (
      <Stack direction="row" spacing={0} className="h-full">
        {/* Sidebar */}
        <Box
          className="bg-gray-300 overflow-y-auto h-screen"
          style={{ minWidth: "200px", maxWidth: "200px" }}
        >
          {/* Sidebar content */}
          <DndKitWrapper />
        </Box>
        {/* Main content */}
        <Box className="h-full w-full">
          <Stack spacing={2} className="h-full">
            {/* {Box here} */}
            <Box className="p-5 bg-yellow-700 flex justify-center ">
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
                        <InputAdornment position="start">
                          gender:
                        </InputAdornment>
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
            <Box className="bg-slate-400 p-7 w-full h-full">
              <Prescription />
              {/* id={patient?.id}  */}
            </Box>
          </Stack>
        </Box>
      </Stack>
    )
  );
};

export default Page;
