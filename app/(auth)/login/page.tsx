'use client';

import { Button } from '@/components/ui/button';
import LoadingSpinner from '@/components/ui/LoadingSpinner';
import { useGetOwners } from '@/lib/hooks/queries/use-get-owners';

const Login = () => {
  const { data, isPending } = useGetOwners();

  console.log('data', data);

  if (isPending) {
    return <LoadingSpinner asOverlay />;
  }

  return (
    <section className="flex-center min-h-screen">
      <div className="center border-2 border-red-400 p-2 shadow-xl sm:p-4">
        <h2 className="d1-bold">HubSpot Clone</h2>
        <Button type="submit">Sign In</Button>
      </div>
    </section>
  );
};

export default Login;
