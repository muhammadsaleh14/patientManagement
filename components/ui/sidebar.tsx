import { FormEvent, useState } from "react";
import { useSelector } from "react-redux";
import {
  addDetailToPatient,
  getCurrentVisit,
} from "@/app/GlobalRedux/store/patientSlice";
import { Autocomplete, Button, Chip, TextField } from "@mui/material";
import { store } from "@/app/GlobalRedux/store/store";
import { Visit } from "../interfaces/databaseInterfaces";
// Default SortableJS
import Details from "./sortabletest";
import { getDetailsLayoutArray } from "@/app/GlobalRedux/store/detailSlice";

export default function Sidebar() {
  const visit = useSelector(getCurrentVisit) as Visit;
  const detailOptions = useSelector(getDetailsLayoutArray);

  const [detail, setDetail] = useState<{
    detailHeading: string;
    detailText: string;
  }>({ detailHeading: "", detailText: "" });
  const [addDetail, setAddDetail] = useState(false);

  const handleInputChange = (
    e?: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    newValue?: string
  ) => {
    // Get the name and value from the input element

    if (newValue) {
      setDetail((prevDetail) => ({
        ...prevDetail,
        detailHeading: newValue,
      }));
    } else {
      if (e) {
        const { name, value } = e.target;

        // Update the detail state based on the input element's name
        setDetail((prevDetail) => ({
          ...prevDetail,
          [name]: value,
        }));
      }
    }
  };

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();

    if (detail.detailText && detail.detailHeading && visit) {
      store.dispatch(
        addDetailToPatient({
          detailHeading: detail.detailHeading,
          detail: detail.detailText,
          visitId: visit.id, // Replace with the actual visit ID
        })
      );
      setDetail({ detailHeading: "", detailText: "" });
    }
  };

  return (
    <div className="p-3 z-10" style={{ width: "100%" }}>
      {/* Patient details as chronic details */}
      <h2 className="text-center font-semibold text-lg">Chronic Details</h2>
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
              <Autocomplete
                className="border border-gray-300 rounded-md py-1 px-2 w-full"
                // {...allPrescriptionProps}
                options={[...detailOptions]}
                id="free-solo-demo"
                clearOnEscape
                freeSolo
                inputValue={detail.detailHeading}
                onInputChange={(event, newInputValue) => {
                  handleInputChange(undefined, newInputValue);
                }}
                renderInput={(params) => (
                  <>
                    <TextField
                      {...params}
                      id="standard"
                      variant="standard"
                      name="detailHeading"
                      // label="Add Prescription"
                      required
                      onChange={(e) => handleInputChange(e)}
                    />
                  </>
                )}
                renderOption={(props, option) => (
                  <li {...props} key={option}>
                    {option}
                  </li>
                )}
                renderTags={(tagValue, getTagProps) =>
                  tagValue.map((option, index) => (
                    <Chip
                      {...getTagProps({ index })}
                      key={option}
                      label={option}
                    />
                  ))
                }
              />
            </div>
            <div className="mb-1">
              <label
                htmlFor="detailText"
                className="block text-sm font-medium text-gray-700"
              >
                Detail Text
              </label>
              <TextField
                id="detailText"
                name="detailText"
                variant="standard"
                placeholder="Enter for next line"
                multiline
                maxRows={4}
                value={detail.detailText}
                onChange={(e) => handleInputChange(e)}
                required
                className="border border-gray-300 rounded-md py-1 px-2 w-full"
                // label="Add Prescription"
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
      <Details visit={visit} />
    </div>
  );
}
