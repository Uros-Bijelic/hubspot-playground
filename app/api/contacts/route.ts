import { axios } from '@/api/axios.config';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
  const limit = req.nextUrl.searchParams.get('limit');
  const archived = req.nextUrl.searchParams.get('archived');
  const urlToFetch = req.nextUrl.searchParams.get('urlToFetch');

  const url = urlToFetch ? urlToFetch : `/objects/contacts?limit=${limit}&archived=${archived}`;

  try {
    const response = await axios.get(url);

    return NextResponse.json(response.data, { status: 200 });
  } catch (error) {
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
