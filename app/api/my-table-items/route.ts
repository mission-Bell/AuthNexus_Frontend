import { NextResponse } from "next/server";

interface TableItem {
  name: string;
  age: number;
  description: string;
}

const data: TableItem[] = [
  {
    name: "John",
    age: 20,
    description: "he is John",
  },
];

export async function GET() {
  return NextResponse.json(data, { status: 200 });
}
