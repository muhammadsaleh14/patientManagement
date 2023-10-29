import { NextResponse } from "next/server";
import { getAllPrescriptions } from "../../util/patients";

export async function GET() {
  try {
    const prescriptions = await getAllPrescriptions();
    return NextResponse.json(prescriptions, { status: 200 });
  } catch (error) {
    return new NextResponse("Error occured", {
      status: 500, // Internal Server Error
    });
  }
}

export const dynamic = "force-dynamic";
