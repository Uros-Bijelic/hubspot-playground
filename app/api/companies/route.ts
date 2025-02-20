import { axios } from '@/api/axios.config';
import { NextResponse } from 'next/server';

export const GET = async () => {
  try {
    const API_KEY = process.env.HUBSPOT_API_KEY || '';
    const response = await axios('/objects/companies', {
      headers: {
        Authorization: `Bearer ${API_KEY}`,
      },
    });

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
};
