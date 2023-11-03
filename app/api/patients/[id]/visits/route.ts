import { addNewVisit } from "@/app/api/util/patients";
import { NextRequest, NextResponse } from "next/server";

export async function POST(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const patientId = params.id;
    const { visitDate }: { visitDate: string } = await request.json();

    const newVisit = await addNewVisit(patientId, visitDate);

    return NextResponse.json(newVisit, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}

export const dynamic = "force-dynamic";
