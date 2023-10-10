import { FormEvent, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { VisitDetailTitle } from "../interfaces/databaseInterfaces";
import {
  addVisitDetailTitle,
  deleteVisitDetailTitle,
  getVisitDetailTitlesState,
} from "@/app/GlobalRedux/store/visitDetailSlice";
import { store } from "@/app/GlobalRedux/store/store";
import { Button } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import DeleteDialog from "./deleteDialog";

export default function EditVisitDetails() {
  const { visitDetailTitles, error, status } = useSelector(
    getVisitDetailTitlesState
  );
  const [detailTitles, setDetailTitles] = useState<
    VisitDetailTitle[] | undefined
  >(visitDetailTitles);

  const [visitDetailInput, setVisitDetailInput] = useState("");

  const [itemOpenState, setItemOpenState] = useState<boolean[]>([]);

  // Initialize the state array with `false` values for each item
  useEffect(() => {
    const initialItemOpenState = Array(detailTitles?.length ?? 0).fill(false);
    setItemOpenState(initialItemOpenState);
    // store.dispatch(setVisitDetailTitles());
  }, []);

  useEffect(() => {
    setDetailTitles(visitDetailTitles);
  }, [visitDetailTitles]);

  function toggleItem(index: number) {
    setItemOpenState((prevState) => {
      const newState = [...prevState];
      newState[index] = !newState[index];
      return newState;
    });
  }

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    store.dispatch(addVisitDetailTitle(visitDetailInput));
    setVisitDetailInput("");
  };

  const handleDelete = (id: number) => {
    store.dispatch(deleteVisitDetailTitle(id));
  };

  // useEffect(() => {

  // }, []);
  return (
    <>
      <form
        onSubmit={handleSubmit}
        className="transition ease-in-out duration-300 transform "
      >
        <div className="mb-1">
          <label
            htmlFor="title"
            className="block text-lg font-medium text-gray-700"
          >
            Title
          </label>
          <input
            type="text"
            //   id="detailHeadin"
            //   name=""
            required
            value={visitDetailInput}
            onChange={(e) => setVisitDetailInput(e.target.value)}
            className="border border-gray-300 rounded-md py-1 px-2 w-full"
          />
        </div>
        <button
          type="submit"
          className="mt-2 bg-blue-500 text-white hover:bg-blue-700 py-2 px-4 rounded-md"
        >
          Submit
        </button>
        {/* {status === "failed" ? (
        <div className="p-2 text-red-600">{details.error}</div>
      ) : null} */}
      </form>
      {status === "failed" ? (
        <div className="text-red-600">{error}</div>
      ) : (
        status === "loading" && <div className="text-black">Loading...</div>
      )}

      {detailTitles?.map((visitDetailTitle, index) => (
        <div
          className="border rounded-lg pl-1 pt-1 border-slate-500 shadow-md my-1 flex flex-col"
          key={visitDetailTitle.id}
        >
          <div className="text-lg font-semibold text-center">
            Title: {visitDetailTitle.title}
          </div>
          {/* <div className="text-lg font-semibold text-center">
            Times used:{" "}
            {visitDetailTitle._count.visitDetails -
              visitDetailTitle.visitDetails.filter(
                (element) => typeof element.description === ("undefined" || "")
              ).length}
          </div> */}
          <div>
            <DeleteDialog
              title={`Are you sure you want to delete title: ${visitDetailTitle.title}`}
              text=""
              onDelete={() => {
                handleDelete(visitDetailTitle.id);
              }}
            >
              <Button
                variant="text"
                size="small"
                color="warning"
                className=" hover:bg-indigo-600"
              >
                <DeleteIcon />
              </Button>
            </DeleteDialog>
          </div>
          {!visitDetailTitle._count.visitDetails ? (
            <></>
          ) : (
            <Button
              className="text-center bg-indigo-800 mb-1"
              variant="contained"
              onClick={() => toggleItem(index)}
            >
              {!itemOpenState[index] ? <div>View Uses</div> : <div>Close</div>}
            </Button>
          )}

          {itemOpenState[index] &&
            visitDetailTitle.visitDetails.map((visitDetail) => {
              // if (visitDetail.description) {
              if (visitDetail.description) {
                return (
                  <div
                    key={visitDetail.id}
                    className="text-center border-black mb-1 border-2 rounded-lg p-2 max-w-sm break-words"
                  >
                    {visitDetail.description}
                  </div>
                );
              }
              // }
            })}
        </div>
      ))}
    </>
  );
}
