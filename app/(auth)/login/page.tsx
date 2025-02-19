'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { FormProvider, useForm } from 'react-hook-form';

import HubspotButton from '@/components/ui/hubspot-button';
import LoadingSpinner from '@/components/ui/LoadingSpinner';
import { useRouter } from 'next/navigation';

import RHFSelect from '@/components/ui/rhf-inputs/rhf-select';
import { useAuthContext } from '@/context/auth-context';
import { useGetOwners } from '@/lib/hooks/queries/use-get-owners';
import { useGetSpecificOwner } from '@/lib/hooks/queries/use-get-specific-owner';
import { z } from 'zod';

export const signInUserSchema = z.object({
  ownerId: z.string().trim().min(1, 'Required!'),
});

export type SignInUserSchema = z.infer<typeof signInUserSchema>;

const Login = () => {
  const router = useRouter();
  const methods = useForm({
    resolver: zodResolver(signInUserSchema),
    defaultValues: {
      ownerId: '',
    },
  });
  const { setCurrentOwner } = useAuthContext();
  const { data: allOwners, isPending: isPendingAllOwners, error } = useGetOwners();

  const {
    formState: { isValid, isSubmitting },
    handleSubmit,
    getValues,
  } = methods;

  const ownerId = getValues('ownerId');

  const { data: currentOwner, isSuccess: isSuccessCurrentOwner } = useGetSpecificOwner({
    ownerId,
  });

  const onSubmit = () => {
    console.log('isSuccessCurrentOwner', isSuccessCurrentOwner);
    console.log('currentOwner', currentOwner);
    if (isSuccessCurrentOwner && currentOwner) {
      setCurrentOwner(currentOwner);
      localStorage.setItem('ownerId', currentOwner.id);
      router.push('/');
    }
  };

  if (isPendingAllOwners || isSubmitting) {
    return <LoadingSpinner asOverlay />;
  }

  if (!allOwners || error) {
    return (
      <section className="flex-center min-h-screen">
        <h2>{error ? error.message : 'You have to crate a new account on hubspot!'}</h2>
      </section>
    );
  }

  const selectOptions = allOwners.results.map(({ id, email }) => ({ id, value: id, label: email }));

  return (
    <section className="flex-center min-h-screen">
      <div className="center flex w-[min(320px,100%)] flex-col gap-2 p-6 shadow-xl">
        <h2 className="d2-bold">HubSpot Clone</h2>
        <FormProvider {...methods}>
          <form className="flex flex-col gap-4" onSubmit={handleSubmit(onSubmit)}>
            <RHFSelect
              options={selectOptions}
              name="ownerId"
              label="Current User"
              placeholder="Select account"
            />
            <HubspotButton disabled={!isValid || isSubmitting} type="submit">
              {isSubmitting ? '...Processing' : 'Sign In'}
            </HubspotButton>
          </form>
        </FormProvider>
      </div>
    </section>
  );
};

export default Login;
