import { NextRequest, NextResponse } from 'next/server';

export const GET = async (req: NextRequest, { params }: { params: Promise<{ id: string }> }) => {
  try {
    const BASE_URL = process.env.HUBSPOT_BASE_URL || '';
    const API_KEY = process.env.HUBSPOT_API_KEY || '';
    const id = (await params).id;

    const response = await fetch(`${BASE_URL}/owners/${id}`, {
      headers: {
        Authorization: `Bearer ${API_KEY}`,
        'Content-Type': 'application/json',
      },
    });

    const data = await response.json();

    return NextResponse.json(data, { status: 200 });
  } catch (error) {
    console.log('Error fetching specific user', error);
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
