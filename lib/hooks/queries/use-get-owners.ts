import { getOwners } from '@/api/owners';
import { QueryKeys } from '@/lib/constants';
import { IOwnerDTO } from '@/types';
import { useQuery } from '@tanstack/react-query';

export const useGetOwners = () => {
  return useQuery<{ results: IOwnerDTO[] }>({ queryKey: [QueryKeys.OWNERS], queryFn: getOwners });
};
