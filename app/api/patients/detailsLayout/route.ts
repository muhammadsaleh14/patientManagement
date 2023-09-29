import { NextRequest, NextResponse } from "next/server";
import {
  getDetailsLayout,
  updateDetailsLayout,
} from "../../util/detailsLayout";

export async function GET() {
  try {
    const detailsLayout = await getDetailsLayout();
    return NextResponse.json(detailsLayout, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: error }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const { detailsLayoutString } = await request.json();
    let newDetailsLayout = await updateDetailsLayout(detailsLayoutString);
    return NextResponse.json(newDetailsLayout, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: error }, { status: 500 });
  }
}
