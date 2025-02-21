import { axios } from '@/api/axios.config';
import { NextRequest, NextResponse } from 'next/server';

export const GET = async (req: NextRequest, { params }: { params: Promise<{ id: string }> }) => {
  try {
    const contactId = (await params).id;

    if (!contactId) {
      throw new Error('Contact ID not found.');
    }

    const response = await axios.get(
      `/objects/contacts/${contactId}?properties=firstname,lastname,email,jobtitle,phone,country,city,company`,
    );

    console.log('response DATA u ROUTE', response.data);

    return NextResponse.json(response.data, { status: 200 });
  } catch (error) {
    if (error instanceof Error) {
      return NextResponse.json({ message: error.message || 'An unexpected error occurred' });
    }
  }
};

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
