import { typedFetch } from '@/api/axios.config';
import { BaseUserSchema } from '@/components/features/contacts/create-update-contact-form';
import { Contact } from '@/types';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
  try {
    const API_KEY = process.env.HUBSPOT_API_KEY || '';
    const BASE_API_URL = process.env.HUBSPOT_BASE_URL || '';
    const limit = req.nextUrl.searchParams.get('limit');
    const archived = req.nextUrl.searchParams.get('archived');
    const urlToFetch = req.nextUrl.searchParams.get('urlToFetch');

    const url = urlToFetch
      ? urlToFetch
      : `${BASE_API_URL}/objects/contacts?limit=${limit}&archived=${archived}`;

    const response = await typedFetch<{ results: Contact[] }>({
      url,
      headers: { Authorization: `Bearer ${API_KEY}` },
    });

    return NextResponse.json(response, { status: 200 });
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
  try {
    const API_KEY = process.env.HUBSPOT_API_KEY || '';
    const BASE_API_URL = process.env.HUBSPOT_BASE_URL || '';
    const data: BaseUserSchema = await req.json();

    const response = await typedFetch<Contact>({
      url: `${BASE_API_URL}/objects/contacts`,
      method: 'POST',
      body: {
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
      headers: {
        Authorization: `Bearer ${API_KEY}`,
      },
    });

    console.log('response', response);

    if (data.company) {
      await typedFetch({
        url: `${BASE_API_URL}/associations/Contacts/Companies/batch/create`,
        method: 'POST',
        body: {
          inputs: [
            {
              from: {
                id: response.id,
              },
              to: {
                id: data.company,
              },
              type: 'contact_to_company',
            },
          ],
        },
        headers: {
          Authorization: `Bearer ${API_KEY}`,
        },
      });
    }

    return NextResponse.json(response, { status: 200 });
  } catch (error) {
    if (error instanceof Error) {
      return NextResponse.json({ message: error.message });
    }
  }
};
