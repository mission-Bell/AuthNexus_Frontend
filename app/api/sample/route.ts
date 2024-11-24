import { NextRequest, NextResponse } from "next/server";

export function GET() {
  return NextResponse.json({ data: "data" });
}

export function POST(req: NextRequest) {
  console.log(req.body);
  return NextResponse.json({ data: "data" });
}
