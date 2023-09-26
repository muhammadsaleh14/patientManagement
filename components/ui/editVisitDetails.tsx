import { useState } from "react";
import { useSelector } from "react-redux";
import { VisitDetail } from "../interfaces/databaseInterfaces";
import { getVisitDetailsFromStore } from "@/app/GlobalRedux/store/patientSlice";

export default function EditVisitDetails() {
const detailTitles = 

  const [visitDetailInput, setVisitDetailInput] = useState("");
  const initialValue = useSelector(getVisitDetailsFromStore);
  console.log(initialValue ?? "no initial value");
  const [visitDetails, setVisitDetails] = useState<VisitDetail[]>(
    initialValue ?? []
  );
  console.log(visitDetailInput);
  const handleSubmit = () => {};
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
      {visitDetails.map((visitDetail, index) => (
        <div
          className="border rounded-lg pl-1 pt-1 border-slate-600 shadow-md"
          key={visitDetail.id}
        >
          <h6 className="text-lg font-semibold text-center">
            {visitDetail.visitDetailTitle.title}
          </h6>
        </div>
      ))}
    </>
  );
}
