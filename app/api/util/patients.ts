import { Detail } from "@/app/GlobalRedux/store/detailSlice";
import prisma from "@/app/api/util/db";
import { PatientDetails } from "@/components/interfaces/databaseInterfaces";
import { Patient } from "@prisma/client";
import { format, parse } from "date-fns"; // Import the format function from date-fns
import { da } from "date-fns/locale";

// import { format } from 'date-fns';
// Function to create a new patient

function formatDateString(date: string) {
  const parsedDate = parse(date, "yyyy-MM-dd'T'HH:mm:ss.SSSXXX", new Date());
  // Format the parsed date into the desired format
  const formattedDate = format(parsedDate, "hh:mm:ss a dd/MM/yyyy");
  return formattedDate;
}

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

    return { message: `Patient with ID ${patientId} deleted successfully.` };
  } catch (error) {
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

    const formattedPatients: Patient[] = patients.map((patient) => {
      const formattedVisits = patient.visits.map((visit) => ({
        ...visit,
        date: formatDateString(visit.date.toISOString()), // Format the date using your formatting function
      }));
      return {
        ...patient,
        visits: formattedVisits,
      };
    });

    return formattedPatients;
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
            visitDetails: {
              select: {
                id: true,
                description: true,
                visitDetailTitle: {
                  select: {
                    title: true,
                  },
                },
              },
            },
          },
        },
      },
    });

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
      select: {
        id: true,
        prescription: true,
      },
    });

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
    const selectedDetails = await getUniquePatientDetails(patientId);
    const newVisit = await prisma.visit.create({
      include: {
        patientDetails: true, // Include patientDetails in the returned object
        prescriptions: true, // Include prescriptions in the returned object
        visitDetails: true,
      },
      data: {
        date: parse(dateString, "hh:mm:ss a dd/MM/yyyy", new Date()),
        patient: {
          connect: {
            id: patientId,
          },
        },
        patientDetails: {
          create: selectedDetails.map((detail) => ({
            detailHeading: detail.heading,
            details: detail.detail,
          })),
        },
      },
    });
    // console.log(newVisit);

    return newVisit;
  } catch (error) {
    console.error("Error adding new visit:", error);
    throw error;
  } finally {
    await prisma.$disconnect();
  }
}

interface SelectedDetail {
  heading: string;
  detail: string;
}
async function getUniquePatientDetails(
  patientId: number
): Promise<SelectedDetail[]> {
  const patient = await prisma.patient.findUnique({
    where: {
      id: patientId,
    },
    include: {
      visits: {
        orderBy: {
          date: "asc", // Order visits by date in ascending order
        },
        include: {
          patientDetails: {
            select: {
              id: true,
              details: true,
              detailHeading: true,
            },
          },
        },
      },
    },
  });

  if (!patient) {
    console.log("Patient not found");
    return [];
  }

  const selectedHeadings: Set<string> = new Set();
  const selectedDetails: SelectedDetail[] = [];

  for (const visit of patient.visits) {
    // console.log(`Visit Date: ${visit.date}`);
    for (const detail of visit.patientDetails) {
      if (!selectedHeadings.has(detail.detailHeading)) {
        selectedHeadings.add(detail.detailHeading);
        selectedDetails.push({
          heading: detail.detailHeading,
          detail: detail.details,
        });
      }
    }
  }

  await prisma.$disconnect();

  return selectedDetails;
}

export async function addPatientDetail(
  detailHeadingArg: string,
  detailArg: string,
  visitIdArg: number
) {
  try {
    const patientDetail = await prisma.patientDetails.create({
      data: {
        detailHeading: detailHeadingArg,
        details: detailArg,
        visitId: visitIdArg,
      },
      select: {
        id: true,
        detailHeading: true,
        details: true,
      },
    });

    return patientDetail;
  } catch (error) {
    console.error("Error adding new visit:", error);
    throw error;
  } finally {
    await prisma.$disconnect();
  }
}

export async function updateDetail(
  detailId: PatientDetails["id"],
  detailHeadingProp: PatientDetails["detailHeading"],
  detailText: PatientDetails["details"]
) {
  try {
    // Find the patient by ID
    const existingDetail = await prisma.patientDetails.findUnique({
      where: { id: detailId },
    });

    if (!existingDetail) {
      throw new Error(`Patient Detail with ID ${detailId} not found.`);
    }

    // Update patient detail
    const updatedPatientDetail = await prisma.patientDetails.update({
      where: { id: detailId },
      data: {
        detailHeading: detailHeadingProp,
        details: detailText,
      },
      select: {
        detailHeading: true,
        details: true,
      },
    });

    return updatedPatientDetail;
  } catch (error) {
    console.error("Error adding new visit:", error);
    throw error;
  } finally {
    await prisma.$disconnect();
  }
}

export async function deleteDetail(detail_Id: number) {
  try {
    const detail = await prisma.patientDetails.findUnique({
      where: {
        id: detail_Id,
      },
    });

    if (!detail) {
      throw new Error("Detail not found");
    }

    await prisma.patientDetails.delete({
      where: {
        id: detail.id,
      },
    });

    return detail.id;
  } catch (error) {
    throw error;
  } finally {
    await prisma.$disconnect();
  }
}
interface VisitDetail {
  id: number;
  title: string;
  description: string;
}
export async function getVisitDetailDescriptions(visitIdArg: number) {
  const visitDetails = await prisma.$queryRaw`
  SELECT vd.id, vd.description, vt.title
  FROM VisitDetailsDescription AS vd
  INNER JOIN VisitDetailTitle AS vt ON vd.titleId = vt.id
  WHERE vd.visitId = ${visitIdArg}`;

  return visitDetails as VisitDetail[];
}

// export async function setOrderedDetails(
//   details: PatientDetails[],
//   visitIdArg: number
// ) {
//   try {
//     const patientDetails = await prisma.patientDetails.create({
//       data: {
//         detailHeading: detailHeadingArg,
//         details: detailArg,
//         visitId: visitIdArg,
//       },
//     });

//     return patientDetail;
//   } catch (error) {
//     console.error("Error adding new visit:", error);
//     throw error;
//   }
// }
