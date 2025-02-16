import { axios } from '@/api';
import { NextRequest, NextResponse } from 'next/server';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export async function GET(req: NextRequest) {
  try {
    const response = await axios.get(`owners`);

    console.log('response u GET ruti', response);

    return NextResponse.json(response.data, { status: 200 });
  } catch (error) {
    if (error instanceof Error) {
      console.log('Error fetching owners', error.message);

      // for now i till figure out error handling for hubspot
      return NextResponse.json(error.message, { status: 500 });
    }
  }
}
