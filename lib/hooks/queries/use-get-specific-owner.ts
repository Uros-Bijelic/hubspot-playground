import { getSpecificOwner } from '@/api/owners';
import { QUERY_KEYS } from '@/api/queies-endpoints';
import type { Owner } from '@/types';
import { useQuery } from '@tanstack/react-query';

// type UseGetSpecificOwnersArgs = {
//   ownerId?: string;
//   isSubmitSuccessful?: boolean;
// };

export const useGetSpecificOwner = () => {
  const userId = '77311621';

  return useQuery<Owner>({
    queryKey: [QUERY_KEYS.OWNER, userId],
    queryFn: () => getSpecificOwner({ ownerId: userId }),
    enabled: !!userId,
  });
};
