import { NextResponse } from "next/server";

const data = {
  x: 100,
  y: 100,
};

export async function GET() {
  return NextResponse.json(data, { status: 200 });
}
