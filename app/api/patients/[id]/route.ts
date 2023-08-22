import { NextRequest, NextResponse } from "next/server";
import {
  deletePatient,
  getUniquePatientWithDetails,
} from "../../util/patients";

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
    return new NextResponse(null, { status: 500 });
  }
}

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    // console.log(request);
    let patient = await getUniquePatientWithDetails(parseInt(params.id));
    // console.log(patient);
    return NextResponse.json({ patient }, { status: 201 });
  } catch (error) {
    throw error;
  }
}
