import prisma from "@/app/api/util/db";
import { NextRequest, NextResponse } from "next/server";
import { getPatientsWithLastVisit } from "@/app/api/util/patients";

export async function GET(request: NextRequest) {
  let a = NextResponse.json(await getPatientsWithLastVisit());
  return a;
}
