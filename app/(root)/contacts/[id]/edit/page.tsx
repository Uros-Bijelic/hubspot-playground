import UpdateContact from '@/components/features/contacts/update-contact';
import { typedFetch } from '@/lib/utils';
import type { Company, Contact } from '@/types';

type Props = {
  params: Promise<{ id: string }>;
};

const getContact = (baseUrl: string, contactId: string) => {
  return typedFetch<Contact>({ url: `${baseUrl}/api/contacts/${contactId}` });
};

const getCompanies = (baseUrl: string) => {
  return typedFetch<{ results: Company[] }>({ url: `${baseUrl}/api/companies` });
};

const EditContactPage = async ({ params }: Props) => {
  const BASE_URL = process.env.APP_BASE_URL || '';
  const contactId = (await params).id;

  if (!contactId) {
    throw new Error('Contact Id is not available.');
  }
  const [contact, companies] = await Promise.all([
    getContact(BASE_URL, contactId),
    getCompanies(BASE_URL),
  ]);

  return <UpdateContact companies={companies.results} contact={contact} contactId={contactId} />;
};

export default EditContactPage;
