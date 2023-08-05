import prisma from "@/app/api/db";
// Function to create a new patient
export async function createPatient(name: string, gender: string, age: number) {
  return prisma.patient.create({
    data: {
      name,
      gender,
      age,
    },
  });
}

// Function to delete a patient by ID
export async function deletePatient(patientId: number) {
  return prisma.patient.delete({
    where: {
      id: patientId,
    },
  });
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
