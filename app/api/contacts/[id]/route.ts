import { axios } from '@/api/axios.config';
import { NextRequest, NextResponse } from 'next/server';

export const DELETE = async (req: NextRequest, { params }: { params: Promise<{ id: string }> }) => {
  try {
    const contactId = (await params).id;

    if (!contactId) {
      throw new Error('Contact ID not found.');
    }

    const response = await axios.delete(`/objects/contacts/${contactId}`);

    return NextResponse.json(response.data, { status: 200 });
  } catch (error) {
    if (error instanceof Error) {
      return NextResponse.json({ message: error.message || 'An unexpected error occurred' });
    }
  }
};
