import prisma from "@/app/api/util/db";
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

    return { message: "Patient Created" };
  } catch (error) {
    throw error;
  } finally {
    await prisma.$disconnect();
  }
}

// Function to delete a patient by ID

export async function deletePatient(id: number) {
  try {
    const patient = await prisma.patient.findUnique({
      where: {
        id: id,
      },
    });

    if (!patient) {
      throw new Error("Patient not found");
    }

    await prisma.patient.delete({
      where: {
        id: id,
      },
    });
    console.log("patient deleted");
    return { message: `Patient with ID ${id} deleted successfully.` };
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
import { format } from "date-fns"; // Import the format function from date-fns

export async function getPatientsWithLastVisit() {
  try {
    const pa = await prisma.patient.findMany({
      include: {
        details: {
          select: {
            details: true,
            detailHeading: true,
            date: true,
          },
          orderBy: {
            date: "desc", // This should now work as it refers to PatientDetails.date
          },
          take: 1,
        },
      },
    });

    // Destructure the result and format the date
    const formattedPatients = pa.map((patient) => ({
      ...patient,
      details: patient.details.map((detail) => ({
        ...detail,
        date: detail.date
          ? format(new Date(detail.date), "HH:mm:ss dd/MM/yyyy")
          : null,
      })),
    }));
    return formattedPatients;
  } catch (error) {
    throw error;
  } finally {
    await prisma.$disconnect();
  }
}

export async function getAllPatientsWithDetails() {
  try {
    const patients = await prisma.patient.findMany({
      include: {
        details: true,
      },
    });
    return patients;
  } catch (error) {
    console.error("Error fetching patients:", error);
    throw error;
  } finally {
    await prisma.$disconnect();
  }
}
export async function getUniquePatientWithDetails(patientId: number) {
  try {
    const patient = await prisma.patient.findUnique({
      where: {
        id: patientId,
      },
      include: {
        details: true,
      },
    });
    // console.log(patient);
    return patient;
  } catch (error) {
    console.error("Error fetching patient:", error);
    throw error;
  } finally {
    await prisma.$disconnect();
  }
}
