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
  try {
    const API_KEY = process.env.HUBSPOT_API_KEY || '';

    const data: BaseUserSchema = await req.json();

    console.log('data', data);

    // let association = [];

    // if (data.company) {
    //   association
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
          // company: data.company,
        },
      },
      {
        headers: {
          Authorization: `Bearer ${API_KEY}`,
        },
      },
    );

    if (data.company) {
      console.log('IMAAAAAAAAAAAAAAADSADASDASDASDASDASDASDASDAASd');
      const associationResponse = await axios.post(
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
      );

      console.log(
        'AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA',
        associationResponse.status,
        associationResponse.data,
      );
    }

    return NextResponse.json(response.data, { status: 200 });
  } catch (error) {
    if (error instanceof Error) {
      return NextResponse.json({ message: error.message });
    }
  }
};

// if (data.company) {
//   console.log(
//     'DDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA',
//   );
//   const associationResponse = await axios.post(
//     `/associations/Contacts/Companies/batch/create`,
//     {
//       inputs: [
//         {
//           from: {
//             id: response.data.id,
//           },
//           to: {
//             id: data.company,
//           },
//           type: 'contact_to_company',
//         },
//       ],
//     },
//     {
//       headers: {
//         Authorization: `Bearer ${API_KEY}`,
//       },
//     },
//   );

//   console.log('associationResponse STATUS', associationResponse.status);
//   console.log('associationResponse DATA', associationResponse.data);
// }
