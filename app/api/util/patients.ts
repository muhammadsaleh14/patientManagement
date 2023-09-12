import prisma from "@/app/api/util/db";
import { PatientDetails } from "@/components/interfaces/databaseInterfaces";
import { format, parse } from "date-fns"; // Import the format function from date-fns
import { da } from "date-fns/locale";

// import { format } from 'date-fns';
// Function to create a new patient

export async function createPatient(name: string, age: number, gender: string) {
  try {
    const patient = await prisma.patient.create({
      data: {
        name,
        age,
        gender,
      },
    });

    return { patient };
  } catch (error) {
    throw error;
  } finally {
    await prisma.$disconnect();
  }
}

// Function to delete a patient by ID

export async function deletePatient(patientId: number) {
  try {
    const patient = await prisma.patient.findUnique({
      where: {
        id: patientId,
      },
    });

    if (!patient) {
      throw new Error("Patient not found");
    }

    await prisma.patient.delete({
      where: {
        id: patientId,
      },
    });
    // console.log("patient deleted");
    return { message: `Patient with ID ${patientId} deleted successfully.` };
  } catch (error) {
    console.log(error);
    throw error;
  } finally {
    await prisma.$disconnect();
  }
}
// Function to update a patient by ID
export async function updatePatient(
  patientId: number,
  updates: Partial<{ name: string; gender: string; age: number }>
) {
  return prisma.patient.update({
    where: {
      id: patientId,
    },
    data: updates,
  });
}

export async function getPatientsWithLastVisit() {
  try {
    const patients = await prisma.patient.findMany({
      select: {
        id: true,
        name: true,
        age: true,
        gender: true,
        visits: {
          select: {
            date: true,
          },
          orderBy: {
            date: "desc",
          },
          take: 1,
        },
      },
    });
    return patients;
  } catch (error) {
    throw error;
  } finally {
    await prisma.$disconnect();
  }
}

// export async function getAllPatientsWithDetails() {
//   try {
//     const patients = await prisma.patient.findMany({
//       include: {
//         details: true,
//         prescriptions: true,
//       },
//       orderBy: {
//         id: "asc", // 'asc' for ascending order, 'desc' for descending
//       },
//     });
//     return patients;
//   } catch (error) {
//     console.error("Error fetching patients:", error);
//     throw error;
//   } finally {
//     await prisma.$disconnect();
//   }
// }
export async function getUniquePatientWithDetails(patientId: number) {
  try {
    const patient = await prisma.patient.findUnique({
      where: {
        id: patientId,
      },
      include: {
        visits: {
          include: {
            patientDetails: true,
            prescriptions: true,
          },
        },
      },
    });
    // console.log(patient);
    // console.log(patient);
    return patient;
  } catch (error) {
    console.error("Error fetching patient:", error);
    throw error;
  } finally {
    await prisma.$disconnect();
  }
}

export async function addPrescription(
  visitIdProp: number,
  prescriptionText: string
) {
  try {
    // this is the right one -> const temp = parse(date, "hh:mm:ss a dd/MM/yyyy", new Date());
    const prescription = await prisma.prescriptions.create({
      data: {
        prescription: prescriptionText,
        visitId: visitIdProp,
      },
    });
    // console.log("Prescription added:", prescription);
    return prescription;
  } catch (error) {
    console.error("Error adding prescription:", error);
    throw error;
  } finally {
    await prisma.$disconnect();
  }
}

export async function deletePrescription(prescriptionId: number) {
  try {
    const prescription = await prisma.prescriptions.delete({
      where: {
        id: prescriptionId,
      },
    });
    // console.log("Prescription added:", prescription);
    return prescription;
  } catch (error) {
    console.error("Error Deleting prescription:", error);
    throw error;
  } finally {
    await prisma.$disconnect();
  }
}

// export async function getPrescriptionsByPatientAndDate(
//   patientId: number,
//   date: Date
// ) {
//   try {
//     const prescriptions = await prisma.prescriptions.findMany({
//       where: {
//         patientId: patientId,
//         date: date,
//       },
//       orderBy: {
//         id: "asc", // 'asc' for ascending order, 'desc' for descending
//       },
//       select: {
//         prescription: true,
//       },
//     });
//     const prescriptionStrings = prescriptions.map(
//       (prescription) => prescription.prescription
//     );

//     return prescriptionStrings;
//   } catch (error) {
//     throw error;
//   } finally {
//     await prisma.$disconnect();
//   }
// }

export async function getAllPrescriptions() {
  try {
    const prescriptions = await prisma.prescriptions.findMany({
      orderBy: {
        id: "asc", // 'asc' for ascending order, 'desc' for descending
      },
      select: {
        prescription: true,
      },
    });

    // Use a Set to store unique prescription strings
    const uniquePrescriptionSet = new Set();

    prescriptions.forEach((prescription) => {
      uniquePrescriptionSet.add(prescription.prescription);
    });
    // Convert the Set back to an array
    const prescriptionStrings = Array.from(uniquePrescriptionSet);

    return prescriptionStrings;
  } catch (error) {
    throw error;
  } finally {
    await prisma.$disconnect();
  }
}

export async function addNewVisit(patientId: number, dateString: string) {
  try {
    const newVisit = await prisma.visit.create({
      data: {
        date: parse(dateString, "hh:mm:ss a dd/MM/yyyy", new Date()),
        patient: {
          connect: {
            id: patientId,
          },
        },
      },
    });
    // console.log("New visit added:", newVisit);
    return newVisit;
  } catch (error) {
    console.error("Error adding new visit:", error);
    throw error;
  }
}

export async function addPatientDetail(
  detailHeadingArg: string,
  detailArg: string,
  visitIdArg: number
) {
  try {
    console.log(detailHeadingArg, detailArg, visitIdArg);
    const patientDetail = await prisma.patientDetails.create({
      data: {
        detailHeading: detailHeadingArg,
        details: detailArg,
        visitId: visitIdArg,
      },
    });
    // console.log("New visit added:", newVisit);
    return patientDetail;
  } catch (error) {
    console.error("Error adding new visit:", error);
    throw error;
  }
}

export async function setOrderedDetails(
  details: PatientDetails[],
  visitIdArg: number
) {
  try {
    const patientDetails = await prisma.patientDetails.create({
      data: {
        detailHeading: detailHeadingArg,
        details: detailArg,
        visitId: visitIdArg,
      },
    });
    // console.log("New visit added:", newVisit);
    return patientDetail;
  } catch (error) {
    console.error("Error adding new visit:", error);
    throw error;
  }
}
