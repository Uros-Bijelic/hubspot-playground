import type { Company, Contact } from '@/types';
import CreateUpdateContactForm from './create-update-contact-form';

type Props = {
  contact: Contact;
  companies: Company[];
};

const UpdateContact = ({ contact, companies }: Props) => {
  console.log('contact', contact);
  console.log('companies', companies);

  return <CreateUpdateContactForm companies={companies} contact={contact} />;
};

export default UpdateContact;
