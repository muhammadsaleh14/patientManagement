import { deleteVisitDetailTitle } from "@/app/api/util/patients";
import { NextRequest, NextResponse } from "next/server";

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const visitDetailTitleId = parseInt(params.id);
    const isDeleted = await deleteVisitDetailTitle(visitDetailTitleId);

    return NextResponse.json(isDeleted, { status: 200 });
  } catch (error: unknown) {
    if (error instanceof Error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }
  }
}

export const dynamic = "force-dynamic";
