import { axios } from '@/api/axios.config';
import { BaseUserSchema } from '@/components/features/contacts/create-update-contact-form';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
  const limit = req.nextUrl.searchParams.get('limit');
  const archived = req.nextUrl.searchParams.get('archived');
  const urlToFetch = req.nextUrl.searchParams.get('urlToFetch');

  const url = urlToFetch ? urlToFetch : `/objects/contacts?limit=${limit}&archived=${archived}`;

  try {
    const response = await axios.get(url);

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
}

export const POST = async (req: NextRequest) => {
  const API_KEY = process.env.HUBSPOT_API_KEY || '';

  try {
    const data: BaseUserSchema = await req.json();

    // const associations = [];

    // if (data.company) {
    // associations.push({
    //   to: { id: data.company },
    //   types: [
    //     {
    //       associationCategory: 'HUBSPOT_DEFINED',
    //       associationTypeId: 279,
    //     },
    //   ],
    // });
    // }

    const response = await axios.post(
      '/objects/contacts',
      {
        properties: {
          firstname: data.firstName,
          lastname: data.lastName,
          email: data.email,
          jobtitle: data.jobTitle,
          phone: data.phone,
          country: data.country,
          city: data.city,
          company: data.company,
        },
      },
      {
        headers: {
          Authorization: `Bearer ${API_KEY}`,
        },
      },
    );

    if (data.company) {
      console.log('daaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa');
    }

    console.log('RESPONSE DATA U ROUTE', response.data);

    return NextResponse.json(response.data, { status: 200 });
  } catch (error) {
    if (error instanceof Error) {
      return NextResponse.json({ message: error.message });
    }
  }
};
