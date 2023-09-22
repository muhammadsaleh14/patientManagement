import { NextRequest, NextResponse } from "next/server";

export function middleware(request: NextRequest) {
  const url = request.url;

  // return NextResponse.next("hello")
}
