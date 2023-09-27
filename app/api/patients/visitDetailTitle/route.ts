import { NextRequest, NextResponse } from "next/server";
import {
  addVisitDetailTitle,
  getAllVisitDetailTitles,
} from "../../util/patients";

export async function GET() {
  try {
    const visitDetailTitles = await getAllVisitDetailTitles();
    return NextResponse.json(visitDetailTitles, { status: 200 });
  } catch (error) {
    return new NextResponse("Error occured", {
      status: 500, // Internal Server Error
    });
  }
}

export async function POST(request: NextRequest) {
  try {
    const { newVisitDetailTitle } = await request.json();
    let newVisitDetailTitleResponse = await addVisitDetailTitle(
      newVisitDetailTitle
    );
    return NextResponse.json(newVisitDetailTitleResponse, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: error }, { status: 500 });
  }
}
