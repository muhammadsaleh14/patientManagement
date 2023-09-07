import logo from "./logo.svg";
import { DndContext, DragEndEvent, closestCenter } from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { FormEvent, useState } from "react";
import SortableItem from "./patientDetail";
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
// Default SortableJS
import Sortable from "sortablejs";
import PatientDetail from "./patientDetail";
import Details from "./sortabletest";

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
        setDetail({ detailHeading: "", detailText: "" });
      }
    } catch (error) {}
  };

  return (
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
      <Details />
    </div>
  );
}
