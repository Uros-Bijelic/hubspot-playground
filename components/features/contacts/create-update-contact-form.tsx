'use client';

import HubspotButton from '@/components/ui/hubspot-button';
import RHFInput from '@/components/ui/rhf-inputs/rhf-input';
import RHFSelect from '@/components/ui/rhf-inputs/rhf-select';
import { zodResolver } from '@hookform/resolvers/zod';
import { FormProvider, useForm } from 'react-hook-form';
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
  contactOwner: z.string().trim().optional(),
});

export type BaseUserSchema = z.infer<typeof baseUserSchema>;

type Props = {
  defaultData?: BaseUserSchema;
  onSubmitData: (data: BaseUserSchema) => void;
};

const defaultValues = {
  firstName: '',
  lastName: '',
  email: '',
  jobTitle: '',
  phone: '',
  country: '',
  city: '',
  company: '',
  contactOwner: '',
};

const CreateUpdateContactForm = ({ defaultData, onSubmitData }: Props) => {
  const methods = useForm<BaseUserSchema>({
    resolver: zodResolver(baseUserSchema),
    defaultValues: defaultData || defaultValues,
  });

  const { handleSubmit } = methods;

  const onSubmit = (data: BaseUserSchema) => {
    console.log('data', data);
    try {
      onSubmitData(data);
    } catch (error) {
      console.log('Error create update contact', error);
    }
  };

  return (
    <div className="mx-auto flex w-[min(800px,100%)] flex-col gap-2 p-2 sm:gap-4 sm:p-4">
      <h2 className="d2-bold">Create New Contact</h2>
      <FormProvider {...methods}>
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col sm:gap-4">
          <div className="flex flex-col gap-4 sm:flex-row">
            <div className="flex w-[min(400px,100%)] flex-col gap-2 sm:gap-4">
              <p className="p1-bold text-violet-500">Required</p>
              <RHFInput label="First name" placeholder="First name" name="firstName" />
              <RHFInput label="Last name" placeholder="Last name" name="lastName" />
              <RHFInput label="Email" placeholder="Email" name="email" />
            </div>
            <div className="flex w-[min(400px,100%)] flex-col gap-2 sm:gap-4">
              <p className="p1-bold text-violet-500">Optional</p>
              <RHFInput label="Job Title" placeholder="Job Title" name="jobTitle" />
              <RHFInput label="Phone number" placeholder="Phone number" name="phone" />
              <RHFInput label="Country" placeholder="Country" name="country" />
              <RHFInput label="City" placeholder="City" name="city" />
              <RHFSelect label="Company" placeholder="Company" name="company" options={[]} />
              <RHFSelect
                label="Contact Owner"
                placeholder="Contact Owner"
                name="contactOwner"
                options={[]}
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
