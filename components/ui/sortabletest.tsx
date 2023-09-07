import { useState } from "react";
import { closestCenter, DndContext, DragEndEvent } from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  useSortable,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { PatientDetails } from "../interfaces/databaseInterfaces";
import { useSelector } from "react-redux";
import { getCurrentVisit } from "@/app/GlobalRedux/store/patientSlice";
import {
  Button,
  Card,
  CardContent,
  TextField,
  Typography,
} from "@mui/material";

const SortableUser = ({ detail }: { detail: PatientDetails }) => {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id: detail.id });
  const style = {
    transition,
    transform: CSS.Transform.toString(transform),
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      className="detail"
    >
      <Card variant="outlined">
        <CardContent>
          <Typography variant="h6" gutterBottom>
            {detail.detailHeading}
          </Typography>
          <Typography variant="body2">{detail.details}</Typography>
        </CardContent>
      </Card>
    </div>
  );
};

export default function Details() {
  const visit = useSelector(getCurrentVisit);

  const [detailOrder, setDetailOrder] = useState(visit?.patientDetails);

  const onDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (active.id === over?.id) {
      return;
    }
    setDetailOrder((prev) => {
      if (!prev || !over) {
        return;
      }
      const oldIndex = prev?.findIndex((detail) => detail.id === active.id);
      const newIndex = prev?.findIndex((detail) => detail.id === over.id);
      return arrayMove(prev, oldIndex, newIndex);
    });
  };

  return (
    <div className="details">
      <div>
        <DndContext collisionDetection={closestCenter} onDragEnd={onDragEnd}>
          <SortableContext
            items={detailOrder ?? []}
            strategy={verticalListSortingStrategy}
          >
            {detailOrder?.map((detail) => (
              <SortableUser key={detail.id} detail={detail} />
            ))}
          </SortableContext>
        </DndContext>
      </div>
    </div>
  );
}
