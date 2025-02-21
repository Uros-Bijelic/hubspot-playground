import CreateContact from '@/components/features/contacts/create-contact';
import { typedFetch } from '@/lib/utils';
import type { Company } from '@/types';

const CreateContactPage = async () => {
  const BASE_URL = process.env.APP_BASE_URL || '';

  const companies = await typedFetch<{ results: Company[] }>({ url: `${BASE_URL}/api/companies` });

  return <CreateContact companies={companies.results} />;
};

export default CreateContactPage;
