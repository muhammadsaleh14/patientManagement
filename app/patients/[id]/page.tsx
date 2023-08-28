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
import { usePatientContext } from "@/components/patientContextProvider";
import { usePatientDateContext } from "@/components/dateContextProvider";
// { params }: { params: { id: string } }
const Page = () => {
  const searchParams = useSearchParams();
  const { patient } = usePatientContext();

  useEffect(() => {
    async function manageDate() {
      const date = searchParams.get("visitDate") as string;
      async function getVisitIdFromDate(date: string) {
        const visit = patient?.visits.find((visit) => visit.date === date);
        if (visit) {
          return visit.id;
        } else {
          const { data: newVisit }: { data: Visit } = await axios.post(
            "/api/patients/" + patient?.id + "/visits",
            { date }
          );
          return newVisit.id;
        }
      }
      const visitId = await getVisitIdFromDate(date);
      localStorage.setItem("visitId", visitId.toString());
    }
    manageDate();
  }, [patient?.id, patient?.visits, searchParams]);
  return (
    <Stack direction="row" spacing={0} className="h-full">
      {/* Sidebar */}
      <Box
        className="bg-gray-300 p-5 overflow-y-auto h-screen"
        style={{ width: "220px" }}
      >
        {/* Sidebar content */}
        {/* You can put your sidebar content here */}

        <DragHandler />
      </Box>
      {/* Main content */}
      <Box className="h-full w-full">
        <Stack spacing={2} className="h-full">
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

          <Box className="bg-slate-400 p-7 w-full h-full">
            <Prescription date={getVisitDate(patient, visitId)} />
            {/* id={patient?.id}  */}
          </Box>
        </Stack>
      </Box>
    </Stack>
  );
};

export default Page;
