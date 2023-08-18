import prisma from "@/app/api/util/db";
import { NextRequest, NextResponse } from "next/server";
import { createPatient } from "../util/patients";

export async function GET(request: NextRequest) {}

export async function POST(request: NextRequest) {
  try {
    const { name, age, gender } = await request.json();
    //   console.log(NextResponse.json(createPatient(name, parseInt(age), gender)));
    return NextResponse.json(await createPatient(name, parseInt(age), gender));
  } catch (error) {
    console.log("in catch");
    return new NextResponse("Error Creating patient", {
      status: 500, // Internal Server Error
      headers: {
        "Content-Type": "text/plain",
      },
    });
  }
}
