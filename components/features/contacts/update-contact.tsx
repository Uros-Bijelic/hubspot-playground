'use client';

import { useUpdateContact } from '@/lib/hooks/mutations/use-update-contact';
import type { Company, Contact } from '@/types';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import CreateUpdateContactForm, { type BaseUserSchema } from './create-update-contact-form';

type Props = {
  contactId: string;
  contact: Contact;
  companies: Company[];
};

const UpdateContact = ({ contact, companies, contactId }: Props) => {
  const router = useRouter();

  const { mutateAsync: updateContactAsync } = useUpdateContact();

  const handleSubmit = (data: BaseUserSchema) => {
    updateContactAsync(
      { data, id: contactId },
      {
        onSuccess() {
          toast.success('Contact updated successfully');
          router.push('/');
        },
        onError(error) {
          console.log('error u onError na FE', error);
          toast.error(error.message);
        },
      },
    );
  };

  return (
    <CreateUpdateContactForm companies={companies} contact={contact} onSubmitData={handleSubmit} />
  );
};

export default UpdateContact;
