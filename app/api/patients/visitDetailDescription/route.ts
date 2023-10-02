import { NextRequest, NextResponse } from "next/server";
import { updateVisitDetails } from "../../util/patients";

export async function PUT(request: NextRequest) {
  try {
    const { visitDetails } = await request.json();
    let newVisitDetailTitleResponse = await updateVisitDetails(visitDetails);
    return NextResponse.json(newVisitDetailTitleResponse, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: error }, { status: 500 });
  }
}
