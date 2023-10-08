import prisma from "@/app/api/util/db";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  const { name, profession } = await request.json();

  try {
    const doctor = await prisma.doctor.create({
      data: {
        name,
        profession,
      },
    });
    return NextResponse.json(doctor);
  } catch (error) {
    console.error(error);
    return NextResponse.json({
      error: "An error occurred while creating the doctor.",
    });
  }
}
