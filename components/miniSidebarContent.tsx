import React, { ChangeEvent, useState } from "react";
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
import { getVisitDetailsFromStore } from "@/app/GlobalRedux/store/patientSlice";

export default function MiniSidebarContent() {
  const [temp, setTemp] = useState([
    {
      id: 1,
      visitDetailTitle: { title: "Title 1" },
      description: "Description 1",
    },
    { id: 2, title: "Title 2", description: "Description 2" },
    // Add more initial data as needed
  ]);
  const initialValue = useSelector(getVisitDetailsFromStore);
  console.log(initialValue ?? "no initial value");
  const [visitDetails, setVisitDetails] = useState<VisitDetail[]>(
    initialValue ?? []
  );

  console.log("hello");
  visitDetails.map((visit) => {
    console.log(visit.id);
    console.log(visit.visitDetailTitle.title);
    console.log(visit.description);
  });

  const handleInputChange = (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    index: number
  ) => {
    const updatedVisitDetails = [...temp];
    updatedVisitDetails[index].description = event.target.value;
    setTemp(updatedVisitDetails);
    localStorage.setItem("visitDetails", JSON.stringify(temp));
    console.log(temp);
  };

  return (
    <div className="w-full bg-slate-400 border-2 rounded-lg border-gray-400 shadow-md">
      {temp.map((visitDetail, index) => (
        <div
          className="border rounded-lg pl-1 pt-1 border-slate-600 shadow-md"
          key={visitDetail.id}
        >
          <h6 className="text-lg font-semibold text-center">
            {visitDetail.title}
          </h6>
          <TextField
            id="outlined-multiline-flexible"
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
      ))}
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
