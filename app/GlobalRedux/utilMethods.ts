import { format, parse } from "date-fns";
import { Detail } from "./store/detailSlice";
import { Visit } from "@/components/interfaces/databaseInterfaces";
import { getCurrentVisit } from "./store/patientSlice";
import { error } from "console";
import { Store } from "redux";
import { RootState } from "./store/store";

export function formatDateString(date: string): string {
  const parsedDate = parse(date, "yyyy-MM-dd'T'HH:mm:ss.SSSXXX", new Date());
  // Format the parsed date into the desired format
  const formattedDate = format(parsedDate, "hh:mm:ss a dd/MM/yyyy");
  return formattedDate;
}
// Define a function to set the order of patient visit details
export const setDetailsOrder = (state: RootState): Visit["patientDetails"] => {
  const currentLayout = state.detailsLayout.detailsInfo;
  const patientDetails = getCurrentVisit(state)?.patientDetails;
  // Iterate through the detailSlice to maintain the specified sequence
  if (!patientDetails || !currentLayout) {
    throw new Error("Not defined patient details OR details order");
  }

  // Create a map to store the index of each detailHeading in currentLayout
  const detailIndexMap = new Map();

  currentLayout.forEach((currentDetail, index) => {
    detailIndexMap.set(currentDetail.detailHeading, index);
  });

  // Initialize orderedDetails with an empty array
  const orderedDetails: Visit["patientDetails"] = [];

  // Iterate through patientDetails
  for (const patientDetail of patientDetails) {
    const indexInLayout = detailIndexMap.get(patientDetail.detailHeading);

    if (indexInLayout !== undefined && indexInLayout !== null) {
      // If the detailHeading exists in currentLayout, push the patientDetail to the ordered list
      orderedDetails[indexInLayout] = patientDetail;
    }
    // No else condition here to allow for handling missing details
  }

  // Remove undefined positions from orderedDetails
  const orderedPatientDetails = orderedDetails.filter(
    (detail) => detail !== undefined
  );

  // Append any remaining patientDetails (non-matching) to the end of the ordered list
  const nonMatchingPatientDetails = patientDetails.filter(
    (patientDetail) =>
      !orderedPatientDetails.some(
        (orderedDetail) =>
          orderedDetail.detailHeading === patientDetail.detailHeading
      )
  );

  // Push non-matching patientDetails to the ordered list
  orderedDetails.push(...orderedPatientDetails, ...nonMatchingPatientDetails);

  // orderedDetails.map((detail) => {
  //   console.log("ordered detail: " + detail.detailHeading);
  // });
  const uniqueList = [...new Set(orderedDetails)];

  return orderedDetails;
};

export function areObjectsEqual(objA: Object, objB: Object) {
  // Check if both objects are the same reference
  if (objA === objB) {
    return true;
  }

  // Check if both objects are null or undefined
  if (objA == null || objB == null) {
    return false;
  }

  // Check if both objects have the same keys
  const keysA = Object.keys(objA);
  const keysB = Object.keys(objB);

  if (keysA.length !== keysB.length) {
    return false;
  }

  // Check if values of corresponding keys are equal
  // for (const key of keysA) {
  //   if (objA[key] !== objB[key]) {
  //     return false;
  //   }
  // }

  return true;
}
