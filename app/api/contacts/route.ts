import { BaseUserSchema } from '@/components/features/contacts/create-update-contact-form';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
  try {
    const API_KEY = process.env.HUBSPOT_API_KEY || '';
    const BASE_URL = process.env.HUBSPOT_BASE_URL || '';
    const limit = req.nextUrl.searchParams.get('limit');
    const archived = req.nextUrl.searchParams.get('archived');
    const after = req.nextUrl.searchParams.get('after');

    let url = `${BASE_URL}/objects/contacts?limit=${limit}&archived=${archived}`;

    if (after) {
      url = `${url}&after=${after}`;
    }

    const response = await fetch(url, {
      headers: { Authorization: `Bearer ${API_KEY}`, 'Content-Type': 'application/json' },
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
}

export const POST = async (req: NextRequest) => {
  try {
    const API_KEY = process.env.HUBSPOT_API_KEY || '';
    const BASE_URL = process.env.HUBSPOT_BASE_URL || '';
    const body: BaseUserSchema = await req.json();

    const response = await fetch(`${BASE_URL}/objects/contacts`, {
      method: 'POST',
      body: JSON.stringify({
        properties: {
          firstname: body.firstName,
          lastname: body.lastName,
          email: body.email,
          jobtitle: body.jobTitle,
          phone: body.phone,
          country: body.country,
          city: body.city,
          company: body.company,
        },
      }),
      headers: {
        Authorization: `Bearer ${API_KEY}`,
        'Content-Type': 'application/json',
      },
    });

    const data = await response.json();

    if (body.company) {
      await fetch(`${BASE_URL}/associations/Contacts/Companies/batch/create`, {
        method: 'POST',
        body: JSON.stringify({
          inputs: [
            {
              from: {
                id: data.id,
              },
              to: {
                id: body.company,
              },
              type: 'contact_to_company',
            },
          ],
        }),
        headers: {
          Authorization: `Bearer ${API_KEY}`,
          'Content-Type': 'application/json',
        },
      });
    }

    return NextResponse.json(data, { status: 200 });
  } catch (error) {
    if (error instanceof Error) {
      return NextResponse.json({ message: error.message });
    }
  }
};
