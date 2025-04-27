import { NextResponse } from "next/server";
import { product } from "@/data/product";

export async function GET() {
  await new Promise((resolve) => setTimeout(resolve, 500));

  return NextResponse.json({ product });
}
