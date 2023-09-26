"use client";
import EditDetailsLayout from "@/components/editDetailsLayout";
import MiniSidebarContent from "@/components/miniSidebarContent";
import EditVisitDetails from "@/components/ui/editVisitDetails";
import Prescription from "@/components/ui/prescription";
import Sidebar from "@/components/ui/sidebar";
import SidebarContainer from "@/components/ui/sidebarContainer";
import { Box } from "@mui/material";
import { useEffect, useState } from "react";

const Page = () => {
  const [domLoaded, setDomLoaded] = useState(false);
  useEffect(() => {
    setDomLoaded(true);
  }, []);
  return (
    domLoaded && (
      <div className="h-full flex flex-row">
        {/* Sidebar */}
        {/* <SidebarContainer itemInLS="sidebarWidth"> */}
        <Box
          className="bg-gray-300 overflow-y-auto h-auto flex-grow w-2/4 p-2 min-w-fit"
          // style={{ minWidth: "200px", maxWidth: "200px" }}
        >
          {/* Sidebar content */}
          {/* <Sidebar /> */}
          sidebar content
          <EditDetailsLayout />
        </Box>
        {/* </SidebarContainer> */}
        {/* Main content */}
        <Box className="h-full w-full flex flex-col">
          {/* spacing={2} */}
          {/* {Box here} */}
          <Box className="p-5 bg-yellow-700 flex justify-center ">
            {/* Patient details */}
            hello
          </Box>
          <div className="flex flex-row flex-grow">
            {/* small sidebar */}
            <SidebarContainer itemInLS="miniSidebarWidth">
              {/* <Box
                
                // style={{ minWidth: "200px", maxWidth: "200px" }}
              > */}
              {/* <MiniSidebarContent /> */}
              <div className="bg-slate-400 w-full h-full p-2">
                <EditVisitDetails />
              </div>

              {/* </Box> */}
            </SidebarContainer>
            <Box className="bg-slate-400 p-7 w-full h-full flex flex-col">
              {/* <Prescription /> */}
              prescription
              {/* id={patient?.id}  */}
            </Box>
          </div>
        </Box>
      </div>
    )
  );
};

export default Page;
