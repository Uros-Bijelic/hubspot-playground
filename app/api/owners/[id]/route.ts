import { axios } from '@/api/axios.config';
import { NextRequest, NextResponse } from 'next/server';

export const GET = async (req: NextRequest, { params }: { params: Promise<{ id: string }> }) => {
  try {
    const API_KEY = process.env.HUBSPOT_API_KEY || '';
    const id = (await params).id;
    const response = await axios.get(`/owners/${id}`, {
      headers: {
        Authorization: `Bearer ${API_KEY}`,
      },
    });

    return NextResponse.json(response.data, { status: 200 });
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

  return NextResponse.json({ data: 'radi ruta' });
};
