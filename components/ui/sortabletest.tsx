import { createContext, useEffect, useState } from "react";
import { closestCenter, DndContext, DragEndEvent } from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  useSortable,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { PatientDetails, Visit } from "../interfaces/databaseInterfaces";
import { useSelector } from "react-redux";
import {
  getCurrentVisit,
  updateDetailsOrder,
} from "@/app/GlobalRedux/store/patientSlice";
import {
  Button,
  Card,
  CardContent,
  TextField,
  Typography,
} from "@mui/material";
import { store } from "@/app/GlobalRedux/store/store";
import DetailsMenu from "./detailsMenu";
import React from "react";

export const detailContext = createContext<undefined | PatientDetails>(
  undefined
);
const Detail = ({ detail }: { detail: PatientDetails | undefined }) => {
  const [contextData, setContextData] = React.useState(detail);
  return (
    <detailContext.Provider value={contextData}>
      <Card variant="outlined" className="flex">
        <CardContent className="px-4 py-2 flex-grow">
          <Typography variant="h6" gutterBottom className="">
            {detail?.detailHeading}
          </Typography>
          <Typography variant="body2" className="whitespace-pre-wrap">
            {detail?.details}
          </Typography>
        </CardContent>
        <DetailsMenu />
      </Card>
    </detailContext.Provider>
  );
};

export default function Details({ visit }: { visit: Visit }) {
  // //console.log("rendering Details");
  const [detailOrder, setDetailOrder] = useState(visit?.patientDetails);
  // useEffect(() => {
  // }, [visit.patientDetails.length]);
  // //console.log("rendering details");
  useEffect(() => {
    if (visit?.patientDetails) {
      setDetailOrder(visit.patientDetails);
    }
    //console.log(visit.patientDetails);
  }, [visit?.patientDetails]);
  return (
    <div className="details">
      {detailOrder?.map((detail) => (
        <Detail key={detail?.id} detail={detail} />
      ))}
    </div>
  );
}
