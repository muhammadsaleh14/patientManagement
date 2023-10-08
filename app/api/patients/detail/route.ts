import { addPatientDetail, updateDetail } from "@/app/api/util/patients";
import { NextRequest, NextResponse } from "next/server";
export async function PUT(request: NextRequest) {
  try {
    const { detailId, detailHeading, detailText } = await request.json();

    const detail = await updateDetail(detailId, detailHeading, detailText);
    return NextResponse.json(detail, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: error }, { status: 500 });
  }
}
export async function POST(request: NextRequest) {
  try {
    const { detailHeading, detail, visitId } = await request.json();
    const newPatientDetail = await addPatientDetail(
      detailHeading,
      detail,
      visitId
    );
    return NextResponse.json(newPatientDetail, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: error }, { status: 500 });
  }
}
