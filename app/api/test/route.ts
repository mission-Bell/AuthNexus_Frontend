import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  console.log(req);
  return NextResponse.json({ message: "Hello from next.js" }, { status: 200 });
}
