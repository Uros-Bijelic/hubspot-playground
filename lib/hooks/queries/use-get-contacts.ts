import { QUERY_KEYS } from '@/api/axios.config';
import { getContacts } from '@/api/contacts';
import type { Contact } from '@/types';
import { useQuery } from '@tanstack/react-query';

type UseGetContactsResponse = {
  paging?: {
    after: string;
    link: string;
  };
  results: Contact[];
};

export const useGetContacts = (limit: number = 10) => {
  return useQuery<UseGetContactsResponse>({
    queryKey: [QUERY_KEYS.CONTACTS],
    queryFn: () => getContacts(limit),
  });
};
