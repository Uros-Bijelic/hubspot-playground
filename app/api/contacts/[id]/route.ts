import { axios } from '@/api/axios.config';
import type { BaseUserSchema } from '@/components/features/contacts/create-update-contact-form';
import { NextRequest, NextResponse } from 'next/server';

export const GET = async (req: NextRequest, { params }: { params: Promise<{ id: string }> }) => {
  try {
    const API_KEY = process.env.HUBSPOT_API_KEY || '';
    const contactId = (await params).id;

    if (!contactId) {
      throw new Error('Contact ID not found.');
    }

    const response = await axios.get(
      `/objects/contacts/${contactId}?properties=firstname,lastname,email,jobtitle,phone,country,city,company`,
      {
        headers: {
          Authorization: `Bearer ${API_KEY}`,
        },
      },
    );

    return NextResponse.json(response.data, { status: 200 });
  } catch (error) {
    if (error instanceof Error) {
      return NextResponse.json({ message: error.message || 'An unexpected error occurred' });
    }
  }
};

export const DELETE = async (req: NextRequest, { params }: { params: Promise<{ id: string }> }) => {
  try {
    const API_KEY = process.env.HUBSPOT_API_KEY || '';
    const contactId = (await params).id;

    if (!contactId) {
      throw new Error('Contact ID not found.');
    }

    const response = await axios.delete(`/objects/contacts/${contactId}`, {
      headers: {
        Authorization: `Bearer ${API_KEY}`,
      },
    });

    return NextResponse.json(response.data, { status: 200 });
  } catch (error) {
    if (error instanceof Error) {
      return NextResponse.json({ message: error.message || 'An unexpected error occurred' });
    }
  }
};

export const PATCH = async (req: NextRequest, { params }: { params: Promise<{ id: string }> }) => {
  try {
    const API_KEY = process.env.HUBSPOT_API_KEY || '';

    const contactId = (await params).id;

    if (!contactId) {
      throw new Error('Contact ID not found.');
    }

    const data: BaseUserSchema = await req.json();

    const response = await axios.patch(
      `/objects/contacts/${contactId}`,
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
      await axios.post(
        `/associations/Contacts/Companies/batch/create`,
        {
          inputs: [
            {
              from: {
                id: response.data.id,
              },
              to: {
                id: data.company,
              },
              type: 'contact_to_company',
            },
          ],
        },
        {
          headers: {
            Authorization: `Bearer ${API_KEY}`,
          },
        },
      );
    }

    return NextResponse.json(response.data, { status: 200 });
  } catch (error) {
    if (error instanceof Error) {
      return NextResponse.json({ message: error.message });
    }
  }
};
