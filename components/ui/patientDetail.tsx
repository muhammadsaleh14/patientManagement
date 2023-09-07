import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { PatientDetails, Visit } from "../interfaces/databaseInterfaces";
import {
  Button,
  Card,
  CardContent,
  TextField,
  Typography,
} from "@mui/material";
import { useState } from "react";
import { previousDay } from "date-fns";

export default function PatientDetail(props: { detail: PatientDetails }) {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id: props.detail.id });
  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <>
      <div ref={setNodeRef} style={style} {...attributes} {...listeners}>
        {/* <div className="m-3">{props.detail.detailHeading}</div> */}
        {/* <div className="m-3">{props.detail.details}</div> */}
        
      </div>
    </>
  );
}
