'use client';

import { useCreateContact } from '@/lib/hooks/mutations/use-create-contact';
import type { Company } from '@/types';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import CreateUpdateContactForm, { BaseUserSchema } from './create-update-contact-form';

type Props = {
  companies: Company[];
};

const CreateUpdateContact = ({ companies }: Props) => {
  const router = useRouter();
  const { mutateAsync: createContactAsync } = useCreateContact();

  const handleSubmit = (data: BaseUserSchema) => {
    createContactAsync(data, {
      onSuccess() {
        toast.success('Contact created successfully');
        router.push('/');
      },
      onError(error) {
        console.log('error u onError', error);
        toast.error(error.message);
      },
    });
  };

  return <CreateUpdateContactForm onSubmitData={handleSubmit} companies={companies} />;
};

export default CreateUpdateContact;
