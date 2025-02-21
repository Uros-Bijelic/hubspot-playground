import CreateContact from '@/components/features/contacts/create-contact';
import type { Company } from '@/types';

const CreateContactPage = async () => {
  const BASE_URL = process.env.APP_BASE_URL || '';

  const response = await fetch(`${BASE_URL}/api/companies`);

  const data: { results: Company[] } = await response.json();

  return <CreateContact companies={data.results} />;
};

export default CreateContactPage;
