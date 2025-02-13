import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  // console.log(
  //   "request NextRequest TO STRING",
  //   req.nextUrl.searchParams.toString()
  // );

  const response = await fetch(
    `https://api.hubapi.com/crm/v3/objects/contacts?${req.nextUrl.searchParams.toString()}`,
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
