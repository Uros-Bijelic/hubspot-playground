import { QUERY_KEYS } from '@/api/axios.config';
import { getContacts } from '@/api/contacts';
import type { Contact } from '@/types';
import { useQuery } from '@tanstack/react-query';

type UseGetContactsResponse = {
  paging?: {
    next: {
      after: string;
      link: string;
    };
  };
  results: Contact[];
};

export const useGetContacts = (page = 1, urlToFetch = '', limit = 8) => {
  return useQuery<UseGetContactsResponse>({
    queryKey: [QUERY_KEYS.CONTACTS, page],
    queryFn: () => getContacts(limit, urlToFetch),
  });
};
