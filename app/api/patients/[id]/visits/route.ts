import { addNewVisit } from "@/app/api/util/patients";
import { NextRequest, NextResponse } from "next/server";

export async function POST(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const patientId = parseInt(params.id);
    const { visitDate }: { visitDate: string } = await request.json();

    // console.log("patientID:" + patientId + " date:" + visitDate);

    let newVisit = await addNewVisit(patientId, visitDate);
    // console.log(patient);
    return NextResponse.json(newVisit, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
