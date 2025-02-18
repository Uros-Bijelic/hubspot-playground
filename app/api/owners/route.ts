import { axios } from '@/api/axios.config';
import { NextResponse } from 'next/server';

export const GET = async () => {
  try {
    const response = await axios.get(`/owners`);

    return NextResponse.json(response.data, { status: 200 });
  } catch (error) {
    if (error instanceof Error) {
      console.log('Error fetching owners', error.message);

      // for now i till figure out error handling for hubspot
      return NextResponse.json(error.message, { status: 500 });
    }
  }
};
