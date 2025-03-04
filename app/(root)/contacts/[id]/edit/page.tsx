import { getCompanies } from '@/api/companies';
import { getContact } from '@/api/contacts';
import CreateUpdateContactForm from '@/components/features/contacts/create-update-contact-form';

type Props = {
  params: Promise<{ id: string }>;
};

const EditContactPage = async ({ params }: Props) => {
  const contactId = (await params).id;

  if (!contactId) {
    throw new Error('Contact Id is not available.');
  }
  const [contact, companies] = await Promise.all([getContact(contactId), getCompanies()]);

  if (!contact) throw new Error('User information not available');

  return <CreateUpdateContactForm companies={companies.results} contact={contact} />;
};

export default EditContactPage;
