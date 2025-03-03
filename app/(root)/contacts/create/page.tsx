import CreateContact from '@/components/features/contacts/create-contact';

const CreateContactPage = async () => {
  const BASE_URL = process.env.APP_BASE_URL || '';

  const response = await fetch(`${BASE_URL}/api/companies`);
  const companies = await response.json();

  return <CreateContact companies={companies.results} />;
};

export default CreateContactPage;
