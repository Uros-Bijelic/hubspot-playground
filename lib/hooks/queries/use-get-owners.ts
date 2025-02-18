import { getOwners } from '@/api/owners';
import { QueryKeys } from '@/lib/constants';
import type { Owner } from '@/types';
import { useQuery } from '@tanstack/react-query';

export const useGetOwners = () => {
  return useQuery<{ results: Owner[] }>({ queryKey: [QueryKeys.OWNERS], queryFn: getOwners });
};
