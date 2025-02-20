'use client';

import type { Company, Owner } from '@/types';
import CreateUpdateContactForm from './create-update-contact-form';

type Props = {
  companies: Company[];
  owners: Owner[];
};

const CreateUpdateContact = ({}: Props) => {
  const handleSubmit = () => {};

  return <CreateUpdateContactForm onSubmitData={handleSubmit} />;
};

export default CreateUpdateContact;
