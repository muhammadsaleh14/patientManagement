import { deleteDetail } from "@/app/api/util/patients";
import { NextRequest, NextResponse } from "next/server";

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    let patientId = parseInt(params.id);

    return NextResponse.json(
      { detailId: await deleteDetail(patientId) },
      { status: 201 }
    );
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
