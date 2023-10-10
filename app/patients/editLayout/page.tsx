"use client";
import EditDetailsLayout from "@/components/editDetailsLayout";
import EditVisitDetails from "@/components/ui/editVisitDetails";
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
          <EditDetailsLayout />
        </Box>
        {/* </SidebarContainer> */}
        {/* Main content */}
        <Box className="h-full w-full flex flex-col overflow-y-scroll">
          {/* spacing={2} */}
          {/* {Box here} */}
          <Box className="p-5 bg-yellow-700 flex justify-center ">
            {/* Patient details */}
            You can edit your layout here
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
              <ul className="list-disc">
                <li>
                  Drag and drop the detail headings to change the order in which
                  they will appear
                </li>
                <li>Add or delete detail headings</li>
              </ul>
              {/* id={patient?.id}  */}
            </Box>
          </div>
        </Box>
      </div>
    )
  );
};

export default Page;
