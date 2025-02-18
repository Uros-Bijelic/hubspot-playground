import { QUERY_KEYS } from '@/api/axios.config';
import { getSpecificOwner } from '@/api/owners';
import { useQuery } from '@tanstack/react-query';

type UseGetSpecificOwnersArgs = {
  ownerId: string;
  isSubmitSuccessful?: boolean;
};

export const useGetSpecificOwner = ({ ownerId }: UseGetSpecificOwnersArgs) => {
  return useQuery({
    queryKey: [QUERY_KEYS.OWNER, ownerId],
    queryFn: () => getSpecificOwner({ ownerId }),
    enabled: !!ownerId,
  });
};
