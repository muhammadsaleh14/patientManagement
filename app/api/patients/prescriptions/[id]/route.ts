import { NextRequest, NextResponse } from "next/server";
import { addPrescription, deletePrescription } from "../../../util/patients";
import format from "date-fns/format";
import prisma from "@/app/api/util/db";

export async function POST(request: NextRequest) {
  try {
    const { visitId, prescription } = await request.json();

    let prescriptionCreated = await addPrescription(visitId, prescription);

    return NextResponse.json(prescriptionCreated, { status: 200 });
  } catch (error) {
    return new NextResponse("Error adding prescription", {
      status: 500, // Internal Server Error
      headers: {
        "Content-Type": "text/plain",
      },
    });
  }
}

//Get prescriptions for a single patient
// export async function GET(request: NextRequest) {
//   try {
//     const url = new URL(request.url);
//     const params = new URLSearchParams(url.search);
//     const dateParam = params.get("date");
//     const idParam = params.get("id");

//     if (!idParam) {
//       console.error("Missing 'id' parameter");
//     } else if (!dateParam) {
//       console.error("Missing 'date' parameter");
//     } else {
//       const patientId = parseInt(idParam);
//       const date = new Date(dateParam);
//       // const formattedDate = format(date, "hh:mm:ss a dd/MM/yyyy");

//       const prescriptions = await getPrescriptionsByPatientAndDate(
//         patientId,
//         date
//       );
//       // .then((prescriptions) => {

//       return NextResponse.json(prescriptions, { status: 200 });
//       // })
//       // catch((error) => {
//       //   return NextResponse.json({ error }, { status: 500 });
//       // })
//       // .finally(async () => {
//       //   await prisma.$disconnect();
//       // });
//     }
//   } catch (error) {

//     return new NextResponse("Error occured", {
//       status: 500, // Internal Server Error
//     });
//   }
// }
export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const prescriptionId = parseInt(params.id);
    let deletedPrescription = await deletePrescription(prescriptionId);

    return NextResponse.json(deletedPrescription, { status: 200 });
  } catch (error) {
    return new NextResponse("Error deleting prescription", {
      status: 500, // Internal Server Error
      headers: {
        "Content-Type": "text/plain",
      },
    });
  }
}
