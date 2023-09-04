import prisma from "@/app/api/util/db";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  // console.log("hello");
  // NextResponse.json({ name: "hello" });
}

export async function POST(request: NextRequest) {
  // console.log("creating doctor");

  const { name, profession } = await request.json();
  console.log(name + " " + profession);

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
