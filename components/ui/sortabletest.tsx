"use client";
import { createContext, useEffect, useState } from "react";
import { PatientDetails, Visit } from "../interfaces/databaseInterfaces";
import { Card, CardContent, Typography } from "@mui/material";
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
  const [contextData] = React.useState(detail);

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
    } else {
      setDetailOrder([]);
    }
  }, [visit?.patientDetails]);

  if (typeof localStorage !== "undefined") {
    ls = localStorage.getItem("detailData");
  }
  const orderedDetails = ls ? (JSON.parse(ls) as Detail[]) : null;
  const detailHeadings = orderedDetails?.map((detail) => detail.detailHeading);

  const checkHeading = (detail: PatientDetails) => {
    if (detailHeadings && detailHeadings.includes(detail.detailHeading)) {
      // Wrap the detail in a bold tag
      return true;
    }

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
