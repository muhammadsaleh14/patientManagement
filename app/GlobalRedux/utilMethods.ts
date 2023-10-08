import { format, parse } from "date-fns";
import { Detail } from "./store/detailSlice";
import { Patient, Visit } from "@/components/interfaces/databaseInterfaces";
import { PatientState, getCurrentVisit } from "./store/patientSlice";
import { error } from "console";
import { Store } from "redux";
import { RootState } from "./store/store";
import { PatientDetails } from "@prisma/client";

export function formatDateString(date: string): string {
  const parsedDate = parse(date, "yyyy-MM-dd'T'HH:mm:ss.SSSXXX", new Date());
  // Format the parsed date into the desired format
  const formattedDate = format(parsedDate, "hh:mm:ss a dd/MM/yyyy");
  return formattedDate;
}

// export function initialisePatientState() {
//   if (typeof localStorage !== "undefined") {
//     const storedPatientData = localStorage.getItem("patientData");
//     const patientState = storedPatientData
//       ? (JSON.parse(storedPatientData) as PatientState)
//       : {};
//     if (!isEmpty(patientState)) {
//       setDetailsOrder();
//     }
//   }
// }
// Define a function to set the order of patient visit details
export const setDetailsOrder = (state: RootState): Visit["patientDetails"] => {
  const currentLayout = state.detailsLayout.detailsInfo;
  const allDetailsInVisit = getCurrentVisit(state)?.patientDetails;
  if (!allDetailsInVisit) {
    return [];
  }

  const patientDetails = allDetailsInVisit.reduce((acc, current) => {
    if (!acc.find((detail) => detail.detailHeading === current.detailHeading)) {
      acc.push(current);
    }
    return acc;
  }, [] as PatientDetails[]);

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
  orderedPatientDetails.push(...nonMatchingPatientDetails);

  // orderedDetails.map((detail) => {

  // });

  return orderedPatientDetails;
};

export function areArraysOfPatientDetailsEqual(
  arrayA: PatientDetails[],
  arrayB: PatientDetails[]
): boolean {
  // Check if the arrays have the same length
  if (!arrayA || !arrayB) return false;

  if (arrayA.length !== arrayB.length) {
    return false;
  }

  // Iterate through the arrays and compare each element
  for (let i = 0; i < arrayA.length; i++) {
    if (!arePatientDetailsEqual(arrayA[i], arrayB[i])) {
      return false;
    }
  }

  // If all elements are equal, return true
  return true;
}

// Function to compare individual PatientDetails objects
export function arePatientDetailsEqual(
  detailA: PatientDetails,
  detailB: PatientDetails
): boolean {
  return (
    detailA.id === detailB.id &&
    detailA.details === detailB.details &&
    detailA.detailHeading === detailB.detailHeading &&
    detailA.visitId === detailB.visitId
  );
}

// export function areObjectsEqual(objA: Object, objB: Object) {
//   // Check if both objects are the same reference
//   if (objA === objB) {
//     return true;
//   }

//   // Check if both objects are null or undefined
//   if (objA == null || objB == null) {
//     return false;
//   }

//   // Check if both objects have the same keys
//   const keysA = Object.keys(objA);
//   const keysB = Object.keys(objB);

//   if (keysA.length !== keysB.length) {
//     return false;
//   }

//   // Check if values of corresponding keys are equal
//   for (const key of keysA) {
//     if (objA[key]:any !== objB[key]:any) {
//       return false;
//     }
//   }

//   return true;
// }

export const isEmpty = (obj: Object) => {
  for (const key in obj) {
    if (obj.hasOwnProperty(key)) {
      return false; // If any property is found, it's not empty
    }
  }
  return true; // If no properties are found, it's empty
};

export function sortVisitsByDate(
  patient: Patient | undefined
): undefined | Patient {
  if (!patient) return;

  const sortedVisits = [...patient.visits].sort((a, b) => {
    // Convert the date strings to Date objects for comparison

    const dateA = parse(a.date, "hh:mm:ss a dd/MM/yyyy", new Date());
    const dateB = parse(b.date, "hh:mm:ss a dd/MM/yyyy", new Date());

    // Compare the dates in descending order
    if (dateA > dateB) {
      return -1;
    } else if (dateA < dateB) {
      return 1;
    } else {
      return 0;
    }
  });

  // Create a new patient object with sorted visits
  const sortedPatient: Patient = {
    ...patient,
    visits: sortedVisits,
  };

  return sortedPatient;
}
