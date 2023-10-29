import { deleteDetail } from "@/app/api/util/patients";
import { NextRequest, NextResponse } from "next/server";

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const patientId = parseInt(params.id);

    return NextResponse.json(
      { detailId: await deleteDetail(patientId) },
      { status: 201 }
    );
  } catch (error: unknown) {
    if (error instanceof Error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }
  }
}
export const dynamic = "force-dynamic";
