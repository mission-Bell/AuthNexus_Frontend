import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  let isSuccess = false;
  if (req) {
    isSuccess = true;
  }
  return NextResponse.json({ isSuccess: isSuccess }, { status: 200 });
}
