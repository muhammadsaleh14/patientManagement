import prisma from "@/app/api/util/db";
import { NextRequest, NextResponse } from "next/server";
import { createPatient } from "../util/patients";

// export async function GET() {
//   try {
//     const patients = getAllPatientsWithDetails();
//     return NextResponse.json({ patients }, { status: 200 });
//   } catch (error) {
//     return new NextResponse("Error fetching patients", {
//       status: 500, // Internal Server Error
//       headers: {
//         "Content-Type": "text/plain",
//       },
//     });
//   }
// }

export async function POST(request: NextRequest) {
  try {
    const { name, age, gender } = await request.json();

    return NextResponse.json(await createPatient(name, parseInt(age), gender));
  } catch (error) {
    return new NextResponse("Error Creating patient", {
      status: 500, // Internal Server Error
      headers: {
        "Content-Type": "text/plain",
      },
    });
  }
}
