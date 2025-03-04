import { getCompanies } from '@/api/companies';
import CreateUpdateContactForm from '@/components/features/contacts/create-update-contact-form';
import type { Company } from '@/types';

const CreateContactPage = async () => {
  const companies: { results: Company[] } = await getCompanies();

  return <CreateUpdateContactForm companies={companies.results} />;
};

export default CreateContactPage;
