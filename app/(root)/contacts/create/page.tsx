import CreateUpdateContact from '@/components/features/contacts/create-update-contact';
import type { Company, Owner } from '@/types';
// import CreateUpdateContactForm from '@/components/features/contacts/create-update-contact-form';

const getCompanies = async (baseUrl: string): Promise<{ results: Company[] }> => {
  const response = await fetch(`${baseUrl}/api/companies`);

  return response.json();
};

const getOwners = async (baseUrl: string): Promise<{ results: Owner[] }> => {
  const response = await fetch(`${baseUrl}/api/owners`);

  return response.json();
};

const CreateContact = async () => {
  const BASE_URL = process.env.APP_BASE_URL || '';

  const [companies, owners] = await Promise.all([getCompanies(BASE_URL), getOwners(BASE_URL)]);

  return <CreateUpdateContact companies={companies.results} owners={owners.results} />;
};

export default CreateContact;
