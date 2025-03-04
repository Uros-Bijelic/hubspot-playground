'use client';

import HubspotButton from '@/components/ui/hubspot-button';
import RHFInput from '@/components/ui/rhf-inputs/rhf-input';
import RHFSelect from '@/components/ui/rhf-inputs/rhf-select';
import { useCreateContact } from '@/lib/hooks/mutations/use-create-contact';
import { useUpdateContact } from '@/lib/hooks/mutations/use-update-contact';
import type { Company, Contact } from '@/types';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';

import { FormProvider, useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { z } from 'zod';

export const baseUserSchema = z.object({
  firstName: z.string().trim().min(1, 'First name is required'),
  lastName: z.string().trim().min(1, 'Last name is required'),
  email: z.string().trim().email('Please provide valid email').min(1, 'Email is required'),
  jobTitle: z.string().trim().optional(),
  phone: z.string().trim().optional(),
  country: z.string().trim().optional(),
  city: z.string().trim().optional(),
  company: z.string().trim().optional(),
});

export type BaseUserSchema = z.infer<typeof baseUserSchema>;

type Props = {
  contact?: Contact;
  companies?: Company[];
};

const CreateUpdateContactForm = ({ contact, companies }: Props) => {
  const isEditPage = !!contact;
  const router = useRouter();

  const form = useForm<BaseUserSchema>({
    resolver: zodResolver(baseUserSchema),
    defaultValues: {
      firstName: contact?.properties.firstname || '',
      lastName: contact?.properties.lastname || '',
      email: contact?.properties.email || '',
      country: contact?.properties.country || '',
      city: contact?.properties.city || '',
      phone: contact?.properties.phone || '',
      company: contact?.properties.company || '',
      jobTitle: contact?.properties.jobtitle || '',
    },
  });

  const { mutateAsync: updateContactAsync } = useUpdateContact();
  const { mutateAsync: createContactAsync } = useCreateContact();

  const { handleSubmit } = form;

  const onSubmit = (data: BaseUserSchema) => {
    try {
      if (isEditPage) {
        updateContactAsync(
          { data, id: contact.id },
          {
            onSuccess() {
              toast.success('Contact updated successfully');
            },
            onError(error) {
              toast.error(error.message);
            },
          },
        );
      } else {
        createContactAsync(data, {
          onSuccess() {
            toast.success('Contact created successfully');
            router.push('/');
          },
          onError(error) {
            toast.error(error.message);
          },
        });
      }
    } catch (error) {
      console.log('Error create update contact', error);
    }
  };

  const companiesOptions =
    companies?.map(({ id, properties }) => ({
      id,
      label: properties.name,
      value: id,
      disabled: !id,
    })) || [];

  return (
    <div className="mx-auto flex w-[min(800px,100%)] flex-col items-center gap-2 p-2 sm:gap-4 sm:p-4">
      <h2 className="d2-bold">{contact ? 'Update' : 'Create New'} Contact</h2>
      <FormProvider {...form}>
        <form onSubmit={handleSubmit(onSubmit)} className="mx-auto flex w-full flex-1 flex-col">
          <div className="flex flex-col gap-4 sm:flex-row">
            <div className="mx-auto flex w-[min(400px,100%)] flex-col gap-2 sm:gap-4">
              <p className="p1-bold text-violet-500">Required</p>
              <RHFInput label="First name" placeholder="First name" name="firstName" />
              <RHFInput label="Last name" placeholder="Last name" name="lastName" />
              <RHFInput label="Email" placeholder="Email" name="email" />
            </div>
            <div className="mx-auto flex w-[min(400px,100%)] flex-col gap-2 sm:gap-4">
              <p className="p1-bold text-violet-500">Optional</p>
              <RHFInput label="Job Title" placeholder="Job Title" name="jobTitle" />
              <RHFInput label="Phone number" placeholder="Phone number" name="phone" />
              <RHFInput label="Country" placeholder="Country" name="country" />
              <RHFInput label="City" placeholder="City" name="city" />
              <RHFSelect
                label="Company"
                placeholder="Company"
                name="company"
                options={companiesOptions}
              />
            </div>
          </div>
          <HubspotButton className="mt-4 flex" type="submit">
            Submit
          </HubspotButton>
        </form>
      </FormProvider>
    </div>
  );
};

export default CreateUpdateContactForm;
