import { addPatientDetail } from "@/app/api/util/patients";
import { NextRequest, NextResponse } from "next/server";
export async function POST(request: NextRequest) {
  try {
    const { detailHeading, detail, visitId } = await request.json();
    let newPatientDetail = await addPatientDetail(
      detailHeading,
      detail,
      visitId
    );
    return NextResponse.json(newPatientDetail, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: error }, { status: 500 });
  }
}
