'use client';

import { useCreateContact } from '@/lib/hooks/mutations/use-create-contact';
import type { Company, Owner } from '@/types';
import CreateUpdateContactForm, { BaseUserSchema } from './create-update-contact-form';

type Props = {
  companies: Company[];
  owners: Owner[];
};

const CreateUpdateContact = ({}: Props) => {
  const { data, mutateAsync: createContactAsync } = useCreateContact();

  console.log('data', data);

  const handleSubmit = (data: BaseUserSchema) => {
    createContactAsync(data, {
      onSuccess(data) {
        console.log('data u sucess', data);
      },
      onError(error) {
        console.log('error u onError', error);
      },
    });
  };

  return <CreateUpdateContactForm onSubmitData={handleSubmit} />;
};

export default CreateUpdateContact;
