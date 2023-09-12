import { addPatientDetail } from "@/app/api/util/patients";
import { NextRequest, NextResponse } from "next/server";
export async function POST(request: NextRequest) {
  try {
    const { orderedDetails, visitId } = await request.json();
    let details = await setOrderedDetails(orderedDetails, visitId);
    return NextResponse.json(details, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: error }, { status: 500 });
  }
}
