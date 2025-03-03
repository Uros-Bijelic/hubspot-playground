import UpdateContact from '@/components/features/contacts/update-contact';
// import type { Company, Contact } from '@/types';

type Props = {
  params: Promise<{ id: string }>;
};

const getContact = async (baseUrl: string, contactId: string) => {
  const response = await fetch(`${baseUrl}/api/contacts/${contactId}`);
  return await response.json();
};

const getCompanies = async (baseUrl: string) => {
  const response = await fetch(`${baseUrl}/api/companies`);
  return await response.json();
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
