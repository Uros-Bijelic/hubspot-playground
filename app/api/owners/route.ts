import { NextResponse } from 'next/server';

export const GET = async () => {
  try {
    const BASE_URL = process.env.HUBSPOT_API_KEY;
    const API_KEY = process.env.HUBSPOT_API_KEY || '';
    const response = await fetch(`${BASE_URL}/owners`, {
      headers: {
        Authorization: `Bearer ${API_KEY}`,
        'Content-Type': 'application/json',
      },
    });

    const data = await response.json();

    return NextResponse.json(data, { status: 200 });
  } catch (error) {
    if (error instanceof Error) {
      console.log('Error fetching owners', error.message);

      return NextResponse.json(error.message);
    }
  }
};
