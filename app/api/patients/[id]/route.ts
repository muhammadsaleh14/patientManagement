import { NextRequest, NextResponse } from "next/server";
import {
  deletePatient,
  getUniquePatientWithDetails,
} from "../../util/patients";
// import { error } from "console";

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const patientId = params.id;

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
  { params }: { params: { id: string } }
) {
  try {
    const patient = await getUniquePatientWithDetails(params.id);

    return NextResponse.json(patient, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}

export const dynamic = "force-dynamic";
