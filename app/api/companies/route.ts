import { NextResponse } from 'next/server';

export const GET = async () => {
  try {
    const BASE_URL = process.env.HUBSPOT_BASE_URL || '';
    const API_KEY = process.env.HUBSPOT_API_KEY || '';

    const response = await fetch(`${BASE_URL}/objects/companies`, {
      headers: {
        Authorization: `Bearer ${API_KEY}`,
        'Content-Type': 'application/json',
      },
    });

    const data = await response.json();

    return NextResponse.json(data, { status: 200 });
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
};
