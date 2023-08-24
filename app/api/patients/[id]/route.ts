import { NextRequest, NextResponse } from "next/server";
import {
  deletePatient,
  getUniquePatientWithDetails,
} from "../../util/patients";
import { error } from "console";

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    let patientId = parseInt(params.id);
    return NextResponse.json(
      { message: await deletePatient(patientId) },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string; add: boolean } }
) {
  try {
    // console.log(request);
    console.log(request.url);
    let patient = await getUniquePatientWithDetails(parseInt(params.id));
    // console.log(patient);
    return NextResponse.json({ patient }, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
