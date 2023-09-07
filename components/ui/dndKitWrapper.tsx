import logo from "./logo.svg";
import { DndContext, DragEndEvent, closestCenter } from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { FormEvent, useState } from "react";
import SortableItem from "./sortableItem";
import { useSelector } from "react-redux";
import {
  addDetailToPatient,
  getCurrentVisit,
} from "@/app/GlobalRedux/store/patientSlice";
import {
  Button,
  Card,
  CardContent,
  TextField,
  Typography,
} from "@mui/material";
import { store } from "@/app/GlobalRedux/store/store";
import { Visit } from "../interfaces/databaseInterfaces";

export default function DndKitWrapper() {
  const visit = useSelector(getCurrentVisit) as Visit;
  const [sortedDetails, setSortedDetails] = useState(visit?.patientDetails);
  const [detail, setDetail] = useState<{
    detailHeading: string;
    detailText: string;
  }>({ detailHeading: "", detailText: "" });
  const [addDetail, setAddDetail] = useState(true);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // Get the name and value from the input element
    const { name, value } = e.target;

    // Update the detail state based on the input element's name
    setDetail((prevDetail) => ({
      ...prevDetail,
      [name]: value,
    }));
    console.log(detail);
    setDetail({ detailHeading: "", detailText: "" });
  };

  const handleSubmit = (event: FormEvent) => {
    try {
      event.preventDefault();
      console.log("handle submit details");
      if (detail.detailText && detail.detailHeading && visit) {
        console.log("handle submit details inside if");
        store.dispatch(
          addDetailToPatient({
            detailHeading: detail.detailHeading,
            detail: detail.detailText,
            visitId: visit.id, // Replace with the actual visit ID
          })
        );
      }
    } catch (error) {}
  };
  return (
    <DndContext collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
      <div className="p-3" style={{ width: "100%" }}>
        <h2>Patient Details</h2>
        <div className="max-w-md mx-auto border rounded-md shadow-md p-2">
          <h2 className="text-lg font-semibold text-center mb-1">
            <Button onClick={() => setAddDetail((prev) => !prev)} size="small">
              Insert Details
            </Button>
          </h2>
          {addDetail && (
            <form
              onSubmit={handleSubmit}
              className="transition ease-in-out duration-300 transform "
            >
              <div className="mb-1">
                <label
                  htmlFor="detailHeading"
                  className="block text-sm font-medium text-gray-700"
                >
                  Detail Heading
                </label>
                <input
                  type="text"
                  id="detailHeading"
                  name="detailHeading"
                  required
                  value={detail.detailHeading}
                  onChange={handleInputChange}
                  className="border border-gray-300 rounded-md py-1 px-2 w-full"
                />
              </div>
              <div className="mb-1">
                <label
                  htmlFor="detailText"
                  className="block text-sm font-medium text-gray-700"
                >
                  Detail Text
                </label>
                <input
                  type="text"
                  id="detailText"
                  name="detailText"
                  required
                  value={detail.detailText}
                  onChange={handleInputChange}
                  className="border border-gray-300 rounded-md py-1 px-2 w-full"
                />
              </div>
              <button
                type="submit"
                className="mt-2 bg-blue-500 text-white hover:bg-blue-700 py-2 px-4 rounded-md"
              >
                Submit
              </button>
            </form>
          )}
        </div>
        <SortableContext
          items={sortedDetails ? sortedDetails : []}
          strategy={verticalListSortingStrategy}
        >
          {/* We need components that use the useSortable hook */}
          {sortedDetails.map((item) => (
            <SortableItem key={item} detail={item} />
          ))}
        </SortableContext>
      </div>
    </DndContext>
  );

  function handleDragEnd(event: DragEndEvent) {
    console.log("Drag end called");
    // console.log(JSON.stringify(event, null, 2));
    const { active, over } = event;
    console.dir("ACTIVE: " + active.id);
    console.log("OVER :" + over?.id);
    if (active.id !== over?.id) {
      setSortedDetails((items) => {
        const activeIndex = items.indexOf(active.id);
        if (over) {
          const overIndex = items.indexOf(over.id);
          console.log(arrayMove(items, activeIndex, overIndex));
          return arrayMove(items, activeIndex, overIndex);
        }
        return items;
        // items: [2, 3, 1]   0  -> 2
        // [1, 2, 3] oldIndex: 0 newIndex: 2  -> [2, 3, 1]
      });
    }
  }
}
