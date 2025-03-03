import { getOwners } from '@/api/owners';
import { QUERY_KEYS } from '@/api/queies-endpoints';
import type { Owner } from '@/types';
import { useQuery } from '@tanstack/react-query';

export const useGetOwners = () => {
  return useQuery<{ results: Owner[] }>({ queryKey: [QUERY_KEYS.OWNERS], queryFn: getOwners });
};
