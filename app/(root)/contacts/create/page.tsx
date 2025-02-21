import CreateUpdateContact from '@/components/features/contacts/create-update-contact';
import type { Company } from '@/types';
// import CreateUpdateContactForm from '@/components/features/contacts/create-update-contact-form';

const CreateContact = async () => {
  const BASE_URL = process.env.APP_BASE_URL || '';

  const response = await fetch(`${BASE_URL}/api/companies`);

  const data: { results: Company[] } = await response.json();

  return <CreateUpdateContact companies={data.results} />;
};

export default CreateContact;
