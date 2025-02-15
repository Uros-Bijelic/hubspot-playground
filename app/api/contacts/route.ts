import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const BASE_URL = process.env.HUBSPOT_BASE_URL || "";

  const response = await fetch(
    `${BASE_URL}/contacts?${req.nextUrl.searchParams.toString()}`,
    {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.NEXT_PUBLIC_HUBSPOT_API_KEY}`,
      },
    }
  );

  const data = await response.json();

  return NextResponse.json({ ...data.results });
}
