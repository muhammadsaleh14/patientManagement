import React, { ChangeEvent, useEffect, useState } from "react";
import { useSelector } from "react-redux";

import {
  Box,
  Card,
  CardContent,
  List,
  ListItem,
  ListItemText,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
import { Edit, Delete, PaddingSharp } from "@mui/icons-material";
import { VisitDetail } from "./interfaces/databaseInterfaces";
import {
  getVisitDetailsFromStore,
  saveVisitDetails,
  simpleVisitDetail,
} from "@/app/GlobalRedux/store/patientSlice";
import { store } from "@/app/GlobalRedux/store/store";

export default function MiniSidebarContent() {
  const initialValue = useSelector(getVisitDetailsFromStore);

  const [unsavedChanges, setUnsavedChanges] = useState(false);

  const [visitDetails, setVisitDetails] = useState<simpleVisitDetail[]>(
    initialValue ?? []
  );

  useEffect(() => {
    // console.log("setvisitdetails to ", initialValue);
    setVisitDetails(initialValue ?? []);
  }, [initialValue]);

  useEffect(() => {
    const saveTimer = setTimeout(() => {
      if (visitDetails.length > 0) {
        if (unsavedChanges) {
          console.log("running save");
          store.dispatch(saveVisitDetails(visitDetails));
          setUnsavedChanges(false); // Mark changes as saved
        }
        if (visitDetails.some((detail) => typeof detail.id === "undefined")) {
          store.dispatch(saveVisitDetails(visitDetails));
        }
      }
    }, 2000); // Delay for 2 second (adjust as needed)

    // Clear the timer when the component unmounts or when data changes
    return () => clearTimeout(saveTimer);
  }, [visitDetails]);

  // Prompt user before leaving the page if there are unsaved changes
  useEffect(() => {
    const handleBeforeUnload = (event: BeforeUnloadEvent) => {
      if (unsavedChanges) {
        event.preventDefault();
        event.returnValue =
          "You have unsaved changes. Are you sure you want to leave?";
      }
    };

    window.addEventListener("beforeunload", handleBeforeUnload);

    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, [unsavedChanges]);

  const handleInputChange = (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    index: number
  ) => {
    setUnsavedChanges(true);
    setVisitDetails((prev) => {
      const updatedVisitDetails = [...prev];
      updatedVisitDetails[index] = {
        ...updatedVisitDetails[index],
        description: event.target.value,
      };
      return updatedVisitDetails;
    });
  };

  return (
    <div className="w-full h-full bg-slate-400 border-2 rounded-lg border-gray-400 shadow-md">
      <div className="text-center font-extrabold">
        {unsavedChanges ? (
          <div className="text-orange-600">Saving ...</div>
        ) : (
          <div className="text-blue-900">Saved</div>
        )}
      </div>

      {visitDetails.map((visitDetail, index: number) =>
        !visitDetail.id ? (
          <div
            className="border rounded-lg pl-1 pt-1 border-slate-600 shadow-md"
            key={index}
          >
            <h6 className="text-lg font-semibold text-center">Loading...</h6>
            {/* <TextField
              id="outlined-multiline-flexible"
              spellCheck="false"
              multiline
              fullWidth
              size="small"
              required
              minRows={2}
              maxRows={4}
              disabled
              value={visitDetail.description}
              color="info"
              // onChange={(event) => handleInputChange(event, index)}
              margin="none"
              className="p-0"
            /> */}
          </div>
        ) : (
          <div
            className="border rounded-lg pl-1 pt-1 border-slate-600 shadow-md"
            key={index}
          >
            <h6 className="text-lg font-semibold text-center">
              {visitDetail.title}
            </h6>
            <TextField
              id="outlined-multiline-flexible"
              spellCheck="false"
              multiline
              fullWidth
              size="small"
              required
              minRows={2}
              maxRows={4}
              value={visitDetail.description}
              onChange={(event) => handleInputChange(event, index)}
              margin="none"
              className="p-0"
            />
          </div>
        )
      )}
    </div>
  );
}

//   const visitDetailsDescription = useSelector(
//     getVisitDetailDescriptionsFromStore
//   );

//   return (
//     <Paper elevation={3} className="h-full w-full bg-gray-300">
//       <List>
//         {visitDetailsDescription?.map((vdd) => (
//           <ListItem key={vdd.id}>
//             <ListItemText
//               primary={
//                 <Typography variant="h6">
//                   {vdd.visitDetailTitle.title}
//                 </Typography>
//               }
//               secondary={vdd.description}
//             />
//             {/* Add icons for editing and deleting here */}
//             <Edit />
//             <Delete />
//           </ListItem>
//         ))}
//       </List>
//     </Paper>
//   );
