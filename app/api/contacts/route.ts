import { axios } from '@/api';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
  const BASE_URL = process.env.HUBSPOT_BASE_URL || '';

  console.log(
    '`${BASE_URL}/contacts?${req.nextUrl.searchParams.toString()}`',
    `${BASE_URL}/contacts?${req.nextUrl.searchParams.toString()}`,
  );

  try {
    const response = await axios.get(`${BASE_URL}/contacts?${req.nextUrl.searchParams.toString()}`);

    return NextResponse.json(response.data, { status: 200 });
  } catch (error) {
    if (error instanceof TypeError) {
      return NextResponse.json(
        {
          message: 'Invalid data',
        },
        { status: 400 },
      );
    }

    if (error instanceof Error) {
      return NextResponse.json(
        {
          message: error.message || 'An unexpected error occurred',
        },
        { status: 500 },
      );
    }
  }
}
