"use client";
import React, { useEffect, useState } from "react";
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
import { Patient } from "@/app/patients/page";
import { useRouter } from "next/router";
import { DragHandler } from "@/components/ui/DragHandler";
import axios from "axios";
import SimpleDrawer from "@/components/ui/simpleDrawer";

const Page = ({ params }: { params: { id: string } }) => {
  const [patient, setPatient] = useState<Patient | null>(null);

  useEffect(() => {
    const fetchPatients = async () => {
      try {
        const response = await axios.get("/api/patients/" + params.id); // Assuming you have set up an API route
        console.log(response.data);
        setPatient(response.data.patient);
      } catch (error) {
        console.error("Error fetching patients:", error);
      }
    };
    // Fetch patients from Prisma
    fetchPatients();
  }, [params.id]);
  return (
      <Stack direction="row" spacing={0} className="h-full">
        <SimpleDrawer/>
        {/* Sidebar */}
        <Box
          className="bg-gray-300 p-5 overflow-y-auto"
          style={{ width: "300px", height: "100vh" }}
        >
          {/* Sidebar content */}
          {/* You can put your sidebar content here */}
          <DragHandler />
        </Box>
        {/* Main content */}
        <Box className="flex-grow">
          <Stack spacing={2}>
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
                    id="age"
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">age:</InputAdornment>
                      ),
                    }}
                    value={patient?.age}
                  />
                  <TextField
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
                    value="date to be added"
                  />
                </>
              )}
            </Box>
            <Box>
              <Stack direction="row" className="w-full h-full">
                <Box>{/* <DragHandler /> */}</Box>
                <Box className="bg-gray-600  p-7">this is text area</Box>
              </Stack>
            </Box>
          </Stack>
        </Box>
      </Stack>
    </Box>
    // <Box className="bg-slate-600 h-full">
    //   <Stack spacing={2}>
    //     <Box className="p-5 bg-yellow-700 flex justify-center ">
    //       {patient && (
    //         <>

    //         </>
    //       )}

    //       {/* Patient details */}
    //     </Box>
    //     <Box
    //       className="bg-gray-300 p-5 overflow-y-auto"
    //       style={{ width: "300px" }}
    //     >
    //       {/* Sidebar content */}
    //       {/* You can put your sidebar content here */}
    //     </Box>
    //     <Box className="h-full w-full bg-red-500">
    //       {/* <Stack direction="row" className="w-full h-full bg-blue-600"> */}
    //       <Box className="">
    //       </Box>
    //       <Box className="">this is text area</Box>
    //       {/* </Stack> */}
    //     </Box>
    //   </Stack>
    // </Box>
  );
};

export default Page;
