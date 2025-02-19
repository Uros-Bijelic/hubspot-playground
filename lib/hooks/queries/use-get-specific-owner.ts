import { QUERY_KEYS } from '@/api/axios.config';
import { getSpecificOwner } from '@/api/owners';
import type { Owner } from '@/types';
import { useQuery } from '@tanstack/react-query';

type UseGetSpecificOwnersArgs = {
  ownerId?: string;
  isSubmitSuccessful?: boolean;
};

export const useGetSpecificOwner = ({ ownerId }: UseGetSpecificOwnersArgs) => {
  const userId = localStorage.getItem('currentUser') || ownerId || '77311621';

  return useQuery<Owner>({
    queryKey: [QUERY_KEYS.OWNER, userId],
    queryFn: () => getSpecificOwner({ ownerId: userId }),
    enabled: !!userId,
  });
};
