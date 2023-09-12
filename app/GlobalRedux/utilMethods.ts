import { format, parse } from "date-fns";
import { Detail } from "./store/detailSlice";
import { Visit } from "@/components/interfaces/databaseInterfaces";

export function formatDateString(date: string): string {
  const parsedDate = parse(date, "yyyy-MM-dd'T'HH:mm:ss.SSSXXX", new Date());
  // Format the parsed date into the desired format
  const formattedDate = format(parsedDate, "hh:mm:ss a dd/MM/yyyy");
  return formattedDate;
}
// Define a function to set the order of patient visit details
export const setDetailsOrder = (
  currentLayout: Array<Detail>,
  patientDetails: Visit["patientDetails"]
): Visit["patientDetails"] => {
  const orderedDetails: Visit["patientDetails"] = [];

  // Iterate through the detailSlice to maintain the specified sequence
  for (const patientDetail of patientDetails) {
    // Find the corresponding detail in currentLayout by matching headings
    const matchingDetail = currentLayout.find(
      (currentDetail) =>
        currentDetail.detailHeading === patientDetail.detailHeading
    );

    if (matchingDetail) {
      // If a matching detail is found, push the patientDetail to the ordered list
      orderedDetails.push(patientDetail);
    }
  }

  // Append any remaining patientDetails (non-matching) to the end of the ordered list
  const nonMatchingPatientDetails = patientDetails.filter(
    (patientDetail) =>
      !currentLayout.some(
        (currentDetail) =>
          currentDetail.detailHeading === patientDetail.detailHeading
      )
  );

  // Push non-matching patientDetails to the ordered list
  orderedDetails.push(...nonMatchingPatientDetails);

  return orderedDetails;
};
