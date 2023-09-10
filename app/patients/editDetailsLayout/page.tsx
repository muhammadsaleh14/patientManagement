"use client";
import { FormEvent, useCallback, useEffect, useRef, useState } from "react";
import { closestCenter, DndContext, DragEndEvent } from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  useSortable,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import {
  PatientDetails,
  Visit,
} from "@/components/interfaces/databaseInterfaces";
import { useSelector } from "react-redux";
import { getCurrentVisit } from "@/app/GlobalRedux/store/patientSlice";
import {
  Button,
  Card,
  CardActions,
  CardContent,
  TextField,
  Typography,
} from "@mui/material";
import {
  addDetailInfoWithHeading,
  getDetailsLayout,
  setNewDetailsOrder,
} from "@/app/GlobalRedux/store/detailSlice";
import { store } from "@/app/GlobalRedux/store/store";
import UnfoldMoreIcon from "@mui/icons-material/UnfoldMore";
// function sortDetailsByPosition(details: DetailsLayoutSlice["detailsInfo"]) {
//   const detailsInfo = details?.slice().sort((a, b) => a.id - b.id);
//   return detailsInfo;
// }
const SortableDetails = ({
  detail,
}: {
  detail: { detailHeading: string; id: number };
}) => {
  // console.log("rendering sortable Detail");
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id: detail.id });
  const style = {
    transition,
    transform: CSS.Transform.toString(transform),
  };
  const [isEditing, setIsEditing] = useState(false);
  const [editText, setEditText] = useState(detail.detailHeading);

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleDeleteClick = () => {
    // Implement your delete logic here
  };
  return (
    <div
      ref={setNodeRef}
      style={style}
      // {...attributes}
      // {...listeners}
      className="detail"
    >
      <div className="">
        <div className="bg-white border border-gray-200 rounded shadow-md mb-4 flex flex-row items-center justify-between">
          <div className="p-4">
            <h2 className="text-lg font-semibold">{detail.detailHeading}</h2>
          </div>
          {/* {isEditing && (
            <>
              <input
                type="text"
                value={editText}
                onChange={(e) => setEditText(e.target.value)}
              />
              <button
                className="px-4 py-2 text-sm bg-emerald-200 rounded text-emerald-700 hover:text-blue-900"
                onClick={editText}
              >
                Save Edit
              </button>
            </>
          )} */}
          <div className="p-4">
            <button {...listeners} {...attributes} className="font-bold m-2">
              <UnfoldMoreIcon />
            </button>
            <button
              className="px-4 py-2 text-sm bg-blue-300 rounded text-blue-500 hover:text-blue-900"
              onClick={handleEditClick}
            >
              Edit
            </button>
            <button
              className="px-4 py-2 text-sm bg-red-300 rounded text-red-500 hover:text-red-900 ml-2 "
              onClick={handleDeleteClick}
            >
              Delete
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

const Page: React.FC = () => {
  console.log("rendering Details");
  const details = useSelector(getDetailsLayout);
  // console.log(JSON.stringify(details.detailsInfo));
  const [detailOrder, setDetailOrder] = useState(details.detailsInfo);
  const detailsRef = useRef(detailOrder);
  // console.log("detailOrder" + detailOrder);
  const [detailInput, setDetailInput] = useState("");
  const [domLoaded, setDomLoaded] = useState(false);
  const [saveBtnDisabled, setSaveBtnDisabled] = useState(true);
  const status = details.status;
  console.log(status);
  const error = details.error;

  const onDragEnd = (event: DragEndEvent) => {
    console.log("running on drag end");
    const { active, over } = event;
    if (active.id === over?.id) {
      return;
    }
    setDetailOrder((prev) => {
      if (!prev || !over) {
        return [];
      }
      const oldIndex = prev?.findIndex((detail) => detail.id === active.id);
      const newIndex = prev?.findIndex((detail) => detail.id === over.id);
      return arrayMove(prev, oldIndex, newIndex);
    });
    setSaveBtnDisabled(false);
  };

  const saveConfig = () => {
    store.dispatch(setNewDetailsOrder(detailOrder));
    setSaveBtnDisabled(true);
  };

  useEffect(() => {
    setDomLoaded(true);
    setDetailOrder(details.detailsInfo);
    // console.log("detailsRef" + detailsRef);
  }, [domLoaded, details]);
  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    saveConfig();
    if (!detailInput) return;
    store.dispatch(addDetailInfoWithHeading(detailInput));
    setDetailInput("");
  };
  return (
    domLoaded && (
      <div className="details w-2/4 m-auto text-center">
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
              value={detailInput}
              onChange={(e) => setDetailInput(e.target.value)}
              className="border border-gray-300 rounded-md py-1 px-2 w-full"
            />
          </div>
          <button
            type="submit"
            className="mt-2 bg-blue-500 text-white hover:bg-blue-700 py-2 px-4 rounded-md"
          >
            Submit
          </button>
          {status === "failed" ? (
            <div className="p-2 text-red-600">{details.error}</div>
          ) : null}
        </form>
        <br />
        <Button
          disabled={saveBtnDisabled}
          onClick={saveConfig}
          // className="mt-3 bg-blue-500 text-white hover:bg-blue-700 py-2 px-4 rounded-md m-auto"
        >
          Save Config
        </Button>
        {status === "loading" ? (
          <div>Loading...</div>
        ) : status === "succeeded" || "idle" ? (
          // Render your success content here
          <div>
            <DndContext
              collisionDetection={closestCenter}
              onDragEnd={onDragEnd}
            >
              <SortableContext
                items={detailOrder ?? []}
                strategy={verticalListSortingStrategy}
              >
                {detailOrder?.map((detail) => (
                  <SortableDetails key={detail.id} detail={detail} />
                ))}
              </SortableContext>
            </DndContext>
          </div>
        ) : null}
      </div>
    )
  );
};
export default Page;
