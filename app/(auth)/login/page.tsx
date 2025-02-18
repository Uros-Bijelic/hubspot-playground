'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { FormProvider, useForm } from 'react-hook-form';

import { Button } from '@/components/ui/button';
import LoadingSpinner from '@/components/ui/LoadingSpinner';
import RHFSelect from '@/components/ui/RHFInputs/rhf-select';
import { useGetOwners } from '@/lib/hooks/queries/use-get-owners';
import { z } from 'zod';

export const signInUserSchema = z.object({
  ownerId: z.string().trim().min(1, 'Required!'),
});

export type SignInUserSchema = z.infer<typeof signInUserSchema>;

const Login = () => {
  const methods = useForm({
    resolver: zodResolver(signInUserSchema),
    defaultValues: {
      ownerId: '',
    },
  });

  const {
    watch,
    formState: { isValid, isSubmitting },
  } = methods;
  console.log('wathc, ', watch());

  const { data, isPending, error } = useGetOwners();

  if (isPending) {
    return <LoadingSpinner asOverlay />;
  }

  if (!data || error) {
    return <h2>{error ? error.message : 'You have to crate a new account on hubspot!'}</h2>;
  }

  console.log('data', data.results);

  const selectOptions = data.results.map(({ id, email }) => ({ id, value: id, label: email }));

  return (
    <section className="flex-center min-h-screen">
      <div className="center flex w-[min(320px,100%)] flex-col gap-2 p-6 shadow-xl">
        <h2 className="d2-bold">HubSpot Clone</h2>
        <FormProvider {...methods}>
          <form className="flex flex-col gap-4">
            <RHFSelect
              options={selectOptions}
              name="ownerId"
              label="Current User"
              placeholder="Select account"
            />
            <Button disabled={!isValid || isSubmitting} type="submit">
              Sign In
            </Button>
          </form>
        </FormProvider>
      </div>
    </section>
  );
};

export default Login;
