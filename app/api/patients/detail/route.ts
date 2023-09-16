import { addPatientDetail, updateDetail } from "@/app/api/util/patients";
import { NextRequest, NextResponse } from "next/server";
export async function PUT(request: NextRequest) {
  try {
    const { detailId, detailHeading, detailText } = await request.json();
    // //console.log("API: updating patient");
    let detail = await updateDetail(detailId, detailHeading, detailText);
    return NextResponse.json(detail, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: error }, { status: 500 });
  }
}
