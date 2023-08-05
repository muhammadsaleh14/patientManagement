import prisma from "@/app/api/db"; // Update the path to prisma.ts as per your project structure
import { error } from "console";
import { NextApiRequest, NextApiResponse } from "next";

export async function GET(request: NextApiRequest, response: NextApiResponse) {
  response.status(200);
}

export async function POST(request: NextApiRequest, response: NextApiResponse) {
  console.log("creating doctor");
  const { name, profession } = request.body;
  try {
    const doctor = await prisma.doctor.create({
      data: {
        name,
        profession,
      },
    });
    response.status(201).json(doctor);
  } catch (error) {
    response.status(500).json({ error: "Error creating doctor" });
  }
}
