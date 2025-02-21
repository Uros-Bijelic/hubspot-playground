'use client';

import { useCreateContact } from '@/lib/hooks/mutations/use-create-contact';
import type { Company } from '@/types';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import CreateUpdateContactForm, { BaseUserSchema } from './create-update-contact-form';

type Props = {
  companies: Company[];
};

const CreateContact = ({ companies }: Props) => {
  const router = useRouter();
  const { mutateAsync: createContactAsync } = useCreateContact();

  const handleSubmit = (data: BaseUserSchema) => {
    createContactAsync(data, {
      onSuccess() {
        toast.success('Contact created successfully');
        router.push('/');
      },
      onError(error) {
        toast.error(error.message);
      },
    });
  };

  return <CreateUpdateContactForm onSubmitData={handleSubmit} companies={companies} />;
};

export default CreateContact;
