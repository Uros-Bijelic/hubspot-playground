import type { BaseUserSchema } from '@/components/features/contacts/create-update-contact-form';
import { NextRequest, NextResponse } from 'next/server';

export const GET = async (req: NextRequest, { params }: { params: Promise<{ id: string }> }) => {
  try {
    const API_KEY = process.env.HUBSPOT_API_KEY || '';
    const BASE_URL = process.env.HUBSPOT_BASE_URL || '';
    const contactId = (await params).id;

    if (!contactId) {
      throw new Error('Contact ID not found.');
    }

    const response = await fetch(
      `${BASE_URL}/objects/contacts/${contactId}?properties=firstname,lastname,email,jobtitle,phone,country,city,company`,
      {
        headers: {
          Authorization: `Bearer ${API_KEY}`,
          'Content-Type': 'application/json',
        },
      },
    );
    const data = await response.json();

    return NextResponse.json(data, { status: 200 });
  } catch (error) {
    if (error instanceof Error) {
      return NextResponse.json({ message: error.message || 'An unexpected error occurred' });
    }
  }
};

export const DELETE = async (req: NextRequest, { params }: { params: Promise<{ id: string }> }) => {
  try {
    const BASE_URL = process.env.HUBSPOT_BASE_URL || '';
    const API_KEY = process.env.HUBSPOT_API_KEY || '';
    const contactId = (await params).id;

    if (!contactId) {
      throw new Error('Contact ID not found.');
    }

    const response = await fetch(`${BASE_URL}/objects/contacts/${contactId}`, {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${API_KEY}`,
      },
    });

    const data = await response.json();

    return NextResponse.json(data, { status: 200 });
  } catch (error) {
    if (error instanceof Error) {
      return NextResponse.json({ message: error.message || 'An unexpected error occurred' });
    }
  }
};

export const PATCH = async (req: NextRequest, { params }: { params: Promise<{ id: string }> }) => {
  try {
    const BASE_URL = process.env.HUBSPOT_BASE_URL || '';
    const API_KEY = process.env.HUBSPOT_API_KEY || '';

    const contactId = (await params).id;

    if (!contactId) {
      throw new Error('Contact ID not found.');
    }

    const body: BaseUserSchema = await req.json();

    const response = await fetch(`${BASE_URL}/objects/contacts/${contactId}`, {
      method: 'PATCH',
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

    return NextResponse.json(response, { status: 200 });
  } catch (error) {
    if (error instanceof Error) {
      return NextResponse.json({ message: error.message });
    }
  }
};
