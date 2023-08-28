import { addNewVisit } from "@/app/api/util/patients";
import { NextRequest, NextResponse } from "next/server";

export async function POST(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const patientId = parseInt(params.id);
    const { date }: { date: string } = await request.json();

    console.log(patientId + date);
    let newVisit = await addNewVisit(patientId, date);
    // console.log(patient);
    return NextResponse.json(newVisit, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
