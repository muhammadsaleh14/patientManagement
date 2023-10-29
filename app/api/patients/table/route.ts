// import prisma from "@/app/api/util/db";
import { NextResponse } from "next/server";
import { getPatientsWithLastVisit } from "@/app/api/util/patients";

export async function GET() {
  const a = NextResponse.json(await getPatientsWithLastVisit());
  return a;
}
export const dynamic = "force-dynamic";
