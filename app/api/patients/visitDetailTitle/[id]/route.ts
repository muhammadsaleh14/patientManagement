import { deleteVisitDetailTitle } from "@/app/api/util/patients";
import { NextRequest, NextResponse } from "next/server";

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const visitDetailTitleId = parseInt(params.id);
    let isDeleted = await deleteVisitDetailTitle(visitDetailTitleId);

    return NextResponse.json(isDeleted, { status: 200 });
  } catch (error: any) {
    return new NextResponse(error, {
      status: 500, // Internal Server Error
    });
  }
}
