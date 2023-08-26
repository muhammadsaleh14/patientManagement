import { NextRequest, NextResponse } from "next/server";
import {
  addPrescription,
  getPrescriptionsByPatientAndDate,
} from "../../../util/patients";
import format from "date-fns/format";
import prisma from "@/app/api/util/db";

export async function POST(request: NextRequest) {
  try {
    const { patientId, date, prescription } = await request.json();
    console.log(patientId, typeof patientId);
    console.log(date, typeof date);
    console.log(prescription, typeof prescription);

    //   console.log(NextResponse.json(createPatient(name, parseInt(age), gender)));
    let prescriptionCreated = await addPrescription(
      patientId,
      date,
      prescription
    );
    return NextResponse.json({ prescriptionCreated }, { status: 200 });
  } catch (error) {
    console.log("in catch");
    return new NextResponse("Error adding prescription", {
      status: 500, // Internal Server Error
      headers: {
        "Content-Type": "text/plain",
      },
    });
  }
}

//Get prescriptions for a single patient
export async function GET(request: NextRequest) {
  try {
    const url = new URL(request.url);
    const params = new URLSearchParams(url.search);
    const dateParam = params.get("date");
    const idParam = params.get("id");

    if (!idParam) {
      console.error("Missing 'id' parameter");
    } else if (!dateParam) {
      console.error("Missing 'date' parameter");
    } else {
      const patientId = parseInt(idParam);
      const date = new Date(dateParam);
      // const formattedDate = format(date, "hh:mm:ss a dd/MM/yyyy");
      console.log("patientId: " + patientId);
      console.log("date: " + date);

      const prescriptions = await getPrescriptionsByPatientAndDate(
        patientId,
        date
      );
      // .then((prescriptions) => {
      // console.log("Prescriptions:", prescriptions);
      return NextResponse.json(prescriptions, { status: 200 });
      // })
      // catch((error) => {
      //   return NextResponse.json({ error }, { status: 500 });
      // })
      // .finally(async () => {
      //   await prisma.$disconnect();
      // });
    }
  } catch (error) {
    // console.log("in catch");
    return new NextResponse("Error occured", {
      status: 500, // Internal Server Error
    });
  }
}
