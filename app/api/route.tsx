import { NextRequest, NextResponse } from "next/server";
import { createPatient, deletePatient } from "./util/patients";

export async function GET(NextRequest: Request) {
  return new Response("Hello, Next.js!", {
    status: 200,
  });
}
export async function DELETE() {
  // const { name, age, gender } = request;
  // return NextResponse.json(await deletePatient(name, parseInt(age), gender));
}
