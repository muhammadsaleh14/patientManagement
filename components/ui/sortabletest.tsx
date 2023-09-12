import { useEffect, useState } from "react";
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

const Detail = ({ detail }: { detail: PatientDetails }) => {
  return (
    <Card variant="outlined">
      <CardContent>
        <Typography variant="h6" gutterBottom>
          {detail.detailHeading}
        </Typography>
        <Typography variant="body2">{detail.details}</Typography>
      </CardContent>
    </Card>
  );
};

export default function Details({ visit }: { visit: Visit }) {
  // console.log("rendering Details");
  const [detailOrder, setDetailOrder] = useState(visit?.patientDetails);
  // useEffect(() => {
  // }, [visit.patientDetails.length]);
  useEffect(() => {
    if (visit.patientDetails) {
      setDetailOrder(visit.patientDetails);
    }
    console.log(visit.patientDetails);
  }, [visit?.patientDetails]);
  return (
    <div className="details">
      {detailOrder?.map((detail) => (
        <Detail key={detail.id} detail={detail} />
      ))}
    </div>
  );
}
