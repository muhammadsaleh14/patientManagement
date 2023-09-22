"use client";
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
import { Detail } from "@/app/GlobalRedux/store/detailSlice";

export const detailContext = createContext<undefined | PatientDetails>(
  undefined
);

const DetailComponent = ({
  detail,
  bold,
}: {
  detail: PatientDetails | undefined;
  bold: boolean;
}) => {
  const [contextData, setContextData] = React.useState(detail);
  console.log(bold);

  return (
    <detailContext.Provider value={contextData}>
      <Card variant="outlined" className="flex">
        <CardContent className="px-4 py-2 flex-grow">
          <Typography
            variant="h6"
            gutterBottom
            sx={bold ? { fontWeight: 700 } : {}}
            // className={bold ? "font-extrabold" : ""}
          >
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
  const [detailOrder, setDetailOrder] = useState(visit?.patientDetails);
  let ls;
  // useEffect(() => {}, detailOrder);
  useEffect(() => {
    if (visit?.patientDetails) {
      setDetailOrder(visit.patientDetails);
    }
  }, [visit?.patientDetails]);
  if (typeof localStorage !== "undefined") {
    ls = localStorage.getItem("detailData");
  }
  const orderedDetails = ls ? (JSON.parse(ls) as Detail[]) : null;
  const detailHeadings = orderedDetails?.map((detail) => detail.detailHeading);
  // console.log(detailHeadings);

  const checkHeading = (detail: PatientDetails) => {
    if (detailHeadings && detailHeadings.includes(detail.detailHeading)) {
      // console.log("bold true");
      // Wrap the detail in a bold tag
      return true;
    }
    // console.log("bold false");
    return false;
  };

  return (
    <div className="details">
      {detailOrder?.map((detail) => {
        const bold = checkHeading(detail);
        return <DetailComponent key={detail?.id} detail={detail} bold={bold} />;
      })}
    </div>
  );
}
