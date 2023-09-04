import { NextRequest, NextResponse } from "next/server";

export function middleware(request: NextRequest) {
  const url = request.url;

  // console.log(request.headers);
  // return NextResponse.next("hello")
}
