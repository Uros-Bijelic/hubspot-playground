import { axios } from '@/api/axios.config';
import { NextRequest, NextResponse } from 'next/server';

export const GET = async (req: NextRequest, { params }: { params: Promise<{ id: string }> }) => {
  const id = (await params).id;

  try {
    const response = await axios.get(`/owners/${id}`);
    console.log('response', response.data);

    return NextResponse.json(response.data, { status: 200 });
  } catch (error) {
    console.log('Error FETCCHING SPECIFIC USER', error);
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
