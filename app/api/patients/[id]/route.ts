import { NextRequest, NextResponse } from "next/server";
import { deletePatient } from "../../util/patients";

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
